import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-gradient-to-br from-surface-50 to-brand-blue-light/30 border-t border-border">
      <div className="container-pub py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-soft" style={{ background: "linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-display font-bold text-base text-text-primary">Pristine Pro</p>
                <p className="text-[10px] text-text-muted">Powered by CleanOps AI</p>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Professional, vetted cleaning services for homes and businesses across Toronto and the GTA.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue-dark hover:bg-brand-blue hover:text-white transition-all">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue-dark hover:bg-brand-blue hover:text-white transition-all">
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Services</p>
            <div className="space-y-2">
              {[["Standard Clean","STANDARD"],["Deep Clean","DEEP_CLEAN"],["Move-In / Move-Out","MOVE_IN_OUT"],["Office Clean","OFFICE"],["Post-Construction","POST_CONSTRUCTION"],["Airbnb Turnover","AIRBNB"]].map(([label, id]) => (
                <Link key={id} href={`/book?service=${id}`} className="block text-sm text-text-secondary hover:text-brand-blue-dark transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Company</p>
            <div className="space-y-2">
              {[["About Us","/about"],["Our Results","/results"],["Contact","/contact"],["Book a Clean","/book"],["Sign In","/login"],["Create Account","/register"]].map(([label, href]) => (
                <Link key={href} href={href} className="block text-sm text-text-secondary hover:text-brand-blue-dark transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">Contact</p>
            <div className="space-y-3">
              <a href="tel:4165550100" className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-brand-blue-dark transition-colors">
                <div className="w-7 h-7 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                  <Phone className="w-3 h-3 text-brand-blue-dark" />
                </div>
                (416) 555-0100
              </a>
              <a href="mailto:info@pristinepro.ca" className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-brand-blue-dark transition-colors">
                <div className="w-7 h-7 rounded-full bg-brand-blue-light flex items-center justify-center shrink-0">
                  <Mail className="w-3 h-3 text-brand-blue-dark" />
                </div>
                info@pristinepro.ca
              </a>
              <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                <div className="w-7 h-7 rounded-full bg-brand-pink-light flex items-center justify-center shrink-0">
                  <MapPin className="w-3 h-3 text-brand-pink-dark" />
                </div>
                Toronto &amp; GTA, Ontario
              </div>
              <div className="pt-2">
                <p className="text-xs font-semibold text-text-primary mb-1">Hours</p>
                <p className="text-xs text-text-muted">Mon–Sat: 9:00am – 6:00pm</p>
                <p className="text-xs text-text-muted">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">© 2024 Pristine Pro Cleaning. All rights reserved.</p>
          <p className="text-xs text-text-muted">
            Powered by <span className="text-brand-blue-dark font-semibold">CleanOps AI</span> · Crafted by <span className="text-brand-blue-dark font-semibold">Web Alchemist Labs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
