"use client";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { TrendingUp, DollarSign, Users, Award, MapPin } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Radix";
import { formatCurrency } from "@/lib/utils";
import { DEMO_REVENUE, DEMO_SERVICES, DEMO_CITY_PERFORMANCE, DEMO_KPIS } from "@/data/demo";

const TT = ({ active,payload,label }: any) => {
  if (!active||!payload?.length) return null;
  return (<div className="bg-[#1A1A26] border border-border rounded-xl p-3 text-sm shadow-xl">
    <p className="text-text-secondary text-xs mb-1">{label}</p>
    {payload.map((p:any,i:number)=>(
      <div key={i} className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{background:p.color||p.fill}}/>
        <span className="text-text-secondary">{p.name}:</span>
        <span className="font-semibold text-text-primary ml-1">{p.name==="revenue"||p.name==="target"?formatCurrency(p.value):p.name==="rate"?`${p.value}%`:p.value}</span>
      </div>
    ))}
  </div>);
};

const CANCEL=[{month:"Jan",rate:6.2},{month:"Feb",rate:5.8},{month:"Mar",rate:5.1},{month:"Apr",rate:4.9},{month:"May",rate:5.3},{month:"Jun",rate:4.8}];
const CREWS=[{crew:"Alpha",jobs:270,revenue:53600},{crew:"Beta",jobs:212,revenue:39500},{crew:"Gamma",jobs:188,revenue:35440}];

