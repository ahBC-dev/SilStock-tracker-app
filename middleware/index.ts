import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	const path = request.nextUrl.pathname;

    // Allow public access to the home page
	if (path === "/") {
		return NextResponse.next();
	}

	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	//exclude api, static files, auth pages, and assets from middleware
	matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|assets).*)',
    ], // Specify the routes the middleware applies to
};