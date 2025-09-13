'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, Scan, FileCheck, ArrowRight, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  {
    number: 1,
    icon: Upload,
    title: 'Upload Your Code',
    description: 'Drop a ZIP file or paste a GitHub link. We support all major programming languages and frameworks.',
    detail: 'Supports: React, Node.js, Python, Java, PHP, and 20+ more languages',
    color: 'blue',
  },
  {
    number: 2,
    icon: Scan,
    title: 'AI + Security Scan',
    description: 'Our AI analyzes every line of code using advanced security tools and machine learning algorithms.',
    detail: 'Checks for: SQL injection, XSS, exposed secrets, weak auth, and 50+ vulnerability types',
    color: 'purple',
  },
  {
    number: 3,
    icon: FileCheck,
    title: 'Get Plain-English Fixes',
    description: 'Receive detailed explanations and copy-paste prompts to fix issues using ChatGPT or Claude.',
    detail: 'Each fix includes: What went wrong, why it matters, and exact steps to resolve',
    color: 'green',
  },
]

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-600',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200',
    gradient: 'from-green-500 to-green-600',
  },
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get your code security-checked in three simple steps. 
            No security expertise required.
          </p>
          
          {/* Demo Button */}
          <Button 
            size="lg" 
            variant="outline" 
            className="border-blue-200 hover:bg-blue-50"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Watch 2-Minute Demo
          </Button>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center px-16">
              <div className="w-32 h-0.5 bg-blue-200"></div>
              <div className="w-32 h-0.5 bg-blue-200"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses]
              const Icon = step.icon
              const isActive = activeStep === index

              return (
                <Card 
                  key={index}
                  className={cn(
                    'relative cursor-pointer transition-all duration-300 transform hover:scale-105',
                    isActive ? 'shadow-xl ring-2 ring-blue-200' : 'hover:shadow-lg'
                  )}
                  onClick={() => setActiveStep(index)}
                >
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className={cn(
                      'absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm',
                      `bg-gradient-to-r ${colors.gradient}`
                    )}>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={cn(
                      'flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-6',
                      colors.bg
                    )}>
                      <Icon className={cn('w-10 h-10', colors.text)} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Detail */}
                    <div className={cn(
                      'text-sm font-medium p-3 rounded-lg border',
                      colors.bg,
                      colors.text,
                      colors.border
                    )}>
                      {step.detail}
                    </div>

                    {/* Arrow for mobile */}
                    {index < steps.length - 1 && (
                      <div className="md:hidden flex justify-center mt-6">
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to secure your code?
            </h3>
            <p className="text-gray-600 mb-6">
              Start with 3 free scans. No credit card required.
            </p>
            <Button size="lg" className="gradient-security text-white border-0">
              Start Free Security Scan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}