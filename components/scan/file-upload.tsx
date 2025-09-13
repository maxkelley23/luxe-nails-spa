'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Upload, 
  File, 
  CheckCircle, 
  AlertTriangle, 
  X,
  FileArchive,
  Loader2 
} from 'lucide-react'
import { formatBytes, validateFileType } from '@/lib/utils'
import { APP_CONFIG } from '@/lib/utils/constants'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface FileUploadProps {
  onScanStart: (loading: boolean) => void
  onScanComplete: (scanId: string) => void
  disabled?: boolean
}

export function FileUpload({ onScanStart, onScanComplete, disabled }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [projectName, setProjectName] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError('')

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
        setError(`File is too large. Maximum size is ${formatBytes(APP_CONFIG.maxFileSize)}.`)
      } else if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
        setError(`Invalid file type. Please upload: ${APP_CONFIG.allowedFileTypes.join(', ')}`)
      } else {
        setError('File upload failed. Please try again.')
      }
      return
    }

    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0]
      setFile(uploadedFile)
      
      // Auto-generate project name from filename
      const fileName = uploadedFile.name.replace(/\.[^/.]+$/, '')
      setProjectName(fileName.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
      'application/x-tar': ['.tar'],
      'application/gzip': ['.gz', '.tgz'],
      'application/x-rar-compressed': ['.rar'],
    },
    maxSize: APP_CONFIG.maxFileSize,
    maxFiles: 1,
    disabled: disabled || isUploading,
  })

  const handleScan = async () => {
    if (!file || !projectName.trim()) {
      setError('Please select a file and enter a project name.')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    onScanStart(true)
    setError('')

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 10
        })
      }, 500)

      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', file)
      formData.append('projectName', projectName.trim())
      formData.append('scanType', 'upload')

      // Upload file and start scan
      const response = await fetch('/api/scan/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const { scanId } = await response.json()
      
      toast.success('File uploaded successfully! Starting scan...')
      onScanComplete(scanId)

    } catch (error) {
      console.error('Upload error:', error)
      setError(error instanceof Error ? error.message : 'Upload failed. Please try again.')
      setUploadProgress(0)
      onScanStart(false)
    } finally {
      setIsUploading(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setProjectName('')
    setUploadProgress(0)
    setError('')
  }

  return (
    <div className="space-y-6">
      {/* File Drop Zone */}
      <Card className={cn(
        'transition-all duration-200',
        isDragActive && 'ring-2 ring-blue-500 ring-offset-2',
        file && 'bg-green-50 border-green-200'
      )}>
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
              file ? 'border-green-500 bg-green-25' : 'hover:border-gray-400',
              (disabled || isUploading) && 'cursor-not-allowed opacity-50'
            )}
          >
            <input {...getInputProps()} />

            {!file ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isDragActive ? 'Drop your code here' : 'Upload Your Code'}
                </h3>

                <p className="text-gray-600 mb-4">
                  Drag and drop your ZIP file here, or click to browse
                </p>

                <div className="text-sm text-gray-500">
                  <p>Supported formats: {APP_CONFIG.allowedFileTypes.join(', ')}</p>
                  <p>Maximum size: {formatBytes(APP_CONFIG.maxFileSize)}</p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <FileArchive className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600">{formatBytes(file.size)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetUpload()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Project Name Input */}
      {file && (
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter a name for this scan"
            disabled={disabled || isUploading}
          />
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Uploading and scanning...</span>
                <span className="text-sm text-gray-500">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Start Scan Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleScan}
          disabled={!file || !projectName.trim() || disabled || isUploading}
          size="lg"
          className="gradient-security text-white border-0"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Start Security Scan
            </>
          )}
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Secure Processing</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your code is processed in isolated containers and automatically deleted after scanning
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Fast Analysis</h4>
                <p className="text-sm text-green-700 mt-1">
                  Get comprehensive security analysis results in under 60 seconds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}