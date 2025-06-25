export interface Venue {
  id: string
  name: string
  type: string
  description: string
  image: string
  images: string[]
  rating: number
  reviewCount: number
  location: {
    address: string
    city: string
    lat: number
    lng: number
  }
  contact: {
    phone: string
    email: string
    website: string
  }
  hours: {
    [key: string]: string
  }
  features: string[]
  priceRange: string
  capacity: number
  crowdLevel: string
  musicGenres: string[]
  dressCode: string
  ageRestriction: string
  payLaterEnabled: boolean
  bookingEnabled: boolean
}

export interface Event {
  id: string
  name: string
  description: string
  venue: Venue
  date: string
  startTime: string
  endTime: string
  image: string
  images: string[]
  ticketPrice: {
    min: number
    max: number
  }
  lineup: Artist[]
  attendees: number
  maxCapacity: number
  tags: string[]
  ageRestriction: string
  dressCode: string
}

export interface Artist {
  id: string
  name: string
  image: string
  genre: string
  spotifyUrl?: string
  instagramUrl?: string
}

export interface Friend {
  id: string
  name: string
  image: string
  status: "online" | "offline" | "at-venue"
  currentVenue?: string
  mutualFriends: number
  nightOutPreferences: string[]
}

export interface FriendSuggestion {
  id: string
  name: string
  image: string
  mutualFriends: number
  commonInterests: string[]
  matchPercentage: number
  reason: string
}

export interface Activity {
  id: string
  user: Friend
  type: "check-in" | "review" | "event-rsvp" | "friend-add"
  venue?: Venue
  event?: Event
  timestamp: string
  content?: string
}

export interface SearchFilters {
  query: string
  location: string
  category: string
  priceRange: [number, number]
  rating: number
  features: string[]
  openNow: boolean
}

export interface PayLaterData {
  creditLimit: number
  availableCredit: number
  currentBalance: number
  nextPaymentDate: string
  paymentHistory: PayLaterTransaction[]
  creditScore: number
  tier: "bronze" | "silver" | "gold" | "platinum"
}

export interface PayLaterTransaction {
  id: string
  venue: string
  amount: number
  date: string
  status: "pending" | "paid" | "overdue"
  dueDate: string
}

export interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
}

export interface UserLocation {
  lat: number
  lng: number
  city: string
  country: string
}
