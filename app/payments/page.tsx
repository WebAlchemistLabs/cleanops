"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CreditCard, CheckCircle, Clock, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Radix";
import { Badge } from "@/components/ui/Badge";
import { PaymentBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, SERVICE_LABELS } from "@/lib/utils";
import { DEMO_JOBS } from "@/data/demo";
import { toast } from "@/hooks/use-toast";

const INVOICES = DEMO_JOBS.map(j => ({
  id: `inv-${j.id}`, jobId: j.id, job: j,
  amount: j.price, depositAmount: Math.round(j.price*0.25),
  paid: j.paid || j.status==="COMPLETED",
  dueDate: new Date(Date.now()+86400000*7).toISOString(),
  overdue: j.status==="CANCELLED",
}));

function InvoiceRow({ inv, isAdmin }: { inv: typeof INVOICES[0]; isAdmin: boolean }) {
  const [paid, setPaid] = useState(inv.paid);
  const [paying, setPaying] = useState(false);
  const [refunding, setRefunding] = useState(false);

  async function pay(deposit=false) {
    setPaying(true);
    const res = await fetch("/api/stripe/checkout", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ jobId:inv.jobId, invoiceId:inv.id, customerId:inv.job.customer.id, amount:deposit?inv.depositAmount:inv.amount, serviceName:SERVICE_LABELS[inv.job.serviceType], depositOnly:deposit }),
    });
    const data = await res.json();
    if (data.demo) {
      await new Promise(r=>setTimeout(r,700));
      setPaid(true);
      toast({ title:"Payment confirmed!", description:`${formatCurrency(deposit?inv.depositAmount:inv.amount)} paid (demo mode).` });
    } else if (data.url) { window.location.href=data.url; }
    setPaying(false);
  }

  async function refund() {
    setRefunding(true);
    const res = await fetch("/api/stripe/refund",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ paymentIntentId:"pi_demo", invoiceId:inv.id, amount:inv.amount }) });
    const data = await res.json();
    if (data.success) { setPaid(false); toast({ title:"Refund processed", description:`${formatCurrency(inv.amount)} refund initiated.` }); }
    setRefunding(false);
  }

  return (
    <div className="pub-card p-5 hover:border-[rgba(0,212,255,0.12)] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-text-primary">{inv.job.customer.firstName} {inv.job.customer.lastName}</p>
            <PaymentBadge paid={paid} />
            {inv.overdue && !paid && <Badge variant="error" className="text-[10px]">Cancelled</Badge>}
          </div>
          <p className="text-xs text-text-muted">#{inv.id.slice(-8)} · {SERVICE_LABELS[inv.job.serviceType]} · {inv.job.city}</p>
          <p className="text-xs text-text-muted mt-0.5">{formatDate(inv.job.scheduledAt)}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{formatCurrency(inv.amount)}</p>
          <p className="text-xs text-text-muted mt-0.5">Deposit: {formatCurrency(inv.depositAmount)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {paid ? (
          <>
            <Badge variant="paid" className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3"/>Paid in Full</Badge>
            {isAdmin && <button onClick={refund} disabled={refunding} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#EF4444] border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.06)] hover:bg-[rgba(239,68,68,0.12)] transition-colors">
              {refunding?<Loader2 className="w-3 h-3 animate-spin"/>:<RefreshCw className="w-3 h-3"/>} Refund
            </button>}
          </>
        ) : inv.overdue ? (
          <Badge variant="error">Cancelled — No Payment Due</Badge>
        ) : (
          <>
            <button onClick={()=>pay(true)} disabled={paying} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-brand-blue-dark border border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.07)] hover:bg-[rgba(0,212,255,0.12)] transition-colors">
              {paying?<Loader2 className="w-3 h-3 animate-spin"/>:<CreditCard className="w-3 h-3"/>} Pay Deposit ({formatCurrency(inv.depositAmount)})
            </button>
            <button onClick={()=>pay(false)} disabled={paying} className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-[#09090F] hover:opacity-90" style={{ background:"linear-gradient(135deg,#00D4FF,#0087A8)" }}>
              {paying?<Loader2 className="w-3 h-3 animate-spin"/>:<CreditCard className="w-3 h-3"/>} Pay Full {formatCurrency(inv.amount)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;
  const isAdmin = role==="ADMIN"||role==="MANAGER";

  const invoices = isAdmin ? INVOICES : INVOICES.filter(i => i.job.customer.id==="c-001");
  const paid = invoices.filter(i=>i.paid);
  const unpaid = invoices.filter(i=>!i.paid&&!i.overdue);
  const totalPaid = paid.reduce((s,i)=>s+i.amount,0);
  const totalUnpaid = unpaid.reduce((s,i)=>s+i.amount,0);

  return (
    <div className="max-w-[1200px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Payments</h1>
          <p className="text-sm text-text-secondary mt-0.5">Stripe test-mode · Use card 4242 4242 4242 4242</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted bg-surface-100 border border-border rounded-lg px-3 py-2">
          <CreditCard className="w-3.5 h-3.5 text-[#A855F7]"/>Stripe Test Mode
        </div>
      </div>

      {isAdmin && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label:"Paid", value:formatCurrency(totalPaid), count:`${paid.length} invoices`, color:"#22C55E", icon:CheckCircle },
            { label:"Outstanding", value:formatCurrency(totalUnpaid), count:`${unpaid.length} invoices`, color:"#F59E0B", icon:Clock },
            { label:"Total Invoiced", value:formatCurrency(invoices.reduce((s,i)=>s+i.amount,0)), count:`${invoices.length} total`, color:"#00D4FF", icon:CreditCard },
          ].map(s=>(
            <div key={s.label} className="pub-card p-5">
              <div className="flex items-center justify-between mb-3"><p className="text-xs text-text-muted uppercase tracking-wide">{s.label}</p><s.icon className="w-4 h-4" style={{ color:s.color }}/></div>
              <p className="text-2xl font-bold" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:s.color }}>{s.value}</p>
              <p className="text-xs text-text-muted mt-1">{s.count}</p>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded-xl bg-[rgba(168,85,247,0.06)] border border-[rgba(168,85,247,0.2)]">
        <div className="flex items-start gap-3">
          <CreditCard className="w-4 h-4 text-[#A855F7] mt-0.5 shrink-0"/>
          <div>
            <p className="text-sm font-semibold text-text-primary">Stripe Test Mode Active</p>
            <p className="text-xs text-text-secondary mt-0.5">
              Test card: <span className="font-mono bg-[rgba(255,255,255,0.07)] px-1.5 py-0.5 rounded text-[#A855F7]">4242 4242 4242 4242</span> · Any future expiry · Any CVC · No real charges.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({invoices.length})</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid ({unpaid.length})</TabsTrigger>
          <TabsTrigger value="paid">Paid ({paid.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all"><div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{invoices.map(i=><InvoiceRow key={i.id} inv={i} isAdmin={isAdmin}/>)}</div></TabsContent>
        <TabsContent value="unpaid"><div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{unpaid.map(i=><InvoiceRow key={i.id} inv={i} isAdmin={isAdmin}/>)}</div></TabsContent>
        <TabsContent value="paid"><div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{paid.map(i=><InvoiceRow key={i.id} inv={i} isAdmin={isAdmin}/>)}</div></TabsContent>
      </Tabs>
    </div>
  );
}
