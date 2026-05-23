import { Calendar, Clock, MapPin, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Book your sports field in seconds with our intelligent booking system",
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Get insights into your booking patterns and field usage statistics",
  },
  {
    icon: Clock,
    title: "Real time Availability",
    description: "Check field availability instantly and get notified of cancellations",
  },
  {
    icon: MapPin,
    title: "Location Finder",
    description: "Discover and book sports fields near you with integrated maps",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-bold text-green uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy tracking-tight leading-tight">
              Everything You Need
            </h2>
          </div>
          <p className="text-base text-muted max-w-sm leading-relaxed md:text-right">
            Powerful features designed to make sports field booking seamless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group p-7 bg-white rounded-2xl border border-border hover:border-green-mid cursor-default"
            >
              <div className="w-11 h-11 bg-navy group-hover:bg-green-dark rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold text-navy mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
