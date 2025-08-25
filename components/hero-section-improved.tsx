"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Award, Clock, MapPin } from "lucide-react"
import { OpenNowIndicator } from "@/components/open-now-indicator"
import { handleBookingClick, handleServicesClick } from "@/lib/button-actions"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/luxury-nail-salon-interior-with-pink-and-purple-li.png"
          alt="Luxe Nails & Spa Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-purple-900/30 to-pink-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Announcement Bar */}
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 mb-4">
            <Award className="h-4 w-4 text-gold mr-2" />
            <span className="text-gold font-medium text-sm">Award-Winning Nail Salon • Now Accepting New Clients</span>
          </div>
          
          {/* Open Now Indicator */}
          <div className="mb-8">
            <OpenNowIndicator />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Experience
            <span className="block text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
              Luxury
            </span>
            Nail Care
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Indulge in premium nail services with our expert technicians in a relaxing spa atmosphere. Your nails
            deserve the royal treatment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={handleBookingClick}
              className="gradient-hot-pink text-white text-lg px-8 py-4 hover:opacity-90 transition-opacity cursor-pointer"
            >
              Book Your Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleServicesClick}
              className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 bg-transparent cursor-pointer"
            >
              View Our Services
            </Button>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold fill-current" />
                ))}
              </div>
              <p className="text-white font-semibold">4.9/5 Rating</p>
              <p className="text-gray-300 text-sm">500+ Happy Clients</p>
            </div>

            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-gold mb-2" />
              <p className="text-white font-semibold">Same Day Booking</p>
              <p className="text-gray-300 text-sm">Available 7 Days</p>
            </div>

            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-gold mb-2" />
              <p className="text-white font-semibold">Prime Location</p>
              <p className="text-gray-300 text-sm">Downtown District</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-pink-400/20 backdrop-blur-sm animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-purple-400/20 backdrop-blur-sm animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 rounded-full bg-gold/20 backdrop-blur-sm animate-pulse delay-500"></div>
    </section>
  )
}