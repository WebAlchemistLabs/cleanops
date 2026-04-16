"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { DollarSign, Calendar, Users, TrendingUp, TrendingDown, Minus, Sparkles, RefreshCw, ChevronDown, ChevronUp, ArrowRight, CreditCard, CheckCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/Radix";
import { StatusBadge, ServiceBadge, PaymentBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, formatDateTime, formatRelative, getInitials } from "@/lib/utils";
import { DEMO_KPIS, DEMO_REVENUE, DEMO_SERVICES, DEMO_JOBS, DEMO_INSIGHTS, DEMO_ACTIVITY, DEMO_ORG } from "@/data/demo";
import type { AIInsight } from "@/types";

function KPICard({ title, value, change, icon: Icon, color = "#4FC3F7" }: any) {
  const pos = change > 0, neu = change === 0;
  const CIcon = neu ? Minus : pos ? TrendingUp : TrendingDown;
  const cc = neu ? "#9090A8" : pos ? "#16A34A" : "#DC2626";
  return (
    <div className="pub-card p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{title}</p>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background:`${color}18`, border:`1px solid ${color}30` }}>
          <Icon className="w-4 h-4" style={{ color }} strokeWidth={2} />
        </div>
      </div>
      <p className="text-2xl font-display font-bold text-text-primary mb-2">{value}</p>
      <div className="flex items-center gap-1.5 text-xs" style={{ color: cc }}>
        <CIcon className="w-3.5 h-3.5" />
        <span className="font-semibold">{pos?"+":""}{change}%</span>
        <span className="text-text-muted">vs last month</span>
      </div>
    </div>
  );
}

const ChartTip = ({ active, payload, label }: any) => {
  if (!active||!payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl p-3 text-sm shadow-card">
      <p className="text-text-muted text-xs mb-1.5">{label}</p>
      {payload.map((p:any,i:number)=>(
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{background:p.color||p.fill}}/>
          <span className="text-text-muted">{p.name}:</span>
          <span className="font-semibold text-text-primary ml-1">{p.name==="revenue"||p.name==="target"?formatCurrency(p.value):p.value}</span>
        </div>
      ))}
    </div>
  );
};

