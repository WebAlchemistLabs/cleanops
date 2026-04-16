import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return format(new Date(date), "MMM d, yyyy");
}

export function formatDateTime(date: Date | string): string {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}

export function formatRelative(date: Date | string): string {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch {
    return "recently";
  }
}

export function getInitials(first: string, last: string): string {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export const SERVICE_LABELS: Record<string, string> = {
  STANDARD: "Standard Clean",
  DEEP_CLEAN: "Deep Clean",
  MOVE_IN_OUT: "Move-In / Move-Out",
  OFFICE: "Office Clean",
  POST_CONSTRUCTION: "Post-Construction",
  AIRBNB: "Airbnb Turnover",
};

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  STANDARD: "Regular home or apartment clean. Vacuuming, mopping, dusting, bathrooms, and kitchen surfaces.",
  DEEP_CLEAN: "Thorough top-to-bottom clean including inside appliances, baseboards, and detailed scrubbing.",
  MOVE_IN_OUT: "Full clean for vacant units. Bring empty spaces to spotless, inspection-ready condition.",
  OFFICE: "Professional commercial office cleaning. After-hours scheduling available.",
  POST_CONSTRUCTION: "Heavy-duty cleanup after renovations or construction. Dust, debris, and residue removal.",
  AIRBNB: "Fast turnaround clean between guest stays. Linen swap, restocking, and full clean included.",
};

export const SERVICE_PRICES: Record<string, string> = {
  STANDARD: "From $120",
  DEEP_CLEAN: "From $220",
  MOVE_IN_OUT: "From $280",
  OFFICE: "From $180",
  POST_CONSTRUCTION: "From $350",
  AIRBNB: "From $95",
};

export const SERVICE_DURATION: Record<string, string> = {
  STANDARD: "2–3 hrs",
  DEEP_CLEAN: "3–5 hrs",
  MOVE_IN_OUT: "4–6 hrs",
  OFFICE: "2–4 hrs",
  POST_CONSTRUCTION: "4–8 hrs",
  AIRBNB: "1.5–3 hrs",
};

// Unsplash image URLs for each service (clean, bright, relevant)
export const SERVICE_IMAGES: Record<string, string> = {
  STANDARD: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
  DEEP_CLEAN: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  MOVE_IN_OUT: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  OFFICE: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  POST_CONSTRUCTION: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  AIRBNB: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
};

export const SERVICE_COLORS: Record<string, string> = {
  STANDARD: "#4FC3F7",
  DEEP_CLEAN: "#29B6F6",
  MOVE_IN_OUT: "#66BB6A",
  OFFICE: "#FFB74D",
  POST_CONSTRUCTION: "#EF5350",
  AIRBNB: "#F48FB1",
};

export const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  RESCHEDULED: "Rescheduled",
};

export const STATUS_COLORS: Record<string, string> = {
  PENDING: "#FFB74D",
  CONFIRMED: "#4FC3F7",
  IN_PROGRESS: "#AB47BC",
  COMPLETED: "#66BB6A",
  CANCELLED: "#EF5350",
  RESCHEDULED: "#FF7043",
};
