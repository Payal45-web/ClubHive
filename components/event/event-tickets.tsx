"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ticket, Plus, Minus, CreditCard, Calendar, Users, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Event } from "@/lib/types"

interface EventTicketsProps {
  event: Event
}

export default function EventTickets({ event }: EventTicketsProps) {
  const [ticketType, setTicketType] = useState("standard")
  const [quantity, setQuantity] = useState(1)

  const ticketTypes = [
    {
      id: "standard",
      name: "Standard Entry",
      price: event.ticketPrice.min,
      description: "General admission with access to all common areas",
    },
    {
      id: "premium",
      name: "Premium Access",
      price: Math.floor((event.ticketPrice.min + event.ticketPrice.max) / 2),
      description: "Priority entry with access to premium areas",
    },
    {
      id: "vip",
      name: "VIP Experience",
      price: event.ticketPrice.max,
      description: "VIP entry, reserved seating, and complimentary drinks",
    },
  ]

  const selectedTicket = ticketTypes.find((ticket) => ticket.id === ticketType) || ticketTypes[0]
  const subtotal = selectedTicket.price * quantity
  const serviceFee = Math.floor(subtotal * 0.1)
  const total = subtotal + serviceFee

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/80 border-gray-800 sticky top-20">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Ticket className="h-5 w-5 text-purple-400" />
            Get Tickets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="h-4 w-4" />
              <span>
                {event.attendees} attending • {event.maxCapacity - event.attendees} spots left
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white">Select Ticket Type</Label>
            <RadioGroup value={ticketType} onValueChange={setTicketType}>
              {ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`flex items-start p-3 rounded-md cursor-pointer ${
                    ticketType === ticket.id ? "bg-purple-900/30 border border-purple-700" : "bg-gray-800/50"
                  }`}
                  onClick={() => setTicketType(ticket.id)}
                >
                  <RadioGroupItem
                    value={ticket.id}
                    id={ticket.id}
                    className="mt-1 border-purple-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <div className="ml-3 flex-1">
                    <Label htmlFor={ticket.id} className="text-white font-medium">
                      {ticket.name}
                    </Label>
                    <p className="text-sm text-gray-400">{ticket.description}</p>
                    <p className="text-purple-400 font-medium mt-1">₹{ticket.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-white">Quantity</Label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-l-md border-gray-700 text-white"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-10 px-4 flex items-center justify-center bg-gray-800 border-t border-b border-gray-700 text-white">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-r-md border-gray-700 text-white"
                onClick={incrementQuantity}
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-800">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Service Fee</span>
              <span>₹{serviceFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white font-medium pt-2 border-t border-gray-800">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {event.attendees > event.maxCapacity * 0.8 && (
            <Alert className="bg-yellow-900/20 border-yellow-700 text-yellow-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Tickets are selling fast! Only {event.maxCapacity - event.attendees} left.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            Book Now
          </Button>
          <Button
            variant="outline"
            className="w-full border-purple-700 text-purple-400 hover:bg-purple-900/20 flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Pay Later
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
