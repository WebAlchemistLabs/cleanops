"use client";
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { formatRelative } from "@/lib/utils";
import type { NotifType } from "@/types";

const CFG: Record<NotifType,{icon:any;color:string;bg:string}> = {
  info:{icon:Info,color:"#00D4FF",bg:"rgba(0,212,255,0.08)"},
  success:{icon:CheckCircle,color:"#22C55E",bg:"rgba(34,197,94,0.08)"},
  warning:{icon:AlertTriangle,color:"#F59E0B",bg:"rgba(245,158,11,0.08)"},
  error:{icon:XCircle,color:"#EF4444",bg:"rgba(239,68,68,0.08)"},
};

export default function NotificationsPage() {
  const { notifications, markRead, markAllRead } = useAppStore();
  const unread = notifications.filter(n=>!n.read).length;
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Notifications</h1>
          <p className="text-sm text-text-secondary mt-0.5">{unread>0?`${unread} unread`:"All caught up"}</p>
        </div>
        {unread>0&&<button onClick={markAllRead} className="flex items-center gap-2 text-xs text-brand-blue-dark hover:underline"><CheckCheck className="w-4 h-4"/>Mark all read</button>}
      </div>
      {notifications.length===0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center mb-4"><Bell className="w-6 h-6 text-text-muted"/></div>
          <p className="text-base font-semibold text-text-primary">No notifications</p>
          <p className="text-sm text-text-secondary mt-1">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n,i)=>{
            const cfg=CFG[n.type]; const Icon=cfg.icon;
            return (
              <div key={n.id} className={`pub-card cursor-pointer p-4 cursor-pointer flex items-start gap-4 ${!n.read?"border-l-2 border-l-[#00D4FF]":""}`} onClick={()=>markRead(n.id)}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:cfg.bg }}><Icon className="w-4 h-4" style={{ color:cfg.color }}/></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold leading-snug ${n.read?"text-text-secondary":"text-text-primary"}`}>{n.title}</p>
                    {!n.read&&<span className="cyan-dot mt-1 shrink-0"/>}
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-text-muted mt-1.5">{formatRelative(n.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
