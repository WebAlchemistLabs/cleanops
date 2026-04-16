"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Calendar, ArrowRight, UserPlus, Home } from "lucide-react";
import { PublicNav } from "@/components/public/PublicNav";
import { SERVICE_LABELS } from "@/lib/utils";

function Confirmation() {
  const params = useSearchParams();
  const name = params.get("name") || "there";
  const service = params.get("service") || "";
  const serviceName = SERVICE_LABELS[service] || "Cleaning Service";

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <div className="bg-gradient-hero min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center space-y-7">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-soft" style={{ background:"linear-gradient(135deg,rgba(79,195,247,0.15),rgba(244,143,177,0.1))", border:"2px solid rgba(79,195,247,0.3)" }}>
            <CheckCircle className="w-10 h-10 text-brand-blue-dark" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-text-primary mb-3">Request Received, {name}!</h1>
            <p className="text-text-secondary leading-relaxed">
              Your <span className="font-semibold text-text-primary">{serviceName}</span> request has been submitted. We&apos;ll review it and send a confirmation to your email within 3 hours.
            </p>
          </div>
          <div className="pub-card p-5 text-left space-y-3">
            <p className="font-display font-semibold text-text-primary">What happens next</p>
            {[
              "We review your request and assign an available crew.",
              "You receive a confirmation email with date, time, and crew details.",
              "Your crew arrives and delivers a thorough professional clean.",
              "You receive an invoice and can pay securely online.",
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" style={{ background:"linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>{i+1}</span>
                <p className="text-sm text-text-secondary">{s}</p>
              </div>
            ))}
          </div>
          <div className="pub-card p-5 text-left" style={{ background:"rgba(79,195,247,0.04)", borderColor:"rgba(79,195,247,0.2)" }}>
            <div className="flex items-start gap-3">
              <UserPlus className="w-5 h-5 text-brand-blue-dark shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-text-primary mb-1">Track your booking online</p>
                <p className="text-xs text-text-secondary mb-3">Create a free account to view booking status, get real-time updates, and pay invoices online.</p>
                <Link href="/register" className="btn-primary text-sm py-2 px-4 inline-flex">Create Free Account <ArrowRight className="w-3.5 h-3.5" /></Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-secondary flex-1 justify-center"><Home className="w-4 h-4" />Back to Home</Link>
            <Link href="/book" className="btn-secondary flex-1 justify-center"><Calendar className="w-4 h-4" />Book Another</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <Confirmation />
    </Suspense>
  );
}
