"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, Maximize, Minimize } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Venue } from "@/lib/types"

interface SearchMapProps {
  venues: Venue[]
}

export default function SearchMap({ venues }: SearchMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    // In a real implementation, this would initialize a map like Google Maps or Mapbox
    // For now, we'll just simulate a map with a placeholder
    const initMap = () => {
      if (mapRef.current) {
        // Map initialization would go here
        console.log("Map initialized with venues:", venues)
      }
    }

    initMap()
  }, [venues])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 p-4 bg-gray-900" : "h-[600px]"}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-lg overflow-hidden"
      >
        <div ref={mapRef} className="w-full h-full bg-gray-800 relative">
          {/* This would be replaced with an actual map component */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-2">Interactive Map</p>
              <p className="text-sm text-gray-500">
                In a real implementation, this would be a Google Maps or Mapbox integration showing all {venues.length}{" "}
                venues.
              </p>
            </div>
          </div>

          {/* Simulated venue markers */}
          {venues.map((venue, index) => (
            <div
              key={venue.id}
              className="absolute w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: `${20 + ((index * 15) % 80)}%`,
                top: `${30 + ((index * 10) % 50)}%`,
              }}
              onClick={() => setSelectedVenue(venue)}
            >
              <MapPin className="h-4 w-4 text-white" />
            </div>
          ))}

          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-black/50 backdrop-blur-sm border-gray-700 text-white hover:bg-black/70"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Venue info card */}
      {selectedVenue && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
          <Card className="bg-black/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white">{selectedVenue.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm">{selectedVenue.rating}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-1">{selectedVenue.type}</p>
              <p className="text-gray-400 text-sm mt-2">{selectedVenue.location.address}</p>

              <div className="flex flex-wrap gap-1 mt-3">
                {selectedVenue.features.slice(0, 3).map((feature, i) => (
                  <Badge key={i} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700 text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              <Button
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                size="sm"
                onClick={() => (window.location.href = `/venues/${selectedVenue.id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
