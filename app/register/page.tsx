"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Loader2, ArrowRight, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName:"",lastName:"",email:"",phone:"",password:"",confirm:"" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k:string,v:string) => setForm(p=>({...p,[k]:v}));
  const inp = "w-full h-11 rounded-xl border border-border bg-surface-50 px-4 text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/register", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      if (data.success) router.push("/login?registered=true");
      else setError(data.error || "Registration failed. Please try again.");
    } catch { setError("Something went wrong."); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-soft" style={{ background:"linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
            <Sparkles className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display font-bold text-base text-text-primary">Pristine Pro Cleaning</p>
            <p className="text-[10px] text-text-muted">Powered by CleanOps AI</p>
          </div>
        </Link>

        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Create your account</h1>
          <p className="text-sm text-text-secondary mt-1">Track bookings, view invoices, and pay online — all in one place.</p>
        </div>

        <div className="pub-card p-4" style={{ background:"rgba(79,195,247,0.04)", borderColor:"rgba(79,195,247,0.2)" }}>
          <p className="text-sm font-semibold text-brand-blue-dark mb-2">Free account benefits:</p>
          <div className="grid grid-cols-2 gap-2">
            {["View all your bookings","Real-time status updates","Pay invoices online","Full booking history","Book new services fast","Manage your account"].map(f=>(
              <div key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                <CheckCircle className="w-3.5 h-3.5 text-brand-blue-dark shrink-0" />{f}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">First Name *</label><input className={inp} placeholder="Jane" value={form.firstName} onChange={e=>set("firstName",e.target.value)} required /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Last Name *</label><input className={inp} placeholder="Doe" value={form.lastName} onChange={e=>set("lastName",e.target.value)} required /></div>
          </div>
          <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Email Address *</label><input type="email" className={inp} placeholder="jane@example.com" value={form.email} onChange={e=>set("email",e.target.value)} required /></div>
          <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Phone Number</label><input className={inp} placeholder="416-555-0000" value={form.phone} onChange={e=>set("phone",e.target.value)} /></div>
          <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Password *</label>
            <div className="relative">
              <input type={showPw?"text":"password"} className={inp+" pr-10"} placeholder="Min 8 characters" value={form.password} onChange={e=>set("password",e.target.value)} required />
              <button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary">
                {showPw?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
              </button>
            </div>
          </div>
          <div className="space-y-1.5"><label className="text-sm font-medium text-text-secondary block">Confirm Password *</label><input type="password" className={inp} placeholder="Repeat password" value={form.confirm} onChange={e=>set("confirm",e.target.value)} required /></div>
          {error && <div className="p-3 rounded-xl text-sm text-red-600 bg-red-50 border border-red-200">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="space-y-2 text-center text-xs text-text-muted">
          <p>Already have an account? <Link href="/login" className="text-brand-blue-dark font-semibold hover:underline">Sign in</Link></p>
          <p>Just need a cleaning? <Link href="/book" className="text-brand-blue-dark font-semibold hover:underline">Book without an account →</Link></p>
        </div>
      </div>
    </div>
  );
}
