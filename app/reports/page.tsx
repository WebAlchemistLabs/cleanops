"use client";
import { useState } from "react";
import { DollarSign,Calendar,Users,TrendingUp,FileSpreadsheet,Loader2,Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Radix";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DEMO_JOBS, DEMO_CUSTOMERS, DEMO_KPIS, DEMO_REVENUE } from "@/data/demo";
import { toast } from "@/hooks/use-toast";

const REPORTS=[
  {id:"jobs",title:"Jobs Summary",desc:"All bookings, statuses, crew assignments, and completion rates.",icon:Calendar,color:"#22C55E"},
  {id:"customers",title:"Customer Report",desc:"Customer list with spend history, retention, and VIP status.",icon:Users,color:"#A855F7"},
  {id:"revenue",title:"Revenue Report",desc:"Monthly revenue breakdown, trends, and service performance.",icon:DollarSign,color:"#00D4FF"},
  {id:"performance",title:"Performance Report",desc:"Staff and crew metrics, ratings, and completion stats.",icon:TrendingUp,color:"#F59E0B"},
];

function downloadCSV(filename:string,rows:string[][],headers:string[]) {
  const csv=[headers,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
  const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"})); a.download=filename; a.click();
}

export default function ReportsPage() {
  const [gen,setGen]=useState<string|null>(null);
  const [period,setPeriod]=useState("last12");

  async function generate(type:string) {
    setGen(type); await new Promise(r=>setTimeout(r,800));
    if (type==="jobs") downloadCSV(`cleanops-jobs-${Date.now()}.csv`,DEMO_JOBS.map(j=>[j.id,`${j.customer.firstName} ${j.customer.lastName}`,j.serviceType,j.status,formatDate(j.scheduledAt),j.city,j.price.toString(),j.crew?.name||"Unassigned"]),["ID","Customer","Service","Status","Date","City","Price","Crew"]);
    else if (type==="customers") downloadCSV(`cleanops-customers-${Date.now()}.csv`,DEMO_CUSTOMERS.map(c=>[c.id,c.firstName,c.lastName,c.email,c.phone||"",c.city||"",c.totalSpent.toString(),c.jobCount.toString(),c.isVIP?"Yes":"No"]),["ID","First","Last","Email","Phone","City","Spent","Jobs","VIP"]);
    else if (type==="revenue") downloadCSV(`cleanops-revenue-${Date.now()}.csv`,DEMO_REVENUE.map(r=>[r.month,r.revenue.toString(),r.jobs.toString(),(r.target||0).toString()]),["Month","Revenue","Jobs","Target"]);
    else downloadCSV(`cleanops-performance-${Date.now()}.csv`,DEMO_REVENUE.map(r=>[r.month,r.revenue.toString(),r.jobs.toString(),(r.revenue/r.jobs).toFixed(0)]),["Month","Revenue","Jobs","Avg Value"]);
    toast({title:"Exported",description:"CSV downloaded."});
    setGen(null);
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text-primary" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Reports</h1><p className="text-sm text-text-secondary mt-0.5">Generate and export business reports</p></div>
        <Select value={period} onValueChange={setPeriod}><SelectTrigger className="w-40"><SelectValue/></SelectTrigger>
          <SelectContent><SelectItem value="last30">Last 30 days</SelectItem><SelectItem value="last90">Last 90 days</SelectItem><SelectItem value="last12">Last 12 months</SelectItem><SelectItem value="ytd">Year to date</SelectItem></SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{l:"Revenue",v:formatCurrency(DEMO_KPIS.totalRevenue),c:"#00D4FF"},{l:"Jobs",v:DEMO_KPIS.totalJobs,c:"#22C55E"},{l:"Avg Value",v:formatCurrency(DEMO_KPIS.avgJobValue),c:"#A855F7"},{l:"Completion",v:`${DEMO_KPIS.completionRate}%`,c:"#F59E0B"}].map(s=>(
          <div key={s.l} className="pub-card p-4 text-center"><p className="text-xs text-text-muted uppercase tracking-wide mb-2">{s.l}</p><p className="text-2xl font-bold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:s.c}}>{s.v}</p></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTS.map(r=>(
          <div key={r.id} className="pub-card cursor-pointer p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:`${r.color}12`,border:`1px solid ${r.color}25`}}><r.icon className="w-5 h-5" style={{color:r.color}}/></div>
              <div><h3 className="text-base font-semibold text-text-primary" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{r.title}</h3><p className="text-xs text-text-secondary mt-0.5">{r.desc}</p></div>
            </div>
            <button onClick={()=>generate(r.id)} disabled={!!gen} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm text-text-secondary hover:text-text-primary hover:border-[rgba(255,255,255,0.2)] transition-all disabled:opacity-40">
              {gen===r.id?<Loader2 className="w-3.5 h-3.5 animate-spin"/>:<FileSpreadsheet className="w-3.5 h-3.5"/>} Export CSV
            </button>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div><h3 className="text-base font-semibold text-text-primary" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Monthly Revenue</h3></div>
          <button onClick={()=>generate("revenue")} disabled={!!gen} className="flex items-center gap-2 text-xs text-brand-blue-dark hover:underline disabled:opacity-40"><Download className="w-3.5 h-3.5"/>Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-[rgba(255,255,255,0.05)]">
              {["Month","Revenue","Jobs","Avg Value","vs Target"].map(h=><th key={h} className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.03)]">
              {[...DEMO_REVENUE].reverse().map(r=>{
                const avg=r.revenue/r.jobs; const vt=r.target?((r.revenue-r.target)/r.target*100):null;
                return (<tr key={r.month} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="px-6 py-3 text-sm font-medium text-text-primary">{r.month}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-brand-blue-dark">{formatCurrency(r.revenue)}</td>
                  <td className="px-6 py-3 text-sm text-text-secondary">{r.jobs}</td>
                  <td className="px-6 py-3 text-sm text-text-secondary">{formatCurrency(avg)}</td>
                  <td className="px-6 py-3">{vt!==null&&<Badge variant={vt>=0?"success":"error"}>{vt>=0?"+":""}{vt.toFixed(1)}%</Badge>}</td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
