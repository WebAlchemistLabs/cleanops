"use client";
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#09090F] flex items-center justify-center p-6" style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center" style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)" }}>
          <XCircle className="w-10 h-10 text-[#EF4444]" />
        </div>
        <div><h1 className="text-2xl font-bold text-[#EFEFF4] mb-2" style={{ fontFamily:"'Syne',sans-serif" }}>Payment Cancelled</h1><p className="text-[#8B8B9E]">No charges were made. You can retry the payment at any time.</p></div>
        <div className="flex flex-col gap-3">
          <Link href="/payments" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[#09090F] font-semibold hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}><RefreshCw className="w-4 h-4"/>Try Again</Link>
          <Link href="/dashboard" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] text-sm text-[#8B8B9E] hover:text-[#EFEFF4] transition-all"><ArrowLeft className="w-4 h-4"/>Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
