'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Mail, Lock } from 'lucide-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ButtonLoading } from '@/components/common/loading-spinner'
import { toast } from 'sonner'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = useSupabaseClient()

  useEffect(() => {
    const message = searchParams.get('message')
    const error = searchParams.get('error')
    
    if (message) {
      toast.success(message)
    }
    if (error) {
      if (error === 'auth_failed') {
        setError('Authentication failed. Please try again.')
      } else if (error === 'callback_failed') {
        setError('Sign in failed. Please try again.')
      } else {
        setError('An error occurred. Please try again.')
      }
    }
  }, [searchParams])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      const redirectTo = searchParams.get('redirectTo') || '/dashboard'
      toast.success('Welcome back!')
      router.push(redirectTo)
    } catch (error) {
      console.error('Sign in error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-security rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ProdSafe</span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to continue securing your code
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/reset-password"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gradient-security text-white border-0 py-6 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ButtonLoading>Signing In...</ButtonLoading>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/sign-up"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign up for free
                </Link>
              </p>
            </div>

            {/* Additional Help */}
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800">
                New to ProdSafe? Start with{' '}
                <Link href="/sign-up" className="font-medium underline">
                  3 free scans
                </Link>
                {' '}- no credit card required
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}