import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-blue text-white shadow-blue hover:opacity-90 active:scale-[0.98]",
        outline: "border border-border bg-white text-text-primary hover:bg-surface-100 hover:border-brand-blue/40",
        secondary: "bg-surface-100 text-text-primary border border-border hover:bg-surface-200",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-100",
        destructive: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
        cyan: "bg-brand-blue-light text-brand-blue-dark border border-brand-blue/25 hover:bg-brand-blue/20",
        success: "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
        pink: "bg-gradient-pink text-white shadow-pink hover:opacity-90",
        link: "text-brand-blue-dark underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6 text-base",
        xl: "h-12 rounded-2xl px-8 text-base",
        icon: "h-9 w-9",
        "icon-sm": "h-7 w-7 rounded-lg",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };
