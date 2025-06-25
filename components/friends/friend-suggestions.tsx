"use client"

import { motion } from "framer-motion"
import { UserPlus, Users, Percent } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { FriendSuggestion } from "@/lib/types"

interface FriendSuggestionsProps {
  suggestions: FriendSuggestion[]
  loading: boolean
}

export default function FriendSuggestions({ suggestions, loading }: FriendSuggestionsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suggestions.map((suggestion, index) => (
        <motion.div
          key={suggestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="h-full bg-gray-900/80 border-gray-800 hover:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={suggestion.image || "/placeholder.svg"} alt={suggestion.name} />
                  <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white text-lg">{suggestion.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{suggestion.mutualFriends} mutual friends</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-sm">
                    <Percent className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300">Match Score</span>
                  </div>
                  <span className="text-white font-medium">{suggestion.matchPercentage}%</span>
                </div>
                <Progress value={suggestion.matchPercentage} className="h-2 bg-gray-700" />
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">{suggestion.reason}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {suggestion.commonInterests.map((interest, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700 text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Add Friend
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
