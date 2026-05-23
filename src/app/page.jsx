import CtaSection from "@/components/CtaSection"
import FeaturesSection from "@/components/FeaturesSection"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import Navbar from "@/components/Navbar"
import PartnerTicker from "@/components/PartnerTicker"
import TestimonialsSection from "@/components/TestimonialsSection"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <HeroSection />
      <PartnerTicker />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
