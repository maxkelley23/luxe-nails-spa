"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Clock, Star, Heart } from "lucide-react"
import { handleBookingClick } from "@/lib/button-actions"
import toast from "react-hot-toast"

export function ServicesSection() {
  const services = [
    {
      name: "Signature Manicure",
      description: "Our premium manicure with cuticle care, nail shaping, and luxury polish application",
      price: "From $45",
      duration: "45 min",
      image: "/luxury-manicure-with-pink-and-gold-nail-polish.png",
      popular: true,
    },
    {
      name: "Gel Extensions",
      description: "Long-lasting gel extensions with custom length and shape for the perfect look",
      price: "From $75",
      duration: "90 min",
      image: "/gel-nail-extensions-with-purple-and-pink-ombre.png",
      popular: false,
    },
    {
      name: "Luxury Pedicure",
      description: "Relaxing foot soak, exfoliation, massage, and premium polish in our spa chairs",
      price: "From $65",
      duration: "60 min",
      image: "/luxury-pedicure-spa-chair-with-pink-lighting.png",
      popular: true,
    },
    {
      name: "Nail Art Design",
      description: "Custom nail art created by our talented artists - from simple to intricate designs",
      price: "From $25",
      duration: "30 min",
      image: "/intricate-nail-art-design-with-gold-accents.png",
      popular: false,
    },
    {
      name: "Dip Powder Nails",
      description: "Durable dip powder application for long-lasting color and strength",
      price: "From $55",
      duration: "60 min",
      image: "/dip-powder-nails-in-hot-pink-color.png",
      popular: false,
    },
    {
      name: "Bridal Package",
      description: "Complete bridal nail service including trial, wedding day service, and touch-ups",
      price: "From $150",
      duration: "2 hours",
      image: "/elegant-bridal-nails-with-white-and-gold-design.png",
      popular: true,
    },
  ]

  return (
    <section id="services" className="py-20 bg-soft-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-pink-200 mb-6">
            <Sparkles className="h-4 w-4 text-hot-pink mr-2" />
            <span className="text-hot-pink font-medium text-sm">Premium Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Signature
            <span className="block text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the finest nail care with our expertly crafted services, using only premium products and
            techniques for stunning, long-lasting results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="relative">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {service.popular && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="h-3 w-3 inline mr-1" />
                    Popular
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-hot-pink transition-colors cursor-pointer" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-serif font-semibold text-gray-900">{service.name}</h3>
                  <span className="text-hot-pink font-bold text-lg">{service.price}</span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{service.duration}</span>
                  </div>
                  <Button size="sm" className="gradient-hot-pink text-white hover:opacity-90 transition-opacity">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border border-pink-200">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Can't decide? Let our experts help!</h3>
            <p className="text-gray-600 mb-6">
              Book a consultation and we'll recommend the perfect services for your style and needs.
            </p>
            <Button 
              size="lg" 
              onClick={() => {
                toast("📞 Let's find your perfect service! Fill out the form below", {
                  duration: 3000,
                  style: {
                    background: 'linear-gradient(to right, #a855f7, #ec4899)',
                    color: 'white',
                  },
                })
                handleBookingClick()
              }}
              className="gradient-purple text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
