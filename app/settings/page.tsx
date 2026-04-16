"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { User, Building2, Bell, Shield, Save, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Radix";
import { Switch, Separator, Avatar, AvatarFallback } from "@/components/ui/Radix";
import { Badge } from "@/components/ui/Badge";
import { Input, Label } from "@/components/ui/Inputs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Radix";
import { DEMO_ORG } from "@/data/demo";
import { getInitials } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { data:session } = useSession();
  const role = (session?.user as any)?.role;
  const isAdmin = role==="ADMIN"||role==="MANAGER";
  const name = session?.user?.name||"User";
  const initials = getInitials(name.split(" ")[0], name.split(" ")[1]||"X");
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ newBooking:true, jobCompleted:true, payment:true, cancellation:true, staffAlert:false, weekly:true });

  function save() {
    setSaved(true);
    toast({ title:"Settings saved", description:"Your changes have been applied." });
    setTimeout(()=>setSaved(false),2000);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Settings</h1>
        <p className="text-sm text-text-secondary mt-0.5">Manage your account and preferences</p>
      </div>
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="gap-2"><User className="w-3.5 h-3.5"/>Profile</TabsTrigger>
          {isAdmin&&<TabsTrigger value="business" className="gap-2"><Building2 className="w-3.5 h-3.5"/>Business</TabsTrigger>}
          <TabsTrigger value="notifications" className="gap-2"><Bell className="w-3.5 h-3.5"/>Notifications</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="w-3.5 h-3.5"/>Security</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="pub-card p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16"><AvatarFallback className="text-xl">{initials}</AvatarFallback></Avatar>
              <div>
                <p className="font-semibold text-text-primary">{name}</p>
                <p className="text-sm text-text-muted">{session?.user?.email}</p>
                <Badge variant={isAdmin?"info":"success"} className="mt-1.5">{role}</Badge>
              </div>
            </div>
            <Separator/>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Full Name</Label><Input defaultValue={name}/></div>
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue={session?.user?.email||""}/></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input placeholder="416-555-0000"/></div>
              <div className="space-y-1.5"><Label>Role</Label><Input value={role||""} disabled className="opacity-50"/></div>
            </div>
            <div className="flex justify-end"><button onClick={save} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#09090F] hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}>{saved?<Check className="w-4 h-4"/>:<Save className="w-4 h-4"/>}{saved?"Saved!":"Save Changes"}</button></div>
          </div>
        </TabsContent>
        {isAdmin&&(
          <TabsContent value="business">
            <div className="pub-card p-6 space-y-6">
              <div><h3 className="text-base font-semibold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Business Information</h3><p className="text-xs text-text-muted mt-0.5">Update your cleaning business details</p></div>
              <Separator/>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5"><Label>Business Name</Label><Input defaultValue={DEMO_ORG.name}/></div>
                <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue={DEMO_ORG.email||""}/></div>
                <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue={DEMO_ORG.phone||""}/></div>
                <div className="col-span-2 space-y-1.5"><Label>Address</Label><Input defaultValue={DEMO_ORG.address||""}/></div>
                <div className="space-y-1.5"><Label>City</Label><Input defaultValue={DEMO_ORG.city}/></div>
                <div className="space-y-1.5"><Label>Province</Label>
                  <Select defaultValue={DEMO_ORG.province}><SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>{["ON","BC","AB","QC","MB","SK"].map(p=><SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end"><button onClick={save} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#09090F] hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}>{saved?<Check className="w-4 h-4"/>:<Save className="w-4 h-4"/>}{saved?"Saved!":"Save Changes"}</button></div>
            </div>
          </TabsContent>
        )}
        <TabsContent value="notifications">
          <div className="pub-card p-6 space-y-6">
            <div><h3 className="text-base font-semibold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Notification Preferences</h3></div>
            <Separator/>
            <div className="space-y-4">
              {[
                {k:"newBooking",l:"New Booking",d:"Alert when a new booking request is submitted"},
                {k:"jobCompleted",l:"Job Completed",d:"Notify when a cleaning job is marked complete"},
                {k:"payment",l:"Payment Received",d:"Alert on successful payments"},
                {k:"cancellation",l:"Cancellation",d:"Notify on job cancellations"},
                ...(isAdmin?[{k:"staffAlert",l:"Staff Alerts",d:"Staff status changes and availability"},{k:"weekly",l:"Weekly Summary",d:"Weekly business performance email"}]:[]),
              ].map(s=>(
                <div key={s.k} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                  <div><p className="text-sm font-medium text-text-primary">{s.l}</p><p className="text-xs text-text-muted mt-0.5">{s.d}</p></div>
                  <Switch checked={notifs[s.k as keyof typeof notifs]} onCheckedChange={()=>setNotifs(p=>({...p,[s.k]:!p[s.k as keyof typeof notifs]}))}/>
                </div>
              ))}
            </div>
            <div className="flex justify-end"><button onClick={save} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#09090F] hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}>{saved?<Check className="w-4 h-4"/>:<Save className="w-4 h-4"/>}{saved?"Saved!":"Save Preferences"}</button></div>
          </div>
        </TabsContent>
        <TabsContent value="security">
          <div className="pub-card p-6 space-y-6">
            <div><h3 className="text-base font-semibold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Security</h3></div>
            <Separator/>
            <div className="space-y-4">
              <div className="space-y-1.5"><Label>Current Password</Label><Input type="password" placeholder="••••••••"/></div>
              <div className="space-y-1.5"><Label>New Password</Label><Input type="password" placeholder="Min 8 characters"/></div>
              <div className="space-y-1.5"><Label>Confirm New Password</Label><Input type="password" placeholder="Repeat password"/></div>
            </div>
            <div className="p-4 rounded-xl bg-surface-100 border border-border">
              <p className="text-xs font-semibold text-text-primary mb-1">Demo Mode</p>
              <p className="text-xs text-text-muted">Password changes are disabled in demo mode. Connect a real database and set DEMO_MODE=false to enable.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
