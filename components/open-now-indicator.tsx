"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export function OpenNowIndicator() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [nextOpenTime, setNextOpenTime] = useState<string>("")

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date()
      const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours()
      const minute = now.getMinutes()
      const currentTime = hour * 60 + minute // Convert to minutes

      // Business hours
      const schedule = {
        0: { open: 10 * 60, close: 17 * 60 }, // Sunday: 10AM - 5PM
        1: { open: 9 * 60, close: 19 * 60 },  // Monday: 9AM - 7PM
        2: { open: 9 * 60, close: 19 * 60 },  // Tuesday: 9AM - 7PM
        3: { open: 9 * 60, close: 19 * 60 },  // Wednesday: 9AM - 7PM
        4: { open: 9 * 60, close: 19 * 60 },  // Thursday: 9AM - 7PM
        5: { open: 9 * 60, close: 19 * 60 },  // Friday: 9AM - 7PM
        6: { open: 9 * 60, close: 18 * 60 },  // Saturday: 9AM - 6PM
      }

      const todaySchedule = schedule[day as keyof typeof schedule]
      const open = currentTime >= todaySchedule.open && currentTime < todaySchedule.close

      setIsOpen(open)

      // Calculate next open time
      if (!open) {
        if (currentTime < todaySchedule.open) {
          // Before opening today
          const openHour = Math.floor(todaySchedule.open / 60)
          setNextOpenTime(`${openHour}:00 AM`)
        } else {
          // After closing today, show tomorrow's opening
          const tomorrow = day === 6 ? 0 : day + 1
          const tomorrowSchedule = schedule[tomorrow as keyof typeof schedule]
          const openHour = Math.floor(tomorrowSchedule.open / 60)
          const dayName = tomorrow === 0 ? "Sunday" : tomorrow === 1 ? "Monday" : "Tomorrow"
          setNextOpenTime(`${dayName} at ${openHour}:00 AM`)
        }
      }
    }

    checkIfOpen()
    const interval = setInterval(checkIfOpen, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  if (isOpen === null) return null

  return (
    <div className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm">
      <Clock className="h-4 w-4 mr-2" />
      {isOpen ? (
        <div className="flex items-center">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-green-600 font-semibold">OPEN NOW - Book Your Appointment!</span>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-gray-600">
            CLOSED - Opens {nextOpenTime} <span className="text-sm">(But you can book online anytime!)</span>
          </span>
        </div>
      )}
    </div>
  )
}