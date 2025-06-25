"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPopularVenues } from "@/lib/api/venues"
import type { Venue } from "@/lib/types"

export default function PopularVenueCarousel() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getPopularVenues()
        setVenues(data)
      } catch (error) {
        console.error("Error fetching popular venues:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVenues()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3 >= venues.length ? 0 : prevIndex + 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 < 0 ? Math.max(0, venues.length - 3) : prevIndex - 3))
  }

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
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {venues.slice(currentIndex, currentIndex + 3).map((venue, index) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full bg-gray-900/80 border-gray-800 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm">{venue.rating}</span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-black/70 backdrop-blur-sm text-white border-0">{venue.type}</Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">{venue.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{venue.location.address}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {venue.features.slice(0, 3).map((feature, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => (window.location.href = `/venues/${venue.id}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {venues.length > 3 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-10 w-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-10 w-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  )
}
