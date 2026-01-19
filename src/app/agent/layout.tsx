/**
 * @file Agent Layout
 * @description Layout wrapper for all agent pages with sidebar
 * 
 * @owner Dev 2
 * @module agent
 */

'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Wallet,
    HelpCircle,
    LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigationItems = [
    { href: '/agent', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/agent/orders/new', label: 'Submit Order', icon: ShoppingCart },
    { href: '/agent/orders', label: 'My Orders', icon: Package },
    { href: '/agent/catalog', label: 'Card Catalog', icon: Package },
    { href: '/agent/network', label: 'My Network', icon: Users },
    { href: '/agent/payouts', label: 'Payouts', icon: Wallet },
]

export default function AgentLayout({ children }: { children: ReactNode }) {
    const router = useRouter()

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex md:flex-col">
                {/* Logo */}
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-green-600">TapOnce</h2>
                    <p className="text-xs text-muted-foreground">Agent Portal</p>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 flex-1">
                    {navigationItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <item.icon className="w-5 h-5 text-gray-500" />
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Bottom Section - Logout */}
                <div className="p-4 border-t">
                    <a
                        href="/agent/help"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        <HelpCircle className="w-5 h-5 text-gray-500" />
                        Help & Training
                    </a>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-2"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-lg font-semibold md:hidden">TapOnce</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Notification Bell */}
                        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        {/* Logout Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </header>

                {/* Page content */}
                <div className="flex-1 p-6 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
