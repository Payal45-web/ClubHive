"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Bell, MessageCircle, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/components/providers/user-provider"
import { useChat } from "@/components/chat/chat-provider"
import { useNotifications } from "@/components/providers/notification-provider"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useUser()
  const { chats } = useChat()
  const { notifications } = useNotifications()

  const unreadMessages = chats.reduce((total, chat) => total + chat.unreadCount, 0)
  const unreadNotifications = notifications.length

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-purple-500/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              ClubHive
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Discover
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Events
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Friends
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Pay Later
            </Button>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search venues, events, people..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Icon (Mobile) */}
            <Button variant="ghost" size="icon" className="lg:hidden text-gray-300 hover:text-white">
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadNotifications > 9 ? "9+" : unreadNotifications}
                </Badge>
              )}
            </Button>

            {/* Messages */}
            <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
              <MessageCircle className="w-5 h-5" />
              {unreadMessages > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-purple-500 text-white text-xs flex items-center justify-center">
                  {unreadMessages > 9 ? "9+" : unreadMessages}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            {user ? (
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.loyaltyTier} Member</p>
                </div>
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <User className="w-5 h-5" />
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-700 py-4"
          >
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start text-gray-300 hover:text-white">
                Discover
              </Button>
              <Button variant="ghost" className="justify-start text-gray-300 hover:text-white">
                Events
              </Button>
              <Button variant="ghost" className="justify-start text-gray-300 hover:text-white">
                Friends
              </Button>
              <Button variant="ghost" className="justify-start text-gray-300 hover:text-white">
                Pay Later
              </Button>

              {/* Mobile Search */}
              <div className="mt-4 px-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search venues, events, people..."
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
