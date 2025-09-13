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

    const { repoUrl, projectName, owner, repo, scanType } = await request.json()

    if (!repoUrl || !projectName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate GitHub URL format
    const githubRegex = /^https:\/\/github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_.-]+)(\/.*)?$/
    if (!githubRegex.test(repoUrl)) {
      return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 })
    }

    // Create scan record
    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .insert({
        user_id: user.id,
        project_name: projectName,
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
    // In a real app, this would clone the repo and analyze it
    setTimeout(async () => {
      try {
        // Mock GitHub repository content analysis
        const mockRepoContent = `
          // Mock repository content for ${owner}/${repo}
          const express = require('express');
          const app = express();
          
          // Potential vulnerability: exposed secret
          const API_KEY = "sk-1234567890abcdef";
          
          // Potential vulnerability: no input validation
          app.post('/api/users', (req, res) => {
            const query = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
            db.query(query);
          });
        `

        // Perform mock scan
        const { vulnerabilities } = await performMockScan(
          scan.id,
          projectName,
          mockRepoContent
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
        console.error('Background GitHub scan error:', error)
        
        // Mark scan as failed
        await supabase
          .from('scans')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', scan.id)
      }
    }, 7000) // 7 second delay for GitHub import simulation

    return NextResponse.json({ scanId: scan.id })

  } catch (error) {
    console.error('GitHub scan error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}