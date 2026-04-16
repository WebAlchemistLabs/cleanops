import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border",
  {
    variants: {
      variant: {
        default: "bg-brand-blue text-white border-transparent",
        secondary: "bg-surface-100 text-text-secondary border-border",
        success: "bg-green-50 text-green-700 border-green-200",
        warning: "bg-amber-50 text-amber-700 border-amber-200",
        error: "bg-red-50 text-red-600 border-red-200",
        info: "bg-brand-blue-light text-brand-blue-dark border-brand-blue/25",
        purple: "bg-purple-50 text-purple-700 border-purple-200",
        orange: "bg-orange-50 text-orange-700 border-orange-200",
        vip: "bg-yellow-50 text-yellow-700 border-yellow-200",
        paid: "bg-green-50 text-green-700 border-green-200",
        unpaid: "bg-amber-50 text-amber-700 border-amber-200",
        new: "bg-brand-blue-light text-brand-blue-dark border-brand-blue/25",
        pink: "bg-brand-pink-light text-brand-pink-dark border-brand-pink/25",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
