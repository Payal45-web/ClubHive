"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Music, Users, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getEventsByVenueId } from "@/lib/api/events"
import type { Event } from "@/lib/types"

interface VenueEventsProps {
  venueId: string
}

export default function VenueEvents({ venueId }: VenueEventsProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEventsByVenueId(venueId)
        setEvents(data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [venueId])

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 bg-gray-800 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (events.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">No upcoming events at this venue.</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800/50 rounded-lg"
              >
                <div className="md:w-1/4">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.name}
                    className="w-full h-32 md:h-full object-cover rounded-md"
                  />
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-lg font-semibold text-white">{event.name}</h3>

                  <div className="flex flex-wrap gap-4 mt-2">
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
                      <Music className="h-4 w-4 text-purple-400" />
                      <span>{event.lineup.map((artist) => artist.name).join(", ")}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {event.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-white">
                      <span className="text-gray-400">From </span>₹{event.ticketPrice.min.toLocaleString()}
                    </div>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
                      onClick={() => (window.location.href = `/events/${event.id}`)}
                    >
                      View Event
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
