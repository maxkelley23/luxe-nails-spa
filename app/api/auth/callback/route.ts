import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      const { data: { session }, error: authError } = await supabase.auth.exchangeCodeForSession(code)

      if (authError) {
        console.error('Auth callback error:', authError)
        return NextResponse.redirect(`${requestUrl.origin}/sign-in?error=auth_failed`)
      }

      if (session?.user) {
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', session.user.id)
          .single()

        if (!existingUser) {
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: session.user.id,
              email: session.user.email!,
              full_name: session.user.user_metadata?.full_name || null,
              plan: 'free',
              scans_remaining: 3,
            })

          if (profileError) {
            console.error('Error creating user profile:', profileError)
          }
        }
      }

      const redirectTo = requestUrl.searchParams.get('redirectTo') || '/dashboard'
      return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`)
    } catch (error) {
      console.error('Callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/sign-in?error=callback_failed`)
    }
  }

  return NextResponse.redirect(requestUrl.origin)
}