/**
 * @file Logout Page
 * @description Handles user logout
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        const handleLogout = async () => {
            const supabase = createClient()
            await supabase.auth.signOut()
            router.push('/login')
            router.refresh()
        }

        handleLogout()
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Logging out...</p>
        </div>
    )
}
