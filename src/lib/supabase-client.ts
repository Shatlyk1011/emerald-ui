import { createBrowserClient } from '@supabase/ssr'

/**
 * Create a Supabase client for client-side authentication
 * Used in Client Components for auth operations
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
