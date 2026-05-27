import CustomCursor from "@/components/CustomCursor";
import CtaSection from "@/components/CtaSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      <GrainOverlay />
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
