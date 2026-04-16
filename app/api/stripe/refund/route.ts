import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN","MANAGER"].includes((session.user as any)?.role)) {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }
  const { paymentIntentId, amount } = await req.json();
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ success: true, demo: true, message: "Demo refund processed" });
  }
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
    const refund = await stripe.refunds.create({ payment_intent: paymentIntentId, ...(amount && { amount: Math.round(amount * 100) }) });
    return NextResponse.json({ success: true, refundId: refund.id, status: refund.status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
