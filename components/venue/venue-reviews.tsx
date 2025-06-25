"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Star, ThumbsUp, Filter, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { getVenueReviews } from "@/lib/api/venues"

interface VenueReviewsProps {
  venueId: string
}

interface Review {
  id: string
  user: {
    name: string
    image: string
  }
  rating: number
  date: string
  content: string
  likes: number
  isLiked: boolean
}

export default function VenueReviews({ venueId }: VenueReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getVenueReviews(venueId)
        setReviews(data)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [venueId])

  const filteredReviews =
    filter === "all"
      ? reviews
      : reviews.filter((review) => {
          if (filter === "5") return review.rating === 5
          if (filter === "4") return review.rating === 4
          if (filter === "3") return review.rating === 3
          if (filter === "1-2") return review.rating <= 2
          return true
        })

  const toggleLike = (reviewId: string) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          const isLiked = !review.isLiked
          return {
            ...review,
            isLiked,
            likes: isLiked ? review.likes + 1 : review.likes - 1,
          }
        }
        return review
      }),
    )
  }

  // Calculate rating distribution
  const ratingCounts = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-24 bg-gray-800 animate-pulse rounded-lg"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-800 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-400" />
            Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-white mb-1">{averageRating.toFixed(1)}</div>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm">{reviews.length} reviews</p>
            </div>

            <div className="md:w-2/3 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="w-12 text-right text-gray-400">{rating} star</div>
                  <Progress
                    value={((ratingCounts[rating] || 0) / reviews.length) * 100}
                    className="h-2 bg-gray-700 flex-1"
                  />
                  <div className="w-12 text-left text-gray-400">{ratingCounts[rating] || 0}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Filter:</span>
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                className={filter === "all" ? "bg-purple-600 text-white" : "border-gray-700 text-gray-400"}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "5" ? "default" : "outline"}
                size="sm"
                className={filter === "5" ? "bg-purple-600 text-white" : "border-gray-700 text-gray-400"}
                onClick={() => setFilter("5")}
              >
                5 Star
              </Button>
              <Button
                variant={filter === "4" ? "default" : "outline"}
                size="sm"
                className={filter === "4" ? "bg-purple-600 text-white" : "border-gray-700 text-gray-400"}
                onClick={() => setFilter("4")}
              >
                4 Star
              </Button>
              <Button
                variant={filter === "3" ? "default" : "outline"}
                size="sm"
                className={filter === "3" ? "bg-purple-600 text-white" : "border-gray-700 text-gray-400"}
                onClick={() => setFilter("3")}
              >
                3 Star
              </Button>
              <Button
                variant={filter === "1-2" ? "default" : "outline"}
                size="sm"
                className={filter === "1-2" ? "bg-purple-600 text-white" : "border-gray-700 text-gray-400"}
                onClick={() => setFilter("1-2")}
              >
                1-2 Star
              </Button>
            </div>

            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              Write Review
            </Button>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No reviews match your filter.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.user.image || "/placeholder.svg"} alt={review.user.name} />
                        <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-white">{review.user.name}</h4>
                        <p className="text-xs text-gray-400">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-300 mt-3">{review.content}</p>

                  <div className="flex justify-end mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-sm flex items-center gap-1 ${
                        review.isLiked ? "text-purple-400" : "text-gray-400"
                      }`}
                      onClick={() => toggleLike(review.id)}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      {review.likes} {review.likes === 1 ? "person" : "people"} found this helpful
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {reviews.length > 5 && (
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-purple-700 text-purple-400 hover:bg-purple-900/20">
                Load More Reviews
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
