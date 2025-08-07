import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";

// Define the shape of the data this chart expects
interface MoodData {
  date: string;
  mood: number;
  energy: number;
  stress: number;
}



interface MoodTrendChartProps {
  data: MoodData[];
}

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-indigo-900">Mood Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[200px] w-full -ml-8 md:ml-0">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey="date" stroke="#6366f1" />
            <YAxis stroke="#6366f1" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#f59e0b"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="stress"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}