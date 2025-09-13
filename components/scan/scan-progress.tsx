'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScanProgressProps {
  status: 'pending' | 'scanning' | 'completed' | 'failed'
  progress?: number
  vulnerabilitiesFound?: number
  estimatedTimeRemaining?: number
}

const statusConfig = {
  pending: {
    label: 'Initializing Scan',
    description: 'Preparing to analyze your code...',
    icon: Clock,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
  scanning: {
    label: 'Scanning in Progress',
    description: 'Analyzing code for security vulnerabilities...',
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  completed: {
    label: 'Scan Complete',
    description: 'Analysis finished successfully',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  failed: {
    label: 'Scan Failed',
    description: 'An error occurred during analysis',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
}

export function ScanProgress({
  status,
  progress = 0,
  vulnerabilitiesFound = 0,
  estimatedTimeRemaining
}: ScanProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  
  const config = statusConfig[status]
  const Icon = config.icon

  const steps = [
    'Extracting files...',
    'Analyzing code structure...',
    'Scanning for vulnerabilities...',
    'Checking dependencies...',
    'Generating report...',
  ]

  useEffect(() => {
    if (status === 'scanning') {
      const interval = setInterval(() => {
        setAnimatedProgress(prev => {
          const next = Math.min(prev + Math.random() * 5, progress)
          return next
        })
        
        if (progress < 20) {
          setCurrentStep(steps[0])
        } else if (progress < 40) {
          setCurrentStep(steps[1])
        } else if (progress < 60) {
          setCurrentStep(steps[2])
        } else if (progress < 80) {
          setCurrentStep(steps[3])
        } else {
          setCurrentStep(steps[4])
        }
      }, 500)

      return () => clearInterval(interval)
    } else if (status === 'completed') {
      setAnimatedProgress(100)
      setCurrentStep('Complete')
    }
  }, [status, progress])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className={cn('flex justify-center mb-4')}>
          <div className={cn('flex items-center justify-center w-16 h-16 rounded-full', config.bgColor)}>
            <Icon className={cn('w-8 h-8', config.color)} />
          </div>
        </div>
        <CardTitle className={config.color}>{config.label}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        {(status === 'scanning' || status === 'completed') && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                {currentStep}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(animatedProgress)}%
              </span>
            </div>
            <Progress 
              value={animatedProgress} 
              className="h-2"
            />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {vulnerabilitiesFound}
            </div>
            <div className="text-sm text-gray-600">
              Vulnerabilities Found
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {estimatedTimeRemaining || '--'}
            </div>
            <div className="text-sm text-gray-600">
              {estimatedTimeRemaining ? 'Seconds Left' : 'Time Remaining'}
            </div>
          </div>
        </div>

        {/* Real-time Updates */}
        {status === 'scanning' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-800 font-medium">
                Live scanning in progress
              </span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Vulnerabilities will appear as they are discovered
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}