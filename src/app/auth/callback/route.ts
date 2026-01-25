import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { createInitialCredits } from '@/lib/credit-helpers'
import { createClient } from '@/lib/supabase-server'

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
      // Get the authenticated user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        try {
          // Check if user already has credit history
          const payload = await getPayload({ config })
          const existingCredits = await payload.find({
            collection: 'credit-history',
            // TODO: isBlocked?
            where: { userId: { equals: user.id } },
            limit: 1,
          })

          // If new user, create initial credits
          if (existingCredits.docs.length === 0) {
            await createInitialCredits(user.id)
            console.log(`✓ Created initial credits for new user: ${user.id}`)
          }
        } catch (creditError) {
          // Log error but don't block authentication
          console.error('Error creating initial credits:', creditError)
        }
      }

      // Successful authentication - redirect to the requested page or home
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If there's an error, redirect to login with error message
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
