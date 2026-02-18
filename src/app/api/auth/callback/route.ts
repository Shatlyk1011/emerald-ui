import config from '@payload-config';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload'
import { createClientRecord } from '@/lib/helpers/client-helpers'
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
          // Check if client record exists
          const payload = await getPayload({ config })
          const existingClient = await payload.find({
            collection: 'clients',
            where: { userId: { equals: user.id } },
            limit: 1,
          })

          // If new user, create client record
          if (existingClient.docs.length === 0) {
            // Extract provider from user metadata
            const provider = user.app_metadata?.provider || 'email'
            const isVerified = user.email_confirmed_at != null

            await createClientRecord(
              user.id,
              user.email || undefined,
              provider as 'email' | 'google' | 'github' | null | undefined,
              isVerified
            )
            console.log(`✓ Created client record for new user: ${user.id}`)
          }
        } catch (clientError) {
          // Log error but don't block authentication
          console.error('Error creating client:', clientError)
        }
      }

      // Successful authentication - redirect to the requested page or home
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If there's an error, redirect to login with error message
  return NextResponse.redirect(`${origin}/sign-in`)
}