function CustomerDashboard({ name, email }: { name:string; email:string }) {
  const myJobs = DEMO_JOBS.filter(j=>j.customer.email===email||j.customer.id==="c-001");
  const upcoming = myJobs.filter(j=>["PENDING","CONFIRMED","IN_PROGRESS"].includes(j.status));
  const totalSpent = myJobs.filter(j=>j.paid||j.status==="COMPLETED").reduce((s,j)=>s+j.price,0);
  const unpaid = myJobs.filter(j=>!j.paid&&!["CANCELLED","COMPLETED"].includes(j.status));
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-display font-bold text-text-primary">Welcome back, {name} 👋</h1><p className="text-sm text-text-secondary mt-1">Track your bookings, view invoices, and pay online.</p></div>
      <div className="grid grid-cols-3 gap-4">
        {[{l:"Bookings",v:myJobs.length,c:"#4FC3F7"},{l:"Upcoming",v:upcoming.length,c:"#16A34A"},{l:"Total Spent",v:formatCurrency(totalSpent),c:"#F48FB1"}].map(s=>(
          <div key={s.l} className="pub-card p-4 text-center"><p className="text-[10px] text-text-muted uppercase tracking-wide mb-1.5">{s.l}</p><p className="text-xl font-display font-bold" style={{color:s.c}}>{s.v}</p></div>
        ))}
      </div>
      <div className="rounded-2xl p-5 relative overflow-hidden" style={{background:"linear-gradient(135deg,rgba(79,195,247,0.08),rgba(244,143,177,0.06))",border:"1px solid rgba(79,195,247,0.2)"}}>
        <div className="flex items-center justify-between gap-4">
          <div><h3 className="font-display font-semibold text-text-primary mb-1">Need another cleaning?</h3><p className="text-sm text-text-secondary">Book online in 2 minutes.</p></div>
          <Link href="/book" className="btn-primary shrink-0 text-sm py-2.5 px-5">Book Now <ArrowRight className="w-4 h-4"/></Link>
        </div>
      </div>
      {unpaid.length>0&&(
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.25)"}}>
          <CreditCard className="w-5 h-5 text-amber-600 shrink-0"/>
          <div className="flex-1"><p className="text-sm font-semibold text-amber-800">{unpaid.length} unpaid invoice{unpaid.length>1?"s":""} · {formatCurrency(unpaid.reduce((s,j)=>s+j.price,0))}</p></div>
          <Link href="/payments" className="btn-primary text-xs py-1.5 px-3 shrink-0">Pay Now</Link>
        </div>
      )}
      <div className="pub-card overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-border flex items-center justify-between">
          <h3 className="text-base font-display font-semibold text-text-primary">Booking History & Invoices</h3>
          <Link href="/payments" className="text-xs font-semibold text-brand-blue-dark hover:underline">All invoices →</Link>
        </div>
        {myJobs.length===0?(
          <div className="px-5 py-10 text-center"><Calendar className="w-8 h-8 text-text-muted mx-auto mb-3"/><p className="text-sm font-medium text-text-primary mb-1">No bookings yet</p><p className="text-xs text-text-muted mb-4">Book your first clean to get started.</p><Link href="/book" className="btn-primary text-sm py-2 px-4 inline-flex">Book a Clean</Link></div>
        ):(
          <div className="divide-y divide-border">
            {myJobs.map(job=>(
              <div key={job.id} className="flex items-center gap-4 px-5 py-4 hover:bg-surface-50 transition-colors">
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-text-primary">{job.serviceType.replace(/_/g," ")}</p><p className="text-xs text-text-muted mt-0.5">{formatDate(job.scheduledAt)} · {job.city}</p></div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={job.status}/>
                  <PaymentBadge paid={job.paid||job.status==="COMPLETED"}/>
                  <span className="text-sm font-bold text-text-primary">{formatCurrency(job.price)}</span>
                  {!job.paid&&!["CANCELLED","COMPLETED"].includes(job.status)&&(<Link href="/payments" className="btn-primary text-xs py-1.5 px-3">Pay</Link>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data:session } = useSession();
  const role = (session?.user as any)?.role;
  const isAdmin = role==="ADMIN"||role==="MANAGER";
  const firstName = session?.user?.name?.split(" ")[0]||"there";
  const email = session?.user?.email||"";
  const [insights,setInsights] = useState<AIInsight[]>(DEMO_INSIGHTS);
  const [aiLoading,setAiLoading] = useState(false);
  const [expanded,setExpanded] = useState<string|null>(null);

  if (!isAdmin) return <CustomerDashboard name={firstName} email={email}/>;

  async function regenerate() {
    setAiLoading(true);
    try { const r=await fetch("/api/ai-insights",{method:"POST"}); const d=await r.json(); if(d.insights) setInsights(d.insights); } catch {}
    setAiLoading(false);
  }

  const sentColor:{[k:string]:string}={positive:"#16A34A",negative:"#DC2626",neutral:"#9090A8"};
  const typeColor:{[k:string]:string}={revenue:"#4FC3F7",bookings:"#16A34A",customers:"#F48FB1",operations:"#F59E0B",forecast:"#8B5CF6"};

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      <div className="flex items-start justify-between">
        <div><h1 className="text-2xl font-display font-bold text-text-primary">Good morning, {firstName} 👋</h1><p className="text-sm text-text-secondary mt-1">Here&apos;s what&apos;s happening at <span className="font-semibold text-brand-blue-dark">{DEMO_ORG.name}</span> today.</p></div>
        <div className="hidden md:flex items-center gap-2 text-xs text-text-muted bg-white border border-border rounded-xl px-3 py-2 shadow-soft"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>Demo Mode Active</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Monthly Revenue" value={formatCurrency(DEMO_KPIS.totalRevenue)} change={DEMO_KPIS.revenueChange} icon={DollarSign} color="#4FC3F7"/>
        <KPICard title="Total Jobs" value={DEMO_KPIS.totalJobs} change={DEMO_KPIS.jobsChange} icon={Calendar} color="#16A34A"/>
        <KPICard title="Active Customers" value={DEMO_KPIS.activeCustomers} change={DEMO_KPIS.customersChange} icon={Users} color="#8B5CF6"/>
        <KPICard title="Cancellation Rate" value={`${DEMO_KPIS.cancellationRate}%`} change={DEMO_KPIS.cancellationChange} icon={TrendingDown} color="#F59E0B"/>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard title="Avg Job Value" value={formatCurrency(DEMO_KPIS.avgJobValue)} change={3.4} icon={TrendingUp} color="#F48FB1"/>
        <KPICard title="Completion Rate" value={`${DEMO_KPIS.completionRate}%`} change={1.2} icon={CheckCircle} color="#16A34A"/>
        <KPICard title="Repeat Customers" value={`${DEMO_KPIS.repeatCustomerRate}%`} change={7.5} icon={Users} color="#8B5CF6"/>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 pub-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div><h3 className="text-sm font-display font-semibold text-text-primary">Revenue Overview</h3><p className="text-xs text-text-muted mt-0.5">12 months · actual vs target</p></div>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 rounded-sm bg-brand-blue"/>Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-border"/>Target</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={DEMO_REVENUE} margin={{top:4,right:4,left:-20,bottom:0}}>
              <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4FC3F7" stopOpacity={0.2}/><stop offset="95%" stopColor="#4FC3F7" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EDF5" vertical={false}/>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"#9090A8",fontSize:10}} interval={1}/>
              <YAxis axisLine={false} tickLine={false} tick={{fill:"#9090A8",fontSize:10}} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
              <Tooltip content={<ChartTip/>}/>
              <Area type="monotone" dataKey="target" stroke="#E8EDF5" strokeWidth={1.5} strokeDasharray="4 4" fill="none" dot={false}/>
              <Area type="monotone" dataKey="revenue" stroke="#4FC3F7" strokeWidth={2.5} fill="url(#rg)" dot={false} activeDot={{r:5,fill:"#4FC3F7",stroke:"#FFFFFF",strokeWidth:2}}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="pub-card p-5">
          <h3 className="text-sm font-display font-semibold text-text-primary mb-1">Service Mix</h3>
          <p className="text-xs text-text-muted mb-4">Revenue by type</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart><Pie data={DEMO_SERVICES} cx="50%" cy="50%" innerRadius={42} outerRadius={64} paddingAngle={3} dataKey="value" stroke="none">{DEMO_SERVICES.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie></PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-3">
            {DEMO_SERVICES.map(s=>(
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{background:s.color}}/>
                <span className="text-text-secondary flex-1 truncate">{s.name}</span>
                <span className="font-semibold text-text-primary">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <div className="pub-card overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
              <div><h3 className="text-sm font-display font-semibold text-text-primary">Recent Jobs</h3><p className="text-xs text-text-muted mt-0.5">Latest bookings</p></div>
              <Link href="/jobs" className="text-xs font-semibold text-brand-blue-dark hover:underline">View all →</Link>
            </div>
            <div className="divide-y divide-border">
              {DEMO_JOBS.slice(0,6).map(job=>(
                <div key={job.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-surface-50 transition-colors">
                  <Avatar className="h-8 w-8 shrink-0"><AvatarFallback className="text-[10px]">{getInitials(job.customer.firstName,job.customer.lastName)}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-text-primary truncate">{job.customer.firstName} {job.customer.lastName}</p><p className="text-xs text-text-muted truncate">{job.city} · {formatDate(job.scheduledAt)}</p></div>
                  <div className="hidden sm:block"><ServiceBadge type={job.serviceType}/></div>
                  <StatusBadge status={job.status}/>
                  <span className="text-sm font-bold text-text-primary ml-1 hidden md:block">{formatCurrency(job.price)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pub-card overflow-hidden">
            <div className="px-5 pt-5 pb-4 border-b border-border"><h3 className="text-sm font-display font-semibold text-text-primary">Activity Log</h3></div>
            <div className="p-4 space-y-0.5">
              {DEMO_ACTIVITY.map(log=>{
                const ini=log.actor==="System"?"SY":log.actor.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2);
                return (
                  <div key={log.id} className="flex items-start gap-3 py-2.5 hover:bg-surface-50 rounded-xl px-2 -mx-2 transition-colors">
                    <Avatar className="h-6 w-6 shrink-0"><AvatarFallback className="text-[9px]">{ini}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-secondary leading-snug"><span className="font-semibold text-text-primary">{log.actor}</span> {log.action} <span className="text-brand-blue-dark font-medium">{log.entity}</span>{log.meta&&<span className="text-text-muted"> — {log.meta}</span>}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{formatRelative(log.createdAt)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pub-card overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{background:"linear-gradient(135deg,rgba(79,195,247,0.15),rgba(244,143,177,0.1))",border:"1px solid rgba(79,195,247,0.25)"}}>
                <Sparkles className="w-3.5 h-3.5 text-brand-blue-dark"/>
              </div>
              <div><h3 className="text-sm font-display font-semibold text-text-primary">AI Insights</h3><p className="text-[10px] text-text-muted">GPT-4o powered</p></div>
            </div>
            <button onClick={regenerate} disabled={aiLoading} className="w-6 h-6 rounded-lg flex items-center justify-center text-text-muted hover:text-brand-blue-dark hover:bg-surface-100 transition-colors">
              <RefreshCw className={`w-3.5 h-3.5 ${aiLoading?"animate-spin":""}`}/>
            </button>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {aiLoading?(
              <div className="flex items-center justify-center py-8 gap-3"><div className="w-4 h-4 rounded-full border-2 border-brand-blue border-t-transparent animate-spin"/><p className="text-xs text-text-muted">Analysing...</p></div>
            ):insights.map(ins=>{
              const ac=typeColor[ins.type]||"#4FC3F7";
              const SI=ins.sentiment==="positive"?TrendingUp:ins.sentiment==="negative"?TrendingDown:Minus;
              const isExp=expanded===ins.id;
              return (
                <div key={ins.id} className="rounded-xl border border-border overflow-hidden" style={{borderLeft:`3px solid ${ac}`}}>
                  <button className="w-full flex items-start gap-3 p-3.5 text-left hover:bg-surface-50 transition-colors" onClick={()=>setExpanded(isExp?null:ins.id)}>
                    <SI className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{color:sentColor[ins.sentiment]}}/>
                    <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-text-primary leading-snug">{ins.title}</p><p className="text-[11px] text-text-secondary mt-1 leading-relaxed">{ins.summary}</p></div>
                    {isExp?<ChevronUp className="w-3 h-3 text-text-muted shrink-0 mt-0.5"/>:<ChevronDown className="w-3 h-3 text-text-muted shrink-0 mt-0.5"/>}
                  </button>
                  {isExp&&<div className="px-3.5 pb-3.5 pt-2.5 border-t border-border bg-surface-50"><p className="text-[11px] text-text-secondary leading-relaxed">{ins.details}</p></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
