"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ArrowRight, Clock, CheckCircle, X } from "lucide-react";
import { SERVICE_LABELS, SERVICE_DESCRIPTIONS, SERVICE_PRICES, SERVICE_DURATION, SERVICE_IMAGES, SERVICE_COLORS } from "@/lib/utils";

const SERVICES = Object.entries(SERVICE_LABELS).map(([id, name]) => ({
  id, name,
  desc: SERVICE_DESCRIPTIONS[id],
  price: SERVICE_PRICES[id],
  duration: SERVICE_DURATION[id],
  image: SERVICE_IMAGES[id],
  color: SERVICE_COLORS[id],
}));

const INCLUDES: Record<string, string[]> = {
  STANDARD: ["Vacuuming all floors","Mopping hard floors","Dusting surfaces","Kitchen surfaces & sink","Bathroom scrub & sanitize","Mirrors & glass"],
  DEEP_CLEAN: ["Everything in Standard","Inside oven & fridge","Inside cabinets","Baseboards & trim","Window sills & tracks","Behind appliances","Light fixtures & fans"],
  MOVE_IN_OUT: ["Everything in Deep Clean","Inside all closets","Inside dishwasher","Garage sweep (if applicable)","Final walkthrough inspection","Landlord ready standard"],
  OFFICE: ["Vacuuming & mopping","Desk and surface wipe down","Washroom sanitize","Kitchen area clean","Trash removal","After hours scheduling"],
  POST_CONSTRUCTION: ["Dust removal (all surfaces)","Debris sweeping","Window & glass cleaning","Floor scrubbing","Vent cleaning","Final inspection"],
  AIRBNB: ["Full clean & sanitize","Linen swap and bed making","Bathroom restock","Kitchen reset","Trash removal","Guest ready inspection"],
};

export default function ServicesPage() {
  const [activeImage, setActiveImage] = useState<{ src: string; name: string } | null>(null);

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage]);

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container-pub text-center">
          <div className="chip chip-blue inline-flex mb-5">Our Services</div>
          <h1 className="text-5xl font-display font-bold text-text-primary mb-5">Everything we clean</h1>
          <p className="text-xl text-text-secondary max-w-lg mx-auto mb-8">Residential and commercial cleaning services across Toronto and the GTA, vetted crews, guaranteed results.</p>
          <Link href="/book" className="btn-primary text-base">Book Any Service <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* Services detail */}
      <section className="section bg-white">
        <div className="container-pub space-y-16">
          {SERVICES.map((s, i) => (
            <div key={s.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`} style={{ flexDirection: i % 2 === 1 ? "row-reverse" : "row" }}>
              {/* Image */}
              <button
                type="button"
                onClick={() => setActiveImage({ src: s.image, name: s.name })}
                className={`relative rounded-3xl overflow-hidden shadow-card-hover text-left w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                style={{ height: 360 }}
                aria-label={`Open larger photo for ${s.name}`}
              >
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(79,195,247,0.1),rgba(244,143,177,0.08))" }} />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/95 rounded-xl px-4 py-2 shadow-soft">
                    <p className="text-xl font-display font-bold text-text-primary">{s.price}</p>
                    <p className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{s.duration}</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/55 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Click to enlarge
                </div>
              </button>
              {/* Content */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="chip chip-pink inline-flex mb-4">{s.name}</div>
                <h2 className="text-3xl font-display font-bold text-text-primary mb-4">{s.name}</h2>
                <p className="text-text-secondary leading-relaxed mb-6 text-lg">{s.desc}</p>
                <div className="mb-7">
                  <p className="text-sm font-semibold text-text-primary mb-3">What&apos;s included:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(INCLUDES[s.id] || []).map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-blue-dark shrink-0" />{item}
                      </div>
                    ))}
                  </div>
                </div>
                <Link href={`/book?service=${s.id}`} className="btn-primary">
                  Book {s.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={`${activeImage.name} image preview`}>
          <button
            type="button"
            aria-label="Close image preview"
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            onClick={() => setActiveImage(null)}
          />
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] border border-white/30">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-white/95">
              <p className="font-display font-semibold text-text-primary">{activeImage.name}</p>
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
                alt={`${activeImage.name} enlarged preview`}
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
