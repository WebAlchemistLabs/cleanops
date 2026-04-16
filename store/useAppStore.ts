"use client";
import { create } from "zustand";
import type { AppNotification, BookingRequest } from "@/types";

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (v: boolean) => void;
  notifications: AppNotification[];
  setNotifications: (n: AppNotification[]) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
  bookingRequests: BookingRequest[];
  addBookingRequest: (r: BookingRequest) => void;
  setBookingRequests: (r: BookingRequest[]) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  markRead: (id) => set((s) => ({ notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n) })),
  markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
  bookingRequests: [],
  addBookingRequest: (r) => set((s) => ({ bookingRequests: [r, ...s.bookingRequests] })),
  setBookingRequests: (r) => set({ bookingRequests: r }),
}));
