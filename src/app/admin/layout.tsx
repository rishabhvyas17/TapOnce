/**
 * @file Admin Layout
 * @description Layout wrapper for all admin pages with sidebar
 * 
 * @owner Dev 1
 * @module admin
 */

'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter()

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg flex flex-col">
                <div className="p-4">
                    <h2 className="text-xl font-bold text-blue-600">TapOnce</h2>
                    <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
                <nav className="mt-4 px-2 space-y-1 flex-1">
                    <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Dashboard
                    </a>
                    <a href="/admin/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Order Board
                    </a>
                    <a href="/admin/customers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Customers
                    </a>
                    <a href="/admin/agents" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Agents
                    </a>
                    <a href="/admin/finance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Finance
                    </a>
                    <a href="/admin/catalog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Catalog
                    </a>
                </nav>

                {/* Logout Button at Bottom */}
                <div className="p-4 border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1">
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                            <Bell className="w-5 h-5 text-gray-500" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
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
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
