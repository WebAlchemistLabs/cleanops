"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard, Calendar, Users, UserCheck, BarChart3, FileText, Bell, Settings, Sparkles, CreditCard, FileInput, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Avatar, AvatarFallback } from "@/components/ui/Radix";
import { Badge } from "@/components/ui/Badge";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Jobs & Bookings", href: "/jobs", icon: Calendar },
  { label: "Booking Requests", href: "/booking-requests", icon: Inbox },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Staff & Crews", href: "/staff", icon: UserCheck },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Quotes", href: "/quotes", icon: FileInput },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

const CUSTOMER_NAV = [
  { label: "My Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", href: "/jobs", icon: Calendar },
  { label: "Invoices & Pay", href: "/payments", icon: CreditCard },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Account", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { sidebarOpen, notifications } = useAppStore();
  const unread = notifications.filter(n => !n.read).length;
  const role = (session?.user as any)?.role;
  const isAdmin = role === "ADMIN" || role === "MANAGER";
  const navItems = isAdmin ? ADMIN_NAV : CUSTOMER_NAV;
  const name = session?.user?.name || "User";
  const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  if (!sidebarOpen) return null;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[220px] bg-white border-r border-border z-40 flex flex-col shadow-soft">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-[60px] border-b border-border shrink-0">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-soft" style={{ background:"linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
          <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-display font-bold text-sm text-text-primary">
          CleanOps<span className="text-gradient-blue">AI</span>
        </span>
      </div>

      {/* Org badge */}
      <div className="px-3 py-2.5 border-b border-border/60">
        <div className="px-2.5 py-2 rounded-lg bg-surface-100 border border-border">
          <p className="text-[10px] font-medium text-text-muted truncate">
            {(session?.user as any)?.orgName || "Pristine Pro Cleaning"}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto admin-scroll">
        {navItems.map(item => {
          const active = pathname === item.href;
          const showBadge = item.href === "/notifications" && unread > 0;
          return (
            <Link key={item.href} href={item.href} className={cn("admin-nav-item", active && "active")}>
              <item.icon className="w-[15px] h-[15px] shrink-0" strokeWidth={active ? 2.5 : 2} />
              <span className="flex-1">{item.label}</span>
              {showBadge && (
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background:"linear-gradient(135deg,#4FC3F7,#29B6F6)" }}>
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-3 pt-2 border-t border-border">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-surface-100 transition-colors">
          <Avatar className="h-7 w-7 shrink-0"><AvatarFallback className="text-[10px]">{initials}</AvatarFallback></Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">{name}</p>
            <p className="text-[10px] text-text-muted truncate">{session?.user?.email}</p>
          </div>
          <Badge variant={isAdmin ? "info" : "success"} className="text-[9px] px-1.5 shrink-0">{role}</Badge>
        </div>
      </div>
    </aside>
  );
}
