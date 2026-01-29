/**
 * @file Claim Account Page
 * @description Allows customers to set their password and activate their TapOnce account
 * 
 * @owner Dev 1
 */

import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import ClaimAccountContent from './claim-account-content'

function LoadingFallback() {
    return (
        <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-violet-400 mx-auto mb-4" />
                <p className="text-zinc-400">Loading...</p>
            </div>
        </main>
    )
}

export default function ClaimAccountPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ClaimAccountContent />
        </Suspense>
    )
}
