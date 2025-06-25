"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Tag, Star, Clock, Filter, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import type { SearchFilters as SearchFiltersType } from "@/lib/types"

interface SearchFiltersProps {
  filters: SearchFiltersType
  onFiltersChange: (filters: SearchFiltersType) => void
}

export default function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    category: true,
    features: true,
    price: true,
    rating: true,
  })

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    const updatedFilters = { ...localFilters, [key]: value }
    setLocalFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const toggleFeature = (feature: string) => {
    const features = localFilters.features.includes(feature)
      ? localFilters.features.filter((f) => f !== feature)
      : [...localFilters.features, feature]
    handleFilterChange("features", features)
  }

  const resetFilters = () => {
    const resetFilters: SearchFiltersType = {
      query: "",
      location: "",
      category: "",
      priceRange: [0, 10000],
      rating: 0,
      features: [],
      openNow: false,
    }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  const toggleSection = (section: string) => {
    setExpanded({ ...expanded, [section]: !expanded[section] })
  }

  const categories = ["All", "Rooftop Bar", "Nightclub", "Lounge Bar", "Pub", "Restaurant", "Brewery"]
  const features = [
    "Live Music",
    "Outdoor Seating",
    "Cocktails",
    "Dance Floor",
    "VIP Tables",
    "Sports Screening",
    "Karaoke",
    "Smoking Area",
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="bg-gray-900/80 border-gray-800 sticky top-20">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Filter className="h-5 w-5 text-purple-400" />
              Filters
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-white" onClick={resetFilters}>
              <X className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search venues..."
                value={localFilters.query}
                onChange={(e) => handleFilterChange("query", e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Location..."
                value={localFilters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("category")}>
              <Label className="text-white flex items-center gap-2">
                <Tag className="h-4 w-4 text-purple-400" />
                Category
              </Label>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                {expanded.category ? "-" : "+"}
              </Button>
            </div>

            {expanded.category && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={localFilters.category === category ? "default" : "outline"}
                    className={`cursor-pointer ${
                      localFilters.category === category
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                    }`}
                    onClick={() => handleFilterChange("category", category === "All" ? "" : category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("price")}>
              <Label className="text-white flex items-center gap-2">
                <span className="text-purple-400">₹</span>
                Price Range
              </Label>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                {expanded.price ? "-" : "+"}
              </Button>
            </div>

            {expanded.price && (
              <div className="mt-4 px-2">
                <Slider
                  value={localFilters.priceRange}
                  min={0}
                  max={10000}
                  step={500}
                  onValueChange={(value) => handleFilterChange("priceRange", value)}
                  className="my-6"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>₹{localFilters.priceRange[0]}</span>
                  <span>₹{localFilters.priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("rating")}>
              <Label className="text-white flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                Rating
              </Label>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                {expanded.rating ? "-" : "+"}
              </Button>
            </div>

            {expanded.rating && (
              <div className="flex flex-wrap gap-2 mt-2">
                {[0, 3, 3.5, 4, 4.5].map((rating) => (
                  <Badge
                    key={rating}
                    variant={localFilters.rating === rating ? "default" : "outline"}
                    className={`cursor-pointer ${
                      localFilters.rating === rating
                        ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                        : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                    }`}
                    onClick={() => handleFilterChange("rating", rating)}
                  >
                    {rating === 0 ? "Any" : `${rating}+`}
                    {rating > 0 && <Star className="h-3 w-3 ml-1 inline-block" />}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("features")}>
              <Label className="text-white flex items-center gap-2">
                <Filter className="h-4 w-4 text-purple-400" />
                Features
              </Label>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                {expanded.features ? "-" : "+"}
              </Button>
            </div>

            {expanded.features && (
              <div className="space-y-2 mt-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={localFilters.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                      className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor={feature} className="text-gray-300 text-sm">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-400" />
              Open Now
            </Label>
            <Switch
              checked={localFilters.openNow}
              onCheckedChange={(checked) => handleFilterChange("openNow", checked)}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
