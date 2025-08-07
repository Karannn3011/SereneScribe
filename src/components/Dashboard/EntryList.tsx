import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { deleteEntry } from "@/api/apiService";
import { toast } from "sonner";

// Define the shape of a single journal entry
interface JournalEntry {
  id: string;
  text: string;
  dominantEmotion: string;
  createdAt: string;
}

// Define the props this component will accept
interface EntryListProps {
  entries: JournalEntry[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEntryDeleted: () => void;
}

// Color mapping can live inside the component that uses it
const emotionColorMap: { [key: string]: string } = {
  // Positive Emotions
  admiration: "bg-pink-100 text-pink-800",
  amusement: "bg-lime-100 text-lime-800",
  approval: "bg-green-100 text-green-800",
  caring: "bg-rose-100 text-rose-800",
  desire: "bg-red-100 text-red-800",
  excitement: "bg-amber-100 text-amber-800",
  gratitude: "bg-purple-100 text-purple-800",
  joy: "bg-yellow-100 text-yellow-800",
  love: "bg-rose-100 text-rose-800",
  optimism: "bg-sky-100 text-sky-800",
  pride: "bg-indigo-100 text-indigo-800",
  relief: "bg-teal-100 text-teal-800",
  
  // Negative Emotions
  anger: "bg-red-100 text-red-800",
  annoyance: "bg-orange-100 text-orange-800",
  disappointment: "bg-gray-100 text-gray-800",
  disapproval: "bg-stone-100 text-stone-800",
  disgust: "bg-stone-100 text-stone-800",
  embarrassment: "bg-pink-100 text-pink-800",
  fear: "bg-violet-100 text-violet-800",
  grief: "bg-slate-100 text-slate-800",
  nervousness: "bg-amber-100 text-amber-800",
  remorse: "bg-gray-100 text-gray-800",
  sadness: "bg-blue-100 text-blue-800",

  // Neutral/Ambiguous Emotions
  confusion: "bg-slate-100 text-slate-800",
  curiosity: "bg-cyan-100 text-cyan-800",
  realization: "bg-cyan-100 text-cyan-800",
  surprise: "bg-teal-100 text-teal-800",
  neutral: "bg-gray-100 text-gray-800",

  // Default Fallback
  default: "bg-gray-100 text-gray-800",
};

const getEmotionColor = (emotion: string) => {
  return emotionColorMap[emotion] || emotionColorMap.default;
};

export function EntryList({ entries, isLoading, currentPage, totalPages, onPageChange, onEntryDeleted }: EntryListProps) {
  const { token } = useAuth();

  const handleDelete = async (entryId: string) => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to delete this entry?")) {
      return;
    }

    try {
      await deleteEntry(entryId, token);
      toast.success("Entry deleted successfully.");
      onEntryDeleted(); // Notify parent to refetch data
    } catch (error) {
      console.error("Failed to delete entry:", error);
      toast.error("Could not delete the entry.");
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          <Calendar className="h-5 w-5" />
          Recent Journal Entries
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-y-10">
            {/* Skeleton Loader */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <div className="flex flex-row justify-between mb-4">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <div key={entry.id} className="p-4 rounded-lg border border-indigo-100 bg-white/50 group">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-gray-600">{new Date(entry.createdAt).toLocaleDateString()}</p>
                    <div className="flex items-center gap-2">
                      {entry.dominantEmotion && <Badge className={getEmotionColor(entry.dominantEmotion)}>{entry.dominantEmotion}</Badge>}
                      <Button variant="ghost" size="icon" className="h-6 w-6 " onClick={() => handleDelete(entry.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm">{entry.text}</p>
                </div>
              ))
            ) : (
              <p>You have no journal entries yet.</p>
            )}
          </div>
        )}
      </CardContent>
      {totalPages > 1 && (
        <CardFooter className="flex justify-center pt-4">
          <div className="flex items-center gap-4">
            <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 || isLoading} variant="outline">
              Previous
            </Button>
            <span className="text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || isLoading} variant="outline">
              Next
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}