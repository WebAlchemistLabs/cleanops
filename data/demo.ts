import type {
  DashboardKPIs, RevenueDataPoint, ServiceDistribution,
  Job, Customer, StaffMember, Crew, AppNotification,
  ActivityLog, AIInsight, CityPerformance, Quote, BookingRequest,
} from "@/types";

export const DEMO_ORG = {
  id: "org-001",
  name: "Pristine Pro Cleaning",
  city: "Toronto",
  province: "ON",
  email: "info@pristinepro.ca",
  phone: "416-555-0100",
  address: "200 Bay Street, Suite 800, Toronto, ON",
  website: "pristinepro.ca",
  tagline: "Professional cleaning you can trust",
  founded: "2019",
  teamSize: "12+",
};

export const DEMO_KPIS: DashboardKPIs = {
  totalRevenue: 84320,
  revenueChange: 12.4,
  totalJobs: 312,
  jobsChange: 8.7,
  activeCustomers: 148,
  customersChange: 5.2,
  cancellationRate: 4.8,
  cancellationChange: -1.3,
  avgJobValue: 270,
  completionRate: 94.2,
  repeatCustomerRate: 68.5,
  pendingJobs: 3,
};

export const DEMO_REVENUE: RevenueDataPoint[] = [
  { month: "Jul", revenue: 52000, jobs: 198, target: 50000 },
  { month: "Aug", revenue: 58400, jobs: 221, target: 55000 },
  { month: "Sep", revenue: 61200, jobs: 232, target: 60000 },
  { month: "Oct", revenue: 67800, jobs: 257, target: 65000 },
  { month: "Nov", revenue: 71400, jobs: 270, target: 70000 },
  { month: "Dec", revenue: 63200, jobs: 239, target: 68000 },
  { month: "Jan", revenue: 59800, jobs: 227, target: 62000 },
  { month: "Feb", revenue: 68600, jobs: 260, target: 65000 },
  { month: "Mar", revenue: 74200, jobs: 281, target: 72000 },
  { month: "Apr", revenue: 78900, jobs: 299, target: 75000 },
  { month: "May", revenue: 81400, jobs: 308, target: 78000 },
  { month: "Jun", revenue: 84320, jobs: 312, target: 82000 },
];

export const DEMO_SERVICES: ServiceDistribution[] = [
  { name: "Standard Clean", value: 38, color: "#4FC3F7", revenue: 31641 },
  { name: "Deep Clean", value: 24, color: "#29B6F6", revenue: 20237 },
  { name: "Move-In/Out", value: 18, color: "#66BB6A", revenue: 15178 },
  { name: "Office Clean", value: 12, color: "#FFB74D", revenue: 10118 },
  { name: "Airbnb", value: 8, color: "#F48FB1", revenue: 6746 },
];

const now = new Date();
const d = (days: number) => new Date(now.getTime() + days * 86400000).toISOString();
const past = (days: number) => new Date(now.getTime() - days * 86400000).toISOString();

