import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, phone } = await req.json();
  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }
  // In production with DB: hash password, create user, send welcome email
  // Demo mode: return success so the UX flow works
  return NextResponse.json({
    success: true,
    message: "Account created. You can now log in.",
    user: { id: `u-${Date.now()}`, firstName, lastName, email, role: "CUSTOMER" },
  }, { status: 201 });
}
