export type JobStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";
export type ServiceType = "STANDARD" | "DEEP_CLEAN" | "MOVE_IN_OUT" | "OFFICE" | "POST_CONSTRUCTION" | "AIRBNB";
export type RecurrenceType = "NONE" | "WEEKLY" | "BIWEEKLY" | "MONTHLY";
export type NotifType = "info" | "success" | "warning" | "error";
export type QuoteStatus = "PENDING" | "SENT" | "APPROVED" | "REJECTED" | "CONVERTED";

export interface DashboardKPIs {
  totalRevenue: number;
  revenueChange: number;
  totalJobs: number;
  jobsChange: number;
  activeCustomers: number;
  customersChange: number;
  cancellationRate: number;
  cancellationChange: number;
  avgJobValue: number;
  completionRate: number;
  repeatCustomerRate: number;
  pendingJobs: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  jobs: number;
  target?: number;
}

export interface ServiceDistribution {
  name: string;
  value: number;
  color: string;
  revenue: number;
}

export interface Job {
  id: string;
  serviceType: ServiceType;
  status: JobStatus;
  scheduledAt: string;
  price: number;
  address: string;
  city: string;
  province: string;
  duration: number;
  recurrence: RecurrenceType;
  notes?: string | null;
  paid: boolean;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
  };
  crew?: { id: string; name: string } | null;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  province?: string | null;
  address?: string | null;
  totalSpent: number;
  jobCount: number;
  isVIP: boolean;
  tags: string[];
  createdAt: string;
}

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: string;
  crew: string;
  crewId?: string;
  jobsCompleted: number;
  rating: number;
  isActive: boolean;
  hireDate?: string | null;
  revenue?: number;
}

export interface Crew {
  id: string;
  name: string;
  isActive: boolean;
  memberCount: number;
  jobsCompleted: number;
  rating: number;
  revenue: number;
  members: StaffMember[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotifType;
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  actor: string;
  action: string;
  entity: string;
  meta?: string | null;
  createdAt: string;
}

export interface AIInsight {
  id: string;
  title: string;
  summary: string;
  details: string;
  type: "revenue" | "bookings" | "customers" | "operations" | "forecast";
  sentiment: "positive" | "negative" | "neutral";
  generatedAt: string;
}

export interface CityPerformance {
  city: string;
  revenue: number;
  jobs: number;
  avgValue: number;
  growth: number;
}

export interface Quote {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceType: ServiceType;
  address: string;
  city: string;
  estimatedPrice: number;
  notes: string;
  status: QuoteStatus;
  createdAt: string;
  validUntil: string;
  convertedJobId?: string;
}

export interface BookingRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  address: string;
  city: string;
  preferredDate: string;
  notes: string;
  status: "NEW" | "REVIEWED" | "CONVERTED";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
