import { CheckCircle } from "lucide-react"

const partners = [
  "Partner One",
  "Partner Two",
  "Partner Three",
  "Partner Four",
  "Partner Five",
  "Partner Six",
]

export default function PartnerTicker() {
  return (
    <section className="py-10 bg-navy overflow-hidden">
      <div className="ticker-wrapper relative">
        <div className="flex gap-16 animate-ticker-smooth whitespace-nowrap">
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-green-vivid flex-shrink-0" />
              <span className="text-sm font-semibold text-white/70">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
