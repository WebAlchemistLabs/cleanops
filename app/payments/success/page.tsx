"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const amount = params.get("amount");
  const isDemo = params.get("demo") === "true";
  const [count, setCount] = useState(5);
  useEffect(() => {
    const t = setInterval(() => setCount(c => { if (c <= 1) { clearInterval(t); router.push("/payments"); } return c - 1; }), 1000);
    return () => clearInterval(t);
  }, [router]);
  return (
    <div className="min-h-screen bg-[#09090F] flex items-center justify-center p-6" style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center" style={{ background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.25)" }}>
          <CheckCircle className="w-10 h-10 text-[#22C55E]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#EFEFF4] mb-2" style={{ fontFamily:"'Syne',sans-serif" }}>Payment Confirmed!</h1>
          <p className="text-[#8B8B9E]">Your invoice has been marked as paid.</p>
        </div>
        {amount && <div className="p-4 rounded-xl bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.2)]"><p className="text-2xl font-bold text-[#22C55E]" style={{ fontFamily:"'Syne',sans-serif" }}>{formatCurrency(parseFloat(amount))}</p><p className="text-xs text-[#8B8B9E] mt-1">{isDemo?"Demo payment — no real charge":"Payment confirmed via Stripe"}</p></div>}
        <div className="flex flex-col gap-3">
          <Link href="/payments" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[#09090F] font-semibold hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}>View Payments <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/dashboard" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] text-sm text-[#8B8B9E] hover:text-[#EFEFF4] transition-all">Back to Dashboard</Link>
        </div>
        <p className="text-xs text-[#5A5A72]">Redirecting in {count}s...</p>
      </div>
    </div>
  );
}
