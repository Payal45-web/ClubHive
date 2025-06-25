"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Music, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample events data
const events = [
  {
    id: 1,
    name: "Summer Beats Festival",
    venue: "Skyline Lounge",
    image: "/placeholder.svg?height=400&width=600&text=Summer+Beats",
    date: "Sat, Jun 15",
    time: "8:00 PM - 2:00 AM",
    location: "Downtown",
    musicType: "EDM, House",
    attendees: 128,
    friends: [
      { name: "Alex", image: "/placeholder.svg?height=50&width=50&text=A" },
      { name: "Jamie", image: "/placeholder.svg?height=50&width=50&text=J" },
      { name: "Taylor", image: "/placeholder.svg?height=50&width=50&text=T" },
    ],
  },
  {
    id: 2,
    name: "Neon Nights",
    venue: "Pulse Nightclub",
    image: "/placeholder.svg?height=400&width=600&text=Neon+Nights",
    date: "Fri, Jun 21",
    time: "10:00 PM - 4:00 AM",
    location: "Waterfront",
    musicType: "Hip Hop, R&B",
    attendees: 95,
    friends: [
      { name: "Morgan", image: "/placeholder.svg?height=50&width=50&text=M" },
      { name: "Casey", image: "/placeholder.svg?height=50&width=50&text=C" },
    ],
  },
  {
    id: 3,
    name: "Jazz & Cocktails",
    venue: "Velvet Underground",
    image: "/placeholder.svg?height=400&width=600&text=Jazz+Cocktails",
    date: "Thu, Jun 20",
    time: "7:00 PM - 12:00 AM",
    location: "Arts District",
    musicType: "Jazz, Blues",
    attendees: 62,
    friends: [{ name: "Jordan", image: "/placeholder.svg?height=50&width=50&text=J" }],
  },
]

export default function FeaturedEvents() {
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
                <p className="text-gray-300">{event.venue}</p>
              </div>
            </div>

            <CardHeader className="p-4 pb-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Music className="h-4 w-4 text-purple-400" />
                  <span>{event.musicType}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-0 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-gray-400">{event.attendees} attending</span>
                </div>

                <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-700">
                  Trending
                </Badge>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Friends going:</p>
                <div className="flex -space-x-2">
                  {event.friends.map((friend, friendIndex) => (
                    <Avatar key={friendIndex} className="border-2 border-gray-900 h-8 w-8">
                      <AvatarImage src={friend.image || "/placeholder.svg"} alt={friend.name} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-xs text-white border-2 border-gray-900">
                    +{event.attendees - event.friends.length}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                RSVP Now
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
