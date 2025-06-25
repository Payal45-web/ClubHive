import type { UserLocation } from "@/lib/types"

export async function getUserLocation(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        // In production, use reverse geocoding API
        // For now, return mock data
        resolve({
          lat: latitude,
          lng: longitude,
          city: "Mumbai",
          country: "India",
        })
      },
      (error) => {
        // Fallback to default location
        resolve({
          lat: 19.076,
          lng: 72.8777,
          city: "Mumbai",
          country: "India",
        })
      },
    )
  })
}
