"use client"

import { useState, useEffect } from "react"
import PayLaterDashboard from "@/components/pay-later/pay-later-dashboard"
import PayLaterHistory from "@/components/pay-later/pay-later-history"
import PayLaterSettings from "@/components/pay-later/pay-later-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPayLaterData } from "@/lib/api/pay-later"
import type { PayLaterData } from "@/lib/types"

export default function PayLaterPage() {
  const [payLaterData, setPayLaterData] = useState<PayLaterData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPayLaterData()
        setPayLaterData(data)
      } catch (error) {
        console.error("Error fetching pay later data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
          Pay Later Portal
        </h1>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8">
            <PayLaterDashboard data={payLaterData} loading={loading} />
          </TabsContent>

          <TabsContent value="history" className="mt-8">
            <PayLaterHistory data={payLaterData} loading={loading} />
          </TabsContent>

          <TabsContent value="settings" className="mt-8">
            <PayLaterSettings data={payLaterData} loading={loading} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
