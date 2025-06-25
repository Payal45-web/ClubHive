"use client"

import { motion } from "framer-motion"
import { Music, ExternalLink, Instagram } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/types"

interface EventLineupProps {
  event: Event
}

export default function EventLineup({ event }: EventLineupProps) {
  if (!event.lineup || event.lineup.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Music className="h-5 w-5 text-purple-400" />
              Lineup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">No lineup information available for this event.</p>
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
            <Music className="h-5 w-5 text-purple-400" />
            Lineup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {event.lineup.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-4 items-center md:items-start"
              >
                <img
                  src={artist.image || "/placeholder.svg"}
                  alt={artist.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white">{artist.name}</h3>
                  <Badge className="bg-purple-900/30 text-purple-300 border-purple-700 mt-1">{artist.genre}</Badge>
                  <p className="text-gray-400 mt-2">{index === 0 ? "Headliner" : `Supporting Artist ${index}`}</p>

                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    {artist.spotifyUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-700 text-green-400 hover:bg-green-900/20 flex items-center gap-2"
                        onClick={() => window.open(artist.spotifyUrl, "_blank")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 11.973c2.5-1.473 5.5-.973 7.5.527" />
                          <path d="M9 15c1.5-1 4-1 5 .5" />
                          <path d="M7 9c2-1 6-2 10 .5" />
                        </svg>
                        Spotify
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}

                    {artist.instagramUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-pink-700 text-pink-400 hover:bg-pink-900/20 flex items-center gap-2"
                        onClick={() => window.open(artist.instagramUrl, "_blank")}
                      >
                        <Instagram className="h-4 w-4" />
                        Instagram
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-gray-800/50 p-4 rounded-md">
            <h4 className="text-white font-medium mb-2">Set Times</h4>
            <div className="space-y-2">
              {event.lineup.map((artist, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300">{artist.name}</span>
                  <span className="text-gray-400">
                    {index === 0
                      ? `${event.startTime} - ${addMinutesToTime(event.startTime, 90)}`
                      : `${addMinutesToTime(event.startTime, 30 + index * 60)} - ${addMinutesToTime(
                          event.startTime,
                          90 + index * 60,
                        )}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Helper function to add minutes to a time string
function addMinutesToTime(timeStr: string, minutesToAdd: number): string {
  const [hours, minutes] = timeStr.split(":").map((part) => Number.parseInt(part))
  const isPM = timeStr.includes("PM")

  const totalMinutes = hours * 60 + minutes + minutesToAdd
  let newHours = Math.floor(totalMinutes / 60) % 12
  if (newHours === 0) newHours = 12
  const newMinutes = totalMinutes % 60

  return `${newHours}:${newMinutes.toString().padStart(2, "0")} ${isPM ? "PM" : "AM"}`
}
