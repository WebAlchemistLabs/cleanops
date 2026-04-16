import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#18181F] border border-[rgba(255,255,255,0.07)] flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#5A5A72]" />
      </div>
      <h3 className="text-base font-semibold text-[#EFEFF4] font-display mb-1">{title}</h3>
      <p className="text-sm text-[#8B8B9E] max-w-xs mb-5">{description}</p>
      {action && <Button size="sm" onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}
