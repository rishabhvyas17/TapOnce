"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import React, { useState } from "react"

const faqs = [
    {
        question: "What is an NFC business card and how does it work?",
        answer: "An NFC (Near Field Communication) business card has a tiny chip embedded inside it. When you hold the card against any modern smartphone, the chip transmits a signal that opens your personalized digital portfolio — containing your contact details, social media links, portfolio, appointment booking, and more. No app is needed on either end."
    },
    {
        question: "Does it work with both iPhone and Android?",
        answer: "Yes. TapOnce cards work natively on all iPhones (XR and later) and virtually all Android phones with NFC. The receiver doesn't need to install any app — your portfolio opens directly in their browser when they tap."
    },
    {
        question: "Do I need to download an app to use it?",
        answer: "No. There's no app required — not for you, and not for the person tapping your card. Everything runs through a web-based portfolio. You manage your profile through our online dashboard."
    },
    {
        question: "What is included in the personalized digital portfolio?",
        answer: "Your TapOnce portfolio includes: your name, photo, and title; a one-tap 'Save Contact' button; phone, email, and WhatsApp links; social media profiles (LinkedIn, Instagram, Twitter, etc.); website and portfolio links; appointment/meeting booking integration; and a custom QR code backup. You can update everything anytime for free."
    },
    {
        question: "Can I update my information after ordering?",
        answer: "Absolutely. One of the biggest advantages of TapOnce is that your digital portfolio is fully editable — forever. Changed your phone number, switched companies, updated your portfolio? Just log in and update. The same physical card will now show your new information."
    },
    {
        question: "What's the difference between the Metal and PVC card?",
        answer: "The Metal Card (₹1,500) is made from laser-engraved matte black stainless steel — it's heavier, premium, and makes a statement. The PVC Card (₹1,000) supports full-color edge-to-edge printing, making it perfect for teams who need brand-consistent cards with logos and custom designs. Both include the same NFC chip and digital portfolio."
    },
    {
        question: "How long does shipping take?",
        answer: "We ship within 3-5 business days across India. Shipping is completely free on all orders. We also offer Cash on Delivery (COD) so you can pay when you receive your card."
    },
    {
        question: "Is there a warranty on the NFC chip?",
        answer: "Yes. Every TapOnce card comes with a lifetime warranty on the NFC chip. The chip has no battery and uses passive NFC technology, meaning it can function for decades without degradation."
    },
    {
        question: "Can I use this for my entire team or company?",
        answer: "Yes. Our PVC cards are especially popular for teams. You can order multiple cards with consistent branding, and each team member gets their own personalized portfolio. Contact us for bulk pricing and team management features."
    },
    {
        question: "What if someone's phone doesn't have NFC?",
        answer: "Every TapOnce card also includes a QR code on the back as a backup. If someone's phone doesn't support NFC (rare with modern phones), they can simply scan the QR code with their camera to access your portfolio."
    },
]

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border-b border-neutral-200/80 last:border-b-0">
            <button
                type="button"
                onClick={onToggle}
                className="flex items-center justify-between w-full py-5 px-1 text-left group"
                aria-expanded={isOpen}
            >
                <span className="text-sm md:text-base font-semibold text-neutral-800 pr-8 group-hover:text-neutral-900 transition-colors">
                    {faq.question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 px-1 text-sm text-neutral-500 leading-relaxed">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    // Generate FAQ structured data
    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            }
        }))
    }

    return (
        <section id="faq" className="section-padding bg-white">
            {/* FAQ Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />

            <div className="container mx-auto px-4 max-w-3xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3"
                    >
                        FAQ
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-display-md font-display font-bold tracking-tight text-neutral-900 mb-4"
                    >
                        Frequently asked questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-500 text-base"
                    >
                        Everything you need to know about TapOnce NFC business cards.
                    </motion.p>
                </div>

                {/* FAQ Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-neutral-50 rounded-2xl border border-neutral-200/80 px-6 md:px-8"
                >
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            faq={faq}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
