import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    return NextResponse.json({ received: true });
  }
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    switch (event.type) {
      case "checkout.session.completed":
        const s = event.data.object as any;
        console.log(`✅ Payment: Job ${s.metadata?.jobId}, Amount $${s.amount_total/100} CAD`);
        break;
      case "charge.refunded":
        console.log(`🔄 Refund processed`);
        break;
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
