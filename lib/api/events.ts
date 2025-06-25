import type { Event, Artist } from "@/lib/types"

// Mock data for development - replace with real API calls
const mockArtists: Artist[] = [
  {
    id: "a1",
    name: "DJ Pulse",
    image: "/placeholder.svg?height=200&width=200&text=DJ+Pulse",
    genre: "EDM",
    spotifyUrl: "https://open.spotify.com/artist/example",
    instagramUrl: "https://instagram.com/djpulse",
  },
  {
    id: "a2",
    name: "Melody Makers",
    image: "/placeholder.svg?height=200&width=200&text=Melody+Makers",
    genre: "Jazz",
    spotifyUrl: "https://open.spotify.com/artist/example2",
    instagramUrl: "https://instagram.com/melodymakers",
  },
  {
    id: "a3",
    name: "Rhythm Collective",
    image: "/placeholder.svg?height=200&width=200&text=Rhythm+Collective",
    genre: "Hip Hop",
    spotifyUrl: "https://open.spotify.com/artist/example3",
    instagramUrl: "https://instagram.com/rhythmcollective",
  },
]

const mockEvents: Event[] = [
  {
    id: "e1",
    name: "Summer Beats Festival",
    description: "The ultimate summer EDM festival featuring top DJs and performers.",
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
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: "8:00 PM",
    endTime: "2:00 AM",
    image: "/placeholder.svg?height=400&width=600&text=Summer+Beats",
    images: [
      "/placeholder.svg?height=400&width=600&text=Summer+Beats+1",
      "/placeholder.svg?height=400&width=600&text=Summer+Beats+2",
      "/placeholder.svg?height=400&width=600&text=Summer+Beats+3",
    ],
    ticketPrice: {
      min: 1500,
      max: 5000,
    },
    lineup: [mockArtists[0], mockArtists[2]],
    attendees: 128,
    maxCapacity: 200,
    tags: ["EDM", "Festival", "Summer", "Dance"],
    ageRestriction: "21+",
    dressCode: "Smart Casual",
  },
  {
    id: "e2",
    name: "Neon Nights",
    description: "Experience the best hip hop and R&B in the city's most vibrant nightclub.",
    venue: {
      id: "2",
      name: "Pulse Nightclub",
      type: "Nightclub",
      description: "",
      image: "/placeholder.svg?height=400&width=600&text=Pulse+Nightclub",
      images: [],
      rating: 4.7,
      reviewCount: 256,
      location: {
        address: "456 Party Street, Waterfront",
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
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: "10:00 PM",
    endTime: "4:00 AM",
    image: "/placeholder.svg?height=400&width=600&text=Neon+Nights",
    images: [
      "/placeholder.svg?height=400&width=600&text=Neon+Nights+1",
      "/placeholder.svg?height=400&width=600&text=Neon+Nights+2",
      "/placeholder.svg?height=400&width=600&text=Neon+Nights+3",
    ],
    ticketPrice: {
      min: 1000,
      max: 3000,
    },
    lineup: [mockArtists[2]],
    attendees: 95,
    maxCapacity: 150,
    tags: ["Hip Hop", "R&B", "VIP Tables", "Dance"],
    ageRestriction: "21+",
    dressCode: "Stylish",
  },
  {
    id: "e3",
    name: "Jazz & Cocktails",
    description: "A sophisticated evening of jazz music and premium craft cocktails.",
    venue: {
      id: "3",
      name: "Velvet Underground",
      type: "Lounge Bar",
      description: "",
      image: "/placeholder.svg?height=400&width=600&text=Velvet+Underground",
      images: [],
      rating: 4.5,
      reviewCount: 189,
      location: {
        address: "789 Arts Avenue, Arts District",
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
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: "7:00 PM",
    endTime: "12:00 AM",
    image: "/placeholder.svg?height=400&width=600&text=Jazz+Cocktails",
    images: [
      "/placeholder.svg?height=400&width=600&text=Jazz+Cocktails+1",
      "/placeholder.svg?height=400&width=600&text=Jazz+Cocktails+2",
      "/placeholder.svg?height=400&width=600&text=Jazz+Cocktails+3",
    ],
    ticketPrice: {
      min: 800,
      max: 1500,
    },
    lineup: [mockArtists[1]],
    attendees: 62,
    maxCapacity: 80,
    tags: ["Jazz", "Cocktails", "Intimate", "Live Music"],
    ageRestriction: "21+",
    dressCode: "Smart Casual",
  },
]

export async function getEventAttendees(eventId: string): Promise<any[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Mock attendees data
  const mockAttendees = [
    {
      id: "u1",
      name: "Alex Johnson",
      image: "/placeholder.svg?height=100&width=100&text=AJ",
      mutualFriends: 5,
      status: "going",
    },
    {
      id: "u2",
      name: "Jamie Smith",
      image: "/placeholder.svg?height=100&width=100&text=JS",
      mutualFriends: 3,
      status: "going",
    },
    {
      id: "u3",
      name: "Taylor Rodriguez",
      image: "/placeholder.svg?height=100&width=100&text=TR",
      mutualFriends: 8,
      status: "maybe",
    },
    {
      id: "u4",
      name: "Morgan Lee",
      image: "/placeholder.svg?height=100&width=100&text=ML",
      mutualFriends: 2,
      status: "going",
    },
    {
      id: "u5",
      name: "Casey Thompson",
      image: "/placeholder.svg?height=100&width=100&text=CT",
      mutualFriends: 0,
      status: "invited",
    },
    {
      id: "u6",
      name: "Jordan Williams",
      image: "/placeholder.svg?height=100&width=100&text=JW",
      mutualFriends: 4,
      status: "going",
    },
    {
      id: "u7",
      name: "Riley Garcia",
      image: "/placeholder.svg?height=100&width=100&text=RG",
      mutualFriends: 1,
      status: "maybe",
    },
    {
      id: "u8",
      name: "Avery Brown",
      image: "/placeholder.svg?height=100&width=100&text=AB",
      mutualFriends: 6,
      status: "going",
    },
  ]

  return mockAttendees
}

export async function getEventById(id: string): Promise<Event | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockEvents.find((event) => event.id === id) || null
}

export async function getEventsByVenueId(venueId: string): Promise<Event[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return mockEvents.filter((event) => event.venue.id === venueId)
}

export async function getNearbyEvents(): Promise<Event[]> {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return mockEvents
}

export async function getUpcomingEvents(): Promise<Event[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
