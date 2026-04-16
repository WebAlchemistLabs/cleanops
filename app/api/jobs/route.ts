import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DEMO_JOBS } from "@/data/demo";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search")?.toLowerCase();
  const role = (session.user as any)?.role;
  let jobs = [...DEMO_JOBS];
  // Customers only see their own jobs
  if (role === "CUSTOMER") {
    jobs = jobs.filter(j => j.customer.email === session.user?.email);
  }
  if (status && status !== "ALL") jobs = jobs.filter(j => j.status === status);
  if (search) jobs = jobs.filter(j =>
    `${j.customer.firstName} ${j.customer.lastName} ${j.city} ${j.address}`.toLowerCase().includes(search)
  );
  return NextResponse.json({ jobs, total: jobs.length });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  return NextResponse.json({ job: { id: `job-${Date.now()}`, ...body, status: "PENDING", paid: false }, success: true }, { status: 201 });
}
