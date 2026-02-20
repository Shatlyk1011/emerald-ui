import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';





/**
 * Middleware to refresh Supabase session
 * This ensures the user's session is kept alive across page navigations
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes - redirect to login if not authenticated
  const protectedPaths =
    process.env.NODE_ENV === 'development' ? [] : ['/result']

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !user) {
    // Store the original URL to redirect back after login
    const redirectUrl = new URL('/sign-in', request.url)
    redirectUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Auth-only routes - redirect to home if already authenticated
  const authOnlyPaths = ['/sign-in', '/sign-up']
  const isAuthOnlyPath = authOnlyPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isAuthOnlyPath && user) {
    const next = request.nextUrl.searchParams.get('next') || '/'
    return NextResponse.redirect(new URL(next, request.url))
  }
  return supabaseResponse
}
