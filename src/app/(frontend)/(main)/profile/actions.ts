'use server'

import { signOut } from '@/lib/auth-helpers'
import { redirect } from 'next/navigation'

/**
 * Server action to handle user sign out
 * Clears the session and redirects to home page
 */
export async function handleSignOut() {
  await signOut()
  redirect('/')
}
