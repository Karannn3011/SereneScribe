import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";


interface EmotionData {
  name: string;
  value: number;
  color: string;
}

interface EmotionDistributionChartProps {
  data: EmotionData[];
}

export function EmotionDistributionChart({ data }: EmotionDistributionChartProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-indigo-900">Emotion Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[200px] w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}