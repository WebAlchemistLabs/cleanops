"use client";
import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Search, Plus, Filter, Calendar, MapPin, Users, Clock, CreditCard, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/Radix";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge, ServiceBadge, PaymentBadge } from "@/components/shared/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Radix";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/Radix";
import { Input, Label, Textarea } from "@/components/ui/Inputs";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatCurrency, formatDateTime, formatDate, getInitials, SERVICE_LABELS, STATUS_LABELS } from "@/lib/utils";
import { DEMO_JOBS, DEMO_CUSTOMERS, DEMO_CREWS } from "@/data/demo";
import type { Job, JobStatus, ServiceType } from "@/types";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

const STATUS_TABS = ["ALL","PENDING","CONFIRMED","IN_PROGRESS","COMPLETED","CANCELLED","RESCHEDULED"];
const SVC_FILTERS = ["ALL","STANDARD","DEEP_CLEAN","MOVE_IN_OUT","OFFICE","POST_CONSTRUCTION","AIRBNB"];

export default function JobsPage() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;
  const isAdmin = role === "ADMIN" || role === "MANAGER";

  const [jobs, setJobs] = useState<Job[]>(
    isAdmin ? DEMO_JOBS : DEMO_JOBS.filter(j => j.customer.id === "c-001")
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [svcFilter, setSvcFilter] = useState("ALL");
  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<Job | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const [form, setForm] = useState({ customerId:"", serviceType:"STANDARD", scheduledAt:"", duration:120, address:"", city:"", price:"", notes:"", crewId:"", recurrence:"NONE" });

  const filtered = useMemo(() => jobs.filter(j => {
    const ms = !search || `${j.customer.firstName} ${j.customer.lastName} ${j.city} ${j.address}`.toLowerCase().includes(search.toLowerCase());
    return ms && (statusFilter==="ALL"||j.status===statusFilter) && (svcFilter==="ALL"||j.serviceType===svcFilter);
  }), [jobs, search, statusFilter, svcFilter]);

  const counts = useMemo(() => {
    const c: Record<string,number> = { ALL: jobs.length };
    jobs.forEach(j => { c[j.status]=(c[j.status]||0)+1; });
    return c;
  }, [jobs]);

  function handleCreate() {
    if (!form.customerId||!form.scheduledAt||!form.address||!form.price) {
      toast({ title:"Missing fields", description:"Fill in all required fields.", variant:"destructive" }); return;
    }
    const c = DEMO_CUSTOMERS.find(x=>x.id===form.customerId);
    if (!c) return;
    const crew = form.crewId ? DEMO_CREWS.find(x=>x.id===form.crewId) : null;
    const job: Job = {
      id:`job-${Date.now()}`, serviceType:form.serviceType as ServiceType, status:"PENDING",
      scheduledAt: new Date(form.scheduledAt).toISOString(), price:parseFloat(form.price),
      address:form.address, city:form.city, province:"ON", duration:form.duration,
      recurrence:form.recurrence as any, notes:form.notes||null, paid:false,
      customer:{ id:c.id, firstName:c.firstName, lastName:c.lastName, email:c.email, phone:c.phone },
      crew: crew ? { id:crew.id, name:crew.name } : null,
    };
    setJobs(p=>[job,...p]);
    setCreateOpen(false);
    toast({ title:"Job created", description:`Booking scheduled for ${c.firstName} ${c.lastName}.` });
    setForm({ customerId:"", serviceType:"STANDARD", scheduledAt:"", duration:120, address:"", city:"", price:"", notes:"", crewId:"", recurrence:"NONE" });
  }

  function updateStatus(id: string, status: JobStatus) {
    setJobs(p=>p.map(j=>j.id===id?{...j,status}:j));
    if (selected?.id===id) setSelected(s=>s?{...s,status}:s);
    toast({ title:"Status updated", description:`Moved to ${STATUS_LABELS[status]}.` });
  }

  async function payNow(job: Job) {
    setPaying(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ jobId:job.id, invoiceId:`inv-${job.id}`, customerId:job.customer.id, amount:job.price, serviceName:SERVICE_LABELS[job.serviceType] }),
      });
      const data = await res.json();
      if (data.demo) {
        await new Promise(r=>setTimeout(r,700));
        setJobs(p=>p.map(j=>j.id===job.id?{...j,paid:true}:j));
        if (selected?.id===job.id) setSelected(s=>s?{...s,paid:true}:s);
        toast({ title:"Payment confirmed!", description:`${formatCurrency(job.price)} paid (demo mode).` });
      } else if (data.url) { window.location.href = data.url; }
    } catch { toast({ title:"Payment error", variant:"destructive" }); }
    setPaying(false);
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            {isAdmin ? "Jobs & Bookings" : "My Bookings"}
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">{jobs.length} total</p>
        </div>
        <div className="flex gap-2">
          {!isAdmin && <Link href="/book" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[#09090F] text-sm font-semibold hover:opacity-90 shadow-[0_0_16px_rgba(0,212,255,0.25)]" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}><Plus className="w-4 h-4" />Book a Clean</Link>}
          {isAdmin && <button onClick={()=>setCreateOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[#09090F] text-sm font-semibold hover:opacity-90 shadow-[0_0_16px_rgba(0,212,255,0.25)]" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}><Plus className="w-4 h-4" />New Booking</button>}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {STATUS_TABS.map(s=>(
          <button key={s} onClick={()=>setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all ${statusFilter===s?"bg-brand-blue-light text-brand-blue-dark border-[rgba(0,212,255,0.3)]":"text-text-secondary border-border hover:text-text-primary"}`}>
            {s==="ALL"?"All Jobs":STATUS_LABELS[s]} <span className="opacity-50 ml-1">{counts[s]||0}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input placeholder="Search by name, city, address..." value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full h-9 rounded-lg border border-border bg-[rgba(255,255,255,0.04)] pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-[#00D4FF]" />
        </div>
        {isAdmin && (
          <Select value={svcFilter} onValueChange={setSvcFilter}>
            <SelectTrigger className="w-44 h-9"><Filter className="w-3.5 h-3.5 mr-1.5 text-text-muted" /><SelectValue /></SelectTrigger>
            <SelectContent>
              {SVC_FILTERS.map(s=><SelectItem key={s} value={s}>{s==="ALL"?"All Services":SERVICE_LABELS[s]}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      </div>

      {filtered.length===0 ? (
        <EmptyState icon={Calendar} title="No bookings found" description="Try adjusting your filters." action={isAdmin ? { label:"New Booking", onClick:()=>setCreateOpen(true) } : undefined} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((job,i)=>(
            <div key={job.id} className="pub-card cursor-pointer p-5 cursor-pointer" style={{ animationDelay:`${i*30}ms` }} onClick={()=>{ setSelected(job); setDetailOpen(true); }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-8 w-8"><AvatarFallback className="text-[10px]">{getInitials(job.customer.firstName,job.customer.lastName)}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{job.customer.firstName} {job.customer.lastName}</p>
                    <p className="text-[10px] text-text-muted">#{job.id.slice(-5)}</p>
                  </div>
                </div>
                <StatusBadge status={job.status} />
              </div>
              <div className="mb-3"><ServiceBadge type={job.serviceType} /></div>
              <div className="space-y-1.5 text-xs text-text-secondary">
                <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-text-muted" />{formatDateTime(job.scheduledAt)}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-text-muted" /><span className="truncate">{job.address}, {job.city}</span></div>
                <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-text-muted" />{job.duration} min {job.recurrence!=="NONE" && <Badge variant="secondary" className="text-[9px] px-1.5 ml-1">{job.recurrence.toLowerCase()}</Badge>}</div>
                {job.crew && <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-text-muted" />{job.crew.name}</div>}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                <span className="text-lg font-bold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{formatCurrency(job.price)}</span>
                {job.status==="COMPLETED"||job.paid ? <PaymentBadge paid={true} />
                : job.status!=="CANCELLED" ? (
                  <button onClick={e=>{e.stopPropagation();payNow(job);}} disabled={paying} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#09090F] hover:opacity-90 disabled:opacity-50" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}>
                    {paying?<Loader2 className="w-3 h-3 animate-spin"/>:<CreditCard className="w-3 h-3"/>} Pay
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      {isAdmin && (
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>New Booking</DialogTitle><DialogDescription>Schedule a new cleaning job.</DialogDescription></DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="col-span-2 space-y-1.5"><Label>Customer *</Label>
                <Select value={form.customerId} onValueChange={v=>setForm({...form,customerId:v})}>
                  <SelectTrigger><SelectValue placeholder="Select customer"/></SelectTrigger>
                  <SelectContent>{DEMO_CUSTOMERS.map(c=><SelectItem key={c.id} value={c.id}>{c.firstName} {c.lastName}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Service *</Label>
                <Select value={form.serviceType} onValueChange={v=>setForm({...form,serviceType:v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>{Object.entries(SERVICE_LABELS).map(([k,v])=><SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Recurrence</Label>
                <Select value={form.recurrence} onValueChange={v=>setForm({...form,recurrence:v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">One-time</SelectItem>
                    <SelectItem value="WEEKLY">Weekly</SelectItem>
                    <SelectItem value="BIWEEKLY">Bi-weekly</SelectItem>
                    <SelectItem value="MONTHLY">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-1.5"><Label>Date & Time *</Label><Input type="datetime-local" value={form.scheduledAt} onChange={e=>setForm({...form,scheduledAt:e.target.value})} /></div>
              <div className="space-y-1.5"><Label>Duration (min)</Label><Input type="number" value={form.duration} onChange={e=>setForm({...form,duration:parseInt(e.target.value)})} /></div>
              <div className="space-y-1.5"><Label>Price (CAD) *</Label><Input type="number" placeholder="0.00" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} /></div>
              <div className="col-span-2 space-y-1.5"><Label>Address *</Label><Input placeholder="123 Main St" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></div>
              <div className="space-y-1.5"><Label>City</Label><Input placeholder="Toronto" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></div>
              <div className="space-y-1.5"><Label>Assign Crew</Label>
                <Select value={form.crewId} onValueChange={v=>setForm({...form,crewId:v})}>
                  <SelectTrigger><SelectValue placeholder="Unassigned"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {DEMO_CREWS.map(c=><SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-1.5"><Label>Notes</Label><Textarea placeholder="Special instructions..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} /></div>
            </div>
            <DialogFooter>
              <button onClick={()=>setCreateOpen(false)} className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary border border-border hover:border-[rgba(255,255,255,0.2)] transition-all">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 rounded-lg text-sm font-semibold text-[#09090F] hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}>Create Booking</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Detail Dialog */}
      {selected && (
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Job #{selected.id.slice(-5)}</DialogTitle><DialogDescription>Booking details</DialogDescription></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10"><AvatarFallback>{getInitials(selected.customer.firstName,selected.customer.lastName)}</AvatarFallback></Avatar>
                <div><p className="font-semibold text-text-primary">{selected.customer.firstName} {selected.customer.lastName}</p><p className="text-xs text-text-muted">{selected.customer.email}</p></div>
                <div className="ml-auto flex gap-2"><StatusBadge status={selected.status}/></div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Service</p><ServiceBadge type={selected.serviceType}/></div>
                <div><p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Price</p><p className="font-bold text-lg text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{formatCurrency(selected.price)}</p></div>
                <div><p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Scheduled</p><p className="text-text-primary text-xs">{formatDateTime(selected.scheduledAt)}</p></div>
                <div><p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Duration</p><p className="text-text-primary text-xs">{selected.duration} min</p></div>
                <div className="col-span-2"><p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Location</p><p className="text-text-primary text-xs">{selected.address}, {selected.city}</p></div>
                {selected.crew&&<div><p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Crew</p><p className="text-text-primary text-xs">{selected.crew.name}</p></div>}
                {selected.notes&&<div className="col-span-2"><p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Notes</p><p className="text-text-secondary text-xs">{selected.notes}</p></div>}
              </div>
              <div className="pt-3 border-t border-border space-y-3">
                <div className="flex items-center justify-between"><p className="text-xs font-semibold text-text-primary">Payment</p><PaymentBadge paid={selected.paid}/></div>
                {!selected.paid && selected.status!=="CANCELLED" && (
                  <button onClick={()=>{setDetailOpen(false);payNow(selected);}} disabled={paying} className="w-full h-10 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm text-[#09090F] hover:opacity-90 disabled:opacity-50" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}>
                    {paying?<Loader2 className="w-4 h-4 animate-spin"/>:<CreditCard className="w-4 h-4"/>} Pay {formatCurrency(selected.price)} via Stripe
                  </button>
                )}
              </div>
              {isAdmin && (
                <div className="space-y-1.5 pt-2 border-t border-border">
                  <Label>Update Status</Label>
                  <Select value={selected.status} onValueChange={v=>updateStatus(selected.id,v as JobStatus)}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      {(["PENDING","CONFIRMED","IN_PROGRESS","COMPLETED","CANCELLED","RESCHEDULED"] as JobStatus[]).map(s=><SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <button onClick={()=>setDetailOpen(false)} className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary border border-border transition-all">Close</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
