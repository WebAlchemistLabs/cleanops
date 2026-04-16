# CleanOps AI v3 — Full-Stack Cleaning Business Platform

> Light mode · Baby blue + soft pink · Next.js 14 · TypeScript · Tailwind CSS · NextAuth · Stripe · OpenAI

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:3000**

---

## The 3 Surfaces

| URL | Who | Purpose |
|-----|-----|---------|
| `/` | Anyone | Marketing homepage with hero image |
| `/services` | Anyone | All services with photos |
| `/results` | Anyone | Before/after gallery |
| `/about` | Anyone | Team and values |
| `/contact` | Anyone | Contact form (matches screenshot) |
| `/book` | Anyone | 3-step booking form with service images |
| `/register` | New customers | Create account |
| `/dashboard` | Admin: business overview · Customer: their bookings + pay |
| `/jobs` | Admin: all jobs · Customer: their own bookings |
| `/payments` | Admin: all invoices + refunds · Customer: pay invoices |
| `/booking-requests` | Admin | Inbox from /book page |
| All other pages | Admin/Manager | Full operations |

---

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@cleanopsai.com | Admin123! |
| **Manager** | manager@cleanopsai.com | Manager123! |
| **Customer** | sarah@example.com | Customer123! |
| **Customer** | james@example.com | Customer123! |
| **Customer** | chen@example.com | Customer123! |

Customer accounts show real booking history from demo data.

---

## Design System

| Token | Value |
|-------|-------|
| Primary blue | `#4FC3F7` |
| Pink accent | `#F48FB1` |
| Background | `#FFFFFF` |
| Surface 50 | `#F8FBFF` |
| Text primary | `#1A1A2E` |
| Text secondary | `#4A4A6A` |
| Text muted | `#9090A8` |
| Border | `#E8EDF5` |
| Font display | Plus Jakarta Sans |
| Font body | Inter |

---

## Stripe Payments

Works in demo mode with no key. Enable real Stripe:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Test card: **4242 4242 4242 4242** · Any future date · Any CVC

---

## OpenAI

Works with smart demo responses. Enable real AI:

```env
OPENAI_API_KEY=sk-...
```

---

Built by **WebAlchemistLabs** · Marlon Haynes
