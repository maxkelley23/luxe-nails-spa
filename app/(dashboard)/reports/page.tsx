import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { requireAuth } from '@/lib/supabase/auth'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { formatRelativeTime, formatDate } from '@/lib/utils'
import { SeverityBadge } from '@/components/scan/severity-badge'
import { EmptyState } from '@/components/common/empty-state'
import {
  FileText,
  Search,
  Download,
  Eye,
  RefreshCw,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  X,
} from 'lucide-react'
import type { VulnerabilityCount } from '@/types/database'

export default async function ReportsPage() {
  const user = await requireAuth()
  const supabase = createServerSupabaseClient()

  // Get all scans for the user
  const { data: scans } = await supabase
    .from('scans')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'scanning':
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'failed':
        return <X className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'scanning':
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Reports</h1>
          <p className="text-gray-600 mt-1">
            View and manage all your code security scans
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/scan">
            <Button className="gradient-security text-white border-0">
              <FileText className="w-4 h-4 mr-2" />
              New Scan
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports by project name..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      {scans && scans.length > 0 ? (
        <div className="space-y-4">
          {scans.map((scan) => {
            const vulnCount = scan.vulnerability_count as VulnerabilityCount
            const totalVulns = (vulnCount?.critical || 0) + (vulnCount?.high || 0) + 
                             (vulnCount?.medium || 0) + (vulnCount?.low || 0)

            return (
              <Card key={scan.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Left side - Scan info */}
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                        {getStatusIcon(scan.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {scan.project_name}
                          </h3>
                          <Badge className={`${getStatusColor(scan.status)} capitalize`}>
                            {scan.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span>📅 {formatRelativeTime(scan.created_at)}</span>
                          <span>📁 {scan.scan_type}</span>
                          {scan.file_size && (
                            <span>💾 {Math.round(scan.file_size / 1024)} KB</span>
                          )}
                        </div>

                        {scan.status === 'completed' && vulnCount && (
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            {vulnCount.critical > 0 && (
                              <SeverityBadge severity="critical" count={vulnCount.critical} size="sm" />
                            )}
                            {vulnCount.high > 0 && (
                              <SeverityBadge severity="high" count={vulnCount.high} size="sm" />
                            )}
                            {vulnCount.medium > 0 && (
                              <SeverityBadge severity="medium" count={vulnCount.medium} size="sm" />
                            )}
                            {vulnCount.low > 0 && (
                              <SeverityBadge severity="low" count={vulnCount.low} size="sm" />
                            )}
                            {totalVulns === 0 && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                No Issues Found
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center space-x-3">
                      {scan.status === 'completed' && (
                        <>
                          <Link href={`/reports/${scan.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Report
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            PDF
                          </Button>
                        </>
                      )}
                      
                      {(scan.status === 'scanning' || scan.status === 'pending') && (
                        <Link href={`/scan/${scan.id}`}>
                          <Button variant="outline" size="sm">
                            <Clock className="w-4 h-4 mr-2" />
                            View Progress
                          </Button>
                        </Link>
                      )}
                      
                      {scan.status === 'failed' && (
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No security reports yet"
          description="Start your first security scan to see vulnerability reports here"
          action={{
            label: 'Start First Scan',
            onClick: () => window.location.href = '/scan'
          }}
        />
      )}

      {/* Summary Stats */}
      {scans && scans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Summary</CardTitle>
            <CardDescription>
              Overview of your security scans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {scans.length}
                </div>
                <div className="text-sm text-gray-600">Total Scans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {scans.filter(s => s.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {scans.filter(s => s.status === 'scanning' || s.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {scans.reduce((total, scan) => {
                    const vulnCount = scan.vulnerability_count as VulnerabilityCount
                    return total + (vulnCount?.critical || 0)
                  }, 0)}
                </div>
                <div className="text-sm text-gray-600">Critical Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}