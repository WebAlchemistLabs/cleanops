"use client";
import { useState } from "react";
import { Plus, CheckCircle, XCircle, ArrowRight, Loader2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback } from "@/components/ui/Radix";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/Radix";
import { Input, Label, Textarea } from "@/components/ui/Inputs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Radix";
import { formatCurrency, formatDate, SERVICE_LABELS, getInitials } from "@/lib/utils";
import { DEMO_CUSTOMERS, DEMO_QUOTES } from "@/data/demo";
import type { Quote, QuoteStatus } from "@/types";
import { toast } from "@/hooks/use-toast";

const STATUS_CFG: Record<QuoteStatus,{label:string;variant:any;icon:any}> = {
  PENDING:{label:"Pending",variant:"warning",icon:Clock},
  SENT:{label:"Sent",variant:"info",icon:ArrowRight},
  APPROVED:{label:"Approved",variant:"success",icon:CheckCircle},
  REJECTED:{label:"Rejected",variant:"error",icon:XCircle},
  CONVERTED:{label:"Converted",variant:"purple",icon:CheckCircle},
};

export default function QuotesPage() {
  const [quotes,setQuotes]=useState<Quote[]>(DEMO_QUOTES);
  const [createOpen,setCreateOpen]=useState(false);
  const [converting,setConverting]=useState<string|null>(null);
  const [form,setForm]=useState({customerId:"",serviceType:"STANDARD",address:"",city:"",estimatedPrice:"",notes:"",validDays:"14"});

  function handleCreate() {
    if (!form.customerId||!form.address||!form.estimatedPrice){toast({title:"Missing fields",variant:"destructive"});return;}
    const c=DEMO_CUSTOMERS.find(x=>x.id===form.customerId); if (!c) return;
    const q:Quote={id:`q-${Date.now()}`,customerName:`${c.firstName} ${c.lastName}`,customerEmail:c.email,serviceType:form.serviceType as any,address:form.address,city:form.city||c.city||"Toronto",estimatedPrice:parseFloat(form.estimatedPrice),notes:form.notes,status:"PENDING",createdAt:new Date().toISOString(),validUntil:new Date(Date.now()+parseInt(form.validDays)*86400000).toISOString()};
    setQuotes(p=>[q,...p]); setCreateOpen(false);
    toast({title:"Quote created"}); setForm({customerId:"",serviceType:"STANDARD",address:"",city:"",estimatedPrice:"",notes:"",validDays:"14"});
  }

  function updateStatus(id:string,status:QuoteStatus){setQuotes(p=>p.map(q=>q.id===id?{...q,status}:q));toast({title:`Quote ${status.toLowerCase()}`});}

  async function convert(q:Quote){
    setConverting(q.id); await new Promise(r=>setTimeout(r,900));
    setQuotes(p=>p.map(x=>x.id===q.id?{...x,status:"CONVERTED",convertedJobId:`job-${Date.now()}`}:x));
    toast({title:"Booking created!",description:`Job created for ${q.customerName}.`});
    setConverting(null);
  }

  const totalValue=quotes.filter(q=>["APPROVED","CONVERTED"].includes(q.status)).reduce((s,q)=>s+q.estimatedPrice,0);

  return (
    <div className="max-w-[1100px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text-primary" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Quotes</h1><p className="text-sm text-text-secondary mt-0.5">Manage price quotes and convert to bookings</p></div>
        <button onClick={()=>setCreateOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[#09090F] text-sm font-semibold hover:opacity-90" style={{background:"linear-gradient(135deg,#00D4FF,#0087A8)"}}><Plus className="w-4 h-4"/>New Quote</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{l:"Total",v:quotes.length,c:"#00D4FF"},{l:"Pending",v:quotes.filter(q=>q.status==="PENDING").length,c:"#F59E0B"},{l:"Approved",v:quotes.filter(q=>q.status==="APPROVED").length,c:"#22C55E"},{l:"Pipeline",v:formatCurrency(totalValue),c:"#A855F7"}].map(s=>(
          <div key={s.l} className="pub-card p-4 text-center"><p className="text-xs text-text-muted uppercase mb-1">{s.l}</p><p className="text-xl font-bold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:s.c}}>{s.v}</p></div>
        ))}
      </div>
      <div className="space-y-3">
        {quotes.map(q=>{
          const cfg=STATUS_CFG[q.status]; const SI=cfg.icon;
          return (
            <div key={q.id} className="pub-card cursor-pointer p-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 shrink-0"><AvatarFallback>{getInitials(q.customerName.split(" ")[0],q.customerName.split(" ")[1]||"X")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="flex items-center gap-2"><p className="text-sm font-semibold text-text-primary">{q.customerName}</p><Badge variant={cfg.variant} className="text-[10px]"><SI className="w-3 h-3"/>{cfg.label}</Badge></div>
                      <p className="text-xs text-text-muted mt-0.5">{SERVICE_LABELS[q.serviceType]} · {q.address}, {q.city}</p>
                      <p className="text-xs text-text-muted">Created {formatDate(q.createdAt)} · Valid until {formatDate(q.validUntil)}</p>
                      {q.notes&&<p className="text-xs text-text-muted mt-1 italic">&ldquo;{q.notes}&rdquo;</p>}
                    </div>
                    <p className="text-xl font-bold text-text-primary shrink-0 ml-4" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{formatCurrency(q.estimatedPrice)}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {q.status==="PENDING"&&<button onClick={()=>updateStatus(q.id,"SENT")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-brand-blue-dark border border-brand-blue/25 bg-[rgba(0,212,255,0.07)] hover:bg-[rgba(0,212,255,0.12)] transition-colors"><ArrowRight className="w-3 h-3"/>Send to Customer</button>}
                    {q.status==="SENT"&&<><button onClick={()=>updateStatus(q.id,"APPROVED")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#22C55E] border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.07)] hover:bg-[rgba(34,197,94,0.12)] transition-colors"><CheckCircle className="w-3 h-3"/>Approve</button><button onClick={()=>updateStatus(q.id,"REJECTED")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#EF4444] border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.07)] hover:bg-[rgba(239,68,68,0.12)] transition-colors"><XCircle className="w-3 h-3"/>Reject</button></>}
                    {q.status==="APPROVED"&&<button onClick={()=>convert(q)} disabled={converting===q.id} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-[#09090F] hover:opacity-90" style={{background:"linear-gradient(135deg,#00D4FF,#0087A8)"}}>{converting===q.id?<Loader2 className="w-3 h-3 animate-spin"/>:<ArrowRight className="w-3 h-3"/>}Convert to Booking</button>}
                    {q.status==="CONVERTED"&&<div className="flex items-center gap-1.5 text-xs text-[#22C55E]"><CheckCircle className="w-3.5 h-3.5"/>Converted to job #{q.convertedJobId?.slice(-6)}</div>}
                    {q.status==="REJECTED"&&<button onClick={()=>updateStatus(q.id,"PENDING")} className="text-xs text-text-secondary hover:text-text-primary transition-colors">Reopen</button>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>Create Quote</DialogTitle><DialogDescription>Generate a price quote for a customer.</DialogDescription></DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="col-span-2 space-y-1.5"><Label>Customer *</Label><Select value={form.customerId} onValueChange={v=>setForm({...form,customerId:v})}><SelectTrigger><SelectValue placeholder="Select customer"/></SelectTrigger><SelectContent>{DEMO_CUSTOMERS.map(c=><SelectItem key={c.id} value={c.id}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Service *</Label><Select value={form.serviceType} onValueChange={v=>setForm({...form,serviceType:v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{Object.entries(SERVICE_LABELS).map(([k,v])=><SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Est. Price (CAD) *</Label><Input type="number" placeholder="0.00" value={form.estimatedPrice} onChange={e=>setForm({...form,estimatedPrice:e.target.value})}/></div>
            <div className="col-span-2 space-y-1.5"><Label>Address *</Label><Input placeholder="123 Main St" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></div>
            <div className="space-y-1.5"><Label>City</Label><Input placeholder="Toronto" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></div>
            <div className="space-y-1.5"><Label>Valid For (days)</Label><Select value={form.validDays} onValueChange={v=>setForm({...form,validDays:v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{["7","14","30","60"].map(d=><SelectItem key={d} value={d}>{d} days</SelectItem>)}</SelectContent></Select></div>
            <div className="col-span-2 space-y-1.5"><Label>Notes</Label><Textarea placeholder="Scope, special requirements..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div>
          </div>
          <DialogFooter>
            <button onClick={()=>setCreateOpen(false)} className="px-4 py-2 rounded-lg text-sm text-text-secondary border border-border hover:text-text-primary transition-colors">Cancel</button>
            <button onClick={handleCreate} className="px-4 py-2 rounded-lg text-sm font-semibold text-[#09090F] hover:opacity-90" style={{background:"linear-gradient(135deg,#00D4FF,#0087A8)"}}>Create Quote</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
