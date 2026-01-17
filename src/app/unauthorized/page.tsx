/**
 * @file Unauthorized Page
 * @description Shown when user tries to access a route they don't have permission for
 * 
 * @owner All Developers
 * @shared Core page
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300">403</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                    Access Denied
                </h2>
                <p className="text-gray-600 mt-2 max-w-md">
                    You don't have permission to access this page.
                    Please contact the administrator if you believe this is a mistake.
                </p>
                <div className="mt-8 space-x-4">
                    <Button asChild variant="default">
                        <Link href="/">Go Home</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/login">Sign In</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
