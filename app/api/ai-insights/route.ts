import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DEMO_INSIGHTS, DEMO_KPIS } from "@/data/demo";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ insights: DEMO_INSIGHTS });
  } catch (error) {
    console.error("GET /api/ai-insights error:", error);
    return NextResponse.json(
      { insights: DEMO_INSIGHTS, source: "demo" },
      { status: 200 }
    );
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ insights: DEMO_INSIGHTS, source: "demo" });
    }

    const { default: OpenAI } = await import("openai");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 900,
      messages: [
        {
          role: "user",
          content: `Business data: Revenue $${DEMO_KPIS.totalRevenue}, Jobs ${DEMO_KPIS.totalJobs}, Cancellation ${DEMO_KPIS.cancellationRate}%, Completion ${DEMO_KPIS.completionRate}%. Generate 3 business insights as JSON array with fields: title, summary, details, type (revenue|operations|customers|forecast), sentiment (positive|negative|neutral). Return ONLY the JSON array.`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content || "[]";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    const insights = Array.isArray(parsed) ? parsed : DEMO_INSIGHTS;

    return NextResponse.json({
      insights: insights.map((i: any, idx: number) => ({
        ...i,
        id: `ai-${Date.now()}-${idx}`,
        generatedAt: new Date().toISOString(),
      })),
      source: "openai",
    });
  } catch (error) {
    console.error("POST /api/ai-insights error:", error);
    return NextResponse.json({ insights: DEMO_INSIGHTS, source: "demo" });
  }
}