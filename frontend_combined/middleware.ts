import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Define the paths that require authentication
  const protectedPaths = ['/admin','/customer'];

  // Check if the request path matches any of the protected paths
  const matchedPath = protectedPaths.find((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (matchedPath) {
    // Check if the user is authenticated
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      // Redirect to the sign-in page if the user is not authenticated
      const url = new URL('/', request.url);
      url.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(url);
    }
  }

  // Proceed to the next middleware or route handler if authenticated or not a protected path
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*','/customer/:path*'], // Protect all routes under /admin/:path*
};