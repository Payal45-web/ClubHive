import { Suspense } from "react"
import { notFound } from "next/navigation"
import VenueHeader from "@/components/venue/venue-header"
import VenueGallery from "@/components/venue/venue-gallery"
import VenueBooking from "@/components/venue/venue-booking"
import VenueReviews from "@/components/venue/venue-reviews"
import VenueEvents from "@/components/venue/venue-events"
import VenueMap from "@/components/venue/venue-map"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { getVenueById } from "@/lib/api/venues"

interface VenuePageProps {
  params: {
    id: string
  }
}

export default async function VenuePage({ params }: VenuePageProps) {
  const venue = await getVenueById(params.id)

  if (!venue) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <Suspense fallback={<LoadingSpinner />}>
        <VenueHeader venue={venue} />
      </Suspense>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={<LoadingSpinner />}>
              <VenueGallery venue={venue} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <VenueEvents venueId={venue.id} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <VenueReviews venueId={venue.id} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <VenueMap venue={venue} />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <Suspense fallback={<LoadingSpinner />}>
              <VenueBooking venue={venue} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
