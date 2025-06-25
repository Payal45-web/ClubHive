"use client"

import { motion } from "framer-motion"
import { Star, MapPin, Clock, Share2, Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Venue } from "@/lib/types"

interface VenueHeaderProps {
  venue: Venue
}

export default function VenueHeader({ venue }: VenueHeaderProps) {
  return (
    <div className="relative h-[50vh] flex items-end">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${venue.image})`,
          filter: "brightness(0.4)",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/venues">
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
            <Badge className="bg-purple-600 text-white border-0">{venue.type}</Badge>
            {venue.payLaterEnabled && <Badge className="bg-green-600 text-white border-0">Pay Later</Badge>}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{venue.name}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-300 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span>{venue.location.address}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <span>{venue.hours.friday} (Today)</span>
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span>
                {venue.rating} ({venue.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {venue.features.slice(0, 5).map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-black/50 backdrop-blur-sm text-white border-gray-700">
                {feature}
              </Badge>
            ))}
            {venue.features.length > 5 && (
              <Badge variant="outline" className="bg-black/50 backdrop-blur-sm text-white border-gray-700">
                +{venue.features.length - 5} more
              </Badge>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
