/**
 * @file Login Page
 * @description Shared login page for all user roles
 * 
 * @owner All Developers
 * @shared Core auth page
 * 
 * After login, users are redirected based on their role:
 * - Admin → /admin
 * - Agent → /agent  
 * - Customer → /dashboard
 */

import { Suspense } from 'react'
import LoginContent from './login-content'

function LoadingFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-gray-500">Loading...</div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <LoginContent />
        </Suspense>
    )
}
