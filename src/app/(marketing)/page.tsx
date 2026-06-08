import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import FinalCTA from "@/components/landing/FinalCTA"
import HowItWorks from "@/components/landing/HowItWorks"
import SocialProofBar from "@/components/landing/SocialProofBar"
import ProblemSolution from "@/components/landing/ProblemSolution"
import ProfessionShowcase from "@/components/landing/ProfessionShowcase"
import NfcVideoDemo from "@/components/landing/NfcVideoDemo"
import ComparisonTable from "@/components/landing/ComparisonTable"
import FAQSection from "@/components/landing/FAQSection"
import ProductCollection from "@/components/showroom/ProductCollection"
import ShowroomHero from "@/components/showroom/ShowroomHero"
import TestimonialsSection from "@/components/showroom/TestimonialsSection"
import React from "react"

export default function LandingPage() {
   return (
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
         <Navbar />

         {/* 1. Hero: Interactive Portfolio Demo + Value Proposition */}
         <ShowroomHero />

         {/* 2. Social Proof: Real metrics, not fake logos */}
         <SocialProofBar />

         {/* 3. Problem/Solution: Why switch from paper? */}
         <ProblemSolution />

         {/* 4. Profession Showcase: Built for every professional */}
         <ProfessionShowcase />

         {/* 5. Product Showcase: Metal & PVC cards */}
         <ProductCollection />

         {/* 6. Video Demo: See the NFC tap in action */}
         <NfcVideoDemo />

         {/* 7. How It Works: 3 simple steps */}
         <HowItWorks />

         {/* 8. Comparison: Paper vs TapOnce table */}
         <ComparisonTable />

         {/* 9. Testimonials: Real professional reviews */}
         <TestimonialsSection />

         {/* 10. FAQ: Address objections + SEO rich snippets */}
         <FAQSection />

         {/* 11. Final CTA: Strong close with dual pricing */}
         <FinalCTA />

         <Footer />
      </main>
   )
}
