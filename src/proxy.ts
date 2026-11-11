import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  // /sitemap.xml must serve the styled sitemap index (see
  // src/app/sitemap-index.xml/route.ts for why the rewrite exists).
  if (request.nextUrl.pathname === '/sitemap.xml') {
    return NextResponse.rewrite(new URL('/sitemap-index.xml', request.url))
  }
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
