import { Badge } from "@/components/ui/Badge";
import { STATUS_LABELS, SERVICE_LABELS } from "@/lib/utils";
import type { JobStatus, ServiceType } from "@/types";

export function StatusBadge({ status }: { status: JobStatus }) {
  const v: Record<JobStatus, any> = {
    PENDING: "warning", CONFIRMED: "info", IN_PROGRESS: "purple",
    COMPLETED: "success", CANCELLED: "error", RESCHEDULED: "orange",
  };
  const dot: Record<JobStatus, string> = {
    PENDING:"#F59E0B", CONFIRMED:"#4FC3F7", IN_PROGRESS:"#9333EA",
    COMPLETED:"#22C55E", CANCELLED:"#EF4444", RESCHEDULED:"#F97316",
  };
  return (
    <Badge variant={v[status]}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot[status] }} />
      {STATUS_LABELS[status]}
    </Badge>
  );
}

export function ServiceBadge({ type }: { type: ServiceType }) {
  return <Badge variant="info" className="font-normal">{SERVICE_LABELS[type]}</Badge>;
}

export function PaymentBadge({ paid }: { paid: boolean }) {
  return paid
    ? <Badge variant="paid"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Paid</Badge>
    : <Badge variant="unpaid"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Unpaid</Badge>;
}
