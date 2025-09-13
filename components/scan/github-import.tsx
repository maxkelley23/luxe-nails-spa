'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Github, 
  ExternalLink, 
  Lock, 
  Globe,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

interface GitHubImportProps {
  onScanStart: (loading: boolean) => void
  onScanComplete: (scanId: string) => void
  disabled?: boolean
}

export function GitHubImport({ onScanStart, onScanComplete, disabled }: GitHubImportProps) {
  const [repoUrl, setRepoUrl] = useState('')
  const [projectName, setProjectName] = useState('')
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [repoInfo, setRepoInfo] = useState<{
    owner: string
    repo: string
    isPrivate?: boolean
  } | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')

  const validateGitHubUrl = (url: string) => {
    const regex = /^https:\/\/github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_.-]+)(\/.*)?$/
    const match = url.match(regex)
    
    if (match) {
      const [, owner, repo] = match
      setRepoInfo({ owner, repo })
      setIsValidUrl(true)
      setProjectName(repo.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
      setError('')
    } else {
      setRepoInfo(null)
      setIsValidUrl(false)
      if (url.trim()) {
        setError('Please enter a valid GitHub repository URL (e.g., https://github.com/owner/repo)')
      } else {
        setError('')
      }
    }
  }

  const handleUrlChange = (value: string) => {
    setRepoUrl(value)
    validateGitHubUrl(value)
  }

  const handleScan = async () => {
    if (!isValidUrl || !repoInfo || !projectName.trim()) {
      setError('Please enter a valid GitHub URL and project name.')
      return
    }

    setIsScanning(true)
    onScanStart(true)
    setError('')

    try {
      const response = await fetch('/api/scan/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoUrl: repoUrl.trim(),
          projectName: projectName.trim(),
          owner: repoInfo.owner,
          repo: repoInfo.repo,
          scanType: 'github',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to start GitHub scan')
      }

      const { scanId } = await response.json()
      
      toast.success('GitHub repository imported successfully! Starting scan...')
      onScanComplete(scanId)

    } catch (error) {
      console.error('GitHub import error:', error)
      setError(error instanceof Error ? error.message : 'Failed to import repository. Please try again.')
      onScanStart(false)
    } finally {
      setIsScanning(false)
    }
  }

  const exampleUrls = [
    'https://github.com/facebook/react',
    'https://github.com/microsoft/vscode',
    'https://github.com/your-username/your-repo',
  ]

  return (
    <div className="space-y-6">
      {/* GitHub URL Input */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub Repository URL</Label>
              <div className="relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="githubUrl"
                  type="url"
                  value={repoUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className={`pl-10 ${isValidUrl ? 'border-green-500' : repoUrl && !isValidUrl ? 'border-red-500' : ''}`}
                  placeholder="https://github.com/owner/repository"
                  disabled={disabled || isScanning}
                />
              </div>
              
              {/* Examples */}
              <div className="text-sm text-gray-500">
                <p className="mb-2">Examples:</p>
                <div className="space-y-1">
                  {exampleUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => handleUrlChange(url)}
                      className="block text-blue-600 hover:text-blue-500 hover:underline"
                      disabled={disabled || isScanning}
                    >
                      {url}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Repository Info */}
            {isValidUrl && repoInfo && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Github className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-green-900">
                            {repoInfo.owner}/{repoInfo.repo}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            <Globe className="w-3 h-3 mr-1" />
                            Public
                          </Badge>
                        </div>
                        <p className="text-sm text-green-700">Repository found</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(repoUrl, '_blank')}
                      className="text-green-600 hover:text-green-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Project Name Input */}
      {isValidUrl && (
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter a name for this scan"
            disabled={disabled || isScanning}
          />
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Private Repository Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Private Repositories</h4>
              <p className="text-sm text-blue-700 mt-1">
                For private repositories, you'll need to provide access tokens or use our GitHub App integration. 
                <button className="underline ml-1 hover:no-underline">
                  Learn more
                </button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Scan Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleScan}
          disabled={!isValidUrl || !projectName.trim() || disabled || isScanning}
          size="lg"
          className="gradient-security text-white border-0"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Importing Repository...
            </>
          ) : (
            <>
              <Github className="w-5 h-5 mr-2" />
              Import & Scan Repository
            </>
          )}
        </Button>
      </div>

      {/* Feature Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">No Cloning Required</h4>
                <p className="text-sm text-green-700 mt-1">
                  We fetch your repository securely without storing it permanently
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">Branch Selection</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Scans the default branch (usually main or master)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}