import type { Friend, FriendSuggestion, Activity } from "@/lib/types"

// Mock data for development - replace with real API calls
const mockFriends: Friend[] = [
  {
    id: "1",
    name: "Alex Johnson",
    image: "/placeholder.svg?height=100&width=100&text=AJ",
    status: "online",
    mutualFriends: 12,
    nightOutPreferences: ["EDM", "Cocktails", "Rooftop Bars"],
  },
  {
    id: "2",
    name: "Jamie Smith",
    image: "/placeholder.svg?height=100&width=100&text=JS",
    status: "at-venue",
    currentVenue: "Skyline Lounge",
    mutualFriends: 8,
    nightOutPreferences: ["Jazz", "Wine Bars", "Live Music"],
  },
  {
    id: "3",
    name: "Taylor Rodriguez",
    image: "/placeholder.svg?height=100&width=100&text=TR",
    status: "offline",
    mutualFriends: 5,
    nightOutPreferences: ["Hip Hop", "Clubs", "Dancing"],
  },
  {
    id: "4",
    name: "Morgan Lee",
    image: "/placeholder.svg?height=100&width=100&text=ML",
    status: "online",
    mutualFriends: 3,
    nightOutPreferences: ["Karaoke", "Craft Beer", "Casual"],
  },
]

const mockSuggestions: FriendSuggestion[] = [
  {
    id: "101",
    name: "Jordan Williams",
    image: "/placeholder.svg?height=100&width=100&text=JW",
    mutualFriends: 7,
    commonInterests: ["EDM", "Rooftop Bars", "Dancing"],
    matchPercentage: 92,
    reason: "You both love EDM and frequently visit similar venues",
  },
  {
    id: "102",
    name: "Casey Thompson",
    image: "/placeholder.svg?height=100&width=100&text=CT",
    mutualFriends: 4,
    commonInterests: ["Jazz", "Cocktails", "Live Music"],
    matchPercentage: 85,
    reason: "You share 4 mutual friends and similar music taste",
  },
  {
    id: "103",
    name: "Riley Garcia",
    image: "/placeholder.svg?height=100&width=100&text=RG",
    mutualFriends: 2,
    commonInterests: ["Hip Hop", "Clubs", "VIP Tables"],
    matchPercentage: 78,
    reason: "You both enjoy similar nightlife venues",
  },
]

const mockActivity: Activity[] = [
  {
    id: "201",
    user: mockFriends[0],
    type: "check-in",
    venue: {
      id: "1",
      name: "Skyline Lounge",
      type: "Rooftop Bar",
      description: "",
      image: "/placeholder.svg?height=400&width=600&text=Skyline+Lounge",
      images: [],
      rating: 4.8,
      reviewCount: 324,
      location: {
        address: "123 High Street, Downtown",
        city: "Mumbai",
        lat: 19.076,
        lng: 72.8777,
      },
      contact: {
        phone: "",
        email: "",
        website: "",
      },
      hours: {},
      features: [],
      priceRange: "",
      capacity: 0,
      crowdLevel: "",
      musicGenres: [],
      dressCode: "",
      ageRestriction: "",
      payLaterEnabled: false,
      bookingEnabled: false,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: "202",
    user: mockFriends[1],
    type: "review",
    venue: {
      id: "2",
      name: "Neon Club",
      type: "Nightclub",
      description: "",
      image: "/placeholder.svg?height=400&width=600&text=Neon+Club",
      images: [],
      rating: 4.6,
      reviewCount: 256,
      location: {
        address: "456 Party Street, City Center",
        city: "Mumbai",
        lat: 19.076,
        lng: 72.8777,
      },
      contact: {
        phone: "",
        email: "",
        website: "",
      },
      hours: {},
      features: [],
      priceRange: "",
      capacity: 0,
      crowdLevel: "",
      musicGenres: [],
      dressCode: "",
      ageRestriction: "",
      payLaterEnabled: false,
      bookingEnabled: false,
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    content: "Amazing DJ set tonight! The crowd was energetic and the drinks were perfect. 5/5 would recommend!",
  },
  {
    id: "203",
    user: mockFriends[2],
    type: "event-rsvp",
    event: {
      id: "1",
      name: "Summer Beats Festival",
      description: "",
      venue: {
        id: "1",
        name: "Skyline Lounge",
        type: "",
        description: "",
        image: "",
        images: [],
        rating: 0,
        reviewCount: 0,
        location: {
          address: "",
          city: "",
          lat: 0,
          lng: 0,
        },
        contact: {
          phone: "",
          email: "",
          website: "",
        },
        hours: {},
        features: [],
        priceRange: "",
        capacity: 0,
        crowdLevel: "",
        musicGenres: [],
        dressCode: "",
        ageRestriction: "",
        payLaterEnabled: false,
        bookingEnabled: false,
      },
      date: "",
      startTime: "",
      endTime: "",
      image: "",
      images: [],
      ticketPrice: {
        min: 0,
        max: 0,
      },
      lineup: [],
      attendees: 0,
      maxCapacity: 0,
      tags: [],
      ageRestriction: "",
      dressCode: "",
    },
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
]

const mockGroups = [
  {
    id: "301",
    name: "Weekend Squad",
    members: [
      { id: "1", name: "Alex Johnson", image: "/placeholder.svg?height=100&width=100&text=AJ" },
      { id: "2", name: "Jamie Smith", image: "/placeholder.svg?height=100&width=100&text=JS" },
      { id: "3", name: "Taylor Rodriguez", image: "/placeholder.svg?height=100&width=100&text=TR" },
    ],
    upcomingEvent: {
      name: "Summer Beats Festival",
      date: "Sat, Jun 15",
      venue: "Skyline Lounge",
    },
    lastActive: new Date().toISOString(),
  },
  {
    id: "302",
    name: "Jazz Lovers",
    members: [
      { id: "2", name: "Jamie Smith", image: "/placeholder.svg?height=100&width=100&text=JS" },
      { id: "4", name: "Morgan Lee", image: "/placeholder.svg?height=100&width=100&text=ML" },
      { id: "102", name: "Casey Thompson", image: "/placeholder.svg?height=100&width=100&text=CT" },
    ],
    upcomingEvent: {
      name: "Jazz & Cocktails",
      date: "Thu, Jun 20",
      venue: "Velvet Underground",
    },
    lastActive: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "303",
    name: "College Crew",
    members: [
      { id: "1", name: "Alex Johnson", image: "/placeholder.svg?height=100&width=100&text=AJ" },
      { id: "3", name: "Taylor Rodriguez", image: "/placeholder.svg?height=100&width=100&text=TR" },
      { id: "103", name: "Riley Garcia", image: "/placeholder.svg?height=100&width=100&text=RG" },
      { id: "101", name: "Jordan Williams", image: "/placeholder.svg?height=100&width=100&text=JW" },
    ],
    lastActive: new Date(Date.now() - 172800000).toISOString(),
  },
]

export async function getFriends(): Promise<Friend[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockFriends
}

export async function getFriendSuggestions(): Promise<FriendSuggestion[]> {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return mockSuggestions
}

export async function getFriendActivity(): Promise<Activity[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockActivity
}

export async function getFriendGroups(): Promise<any[]> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  return mockGroups
}
