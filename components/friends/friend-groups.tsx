"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Plus, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFriendGroups } from "@/lib/api/friends"

interface FriendGroup {
  id: string
  name: string
  members: {
    id: string
    name: string
    image: string
  }[]
  upcomingEvent?: {
    name: string
    date: string
    venue: string
  }
  lastActive: string
}

export default function FriendGroups() {
  const [groups, setGroups] = useState<FriendGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getFriendGroups()
        setGroups(data)
      } catch (error) {
        console.error("Error fetching friend groups:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Your Groups</h2>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full bg-gray-900/80 border-gray-800 hover:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  {group.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex -space-x-2 mb-4">
                  {group.members.slice(0, 5).map((member) => (
                    <Avatar key={member.id} className="border-2 border-gray-900 h-8 w-8">
                      <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {group.members.length > 5 && (
                    <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-xs text-white border-2 border-gray-900">
                      +{group.members.length - 5}
                    </div>
                  )}
                </div>

                {group.upcomingEvent ? (
                  <div className="bg-gray-800/50 p-3 rounded-md mb-3">
                    <div className="flex items-center gap-2 text-sm text-white mb-1">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span>Upcoming: {group.upcomingEvent.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {group.upcomingEvent.venue} • {group.upcomingEvent.date}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 p-3 rounded-md mb-3 text-sm text-gray-400">
                    No upcoming events planned
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Last active: {new Date(group.lastActive).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full border-purple-700 text-purple-400 hover:bg-purple-900/20">
                  View Group
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
