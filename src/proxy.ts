import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isLocalOrPrivateHost(hostname: string): boolean {
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname.endsWith('.local')
  ) {
    return true;
  }
  // Private IPv4 ranges (e.g., 10.x.x.x, 172.16-31.x.x, 192.168.x.x)
  if (/^10\./.test(hostname)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(hostname)) return true;
  if (/^192\.168\./.test(hostname)) return true;
  return false;
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const isLocal = isLocalOrPrivateHost(nextUrl.hostname);
  const proto = request.headers.get('x-forwarded-proto') || (nextUrl.protocol ? nextUrl.protocol.replace(':', '') : 'http');
  const isHttps = proto === 'https';

  // Force HTTPS in production for live domains (skip localhost/127.0.0.1 and local LAN testing)
  if (process.env.NODE_ENV === 'production' && !isHttps && !isLocal) {
    const httpsUrl = nextUrl.clone();
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, 308);
  }

  const response = NextResponse.next();

  if (isLocal) {
    // Clear any previously cached HSTS for local development / testing
    response.headers.set('Strict-Transport-Security', 'max-age=0');
  } else if (process.env.NODE_ENV === 'production' && isHttps) {
    // Only harden transport/security policy for live production domains over HTTPS
    response.headers.set('Strict-Transport-Security', 'max-age=31536000');
    response.headers.set('Content-Security-Policy', 'upgrade-insecure-requests; block-all-mixed-content');
  }

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|images|.*\\..*).*)',
    '/',
    '/api/:path*',
  ],
};