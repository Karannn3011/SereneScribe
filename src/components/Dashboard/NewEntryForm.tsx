import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Smile, Sun, Zap } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { createEntry } from "@/api/apiService";
import { InfoIcon } from "lucide-react";

// 1. Define the props this component will accept
interface NewEntryFormProps {
  onEntryCreated: () => void; // A function to call to notify the parent
}

// 2. The component now receives props
export function NewEntryForm({ onEntryCreated }: NewEntryFormProps) {
  const { token } = useAuth();

  // 3. All form-related state is now inside this component
  const [mood, setMood] = useState([7]);
  const [energy, setEnergy] = useState([6]);
  const [stress, setStress] = useState([3]);
  const [content, setContent] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

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
        toast.error(randomMessage);
        return;
    }


    setIsSubmitting(true);

    const newEntryData = {
      text: content,
      mood: mood[0],
      energy: energy[0],
      stress: stress[0],
    };

    try {
      await createEntry(newEntryData, token);
      toast.success("Journal entry saved!");
      
      setContent("");
      setMood([7]);
      setEnergy([6]);
      setStress([3]);
      onEntryCreated();
    } catch (error) {
      console.error("Failed to create entry:", error);
      toast.error("Could not save your entry. Try again.");
    } finally {
      
      setIsSubmitting(false);
    }
  };

  return (
    // 5. Paste the entire <Card> JSX for the form here
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
            Your thoughts<br />
            <p className="text-xs mt-3"><InfoIcon className="w-2 inline"/> <span>Remember: punctuation marks play an important role in expressing a sentence.</span></p>
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
            <span className="text-sm text-gray-600">{mood[0]}/10</span>
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
            <span className="text-sm text-gray-600">{energy[0]}/10</span>
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
            <span className="text-sm text-gray-600">{stress[0]}/10</span>
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
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-75"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 mt-4 w-4 animate-spin" />
              Saving...
            </span>
          ) : (
            'Save Entry'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
