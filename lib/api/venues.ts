import type { Venue, SearchFilters } from "@/lib/types"

// Mock data for development - replace with real API calls
const mockVenues: Venue[] = [
  {
    id: "1",
    name: "Skyline Lounge",
    type: "Rooftop Bar",
    description: "Premium rooftop experience with panoramic city views and craft cocktails",
    image: "/placeholder.svg?height=400&width=600&text=Skyline+Lounge",
    images: [
      "/placeholder.svg?height=400&width=600&text=Skyline+Interior",
      "/placeholder.svg?height=400&width=600&text=Skyline+View",
      "/placeholder.svg?height=400&width=600&text=Skyline+Bar",
    ],
    rating: 4.8,
    reviewCount: 324,
    location: {
      address: "123 High Street, Downtown",
      city: "Mumbai",
      lat: 19.076,
      lng: 72.8777,
    },
    contact: {
      phone: "+91 98765 43210",
      email: "info@skylinelounge.com",
      website: "https://skylinelounge.com",
    },
    hours: {
      monday: "6:00 PM - 2:00 AM",
      tuesday: "6:00 PM - 2:00 AM",
      wednesday: "6:00 PM - 2:00 AM",
      thursday: "6:00 PM - 2:00 AM",
      friday: "6:00 PM - 3:00 AM",
      saturday: "6:00 PM - 3:00 AM",
      sunday: "6:00 PM - 1:00 AM",
    },
    features: ["Live Music", "Cocktails", "City View", "Outdoor Seating", "VIP Tables"],
    priceRange: "₹₹₹",
    capacity: 200,
    crowdLevel: "High",
    musicGenres: ["Jazz", "Lounge", "Electronic"],
    dressCode: "Smart Casual",
    ageRestriction: "21+",
    payLaterEnabled: true,
    bookingEnabled: true,
  },
  // Add more mock venues...
]

export async function getVenueReviews(venueId: string): Promise<any[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Mock reviews data
  const mockReviews = [
    {
      id: "r1",
      user: {
        name: "Alex Johnson",
        image: "/placeholder.svg?height=100&width=100&text=AJ",
      },
      rating: 5,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      content:
        "Amazing atmosphere and great cocktails! The rooftop view is absolutely stunning, especially during sunset. The staff was very attentive and the music was perfect for the vibe. Definitely coming back!",
      likes: 12,
      isLiked: false,
    },
    {
      id: "r2",
      user: {
        name: "Jamie Smith",
        image: "/placeholder.svg?height=100&width=100&text=JS",
      },
      rating: 4,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      content:
        "Great place for a night out with friends. The drinks are a bit pricey but the quality is excellent. The DJ was fantastic and kept the energy high all night. Only downside was the wait time for drinks during peak hours.",
      likes: 8,
      isLiked: true,
    },
    {
      id: "r3",
      user: {
        name: "Taylor Rodriguez",
        image: "/placeholder.svg?height=100&width=100&text=TR",
      },
      rating: 5,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      content:
        "Perfect venue for special occasions! Celebrated my birthday here and the staff went above and beyond to make it memorable. The VIP section was worth every penny. Highly recommend for anyone looking for a premium experience.",
      likes: 15,
      isLiked: false,
    },
    {
      id: "r4",
      user: {
        name: "Morgan Lee",
        image: "/placeholder.svg?height=100&width=100&text=ML",
      },
      rating: 3,
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      content:
        "Decent place but nothing extraordinary. The music was too loud for conversation and the crowd was quite young. Food options were limited. It's okay for a casual night out but there are better options in the area.",
      likes: 3,
      isLiked: false,
    },
    {
      id: "r5",
      user: {
        name: "Casey Thompson",
        image: "/placeholder.svg?height=100&width=100&text=CT",
      },
      rating: 4,
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      content:
        "Love the ambiance and the live music nights are fantastic! The jazz performances on Thursdays are a must-see. Great selection of craft cocktails and the bartenders really know their stuff. Will definitely be back for more live music.",
      likes: 9,
      isLiked: true,
    },
    {
      id: "r6",
      user: {
        name: "Jordan Williams",
        image: "/placeholder.svg?height=100&width=100&text=JW",
      },
      rating: 5,
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      content:
        "Absolutely love this place! The outdoor seating area is beautiful and the city views are incredible. Perfect for date nights or catching up with friends. The service is always top-notch and the atmosphere is exactly what you want for a night out.",
      likes: 18,
      isLiked: false,
    },
    {
      id: "r7",
      user: {
        name: "Riley Garcia",
        image: "/placeholder.svg?height=100&width=100&text=RG",
      },
      rating: 2,
      date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      content:
        "Disappointing experience. The venue was overcrowded and the service was slow. Waited 30 minutes just to get a drink. The music was way too loud and the dance floor was uncomfortably packed. Expected much better based on the reviews.",
      likes: 2,
      isLiked: false,
    },
    {
      id: "r8",
      user: {
        name: "Avery Brown",
        image: "/placeholder.svg?height=100&width=100&text=AB",
      },
      rating: 4,
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      content:
        "Great spot for weekend parties! The DJ lineup is always impressive and the sound system is top quality. Drinks are reasonably priced for the location. The only issue is parking can be a nightmare on busy nights, so plan accordingly.",
      likes: 7,
      isLiked: true,
    },
  ]

  return mockReviews
}

export async function getVenues(): Promise<Venue[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockVenues
}

export async function getVenueById(id: string): Promise<Venue | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockVenues.find((venue) => venue.id === id) || null
}

export async function searchVenues(filters: SearchFilters): Promise<Venue[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  let filteredVenues = mockVenues

  if (filters.query) {
    filteredVenues = filteredVenues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        venue.type.toLowerCase().includes(filters.query.toLowerCase()),
    )
  }

  if (filters.category) {
    filteredVenues = filteredVenues.filter((venue) => venue.type === filters.category)
  }

  if (filters.rating > 0) {
    filteredVenues = filteredVenues.filter((venue) => venue.rating >= filters.rating)
  }

  return filteredVenues
}

export async function getPopularVenues(): Promise<Venue[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return mockVenues.sort((a, b) => b.rating - a.rating).slice(0, 6)
}
