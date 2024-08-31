import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("Middleware is running"); // This should appear in the console

    const authData = request.cookies.get('authData')?.value; // Ensure we're getting the cookie value

    if (!authData) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    let userData;

    try {
        userData = JSON.parse(authData);
    } catch (error) {
        console.error('Failed to parse authData:', error);
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/user') && userData.role === "user") {
        return NextResponse.next();
    } 
    if (request.nextUrl.pathname.startsWith('/admin') && userData.role === "admin") {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/auth/signin', request.url));
}

export const config = {
    matcher: ['/user/:path*', '/admin/:path*'],
};
