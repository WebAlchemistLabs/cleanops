import Link from "next/link";
import { Sparkles } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-white mt-[23px]">
      <div className="container-pub py-[44px] flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
            <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-text-primary">Pristine Pro</span>
        </Link>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            ["Services", "/services"],
            ["Results", "/results"],
            ["About", "/about"],
            ["Contact", "/contact"],
            ["Book a Clean", "/book"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-text-muted">© {new Date().getFullYear()} Pristine Pro. All rights reserved.</p>
      </div>
    </footer>
  );
}
