import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  // Define protected and auth routes
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                           pathname.startsWith('/projects') || 
                           pathname.startsWith('/tasks') || 
                           pathname.startsWith('/team') || 
                           pathname.startsWith('/settings')
                           
  const isAuthRoute = pathname.startsWith('/login') || 
                      pathname.startsWith('/register')

  // 1. Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    // Optional: add a redirect parameter to return after login
    // loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 2. Redirect to dashboard if accessing auth routes with active token
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 3. Redirect root to dashboard (if logged in) or login (if not)
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
