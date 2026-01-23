'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema, type LoginFormData } from '@/lib/login-schema'
import { Chrome, Github, Apple } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const supabase = createClient()

  // Handle OAuth sign-in
  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'apple') => {
    try {
      setLoading(true)
      setError('')

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  // Handle magic link sign-in
  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      setError('')
      setMagicLinkSent(false)

      // Validate email with Zod
      const result = loginSchema.safeParse({ email })
      
      if (!result.success) {
        setError(result.error.errors[0].message)
        setLoading(false)
        return
      }

      const { error } = await supabase.auth.signInWithOtp({
        email: result.data.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setMagicLinkSent(true)
      setEmail('')
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      {/* Login card */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-slate-950/50 p-8 shadow-2xl backdrop-blur-xl">
        {/* Logo/Brand */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">UI App</h1>
        </div>

        {/* Title */}
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Sign in to your account
          </h2>
          <p className="text-sm text-slate-400">
            Dont have an account?{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Sign up
            </a>
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => handleOAuthSignIn('google')}
            disabled={loading}
            variant="outline"
            className="w-full border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
          >
            <Chrome className="size-5" />
            Continue with Google
          </Button>

          <Button
            onClick={() => handleOAuthSignIn('github')}
            disabled={loading}
            variant="outline"
            className="w-full border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
          >
            <Github className="size-5" />
            Continue with GitHub
          </Button>

          <Button
            onClick={() => handleOAuthSignIn('apple')}
            disabled={loading}
            variant="outline"
            className="w-full border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
          >
            <Apple className="size-5" />
            Continue with Apple
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-2 text-slate-400">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleMagicLinkSignIn} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-slate-300">
              Enter your email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="border-slate-700 bg-slate-900/50 text-white placeholder:text-slate-500"
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {magicLinkSent && (
            <div className="rounded-md border border-green-900/50 bg-green-950/50 p-3 text-sm text-green-400">
              Check your email! We've sent you a magic link to sign in.
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? 'Sending...' : 'Continue with Email'}
          </Button>
        </form>

        {/* Terms */}
        <p className="text-center text-xs text-slate-500">
          By clicking Sign In, you agree to our{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
