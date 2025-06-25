"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import LoadingSpinner from "@/components/ui/loading-spinner"

// Dynamically import components to avoid SSR issues
const CosmicBackground = dynamic(() => import("@/components/cosmic-background"), {
  ssr: false,
})

const Hero = dynamic(() => import("@/components/hero"), {
  ssr: false,
})

const StoriesCarousel = dynamic(() => import("@/components/stories-carousel"), {
  ssr: false,
})

const TrendingSection = dynamic(() => import("@/components/trending-section"), {
  ssr: false,
})

const WeekendPlanner = dynamic(() => import("@/components/weekend-planner"), {
  ssr: false,
})

const TopVenues = dynamic(() => import("@/components/top-venues"), {
  ssr: false,
})

const ActiveUsers = dynamic(() => import("@/components/active-users"), {
  ssr: false,
})

export default function HomePageClient() {
  return (
    <main className="min-h-screen relative">
      <CosmicBackground />

      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>

        <section className="container mx-auto px-4 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <StoriesCarousel />
          </Suspense>
        </section>

        <section className="container mx-auto px-4 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <TrendingSection />
          </Suspense>
        </section>

        <section className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <WeekendPlanner />
          </Suspense>
        </section>

        <section className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <TopVenues />
          </Suspense>
        </section>

        <section className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <ActiveUsers />
          </Suspense>
        </section>
      </div>
    </main>
  )
}
