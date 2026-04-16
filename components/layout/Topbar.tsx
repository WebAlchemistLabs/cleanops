"use client";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Bell, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Avatar, AvatarFallback } from "@/components/ui/Radix";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard", "/jobs": "Jobs & Bookings",
  "/booking-requests": "Booking Requests", "/customers": "Customers",
  "/staff": "Staff & Crews", "/analytics": "Analytics",
  "/payments": "Payments", "/quotes": "Quotes",
  "/reports": "Reports", "/notifications": "Notifications",
  "/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { toggleSidebar, notifications } = useAppStore();
  const unread = notifications.filter(n => !n.read).length;
  const name = session?.user?.name || "User";
  const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <header className="h-[60px] border-b border-border bg-white/90 backdrop-blur-sm flex items-center px-5 gap-4 sticky top-0 z-30 shadow-sm">
      <Button variant="ghost" size="icon-sm" onClick={toggleSidebar}>
        <Menu className="w-4 h-4" />
      </Button>
      <h1 className="text-sm font-display font-semibold text-text-primary flex-1">
        {TITLES[pathname] || "CleanOps AI"}
      </h1>
      <Link href="/notifications">
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{ background:"linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 gap-2 px-2">
            <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{initials}</AvatarFallback></Avatar>
            <span className="text-sm text-text-secondary hidden sm:inline">{name.split(" ")[0]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-[10px] text-text-muted">{session?.user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center gap-2 cursor-pointer"><User className="w-4 h-4" />Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
            <LogOut className="w-4 h-4" />Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
