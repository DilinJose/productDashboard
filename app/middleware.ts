import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for access token in cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  
  // Also check Authorization header as fallback
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const token = accessToken || tokenFromHeader;

  // If no token found, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    // Preserve the original URL to redirect back after login
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    // Add other protected routes here
    // "/profile/:path*",
    // "/settings/:path*",
  ],
};

