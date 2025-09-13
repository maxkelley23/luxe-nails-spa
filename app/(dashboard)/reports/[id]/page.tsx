import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { requireAuth } from '@/lib/supabase/auth'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { SeverityBadge } from '@/components/scan/severity-badge'
import { VulnerabilityCard } from '@/components/report/vulnerability-card'
import { EmptyState } from '@/components/common/empty-state'
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  Share,
} from 'lucide-react'
import type { VulnerabilityCount, Vulnerability } from '@/types/database'
import { notFound } from 'next/navigation'

interface ReportPageProps {
  params: {
    id: string
  }
}

export default async function ReportPage({ params }: ReportPageProps) {
  const user = await requireAuth()
  const supabase = createServerSupabaseClient()

  // Get scan details
  const { data: scan, error: scanError } = await supabase
    .from('scans')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (scanError || !scan) {
    notFound()
  }

  // Get vulnerabilities for this scan
  const { data: vulnerabilities } = await supabase
    .from('vulnerabilities')
    .select('*')
    .eq('scan_id', scan.id)
    .order('severity', { ascending: false }) // Critical first

  const vulnCount = scan.vulnerability_count as VulnerabilityCount
  const totalVulns = (vulnCount?.critical || 0) + (vulnCount?.high || 0) + 
                   (vulnCount?.medium || 0) + (vulnCount?.low || 0)

  // Group vulnerabilities by severity
  const groupedVulns = {
    critical: vulnerabilities?.filter(v => v.severity === 'critical') || [],
    high: vulnerabilities?.filter(v => v.severity === 'high') || [],
    medium: vulnerabilities?.filter(v => v.severity === 'medium') || [],
    low: vulnerabilities?.filter(v => v.severity === 'low') || [],
  }

  if (scan.status !== 'completed') {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Link href="/reports" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reports
        </Link>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Report Not Ready
              </h3>
              <p className="text-gray-600 mb-6">
                This scan is still {scan.status}. Please wait for it to complete.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href={`/scan/${scan.id}`}>
                  <Button>
                    View Progress
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/reports" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reports
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{scan.project_name}</h1>
            <p className="text-gray-600 mt-2">
              Security Report • Scanned on {formatDate(scan.created_at)}
            </p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Rescan
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">{vulnCount?.critical || 0}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                🔴
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High</p>
                <p className="text-2xl font-bold text-orange-600">{vulnCount?.high || 0}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                🟠
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Medium</p>
                <p className="text-2xl font-bold text-yellow-600">{vulnCount?.medium || 0}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                🟡
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low</p>
                <p className="text-2xl font-bold text-blue-600">{vulnCount?.low || 0}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                🔵
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success State */}
      {totalVulns === 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-2">
                🎉 No Security Issues Found!
              </h3>
              <p className="text-green-700 mb-6 max-w-md mx-auto">
                Great job! Your code passed all security checks. Keep following security best practices.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/scan">
                  <Button className="gradient-security text-white border-0">
                    Scan Another Project
                  </Button>
                </Link>
                <Button variant="outline" className="border-green-200 hover:bg-green-50">
                  <Download className="w-4 h-4 mr-2" />
                  Download Clean Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vulnerabilities */}
      {totalVulns > 0 && (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              All ({totalVulns})
            </TabsTrigger>
            <TabsTrigger value="critical" className="text-red-600">
              Critical ({vulnCount?.critical || 0})
            </TabsTrigger>
            <TabsTrigger value="high" className="text-orange-600">
              High ({vulnCount?.high || 0})
            </TabsTrigger>
            <TabsTrigger value="medium" className="text-yellow-600">
              Medium ({vulnCount?.medium || 0})
            </TabsTrigger>
            <TabsTrigger value="low" className="text-blue-600">
              Low ({vulnCount?.low || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {vulnerabilities && vulnerabilities.length > 0 ? (
              <>
                {/* Critical vulnerabilities first */}
                {groupedVulns.critical.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <SeverityBadge severity="critical" count={groupedVulns.critical.length} />
                      <span className="ml-3">Critical Issues</span>
                    </h3>
                    <div className="space-y-4">
                      {groupedVulns.critical.map((vuln) => (
                        <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
                      ))}
                    </div>
                  </div>
                )}

                {/* High vulnerabilities */}
                {groupedVulns.high.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <SeverityBadge severity="high" count={groupedVulns.high.length} />
                      <span className="ml-3">High Priority Issues</span>
                    </h3>
                    <div className="space-y-4">
                      {groupedVulns.high.map((vuln) => (
                        <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Medium and Low vulnerabilities */}
                {groupedVulns.medium.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <SeverityBadge severity="medium" count={groupedVulns.medium.length} />
                      <span className="ml-3">Medium Priority Issues</span>
                    </h3>
                    <div className="space-y-4">
                      {groupedVulns.medium.map((vuln) => (
                        <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
                      ))}
                    </div>
                  </div>
                )}

                {groupedVulns.low.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <SeverityBadge severity="low" count={groupedVulns.low.length} />
                      <span className="ml-3">Low Priority Issues</span>
                    </h3>
                    <div className="space-y-4">
                      {groupedVulns.low.map((vuln) => (
                        <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                icon={Shield}
                title="No vulnerabilities found"
                description="Your code is secure!"
              />
            )}
          </TabsContent>

          {(['critical', 'high', 'medium', 'low'] as const).map((severity) => (
            <TabsContent key={severity} value={severity} className="space-y-4">
              {groupedVulns[severity].length > 0 ? (
                groupedVulns[severity].map((vuln) => (
                  <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
                ))
              ) : (
                <EmptyState
                  icon={Shield}
                  title={`No ${severity} vulnerabilities`}
                  description={`Great! No ${severity} priority security issues were found.`}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}