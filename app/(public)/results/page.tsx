"use client";

import { useEffect, useState } from "react";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

const RESULTS = [
  { id:1, service:"Deep Clean",         city:"Toronto",     image:"https://i.pinimg.com/1200x/c9/dc/93/c9dc932eac8d752f3d765b395763f1c4.jpg" },
  { id:2, service:"Standard Clean",     city:"Mississauga", image:"https://i.pinimg.com/736x/89/e1/a9/89e1a95d3a7fc4ff9a082c03000d97cb.jpg" },
  { id:3, service:"Move-In / Move-Out", city:"Toronto",     image:"https://i.pinimg.com/1200x/e8/9a/57/e89a571f2cd224d308cee05f20585073.jpg" },
  { id:4, service:"Post-Construction",  city:"Brampton",    image:"https://i.pinimg.com/736x/a1/68/d8/a168d8b06f7d88b31c2124f3390fab9f.jpg" },
  { id:5, service:"Office Clean",       city:"Toronto",     image:"https://i.pinimg.com/1200x/84/e0/1c/84e01cd78312a169a9c747718e56004d.jpg" },
  { id:6, service:"Airbnb Turnover",    city:"Ajax",        image:"https://i.pinimg.com/1200x/99/21/2e/99212e1aba0610a0954db70768d8d343.jpg" },
];

export default function ResultsPage() {
  const [activeImage, setActiveImage] = useState<{ src: string; service: string } | null>(null);

  useEffect(() => {
    if (!activeImage) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveImage(null); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKeyDown); };
  }, [activeImage]);

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container-pub text-center">
          <div className="chip chip-pink inline-flex mb-5">Real Results</div>
          <h1 className="text-5xl font-display font-bold text-text-primary mb-5">
            See the <span className="text-gradient">difference</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-lg mx-auto">
            Every photo shows the <strong>Before</strong> and <strong>After</strong>
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section bg-gradient-hero">
        <div className="container-pub">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESULTS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveImage({ src: r.image, service: r.service })}
                className="pub-card overflow-hidden group text-left w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
                aria-label={`Open larger photo for ${r.service}`}
              >
                <div className="relative" style={{ height: 260 }}>
                  <img
                    src={r.image}
                    alt={`${r.service} before and after`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-soft bg-brand-blue/90">
                    Before &amp; After
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/55 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to enlarge
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-text-primary">{r.service}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-gradient-soft">
        <div className="container-pub text-center">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Want results like these in your home?</h2>
          <p className="text-text-secondary mb-7 max-w-sm mx-auto">Book a clean today and see the Pristine Pro difference for yourself.</p>
          <Link href="/book" className="btn-primary text-base">Book a Clean <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={`${activeImage.service} image preview`}>
          <button
            type="button"
            aria-label="Close image preview"
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            onClick={() => setActiveImage(null)}
          />
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] border border-white/30">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-white/95">
              <p className="font-display font-semibold text-text-primary">{activeImage.service}</p>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-slate-100 transition-colors"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-slate-950">
              <img
                src={activeImage.src}
                alt={`${activeImage.service} enlarged preview`}
                className="w-full max-h-[78vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
