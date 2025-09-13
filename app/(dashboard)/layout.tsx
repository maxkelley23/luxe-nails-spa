import { requireAuth } from '@/lib/supabase/auth'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()
  
  const supabase = createServerSupabaseClient()
  const { data: userProfile } = await supabase
    .from('users')
    .select('plan, scans_remaining')
    .eq('id', user.id)
    .single()

  const plan = userProfile?.plan as 'free' | 'pro' || 'free'
  const scansRemaining = userProfile?.scans_remaining || 0

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <DashboardSidebar userPlan={plan} scansRemaining={scansRemaining} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">ProdSafe</h1>
          <MobileMenu userPlan={plan} scansRemaining={scansRemaining} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}