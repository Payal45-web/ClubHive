"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Users, Clock, MapPin, Heart } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample venue data
const venues = [
  {
    id: 1,
    name: "Skyline Lounge",
    type: "Rooftop Bar",
    image: "/placeholder.svg?height=400&width=600&text=Skyline+Lounge",
    rating: 4.8,
    crowdLevel: "High",
    location: "Downtown",
    distance: "1.2 km",
    openTime: "6:00 PM",
    closeTime: "2:00 AM",
    tags: ["Live Music", "Cocktails", "View"],
  },
  {
    id: 2,
    name: "Neon Club",
    type: "Nightclub",
    image: "/placeholder.svg?height=400&width=600&text=Neon+Club",
    rating: 4.6,
    crowdLevel: "Very High",
    location: "City Center",
    distance: "0.8 km",
    openTime: "10:00 PM",
    closeTime: "4:00 AM",
    tags: ["EDM", "DJ Sets", "Dance Floor"],
  },
  {
    id: 3,
    name: "Velvet Underground",
    type: "Lounge Bar",
    image: "/placeholder.svg?height=400&width=600&text=Velvet+Underground",
    rating: 4.5,
    crowdLevel: "Medium",
    location: "Arts District",
    distance: "2.1 km",
    openTime: "7:00 PM",
    closeTime: "1:00 AM",
    tags: ["Jazz", "Intimate", "Craft Beer"],
  },
  {
    id: 4,
    name: "Pulse Nightclub",
    type: "Nightclub",
    image: "/placeholder.svg?height=400&width=600&text=Pulse+Nightclub",
    rating: 4.7,
    crowdLevel: "High",
    location: "Waterfront",
    distance: "1.5 km",
    openTime: "9:00 PM",
    closeTime: "3:00 AM",
    tags: ["Hip Hop", "VIP Tables", "Celebrity DJs"],
  },
]

export default function TrendingVenues() {
  const [viewType, setViewType] = useState("grid")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="all" className="w-full max-w-md">
          <TabsList className="bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="bars">Bars</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button
            variant={viewType === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType("grid")}
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            Grid
          </Button>
          <Button
            variant={viewType === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType("list")}
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            List
          </Button>
        </div>
      </div>

      <div className={viewType === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
        {venues.map((venue, index) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card
              className={`h-full bg-gray-900/80 border-gray-800 overflow-hidden group ${
                viewType === "list" ? "flex flex-row" : ""
              }`}
            >
              <div className={`${viewType === "list" ? "w-1/3" : "w-full"} relative overflow-hidden`}>
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    onClick={() => toggleFavorite(venue.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(venue.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                    />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-black/70 backdrop-blur-sm text-white border-0">{venue.type}</Badge>
                </div>
              </div>

              <div className={viewType === "list" ? "w-2/3" : "w-full"}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white">{venue.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{venue.rating}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-0 pb-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {venue.location} • {venue.distance}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>
                        {venue.openTime} - {venue.closeTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>Crowd: {venue.crowdLevel}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {venue.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="bg-gray-800/50 text-gray-300 border-gray-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Book Now
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
