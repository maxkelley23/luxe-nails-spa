"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Phone } from "lucide-react"

export function FloatingBookingButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000) // Show after 5 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 left-8 z-40 animate-in slide-in-from-left duration-500">
      <div className="flex flex-col space-y-3">
        <Button
          size="lg"
          className="gradient-hot-pink text-white shadow-lg hover:opacity-90 transition-all duration-300 animate-pulse"
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
        >
          <Calendar className="h-5 w-5 mr-2" />
          Book Now
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-white/90 backdrop-blur-sm border-hot-pink text-hot-pink hover:bg-hot-pink hover:text-white transition-all duration-300"
        >
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
      </div>
    </div>
  )
}
