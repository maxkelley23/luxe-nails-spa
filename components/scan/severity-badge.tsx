import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { VULNERABILITY_SEVERITY } from '@/lib/utils/constants'

interface SeverityBadgeProps {
  severity: 'critical' | 'high' | 'medium' | 'low'
  count?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SeverityBadge({ severity, count, size = 'md', className }: SeverityBadgeProps) {
  const severityConfig = VULNERABILITY_SEVERITY[severity]
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  const colorClasses = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200',
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center space-x-1 font-medium border',
        colorClasses[severity],
        sizeClasses[size],
        className
      )}
    >
      <span>{severityConfig.icon}</span>
      <span className="capitalize">{severityConfig.label}</span>
      {count !== undefined && (
        <span className="ml-1 font-semibold">({count})</span>
      )}
    </Badge>
  )
}