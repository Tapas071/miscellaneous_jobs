import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hasSessionCookie = request.cookies.has("better-auth.session_token") ||
    request.cookies.has("__Secure-better-auth.session_token");

  // This is an early navigation check only. Protected server pages/actions still
  // validate the session with Better Auth before returning or changing data.
  if (!hasSessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackURL", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};