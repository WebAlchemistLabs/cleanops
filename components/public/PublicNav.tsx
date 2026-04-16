"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function PublicNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top info bar */}
      <div className="bg-gradient-to-r from-brand-blue-light to-brand-pink-light border-b border-brand-blue/20 py-2 px-6 text-center text-xs text-text-secondary hidden sm:block">
        <span className="font-medium">Hours:</span> Mon–Sat 9AM–6PM &nbsp;•&nbsp;
        <span className="font-medium">Call:</span>{" "}
        <a href="tel:4165550100" className="text-brand-blue-dark font-semibold hover:underline">(416) 555-0100</a>
        &nbsp;•&nbsp;
        <span className="font-medium text-brand-pink-dark">Female-owned &amp; operated</span>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container-pub flex items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mr-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-soft" style={{ background: "linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
              <Sparkles className="w-4.5 h-4.5 w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-display font-bold text-base text-text-primary leading-none">Pristine Pro</p>
              <p className="text-[10px] text-text-muted leading-none mt-0.5">Powered by CleanOps AI</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "text-brand-blue-dark bg-brand-blue-light"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Sign in
            </Link>
            <Link href="/book" className="btn-primary text-sm py-2.5 px-5">
              Book a Clean
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="ml-auto md:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? "text-brand-blue-dark bg-brand-blue-light"
                    : "text-text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 space-y-2 border-t border-border mt-3">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-text-secondary">Sign in</Link>
              <Link href="/book" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center text-sm py-2.5">Book a Clean</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
