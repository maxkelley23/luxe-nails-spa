"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instagram, Heart, Share2 } from "lucide-react"

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", name: "All Work" },
    { id: "manicure", name: "Manicures" },
    { id: "extensions", name: "Extensions" },
    { id: "nail-art", name: "Nail Art" },
    { id: "pedicure", name: "Pedicures" },
  ]

  const galleryItems = [
    {
      id: 1,
      image: "/stunning-pink-and-gold-ombre-nails-with-glitter.png",
      category: "manicure",
      title: "Pink Gold Ombre",
      likes: 234,
    },
    {
      id: 2,
      image: "/long-purple-gel-extensions-with-rhinestones.png",
      category: "extensions",
      title: "Purple Rhinestone Extensions",
      likes: 189,
    },
    {
      id: 3,
      image: "/intricate-floral-nail-art-design.png",
      category: "nail-art",
      title: "Floral Masterpiece",
      likes: 312,
    },
    {
      id: 4,
      image: "/luxury-pedicure-with-hot-pink-polish.png",
      category: "pedicure",
      title: "Hot Pink Pedicure",
      likes: 156,
    },
    {
      id: 5,
      image: "/marble-effect-nails-with-gold-foil.png",
      category: "nail-art",
      title: "Marble Gold Foil",
      likes: 278,
    },
    {
      id: 6,
      image: "/french-manicure-with-purple-tips.png",
      category: "manicure",
      title: "Purple French Tips",
      likes: 145,
    },
    {
      id: 7,
      image: "/coffin-shaped-nails-with-gradient-design.png",
      category: "extensions",
      title: "Gradient Coffin Nails",
      likes: 203,
    },
    {
      id: 8,
      image: "/geometric-nail-art-with-metallic-accents.png",
      category: "nail-art",
      title: "Geometric Metallic",
      likes: 267,
    },
    {
      id: 9,
      image: "/classic-red-manicure-with-glossy-finish.png",
      category: "manicure",
      title: "Classic Red Gloss",
      likes: 198,
    },
  ]

  const filteredItems =
    activeFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 border border-pink-200 mb-6">
            <Instagram className="h-4 w-4 text-hot-pink mr-2" />
            <span className="text-hot-pink font-medium text-sm">Instagram Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Latest
            <span className="block text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
              Creations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through our stunning portfolio of nail art, extensions, and luxury treatments. Each design is crafted
            with precision and creativity.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={
                activeFilter === filter.id
                  ? "gradient-hot-pink text-white hover:opacity-90"
                  : "border-pink-200 text-gray-600 hover:border-hot-pink hover:text-hot-pink"
              }
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white/80">
                      <Heart className="h-4 w-4 mr-1" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                    >
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <Badge className="absolute top-4 left-4 bg-white/90 text-gray-700 hover:bg-white">
                {filters.find((f) => f.id === item.category)?.name}
              </Badge>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 max-w-2xl mx-auto border border-pink-200">
            <Instagram className="h-12 w-12 text-hot-pink mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Follow us for daily inspiration</h3>
            <p className="text-gray-600 mb-6">
              Get the latest nail trends, behind-the-scenes content, and exclusive offers on Instagram.
            </p>
            <Button size="lg" className="gradient-purple text-white hover:opacity-90 transition-opacity">
              @LuxeNailsSpa
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
