import type { WeatherData } from "@/lib/types"

export async function getCurrentWeather(lat: number, lng: number): Promise<WeatherData> {
  // In production, use a real weather API like OpenWeatherMap
  // For now, return mock data
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
    condition: ["Clear", "Cloudy", "Partly Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
  }
}
