import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { Calendar, Heart, Smile, Sun, Zap } from "lucide-react";
import NavBar from "@/components/Landing/NavBar";
import { Button } from "@/components/ui/button";
import {
  useEffect,
  useState,
  useCallback,
  type ChangeEvent,
  useMemo,
} from "react";
import { useAuth } from "@/context/AuthContext";
import { getEntries, createEntry } from "@/api/apiService";
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

const pieChartColors = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#ec4899",
];

interface JournalEntry {
  id: string;
  text: string;
  mood: number;
  energy: number;
  stress: number;
  dominantEmotion: string;
  createdAt: string;
}

const emotionColorMap: { [key: string]: string } = {
  Happy: "bg-green-100 text-green-800",
  Sad: "bg-blue-100 text-blue-800",
  Angry: "bg-red-100 text-red-800",
  Anxious: "bg-yellow-100 text-yellow-800",
  Calm: "bg-indigo-100 text-indigo-800",
  Grateful: "bg-purple-100 text-purple-800",
  Excited: "bg-pink-100 text-pink-800",
  default: "bg-gray-100 text-gray-800",
};

const getEmotionColor = (emotion: string) => {
  return emotionColorMap[emotion] || emotionColorMap.default;
};

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ENTRIES_PER_PAGE = 7;
  const [isFirstTimeDialogOpen, setIsFirstTimeDialogOpen] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mood, setMood] = useState([7]);
  const [energy, setEnergy] = useState([6]);
  const [stress, setStress] = useState([3]);
  const [content, setContent] = useState("");
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
  const getRandomText = () => {
    const texts = [
      "Your thoughts are shy! You'll have to write them down before I can save them.",
      "Saving an empty thought? That's a deep concept, but this form needs some words first.",
      "Whoa there, speedy! Let's get some of those wonderful thoughts written down first.",
      "Your journal is ready, but it looks like you forgot the words!",
    ];
    const ind = Math.floor(Math.random() * texts.length);
    return texts[ind];
  };
  const handleSubmit = async () => {
    if (!token) return;

    if (content.trim() === "") {
      const randomMessage = getRandomText();

      // Pass it directly as the main message to the toast
      toast.error(randomMessage);

      return; // Stop the submission
    }

    const newEntryData = {
      text: content,
      mood: mood[0],
      energy: energy[0],
      stress: stress[0],
    };

    try {
      await createEntry(newEntryData, token);
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        // If already on page 1, just refetch the data
        fetchEntries(1);
      }
      // Reset form
      setContent("");
      setMood([7]);
      setEnergy([6]);
      setStress([3]);
      toast.success("Journal entry saved!", {
        description: `Your thoughts have been recorded.`,
      });
    } catch (error) {
      console.error("Failed to create entry:", error);
      toast.error("Could not save your entry. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 px-6 pt-[10vh] pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.username || "User"}!
                </h1>
                <p className="text-gray-600">How are you feeling today?</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - New Journal Entry */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <Sun className="h-5 w-5" />
                    New Journal Entry
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Your thoughts
                    </label>
                    <Textarea
                      placeholder="Write about your day, feelings, or anything on your mind..."
                      value={content}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setContent(e.target.value)
                      }
                      className="border-indigo-200 focus:border-indigo-400 min-h-[100px]"
                    />
                  </div>

                  {/* Mood Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Smile className="h-4 w-4 text-green-500" />
                        Mood
                      </label>
                      <span className="text-sm text-gray-600">
                        {mood[0]}/10
                      </span>
                    </div>
                    <Slider
                      value={mood}
                      onValueChange={setMood}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  {/* Energy Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Energy
                      </label>
                      <span className="text-sm text-gray-600">
                        {energy[0]}/10
                      </span>
                    </div>
                    <Slider
                      value={energy}
                      onValueChange={setEnergy}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Tired</span>
                      <span>Energetic</span>
                    </div>
                  </div>

                  {/* Stress Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        Stress
                      </label>
                      <span className="text-sm text-gray-600">
                        {stress[0]}/10
                      </span>
                    </div>
                    <Slider
                      value={stress}
                      onValueChange={setStress}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Relaxed</span>
                      <span>Stressed</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  >
                    Save Entry
                  </Button>
                </CardContent>
              </Card>
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
                {/* Mood Trends Chart */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-indigo-900">
                      Mood Trends Over Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        mood: {
                          label: "Mood",
                          color: "hsl(var(--chart-1))",
                        },
                        energy: {
                          label: "Energy",
                          color: "hsl(var(--chart-2))",
                        },
                        stress: {
                          label: "Stress",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <LineChart data={moodTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="date" stroke="#6366f1" />
                        <YAxis stroke="#6366f1" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="mood"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: "#10b981" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="energy"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ fill: "#f59e0b" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="stress"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={{ fill: "#ef4444" }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Emotion Distribution Chart */}
                <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-indigo-900">
                      Emotion Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        happy: { label: "Happy", color: "#10b981" },
                        calm: { label: "Calm", color: "#3b82f6" },
                        excited: { label: "Excited", color: "#f59e0b" },
                        grateful: { label: "Grateful", color: "#8b5cf6" },
                        anxious: { label: "Anxious", color: "#ef4444" },
                      }}
                      className="h-[200px]"
                    >
                      <PieChart>
                        <Pie
                          data={emotionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {emotionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Journal Entries */}
              <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <Calendar className="h-5 w-5" />
                    Recent Journal Entries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isLoading ? (
                    <div className="grid gap-4">
                      {entries.length > 0 ? (
                        entries.map((entry) => (
                          <div
                            key={entry.id}
                            className="p-4 rounded-lg border border-indigo-100 bg-white/50"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <p className="text-sm text-gray-600">
                                {new Date(entry.createdAt).toLocaleDateString()}
                              </p>
                              {entry.dominantEmotion && (
                                <Badge
                                  className={getEmotionColor(
                                    entry.dominantEmotion
                                  )}
                                >
                                  {entry.dominantEmotion}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-800">{entry.text}</p>
                          </div>
                        ))
                      ) : (
                        <p>You have no journal entries yet.</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-y-10">
                        {Array.from({ length: ENTRIES_PER_PAGE }).map(
                          (_, index) => (
                            <div key={index}>
                              <div className="flex flex-row justify-between mb-4">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[100px]" />
                              </div>
                              <Skeleton className="h-4 w-[150px]" />
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
                {totalPages > 1 && (
                  <CardFooter className="flex justify-center pt-4">
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1 || isLoading}
                        variant="outline"
                      >
                        Previous
                      </Button>
                      <span className="text-sm font-medium text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages || isLoading}
                        variant="outline"
                      >
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
}
