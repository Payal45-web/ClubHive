"use client"

import { useState, useEffect } from "react"
import { MapPin, Users, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TrendingItem {
  id: string
  name: string
  type: "venue" | "event" | "user"
  image: string
  location?: string
  crowdLevel?: "low" | "medium" | "high" | "packed"
  rating?: number
  attendees?: number
  price?: string
  tags?: string[]
  isVerified?: boolean
}

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState<"venues" | "events" | "users">("venues")
  const [trendingData, setTrendingData] = useState<Record<string, TrendingItem[]>>({})

  useEffect(() => {
    // Simulate fetching trending data
    const mockData = {
      venues: [
        {
          id: "1",
          name: "Skybar Rooftop",
          type: "venue" as const,
          image: "/placeholder.svg?height=200&width=300",
          location: "Downtown",
          crowdLevel: "high" as const,
          rating: 4.8,
          attendees: 234,
          price: "$$",
          tags: ["Rooftop", "Cocktails", "City View"],
        },
        {
          id: "2",
          name: "Electric Lounge",
          type: "venue" as const,
          image: "/placeholder.svg?height=200&width=300",
          location: "Midtown",
          crowdLevel: "packed" as const,
          rating: 4.6,
          attendees: 456,
          price: "$$$",
          tags: ["EDM", "Dancing", "Late Night"],
        },
        {
          id: "3",
          name: "Neon Nights",
          type: "venue" as const,
          image: "/placeholder.svg?height=200&width=300",
          location: "East Side",
          crowdLevel: "medium" as const,
          rating: 4.7,
          attendees: 123,
          price: "$$",
          tags: ["Neon", "Retro", "Cocktails"],
        },
      ],
      events: [
        {
          id: "1",
          name: "Saturday Night Fever",
          type: "event" as const,
          image: "/placeholder.svg?height=200&width=300",
          location: "Skybar Rooftop",
          attendees: 234,
          price: "$25",
          tags: ["DJ Set", "Dancing", "Rooftop"],
        },
        {
          id: "2",
          name: "Underground Beats",
          type: "event" as const,
          image: "/placeholder.svg?height=200&width=300",
          location: "Electric Lounge",
          attendees: 456,
          price: "$30",
          tags: ["Techno", "Underground", "Late Night"],
        },
      ],
      users: [
        {
          id: "1",
          name: "Sarah Chen",
          type: "user" as const,
          image: "/placeholder.svg?height=200&width=200",
          isVerified: true,
          tags: ["Influencer", "Nightlife", "Photography"],
        },
        {
          id: "2",
          name: "Mike Rodriguez",
          type: "user" as const,
          image: "/placeholder.svg?height=200&width=200",
          isVerified: false,
          tags: ["DJ", "Music", "Events"],
        },
      ],
    }
    setTrendingData(mockData)
  }, [])

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "packed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCrowdLevelText = (level: string) => {
    switch (level) {
      case "low":
        return "Chill"
      case "medium":
        return "Getting Busy"
      case "high":
        return "Buzzing"
      case "packed":
        return "Packed!"
      default:
        return "Unknown"
    }
  }

  const currentData = trendingData[activeTab] || []

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Trending Now</h2>
            <p className="text-gray-300">What's hot in your city tonight</p>
          </div>
          <TrendingUp className="w-8 h-8 text-purple-400" />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white/10 backdrop-blur-md rounded-full p-1 w-fit">
          {(["venues", "events", "users"] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2 transition-all duration-200 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="relative">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />

                {/* Crowd Level Indicator for Venues */}
                {item.type === "venue" && item.crowdLevel && (
                  <div className="absolute top-3 right-3">
                    <div
                      className={`${getCrowdLevelColor(item.crowdLevel)} text-white text-xs px-3 py-1 rounded-full font-medium`}
                    >
                      {getCrowdLevelText(item.crowdLevel)}
                    </div>
                  </div>
                )}

                {/* Verification Badge */}
                {item.isVerified && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {item.name}
                </h3>

                {item.location && (
                  <div className="flex items-center space-x-2 text-gray-300 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                )}

                {/* Rating for Venues */}
                {item.rating && (
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{item.rating}</span>
                    <span className="text-gray-400 text-sm">rating</span>
                  </div>
                )}

                {/* Attendees */}
                {item.attendees && (
                  <div className="flex items-center space-x-2 text-gray-300 mb-3">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{item.attendees} people here</span>
                  </div>
                )}

                {/* Price */}
                {item.price && <div className="text-purple-400 font-bold mb-3">{item.price}</div>}

                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
