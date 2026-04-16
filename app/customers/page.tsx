"use client";
import { useState } from "react";
import { Search, Plus, Star, Mail, Phone, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/Radix";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { DEMO_CUSTOMERS, DEMO_JOBS } from "@/data/demo";
import type { Customer } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/Radix";
import { Input, Label } from "@/components/ui/Inputs";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(DEMO_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Customer|null>(null);
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ firstName:"",lastName:"",email:"",phone:"",city:"" });

  const filtered = customers.filter(c => !search || `${c.firstName} ${c.lastName} ${c.email} ${c.city}`.toLowerCase().includes(search.toLowerCase()));

  function addCustomer() {
    if (!form.firstName||!form.email) return;
    setCustomers(p=>[{ id:`c-${Date.now()}`, ...form, province:"ON", totalSpent:0, jobCount:0, isVIP:false, tags:[], createdAt:new Date().toISOString() },...p]);
    setCreateOpen(false);
    setForm({ firstName:"",lastName:"",email:"",phone:"",city:"" });
  }

  const cJobs = selected ? DEMO_JOBS.filter(j=>j.customer.id===selected.id) : [];

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Customers</h1><p className="text-sm text-text-secondary mt-0.5">{customers.length} total</p></div>
        <button onClick={()=>setCreateOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[#09090F] text-sm font-semibold hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}><Plus className="w-4 h-4"/>Add Customer</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{ l:"Total", v:customers.length, c:"#00D4FF" },{ l:"VIP", v:customers.filter(c=>c.isVIP).length, c:"#F59E0B" },{ l:"Avg Spend", v:formatCurrency(customers.reduce((s,c)=>s+c.totalSpent,0)/customers.length), c:"#22C55E" }].map(s=>(
          <div key={s.l} className="pub-card p-4 text-center"><p className="text-xs text-text-muted uppercase tracking-wide mb-1">{s.l}</p><p className="text-xl font-bold" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",color:s.c }}>{s.v}</p></div>
        ))}
      </div>
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"/><input placeholder="Search customers..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full h-9 rounded-lg border border-border bg-[rgba(255,255,255,0.04)] pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-[#00D4FF]"/></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c=>(
          <div key={c.id} className="pub-card cursor-pointer p-5 cursor-pointer" onClick={()=>{setSelected(c);setOpen(true);}}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10"><AvatarFallback>{getInitials(c.firstName,c.lastName)}</AvatarFallback></Avatar>
                <div>
                  <div className="flex items-center gap-1.5"><p className="text-sm font-semibold text-text-primary">{c.firstName} {c.lastName}</p>{c.isVIP&&<Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/>}</div>
                  <p className="text-xs text-text-muted">{c.city}, {c.province}</p>
                </div>
              </div>
              {c.isVIP&&<Badge variant="vip">VIP</Badge>}
            </div>
            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-2 text-xs text-text-secondary"><Mail className="w-3.5 h-3.5 text-text-muted"/><span className="truncate">{c.email}</span></div>
              {c.phone&&<div className="flex items-center gap-2 text-xs text-text-secondary"><Phone className="w-3.5 h-3.5 text-text-muted"/>{c.phone}</div>}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[rgba(255,255,255,0.05)]">
              <div><p className="text-[10px] text-text-muted uppercase tracking-wide">Spent</p><p className="text-sm font-bold text-brand-blue-dark">{formatCurrency(c.totalSpent)}</p></div>
              <div><p className="text-[10px] text-text-muted uppercase tracking-wide">Jobs</p><p className="text-sm font-bold text-text-primary">{c.jobCount}</p></div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Add Customer</DialogTitle><DialogDescription>Add a new customer.</DialogDescription></DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="space-y-1.5"><Label>First Name *</Label><Input value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} placeholder="Jane"/></div>
            <div className="space-y-1.5"><Label>Last Name</Label><Input value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} placeholder="Doe"/></div>
            <div className="col-span-2 space-y-1.5"><Label>Email *</Label><Input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="jane@example.com"/></div>
            <div className="space-y-1.5"><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="416-555-0000"/></div>
            <div className="space-y-1.5"><Label>City</Label><Input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="Toronto"/></div>
          </div>
          <DialogFooter>
            <button onClick={()=>setCreateOpen(false)} className="px-4 py-2 rounded-lg text-sm text-text-secondary border border-border hover:text-text-primary transition-colors">Cancel</button>
            <button onClick={addCustomer} className="px-4 py-2 rounded-lg text-sm font-semibold text-[#09090F] hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}>Add</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selected&&(
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg"><DialogHeader><DialogTitle>{selected.firstName} {selected.lastName}</DialogTitle><DialogDescription>Customer profile</DialogDescription></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-3 gap-3">
                {[{ l:"Spent",v:formatCurrency(selected.totalSpent),c:"#00D4FF" },{ l:"Jobs",v:selected.jobCount,c:"#22C55E" },{ l:"Avg",v:selected.jobCount>0?formatCurrency(selected.totalSpent/selected.jobCount):"$0",c:"#A855F7" }].map(s=>(
                  <div key={s.l} className="bg-surface-100 rounded-xl p-3 text-center"><p className="text-[10px] text-text-muted uppercase mb-1">{s.l}</p><p className="text-lg font-bold" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",color:s.c }}>{s.v}</p></div>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-text-secondary"><Mail className="w-3.5 h-3.5 text-text-muted"/>{selected.email}</div>
                {selected.phone&&<div className="flex items-center gap-2 text-text-secondary"><Phone className="w-3.5 h-3.5 text-text-muted"/>{selected.phone}</div>}
                {selected.city&&<div className="flex items-center gap-2 text-text-secondary"><MapPin className="w-3.5 h-3.5 text-text-muted"/>{selected.city}, {selected.province}</div>}
              </div>
              {cJobs.length>0&&(
                <div><p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Booking History</p>
                  <div className="space-y-2">
                    {cJobs.slice(0,4).map(j=>(
                      <div key={j.id} className="flex items-center justify-between py-2 px-3 bg-surface-100 rounded-lg text-xs">
                        <div><p className="text-text-primary font-medium">{j.serviceType.replace(/_/g," ")}</p><p className="text-text-muted">{formatDate(j.scheduledAt)}</p></div>
                        <span className="text-text-primary font-semibold">{formatCurrency(j.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter><button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-lg text-sm text-text-secondary border border-border hover:text-text-primary">Close</button></DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
