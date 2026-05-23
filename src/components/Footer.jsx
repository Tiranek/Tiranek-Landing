export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <span className="text-green-vivid font-black text-sm">T</span>
              </div>
              <span className="text-lg font-black text-navy tracking-tight">Tiranek</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Making sports field booking simple and accessible for everyone.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted hover:text-navy transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-navy transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-navy transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted hover:text-navy transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-navy transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-navy transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted hover:text-navy transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-navy transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-muted hover:text-navy transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">© 2024 Tiranek. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-vivid"></div>
            <p className="text-xs text-muted">All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
