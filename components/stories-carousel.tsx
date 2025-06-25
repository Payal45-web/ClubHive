"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MapPin, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Story {
  id: string
  user: {
    name: string
    avatar: string
    verified: boolean
  }
  venue: {
    name: string
    location: string
  }
  thumbnail: string
  isLive: boolean
  viewers: number
  timestamp: string
}

export default function StoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    // Simulate fetching stories
    const mockStories: Story[] = [
      {
        id: "1",
        user: {
          name: "Sarah Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: true,
        },
        venue: {
          name: "Skybar Rooftop",
          location: "Downtown",
        },
        thumbnail: "/placeholder.svg?height=200&width=150",
        isLive: true,
        viewers: 234,
        timestamp: "2m ago",
      },
      {
        id: "2",
        user: {
          name: "Mike Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: false,
        },
        venue: {
          name: "Electric Lounge",
          location: "Midtown",
        },
        thumbnail: "/placeholder.svg?height=200&width=150",
        isLive: false,
        viewers: 0,
        timestamp: "15m ago",
      },
      {
        id: "3",
        user: {
          name: "Emma Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: true,
        },
        venue: {
          name: "Neon Nights",
          location: "East Side",
        },
        thumbnail: "/placeholder.svg?height=200&width=150",
        isLive: true,
        viewers: 567,
        timestamp: "5m ago",
      },
      {
        id: "4",
        user: {
          name: "Alex Kim",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: false,
        },
        venue: {
          name: "Underground Club",
          location: "West End",
        },
        thumbnail: "/placeholder.svg?height=200&width=150",
        isLive: false,
        viewers: 0,
        timestamp: "1h ago",
      },
      {
        id: "5",
        user: {
          name: "Jessica Park",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: true,
        },
        venue: {
          name: "Rooftop Paradise",
          location: "Uptown",
        },
        thumbnail: "/placeholder.svg?height=200&width=150",
        isLive: true,
        viewers: 123,
        timestamp: "8m ago",
      },
    ]
    setStories(mockStories)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, stories.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, stories.length - 2)) % Math.max(1, stories.length - 2))
  }

  if (stories.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">Live Stories</h2>
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-32 h-48 bg-gray-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Live Stories</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 140}px)` }}
          >
            {stories.map((story) => (
              <div key={story.id} className="flex-shrink-0 w-32 mr-4">
                <div className="relative group cursor-pointer">
                  {/* Story Thumbnail */}
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-b from-purple-500/20 to-pink-500/20 border border-white/20">
                    <img
                      src={story.thumbnail || "/placeholder.svg"}
                      alt={`${story.user.name}'s story`}
                      className="w-full h-full object-cover"
                    />

                    {/* Live Indicator */}
                    {story.isLive && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span>LIVE</span>
                      </div>
                    )}

                    {/* Viewer Count */}
                    {story.isLive && (
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{story.viewers}</span>
                      </div>
                    )}

                    {/* User Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <img
                          src={story.user.avatar || "/placeholder.svg"}
                          alt={story.user.name}
                          className="w-6 h-6 rounded-full border border-white/50"
                        />
                        <span className="text-white text-xs font-medium truncate">{story.user.name}</span>
                        {story.user.verified && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-1 text-gray-300 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{story.venue.name}</span>
                      </div>

                      <div className="text-gray-400 text-xs mt-1">{story.timestamp}</div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