// Customer 001 = Sarah Mitchell (customer@example.com login)
export const DEMO_JOBS: Job[] = [
  // Sarah Mitchell's jobs (customer-001)
  { id: "job-001", serviceType: "DEEP_CLEAN", status: "CONFIRMED", scheduledAt: d(3), price: 320, address: "142 King St W, Apt 4B", city: "Toronto", province: "ON", duration: 180, recurrence: "NONE", notes: "Pet-friendly products please.", paid: false, customer: { id: "c-001", firstName: "Sarah", lastName: "Mitchell", email: "sarah@example.com", phone: "416-555-0182" }, crew: { id: "crew-1", name: "Alpha Team" } },
  { id: "job-002", serviceType: "STANDARD", status: "COMPLETED", scheduledAt: past(14), price: 180, address: "142 King St W, Apt 4B", city: "Toronto", province: "ON", duration: 120, recurrence: "BIWEEKLY", notes: null, paid: true, customer: { id: "c-001", firstName: "Sarah", lastName: "Mitchell", email: "sarah@example.com", phone: "416-555-0182" }, crew: { id: "crew-1", name: "Alpha Team" } },
  { id: "job-003", serviceType: "STANDARD", status: "COMPLETED", scheduledAt: past(28), price: 180, address: "142 King St W, Apt 4B", city: "Toronto", province: "ON", duration: 120, recurrence: "BIWEEKLY", notes: null, paid: true, customer: { id: "c-001", firstName: "Sarah", lastName: "Mitchell", email: "sarah@example.com", phone: "416-555-0182" }, crew: { id: "crew-1", name: "Alpha Team" } },
  { id: "job-004", serviceType: "DEEP_CLEAN", status: "COMPLETED", scheduledAt: past(60), price: 310, address: "142 King St W, Apt 4B", city: "Toronto", province: "ON", duration: 180, recurrence: "NONE", notes: "Spring deep clean.", paid: true, customer: { id: "c-001", firstName: "Sarah", lastName: "Mitchell", email: "sarah@example.com", phone: "416-555-0182" }, crew: { id: "crew-1", name: "Alpha Team" } },
  // James Okafor's jobs (customer-002)
  { id: "job-005", serviceType: "OFFICE", status: "IN_PROGRESS", scheduledAt: d(0), price: 280, address: "500 Bay St, Floor 12", city: "Toronto", province: "ON", duration: 150, recurrence: "WEEKLY", notes: null, paid: false, customer: { id: "c-002", firstName: "James", lastName: "Okafor", email: "james@example.com", phone: "647-555-0291" }, crew: { id: "crew-3", name: "Gamma Team" } },
  { id: "job-006", serviceType: "OFFICE", status: "COMPLETED", scheduledAt: past(7), price: 280, address: "500 Bay St, Floor 12", city: "Toronto", province: "ON", duration: 150, recurrence: "WEEKLY", notes: null, paid: true, customer: { id: "c-002", firstName: "James", lastName: "Okafor", email: "james@example.com", phone: "647-555-0291" }, crew: { id: "crew-3", name: "Gamma Team" } },
  { id: "job-007", serviceType: "OFFICE", status: "COMPLETED", scheduledAt: past(14), price: 280, address: "500 Bay St, Floor 12", city: "Toronto", province: "ON", duration: 150, recurrence: "WEEKLY", notes: null, paid: true, customer: { id: "c-002", firstName: "James", lastName: "Okafor", email: "james@example.com", phone: "647-555-0291" }, crew: { id: "crew-3", name: "Gamma Team" } },
  // Chen Wei's jobs (customer-003)
  { id: "job-008", serviceType: "STANDARD", status: "CONFIRMED", scheduledAt: d(1), price: 160, address: "87 Queen St E", city: "Mississauga", province: "ON", duration: 120, recurrence: "BIWEEKLY", notes: null, paid: false, customer: { id: "c-003", firstName: "Chen", lastName: "Wei", email: "chen@example.com", phone: "416-555-0458" }, crew: { id: "crew-2", name: "Beta Team" } },
  { id: "job-009", serviceType: "STANDARD", status: "COMPLETED", scheduledAt: past(15), price: 160, address: "87 Queen St E", city: "Mississauga", province: "ON", duration: 120, recurrence: "BIWEEKLY", notes: null, paid: true, customer: { id: "c-003", firstName: "Chen", lastName: "Wei", email: "chen@example.com", phone: "416-555-0458" }, crew: { id: "crew-2", name: "Beta Team" } },
  // Other customers
  { id: "job-010", serviceType: "MOVE_IN_OUT", status: "PENDING", scheduledAt: d(2), price: 450, address: "33 Yonge St, Unit 2201", city: "Toronto", province: "ON", duration: 240, recurrence: "NONE", notes: "Key at concierge.", paid: false, customer: { id: "c-004", firstName: "Priya", lastName: "Sharma", email: "priya@example.com", phone: "905-555-0347" }, crew: null },
  { id: "job-011", serviceType: "AIRBNB", status: "CONFIRMED", scheduledAt: d(1), price: 140, address: "78 Ossington Ave", city: "Toronto", province: "ON", duration: 90, recurrence: "NONE", notes: "Guests check in at 3pm.", paid: false, customer: { id: "c-005", firstName: "Fatima", lastName: "Hassan", email: "fatima@example.com", phone: "905-555-0784" }, crew: { id: "crew-2", name: "Beta Team" } },
  { id: "job-012", serviceType: "POST_CONSTRUCTION", status: "PENDING", scheduledAt: d(5), price: 680, address: "1200 Lawrence Ave W", city: "Toronto", province: "ON", duration: 360, recurrence: "NONE", notes: "Heavy construction dust.", paid: false, customer: { id: "c-006", firstName: "Derek", lastName: "Nguyen", email: "derek@example.com", phone: "416-555-0895" }, crew: null },
  { id: "job-013", serviceType: "STANDARD", status: "CANCELLED", scheduledAt: past(5), price: 160, address: "11 Carlton St", city: "Toronto", province: "ON", duration: 120, recurrence: "NONE", notes: null, paid: false, customer: { id: "c-007", firstName: "Marcus", lastName: "Lee", email: "marcus@example.com", phone: "416-555-0673" }, crew: null },
  { id: "job-014", serviceType: "DEEP_CLEAN", status: "RESCHEDULED", scheduledAt: d(4), price: 310, address: "20 Bloor St W", city: "Toronto", province: "ON", duration: 150, recurrence: "NONE", notes: "Rescheduled from last week.", paid: false, customer: { id: "c-003", firstName: "Chen", lastName: "Wei", email: "chen@example.com", phone: "416-555-0458" }, crew: { id: "crew-3", name: "Gamma Team" } },
];

