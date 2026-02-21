import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.OTP_JWT_SECRET || 'fallback-dev-secret'
);

export async function middleware(request: NextRequest) {
  // Handle dashboard route redirects
  if (request.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect /cohort/dashboard
  if (request.nextUrl.pathname.startsWith('/cohort/dashboard')) {
    const token = request.cookies.get('cohort_session')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/cohort/login', request.url));
    }
    try {
      await jwtVerify(token, secret);
    } catch {
      const response = NextResponse.redirect(new URL('/cohort/login', request.url));
      response.cookies.delete('cohort_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/cohort/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 