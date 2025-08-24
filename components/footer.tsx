import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, TicketIcon as TikTok, Heart, Star } from "lucide-react"

export function Footer() {
  const quickLinks = [
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Pricing", href: "#pricing" },
    { name: "Reviews", href: "#reviews" },
    { name: "Book Now", href: "#booking" },
  ]

  const services = [
    "Signature Manicure",
    "Gel Extensions",
    "Luxury Pedicure",
    "Nail Art Design",
    "Dip Powder Nails",
    "Bridal Packages",
  ]

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 5:00 PM" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold mb-4">Stay in the Loop</h3>
            <p className="text-gray-300 mb-6">
              Get exclusive offers, nail care tips, and be the first to know about our latest services and promotions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="gradient-hot-pink hover:opacity-90 transition-opacity">Subscribe</Button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mb-4">
              Luxe Nails & Spa
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience luxury nail care with our expert technicians in a relaxing spa atmosphere. Your nails deserve
              the royal treatment.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-hot-pink flex-shrink-0" />
                <span className="text-gray-300 text-sm">123 Beauty Boulevard, Downtown District, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-hot-pink flex-shrink-0" />
                <span className="text-gray-300 text-sm">(555) 123-NAILS</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-hot-pink flex-shrink-0" />
                <span className="text-gray-300 text-sm">hello@luxenailsspa.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-hot-pink transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Business Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-5 w-5 text-hot-pink" />
                <span className="text-gray-300 text-sm">We're Open</span>
              </div>
              {businessHours.map((schedule, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-300 text-sm">{schedule.day}</span>
                  <span className="text-gray-300 text-sm">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 text-sm">Follow Us:</span>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-hot-pink transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-hot-pink transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-hot-pink transition-colors" aria-label="TikTok">
                  <TikTok className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Awards & Recognition */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-gold" />
                <span className="text-gray-300 text-sm">4.9/5 Rating</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-hot-pink" />
                <span className="text-gray-300 text-sm">2,500+ Happy Clients</span>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-white/10" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2024 Luxe Nails & Spa. All rights reserved. | Licensed & Insured</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cancellation Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
