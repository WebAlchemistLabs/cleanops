import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DEMO_KPIS, DEMO_JOBS, DEMO_CUSTOMERS, DEMO_STAFF, DEMO_CREWS, DEMO_REVENUE, DEMO_SERVICES, DEMO_ORG } from "@/data/demo";
import { formatCurrency, SERVICE_LABELS, STATUS_LABELS } from "@/lib/utils";

function buildContext(): string {
  const topCx = [...DEMO_CUSTOMERS].sort((a,b)=>b.totalSpent-a.totalSpent).slice(0,5)
    .map(c=>`${c.firstName} ${c.lastName}: ${c.city}, $${c.totalSpent} spent, ${c.jobCount} jobs, VIP:${c.isVIP}`).join("\n  ");
  const jobLines = DEMO_JOBS.map(j=>`${SERVICE_LABELS[j.serviceType]} for ${j.customer.firstName} ${j.customer.lastName} in ${j.city} — ${STATUS_LABELS[j.status]} — ${formatCurrency(j.price)} — Crew:${j.crew?.name||"Unassigned"}`).join("\n  ");
  const crewLines = DEMO_CREWS.map(c=>`${c.name}: ${c.jobsCompleted} jobs, rating ${c.rating}, ${formatCurrency(c.revenue)}`).join("\n  ");
  const unassigned = DEMO_JOBS.filter(j=>!j.crew&&!["CANCELLED","COMPLETED"].includes(j.status)).length;
  return `You are the AI assistant for ${DEMO_ORG.name}, a professional cleaning company in Toronto, ON.
Answer questions using only the data below. Be concise (2-3 sentences max). Never invent data.

METRICS: Revenue ${formatCurrency(DEMO_KPIS.totalRevenue)} (+${DEMO_KPIS.revenueChange}% MoM) | Jobs ${DEMO_KPIS.totalJobs} | Unassigned jobs ${unassigned} | Cancellation ${DEMO_KPIS.cancellationRate}% | Completion ${DEMO_KPIS.completionRate}% | Avg job ${formatCurrency(DEMO_KPIS.avgJobValue)} | Repeat rate ${DEMO_KPIS.repeatCustomerRate}%

TOP CUSTOMERS:
  ${topCx}

ACTIVE JOBS:
  ${jobLines}

CREWS:
  ${crewLines}`;
}

function demoReply(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("revenue")||m.includes("money")) return `Revenue this month is ${formatCurrency(DEMO_KPIS.totalRevenue)}, up ${DEMO_KPIS.revenueChange}% from last month. Standard and Deep Cleans drive the most volume.`;
  if (m.includes("customer")&&(m.includes("top")||m.includes("best"))) return "Top customer by spend is Chen Wei at $4,800 across 24 jobs (VIP). Sarah Mitchell follows at $3,240 across 18 jobs.";
  if (m.includes("crew")||m.includes("team")) return "Alpha Team leads with 270 jobs completed, a 4.85 rating, and $53,600 in revenue. Jordan Blake has the highest individual rating at 4.9.";
  if (m.includes("unassigned")||m.includes("assign")) return "3 jobs currently have no crew assigned — including a Move-In/Out in 2 days and a Post-Construction job. These should be assigned today to reduce cancellation risk.";
  if (m.includes("cancel")) return `Cancellation rate is ${DEMO_KPIS.cancellationRate}%, down 1.3% from last month — trending in the right direction.`;
  if (m.includes("booking")||m.includes("request")) return "New booking requests from the public booking page appear in the Jobs tab as PENDING and in Notifications. You can convert them to confirmed jobs from there.";
  return `Business is performing well — ${formatCurrency(DEMO_KPIS.totalRevenue)} revenue this month, ${DEMO_KPIS.totalJobs} total jobs, and a ${DEMO_KPIS.completionRate}% completion rate. What would you like to know more about?`;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { messages } = await req.json();
  if (!Array.isArray(messages)) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ reply: demoReply(messages[messages.length-1]?.content||""), source: "demo" });
  }
  try {
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", max_tokens: 350,
      messages: [{ role: "system", content: buildContext() }, ...messages.slice(-10)],
    });
    return NextResponse.json({ reply: completion.choices[0]?.message?.content || "Sorry, try again.", source: "openai" });
  } catch {
    return NextResponse.json({ reply: demoReply(messages[messages.length-1]?.content||""), source: "demo-fallback" });
  }
}
