import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"));
const HowItWorksSection = dynamic(() => import("@/components/HowItWorksSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const CtaSection = dynamic(() => import("@/components/CtaSection"));
const Footer = dynamic(() => import("@/components/Footer"));

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

