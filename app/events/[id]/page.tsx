import { Suspense } from "react"
import { notFound } from "next/navigation"
import EventHeader from "@/components/event/event-header"
import EventDetails from "@/components/event/event-details"
import EventLineup from "@/components/event/event-lineup"
import EventTickets from "@/components/event/event-tickets"
import EventAttendees from "@/components/event/event-attendees"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { getEventById } from "@/lib/api/events"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id)

  if (!event) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <Suspense fallback={<LoadingSpinner />}>
        <EventHeader event={event} />
      </Suspense>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={<LoadingSpinner />}>
              <EventDetails event={event} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <EventLineup event={event} />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <EventAttendees eventId={event.id} />
            </Suspense>
          </div>

          <div className="lg:col-span-1">
            <Suspense fallback={<LoadingSpinner />}>
              <EventTickets event={event} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
