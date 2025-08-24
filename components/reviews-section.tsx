"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight, Heart, ThumbsUp } from "lucide-react"

export function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0)

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      service: "Gel Extensions",
      date: "2 days ago",
      review:
        "Absolutely stunning work! The technician was so skilled and patient. My gel extensions look perfect and have lasted weeks without any issues. The salon atmosphere is so relaxing and luxurious. Will definitely be back!",
      verified: true,
      helpful: 24,
    },
    {
      id: 2,
      name: "Emily Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      service: "Nail Art Design",
      date: "1 week ago",
      review:
        "The nail art exceeded my expectations! I showed them a Pinterest inspiration and they created something even better. The attention to detail is incredible. Everyone keeps asking where I got my nails done!",
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      name: "Jessica Martinez",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      service: "Luxury Pedicure",
      date: "2 weeks ago",
      review:
        "Best pedicure experience ever! The spa chairs are so comfortable and the massage was heavenly. My feet have never looked or felt better. The staff is professional and the salon is impeccably clean.",
      verified: true,
      helpful: 31,
    },
    {
      id: 4,
      name: "Amanda Wilson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      service: "Bridal Package",
      date: "3 weeks ago",
      review:
        "Perfect for my wedding day! They did a trial run and the actual wedding nails were flawless. The team was so accommodating and made sure everything was perfect. My nails looked amazing in all the photos!",
      verified: true,
      helpful: 42,
    },
    {
      id: 5,
      name: "Rachel Thompson",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      service: "Signature Manicure",
      date: "1 month ago",
      review:
        "I've been to many nail salons, but this one is truly special. The quality of work is exceptional and the customer service is outstanding. They really care about making sure you're happy with the results.",
      verified: true,
      helpful: 27,
    },
  ]

  const stats = [
    { label: "Happy Clients", value: "2,500+", icon: Heart },
    { label: "5-Star Reviews", value: "98%", icon: Star },
    { label: "Years Experience", value: "8+", icon: Quote },
    { label: "Services Completed", value: "15,000+", icon: ThumbsUp },
  ]

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 border border-pink-200 mb-6">
            <Star className="h-4 w-4 text-hot-pink mr-2" />
            <span className="text-hot-pink font-medium text-sm">Client Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            What Our Clients
            <span className="block text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
              Are Saying
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say about their luxury nail
            experience.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-hot-pink mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Review Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" size="sm" onClick={prevReview} className="text-gray-600 hover:text-hot-pink">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex space-x-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReview(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentReview ? "bg-hot-pink" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Button variant="ghost" size="sm" onClick={nextReview} className="text-gray-600 hover:text-hot-pink">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="text-center">
                <Quote className="h-12 w-12 text-hot-pink mx-auto mb-6 opacity-50" />
                <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-8">
                  "{reviews[currentReview].review}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={reviews[currentReview].avatar || "/placeholder.svg"}
                      alt={reviews[currentReview].name}
                    />
                    <AvatarFallback className="bg-hot-pink text-white">
                      {reviews[currentReview].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{reviews[currentReview].name}</h4>
                      {reviews[currentReview].verified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="flex">
                        {[...Array(reviews[currentReview].rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gold fill-current" />
                        ))}
                      </div>
                      <span>•</span>
                      <span>{reviews[currentReview].service}</span>
                      <span>•</span>
                      <span>{reviews[currentReview].date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{reviews[currentReview].helpful} people found this helpful</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.slice(0, 6).map((review) => (
            <Card key={review.id} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback className="bg-hot-pink text-white text-sm">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-gold fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.review}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {review.service}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{review.helpful}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 max-w-2xl mx-auto text-white">
            <h3 className="text-2xl font-serif font-bold mb-4">Ready to Join Our Happy Clients?</h3>
            <p className="text-pink-100 mb-6">
              Experience the luxury nail care that has earned us hundreds of 5-star reviews.
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 transition-colors">
              Book Your Appointment
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
