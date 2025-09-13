import { Shield, Zap, Copy, Target, FileText, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Zap,
    title: 'Instant Vulnerability Detection',
    description: 'Scan your entire codebase in under 60 seconds. No waiting around for hours like traditional security tools.',
    badge: 'Lightning Fast',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    icon: Shield,
    title: 'Plain English Explanations',
    description: 'Get security issues explained in simple terms. No cryptic error codes or technical jargon.',
    badge: 'Easy to Understand',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Copy,
    title: 'Copy-Paste AI Fixes',
    description: 'Each vulnerability comes with ready-to-use prompts you can paste into ChatGPT or Claude for instant fixes.',
    badge: 'AI-Ready',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: Target,
    title: 'Severity Prioritization',
    description: 'Focus on what matters most. We rank vulnerabilities from critical to low so you know what to fix first.',
    badge: 'Smart Priority',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    icon: FileText,
    title: 'Detailed PDF Reports',
    description: 'Share comprehensive security reports with your team, investors, or clients. Perfect for compliance.',
    badge: 'Professional',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: CheckCircle,
    title: 'Zero False Positives',
    description: 'Our AI is trained to minimize false alarms. Every vulnerability we find is real and actionable.',
    badge: 'Accurate',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-blue-50 border-blue-200 text-blue-800">
            <Shield className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Secure Your Code
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for non-technical founders who use AI to write code. 
            No security expertise required.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            
            return (
              <Card 
                key={index} 
                className="relative overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 security-card-hover"
              >
                <CardContent className="p-8">
                  {/* Badge */}
                  <Badge 
                    variant="secondary" 
                    className={`mb-4 ${feature.bgColor} ${feature.color} border-0`}
                  >
                    {feature.badge}
                  </Badge>

                  {/* Icon */}
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl ${feature.bgColor} mb-6`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <Icon className="w-full h-full" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Stop Shipping Vulnerable Code
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 500+ developers who trust ProdSafe to keep their applications secure. 
              Start scanning in less than 2 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                  <span>Setup in 60 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}