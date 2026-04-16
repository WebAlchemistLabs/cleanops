"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle, Loader2, Calendar, MapPin, User, Clock } from "lucide-react";
import { PublicNav } from "@/components/public/PublicNav";
import { SERVICE_LABELS, SERVICE_DESCRIPTIONS, SERVICE_PRICES, SERVICE_DURATION, SERVICE_IMAGES, SERVICE_COLORS } from "@/lib/utils";
import type { ServiceType } from "@/types";

const SERVICES = Object.entries(SERVICE_LABELS).map(([id, name]) => ({
  id: id as ServiceType, name,
  desc: SERVICE_DESCRIPTIONS[id],
  price: SERVICE_PRICES[id],
  duration: SERVICE_DURATION[id],
  image: SERVICE_IMAGES[id],
  color: SERVICE_COLORS[id],
}));

const CITIES = ["Toronto","Mississauga","Brampton","Vaughan","Markham","Richmond Hill","Oakville","Ajax","Whitby","Pickering","Etobicoke","North York","Scarborough"];

type Step = "service" | "details" | "confirm";

function BookingForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState<Step>(params.get("service") ? "details" : "service");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    serviceType: (params.get("service") || "") as ServiceType | "",
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", preferredDate: "", notes: "",
  });

  const selectedService = SERVICES.find(s => s.id === form.serviceType);
  const set = (k: string, v: string) => setForm(p => ({...p, [k]: v}));
  const canNext = !!form.serviceType;
  const canConfirm = form.firstName && form.lastName && form.email && form.address && form.city && form.preferredDate;

  async function submit() {
    setLoading(true);
    try {
      await fetch("/api/booking", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    router.push(`/book/confirmation?name=${form.firstName}&service=${form.serviceType}`);
  }

  const inputCls = "w-full h-11 rounded-xl border border-border bg-surface-50 px-4 text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all";

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      <div className="bg-gradient-hero min-h-[calc(100vh-80px)]">
        <div className="container-pub py-10 max-w-4xl">

          {/* Progress */}
          <div className="flex items-center gap-2 mb-10 max-w-lg mx-auto">
            {(["service","details","confirm"] as Step[]).map((s, i) => {
              const cur = ["service","details","confirm"].indexOf(step);
              const done = cur > i; const active = cur === i;
              return (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`flex items-center gap-2 ${active||done?"text-text-primary":"text-text-muted"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done?"bg-green-500 text-white":active?"text-white":"bg-surface-200 text-text-muted"}`} style={active ? { background:"linear-gradient(135deg,#4FC3F7,#29B6F6)" } : {}}>
                      {done ? <CheckCircle className="w-4 h-4" /> : i+1}
                    </div>
                    <span className={`text-xs font-medium capitalize hidden sm:block ${active?"text-text-primary":done?"text-green-600":"text-text-muted"}`}>
                      {s === "service" ? "Service" : s === "details" ? "Details" : "Confirm"}
                    </span>
                  </div>
                  {i < 2 && <div className={`flex-1 h-0.5 mx-1 rounded ${done?"bg-green-400":"bg-border"}`} />}
                </div>
              );
            })}
          </div>

          {/* STEP 1: Choose Service */}
          {step === "service" && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-2">What do you need cleaned?</h1>
                <p className="text-text-secondary">Select a service. We&apos;ll confirm pricing after reviewing your details.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {SERVICES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => set("serviceType", s.id)}
                    className={`text-left rounded-2xl overflow-hidden border-2 transition-all duration-200 ${form.serviceType === s.id ? "border-brand-blue shadow-blue scale-[1.01]" : "border-border hover:border-brand-blue/40 hover:shadow-soft"} bg-white`}
                  >
                    {/* Service image */}
                    <div className="relative h-36 overflow-hidden">
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: form.serviceType === s.id ? "rgba(79,195,247,0.15)" : "rgba(255,255,255,0.05)" }} />
                      {form.serviceType === s.id && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center shadow-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    {/* Text */}
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-text-primary mb-1 text-sm">{s.name}</h3>
                      <p className="text-xs text-text-muted leading-relaxed mb-3">{s.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-text-primary">{s.price}</span>
                        <div className="flex items-center gap-1 text-xs text-text-muted"><Clock className="w-3 h-3" />{s.duration}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                <button onClick={() => canNext && setStep("details")} disabled={!canNext} className="btn-primary text-base disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Details */}
          {step === "details" && (
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-2">Your Details</h1>
                <p className="text-text-secondary">Tell us about yourself and where you need the clean.</p>
              </div>

              {selectedService && (
                <div className="pub-card p-4 mb-6 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={selectedService.image} alt={selectedService.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary text-sm">{selectedService.name}</p>
                    <p className="text-xs text-text-muted">{selectedService.price} · {selectedService.duration}</p>
                  </div>
                  <button onClick={() => setStep("service")} className="text-xs text-brand-blue-dark hover:underline font-medium shrink-0">Change</button>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">First Name *</label><input className={inputCls} placeholder="Jane" value={form.firstName} onChange={e => set("firstName", e.target.value)} /></div>
                  <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Last Name *</label><input className={inputCls} placeholder="Doe" value={form.lastName} onChange={e => set("lastName", e.target.value)} /></div>
                </div>
                <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Email Address *</label><input type="email" className={inputCls} placeholder="jane@example.com" value={form.email} onChange={e => set("email", e.target.value)} /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Phone Number</label><input className={inputCls} placeholder="416-555-0000" value={form.phone} onChange={e => set("phone", e.target.value)} /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Street Address *</label><input className={inputCls} placeholder="123 Main St, Unit 4" value={form.address} onChange={e => set("address", e.target.value)} /></div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-secondary block">City *</label>
                  <select className={inputCls + " appearance-none"} value={form.city} onChange={e => set("city", e.target.value)}>
                    <option value="">Select your city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Preferred Date *</label><input type="date" min={new Date(Date.now()+86400000).toISOString().split("T")[0]} className={inputCls} value={form.preferredDate} onChange={e => set("preferredDate", e.target.value)} /></div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-secondary block">Special Instructions</label>
                  <textarea rows={3} className="w-full rounded-xl border border-border bg-surface-50 px-4 py-3 text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none" placeholder="Pets, access instructions, areas to focus on..." value={form.notes} onChange={e => set("notes", e.target.value)} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep("service")} className="btn-secondary gap-2"><ArrowLeft className="w-4 h-4" />Back</button>
                <button onClick={() => canConfirm && setStep("confirm")} disabled={!canConfirm} className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                  Review Request <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === "confirm" && selectedService && (
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-2">Review Your Request</h1>
                <p className="text-text-secondary">Check the details below and submit. We&apos;ll confirm within 3 hours.</p>
              </div>
              <div className="pub-card p-6 mb-5 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={selectedService.image} alt={selectedService.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-text-primary">{selectedService.name}</p>
                    <p className="text-sm text-text-muted">{selectedService.price} · {selectedService.duration}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2"><User className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" /><div><p className="text-xs text-text-muted mb-0.5">Name</p><p className="font-medium text-text-primary">{form.firstName} {form.lastName}</p></div></div>
                  <div className="flex items-start gap-2"><Calendar className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" /><div><p className="text-xs text-text-muted mb-0.5">Date</p><p className="font-medium text-text-primary">{new Date(form.preferredDate).toLocaleDateString("en-CA",{weekday:"short",month:"short",day:"numeric"})}</p></div></div>
                  <div className="col-span-2 flex items-start gap-2"><MapPin className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" /><div><p className="text-xs text-text-muted mb-0.5">Location</p><p className="font-medium text-text-primary">{form.address}, {form.city}, ON</p></div></div>
                  {form.notes && <div className="col-span-2"><p className="text-xs text-text-muted mb-0.5">Notes</p><p className="text-text-secondary text-xs">{form.notes}</p></div>}
                </div>
              </div>

              <div className="p-4 rounded-2xl mb-5" style={{ background:"rgba(79,195,247,0.06)", border:"1px solid rgba(79,195,247,0.2)" }}>
                <p className="text-sm font-semibold text-brand-blue-dark mb-2">What happens next?</p>
                <ul className="text-xs text-text-secondary space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-brand-blue-dark shrink-0" />We review and confirm availability within 3 hours</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-brand-blue-dark shrink-0" />You get a confirmation email with crew details and timing</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-brand-blue-dark shrink-0" />Pay your invoice online after the clean</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl mb-5 bg-surface-50 border border-border">
                <p className="text-xs font-medium text-text-secondary mb-1">Want to track your bookings online?</p>
                <p className="text-xs text-text-muted">
                  <Link href="/register" className="text-brand-blue-dark font-semibold hover:underline">Create a free account</Link> to view booking history, get updates, and pay invoices.
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("details")} className="btn-secondary gap-2"><ArrowLeft className="w-4 h-4" />Back</button>
                <button onClick={submit} disabled={loading} className="btn-primary flex-1 justify-center">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  {loading ? "Submitting..." : "Submit Booking Request"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>}>
      <BookingForm />
    </Suspense>
  );
}
