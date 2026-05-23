import { ArrowRight, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50+", label: "Sports Fields" },
  { value: "25K+", label: "Bookings Made" },
  { value: "4.9/5", label: "User Rating" },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-hidden bg-white">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-green-light to-transparent opacity-60 pointer-events-none blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-green-light/50 to-transparent opacity-50 pointer-events-none blur-2xl"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-light border border-green-mid/40 rounded-full mb-8 w-fit animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-vivid opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-vivid"></span>
            </span>
            <span className="text-xs font-bold text-green-dark tracking-widest uppercase">
              Revolutionizing Sports Field Booking
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-6 animate-fade-up-delay-1 leading-[1.05] tracking-tight max-w-4xl">
            Book Your Perfect <span className="text-green">Sports Field</span>
          </h1>

          <p className="text-base md:text-lg text-muted leading-relaxed mb-10 max-w-xl animate-fade-up-delay-2">
            The easiest way to reserve sports fields. Find, book, and manage your game time with
            just a few taps.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 animate-fade-up-delay-3 mb-16">
            {/* <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-navy text-white text-sm font-bold rounded-2xl hover:bg-green-dark transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-navy/20"
            >
              Start Booking Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link> */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="flex -space-x-2">
                {["Y", "K", "S", "A"].map((letter, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: ["#3d7a52", "#0a1628", "#4ade80", "#2a5538"][i] }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted font-medium">
                <span className="text-navy font-bold">10K+</span> players already booking
              </p>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up-delay-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute -inset-1 bg-gradient-to-b from-green-vivid/20 via-green-light/10 to-transparent rounded-[40px] blur-3xl pointer-events-none opacity-70"></div>

          <div className="relative rounded-xl md:rounded-[24px] overflow-hidden bg-white shadow-[0_20px_50px_rgba(10,22,40,0.15),0_0_0_1px_rgba(10,22,40,0.05)] border border-white/50">
            <div className="bg-gray-50/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-border/80">
              <div className="flex gap-2 w-20">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm border border-black/10"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm border border-black/10"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm border border-black/10"></div>
              </div>

              <div className="flex-1 flex justify-center">
                <div className="flex items-center justify-center gap-2 bg-white shadow-sm rounded-full px-6 py-1.5 border border-black/5 w-full max-w-sm">
                  <Shield size={12} className="text-green-vivid opacity-80" />
                  <span className="text-[11px] font-medium text-navy/70 tracking-wide font-mono mt-px">
                    tiranek.com/dashboard
                  </span>
                </div>
              </div>

              <div className="w-20"></div>
            </div>

            <div className="relative overflow-hidden bg-cream w-full">
              <Image
                src="/images/preview/preview.png"
                alt="Tiranek dashboard preview"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                priority
                quality={100}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-navy/5 rounded-b-xl md:rounded-b-[24px] pointer-events-none"></div>
            </div>
          </div>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-navy/10 rounded-[100%] blur-2xl pointer-events-none"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mt-16 rounded-2xl overflow-hidden border border-border">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center py-7 px-4 bg-white hover:bg-green-light/30 transition-colors duration-300"
            >
              <span className="text-2xl md:text-3xl font-black text-navy tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-muted uppercase tracking-widest mt-1.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
