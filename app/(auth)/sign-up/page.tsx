'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Mail, Lock, User, CheckCircle } from 'lucide-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ButtonLoading } from '@/components/common/loading-spinner'
import { toast } from 'sonner'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = useSupabaseClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      toast.success('Check your email for a confirmation link!')
      router.push('/sign-in?message=Check your email to continue')
    } catch (error) {
      console.error('Sign up error:', error)
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
              Create Your Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Start securing your code in 60 seconds
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                3 free security scans
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Plain-English vulnerability reports
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                AI-ready fix instructions
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Create a strong password"
                    minLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Must be at least 6 characters long
                </p>
              </div>

              <Button
                type="submit"
                className="w-full gradient-security text-white border-0 py-6 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ButtonLoading>Creating Account...</ButtonLoading>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/sign-in"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}