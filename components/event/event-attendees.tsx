"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, UserPlus, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { getEventAttendees } from "@/lib/api/events"

interface EventAttendeesProps {
  eventId: string
}

interface Attendee {
  id: string
  name: string
  image: string
  mutualFriends: number
  status: "going" | "maybe" | "invited"
}

export default function EventAttendees({ eventId }: EventAttendeesProps) {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const data = await getEventAttendees(eventId)
        setAttendees(data)
      } catch (error) {
        console.error("Error fetching attendees:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttendees()
  }, [eventId])

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Who's Going
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-12 bg-gray-800 animate-pulse rounded-lg mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-800 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-400" />
            Who's Going
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search attendees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {filteredAttendees.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No attendees found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAttendees.map((attendee, index) => (
                <motion.div
                  key={attendee.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={attendee.image || "/placeholder.svg"} alt={attendee.name} />
                      <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{attendee.name}</p>
                      {attendee.mutualFriends > 0 && (
                        <p className="text-xs text-gray-400">{attendee.mutualFriends} mutual friends</p>
                      )}
                    </div>
                  </div>
                  <div>
                    {attendee.status === "going" ? (
                      <span className="text-sm text-green-400">Going</span>
                    ) : attendee.status === "maybe" ? (
                      <span className="text-sm text-yellow-400">Maybe</span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 flex items-center gap-1"
                      >
                        <UserPlus className="h-3 w-3" />
                        Invite
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {attendees.length > 10 && (
            <div className="mt-4 text-center">
              <Button variant="link" className="text-purple-400">
                View all {attendees.length} attendees
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
