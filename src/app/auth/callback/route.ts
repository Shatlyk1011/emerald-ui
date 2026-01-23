import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

/**
 * OAuth callback handler
 * Exchanges the auth code for a session and redirects the user
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin
  const next = requestUrl.searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successful authentication - redirect to the requested page or home
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If there's an error, redirect to login with error message
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
