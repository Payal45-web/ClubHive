"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Share2, Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Event } from "@/lib/types"

interface EventHeaderProps {
  event: Event
}

export default function EventHeader({ event }: EventHeaderProps) {
  return (
    <div className="relative h-[50vh] flex items-end">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${event.image})`,
          filter: "brightness(0.4)",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/events">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Action buttons */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.map((tag, index) => (
              <Badge key={index} className="bg-purple-600 text-white border-0">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{event.name}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-300 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-400" />
              <Link href={`/venues/${event.venue.id}`} className="hover:text-purple-400 transition-colors">
                {event.venue.name}, {event.venue.location.city}
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Get Tickets
            </Button>
            <p className="text-white">
              <span className="text-gray-400">From </span>₹{event.ticketPrice.min.toLocaleString()}
              <span className="text-gray-400"> to </span>₹{event.ticketPrice.max.toLocaleString()}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
