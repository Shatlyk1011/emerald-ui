import { useUserContext } from '@/components/_providers/user-provider'




/**
 * Custom hook for managing user authentication state on the client
 * Consumes UserContext provided by UserProvider
 */
export function useUser() {
  return useUserContext()
}
