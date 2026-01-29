import { Suspense } from 'react'
import BecomeAgentContent from './become-agent-content'

function LoadingFallback() {
    return (
        <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
            <div className="text-zinc-400">Loading...</div>
        </main>
    )
}

export default function BecomeAgentPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <BecomeAgentContent />
        </Suspense>
    )
}
