import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Smile, Sun, Zap } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

// Define the props this component will accept
interface NewEntryFormProps {
  onEntryCreated: () => void; // A function to call when an entry is saved
}

export function NewEntryForm({ onEntryCreated }: NewEntryFormProps) {
  const { token } = useAuth(); // Assuming useAuth and createEntry are available
  const [content, setContent] = useState("");
  const [mood, setMood] = useState([7]);
  const [energy, setEnergy] = useState([6]);
  const [stress, setStress] = useState([3]);

  const handleSubmit = async () => {
    if (!token) return;
    if (content.trim() === "") {
      toast.error("Your journal entry can't be empty!");
      return;
    }

    const newEntryData = {
      text: content,
      mood: mood[0],
      energy: energy[0],
      stress: stress[0],
    };

    try {
      await createEntry(newEntryData, token);
      toast.success("Journal entry saved!");
      // Reset form and notify parent
      setContent("");
      setMood([7]);
      setEnergy([6]);
      setStress([3]);
      onEntryCreated(); // This will trigger a refetch in the parent component
    } catch (error) {
      console.error("Failed to create entry:", error);
      toast.error("Could not save your entry.");
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          <Sun className="h-5 w-5" />
          New Journal Entry
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* All your form JSX (Textarea, Sliders, Button) goes here... */}
        {/* Make sure onClick for the button calls handleSubmit */}
      </CardContent>
    </Card>
  );
}
