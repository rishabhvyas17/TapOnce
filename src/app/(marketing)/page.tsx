import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import FinalCTA from "@/components/landing/FinalCTA"
import HowItWorks from "@/components/landing/HowItWorks"
import TrustedBy from "@/components/landing/TrustedBy"
import ProductCollection from "@/components/showroom/ProductCollection"
import ShowroomHero from "@/components/showroom/ShowroomHero"
import TestimonialsSection from "@/components/showroom/TestimonialsSection"
import React from "react"

export default function LandingPage() {
   return (
      <main className="min-h-screen bg-background text-white selection:bg-white selection:text-black overflow-x-hidden">
         <Navbar />

         {/* 1. Hero: First Impression */}
         <ShowroomHero />

         {/* 2. Trust Signal */}
         <TrustedBy />

         {/* 3. How It Works: 3-Step Process */}
         <HowItWorks />

         {/* 4. Product Showcase / Materials */}
         <ProductCollection />

         {/* 5. Testimonials: Social Proof */}
         <TestimonialsSection />

         {/* 6. Final CTA */}
         <FinalCTA />

         <Footer />
      </main>
   )
}
