"use client";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      {toasts.map(({ id, title, description, variant }) => (
        <div key={id} className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-[fade-up_0.3s_ease-out_forwards]
          ${variant === "destructive" ? "border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.08)]"
          : variant === "success" ? "border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.08)]"
          : "border-[rgba(255,255,255,0.1)] bg-[#18181F]"}`}>
          {variant === "destructive" ? <XCircle className="w-4 h-4 text-[#EF4444] mt-0.5 shrink-0" />
           : variant === "success" ? <CheckCircle className="w-4 h-4 text-[#22C55E] mt-0.5 shrink-0" />
           : <Info className="w-4 h-4 text-[#00D4FF] mt-0.5 shrink-0" />}
          <div className="flex-1 min-w-0">
            {title && <p className="text-sm font-semibold text-[#EFEFF4]">{title}</p>}
            {description && <p className="text-xs text-[#8B8B9E] mt-0.5">{description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
