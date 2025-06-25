"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Star, Crown, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const tiers = [
  {
    name: "Free",
    price: "₹0",
    description: "Basic access to venues and limited features",
    icon: Check,
    color: "from-gray-500 to-gray-600",
    features: ["Browse venues and events", "Limited friend suggestions", "Basic venue information", "No credit limit"],
    popular: false,
  },
  {
    name: "Standard",
    price: "₹499/mo",
    description: "Enhanced features for regular club-goers",
    icon: Star,
    color: "from-blue-500 to-indigo-600",
    features: [
      "Pay Later up to ₹2,000",
      "Early event bookings",
      "Friend invites and group chats",
      "Queue priority at select venues",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹1,499/mo",
    description: "VIP experience for nightlife enthusiasts",
    icon: Crown,
    color: "from-purple-500 to-pink-600",
    features: [
      "Pay Later up to ₹10,000",
      "Exclusive VIP lounge access",
      "20% discount at partner venues",
      "Personal party planner",
    ],
    popular: false,
  },
]

export default function MembershipTiers() {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tiers.map((tier, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onHoverStart={() => setHoveredTier(index)}
          onHoverEnd={() => setHoveredTier(null)}
        >
          <Card
            className={`h-full relative overflow-hidden border-gray-800 ${
              tier.popular ? "bg-gradient-to-b from-gray-900 to-gray-900/90" : "bg-gray-900/80"
            }`}
          >
            {/* Background glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 transition-opacity duration-500 ${
                hoveredTier === index ? "opacity-20" : ""
              }`}
            ></div>

            {/* Popular badge */}
            {tier.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 rounded-tl-none rounded-br-none px-3 py-1 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Popular
                </Badge>
              </div>
            )}

            <CardHeader>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${tier.color} mb-4`}
              >
                <tier.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
              <CardDescription className="text-gray-400">{tier.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <p className="text-3xl font-bold text-white">{tier.price}</p>
              </div>

              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-start gap-2 text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * featureIndex }}
                  >
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white`}>
                {tier.name === "Free" ? "Get Started" : "Upgrade Now"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
