/**
 * @file Order Success Page
 * @description Wrapper with Suspense for order success content
 */

import { Suspense } from 'react'
import OrderSuccessContent from './order-success-content'

function LoadingFallback() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
        </div>
    )
}

export default function OrderSuccessPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Suspense fallback={<LoadingFallback />}>
                <OrderSuccessContent />
            </Suspense>
        </main>
    )
}
