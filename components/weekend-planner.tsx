"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles, Heart, Zap, Music, Coffee, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Mood {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  description: string
}

interface Recommendation {
  id: string
  name: string
  type: "venue" | "event"
  image: string
  location: string
  matchScore: number
  description: string
  tags: string[]
}

export default function WeekendPlanner() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const moods: Mood[] = [
    {
      id: "romantic",
      name: "Romantic",
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-500 to-red-500",
      description: "Intimate vibes for date night",
    },
    {
      id: "energetic",
      name: "Energetic",
      icon: <Zap className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      description: "High energy dancing and fun",
    },
    {
      id: "musical",
      name: "Musical",
      icon: <Music className="w-6 h-6" />,
      color: "from-purple-500 to-blue-500",
      description: "Live music and great acoustics",
    },
    {
      id: "chill",
      name: "Chill",
      icon: <Coffee className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      description: "Relaxed atmosphere to unwind",
    },
    {
      id: "luxury",
      name: "Luxury",
      icon: <Star className="w-6 h-6" />,
      color: "from-amber-500 to-yellow-500",
      description: "Premium experiences and service",
    },
  ]

  const handleMoodSelect = async (moodId: string) => {
    setSelectedMood(moodId)
    setIsGenerating(true)
    setRecommendations([])

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock recommendations based on mood
    const mockRecommendations: Recommendation[] = [
      {
        id: "1",
        name: "Skybar Rooftop",
        type: "venue",
        image: "/placeholder.svg?height=200&width=300",
        location: "Downtown",
        matchScore: 95,
        description: "Perfect rooftop setting with city views",
        tags: ["Rooftop", "Cocktails", "City View"],
      },
      {
        id: "2",
        name: "Jazz Night at Blue Note",
        type: "event",
        image: "/placeholder.svg?height=200&width=300",
        location: "Midtown",
        matchScore: 88,
        description: "Intimate jazz performance tonight",
        tags: ["Jazz", "Live Music", "Intimate"],
      },
      {
        id: "3",
        name: "Electric Lounge",
        type: "venue",
        image: "/placeholder.svg?height=200&width=300",
        location: "East Side",
        matchScore: 82,
        description: "High-energy dance floor with top DJs",
        tags: ["EDM", "Dancing", "Late Night"],
      },
    ]

    setRecommendations(mockRecommendations)
    setIsGenerating(false)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">AI Weekend Planner</h2>
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tell us your mood and let our AI curate the perfect night out for you
          </p>
        </div>

        {/* Mood Selection */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {moods.map((mood) => (
            <Card
              key={mood.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedMood === mood.id ? "ring-2 ring-purple-500 bg-white/20" : "bg-white/10 hover:bg-white/15"
              } backdrop-blur-md border-white/20`}
              onClick={() => handleMoodSelect(mood.id)}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${mood.color} flex items-center justify-center text-white`}
                >
                  {mood.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{mood.name}</h3>
                <p className="text-gray-300 text-sm">{mood.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Processing */}
        {isGenerating && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-white font-medium">AI is crafting your perfect night...</span>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Your Personalized Recommendations</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((rec) => (
                <Card
                  key={rec.id}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
                >
                  <div className="relative">
                    <img
                      src={rec.image || "/placeholder.svg"}
                      alt={rec.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                      {rec.matchScore}% Match
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {rec.name}
                      </h4>
                      <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                        {rec.type}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-3">{rec.location}</p>
                    <p className="text-gray-300 text-sm mb-4">{rec.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {rec.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
