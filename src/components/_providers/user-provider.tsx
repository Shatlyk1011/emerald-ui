'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

interface UserContextType {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  // Use a ref so the router never causes the effect to re-run
  const routerRef = useRef(router)
  useEffect(() => {
    routerRef.current = router
  })
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error fetching session:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes — only refresh on real events, not the initial
    // session hydration, to avoid an infinite refresh loop.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
      if (event !== 'INITIAL_SESSION') {
        routerRef.current.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase]) // router intentionally excluded — accessed via ref

  const signOut = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserContext.Provider value={{ user, isLoading, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
