/**
 * @file Agent Layout
 * @description Layout wrapper for all agent pages with sidebar
 * 
 * @owner Dev 2
 * @module agent
 */

'use client'

import { ReactNode, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Wallet,
    Bell,
    HelpCircle,
    LogOut,
    Home,
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const navigationItems = [
    { href: '/agent', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/agent/orders/new', label: 'Submit Order', icon: ShoppingCart },
    { href: '/agent/orders', label: 'My Orders', icon: Package },
    { href: '/agent/catalog', label: 'Card Catalog', icon: Package },
    { href: '/agent/network', label: 'My Network', icon: Users },
    { href: '/agent/payouts', label: 'Payouts', icon: Wallet },
    { href: '/agent/inbox', label: 'Inbox', icon: Bell },
]

export default function AgentLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    // Breadcrumb logic
    const getBreadcrumbs = () => {
        const paths = pathname.split('/').filter(Boolean)
        // paths[0] is 'agent'

        const breadcrumbs = [
            { label: 'Dashboard', href: '/agent', active: paths.length === 1 }
        ]

        if (paths.length > 1) {
            const pageName = paths[1].charAt(0).toUpperCase() + paths[1].slice(1)
            let formattedName = pageName

            // Custom naming mapping
            if (paths[1] === 'orders' && paths.length === 2) formattedName = 'My Orders'
            if (paths[1] === 'orders' && paths[2] === 'new') formattedName = 'Submit Order'
            if (paths[1] === 'catalog') formattedName = 'Card Catalog'
            if (paths[1] === 'network') formattedName = 'My Network'

            breadcrumbs.push({
                label: formattedName,
                href: `/agent/${paths[1]}`,
                active: true
            })
        }

        return breadcrumbs
    }

    const breadcrumbs = getBreadcrumbs()

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-56' : 'w-20'} bg-white border-r hidden md:flex md:flex-col shrink-0 sticky top-0 h-screen transition-all duration-300 z-30`}
            >
                {/* Logo */}
                <div className={`p-4 h-16 border-b flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
                    <h2 className={`text-xl font-bold text-green-600 transition-opacity duration-200 ${!isSidebarOpen && 'hidden opacity-0'}`}>TapOnce</h2>
                    {!isSidebarOpen && <span className="text-xl font-bold text-green-600">TO</span>}
                    <p className={`text-xs text-muted-foreground ml-2 ${!isSidebarOpen && 'hidden'}`}>Agent</p>
                </div>

                {/* Navigation */}
                <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/agent' && pathname.startsWith(item.href))
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center px-2'} py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap overflow-hidden ${isActive
                                        ? 'bg-green-50 text-green-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                title={!isSidebarOpen ? item.label : undefined}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${isSidebarOpen ? 'mr-3' : ''}`} />
                                <span className={`transition-opacity duration-200 ${!isSidebarOpen ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom Section - Help */}
                <div className="p-2 border-t">
                    <Link
                        href="/agent/help"
                        className={`flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center px-2'} py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg`}
                        title={!isSidebarOpen ? "Help & Training" : undefined}
                    >
                        <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isSidebarOpen ? 'mr-3' : ''}`} />
                        {isSidebarOpen && <span>Help & Training</span>}
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Header */}
                <header className="bg-white border-b px-4 py-4 flex justify-between items-center sticky top-0 z-20 h-16">
                    <div className="flex items-center gap-4">
                        {/* Sidebar Toggle (Desktop) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="hidden md:flex text-gray-500 hover:bg-gray-100 flex-shrink-0"
                        >
                            {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                        </Button>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Mobile Title */}
                        <h1 className="text-lg font-semibold md:hidden">TapOnce</h1>

                        {/* Breadcrumbs (Desktop) */}
                        <nav className="hidden md:flex items-center text-sm text-gray-500 overflow-x-auto no-scrollbar">
                            <Link href="/agent" className="hover:text-green-600 flex items-center gap-1">
                                <Home className="w-4 h-4" />
                            </Link>
                            {breadcrumbs.map((item) => (
                                <div key={item.href} className="flex items-center whitespace-nowrap">
                                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />
                                    {item.active ? (
                                        <span className="font-semibold text-gray-900">{item.label}</span>
                                    ) : (
                                        <Link href={item.href} className="hover:text-green-600">
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-2 pl-2">
                        {/* Logout Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 whitespace-nowrap"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </header>

                {/* Page content */}
                <div className="flex-1 p-4 md:p-6 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
