"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Eye, EyeOff, Loader2, ArrowRight, CheckCircle } from "lucide-react";

const DEMOS = [
  { label: "Admin", email: "admin@cleanopsai.com", password: "Admin123!", desc: "Full dashboard access", color: "#4FC3F7" },
  { label: "Manager", email: "manager@cleanopsai.com", password: "Manager123!", desc: "Operations view", color: "#F48FB1" },
  { label: "Customer", email: "sarah@example.com", password: "Customer123!", desc: "My bookings & invoices", color: "#66BB6A" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Try a demo account below.");
      setLoading(false);
    }
  }

  const inp = "w-full h-11 rounded-xl border border-border bg-surface-50 px-4 text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all";

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between w-[440px] shrink-0 bg-white border-r border-border p-12 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,rgba(79,195,247,0.08) 0%,transparent 70%)" }} />
        <div className="absolute -bottom-32 -right-16 w-64 h-64 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,rgba(244,143,177,0.08) 0%,transparent 70%)" }} />
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft" style={{ background:"linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display font-bold text-xl text-text-primary">Pristine Pro</p>
            <p className="text-[10px] text-text-muted">Powered by CleanOps AI</p>
          </div>
        </Link>

        <div className="relative z-10 space-y-5">
          <h2 className="text-3xl font-display font-bold text-text-primary leading-tight">
            Manage your entire cleaning business in one place.
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Book cleanings, track jobs, manage payments, and grow your business — all powered by AI.
          </p>
          <div className="space-y-3">
            {["Public booking page for customers","Stripe online payments","AI assistant with live data","Revenue analytics & reports","Quote-to-booking pipeline"].map(f => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background:"rgba(79,195,247,0.15)" }}>
                  <CheckCircle className="w-3 h-3 text-brand-blue-dark" />
                </div>
                <span className="text-sm text-text-secondary">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pub-card p-5 relative z-10" style={{ background:"linear-gradient(135deg,rgba(79,195,247,0.05),rgba(244,143,177,0.05))" }}>
          <p className="text-sm text-text-secondary italic leading-relaxed">&ldquo;CleanOps AI completely transformed how we manage bookings and get paid. Our customers love the online payment system.&rdquo;</p>
          <div className="flex items-center gap-2.5 mt-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background:"linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>AP</div>
            <div>
              <p className="text-xs font-semibold text-text-primary">Alex P.</p>
              <p className="text-[10px] text-text-muted">Owner, Pristine Pro Cleaning</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-7">
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg text-text-primary">Pristine Pro</span>
          </Link>

          <div>
            <h1 className="text-2xl font-display font-bold text-text-primary">Welcome back</h1>
            <p className="text-sm text-text-secondary mt-1">Sign in to your account</p>
          </div>

          {/* Demo accounts */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              {DEMOS.map(d => (
                <button key={d.label} onClick={() => { setEmail(d.email); setPassword(d.password); setError(""); }}
                  className="p-3 rounded-xl border border-border bg-white hover:border-brand-blue/40 hover:shadow-soft transition-all text-left">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold text-white" style={{ background:`linear-gradient(135deg,${d.color},${d.color}cc)` }}>{d.label[0]}</div>
                    <span className="text-xs font-semibold text-text-primary">{d.label}</span>
                  </div>
                  <p className="text-[10px] text-text-muted">{d.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted">or sign in manually</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-secondary block">Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required className={inp} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-secondary block">Password</label>
              <div className="relative">
                <input type={showPw?"text":"password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className={inp + " pr-10"} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <div className="p-3 rounded-xl text-sm text-red-600 bg-red-50 border border-red-200">{error}</div>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="space-y-2 text-center text-xs text-text-muted">
            <p>Don&apos;t have an account? <Link href="/register" className="text-brand-blue-dark font-semibold hover:underline">Create one free</Link></p>
            <p>Want a cleaning? <Link href="/book" className="text-brand-blue-dark font-semibold hover:underline">Book without an account →</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
