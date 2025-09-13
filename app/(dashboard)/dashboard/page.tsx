import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { requireAuth } from '@/lib/supabase/auth'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { formatRelativeTime } from '@/lib/utils'
import { SeverityBadge } from '@/components/scan/severity-badge'
import { EmptyState } from '@/components/common/empty-state'
import {
  Plus,
  FileText,
  Shield,
  TrendingUp,
  Scan,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import type { VulnerabilityCount } from '@/types/database'

export default async function DashboardPage() {
  const user = await requireAuth()
  const supabase = createServerSupabaseClient()

  // Get user profile with plan info
  const { data: userProfile } = await supabase
    .from('users')
    .select('plan, scans_remaining')
    .eq('id', user.id)
    .single()

  // Get recent scans
  const { data: recentScans } = await supabase
    .from('scans')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // Get stats for current month
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: monthlyScans, count: totalScansThisMonth } = await supabase
    .from('scans')
    .select('vulnerability_count', { count: 'exact' })
    .eq('user_id', user.id)
    .gte('created_at', startOfMonth.toISOString())

  // Calculate total vulnerabilities found this month
  const totalVulnerabilities = monthlyScans?.reduce((total, scan) => {
    const vulnCount = scan.vulnerability_count as VulnerabilityCount
    return total + (vulnCount.critical || 0) + (vulnCount.high || 0) + 
           (vulnCount.medium || 0) + (vulnCount.low || 0)
  }, 0) || 0

  // Calculate critical issues fixed (mock data for now)
  const criticalIssuesFixed = monthlyScans?.reduce((total, scan) => {
    const vulnCount = scan.vulnerability_count as VulnerabilityCount
    return total + (vulnCount.critical || 0)
  }, 0) || 0

  const plan = userProfile?.plan as 'free' | 'pro' || 'free'
  const scansRemaining = userProfile?.scans_remaining || 0

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.full_name?.split(' ')[0] || user.email.split('@')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your code security
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/scan">
            <Button size="lg" className="gradient-security text-white border-0">
              <Plus className="w-5 h-5 mr-2" />
              New Security Scan
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scans This Month</CardTitle>
            <Scan className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScansThisMonth || 0}</div>
            <p className="text-xs text-muted-foreground">
              {plan === 'free' ? `${scansRemaining} remaining` : 'Unlimited'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vulnerabilities Found</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVulnerabilities}</div>
            <p className="text-xs text-muted-foreground">
              Total issues detected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalIssuesFixed}</div>
            <p className="text-xs text-muted-foreground">
              High priority fixes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalVulnerabilities === 0 ? '100%' : Math.max(0, 100 - totalVulnerabilities * 5) + '%'}
            </div>
            <p className="text-xs text-muted-foreground">
              Code security rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Scan Card */}
        <Card className="security-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" />
              Start New Scan
            </CardTitle>
            <CardDescription>
              Upload your code and get security insights in 60 seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/scan">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload ZIP File
                  </Button>
                </Link>
                <Link href="/scan?tab=github">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    GitHub Repository
                  </Button>
                </Link>
              </div>
              {plan === 'free' && scansRemaining <= 1 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    Only {scansRemaining} scan{scansRemaining !== 1 ? 's' : ''} remaining.{' '}
                    <Link href="/billing" className="font-medium underline">
                      Upgrade to Pro
                    </Link>{' '}
                    for unlimited scans.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reports Card */}
        <Card className="security-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              View All Reports
            </CardTitle>
            <CardDescription>
              Access detailed vulnerability reports and fixes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/reports">
              <Button className="w-full gradient-success text-white border-0">
                Browse Security Reports
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>
            Your latest security assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentScans && recentScans.length > 0 ? (
            <div className="space-y-4">
              {recentScans.map((scan) => {
                const vulnCount = scan.vulnerability_count as VulnerabilityCount
                const totalVulns = (vulnCount.critical || 0) + (vulnCount.high || 0) + 
                                 (vulnCount.medium || 0) + (vulnCount.low || 0)

                return (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        {scan.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {scan.status === 'scanning' && <Clock className="w-5 h-5 text-blue-600" />}
                        {scan.status === 'failed' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                        {scan.status === 'pending' && <Clock className="w-5 h-5 text-gray-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{scan.project_name}</h4>
                        <p className="text-sm text-gray-600">
                          {formatRelativeTime(scan.created_at)} • {scan.scan_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {scan.status === 'completed' && (
                        <div className="flex items-center space-x-2">
                          {vulnCount.critical > 0 && (
                            <SeverityBadge severity="critical" count={vulnCount.critical} size="sm" />
                          )}
                          {vulnCount.high > 0 && (
                            <SeverityBadge severity="high" count={vulnCount.high} size="sm" />
                          )}
                          {totalVulns === 0 && (
                            <Badge className="bg-green-100 text-green-800">No Issues</Badge>
                          )}
                        </div>
                      )}
                      {scan.status === 'completed' && (
                        <Link href={`/reports/${scan.id}`}>
                          <Button size="sm" variant="outline">
                            View Report
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
              
              <div className="text-center pt-4">
                <Link href="/reports">
                  <Button variant="outline">
                    View All Scans
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title="No scans yet"
              description="Start your first security scan to see your results here"
              action={{
                label: 'Start First Scan',
                onClick: () => window.location.href = '/scan'
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}