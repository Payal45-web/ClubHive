"use client"

import { useState, useEffect } from "react"
import FriendsList from "@/components/friends/friends-list"
import FriendSuggestions from "@/components/friends/friend-suggestions"
import FriendActivity from "@/components/friends/friend-activity"
import FriendGroups from "@/components/friends/friend-groups"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getFriends, getFriendSuggestions, getFriendActivity } from "@/lib/api/friends"
import type { Friend, FriendSuggestion, Activity } from "@/lib/types"

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [suggestions, setSuggestions] = useState<FriendSuggestion[]>([])
  const [activity, setActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [friendsData, suggestionsData, activityData] = await Promise.all([
          getFriends(),
          getFriendSuggestions(),
          getFriendActivity(),
        ])

        setFriends(friendsData)
        setSuggestions(suggestionsData)
        setActivity(activityData)
      } catch (error) {
        console.error("Error fetching friends data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Friends & Community
        </h1>

        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="friends">My Friends</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="mt-8">
            <FriendsList friends={friends} loading={loading} />
          </TabsContent>

          <TabsContent value="suggestions" className="mt-8">
            <FriendSuggestions suggestions={suggestions} loading={loading} />
          </TabsContent>

          <TabsContent value="activity" className="mt-8">
            <FriendActivity activity={activity} loading={loading} />
          </TabsContent>

          <TabsContent value="groups" className="mt-8">
            <FriendGroups />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
