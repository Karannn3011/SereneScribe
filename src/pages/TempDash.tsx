"use client"

import { useState, type SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Pie, PieChart, Cell } from "recharts"
import { Calendar, Heart, Smile, Sun, Zap } from "lucide-react"
import NavBar from "@/components/Landing/NavBar"

// Mock data for mood trends
const moodTrendData = [
  { date: "Mon", mood: 7, energy: 6, stress: 4 },
  { date: "Tue", mood: 8, energy: 7, stress: 3 },
  { date: "Wed", mood: 6, energy: 5, stress: 6 },
  { date: "Thu", mood: 9, energy: 8, stress: 2 },
  { date: "Fri", mood: 7, energy: 6, stress: 4 },
  { date: "Sat", mood: 8, energy: 9, stress: 2 },
  { date: "Sun", mood: 9, energy: 8, stress: 1 },
]

// Mock data for emotion distribution
const emotionData = [
  { name: "Happy", value: 35, color: "#10b981" },
  { name: "Calm", value: 25, color: "#3b82f6" },
  { name: "Excited", value: 20, color: "#f59e0b" },
  { name: "Grateful", value: 15, color: "#8b5cf6" },
  { name: "Anxious", value: 5, color: "#ef4444" },
]

// Mock journal entries
const journalEntries = [
  {
    id: 1,
    title: "Morning Meditation",
    date: "2024-01-15",
    emotion: "Calm",
    emotionColor: "bg-blue-100 text-blue-800",
    preview: "Started the day with a peaceful 10-minute meditation session...",
  },
  {
    id: 2,
    title: "Team Meeting Success",
    date: "2024-01-14",
    emotion: "Happy",
    emotionColor: "bg-green-100 text-green-800",
    preview: "The presentation went really well and the team was very supportive...",
  },
  {
    id: 3,
    title: "Weekend Plans",
    date: "2024-01-13",
    emotion: "Excited",
    emotionColor: "bg-yellow-100 text-yellow-800",
    preview: "Looking forward to hiking with friends this weekend...",
  },
  {
    id: 4,
    title: "Gratitude Practice",
    date: "2024-01-12",
    emotion: "Grateful",
    emotionColor: "bg-purple-100 text-purple-800",
    preview: "Reflecting on all the positive things that happened this week...",
  },
]

export default function TempDash() {
  const [mood, setMood] = useState([7])
  const [energy, setEnergy] = useState([6])
  const [stress, setStress] = useState([3])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = () => {
    // Handle journal entry submission
    console.log({ title, content, mood: mood[0], energy: energy[0], stress: stress[0] })
    // Reset form
    setTitle("")
    setContent("")
    setMood([7])
    setEnergy([6])
    setStress([3])
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Welcome, Karan!</h1>
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
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Entry Title</label>
                  <Input
                    placeholder="How was your day?"
                    value={title}
                    onChange={(e: { target: { value: SetStateAction<string> } }) => setTitle(e.target.value)}
                    className="border-indigo-200 focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Your thoughts</label>
                  <Textarea
                    placeholder="Write about your day, feelings, or anything on your mind..."
                    value={content}
                    onChange={(e: { target: { value: SetStateAction<string> } }) => setContent(e.target.value)}
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
                  <Slider value={mood} onValueChange={setMood} max={10} min={1} step={1} className="w-full" />
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
                  <Slider value={energy} onValueChange={setEnergy} max={10} min={1} step={1} className="w-full" />
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
                  <Slider value={stress} onValueChange={setStress} max={10} min={1} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Relaxed</span>
                    <span>Stressed</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  Save Entry
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Main Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mood Trends Chart */}
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
                      <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
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
                  <CardTitle className="text-indigo-900">Emotion Distribution</CardTitle>
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
                <div className="grid gap-4">
                  {journalEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-lg border border-indigo-100 bg-white/50 hover:bg-white/70 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{entry.title}</h3>
                        <Badge className={entry.emotionColor}>{entry.emotion}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{entry.preview}</p>
                      <p className="text-xs text-gray-500">{entry.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
