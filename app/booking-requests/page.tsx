"use client";
import { useState } from "react";
import { Inbox, CheckCircle, ArrowRight, Clock, User, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback } from "@/components/ui/Radix";
import { formatDate, SERVICE_LABELS, getInitials } from "@/lib/utils";
import { DEMO_BOOKING_REQUESTS } from "@/data/demo";
import type { BookingRequest } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useAppStore } from "@/store/useAppStore";

export default function BookingRequestsPage() {
  const { bookingRequests: storeRequests } = useAppStore();
  const [requests, setRequests] = useState<BookingRequest[]>([...DEMO_BOOKING_REQUESTS, ...storeRequests]);

  function updateStatus(id: string, status: BookingRequest["status"]) {
    setRequests(p => p.map(r => r.id===id?{...r,status}:r));
    toast({ title: status==="CONVERTED"?"Converted to booking":"Status updated" });
  }

  const counts = { NEW:requests.filter(r=>r.status==="NEW").length, REVIEWED:requests.filter(r=>r.status==="REVIEWED").length, CONVERTED:requests.filter(r=>r.status==="CONVERTED").length };

  return (
    <div className="max-w-[1000px] mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-text-primary" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Booking Requests</h1>
        <p className="text-sm text-text-secondary mt-0.5">Requests submitted via the public booking page</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{l:"New",v:counts.NEW,c:"#00D4FF"},{l:"Reviewed",v:counts.REVIEWED,c:"#F59E0B"},{l:"Converted",v:counts.CONVERTED,c:"#22C55E"}].map(s=>(
          <div key={s.l} className="pub-card p-4 text-center"><p className="text-xs text-text-muted uppercase tracking-wide mb-1">{s.l}</p><p className="text-2xl font-bold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif",color:s.c}}>{s.v}</p></div>
        ))}
      </div>
      {requests.length===0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center mb-4"><Inbox className="w-6 h-6 text-text-muted"/></div>
          <p className="text-base font-semibold text-text-primary">No booking requests yet</p>
          <p className="text-sm text-text-secondary mt-1">Requests from the public booking page will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((r,i)=>(
            <div key={r.id} className="pub-card cursor-pointer p-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 shrink-0"><AvatarFallback>{getInitials(r.firstName, r.lastName)}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-text-primary">{r.firstName} {r.lastName}</p>
                        <Badge variant={r.status==="NEW"?"new":r.status==="REVIEWED"?"warning":r.status==="CONVERTED"?"success":"secondary"} className="text-[10px]">
                          {r.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{r.email} · {r.phone}</p>
                    </div>
                    <p className="text-xs text-text-muted shrink-0">{formatDate(r.createdAt)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-text-secondary mb-3">
                    <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-text-muted"/>{SERVICE_LABELS[r.serviceType]}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-text-muted"/>Preferred: {formatDate(r.preferredDate)}</div>
                    <div className="flex items-center gap-1.5 col-span-2"><MapPin className="w-3.5 h-3.5 text-text-muted"/>{r.address}, {r.city}</div>
                    {r.notes&&<div className="col-span-2 italic text-text-muted">&ldquo;{r.notes}&rdquo;</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    {r.status==="NEW"&&<button onClick={()=>updateStatus(r.id,"REVIEWED")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#F59E0B] border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.07)] hover:bg-[rgba(245,158,11,0.12)] transition-colors"><Clock className="w-3 h-3"/>Mark Reviewed</button>}
                    {r.status==="REVIEWED"&&<button onClick={()=>updateStatus(r.id,"CONVERTED")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#09090F] hover:opacity-90" style={{background:"linear-gradient(135deg,#00D4FF,#0087A8)"}}><ArrowRight className="w-3 h-3"/>Convert to Booking</button>}
                    {r.status==="CONVERTED"&&<div className="flex items-center gap-1.5 text-xs text-[#22C55E]"><CheckCircle className="w-3.5 h-3.5"/>Converted to job</div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
