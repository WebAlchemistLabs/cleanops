import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { jobId, invoiceId, amount, serviceName, depositOnly } = await req.json();
  if (!jobId || !amount) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  if (!process.env.STRIPE_SECRET_KEY) {
    // Demo mode: simulate success
    const chargeAmt = depositOnly ? Math.round(amount * 0.25) : amount;
    return NextResponse.json({ url: `/payments/success?demo=true&jobId=${jobId}&amount=${chargeAmt}`, demo: true });
  }
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
    const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const chargeAmt = depositOnly ? Math.round(amount * 0.25 * 100) : Math.round(amount * 100);
    const s = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price_data: { currency: "cad", product_data: { name: depositOnly ? `25% Deposit — ${serviceName}` : serviceName, description: "CleanOps AI — Pristine Pro Cleaning" }, unit_amount: chargeAmt }, quantity: 1 }],
      mode: "payment",
      success_url: `${base}/payments/success?session_id={CHECKOUT_SESSION_ID}&jobId=${jobId}`,
      cancel_url: `${base}/payments/cancel?jobId=${jobId}`,
      metadata: { jobId: jobId||"", invoiceId: invoiceId||"", depositOnly: depositOnly?"true":"false" },
    });
    return NextResponse.json({ url: s.url, sessionId: s.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
