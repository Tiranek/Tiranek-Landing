import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CtaSection() {
  return (
    <section className="py-28 px-6 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-xs font-bold text-green-vivid uppercase tracking-widest mb-4">
          Get Started Today
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-5 tracking-tight leading-tight">
          Ready to Get Started?
        </h2>
        <p className="text-base text-white/60 mb-10 max-w-md mx-auto">
          Join thousands of sports enthusiasts booking their perfect game time
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-green-vivid text-navy rounded-2xl font-bold text-sm hover:bg-white transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-green-vivid/20"
        >
          Contact Us
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