export default function AnalyticsPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      <div><h1 className="text-2xl font-bold text-text-primary" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Analytics</h1><p className="text-sm text-text-secondary mt-0.5">Business performance overview</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{l:"YTD Revenue",v:formatCurrency(DEMO_REVENUE.reduce((s,d)=>s+d.revenue,0)),c:"#00D4FF",I:DollarSign},{l:"Completion Rate",v:`${DEMO_KPIS.completionRate}%`,c:"#22C55E",I:Award},{l:"Repeat Rate",v:`${DEMO_KPIS.repeatCustomerRate}%`,c:"#A855F7",I:Users},{l:"Avg Job Value",v:formatCurrency(DEMO_KPIS.avgJobValue),c:"#F59E0B",I:TrendingUp}].map(k=>(
          <div key={k.l} className="pub-card p-5"><div className="flex items-center justify-between mb-3"><p className="text-xs text-text-muted uppercase tracking-wide">{k.l}</p><k.I className="w-4 h-4" style={{color:k.c}}/></div><p className="text-2xl font-bold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:k.c}}>{k.v}</p></div>
        ))}
      </div>
      <Tabs defaultValue="revenue">
        <TabsList className="mb-4"><TabsTrigger value="revenue">Revenue</TabsTrigger><TabsTrigger value="services">Services</TabsTrigger><TabsTrigger value="locations">Locations</TabsTrigger><TabsTrigger value="crews">Crews</TabsTrigger></TabsList>
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 card p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-1" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Revenue vs Target</h3>
              <p className="text-xs text-text-muted mb-5">12 months</p>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={DEMO_REVENUE} margin={{top:4,right:4,left:-20,bottom:0}}>
                  <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00D4FF" stopOpacity={0.14}/><stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"#5A5A72",fontSize:10}} interval={1}/>
                  <YAxis axisLine={false} tickLine={false} tick={{fill:"#5A5A72",fontSize:10}} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
                  <Tooltip content={<TT/>}/>
                  <Area type="monotone" dataKey="target" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="4 4" fill="none" dot={false}/>
                  <Area type="monotone" dataKey="revenue" stroke="#00D4FF" strokeWidth={2.5} fill="url(#ag)" dot={false} activeDot={{r:5,fill:"#00D4FF",stroke:"#09090F"}}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="pub-card p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-1" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancellation Rate</h3>
              <p className="text-xs text-text-muted mb-5">6-month trend</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={CANCEL} margin={{top:4,right:4,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"#5A5A72",fontSize:11}}/>
                  <YAxis axisLine={false} tickLine={false} tick={{fill:"#5A5A72",fontSize:11}} tickFormatter={v=>`${v}%`}/>
                  <Tooltip content={<TT/>}/>
                  <Bar dataKey="rate" name="rate" radius={[4,4,0,0]}>{CANCEL.map((_,i)=><Cell key={i} fill={i===CANCEL.length-1?"#EF4444":"rgba(239,68,68,0.4)"}/>)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="services">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="pub-card p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-5" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Service Distribution</h3>
              <ResponsiveContainer width="100%" height={200}><PieChart><Pie data={DEMO_SERVICES} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">{DEMO_SERVICES.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie></PieChart></ResponsiveContainer>
            </div>
            <div className="pub-card p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-4" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Service Breakdown</h3>
              <div className="space-y-4">{DEMO_SERVICES.map(s=>(
                <div key={s.name} className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:s.color}}/>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5"><span className="text-sm font-medium text-text-primary">{s.name}</span><span className="text-sm font-bold text-text-primary">{s.value}%</span></div>
                    <div className="h-1.5 rounded-full bg-surface-200"><div className="h-full rounded-full" style={{width:`${s.value}%`,background:s.color}}/></div>
                    <p className="text-xs text-text-muted mt-1">{formatCurrency(s.revenue)}</p>
                  </div>
                </div>
              ))}</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="locations" className="space-y-4">
          <div className="pub-card p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-5" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Revenue by City</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={DEMO_CITY_PERFORMANCE} layout="vertical" margin={{top:0,right:60,left:20,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false}/>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill:"#5A5A72",fontSize:11}} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
                <YAxis type="category" dataKey="city" axisLine={false} tickLine={false} tick={{fill:"#8B8B9E",fontSize:12}}/>
                <Tooltip content={<TT/>}/>
                <Bar dataKey="revenue" name="revenue" fill="#00D4FF" radius={[0,4,4,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">{DEMO_CITY_PERFORMANCE.map(c=>(
            <div key={c.city} className="pub-card p-4">
              <div className="flex items-center gap-2 mb-2"><MapPin className="w-3.5 h-3.5 text-brand-blue-dark"/><p className="text-sm font-semibold text-text-primary">{c.city}</p></div>
              <p className="text-xl font-bold text-brand-blue-dark" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{formatCurrency(c.revenue)}</p>
              <div className="flex items-center justify-between mt-1"><p className="text-xs text-text-muted">{c.jobs} jobs</p><span className="text-xs font-semibold text-[#22C55E]">+{c.growth}%</span></div>
            </div>
          ))}</div>
        </TabsContent>
        <TabsContent value="crews">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="pub-card p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-5" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Jobs by Crew</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={CREWS} margin={{top:4,right:4,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                  <XAxis dataKey="crew" axisLine={false} tickLine={false} tick={{fill:"#5A5A72",fontSize:11}}/>
                  <YAxis axisLine={false} tickLine={false} tick={{fill:"#5A5A72",fontSize:11}}/>
                  <Tooltip content={<TT/>}/>
                  <Bar dataKey="jobs" name="jobs" radius={[4,4,0,0]}>{CREWS.map((_,i)=><Cell key={i} fill={["#00D4FF","#22C55E","#A855F7"][i]}/>)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="pub-card p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-4" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Crew Summary</h3>
              <div className="space-y-3">{CREWS.map((c,i)=>(
                <div key={c.crew} className="flex items-center gap-4 p-3 rounded-xl bg-surface-100">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{background:`rgba(${i===0?"0,212,255":i===1?"34,197,94":"168,85,247"},0.1)`,color:["#00D4FF","#22C55E","#A855F7"][i]}}>{c.crew[0]}</div>
                  <div className="flex-1"><p className="text-sm font-semibold text-text-primary">{c.crew} Team</p><div className="flex gap-3 mt-0.5 text-xs text-text-muted"><span>{c.jobs} jobs</span><span>{formatCurrency(c.revenue)}</span></div></div>
                </div>
              ))}</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
