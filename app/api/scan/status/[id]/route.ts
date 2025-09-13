import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get scan data
    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id) // Ensure user owns this scan
      .single()

    if (scanError) {
      return NextResponse.json({ error: 'Scan not found' }, { status: 404 })
    }

    return NextResponse.json(scan)

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}