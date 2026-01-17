/**
 * @file Next.js Middleware
 * @description Auth middleware for route protection
 * 
 * @owner Dev 1 (primary)
 * @shared Core auth infrastructure
 * 
 * PROTECTED ROUTES:
 * - /admin/* → Admin only
 * - /agent/* → Agent only
 * - /dashboard/* → Customer only
 * 
 * PUBLIC ROUTES:
 * - / → Landing page
 * - /[slug] → Public tap view
 * - /login → Login page
 * - /api/* → API routes (have their own auth)
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // Refresh session if exists
    const { data: { session } } = await supabase.auth.getSession()

    const pathname = request.nextUrl.pathname

    // Public routes - no auth required
    const publicRoutes = ['/login', '/register', '/forgot-password']
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

    // API routes handle their own auth
    if (pathname.startsWith('/api')) {
        return response
    }

    // Public tap view pages (any slug that's not a reserved path)
    const reservedPaths = ['/admin', '/agent', '/dashboard', '/login', '/register', '/api', '/_next']
    const isReservedPath = reservedPaths.some((path) => pathname.startsWith(path))

    // If not a reserved path and not root, it's a public tap view
    if (!isReservedPath && pathname !== '/') {
        return response // Allow public access to tap view pages
    }

    // Landing page is public
    if (pathname === '/') {
        return response
    }

    // If no session and trying to access protected route
    if (!session && !isPublicRoute && isReservedPath) {
        const redirectUrl = new URL('/login', request.url)
        redirectUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(redirectUrl)
    }

    // If logged in, check role-based access
    if (session) {
        // Get user profile with role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()

        const userRole = profile?.role

        // Admin routes
        if (pathname.startsWith('/admin') && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }

        // Agent routes
        if (pathname.startsWith('/agent') && userRole !== 'agent') {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }

        // Customer routes
        if (pathname.startsWith('/dashboard') && userRole !== 'customer') {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }

        // Redirect logged in users away from login page
        if (isPublicRoute) {
            const homeRoutes: Record<string, string> = {
                admin: '/admin',
                agent: '/agent',
                customer: '/dashboard',
            }
            const homeRoute = homeRoutes[userRole || 'customer'] || '/dashboard'
            return NextResponse.redirect(new URL(homeRoute, request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
