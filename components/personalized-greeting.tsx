"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Thermometer } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCurrentWeather } from "@/lib/api/weather"
import { getUserLocation } from "@/lib/geolocation"

export default function PersonalizedGreeting() {
  const [greeting, setGreeting] = useState("")
  const [weather, setWeather] = useState<any>(null)
  const [location, setLocation] = useState<string>("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 17) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

    const fetchLocationAndWeather = async () => {
      try {
        const userLocation = await getUserLocation()
        setLocation(userLocation.city)

        const weatherData = await getCurrentWeather(userLocation.lat, userLocation.lng)
        setWeather(weatherData)
      } catch (error) {
        console.error("Error fetching location/weather:", error)
      }
    }

    fetchLocationAndWeather()
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{greeting}, Ready for Tonight?</h2>
              <p className="text-gray-300">Discover the perfect venues and events for your night out</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {location && (
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              )}

              {weather && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Thermometer className="h-4 w-4" />
                  <span>{weather.temperature}°C</span>
                  <Badge variant="outline" className="bg-gray-800/50 text-gray-300">
                    {weather.condition}
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4" />
                <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
