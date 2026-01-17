/**
 * @file Application Providers
 * @description Context providers for the entire application
 * 
 * @owner All Developers
 * @shared Core providers
 * 
 * Add providers here:
 * - Theme provider (for dark mode)
 * - Toast provider (for notifications)
 * - Auth provider (for user context)
 */

'use client'

import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/toaster'

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <>
            {children}
            <Toaster />
        </>
    )
}
