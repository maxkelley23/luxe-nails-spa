import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Award, Users, Calendar, Instagram, Facebook, TicketIcon as TikTok } from "lucide-react"

export function SocialProofSection() {
  const achievements = [
    {
      icon: Award,
      title: "Best Nail Salon 2024",
      subtitle: "City Beauty Awards",
      color: "text-gold",
    },
    {
      icon: Star,
      title: "4.9/5 Rating",
      subtitle: "Google Reviews",
      color: "text-hot-pink",
    },
    {
      icon: Users,
      title: "2,500+ Clients",
      subtitle: "Served This Year",
      color: "text-purple-600",
    },
    {
      icon: Calendar,
      title: "8+ Years",
      subtitle: "In Business",
      color: "text-hot-pink",
    },
  ]

  const socialStats = [
    {
      platform: "Instagram",
      icon: Instagram,
      followers: "15.2K",
      engagement: "High",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      platform: "Facebook",
      icon: Facebook,
      followers: "8.7K",
      engagement: "Active",
      color: "bg-blue-600",
    },
    {
      platform: "TikTok",
      icon: TikTok,
      followers: "22.1K",
      engagement: "Viral",
      color: "bg-black",
    },
  ]

  const pressFeatures = [
    {
      publication: "Beauty Magazine",
      title: "Top 10 Nail Salons in the City",
      quote: "Luxe Nails & Spa sets the standard for luxury nail care...",
    },
    {
      publication: "Local Lifestyle",
      title: "Where Celebrities Get Their Nails Done",
      quote: "The go-to destination for A-list nail perfection...",
    },
    {
      publication: "Style Weekly",
      title: "The Art of Nail Design",
      quote: "Innovative techniques and unmatched artistry...",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <achievement.icon className={`h-10 w-10 ${achievement.color} mx-auto mb-3`} />
                <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media Stats */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-bold text-center text-gray-900 mb-8">Follow Our Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialStats.map((social, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg">
                <div className={`${social.color} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <social.icon className="h-8 w-8" />
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {social.engagement}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 bg-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{social.followers}</div>
                    <div className="text-sm text-gray-600">{social.platform} Followers</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Press Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-bold text-center text-gray-900 mb-8">Featured In</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pressFeatures.map((feature, index) => (
              <Card key={index} className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3 text-hot-pink border-hot-pink">
                    {feature.publication}
                  </Badge>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 italic">"{feature.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <Card className="bg-white/60 backdrop-blur-sm border border-pink-200 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Why Clients Choose Luxe Nails & Spa</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-hot-pink" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Licensed & Certified</h4>
                  <p className="text-sm text-gray-600">All technicians are state-licensed and continuously trained</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Products</h4>
                  <p className="text-sm text-gray-600">We use only the highest quality, professional-grade products</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hygiene Standards</h4>
                  <p className="text-sm text-gray-600">Hospital-grade sanitation and sterilization protocols</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
