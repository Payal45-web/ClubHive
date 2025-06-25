"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  age: number
  location: string
  interests: string[]
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum"
  status: "going-out" | "open-to-plans" | "at-venue" | "offline"
  isVerified: boolean
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser({
        id: "1",
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "/placeholder.svg?height=60&width=60&text=AJ",
        age: 26,
        location: "Downtown",
        interests: ["EDM", "Cocktails", "Rooftop Bars"],
        loyaltyTier: "gold",
        status: "open-to-plans",
        isVerified: true,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return <UserContext.Provider value={{ user, setUser, isLoading }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
