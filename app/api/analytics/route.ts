import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DEMO_KPIS, DEMO_REVENUE, DEMO_SERVICES, DEMO_CITY_PERFORMANCE } from "@/data/demo";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ kpis: DEMO_KPIS, revenue: DEMO_REVENUE, services: DEMO_SERVICES, cityPerformance: DEMO_CITY_PERFORMANCE });
}
