'use server'

import { redirect } from 'next/navigation'
import { signOut } from '@/lib/auth-helpers'

/**
 * Server action to handle user sign out
 * Clears the session and redirects to home page
 */
export async function handleSignOut() {
  await signOut()
  redirect('/')
}
