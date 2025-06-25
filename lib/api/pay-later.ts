import type { PayLaterData } from "@/lib/types"

// Mock data for development - replace with real API calls
export async function getPayLaterData(): Promise<PayLaterData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    creditLimit: 10000,
    availableCredit: 7500,
    currentBalance: 2500,
    nextPaymentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    paymentHistory: [
      {
        id: "pl-1",
        venue: "Skyline Lounge",
        amount: 1500,
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        status: "paid",
        dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "pl-2",
        venue: "Neon Club",
        amount: 2500,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: "pending",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "pl-3",
        venue: "Velvet Underground",
        amount: 800,
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: "paid",
        dueDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "pl-4",
        venue: "Pulse Nightclub",
        amount: 1200,
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        status: "overdue",
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    creditScore: 780,
    tier: "gold",
  }
}
