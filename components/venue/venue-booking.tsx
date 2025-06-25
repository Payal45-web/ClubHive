"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, CreditCard, AlertCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import type { Venue } from "@/lib/types"

interface VenueBookingProps {
  venue: Venue
}

export default function VenueBooking({ venue }: VenueBookingProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("20:00")
  const [guests, setGuests] = useState("2")
  const [specialRequests, setSpecialRequests] = useState("")
  const [isBookingAvailable, setIsBookingAvailable] = useState(true)

  const timeSlots = [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ]

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gray-900/80 border-gray-800 sticky top-20">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            Make a Reservation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-white">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-gray-800 text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-white">
              Time
            </Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="text-white">
              Number of Guests
            </Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {guestOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special-requests" className="text-white">
              Special Requests (Optional)
            </Label>
            <Input
              id="special-requests"
              placeholder="Any special requests or preferences..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {!isBookingAvailable && (
            <Alert className="bg-yellow-900/20 border-yellow-700 text-yellow-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Limited availability for this date and time. Consider alternative options.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            Book Now
          </Button>
          {venue.payLaterEnabled && (
            <Button
              variant="outline"
              className="w-full border-green-700 text-green-400 hover:bg-green-900/20 flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Pay Later
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