export const DEMO_CUSTOMERS: Customer[] = [
  { id: "c-001", firstName: "Sarah", lastName: "Mitchell", email: "sarah@example.com", phone: "416-555-0182", city: "Toronto", province: "ON", address: "142 King St W, Apt 4B", totalSpent: 990, jobCount: 4, isVIP: true, tags: ["VIP", "Recurring", "Residential"], createdAt: past(180) },
  { id: "c-002", firstName: "James", lastName: "Okafor", email: "james@example.com", phone: "647-555-0291", city: "Toronto", province: "ON", address: "500 Bay St", totalSpent: 840, jobCount: 3, isVIP: false, tags: ["Commercial", "Weekly"], createdAt: past(120) },
  { id: "c-003", firstName: "Chen", lastName: "Wei", email: "chen@example.com", phone: "416-555-0458", city: "Mississauga", province: "ON", address: "87 Queen St E", totalSpent: 470, jobCount: 3, isVIP: false, tags: ["Recurring", "Residential"], createdAt: past(90) },
  { id: "c-004", firstName: "Priya", lastName: "Sharma", email: "priya@example.com", phone: "905-555-0347", city: "Brampton", province: "ON", address: "33 Yonge St", totalSpent: 730, jobCount: 3, isVIP: false, tags: ["Residential"], createdAt: past(150) },
  { id: "c-005", firstName: "Fatima", lastName: "Hassan", email: "fatima@example.com", phone: "905-555-0784", city: "Ajax", province: "ON", address: "78 Ossington Ave", totalSpent: 2680, jobCount: 15, isVIP: true, tags: ["VIP", "Airbnb", "Recurring"], createdAt: past(200) },
  { id: "c-006", firstName: "Derek", lastName: "Nguyen", email: "derek@example.com", phone: "416-555-0895", city: "Toronto", province: "ON", address: "1200 Lawrence Ave W", totalSpent: 680, jobCount: 2, isVIP: false, tags: ["Commercial"], createdAt: past(45) },
  { id: "c-007", firstName: "Marcus", lastName: "Lee", email: "marcus@example.com", phone: "416-555-0673", city: "Scarborough", province: "ON", address: "11 Carlton St", totalSpent: 160, jobCount: 1, isVIP: false, tags: [], createdAt: past(60) },
  { id: "c-008", firstName: "Amanda", lastName: "Torres", email: "amanda@example.com", phone: "647-555-0562", city: "Vaughan", province: "ON", address: "29 Elm Dr", totalSpent: 1120, jobCount: 6, isVIP: false, tags: ["Recurring"], createdAt: past(160) },
];

