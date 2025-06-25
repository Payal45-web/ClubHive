"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, MessageCircle, Users, Calendar, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: MessageCircle,
      label: "Start Chat",
      color: "from-blue-500 to-cyan-500",
      onClick: () => console.log("Start chat"),
    },
    {
      icon: Users,
      label: "Find Friends",
      color: "from-green-500 to-emerald-500",
      onClick: () => console.log("Find friends"),
    },
    {
      icon: Calendar,
      label: "Create Event",
      color: "from-purple-500 to-pink-500",
      onClick: () => console.log("Create event"),
    },
    {
      icon: MapPin,
      label: "Check In",
      color: "from-orange-500 to-red-500",
      onClick: () => console.log("Check in"),
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="bg-black/80 text-white text-sm px-3 py-1 rounded-lg backdrop-blur-sm">
                    {action.label}
                  </span>
                  <Button
                    size="icon"
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} hover:scale-110 transition-transform shadow-lg`}
                    onClick={action.onClick}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  )
}
