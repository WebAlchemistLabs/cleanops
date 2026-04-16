import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DEMO_CUSTOMERS } from "@/data/demo";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase();
  let customers = [...DEMO_CUSTOMERS];
  if (search) customers = customers.filter(c =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.city}`.toLowerCase().includes(search)
  );
  return NextResponse.json({ customers, total: customers.length });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  return NextResponse.json({ customer: { id: `c-${Date.now()}`, ...body, totalSpent: 0, jobCount: 0, isVIP: false, tags: [], createdAt: new Date().toISOString() }, success: true }, { status: 201 });
}
