"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Info, Users, Clock, Calendar, AlertTriangle, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/types"

interface EventDetailsProps {
  event: Event
}

export default function EventDetails({ event }: EventDetailsProps) {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Info className="h-5 w-5 text-purple-400" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-4 space-y-4">
              <p className="text-gray-300">{event.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Attendees</p>
                    <p className="text-white">
                      {event.attendees} / {event.maxCapacity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-white">
                      {(() => {
                        const startTime = new Date(`2000-01-01T${event.startTime.replace(" ", "")}`)
                        const endTime = new Date(`2000-01-01T${event.endTime.replace(" ", "")}`)
                        if (endTime < startTime) endTime.setDate(endTime.getDate() + 1)
                        const diffHours = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))
                        return `${diffHours} hours`
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-white font-medium mb-2">Event Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="venue" className="mt-4 space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={event.venue.image || "/placeholder.svg"}
                  alt={event.venue.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-medium text-white">{event.venue.name}</h3>
                  <p className="text-gray-400">{event.venue.type}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <p className="text-gray-300">{event.venue.location.address}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <p className="text-gray-300">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                    , {event.startTime} - {event.endTime}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-48 bg-gray-800 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Venue Map/Location would be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="guidelines" className="mt-4 space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Age Restriction</h4>
                    <p className="text-gray-300">{event.ageRestriction}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">Dress Code</h4>
                    <p className="text-gray-300">{event.dressCode}</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-md mt-4">
                  <h4 className="text-white font-medium mb-2">Important Information</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Valid ID is required for entry</li>
                    <li>Tickets are non-refundable</li>
                    <li>No outside food or drinks allowed</li>
                    <li>Management reserves the right to refuse entry</li>
                    <li>Photography may be restricted in certain areas</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
