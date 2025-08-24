"use client"

import { useState, useEffect } from "react"

export function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-purple-50 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-pink-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-hot-pink rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-6 mb-2">Luxe Nails & Spa</h2>
        <p className="text-gray-600 animate-pulse">Preparing your luxury experience...</p>
      </div>
    </div>
  )
}
