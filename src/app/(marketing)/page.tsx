import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import Advantages from "@/components/landing/Advantages"
import ComparisonTable from "@/components/landing/ComparisonTable"
import FinalCTA from "@/components/landing/FinalCTA"
import HowItWorks from "@/components/landing/HowItWorks"
import PrideSection from "@/components/landing/PrideSection"
import TrustedBy from "@/components/landing/TrustedBy"
import ProductCollection from "@/components/showroom/ProductCollection"
import ShowroomHero from "@/components/showroom/ShowroomHero"
import StickyMobileCTA from "@/components/showroom/StickyMobileCTA"
import TemplateShowcase from "@/components/showroom/TemplateShowcase"
import TestimonialsSection from "@/components/showroom/TestimonialsSection"
import React from "react"

export default function LandingPage() {
   return (
      <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
         <Navbar />

         {/* 1. Hero: First Impression */}
         <ShowroomHero />

         {/* 2. Trust Signal */}
         <TrustedBy />

         {/* 3. How It Works: 3-Step Process */}
         <HowItWorks />

         {/* 4. Advantages: Why TapOnce */}
         <Advantages />

         {/* 5. Template Showcase: Visual Gallery */}
         <TemplateShowcase />

         {/* 6. Product Materials */}
         <ProductCollection />

         {/* 7. Comparison: Paper vs TapOnce */}
         <ComparisonTable />

         {/* 8. Social Proof */}
         <TestimonialsSection />

         {/* 9. Pride/FOMO Section */}
         <PrideSection />

         {/* 10. Final CTA */}
         <FinalCTA />

         <Footer />

         {/* Mobile Sticky CTA */}
         <StickyMobileCTA />
      </main>
   )
}

