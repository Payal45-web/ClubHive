"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Phone, Video, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { Friend } from "@/lib/types"

interface FriendsListProps {
  friends: Friend[]
  loading: boolean
}

export default function FriendsList({ friends, loading }: FriendsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      {filteredFriends.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No friends found matching your search.</p>
        </div>
      ) : (
        filteredFriends.map((friend, index) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="bg-gray-900/80 border-gray-800 hover:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={friend.image || "/placeholder.svg"} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 ${
                          friend.status === "online"
                            ? "bg-green-500"
                            : friend.status === "at-venue"
                              ? "bg-purple-500"
                              : "bg-gray-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{friend.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        {friend.status === "at-venue" && friend.currentVenue ? (
                          <>
                            <MapPin className="h-3 w-3" />
                            <span>At {friend.currentVenue}</span>
                          </>
                        ) : friend.status === "online" ? (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>Active now</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>Offline</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {friend.nightOutPreferences.map((pref, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700 text-xs">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  )
}
