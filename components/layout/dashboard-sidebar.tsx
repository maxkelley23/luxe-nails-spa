'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  LayoutDashboard,
  Scan,
  FileText,
  Settings,
  CreditCard,
  LogOut,
  User,
  Bell,
} from 'lucide-react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'New Scan',
    href: '/scan',
    icon: Scan,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    name: 'Billing',
    href: '/billing',
    icon: CreditCard,
  },
]

interface DashboardSidebarProps {
  userPlan?: 'free' | 'pro'
  scansRemaining?: number
}

export function DashboardSidebar({ userPlan = 'free', scansRemaining = 0 }: DashboardSidebarProps) {
  const pathname = usePathname()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const user = useUser()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Error signing out')
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-security rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">ProdSafe</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {item.name}
              {item.name === 'New Scan' && userPlan === 'free' && (
                <Badge 
                  variant="secondary" 
                  className="ml-auto text-xs bg-blue-100 text-blue-800"
                >
                  {scansRemaining}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Plan Status */}
      {userPlan === 'free' && (
        <div className="px-4 py-4 border-t bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Free Plan</span>
              <Badge variant="outline" className="text-xs">
                {scansRemaining} left
              </Badge>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Upgrade for unlimited scans and advanced features
            </p>
            <Link href="/billing">
              <Button size="sm" className="w-full text-xs gradient-security text-white border-0">
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="px-4 py-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {userPlan} plan
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="p-2 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}