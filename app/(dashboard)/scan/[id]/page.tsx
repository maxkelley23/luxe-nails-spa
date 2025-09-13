'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScanProgress } from '@/components/scan/scan-progress'
import { SeverityBadge } from '@/components/scan/severity-badge'
import { ArrowLeft, FileText, RefreshCw, Eye } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import type { Scan, VulnerabilityCount } from '@/types/database'

interface ScanProgressPageProps {
  params: {
    id: string
  }
}

export default function ScanProgressPage({ params }: ScanProgressPageProps) {
  const [scan, setScan] = useState<Scan | null>(null)
  const [progress, setProgress] = useState(0)
  const [vulnerabilitiesFound, setVulnerabilitiesFound] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState<number | undefined>()
  const [error, setError] = useState('')
  const router = useRouter()

  // Fetch scan status
  const fetchScanStatus = async () => {
    try {
      const response = await fetch(`/api/scan/status/${params.id}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch scan status')
      }

      const scanData: Scan = await response.json()
      setScan(scanData)

      // Calculate progress based on status
      if (scanData.status === 'completed') {
        setProgress(100)
        const vulnCount = scanData.vulnerability_count as VulnerabilityCount
        const total = (vulnCount.critical || 0) + (vulnCount.high || 0) + 
                     (vulnCount.medium || 0) + (vulnCount.low || 0)
        setVulnerabilitiesFound(total)
        setEstimatedTime(0)
      } else if (scanData.status === 'scanning') {
        // Simulate progressive scanning with some randomness
        setProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 8 + 2, 95)
          return newProgress
        })
        setEstimatedTime(prev => prev ? Math.max(0, prev - 2) : 45)
      } else if (scanData.status === 'failed') {
        setError('Scan failed. Please try again.')
      }

    } catch (error) {
      console.error('Error fetching scan status:', error)
      setError('Failed to load scan status')
    }
  }

  useEffect(() => {
    fetchScanStatus()

    // Poll for updates every 2 seconds if scanning
    const interval = setInterval(() => {
      if (scan?.status === 'scanning' || scan?.status === 'pending') {
        fetchScanStatus()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [params.id, scan?.status])

  // Auto-redirect to report when completed
  useEffect(() => {
    if (scan?.status === 'completed') {
      const timer = setTimeout(() => {
        router.push(`/reports/${scan.id}`)
      }, 3000) // Wait 3 seconds to show completion state

      return () => clearTimeout(timer)
    }
  }, [scan?.status, scan?.id, router])

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-600 mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Scan Failed</h3>
              <p className="text-red-700 mb-6">{error}</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
                <Link href="/scan">
                  <Button>Start New Scan</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!scan) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scanning Progress</h1>
          <p className="text-gray-600 mt-2">
            Analyzing <strong>{scan.project_name}</strong> • Started {formatRelativeTime(scan.started_at)}
          </p>
        </div>
      </div>

      {/* Progress Component */}
      <div className="mb-8">
        <ScanProgress
          status={scan.status as 'pending' | 'scanning' | 'completed' | 'failed'}
          progress={progress}
          vulnerabilitiesFound={vulnerabilitiesFound}
          estimatedTimeRemaining={estimatedTime}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        {scan.status === 'completed' && (
          <>
            <Link href={`/reports/${scan.id}`}>
              <Button size="lg" className="gradient-security text-white border-0">
                <Eye className="w-5 h-5 mr-2" />
                View Security Report
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </Button>
          </>
        )}

        {(scan.status === 'scanning' || scan.status === 'pending') && (
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
        )}

        {scan.status === 'failed' && (
          <div className="flex space-x-4">
            <Link href="/scan">
              <Button size="lg" className="gradient-security text-white border-0">
                Start New Scan
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Retry
            </Button>
          </div>
        )}
      </div>

      {/* Scan Details */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Project:</span>
              <span className="font-medium">{scan.project_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium capitalize">{scan.scan_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Started:</span>
              <span className="font-medium">{formatRelativeTime(scan.started_at)}</span>
            </div>
            {scan.file_size && (
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">{Math.round(scan.file_size / 1024)} KB</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scan Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Dependency Scan</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Code Analysis</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Secret Detection</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Configuration Check</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <FileText className="w-4 h-4 mt-0.5" />
              <span>Get a detailed security report with plain-English explanations</span>
            </div>
            <div className="flex items-start space-x-2">
              <FileText className="w-4 h-4 mt-0.5" />
              <span>Copy AI prompts to fix vulnerabilities instantly</span>
            </div>
            <div className="flex items-start space-x-2">
              <FileText className="w-4 h-4 mt-0.5" />
              <span>Download PDF report for your team or investors</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto-redirect notice */}
      {scan.status === 'completed' && (
        <div className="mt-8 text-center">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <p className="text-green-800">
                ✅ Scan completed successfully! Redirecting to your security report in a few seconds...
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}