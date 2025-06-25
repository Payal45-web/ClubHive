"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Venue } from "@/lib/types"

interface VenueMapProps {
  venue: Venue
}

export default function VenueMap({ venue }: VenueMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real implementation, this would initialize a map like Google Maps or Mapbox
    // For now, we'll just simulate a map with a placeholder
    const initMap = () => {
      if (mapRef.current) {
        // Map initialization would go here
        console.log("Map initialized with venue location:", venue.location)
      }
    }

    initMap()
  }, [venue])

  const getDirections = () => {
    // In a real implementation, this would open directions in Google Maps or similar
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${venue.location.lat},${venue.location.lng}`,
      "_blank",
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-400" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mapRef} className="w-full h-64 bg-gray-800 rounded-lg relative mb-4">
            {/* This would be replaced with an actual map component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Interactive Map</p>
                <p className="text-sm text-gray-500">
                  In a real implementation, this would be a Google Maps or Mapbox integration showing the venue
                  location.
                </p>
              </div>
            </div>

            {/* Simulated venue marker */}
            <div
              className="absolute w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-white font-medium">{venue.name}</p>
            <p className="text-gray-400">{venue.location.address}</p>
            <p className="text-gray-400">{venue.location.city}</p>
          </div>

          <div className="mt-4">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center justify-center gap-2"
              onClick={getDirections}
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
