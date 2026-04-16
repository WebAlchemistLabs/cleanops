"use client";
import { useState } from "react";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ArrowRight, ZoomIn } from "lucide-react";
import Link from "next/link";

const RESULTS = [
  { id:1, service:"Deep Clean", city:"Toronto", before:"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80", after:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
  { id:2, service:"Standard Clean", city:"Mississauga", before:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", after:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80" },
  { id:3, service:"Move-In / Move-Out", city:"Toronto", before:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", after:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80" },
  { id:4, service:"Post-Construction", city:"Brampton", before:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", after:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { id:5, service:"Office Clean", city:"Toronto", before:"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80", after:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80" },
  { id:6, service:"Airbnb Turnover", city:"Ajax", before:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", after:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
];

export default function ResultsPage() {
  const [active, setActive] = useState<Record<number,string>>({});

  function toggle(id:number) {
    setActive(p => ({ ...p, [id]: p[id]==="after" ? "before" : "after" }));
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container-pub text-center">
          <div className="chip chip-pink inline-flex mb-5">Real Results · No Stock Photos</div>
          <h1 className="text-5xl font-display font-bold text-text-primary mb-5">
            See the <span className="text-gradient">difference</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-lg mx-auto">
            Every example shows the <strong>Before</strong> and <strong>After</strong> side-by-side so you can see exactly what our team delivers. Tap any card to switch views.
          </p>
        </div>
      </section>

      {/* Info panel */}
      <section className="py-8 bg-white border-b border-border">
        <div className="container-pub">
          <div className="pub-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background:"linear-gradient(135deg,rgba(79,195,247,0.12),rgba(244,143,177,0.08))", border:"1px solid rgba(79,195,247,0.2)" }}>
              <ZoomIn className="w-6 h-6 text-brand-blue-dark" />
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-1">Before + After · Clear, side-by-side proof</p>
              <p className="text-sm text-text-secondary">Tap any image to switch between before &amp; after. Real client results, fast professional presentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section bg-gradient-hero">
        <div className="container-pub">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESULTS.map((r) => {
              const showing = active[r.id] || "before";
              return (
                <div key={r.id} className="pub-card overflow-hidden group cursor-pointer" onClick={() => toggle(r.id)}>
                  <div className="relative" style={{ height: 260 }}>
                    <img
                      src={showing === "before" ? r.before : r.after}
                      alt={`${r.service} ${showing}`}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {/* Label */}
                    <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-soft ${showing==="before" ? "bg-brand-pink/90" : "bg-brand-blue/90"}`}>
                      {showing === "before" ? "Before" : "After"}
                    </div>
                    {/* Toggle hint */}
                    <div className="absolute bottom-3 right-3 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs font-medium text-text-secondary flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3 h-3" /> Tap to switch
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{r.service}</p>
                        <p className="text-xs text-text-muted mt-0.5">{r.city}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={e=>{e.stopPropagation();setActive(p=>({...p,[r.id]:"before"}));}} className={`w-14 py-1 rounded-full text-[10px] font-semibold transition-all border ${showing==="before"?"bg-brand-pink/10 border-brand-pink/40 text-brand-pink-dark":"border-border text-text-muted hover:border-brand-pink/30"}`}>Before</button>
                        <button onClick={e=>{e.stopPropagation();setActive(p=>({...p,[r.id]:"after"}));}} className={`w-14 py-1 rounded-full text-[10px] font-semibold transition-all border ${showing==="after"?"bg-brand-blue/10 border-brand-blue/40 text-brand-blue-dark":"border-border text-text-muted hover:border-brand-blue/30"}`}>After</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
      <PublicFooter />
    </div>
  );
}
