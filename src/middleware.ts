import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// todo: clean this file up

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that need authentication
  const protectedPaths = ["/generate"];

  // Check if the current path needs authentication
  const isProtectedPath = protectedPaths.some((p) => path.startsWith(p));

  if (isProtectedPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = new URL("/signin", request.url);
      url.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(url);
    }
  }

  // Get the origin from the request headers
  const origin = request.headers.get('origin') || '';

  // Handle OPTIONS request for CORS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Get response from endpoint
  const response = NextResponse.next();

  // Add CORS headers to response
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/generate/:path*",
    "/api/:path*",
  ],
};
