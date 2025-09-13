import { createServerSupabaseClient } from './server'
import { redirect } from 'next/navigation'
import type { User } from '@/types/database'

export async function getUser(): Promise<User | null> {
  const supabase = createServerSupabaseClient()
  
  try {
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !authUser) {
      return null
    }

    // Get user profile from our users table
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single()

    if (userError || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getUser()
  
  if (!user) {
    redirect('/sign-in')
  }
  
  return user
}

export async function getUserSession() {
  const supabase = createServerSupabaseClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error getting session:', error)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function createUserProfile(userId: string, email: string, fullName?: string) {
  const supabase = createServerSupabaseClient()
  
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        full_name: fullName || null,
        plan: 'free',
        scans_remaining: 3,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error creating user profile:', error)
    return null
  }
}