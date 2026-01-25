'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/lib/login-schema'
import { Github } from 'lucide-react'
import { AuthProviders } from '@/types'
import { AxiosError } from 'axios'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const supabase = createClient()

  // Handle OAuth sign-in
  const handleOAuthSignIn = async (provider: AuthProviders) => {
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
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to sign in')
      }
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
        // setError(result.error.errors[0].message)
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.message) {
        setError(err.message || 'Failed to send magic link')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden ">


      {/* left */}
      <div className='flex-1 flex justify-center'>
        <div className="relative max-w-lg z-10 w-full space-y-8 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo/Brand */}
          <h1 className="text-3xl text-center font-bold">UI Generate App</h1>

          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-semibold">Sign in to your account</h2>
            <p className="text-sm text-foreground/70">
              Dont have an account?{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500/80 transition-colors">
                Sign up
              </a>
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleOAuthSignIn('google')}
              disabled={loading}
              size="lg"
              className="w-full border h-12 bg-foreground text-background rounded-lg hover:bg-foreground cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>

            <Button
              onClick={() => handleOAuthSignIn('github')}
              disabled={loading}
              className="w-full border h-12 bg-background text-foreground rounded-lg hover:bg-background cursor-pointer"
            >
              <Github className="size-5" />
              Continue with GitHub
            </Button>

            <Button
              onClick={() => handleOAuthSignIn('apple')}
              disabled={loading}
              className="w-full border h-12 bg-background text-foreground rounded-lg hover:bg-background cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"></path><path d="M15.53 3.83c.893-1.09 1.479-2.58 1.309-4.081-1.27.052-2.82.863-3.74 1.93-.831.942-1.558 2.484-1.35 3.941 1.43.111 2.889-.724 3.781-1.79z"></path></svg>
              Continue with Apple
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 tracking-one opacity-80 font-normal bg-background">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleMagicLinkSignIn} className="space-y-4">
            <div className="space-y-3">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="border-border bg-secondary h-12 text-white placeholder:text-base"
              />
            </div>

            {error && (
              <div className="rounded-md border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {magicLinkSent && (
              <div className="rounded-md border border-green-900/50 bg-green-950/50 p-3 text-sm text-green-400">
                Check your email! We&apos;ve sent you a magic link to sign in.
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-600/80 text-white"
            >
              {loading ? 'Sending...' : 'Continue with Email'}
            </Button>
          </form>

          {/* Terms */}
          <p className="text-center text-xs text-slate-500">
            By clicking Sign In, you agree to our{' '}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500/80 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500/80 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>


      {/* right */}
      <div className='flex-1'>
        hello world
      </div>
    </div>
  )
}
