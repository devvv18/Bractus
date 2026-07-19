import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // 1. Check if the user is visiting support.bractus.com
  if (hostname.includes('support.bractus.com')) {
    // If the path doesn't already start with /individual-support, rewrite it internally
    if (!url.pathname.startsWith('/individual-support')) {
      url.pathname = `/individual-support${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  // 2. Check if the user is visiting service.bractus.com
  if (hostname.includes('service.bractus.com')) {
    // If the path doesn't already start with /organisation-service, rewrite it internally
    if (!url.pathname.startsWith('/organisation-service')) {
      url.pathname = `/organisation-service${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

// Config to specify which paths the middleware runs on
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
