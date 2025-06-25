"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SearchFilters from "@/components/search/search-filters"
import SearchResults from "@/components/search/search-results"
import SearchMap from "@/components/search/search-map"
import { Button } from "@/components/ui/button"
import { Map, List } from "lucide-react"
import { searchVenues } from "@/lib/api/venues"
import type { Venue, SearchFilters as SearchFiltersType } from "@/lib/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [filters, setFilters] = useState<SearchFiltersType>({
    query: searchParams.get("q") || "",
    location: "",
    category: "",
    priceRange: [0, 10000],
    rating: 0,
    features: [],
    openNow: false,
  })

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true)
      try {
        const results = await searchVenues(filters)
        setVenues(results)
      } catch (error) {
        console.error("Error fetching venues:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVenues()
  }, [filters])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Search Venues
          </h1>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              List
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              className="flex items-center gap-2"
            >
              <Map className="h-4 w-4" />
              Map
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            {viewMode === "list" ? <SearchResults venues={venues} loading={loading} /> : <SearchMap venues={venues} />}
          </div>
        </div>
      </div>
    </main>
  )
}
