"use client"

import { motion } from "framer-motion"
import { Star, MapPin, Clock, Users, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Venue } from "@/lib/types"

interface SearchResultsProps {
  venues: Venue[]
  loading: boolean
}

export default function SearchResults({ venues, loading }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (venues.length === 0) {
    return (
      <div className="bg-gray-900/80 border-gray-800 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">No venues found</h3>
        <p className="text-gray-400 mb-4">Try adjusting your filters or search for something else.</p>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
          Reset Filters
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-400">
          Showing <span className="text-white font-medium">{venues.length}</span> results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Sort by:</span>
          <select className="bg-gray-800 border-gray-700 text-white rounded-md text-sm p-1">
            <option value="relevance">Relevance</option>
            <option value="rating">Rating</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {venues.map((venue, index) => (
        <motion.div
          key={venue.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="bg-gray-900/80 border-gray-800 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative">
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-48 md:h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  >
                    <Heart className="h-4 w-4 text-white" />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-black/70 backdrop-blur-sm text-white border-0">{venue.type}</Badge>
                </div>
              </div>

              <div className="md:w-2/3 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{venue.name}</h3>
                    <p className="text-gray-400 text-sm">{venue.location.address}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{venue.rating}</span>
                    <span className="text-gray-400 text-xs">({venue.reviewCount})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4 text-purple-400" />
                    <span>{venue.location.city}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span>{venue.hours.friday}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span>Crowd: {venue.crowdLevel}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-purple-400">₹</span>
                    <span>{venue.priceRange}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {venue.features.slice(0, 4).map((feature, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                      {feature}
                    </Badge>
                  ))}
                  {venue.features.length > 4 && (
                    <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                      +{venue.features.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center gap-2">
                    {venue.payLaterEnabled && (
                      <Badge className="bg-green-900/30 text-green-300 border-green-700">Pay Later</Badge>
                    )}
                    {venue.bookingEnabled && (
                      <Badge className="bg-blue-900/30 text-blue-300 border-blue-700">Booking Available</Badge>
                    )}
                  </div>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={() => (window.location.href = `/venues/${venue.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
