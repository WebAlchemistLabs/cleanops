import Link from "next/link";
import Image from "next/image";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import {
  ArrowRight, CheckCircle, Star, Clock, Calendar,
  CreditCard, Sparkles, Shield, Users, Award, Phone,
} from "lucide-react";
import { SERVICE_LABELS, SERVICE_DESCRIPTIONS, SERVICE_PRICES, SERVICE_DURATION, SERVICE_IMAGES, SERVICE_COLORS } from "@/lib/utils";

const SERVICES = Object.entries(SERVICE_LABELS).map(([id, name]) => ({
  id, name,
  desc: SERVICE_DESCRIPTIONS[id],
  price: SERVICE_PRICES[id],
  duration: SERVICE_DURATION[id],
  image: SERVICE_IMAGES[id],
  color: SERVICE_COLORS[id],
}));

const REVIEWS = [
  { name: "Sarah M.", city: "Toronto", rating: 5, service: "Deep Clean", text: "Absolutely spotless! The team arrived on time, were incredibly thorough, and even cleaned areas I didn't ask for. Best cleaning service I've ever used.", avatar: "SM" },
  { name: "Chen W.", city: "Mississauga", rating: 5, service: "Office Clean", text: "We've been using Pristine Pro for our office every week for 6 months. Consistent, professional, and always done right. Highly recommend for commercial spaces.", avatar: "CW" },
  { name: "Fatima H.", city: "Ajax", rating: 5, service: "Airbnb Turnover", text: "Booking online was so easy and paying through the app is a game changer. My Airbnb guests always comment on how clean the place is.", avatar: "FH" },
];

const STEPS = [
  { n: "01", title: "Book Online", desc: "Choose your service, enter your address, pick a date. Done in 2 minutes.", icon: Calendar },
  { n: "02", title: "We Confirm", desc: "Our team reviews, assigns a crew, and sends confirmation with all details.", icon: CheckCircle },
  { n: "03", title: "We Clean", desc: "A vetted, trained crew arrives on time and delivers a thorough professional clean.", icon: Sparkles },
  { n: "04", title: "Pay Securely", desc: "Receive your invoice and pay online via Stripe. No cash, no hassle.", icon: CreditCard },
];

