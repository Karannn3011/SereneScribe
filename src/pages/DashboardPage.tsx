import { toast } from "sonner";
import { Heart } from "lucide-react";
import NavBar from "@/components/Landing/NavBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { getEntries } from "@/api/apiService";
import { format } from "date-fns"; // A great library for formatting dates
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { NewEntryForm } from "@/components/Dashboard/NewEntryForm";
import { EntryList } from "@/components/Dashboard/EntryList";
import { EmotionDistributionChart } from "@/components/Dashboard/EmotionDistrubutionChart";
import { MoodTrendChart } from "@/components/Dashboard/MoodTrendChart";
import dashbg from ".././assets/dashbg.webp"

const pieChartColors = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#ec4899",
];

interface JournalEntry {
  mood: number;
  energy: number;
  stress: number;
  id: string;
  text: string;
  dominantEmotion: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ENTRIES_PER_PAGE = 7;
  const [isFirstTimeDialogOpen, setIsFirstTimeDialogOpen] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
 

  const fetchEntries = useCallback(
    async (page: number) => {
      if (token) {
        setIsLoading(true);
        try {
          // Pass the current page and size to the API call
          const response = await getEntries(token, page, ENTRIES_PER_PAGE);
          const fetchedEntries = response.data.content;
          setEntries(fetchedEntries);
          setTotalPages(response.data.totalPages);

          // --- FIX: Trigger dialog ONLY on initial load if no entries exist ---
          if (page === 1 && fetchedEntries.length === 0) {
            setIsFirstTimeDialogOpen(true);
          }
        } catch (error) {
          console.error("Failed to fetch entries:", error);
          toast.error("Failed to load your journal entries.");
        } finally {
          setIsLoading(false);
        }
      }
    },
    [token]
  );

  // Fetch entries when the component mounts
  useEffect(() => {
    fetchEntries(currentPage);
  }, [currentPage, fetchEntries]);

  const moodTrendData = useMemo(() => {
    // Reverse the entries to show the oldest first, then take the last 7
    return entries
      .slice()
      .reverse()
      .slice(-7)
      .map((entry) => ({
        date: format(new Date(entry.createdAt), "MMM d"), // Format date like "Aug 6"
        mood: entry.mood,
        energy: entry.energy,
        stress: entry.stress,
      }));
  }, [entries]);

  const emotionData = useMemo(() => {
    const emotionCounts: { [key: string]: number } = {};
    entries.forEach((entry) => {
      if (entry.dominantEmotion && entry.dominantEmotion !== "pending...") {
        emotionCounts[entry.dominantEmotion] =
          (emotionCounts[entry.dominantEmotion] || 0) + 1;
      }
    });

    return Object.entries(emotionCounts).map(([name, value], index) => ({
      name,
      value,
      color: pieChartColors[index % pieChartColors.length], // Cycle through predefined colors
    }));
  }, [entries]);

  const handleEntryCreated = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchEntries(1);
    }
  };

  const handleEntryChange = () => {
    // This function will be used for both creating and deleting entries
    if (currentPage !== 1) {
      setCurrentPage(1); // Go to first page on create
    } else {
      fetchEntries(currentPage); // Refetch current page on delete
    }
  };
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-cover bg-no-repeat backdrop-blur-sm border-b border-indigo-100 px-6 pt-[15vh] pb-6"
        style={
          {backgroundImage: `url(${dashbg})`}
        }>
          <div className="max-w-7xl md:ml-15">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-white text-shadow-md">
                  Welcome, {user?.username || "User"}!
                </h1>
                <p className="text-white">How are you feeling today?</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - New Journal Entry */}
            <div className="lg:col-span-1">
              <NewEntryForm onEntryCreated={handleEntryCreated} />
            </div>
            <Dialog
              open={isFirstTimeDialogOpen}
              onOpenChange={setIsFirstTimeDialogOpen}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Welcome to Your Journal!</DialogTitle>
                  <DialogDescription>
                    It looks like you're new here. Let's create your first
                    memory.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button
                    type="button"
                    onClick={() => setIsFirstTimeDialogOpen(false)}
                  >
                    Start Writing
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Right Main Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MoodTrendChart data={moodTrendData} />
                <EmotionDistributionChart data={emotionData} />
              </div>

              {/* Journal Entries */}
              <EntryList
                entries={entries}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onEntryDeleted={handleEntryChange}
              />
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
}
