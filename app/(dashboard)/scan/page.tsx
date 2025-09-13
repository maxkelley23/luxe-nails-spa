'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUpload } from '@/components/scan/file-upload'
import { GitHubImport } from '@/components/scan/github-import'
import { requireAuth } from '@/lib/supabase/auth'
import { ArrowLeft, Upload, Github, Globe } from 'lucide-react'
import Link from 'next/link'

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const router = useRouter()

  const handleScanComplete = (scanId: string) => {
    router.push(`/scan/${scanId}`)
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
          <h1 className="text-3xl font-bold text-gray-900">New Security Scan</h1>
          <p className="text-gray-600 mt-2">
            Upload your code and get comprehensive security analysis in 60 seconds
          </p>
        </div>
      </div>

      {/* Scan Options */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Scan Method</CardTitle>
          <CardDescription>
            Select how you'd like to upload your code for security analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload File</span>
              </TabsTrigger>
              <TabsTrigger value="github" className="flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>URL</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <FileUpload 
                onScanStart={setIsScanning}
                onScanComplete={handleScanComplete}
                disabled={isScanning}
              />
            </TabsContent>

            <TabsContent value="github" className="mt-6">
              <GitHubImport 
                onScanStart={setIsScanning}
                onScanComplete={handleScanComplete}
                disabled={isScanning}
              />
            </TabsContent>

            <TabsContent value="url" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      URL Scanning Coming Soon
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      We're working on the ability to scan code directly from URLs. 
                      For now, please use file upload or GitHub integration.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="outline" onClick={() => 
                        document.querySelector('[value="upload"]')?.click()
                      }>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Files Instead
                      </Button>
                      <Button variant="outline" onClick={() => 
                        document.querySelector('[value="github"]')?.click()
                      }>
                        <Github className="w-4 h-4 mr-2" />
                        Use GitHub Instead
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-blue-900">Secure Upload</h3>
              <p className="text-sm text-blue-700 mt-1">
                Your code is encrypted and processed in isolated containers
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Github className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-green-900">Auto Deletion</h3>
              <p className="text-sm text-green-700 mt-1">
                Code is automatically deleted after scanning completes
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-purple-900">SOC 2 Compliant</h3>
              <p className="text-sm text-purple-700 mt-1">
                Enterprise-grade security and compliance standards
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}