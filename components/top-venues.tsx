"use client"

import { useState, useEffect } from "react"
import { MapPin, Users, Star, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Venue {
  id: string
  name: string
  image: string
  location: string
  crowdLevel: "low" | "medium" | "high" | "packed"
  rating: number
  currentEvent?: string
  specialOffer?: {
    title: string
    description: string
    endsIn: string
  }
  isVip: boolean
  priceRange: string
  tags: string[]
}

export default function TopVenues() {
  const [venues, setVenues] = useState<Venue[]>([])

  useEffect(() => {
    // Simulate fetching top venues
    const mockVenues: Venue[] = [
      {
        id: "1",
        name: "Skybar Rooftop",
        image: "/placeholder.svg?height=300&width=400",
        location: "Downtown",
        crowdLevel: "high",
        rating: 4.8,
        currentEvent: "Saturday Night Fever",
        specialOffer: {
          title: "50% Off First Drink",
          description: "Valid until midnight",
          endsIn: "2h 15m",
        },
        isVip: true,
        priceRange: "$$",
        tags: ["Rooftop", "Cocktails", "City View"],
      },
      {
        id: "2",
        name: "Electric Lounge",
        image: "/placeholder.svg?height=300&width=400",
        location: "Midtown",
        crowdLevel: "packed",
        rating: 4.6,
        currentEvent: "Underground Beats",
        isVip: false,
        priceRange: "$$$",
        tags: ["EDM", "Dancing", "Late Night"],
      },
      {
        id: "3",
        name: "Neon Nights",
        image: "/placeholder.svg?height=300&width=400",
        location: "East Side",
        crowdLevel: "medium",
        rating: 4.7,
        specialOffer: {
          title: "Happy Hour Extended",
          description: "2-for-1 cocktails",
          endsIn: "45m",
        },
        isVip: true,
        priceRange: "$$",
        tags: ["Neon", "Retro", "Cocktails"],
      },
    ]
    setVenues(mockVenues)
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
        return "Chill Vibes"
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

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Top Venues Tonight</h2>
            <p className="text-gray-300">The hottest spots in your city right now</p>
          </div>
          <Zap className="w-8 h-8 text-yellow-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {venues.map((venue, index) => (
            <div key={venue.id} className={`group relative ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 h-full">
                <div className="relative">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className={`w-full object-cover ${index === 0 ? "h-64 lg:h-80" : "h-48"}`}
                  />

                  {/* VIP Badge */}
                  {venue.isVip && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        VIP
                      </Badge>
                    </div>
                  )}

                  {/* Crowd Level */}
                  <div className="absolute top-3 right-3">
                    <div
                      className={`${getCrowdLevelColor(venue.crowdLevel)} text-white text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1`}
                    >
                      <Users className="w-3 h-3" />
                      <span>{getCrowdLevelText(venue.crowdLevel)}</span>
                    </div>
                  </div>

                  {/* Special Offer Banner */}
                  {venue.specialOffer && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-sm">{venue.specialOffer.title}</div>
                            <div className="text-xs opacity-90">{venue.specialOffer.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>{venue.specialOffer.endsIn}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className={`p-6 ${index === 0 ? "lg:p-8" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className={`font-bold text-white group-hover:text-purple-300 transition-colors ${
                          index === 0 ? "text-2xl lg:text-3xl" : "text-xl"
                        }`}
                      >
                        {venue.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-300 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{venue.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{venue.rating}</span>
                      </div>
                      <div className="text-gray-400 text-sm">{venue.priceRange}</div>
                    </div>
                  </div>

                  {/* Current Event */}
                  {venue.currentEvent && (
                    <div className="bg-purple-500/20 text-purple-300 px-3 py-2 rounded-lg mb-4">
                      <div className="text-sm font-medium">Now Playing:</div>
                      <div className="text-sm">{venue.currentEvent}</div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-white/10 text-gray-300 border-white/20 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className={`grid gap-3 ${index === 0 ? "lg:grid-cols-2" : "grid-cols-1"}`}>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      View Details
                    </Button>
                    {index === 0 && (
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Book Table
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
