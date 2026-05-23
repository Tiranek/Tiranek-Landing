const StarRating = () => (
  <div className="flex text-yellow-400 mb-5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

export default function TestimonialsSection() {
  return (
    <section className="py-28 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-green uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4 tracking-tight">
            Loved by Players & Managers
          </h2>
          <p className="text-base text-muted max-w-xl mx-auto">
            Don't just take our word for it. Here's what our community has to say about Tiranek.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-border hover:border-green-mid hover:shadow-lg transition-all duration-300 flex flex-col">
            <StarRating />
            <p className="text-navy/80 text-sm leading-relaxed mb-6 flex-1">
              "Tiranek completely changed how our team organizes matches. What used to take hours
              of calling around now takes 2 minutes on WhatsApp."
            </p>
            <div className="flex items-center gap-3 pt-5 border-t border-border">
              <div className="w-10 h-10 bg-green-light rounded-full flex items-center justify-center text-green-dark font-black text-sm">
                B
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Badr C.</h4>
                <p className="text-xs text-muted">Amateur Team Captain</p>
              </div>
            </div>
          </div>

          <div className="bg-navy p-8 rounded-2xl border border-navy hover:shadow-lg transition-all duration-300 flex flex-col">
            <StarRating />
            <p className="text-white/80 text-sm leading-relaxed mb-6 flex-1">
              "As a field owner, I've seen a 40% increase in bookings since joining Tiranek. The
              automated WhatsApp booking is a game-changer for my business."
            </p>
            <div className="flex items-center gap-3 pt-5 border-t border-white/10">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-black text-sm">
                K
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Karim A.</h4>
                <p className="text-xs text-white/50">Sports Complex Manager</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-border hover:border-green-mid hover:shadow-lg transition-all duration-300 flex flex-col">
            <StarRating />
            <p className="text-navy/80 text-sm leading-relaxed mb-6 flex-1">
              "The real time availability feature saves so much time. I can find an open pitch on
              Friday night instantly, without the usual hassle."
            </p>
            <div className="flex items-center gap-3 pt-5 border-t border-border">
              <div className="w-10 h-10 bg-gradient-to-br from-green to-green-dark rounded-full flex items-center justify-center text-white font-black text-sm">
                S
              </div>
              <div>
                <h4 className="text-sm font-bold text-navy">Sara B.</h4>
                <p className="text-xs text-muted">Football Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
