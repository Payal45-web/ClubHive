"use client"

import { useState, useEffect } from "react"
import { MapPin, Users, Zap, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  avatar: string
  status: "at-venue" | "going-out" | "open-to-plans"
  currentVenue?: string
  mood: string
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum"
  mutualFriends: number
  lastSeen: string
  isVerified: boolean
}

export default function ActiveUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [filter, setFilter] = useState<"all" | "at-venue" | "going-out" | "open-to-plans">("all")

  useEffect(() => {
    // Simulate fetching active users
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=60&width=60",
        status: "at-venue",
        currentVenue: "Skybar Rooftop",
        mood: "Dancing",
        loyaltyTier: "gold",
        mutualFriends: 12,
        lastSeen: "now",
        isVerified: true,
      },
      {
        id: "2",
        name: "Mike Rodriguez",
        avatar: "/placeholder.svg?height=60&width=60",
        status: "going-out",
        mood: "Ready to party",
        loyaltyTier: "silver",
        mutualFriends: 8,
        lastSeen: "2m ago",
        isVerified: false,
      },
      {
        id: "3",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=60&width=60",
        status: "open-to-plans",
        mood: "Looking for fun",
        loyaltyTier: "platinum",
        mutualFriends: 15,
        lastSeen: "5m ago",
        isVerified: true,
      },
      {
        id: "4",
        name: "Alex Kim",
        avatar: "/placeholder.svg?height=60&width=60",
        status: "at-venue",
        currentVenue: "Electric Lounge",
        mood: "Vibing",
        loyaltyTier: "bronze",
        mutualFriends: 3,
        lastSeen: "1m ago",
        isVerified: false,
      },
      {
        id: "5",
        name: "Jessica Park",
        avatar: "/placeholder.svg?height=60&width=60",
        status: "going-out",
        mood: "Adventure time",
        loyaltyTier: "gold",
        mutualFriends: 20,
        lastSeen: "now",
        isVerified: true,
      },
    ]
    setUsers(mockUsers)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "at-venue":
        return "bg-green-500"
      case "going-out":
        return "bg-blue-500"
      case "open-to-plans":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "at-venue":
        return "At Venue"
      case "going-out":
        return "Going Out"
      case "open-to-plans":
        return "Open to Plans"
      default:
        return "Unknown"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "text-orange-400"
      case "silver":
        return "text-gray-400"
      case "gold":
        return "text-yellow-400"
      case "platinum":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  const filteredUsers = filter === "all" ? users : users.filter((user) => user.status === filter)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Active Users</h2>
            <p className="text-gray-300">Connect with people who are out and about</p>
          </div>
          <Users className="w-8 h-8 text-blue-400" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["all", "at-venue", "going-out", "open-to-plans"] as const).map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? "default" : "outline"}
              onClick={() => setFilter(filterOption)}
              className={`${
                filter === filterOption
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
              } transition-all duration-200`}
            >
              {filterOption === "all" ? "All Users" : getStatusText(filterOption)}
            </Button>
          ))}
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-16 h-16 rounded-full border-2 border-white/20"
                  />
                  {/* Status Indicator */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(user.status)} rounded-full border-2 border-white`}
                  />

                  {/* Verification Badge */}
                  {user.isVerified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-bold truncate group-hover:text-purple-300 transition-colors">
                      {user.name}
                    </h3>
                    <Badge className={`text-xs ${getTierColor(user.loyaltyTier)} bg-transparent border-current`}>
                      {user.loyaltyTier}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-300 mb-2">{user.mood}</div>

                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className={`px-2 py-1 rounded-full ${getStatusColor(user.status)} text-white`}>
                      {getStatusText(user.status)}
                    </span>
                    <span>•</span>
                    <span>{user.lastSeen}</span>
                  </div>
                </div>
              </div>

              {/* Current Venue */}
              {user.currentVenue && (
                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>At {user.currentVenue}</span>
                </div>
              )}

              {/* Mutual Friends */}
              {user.mutualFriends > 0 && (
                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
                  <Users className="w-4 h-4" />
                  <span>{user.mutualFriends} mutual friends</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Wave
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No users found for this filter</div>
          </div>
        )}
      </div>
    </section>
  )
}
