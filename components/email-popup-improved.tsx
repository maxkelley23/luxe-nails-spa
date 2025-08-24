"use client"

import type React from "react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Gift, Sparkles } from "lucide-react"

export function EmailPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10000) // Show after 10 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Please enter your email address")
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate submission
    setTimeout(() => {
      
      // Show success toast with discount code
      toast.success(
        "🎉 Discount Code: LUXE20 - Check your email!",
        {
          duration: 6000,
          style: {
            background: 'linear-gradient(to right, #ec4899, #a855f7)',
            color: 'white',
            fontSize: '16px',
            padding: '16px',
          },
        }
      )
      
      // Close popup
      setIsVisible(false)
      setIsSubmitting(false)
      
      // Show follow-up message
      setTimeout(() => {
        toast("💅 Use code LUXE20 at checkout for 20% off!", {
          duration: 5000,
          style: {
            background: '#fbbf24',
            color: '#1f2937',
          },
        })
      }, 2000)
    }, 1000)
  }

  const handleClose = () => {
    setIsVisible(false)
    toast("💔 You're missing out on 20% off! The offer will expire soon.", {
      duration: 4000,
      style: {
        background: '#ef4444',
        color: 'white',
      },
    })
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="max-w-md w-full bg-white shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        <CardContent className="p-0">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-t-lg">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              aria-label="Close promotional popup"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center">
              <Gift className="h-12 w-12 mx-auto mb-3 animate-bounce" />
              <h3 className="text-2xl font-serif font-bold mb-2">Exclusive Offer!</h3>
              <p className="text-pink-100">Get 20% off your first visit</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Sparkles className="h-5 w-5 text-hot-pink" />
                <span className="text-gray-700 font-medium">Limited Time Offer</span>
                <Sparkles className="h-5 w-5 text-hot-pink" />
              </div>
              <p className="text-gray-600 text-sm">
                Join our VIP list and receive exclusive discounts, nail care tips, and early access to new services.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full gradient-hot-pink text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  "Claim My 20% Discount"
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              *Valid for new clients only. Cannot be combined with other offers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}