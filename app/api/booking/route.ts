import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, phone, serviceType, address, city, preferredDate, notes } = body;
  if (!firstName || !lastName || !email || !serviceType || !address) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  // In production: save to DB, send notification email, trigger admin alert
  // In demo: just return success
  const bookingRequest = {
    id: `br-${Date.now()}`,
    firstName, lastName, email, phone,
    serviceType, address, city,
    preferredDate, notes,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  console.log("New booking request:", bookingRequest);
  return NextResponse.json({ success: true, bookingRequest }, { status: 201 });
}
