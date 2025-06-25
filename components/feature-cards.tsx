"use client"

import { motion } from "framer-motion"
import { Utensils, Music, Wallet, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Bars & Restaurants",
    description: "Discover the best dining spots and bars with exclusive weekend offers",
    icon: Utensils,
    color: "from-blue-500 to-cyan-500",
    delay: 0,
  },
  {
    title: "Clubs & Pubs",
    description: "Find real-time events, DJs, and see crowd levels before you go",
    icon: Music,
    color: "from-purple-500 to-indigo-500",
    delay: 0.1,
  },
  {
    title: "Pay Later",
    description: "Enjoy now and pay later with AI-powered credit limits based on your history",
    icon: Wallet,
    color: "from-green-500 to-emerald-500",
    delay: 0.2,
  },
  {
    title: "Friend Community",
    description: "Connect with people going to similar venues and join the same events",
    icon: Users,
    color: "from-pink-500 to-rose-500",
    delay: 0.3,
  },
]

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: feature.delay }}
          whileHover={{
            y: -10,
            transition: { duration: 0.2 },
          }}
        >
          <Card className="h-full bg-gray-900/80 border-gray-800 hover:border-gray-700 backdrop-blur-sm overflow-hidden group">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            ></div>

            <CardHeader>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${feature.color} mb-4`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              <CardDescription className="text-gray-400">{feature.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="h-32 flex items-center justify-center overflow-hidden rounded-md">
                <img
                  src={`/placeholder.svg?height=300&width=400&text=${feature.title}`}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white`}>
                Explore
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
