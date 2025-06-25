"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, CreditCard, Shield, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { PayLaterData } from "@/lib/types"

interface PayLaterSettingsProps {
  data: PayLaterData | null
  loading: boolean
}

export default function PayLaterSettings({ data, loading }: PayLaterSettingsProps) {
  const [autoRepay, setAutoRepay] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [repaymentMethod, setRepaymentMethod] = useState("upi")
  const [repaymentDay, setRepaymentDay] = useState("5")

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-800 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-400" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Auto-Repayment</Label>
                <p className="text-sm text-gray-400">Automatically pay your dues on the due date</p>
              </div>
              <Switch checked={autoRepay} onCheckedChange={setAutoRepay} />
            </div>

            {autoRepay && (
              <>
                <div className="space-y-3">
                  <Label className="text-white">Repayment Method</Label>
                  <RadioGroup value={repaymentMethod} onValueChange={setRepaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" className="border-green-600" />
                      <Label htmlFor="upi" className="text-gray-300">
                        UPI
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" className="border-green-600" />
                      <Label htmlFor="card" className="text-gray-300">
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="netbanking" id="netbanking" className="border-green-600" />
                      <Label htmlFor="netbanking" className="text-gray-300">
                        Net Banking
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-white">Repayment Day</Label>
                  <Select value={repaymentDay} onValueChange={setRepaymentDay}>
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="1">1st of month</SelectItem>
                      <SelectItem value="5">5th of month</SelectItem>
                      <SelectItem value="10">10th of month</SelectItem>
                      <SelectItem value="15">15th of month</SelectItem>
                      <SelectItem value="20">20th of month</SelectItem>
                      <SelectItem value="25">25th of month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-400" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Payment Reminders</Label>
                <p className="text-sm text-gray-400">Get notified before your payment is due</p>
              </div>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Credit Limit Updates</Label>
                <p className="text-sm text-gray-400">Get notified when your credit limit changes</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Special Offers</Label>
                <p className="text-sm text-gray-400">Get notified about special Pay Later offers</p>
              </div>
              <Switch checked={false} onCheckedChange={() => {}} />
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
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Transaction PIN</Label>
                <p className="text-sm text-gray-400">Require PIN for all Pay Later transactions</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>

            <Alert className="bg-yellow-900/20 border-yellow-700 text-yellow-300">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Never share your transaction PIN or OTP with anyone, including ClubHive staff.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end">
              <Button variant="outline" className="border-blue-700 text-blue-400 hover:bg-blue-900/20">
                Update Security Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Info className="h-5 w-5 text-gray-400" />
              Legal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-400">
              By using ClubHive Pay Later, you agree to our terms and conditions. Interest rates may apply for late
              payments. Your credit limit is determined based on your usage patterns and payment history.
            </p>

            <div className="flex flex-wrap gap-2">
              <Button variant="link" className="text-purple-400 p-0 h-auto">
                Terms & Conditions
              </Button>
              <Button variant="link" className="text-purple-400 p-0 h-auto">
                Privacy Policy
              </Button>
              <Button variant="link" className="text-purple-400 p-0 h-auto">
                Refund Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
