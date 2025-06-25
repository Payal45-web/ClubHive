"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Music, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getNearbyEvents } from "@/lib/api/events"
import type { Event } from "@/lib/types"

export default function NearbyEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getNearbyEvents()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching nearby events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-80 bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="h-full bg-gray-900/80 border-gray-800 overflow-hidden group">
            <div className="relative overflow-hidden">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{event.name}</h3>
                <p className="text-gray-300">{event.venue.name}</p>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span>{event.venue.location.city}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Music className="h-4 w-4 text-purple-400" />
                  <span>{event.lineup.map((artist) => artist.name).join(", ")}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-400">{event.attendees} attending</span>
                  </div>

                  <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-700">
                    {event.attendees > event.maxCapacity * 0.8 ? "Filling Fast" : "Available"}
                  </Badge>
                </div>

                <div className="flex -space-x-2 mt-2">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Avatar key={i} className="border-2 border-gray-900 h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=50&width=50&text=${String.fromCharCode(65 + i)}`} />
                        <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                      </Avatar>
                    ))}
                  <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-xs text-white border-2 border-gray-900">
                    +{event.attendees - 3}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => (window.location.href = `/events/${event.id}`)}
              >
                RSVP Now
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
