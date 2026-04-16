"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { AdminChatWidget } from "@/components/AdminChatWidget";
import { useAppStore } from "@/store/useAppStore";
import { DEMO_NOTIFICATIONS, DEMO_BOOKING_REQUESTS } from "@/data/demo";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { sidebarOpen, setNotifications, setBookingRequests } = useAppStore();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    setNotifications(DEMO_NOTIFICATIONS);
    setBookingRequests(DEMO_BOOKING_REQUESTS);
  }, [setNotifications, setBookingRequests]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
          <p className="text-sm text-text-secondary">Loading CleanOps AI...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-surface-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 transition-[margin] duration-300" style={{ marginLeft: sidebarOpen ? "220px" : "0px" }}>
        <Topbar />
        <main className="flex-1 p-5 overflow-auto">{children}</main>
      </div>
      <AdminChatWidget />
    </div>
  );
}
