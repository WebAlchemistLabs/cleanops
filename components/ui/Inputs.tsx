import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input type={type} ref={ref}
      className={cn("flex h-10 w-full rounded-xl border border-border bg-surface-50 px-3 py-2 text-sm text-text-primary placeholder:text-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue disabled:cursor-not-allowed disabled:opacity-50 transition-all", className)}
      {...props} />
  )
);
Input.displayName = "Input";

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn("text-sm font-medium text-text-secondary leading-none", className)} {...props} />
));
Label.displayName = "Label";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref}
      className={cn("flex min-h-[80px] w-full rounded-xl border border-border bg-surface-50 px-3 py-2 text-sm text-text-primary placeholder:text-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue disabled:opacity-50 resize-none transition-all", className)}
      {...props} />
  )
);
Textarea.displayName = "Textarea";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-xl bg-surface-200", className)} {...props} />;
}
