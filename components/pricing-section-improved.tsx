"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown, Sparkles } from "lucide-react"
import { handleBookingClick } from "@/lib/button-actions"
import toast from "react-hot-toast"

export function PricingSection() {
  const pricingTiers = [
    {
      name: "Essential",
      price: "$45",
      duration: "45 min",
      description: "Perfect for regular maintenance and classic looks",
      features: [
        "Signature Manicure",
        "Cuticle Care & Nail Shaping",
        "Base & Top Coat",
        "Choice of Regular Polish",
        "Hand Massage",
        "7-Day Guarantee",
      ],
      popular: false,
      color: "border-gray-200",
      buttonStyle: "gradient-hot-pink",
    },
    {
      name: "Luxury",
      price: "$75",
      duration: "90 min",
      description: "Our most popular package with premium treatments",
      features: [
        "Everything in Essential",
        "Gel Polish Application",
        "Nail Extensions (if desired)",
        "Basic Nail Art (2 nails)",
        "Paraffin Hand Treatment",
        "Extended Hand & Arm Massage",
        "14-Day Guarantee",
        "Complimentary Beverage",
      ],
      popular: true,
      color: "border-hot-pink",
      buttonStyle: "gradient-purple",
    },
    {
      name: "Royal",
      price: "$120",
      duration: "2 hours",
      description: "The ultimate luxury experience for special occasions",
      features: [
        "Everything in Luxury",
        "Custom Nail Art Design",
        "Premium Gel Extensions",
        "Rhinestone Application",
        "Hot Stone Hand Massage",
        "Aromatherapy Treatment",
        "Take-Home Care Kit",
        "21-Day Guarantee",
        "Priority Booking",
        "Complimentary Wine/Champagne",
      ],
      popular: false,
      color: "border-gold",
      buttonStyle: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    },
  ]

  const addOns = [
    { name: "French Tips", price: "$10" },
    { name: "Nail Art (per nail)", price: "$5" },
    { name: "Rhinestones", price: "$15" },
    { name: "Chrome Finish", price: "$20" },
    { name: "Nail Repair", price: "$8" },
    { name: "Cuticle Oil Treatment", price: "$12" },
  ]

  const handlePackageClick = (packageName: string) => {
    toast(`✨ ${packageName} Package selected! Fill out the form below`, {
      duration: 3000,
      style: {
        background: 'linear-gradient(to right, #ec4899, #a855f7)',
        color: 'white',
      },
    })
    handleBookingClick()
  }

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-pink-200 mb-6">
            <Crown className="h-4 w-4 text-hot-pink mr-2" />
            <span className="text-hot-pink font-medium text-sm">Transparent Pricing • Gift Cards Available</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Choose Your
            <span className="block text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
              Experience
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From essential care to royal treatment, we have the perfect package for every occasion and budget. All
            services include our signature luxury experience.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden bg-white/80 backdrop-blur-sm ${tier.color} ${
                tier.popular ? "ring-2 ring-hot-pink shadow-2xl scale-105" : "shadow-lg"
              } transition-all duration-300 hover:shadow-2xl`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-2 text-sm font-medium">
                  <Star className="h-4 w-4 inline mr-1" />
                  Most Popular
                </div>
              )}

              <CardHeader className={`text-center ${tier.popular ? "pt-12" : "pt-6"} pb-6`}>
                <div className="mb-4">
                  {index === 0 && <Sparkles className="h-12 w-12 text-hot-pink mx-auto" />}
                  {index === 1 && <Star className="h-12 w-12 text-purple-600 mx-auto" />}
                  {index === 2 && <Crown className="h-12 w-12 text-gold mx-auto" />}
                </div>
                <CardTitle className="text-2xl font-serif text-gray-900 mb-2">{tier.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-600 ml-2">• {tier.duration}</span>
                </div>
                <p className="text-gray-600 text-sm">{tier.description}</p>
              </CardHeader>

              <CardContent className="px-6 pb-8">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  onClick={() => handlePackageClick(tier.name)}
                  className={`w-full ${tier.buttonStyle} text-white hover:opacity-90 transition-opacity cursor-pointer`}
                >
                  Book {tier.name} Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/60 backdrop-blur-sm border border-pink-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif text-gray-900">Popular Add-Ons</CardTitle>
              <p className="text-gray-600">Enhance your experience with these premium extras</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {addOns.map((addon, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-gray-700 text-sm font-medium">{addon.name}</span>
                    <Badge variant="outline" className="text-hot-pink border-hot-pink">
                      {addon.price}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Special Offers */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2">First-Time Client</h3>
                <p className="text-pink-100 mb-4">Get 20% off your first visit</p>
                <Badge className="bg-white/20 text-white">New Client Special</Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-bold mb-2">Loyalty Program</h3>
                <p className="text-purple-100 mb-4">Every 10th visit is free</p>
                <Badge className="bg-white/20 text-white">VIP Members • Loyalty Program: Every 10th Service 20% Off</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}