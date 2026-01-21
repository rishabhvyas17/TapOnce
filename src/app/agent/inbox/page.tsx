/**
 * @file Agent Inbox Page
 * @description Notifications and updates for agents
 * 
 * @owner Dev 2
 */

import { Bell, CheckCircle, AlertTriangle, Info, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'

const notifications = [
    {
        id: 1,
        title: 'Order Approved!',
        description: 'Order #1002 for Priya Singh has been approved by admin.',
        time: '30 mins ago',
        type: 'success',
        read: false
    },
    {
        id: 2,
        title: 'Payout Processed',
        description: 'Your payout of ₹2,300 has been credited to your bank account.',
        time: '2 hours ago',
        type: 'success',
        read: false
    },
    {
        id: 3,
        title: 'New Commission Rate',
        description: 'Your commission rate for "Premium Gold" cards has been updated.',
        time: '1 day ago',
        type: 'info',
        read: true
    },
    {
        id: 4,
        title: 'Network Bonus',
        description: 'You earned ₹150 override commission from sub-agent sales!',
        time: '2 days ago',
        type: 'bonus',
        read: true
    }
]

export default function AgentInboxPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Inbox</h1>
                    <p className="text-muted-foreground">Your notifications and updates</p>
                </div>
                <Button variant="outline">Mark all as read</Button>
            </div>

            <div className="bg-white rounded-xl border divide-y">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-green-50/50' : ''}`}
                    >
                        <div className={`mt-1 p-2 rounded-full h-fit
                            ${notification.type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                            ${notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : ''}
                            ${notification.type === 'success' ? 'bg-green-100 text-green-600' : ''}
                            ${notification.type === 'bonus' ? 'bg-purple-100 text-purple-600' : ''}
                        `}>
                            {notification.type === 'info' && <Info className="w-5 h-5" />}
                            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                            {notification.type === 'bonus' && <Gift className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                    {notification.title}
                                </h3>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
