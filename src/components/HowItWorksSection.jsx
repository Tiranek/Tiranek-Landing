import { ArrowRight, Bell, MapPin, Users } from "lucide-react"

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-green uppercase tracking-widest mb-3">
            How it Works
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4 tracking-tight">
            Seamless Integration
          </h2>
          <p className="text-base text-muted max-w-xl mx-auto">
            Our WhatsApp Bot allows you to book fields through simple conversations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="bg-cream rounded-3xl border border-border p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-black">1</span>
              </div>
              <h3 className="text-base font-bold text-navy">WhatsApp Initiation</h3>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6 flex-1 flex flex-col justify-center gap-6">
              <div className="flex items-start gap-4 flex-row-reverse">
                <div className="w-9 h-9 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <div className="text-xs font-semibold text-muted mb-1.5">You</div>
                  <div className="bg-navy text-white px-4 py-3 rounded-2xl rounded-tr-none inline-block text-sm">
                    <p>Hello, I'd like to book a field.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-green rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">WH</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-muted mb-1.5">Field Auto Reply</div>
                  <div className="bg-green-light px-4 py-3 rounded-2xl rounded-tl-none text-sm border border-green-mid/30">
                    <p className="text-navy mb-3">
                      Hello! 👋 To book our fields quickly and securely, please use our automated
                      assistant:
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-green-dark text-xs font-bold border border-green-mid hover:bg-green-light transition-colors group"
                    >
                      <span>tiranek.com/bot</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cream rounded-3xl border border-border p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-black">2</span>
              </div>
              <h3 className="text-base font-bold text-navy">Tiranek Assistant</h3>
            </div>
            <div className="bg-white rounded-2xl border border-border p-5 flex-1 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-green-light p-3 rounded-2xl rounded-tl-none text-sm border border-green-mid/20">
                    <p className="text-navy font-medium mb-2">Please select a city:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-green text-white px-3 py-1 rounded-lg text-xs font-bold">
                        Casablanca ✓
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-green-light p-3 rounded-2xl rounded-tl-none text-sm border border-green-mid/20">
                    <p className="text-navy font-medium mb-2">Select a field:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-green text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Oasis Pitch ✓
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-green-light p-3 rounded-2xl rounded-tl-none text-sm border border-green-mid/20">
                    <p className="text-navy font-medium mb-2">Available hours today:</p>
                    <div className="flex gap-2 flex-wrap">
                      {["18:00", "20:00", "21:00", "22:00", "23:00", "00:00"].map((time) => (
                        <span
                          key={time}
                          className="bg-white text-navy px-3 py-1.5 rounded-lg text-xs font-semibold border border-green-mid"
                        >
                          {time}
                        </span>
                      ))}
                      <span className="bg-green text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                        19:00 ✓
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-green-light p-4 rounded-2xl rounded-tl-none text-sm border border-green-mid/20">
                    <p className="text-navy font-medium mb-3">Booking ready! Here is your invoice:</p>
                    <div className="bg-white p-3 rounded-xl border border-border">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-muted text-xs">Field</span>
                        <span className="font-semibold text-navy text-xs">Oasis Pitch</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-muted text-xs">Time</span>
                        <span className="font-semibold text-navy text-xs">19:00 - 20:00</span>
                      </div>
                      <div className="h-px bg-border w-full mb-2"></div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-navy text-sm">Total</span>
                        <span className="font-bold text-green-dark text-sm">250 DH</span>
                      </div>
                      <button className="w-full bg-navy hover:bg-green-dark text-white text-xs font-bold py-2.5 rounded-lg transition-colors duration-200">
                        Pay Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
