"use client"

import { motion } from "framer-motion"
import { MapPin, Star, Calendar, UserPlus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Activity } from "@/lib/types"

interface FriendActivityProps {
  activity: Activity[]
  loading: boolean
}

export default function FriendActivity({ activity, loading }: FriendActivityProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "check-in":
        return <MapPin className="h-4 w-4 text-blue-400" />
      case "review":
        return <Star className="h-4 w-4 text-yellow-400" />
      case "event-rsvp":
        return <Calendar className="h-4 w-4 text-green-400" />
      case "friend-add":
        return <UserPlus className="h-4 w-4 text-purple-400" />
      default:
        return <MapPin className="h-4 w-4 text-blue-400" />
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case "check-in":
        return (
          <span>
            checked in at <span className="font-medium text-white">{activity.venue?.name}</span>
          </span>
        )
      case "review":
        return (
          <span>
            reviewed <span className="font-medium text-white">{activity.venue?.name}</span>
          </span>
        )
      case "event-rsvp":
        return (
          <span>
            is attending <span className="font-medium text-white">{activity.event?.name}</span>
          </span>
        )
      case "friend-add":
        return <span>added a new friend</span>
      default:
        return <span>did something</span>
    }
  }

  return (
    <div className="space-y-4">
      {activity.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="bg-gray-900/80 border-gray-800 hover:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.user.image || "/placeholder.svg"} alt={item.user.name} />
                  <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{item.user.name}</span>
                    <span className="text-gray-400">{getActivityText(item)}</span>
                  </div>

                  {item.content && (
                    <p className="text-sm text-gray-300 mt-1 bg-gray-800/50 p-2 rounded-md">{item.content}</p>
                  )}

                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    {getActivityIcon(item.type)}
                    <span>
                      {new Date(item.timestamp).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
