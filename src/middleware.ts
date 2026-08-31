import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login';
  const isAdminPath = path.startsWith('/admin');

  const token = request.cookies.get('admin_token')?.value || '';

  let isValid = false;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
      const { payload } = await jwtVerify(token, secret);
      if (payload.adminId && payload.role === 'ADMIN') {
        isValid = true;
      }
    } catch (err) {
      isValid = false;
    }
  }

  if (isAdminPath && !isValid) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isPublicPath && isValid) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
    '/login'
  ],
};
