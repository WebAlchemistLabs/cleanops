"use client";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Select ───────────────────────────────────────────────────────────────────
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger ref={ref} className={cn("flex h-10 w-full items-center justify-between rounded-xl border border-border bg-surface-50 px-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-blue/30 disabled:opacity-50 [&>span]:line-clamp-1 transition-all", className)} {...props}>
      {children}
      <SelectPrimitive.Icon asChild><ChevronDown className="h-4 w-4 text-text-muted" /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content ref={ref} className={cn("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-white text-text-primary shadow-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", position === "popper" && "data-[side=bottom]:translate-y-1", className)} position={position} {...props}>
        <SelectPrimitive.Viewport className={cn("p-1", position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]")}>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={cn("relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-surface-100 data-[disabled]:opacity-50", className)} {...props}>
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator><Check className="h-4 w-4 text-brand-blue-dark" /></SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = "SelectItem";

export const SelectLabel = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Label>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>>(
  ({ className, ...props }, ref) => <SelectPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs font-semibold text-text-muted", className)} {...props} />
);
SelectLabel.displayName = "SelectLabel";

// ─── Tabs ─────────────────────────────────────────────────────────────────────
export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => <TabsPrimitive.List ref={ref} className={cn("inline-flex h-9 items-center justify-center rounded-xl bg-surface-100 border border-border p-1 text-text-muted", className)} {...props} />
);
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
  ({ className, ...props }, ref) => <TabsPrimitive.Trigger ref={ref} className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-text-primary data-[state=active]:shadow-soft", className)} {...props} />
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn("mt-2 focus-visible:outline-none", className)} {...props} />
);
TabsContent.displayName = "TabsContent";

// ─── Dialog ───────────────────────────────────────────────────────────────────
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(
  ({ className, ...props }, ref) => <DialogPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)} {...props} />
);
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content ref={ref} className={cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.15)] rounded-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className)} {...props}>
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-1 text-text-muted hover:text-text-primary hover:bg-surface-100 transition-all focus:outline-none">
          <X className="h-4 w-4" /><span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("flex flex-col space-y-1.5", className)} {...props} />;
export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />;

export const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
  ({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={cn("text-lg font-display font-semibold text-text-primary", className)} {...props} />
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(
  ({ className, ...props }, ref) => <DialogPrimitive.Description ref={ref} className={cn("text-sm text-text-secondary", className)} {...props} />
);
DialogDescription.displayName = "DialogDescription";

// ─── Avatar ───────────────────────────────────────────────────────────────────
export const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(
  ({ className, ...props }, ref) => <AvatarPrimitive.Root ref={ref} className={cn("relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full", className)} {...props} />
);
Avatar.displayName = "Avatar";

export const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(
  ({ className, ...props }, ref) => <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
);
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(
  ({ className, ...props }, ref) => <AvatarPrimitive.Fallback ref={ref} className={cn("flex h-full w-full items-center justify-center rounded-full text-xs font-bold text-white", className)} style={{ background:"linear-gradient(135deg,#4FC3F7,#F48FB1)" }} {...props} />
);
AvatarFallback.displayName = "AvatarFallback";

// ─── Switch ───────────────────────────────────────────────────────────────────
export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitive.Root ref={ref} className={cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 data-[state=checked]:bg-brand-blue data-[state=unchecked]:bg-surface-300", className)} {...props}>
      <SwitchPrimitive.Thumb className="pointer-events-none block h-4 w-4 rounded-full bg-white shadow-soft transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0" />
    </SwitchPrimitive.Root>
  )
);
Switch.displayName = "Switch";

// ─── Separator ────────────────────────────────────────────────────────────────
export const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root ref={ref} decorative={decorative} orientation={orientation} className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)} {...props} />
  )
);
Separator.displayName = "Separator";

// ─── DropdownMenu ─────────────────────────────────────────────────────────────
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuContent = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn("z-50 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-white p-1 text-text-primary shadow-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2", className)} {...props} />
    </DropdownMenuPrimitive.Portal>
  )
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Item>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => <DropdownMenuPrimitive.Item ref={ref} className={cn("relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-none transition-colors focus:bg-surface-100 data-[disabled]:opacity-50", inset && "pl-8", className)} {...props} />
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuLabel = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Label>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>>(
  ({ className, ...props }, ref) => <DropdownMenuPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs font-semibold text-text-muted", className)} {...props} />
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(
  ({ className, ...props }, ref) => <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
