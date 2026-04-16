"use client";
import { useState } from "react";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero — matches screenshot */}
      <section className="bg-gradient-hero py-16">
        <div className="container-pub">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="chip chip-pink inline-flex mb-5">Friendly · Professional · Female-owned</div>
              <h1 className="text-5xl font-display font-bold text-text-primary mb-4">
                Let&apos;s talk about your <span className="text-gradient">clean space</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-7">
                Questions, quotes, or scheduling help — send us a message and we&apos;ll guide you with clear, honest answers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/book" className="btn-primary">Book a Clean</Link>
                <a href="tel:4165550100" className="btn-secondary">Call Us</a>
              </div>
            </div>

            {/* Response card — matches screenshot */}
            <div className="pub-card p-6 max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-brand-blue/60" />
                  <div className="w-3 h-3 rounded-full bg-brand-pink/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
              </div>
              <div className="flex items-center gap-3 py-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background:"linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">We usually reply within 24 hours</p>
                  <p className="text-xs text-text-muted mt-0.5">Mon–Sat, 9AM–6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form + details — matches screenshot layout */}
      <section className="section bg-white">
        <div className="container-pub">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="pub-card p-8">
                <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Send us a message</h2>
                <p className="text-text-secondary mb-7">Tell us about your space and what you&apos;re looking for.</p>

                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background:"rgba(79,195,247,0.1)", border:"1px solid rgba(79,195,247,0.25)" }}>
                      <CheckCircle className="w-8 h-8 text-brand-blue-dark" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-2">Message sent!</h3>
                    <p className="text-text-secondary mb-6">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                    <Link href="/book" className="btn-primary inline-flex">Book a Clean <ArrowRight className="w-4 h-4" /></Link>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-text-secondary block">Full name</label>
                        <input
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={e => setForm({...form,name:e.target.value})}
                          required
                          className="w-full h-11 rounded-xl border border-border bg-surface-50 px-4 text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-text-secondary block">Email address</label>
                        <input
                          type="email"
                          placeholder="jane@email.com"
                          value={form.email}
                          onChange={e => setForm({...form,email:e.target.value})}
                          required
                          className="w-full h-11 rounded-xl border border-border bg-surface-50 px-4 text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-text-secondary block">Message</label>
                      <textarea
                        rows={5}
                        placeholder="Tell us about your home, timing, or any questions you have..."
                        value={form.message}
                        onChange={e => setForm({...form,message:e.target.value})}
                        required
                        className="w-full rounded-xl border border-border bg-surface-50 px-4 py-3 text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none"
                      />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                    <p className="text-xs text-text-muted text-center">
                      Prefer a call?{" "}
                      <a href="tel:4165550100" className="text-brand-blue-dark font-medium hover:underline">(416) 555-0100</a>
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Details sidebar — matches screenshot */}
            <div className="space-y-5">
              <div className="pub-card p-6">
                <h3 className="text-base font-display font-semibold text-text-primary mb-4">Contact details</h3>
                <div className="space-y-4">
                  <a href="tel:4165550100" className="flex items-center gap-3 text-sm text-text-secondary hover:text-brand-blue-dark transition-colors">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:"rgba(244,143,177,0.1)", border:"1px solid rgba(244,143,177,0.25)" }}>
                      <Phone className="w-4 h-4 text-brand-pink-dark" />
                    </div>
                    (416) 555-1234
                  </a>
                  <a href="mailto:hello@cleaningstudio.ca" className="flex items-center gap-3 text-sm text-text-secondary hover:text-brand-blue-dark transition-colors">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:"rgba(79,195,247,0.1)", border:"1px solid rgba(79,195,247,0.25)" }}>
                      <Mail className="w-4 h-4 text-brand-blue-dark" />
                    </div>
                    info@pristinepro.ca
                  </a>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:"rgba(102,187,106,0.1)", border:"1px solid rgba(102,187,106,0.25)" }}>
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    Toronto, ON
                  </div>
                </div>
              </div>

              <div className="pub-card p-6">
                <h3 className="text-base font-display font-semibold text-text-primary mb-3">Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-text-secondary">Mon–Sat</span><span className="font-medium text-text-primary">9:00am – 6:00pm</span></div>
                  <div className="flex justify-between"><span className="text-text-secondary">Sunday</span><span className="text-text-muted">Closed</span></div>
                </div>
              </div>

              <div className="pub-card p-6">
                <h3 className="text-base font-display font-semibold text-text-primary mb-2">
                  Service area <span className="chip chip-blue text-[10px] ml-1">Open in Maps</span>
                </h3>
                <p className="text-sm text-text-secondary mb-3">Serving Toronto and surrounding areas with flexible scheduling and friendly service.</p>
                <div className="flex flex-wrap gap-2">
                  {["Fast response","Eco options","Insured","Female-owned"].map(t => (
                    <span key={t} className="chip chip-blue text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
