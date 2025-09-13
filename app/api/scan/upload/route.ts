import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { performMockScan, calculateVulnerabilityCount } from '@/lib/scanners/mock-scanner'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile to check scans remaining
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('scans_remaining, plan')
      .eq('id', user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: 'Failed to get user profile' }, { status: 500 })
    }

    // Check if user has scans remaining (if on free plan)
    if (userProfile.plan === 'free' && userProfile.scans_remaining <= 0) {
      return NextResponse.json({ 
        error: 'No scans remaining. Please upgrade to Pro for unlimited scans.' 
      }, { status: 403 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const projectName = formData.get('projectName') as string
    const scanType = formData.get('scanType') as string

    if (!file || !projectName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 100MB.' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      'application/zip',
      'application/x-zip-compressed',
      'application/x-tar',
      'application/gzip',
      'application/x-rar-compressed'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Please upload a ZIP, TAR, or RAR file.' }, { status: 400 })
    }

    // Create scan record
    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .insert({
        user_id: user.id,
        project_name: projectName,
        file_size: file.size,
        scan_type: scanType,
        status: 'scanning',
        started_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (scanError) {
      return NextResponse.json({ error: 'Failed to create scan record' }, { status: 500 })
    }

    // Decrement scans remaining for free users
    if (userProfile.plan === 'free') {
      await supabase
        .from('users')
        .update({ scans_remaining: userProfile.scans_remaining - 1 })
        .eq('id', user.id)
    }

    // Start background scanning process (mock implementation)
    // In a real app, this would be a background job or webhook
    setTimeout(async () => {
      try {
        // Convert file to text for mock analysis
        const buffer = await file.arrayBuffer()
        const content = new TextDecoder().decode(buffer)

        // Perform mock scan
        const { vulnerabilities, totalCount } = await performMockScan(
          scan.id,
          projectName,
          content
        )

        // Calculate vulnerability counts
        const vulnerabilityCount = calculateVulnerabilityCount(vulnerabilities)

        // Insert vulnerabilities
        if (vulnerabilities.length > 0) {
          await supabase
            .from('vulnerabilities')
            .insert(vulnerabilities)
        }

        // Update scan status
        await supabase
          .from('scans')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            vulnerability_count: vulnerabilityCount,
          })
          .eq('id', scan.id)

      } catch (error) {
        console.error('Background scan error:', error)
        
        // Mark scan as failed
        await supabase
          .from('scans')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', scan.id)
      }
    }, 5000) // 5 second delay to simulate processing

    return NextResponse.json({ scanId: scan.id })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}