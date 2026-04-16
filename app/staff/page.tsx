"use client";
import { Star, Users, Mail, Award, CheckCircle, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/Radix";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Radix";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { DEMO_STAFF, DEMO_CREWS } from "@/data/demo";

export default function StaffPage() {
  const active = DEMO_STAFF.filter(s=>s.isActive).length;
  const avg = (DEMO_STAFF.filter(s=>s.isActive).reduce((s,m)=>s+m.rating,0)/active).toFixed(1);
  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Staff & Crews</h1><p className="text-sm text-text-secondary mt-0.5">{DEMO_STAFF.length} staff · {DEMO_CREWS.length} crews</p></div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[#09090F] text-sm font-semibold hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}><Plus className="w-4 h-4"/>Add Staff</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ l:"Total Staff",v:DEMO_STAFF.length,c:"#00D4FF",I:Users },{ l:"Active",v:active,c:"#22C55E",I:CheckCircle },{ l:"Avg Rating",v:avg,c:"#F59E0B",I:Star },{ l:"Total Jobs",v:DEMO_STAFF.reduce((s,m)=>s+m.jobsCompleted,0),c:"#A855F7",I:Award }].map(s=>(
          <div key={s.l} className="pub-card p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:`${s.c}15`,border:`1px solid ${s.c}25` }}><s.I className="w-4 h-4" style={{ color:s.c }}/></div>
            <div><p className="text-xs text-text-muted uppercase tracking-wide">{s.l}</p><p className="text-xl font-bold" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",color:s.c }}>{s.v}</p></div>
          </div>
        ))}
      </div>
      <Tabs defaultValue="staff">
        <TabsList className="mb-4"><TabsTrigger value="staff">Staff Members</TabsTrigger><TabsTrigger value="crews">Crews</TabsTrigger></TabsList>
        <TabsContent value="staff">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {DEMO_STAFF.map((m,i)=>(
              <div key={m.id} className="pub-card cursor-pointer p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-11 w-11"><AvatarFallback>{getInitials(m.firstName,m.lastName)}</AvatarFallback></Avatar>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#111119] ${m.isActive?"bg-[#22C55E]":"bg-surface-300"}`}/>
                    </div>
                    <div><p className="text-sm font-semibold text-text-primary">{m.firstName} {m.lastName}</p><p className="text-xs text-text-muted">{m.role}</p></div>
                  </div>
                  <Badge variant={m.isActive?"success":"secondary"}>{m.isActive?"Active":"Inactive"}</Badge>
                </div>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-text-secondary"><Users className="w-3.5 h-3.5 text-text-muted"/>{m.crew}</div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary"><Mail className="w-3.5 h-3.5 text-text-muted"/><span className="truncate">{m.email}</span></div>
                  {m.hireDate&&<div className="flex items-center gap-2 text-xs text-text-secondary"><Award className="w-3.5 h-3.5 text-text-muted"/>Since {formatDate(m.hireDate)}</div>}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                  <div className="text-center"><p className="text-[10px] text-text-muted uppercase">Jobs</p><p className="text-sm font-bold text-text-primary mt-0.5">{m.jobsCompleted}</p></div>
                  <div className="text-center"><p className="text-[10px] text-text-muted uppercase">Rating</p><div className="flex justify-center items-center gap-1 mt-0.5"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/><span className="text-xs font-bold text-text-primary">{m.rating}</span></div></div>
                  <div className="text-center"><p className="text-[10px] text-text-muted uppercase">Revenue</p><p className="text-sm font-bold text-brand-blue-dark mt-0.5">{m.revenue?`$${(m.revenue/1000).toFixed(0)}k`:"—"}</p></div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="crews">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {DEMO_CREWS.map((c,i)=>(
              <div key={c.id} className="pub-card cursor-pointer p-6">
                <div className="flex items-start justify-between mb-5">
                  <div><h3 className="text-lg font-bold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{c.name}</h3><p className="text-xs text-text-muted mt-0.5">{c.memberCount} members</p></div>
                  <Badge variant={c.isActive?"success":"secondary"}>{c.isActive?"Active":"Inactive"}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[{ l:"Jobs",v:c.jobsCompleted,c:"#EFEFF4" },{ l:"Rating",v:c.rating.toFixed(1),c:"#F59E0B" },{ l:"Revenue",v:`$${(c.revenue/1000).toFixed(0)}k`,c:"#00D4FF" }].map(s=>(
                    <div key={s.l} className="bg-surface-100 rounded-xl p-3 text-center"><p className="text-[10px] text-text-muted uppercase">{s.l}</p><p className="text-lg font-bold mt-1" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",color:s.c }}>{s.v}</p></div>
                  ))}
                </div>
                <div><p className="text-xs text-text-muted uppercase tracking-wide mb-2">Members</p>
                  <div className="space-y-2">
                    {c.members.map(m=>(
                      <div key={m.id} className="flex items-center gap-2.5 py-1.5">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-[9px]">{getInitials(m.firstName,m.lastName)}</AvatarFallback></Avatar>
                        <div className="flex-1 min-w-0"><p className="text-xs font-medium text-text-primary">{m.firstName} {m.lastName}</p><p className="text-[10px] text-text-muted">{m.role}</p></div>
                        <div className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/><span className="text-xs font-bold text-text-primary">{m.rating}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
