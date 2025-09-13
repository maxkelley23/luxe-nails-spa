import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'ghost'
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  return (
    <Card className={cn('', className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-4 text-center">
        {Icon && (
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Icon className="w-8 h-8 text-gray-400" />
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-sm">
          {description}
        </p>
        
        {action && (
          <Button
            onClick={action.onClick}
            variant={action.variant || 'default'}
            className={action.variant === 'default' ? 'gradient-security text-white border-0' : ''}
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}