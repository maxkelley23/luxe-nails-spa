"use client"

import { useState } from "react"
import { X, Star, Phone } from "lucide-react"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 px-4 relative animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <div className="flex items-center space-x-2 text-sm font-medium">
          <Star className="h-4 w-4 animate-pulse" />
          <span>New Client Special: 20% Off First Visit | Book Today!</span>
          <Phone className="h-4 w-4 ml-4" />
          <span>(555) 123-NAILS</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 text-white/80 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