const TRUST = [
  { icon: Shield, label: "Fully Insured", desc: "All staff bonded and insured for your peace of mind" },
  { icon: Users, label: "Vetted Cleaners", desc: "Background-checked and trained professionals only" },
  { icon: Award, label: "5-Star Rated", desc: "4.9 average across 500+ verified reviews" },
  { icon: CheckCircle, label: "Satisfaction Guaranteed", desc: "Not happy? We come back and fix it free of charge" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-hero overflow-hidden">
        <div className="container-pub py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div className="animate-[fade-up_0.6s_ease-out_forwards]">
              <div className="chip chip-blue inline-flex mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Serving Toronto &amp; GTA · Available Now
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-text-primary leading-[1.08] mb-6">
                Professional cleaning<br />
                you can{" "}
                <span className="text-gradient">trust.</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed mb-8 max-w-lg">
                Vetted, insured cleaners across Toronto and the GTA. Book online in 2 minutes, pay securely, and come home to spotless.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                <Link href="/book" className="btn-primary text-base">
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:4165550100" className="btn-secondary text-base">
                  <Phone className="w-4 h-4" /> (416) 555-0100
                </a>
              </div>
              {/* Social proof */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="flex -space-x-2">
                  {["SM","JO","CW","FH"].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white text-[9px]" style={{ background: "linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>{i}</div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-xs text-text-muted">500+ happy customers across the GTA</p>
                </div>
              </div>
            </div>

            {/* Right — Hero image */}
            <div className="relative animate-[fade-up_0.7s_0.1s_ease-out_forwards] opacity-0">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(79,195,247,0.2)]" style={{ height: 480 }}>
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85&fit=crop"
                  alt="Professional cleaning team at work"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(79,195,247,0.1),rgba(244,143,177,0.08))" }} />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-card px-5 py-3.5 border border-border animate-float">
                <p className="text-2xl font-display font-bold text-brand-blue-dark">500+</p>
                <p className="text-xs text-text-muted mt-0.5">Happy Customers</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card px-5 py-3.5 border border-border animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-xs text-text-muted">4.9 / 5.0 rating</p>
              </div>
              <div className="absolute top-1/2 -right-8 bg-white rounded-2xl shadow-card px-4 py-3 border border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Fully Insured</p>
                    <p className="text-[10px] text-text-muted">All staff bonded</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────────────────────── */}
      <section className="bg-white border-y border-border py-10">
        <div className="container-pub">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,rgba(79,195,247,0.12),rgba(244,143,177,0.08))", border: "1px solid rgba(79,195,247,0.2)" }}>
                  <t.icon className="w-5 h-5 text-brand-blue-dark" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.label}</p>
                  <p className="text-xs text-text-muted mt-0.5 leading-snug">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="section bg-gradient-hero">
        <div className="container-pub">
          <div className="text-center mb-14">
            <div className="chip chip-pink inline-flex mb-4">Our Services</div>
            <h2 className="text-4xl font-display font-bold text-text-primary mb-4">Everything sparkling clean</h2>
            <p className="text-text-secondary max-w-lg mx-auto">Every clean delivered by a vetted, trained crew — residential and commercial, one-time or recurring</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Link
                key={s.id}
                href={`/book?service=${s.id}`}
                className="pub-card overflow-hidden group block"
              >
                {/* Service image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.9) 100%)" }} />
                  <div className="absolute top-3 left-3">
                    <div className="chip chip-blue text-xs shadow-sm">{s.price}</div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-display font-semibold text-text-primary mb-1.5">{s.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />{s.duration}
                    </div>
                    <span className="text-xs font-semibold text-brand-blue-dark group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Book now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how" className="section bg-white">
        <div className="container-pub">
          <div className="text-center mb-14">
            <div className="chip chip-blue inline-flex mb-4">How It Works</div>
            <h2 className="text-4xl font-display font-bold text-text-primary mb-4">Four simple steps</h2>
            <p className="text-text-secondary">From booking to a spotless home — we make it effortless</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.n} className="relative">
                <div className="pub-card p-6 text-center h-full">
                  <p className="text-5xl font-display font-black text-brand-blue/20 mb-4">{step.n}</p>
                  <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg,rgba(79,195,247,0.12),rgba(244,143,177,0.08))", border: "1px solid rgba(79,195,247,0.2)" }}>
                    <step.icon className="w-6 h-6 text-brand-blue-dark" />
                  </div>
                  <h3 className="text-base font-display font-semibold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 items-center">
                    <ArrowRight className="w-5 h-5 text-brand-blue/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE/AFTER RESULTS PREVIEW ─────────────────────────────── */}
      <section className="section bg-gradient-soft">
        <div className="container-pub">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="chip chip-pink inline-flex mb-5">Real Results</div>
              <h2 className="text-4xl font-display font-bold text-text-primary mb-5">See the difference we make</h2>
              <p className="text-text-secondary leading-relaxed mb-6">Every photo is a real client result — no stock photos, no filters. Just the genuine before and after of a Pristine Pro clean.</p>
              <ul className="space-y-3 mb-8">
                {["Real client photos — no stock imagery","Side-by-side before &amp; after comparison","Every service type represented","Consistent results every visit"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-brand-blue-dark shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <Link href="/results" className="btn-primary">View All Results <ArrowRight className="w-4 h-4" /></Link>
            </div>
            {/* Before/After image grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80", label: "Before", side: "before" },
                { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", label: "After", side: "after" },
                { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80", label: "Before", side: "before" },
                { src: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", label: "After", side: "after" },
              ].map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden shadow-card" style={{ height: 180 }}>
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                  <div className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-xs font-bold text-white ${img.side === "before" ? "bg-brand-pink/80" : "bg-brand-blue/80"}`}>
                    {img.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────── */}
      <section id="reviews" className="section bg-white">
        <div className="container-pub">
          <div className="text-center mb-14">
            <div className="chip chip-blue inline-flex mb-4">Reviews</div>
            <h2 className="text-4xl font-display font-bold text-text-primary mb-4">What our customers say</h2>
            <p className="text-text-secondary">Hundreds of 5-star reviews across Toronto and the GTA</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="pub-card p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-5 italic">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{r.name}</p>
                      <p className="text-xs text-text-muted">{r.city}</p>
                    </div>
                  </div>
                  <div className="chip chip-blue text-[10px]">{r.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="section-sm bg-gradient-to-r from-brand-blue-light to-brand-pink-light">
        <div className="container-pub">
          <div className="text-center">
            <h2 className="text-4xl font-display font-bold text-text-primary mb-4">Ready for a spotless home?</h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto text-lg">Book your clean in 2 minutes. Vetted crews, online payment, real-time updates.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="btn-primary text-base">
                Book a Clean Now <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:4165550100" className="btn-secondary text-base">
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
