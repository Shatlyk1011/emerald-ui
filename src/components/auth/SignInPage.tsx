'use client'

import { useState } from 'react'
import { AxiosError } from 'axios'
import { AuthProviders } from '@/types'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { loginSchema } from '@/lib/login-schema'
import { createClient } from '@/lib/supabase-client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  handleSwitch?: () => void
  isModal?: boolean
  redirectTo?: string
}

export default function SignInPage({
  handleSwitch,
  isModal,
  redirectTo,
}: Props) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const searchParams = useSearchParams()
  const supabase = createClient()

  // Determine where to redirect after successful auth
  const returnUrl = redirectTo || searchParams.get('next') || '/'

  // Build the callback URL with the return path
  const callbackUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(returnUrl)}`
      : `/api/auth/callback?next=${encodeURIComponent(returnUrl)}`

  // Handle OAuth sign-in
  const handleOAuthSignIn = async (provider: AuthProviders) => {
    try {
      setLoading(true)
      setError('')

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl,
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
          emailRedirectTo: callbackUrl,
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
    <div
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden max-sm:items-start max-sm:pt-12',
        isModal && 'max-h-max min-h-auto py-6'
      )}
    >
      {/* left */}
      <div className='flex flex-1 justify-center'>
        <div className='relative z-10 w-full max-w-lg space-y-8 rounded-2xl p-8 shadow-2xl backdrop-blur-xl max-md:space-y-5 max-sm:p-5'>
          {/* Logo/Brand */}
          <h1 className='text-center text-3xl font-bold max-md:text-2xl'>
            Emerald UI
          </h1>

          <div className='space-y-2 text-center'>
            <h2 className='text-3xl font-semibold max-md:text-2xl'>
              Sign in to your account
            </h2>
            <p className='text-foreground/70 text-sm'>
              Don&apos;t have an account?{' '}
              {isModal ? (
                <button
                  className='text-blue-600 transition-colors hover:text-blue-500/80 dark:text-blue-400'
                  onClick={handleSwitch}
                >
                  Sign up
                </button>
              ) : (
                <Link
                  href='/sign-up'
                  className='text-blue-600 transition-colors hover:text-blue-500/80 dark:text-blue-400'
                >
                  Sign up
                </Link>
              )}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className='space-y-3'>
            <Button
              onClick={() => handleOAuthSignIn('google')}
              disabled={loading}
              size='lg'
              className='bg-foreground text-background hover:bg-foreground h-12 w-full cursor-pointer rounded-lg border'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='50'
                height='50'
              >
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              onClick={() => handleOAuthSignIn('github')}
              disabled={loading}
              className='bg-background text-foreground hover:bg-background h-12 w-full cursor-pointer rounded-lg border'
            >
              <Github className='size-5' />
              Continue with GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='border-border w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='tracking-one bg-background px-2 font-normal opacity-80'>
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleMagicLinkSignIn} className='space-y-4'>
            <div className='space-y-3'>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                autoComplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className='border-border bg-secondary h-10 text-white placeholder:text-sm'
              />
            </div>

            {error && (
              <div className='rounded-md border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-400'>
                {error}
              </div>
            )}

            {magicLinkSent && (
              <div className='rounded-md border border-green-900/50 bg-green-950/50 p-3 text-sm text-green-400'>
                Check your email! We&apos;ve sent you a magic link to sign in.
              </div>
            )}

            <Button
              type='submit'
              disabled={loading}
              className='bg-primary-foreground hover:bg-primary-foreground/80 h-10 w-full text-white'
            >
              {loading ? 'Sending...' : 'Continue with Email'}
            </Button>
          </form>

          {/* Terms */}
          <p className='text-center text-xs text-slate-500'>
            By clicking Sign In, you agree to our{' '}
            <a
              href='#'
              className='text-blue-600 transition-colors hover:text-blue-500/80 dark:text-blue-400'
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href='#'
              className='text-blue-600 transition-colors hover:text-blue-500/80 dark:text-blue-400'
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* right */}
      <div
        className={cn(
          'flex h-screen flex-1 items-center justify-center bg-slate-900 max-lg:hidden',
          isModal && 'hidden'
        )}
      >
        hello world
      </div>
    </div>
  )
}