export const DEMO_STAFF: StaffMember[] = [
  { id: "s-001", firstName: "Jordan", lastName: "Blake", email: "jordan@pristinepro.ca", phone: "416-555-1001", role: "Lead Cleaner", crew: "Alpha Team", crewId: "crew-1", jobsCompleted: 142, rating: 4.9, isActive: true, hireDate: past(700), revenue: 28640 },
  { id: "s-002", firstName: "Maria", lastName: "Santos", email: "maria@pristinepro.ca", phone: "647-555-1002", role: "Senior Cleaner", crew: "Alpha Team", crewId: "crew-1", jobsCompleted: 128, rating: 4.8, isActive: true, hireDate: past(550), revenue: 24960 },
  { id: "s-003", firstName: "Kevin", lastName: "Park", email: "kevin@pristinepro.ca", phone: "905-555-1003", role: "Lead Cleaner", crew: "Beta Team", crewId: "crew-2", jobsCompleted: 118, rating: 4.7, isActive: true, hireDate: past(480), revenue: 22320 },
  { id: "s-004", firstName: "Aisha", lastName: "Thompson", email: "aisha@pristinepro.ca", phone: "416-555-1004", role: "Cleaner", crew: "Beta Team", crewId: "crew-2", jobsCompleted: 94, rating: 4.6, isActive: true, hireDate: past(360), revenue: 17180 },
  { id: "s-005", firstName: "Tom", lastName: "Williams", email: "tom@pristinepro.ca", phone: "647-555-1005", role: "Lead Cleaner", crew: "Gamma Team", crewId: "crew-3", jobsCompleted: 106, rating: 4.8, isActive: true, hireDate: past(420), revenue: 20680 },
  { id: "s-006", firstName: "Nina", lastName: "Petrov", email: "nina@pristinepro.ca", phone: "905-555-1006", role: "Cleaner", crew: "Gamma Team", crewId: "crew-3", jobsCompleted: 82, rating: 4.5, isActive: false, hireDate: past(280), revenue: 14760 },
];

export const DEMO_CREWS: Crew[] = [
  { id: "crew-1", name: "Alpha Team", isActive: true, memberCount: 2, jobsCompleted: 270, rating: 4.85, revenue: 53600, members: DEMO_STAFF.filter(s => s.crewId === "crew-1") },
  { id: "crew-2", name: "Beta Team", isActive: true, memberCount: 2, jobsCompleted: 212, rating: 4.65, revenue: 39500, members: DEMO_STAFF.filter(s => s.crewId === "crew-2") },
  { id: "crew-3", name: "Gamma Team", isActive: true, memberCount: 2, jobsCompleted: 188, rating: 4.70, revenue: 35440, members: DEMO_STAFF.filter(s => s.crewId === "crew-3") },
];

