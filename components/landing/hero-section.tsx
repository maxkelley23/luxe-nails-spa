import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Shield, Zap, CheckCircle } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-20 h-20 border border-blue-200 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-purple-200 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-green-200 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Trust Badge */}
          <Badge variant="outline" className="mb-6 px-4 py-2 bg-white border-blue-200 text-blue-800">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by 500+ developers
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI-Generated Code
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Might Have Security Holes
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            ProdSafe scans your code in <strong>60 seconds</strong> and tells you exactly 
            how to fix vulnerabilities - in <strong>plain English</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 py-6 gradient-security text-white border-0 hover:opacity-90 transition-all duration-200 transform hover:scale-105">
                Start Free - 3 Scans
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 hover:bg-blue-50 border-blue-200">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Shield, text: '500+ Vulnerabilities Detected', color: 'text-green-600' },
              { icon: Zap, text: 'No Code Knowledge Required', color: 'text-blue-600' },
              { icon: CheckCircle, text: '60 Second Scans', color: 'text-purple-600' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-sm font-medium">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Demo Screenshot/Video Placeholder */}
          <div className="mt-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Interactive Demo
                    </h3>
                    <p className="text-gray-600">
                      Watch how ProdSafe finds vulnerabilities in real code
                    </p>
                    <Button className="mt-4 gradient-security text-white border-0">
                      Play Demo
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Critical Issue Found!
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Fix Applied ✓
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12"
          fill="white"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  )
}