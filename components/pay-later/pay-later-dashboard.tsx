"use client"

import { motion } from "framer-motion"
import { CreditCard, Wallet, Calendar, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { PayLaterData } from "@/lib/types"

interface PayLaterDashboardProps {
  data: PayLaterData | null
  loading: boolean
}

export default function PayLaterDashboard({ data, loading }: PayLaterDashboardProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Pay Later Data Available</h3>
        <p className="text-gray-400 mb-6">You haven't set up your Pay Later account yet.</p>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
          Set Up Pay Later
        </Button>
      </div>
    )
  }

  const creditUsagePercentage = (data.currentBalance / data.creditLimit) * 100

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="bg-gray-900/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-green-400" />
                Credit Limit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₹{data.creditLimit.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">
                {data.tier === "platinum" ? "Maximum tier reached" : "Increase limit with more activity"}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-gray-900/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-blue-400" />
                Available Credit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₹{data.availableCredit.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">
                {creditUsagePercentage > 75
                  ? "Low available credit"
                  : creditUsagePercentage > 50
                    ? "Moderate available credit"
                    : "Good available credit"}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-gray-900/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-400" />
                Next Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {new Date(data.nextPaymentDate).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
              </div>
              <div className="text-xs text-gray-500 mt-1">₹{data.currentBalance.toLocaleString()} due</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-gray-900/80 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-yellow-400" />
                Credit Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.creditScore}</div>
              <div className="text-xs text-gray-500 mt-1">
                {data.creditScore > 750 ? "Excellent" : data.creditScore > 650 ? "Good" : "Average"} score
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="bg-gray-900/80 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-white">Credit Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Current Balance</p>
                  <p className="text-lg font-semibold text-white">₹{data.currentBalance.toLocaleString()}</p>
                </div>
                <Badge
                  className={`${
                    creditUsagePercentage > 75
                      ? "bg-red-900/50 text-red-300 border-red-700"
                      : creditUsagePercentage > 50
                        ? "bg-yellow-900/50 text-yellow-300 border-yellow-700"
                        : "bg-green-900/50 text-green-300 border-green-700"
                  }`}
                >
                  {creditUsagePercentage.toFixed(0)}% Used
                </Badge>
              </div>
              <Progress value={creditUsagePercentage} className="h-2 bg-gray-700" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹0</span>
                <span>₹{data.creditLimit.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">Membership Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  data.tier === "platinum"
                    ? "bg-gradient-to-br from-gray-300 to-gray-500"
                    : data.tier === "gold"
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      : data.tier === "silver"
                        ? "bg-gradient-to-br from-gray-400 to-gray-600"
                        : "bg-gradient-to-br from-amber-700 to-amber-900"
                }`}
              >
                <span className="text-2xl font-bold text-white">
                  {data.tier === "platinum" ? "P" : data.tier === "gold" ? "G" : data.tier === "silver" ? "S" : "B"}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white capitalize">{data.tier} Tier</h3>
                <p className="text-sm text-gray-400">
                  {data.tier === "platinum"
                    ? "Exclusive benefits and highest credit limits"
                    : data.tier === "gold"
                      ? "Premium benefits and increased credit limits"
                      : data.tier === "silver"
                        ? "Enhanced benefits and moderate credit limits"
                        : "Basic benefits and starter credit limits"}
                </p>
              </div>
            </div>

            {data.tier !== "platinum" && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Next tier: {data.tier === "bronze" ? "Silver" : data.tier === "silver" ? "Gold" : "Platinum"}
                </p>
                <Progress
                  value={data.tier === "bronze" ? 70 : data.tier === "silver" ? 60 : 85}
                  className="h-2 bg-gray-700"
                />
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="border-green-700 text-green-400 hover:bg-green-900/20">
                View Tier Benefits
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
