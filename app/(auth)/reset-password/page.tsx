'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Mail, ArrowLeft } from 'lucide-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ButtonLoading } from '@/components/common/loading-spinner'
import { toast } from 'sonner'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const supabase = useSupabaseClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password/update`,
      })

      if (error) {
        setError(error.message)
        return
      }

      setIsSubmitted(true)
      toast.success('Password reset email sent!')
    } catch (error) {
      console.error('Reset password error:', error)
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
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your email and we'll send you a reset link
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
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

                  <Button
                    type="submit"
                    className="w-full gradient-security text-white border-0 py-6 text-lg font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ButtonLoading>Sending Reset Link...</ButtonLoading>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600">
                    We've sent a password reset link to{' '}
                    <span className="font-medium">{email}</span>
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => {
                        setIsSubmitted(false)
                        setEmail('')
                      }}
                      className="font-medium underline"
                    >
                      try again
                    </button>
                  </p>
                </div>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/sign-in"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}