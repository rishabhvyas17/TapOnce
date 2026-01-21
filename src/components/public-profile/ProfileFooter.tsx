"use client"

import { motion } from "framer-motion"
import { CreditCard } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function ProfileFooter() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="py-8 px-4 pb-28 text-center"
        >
            <div className="max-w-md mx-auto space-y-4">
                {/* Get Your Card CTA */}
                <Link
                    href="/"
                    className="
                        inline-flex items-center gap-2 px-6 py-3
                        bg-white/5 border border-white/10 rounded-full
                        text-sm font-medium text-zinc-400 hover:text-white
                        hover:bg-white/10 transition-all duration-200
                    "
                >
                    <CreditCard className="w-4 h-4" />
                    <span>Get Your Own TapOnce Card</span>
                </Link>

                {/* Powered By */}
                <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-zinc-600">
                        Powered by{" "}
                        <span className="font-semibold text-zinc-500">TapOnce</span>
                    </p>
                </div>
            </div>
        </motion.footer>
    )
}