export const DEMO_NOTIFICATIONS: AppNotification[] = [
  { id: "n-001", title: "New Booking Request", message: "Emily Carter submitted a Deep Clean request via the booking page — Etobicoke.", type: "info", read: false, createdAt: new Date(Date.now() - 600000).toISOString() },
  { id: "n-002", title: "Job Confirmed", message: "Deep Clean for Sarah Mitchell (Job #001) confirmed for in 3 days.", type: "success", read: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: "n-003", title: "Payment Received", message: "$280 payment confirmed — Office Clean at 500 Bay St, James Okafor.", type: "success", read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "n-004", title: "Job Cancelled", message: "Marcus Lee cancelled Standard Clean #013.", type: "warning", read: true, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "n-005", title: "Crew Unassigned", message: "Job #010 (Move-In/Out, Priya Sharma) has no crew. Scheduled in 2 days.", type: "error", read: false, createdAt: new Date(Date.now() - 10800000).toISOString() },
  { id: "n-006", title: "Review Received", message: "Sarah Mitchell left a 5-star review after her Deep Clean. \"Absolutely spotless!\"", type: "success", read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
];

export const DEMO_ACTIVITY: ActivityLog[] = [
  { id: "a-001", actor: "System", action: "received booking request from", entity: "Emily Carter", meta: "Deep Clean, Etobicoke — via /book", createdAt: new Date(Date.now() - 600000).toISOString() },
  { id: "a-002", actor: "Alex Rivera", action: "confirmed Job #001 for", entity: "Sarah Mitchell", meta: "Deep Clean — Alpha Team assigned", createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: "a-003", actor: "Jordan Blake", action: "marked complete", entity: "Job #002", meta: "$180 — Standard Clean, Toronto", createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "a-004", actor: "Alex Rivera", action: "added VIP tag to", entity: "Sarah Mitchell", meta: "Lifetime spend crossed $900", createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: "a-005", actor: "System", action: "payment confirmed for", entity: "Job #006", meta: "$280 — James Okafor", createdAt: new Date(Date.now() - 90000).toISOString() },
  { id: "a-006", actor: "Sarah Mitchell", action: "booked online via /book", entity: "Deep Clean", meta: "$320 — 142 King St W", createdAt: new Date(Date.now() - 259200000).toISOString() },
];

export const DEMO_INSIGHTS: AIInsight[] = [
  { id: "i-001", title: "Revenue on Track for Record Month", summary: "June is up 12.4% month-over-month and on pace to exceed last year's best month.", details: "Your $84,320 in revenue puts you 2.8% ahead of target. Deep Cleans and Move-In/Out jobs are your highest-margin services — together representing 42% of jobs but 58% of revenue. Adding one more crew would let you take on 30-40% more high-value jobs.", type: "revenue", sentiment: "positive", generatedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "i-002", title: "3 Jobs Unassigned — Action Needed", summary: "Jobs #010, #012 have no crew with the earliest in 2 days.", details: "Unassigned jobs have a 23% higher cancellation risk. Job #010 (Move-In/Out, $450) is the most urgent. Consider assigning Beta Team. Job #012 (Post-Construction, $680) may need additional staffing given its size.", type: "operations", sentiment: "negative", generatedAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "i-003", title: "Customer Retention Strong at 68.5%", summary: "More than two-thirds of customers booked a second service — above the 55% industry average.", details: "Your retention is a competitive advantage. Sarah Mitchell and Fatima Hassan account for $3,670 in repeat revenue. A loyalty program offering 10% off after 5 bookings could push retention above 75%.", type: "customers", sentiment: "positive", generatedAt: new Date(Date.now() - 10800000).toISOString() },
  { id: "i-004", title: "July Forecast: $91K–$95K", summary: "At current pace, July is projected to be your strongest month.", details: "Recurring jobs lock in $51,200 committed revenue before any new bookings. The Post-Construction segment grew 40% this quarter and is currently underpriced at market rates.", type: "forecast", sentiment: "positive", generatedAt: new Date(Date.now() - 14400000).toISOString() },
];

export const DEMO_CITY_PERFORMANCE: CityPerformance[] = [
  { city: "Toronto", revenue: 48400, jobs: 178, avgValue: 272, growth: 14.2 },
  { city: "Mississauga", revenue: 16800, jobs: 62, avgValue: 271, growth: 8.4 },
  { city: "Brampton", revenue: 9200, jobs: 34, avgValue: 271, growth: 6.1 },
  { city: "Vaughan", revenue: 5600, jobs: 22, avgValue: 255, growth: 3.2 },
  { city: "Ajax", revenue: 4320, jobs: 16, avgValue: 270, growth: 11.5 },
];

export const DEMO_QUOTES: Quote[] = [
  { id: "q-001", customerName: "Priya Sharma", customerEmail: "priya@example.com", serviceType: "MOVE_IN_OUT", address: "33 Yonge St", city: "Toronto", estimatedPrice: 450, notes: "Move-out, 2 bedroom condo, end of lease.", status: "APPROVED", createdAt: past(3), validUntil: new Date(Date.now() + 86400000 * 11).toISOString() },
  { id: "q-002", customerName: "Derek Nguyen", customerEmail: "derek@example.com", serviceType: "POST_CONSTRUCTION", address: "1200 Lawrence Ave W", city: "Toronto", estimatedPrice: 680, notes: "Commercial reno, approx 4,000 sq ft.", status: "SENT", createdAt: past(1), validUntil: new Date(Date.now() + 86400000 * 13).toISOString() },
  { id: "q-003", customerName: "Emily Carter", customerEmail: "emily.c@gmail.com", serviceType: "DEEP_CLEAN", address: "40 Rexdale Blvd", city: "Etobicoke", estimatedPrice: 290, notes: "3 bedroom house, came via booking page.", status: "PENDING", createdAt: new Date(Date.now() - 3600000).toISOString(), validUntil: new Date(Date.now() + 86400000 * 14).toISOString() },
];

export const DEMO_BOOKING_REQUESTS: BookingRequest[] = [
  { id: "br-001", firstName: "Emily", lastName: "Carter", email: "emily.c@gmail.com", phone: "416-555-2233", serviceType: "DEEP_CLEAN", address: "40 Rexdale Blvd", city: "Etobicoke", preferredDate: new Date(Date.now() + 86400000 * 5).toISOString(), notes: "3 bedroom house, hasn't been deep cleaned in a while.", status: "NEW", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "br-002", firstName: "Robert", lastName: "Kim", email: "robert.k@gmail.com", phone: "647-555-3344", serviceType: "MOVE_IN_OUT", address: "890 Wilson Ave, Unit 5", city: "North York", preferredDate: new Date(Date.now() + 86400000 * 3).toISOString(), notes: "Moving out, landlord inspection on the 15th.", status: "REVIEWED", createdAt: past(2) },
];
