import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import FinalCTA from "@/components/landing/FinalCTA"
import HowItWorks from "@/components/landing/HowItWorks"
import TrustedBy from "@/components/landing/TrustedBy"
import NfcVideoDemo from "@/components/landing/NfcVideoDemo"
import ProductCollection from "@/components/showroom/ProductCollection"
import ShowroomHero from "@/components/showroom/ShowroomHero"
import TestimonialsSection from "@/components/showroom/TestimonialsSection"
import React from "react"

export default function LandingPage() {
   return (
      <main className="min-h-screen bg-background text-slate-900 selection:bg-primary/15 selection:text-primary overflow-x-hidden">
         <Navbar />

         {/* 1. Hero: First Impression */}
         <ShowroomHero />

         {/* 2. Trust Signal */}
         <TrustedBy />

         {/* 3. Dynamic Video Demonstration */}
         <NfcVideoDemo />

         {/* 4. How It Works: 3-Step Process */}
         <HowItWorks />

         {/* 5. Product Showcase / Materials */}
         <ProductCollection />

         {/* 6. Testimonials: Social Proof */}
         <TestimonialsSection />

         {/* 7. Final CTA */}
         <FinalCTA />

         <Footer />
      </main>
   )
}
