"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Search, Filter, ArrowUpDown, Check, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PayLaterData } from "@/lib/types"

interface PayLaterHistoryProps {
  data: PayLaterData | null
  loading: boolean
}

export default function PayLaterHistory({ data, loading }: PayLaterHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-gray-800 animate-pulse rounded-lg mb-6"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (!data || !data.paymentHistory || data.paymentHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Transaction History</h3>
        <p className="text-gray-400">You haven't made any Pay Later transactions yet.</p>
      </div>
    )
  }

  let filteredHistory = [...data.paymentHistory]

  // Apply status filter
  if (statusFilter !== "all") {
    filteredHistory = filteredHistory.filter((item) => item.status === statusFilter)
  }

  // Apply search filter
  if (searchQuery) {
    filteredHistory = filteredHistory.filter((item) => item.venue.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  // Apply sorting
  filteredHistory.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <Check className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-white">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-700"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            {sortOrder === "asc" ? "Oldest" : "Newest"}
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg text-white">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No transactions match your filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="bg-gray-800/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.status === "paid"
                          ? "bg-green-900/30"
                          : transaction.status === "pending"
                            ? "bg-yellow-900/30"
                            : "bg-red-900/30"
                      }`}
                    >
                      {getStatusIcon(transaction.status)}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{transaction.venue}</h4>
                      <p className="text-sm text-gray-400">
                        {new Date(transaction.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <Badge
                      className={`${
                        transaction.status === "paid"
                          ? "bg-green-900/30 text-green-300 border-green-700"
                          : transaction.status === "pending"
                            ? "bg-yellow-900/30 text-yellow-300 border-yellow-700"
                            : "bg-red-900/30 text-red-300 border-red-700"
                      } capitalize`}
                    >
                      {transaction.status}
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold text-white">₹{transaction.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">
                        Due:{" "}
                        {new Date(transaction.dueDate).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
