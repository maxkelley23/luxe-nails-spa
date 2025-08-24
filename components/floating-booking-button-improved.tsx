"use client"

import { Calendar } from "lucide-react"
import { handleBookingClick } from "@/lib/button-actions"

export function FloatingBookingButton() {
  return (
    <button
      onClick={handleBookingClick}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Book Appointment"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-hot-pink rounded-full animate-ping opacity-75" />
        
        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300">
          <Calendar className="h-6 w-6" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-16 bottom-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Book Now
        </div>
      </div>
    </button>
  )
}