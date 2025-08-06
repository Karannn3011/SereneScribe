import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";

export function MoodTrendChart({ data }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-indigo-900">Mood Trends Over Time</CardTitle>
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
  );
}
