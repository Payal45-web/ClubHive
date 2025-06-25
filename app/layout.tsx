import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/components/providers/user-provider"
import { NotificationProvider } from "@/components/providers/notification-provider"
import { ChatProvider } from "@/components/chat/chat-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingActionButton from "@/components/floating-action-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ClubHive - Your Nightlife Social Network",
  description: "Discover venues, connect with friends, and experience the best nightlife in your city",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <UserProvider>
          <NotificationProvider>
            <ChatProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <FloatingActionButton />
              </div>
            </ChatProvider>
          </NotificationProvider>
        </UserProvider>
      </body>
    </html>
  )
}
