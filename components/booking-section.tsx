"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react"

export function BookingSection() {
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const services = [
    { id: "signature-manicure", name: "Signature Manicure", price: "$45", duration: "45 min" },
    { id: "gel-extensions", name: "Gel Extensions", price: "$75", duration: "90 min" },
    { id: "luxury-pedicure", name: "Luxury Pedicure", price: "$65", duration: "60 min" },
    { id: "nail-art", name: "Nail Art Design", price: "$25", duration: "30 min" },
    { id: "dip-powder", name: "Dip Powder Nails", price: "$55", duration: "60 min" },
    { id: "bridal-package", name: "Bridal Package", price: "$150", duration: "2 hours" },
  ]

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle booking submission
    console.log("Booking submitted:", { selectedService, selectedDate, selectedTime, formData })
  }

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-pink-200 mb-6">
            <Calendar className="h-4 w-4 text-hot-pink mr-2" />
            <span className="text-hot-pink font-medium text-sm">Easy Online Booking</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Book Your
            <span className="block text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
              Appointment
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Schedule your luxury nail experience in just a few clicks. Choose your service, pick your time, and get
            ready to be pampered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Booking Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-serif text-gray-900">Schedule Your Visit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm font-medium text-gray-700">
                    Select Service
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{service.name}</span>
                            <span className="text-hot-pink font-medium ml-4">
                              {service.price} • {service.duration}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Preferred Date
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full"
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                    Preferred Time
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        id="phone"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                    Special Requests (Optional)
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="notes"
                      placeholder="Any special requests or preferences..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="pl-10 min-h-[100px]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-hot-pink text-white hover:opacity-90 transition-opacity"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Confirm Booking
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking Info & Benefits */}
          <div className="space-y-8">
            {/* Quick Info */}
            <Card className="bg-white/60 backdrop-blur-sm border border-pink-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">Why Book Online?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Instant Confirmation</p>
                      <p className="text-sm text-gray-600">Get immediate booking confirmation via email</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">24/7 Availability</p>
                      <p className="text-sm text-gray-600">Book anytime, even outside business hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Easy Rescheduling</p>
                      <p className="text-sm text-gray-600">Modify or cancel up to 24 hours before</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Appointment Reminders</p>
                      <p className="text-sm text-gray-600">SMS and email reminders so you never miss</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-gradient-to-br from-pink-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-4">Need Help Booking?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-pink-100">(555) 123-NAILS</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-pink-100">Mon-Sat: 9AM-7PM, Sun: 10AM-6PM</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="w-full mt-6 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                >
                  Call Now to Book
                </Button>
              </CardContent>
            </Card>

            {/* Special Offer */}
            <Card className="bg-gold/10 border border-gold/30">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">✨</div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">First-Time Client Special</h3>
                <p className="text-gray-600 mb-4">Get 20% off your first visit when you book online today!</p>
                <p className="text-sm text-gray-500">
                  *Valid for new clients only. Cannot be combined with other offers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
