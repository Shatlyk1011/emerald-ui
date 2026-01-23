import { createClient } from '@/lib/supabase-server'

/**
 * Get the current authenticated user from the server
 * Use this in Server Components and Server Actions
 */
export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Get the current session from the server
 * Use this in Server Components and Server Actions
 */
export async function getSession() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

/**
 * Sign out the current user
 * Use this in Server Actions
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
