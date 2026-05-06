import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'http';

  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production' && protocol === 'http') {
    return NextResponse.redirect(`https://${host}${request.nextUrl.pathname}${request.nextUrl.search}`, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
