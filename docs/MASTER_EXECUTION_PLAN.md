# HOME DIGITAL MARKETPLACE: MASTER EXECUTION PLAN

> **Objective:** Build, deploy, and scale Kenya's premier niche discovery marketplace (*Home Kenya*) with zero monthly infrastructure cost, automated zero-friction onboarding, high-trust monetization, and a clear bridge to the $5,000 USD Zoho Partner milestone.  
> **Status:** Active Execution  
> **Last Updated:** 2026-10-06  

---

## 🧭 Master Roadmap Overview

```mermaid
flowchart LR
    P0["Phase 0:\nFoundation &\nArchitecture\n[DONE]"]
    P1["Phase 1:\nZero-$ Infra &\nDatabase Setup"]
    P2["Phase 2:\nCore Web\nDiscovery Engine"]
    P3["Phase 3:\nPre-Build &\nIngestion Factory"]
    P4["Phase 4:\nWhatsApp\nDual-Channels &\nOutreach"]
    P5["Phase 5:\nVendor Portal &\nMagic Links"]
    P6["Phase 6:\nZoho One HQ &\nCRM Integration"]
    P7["Phase 7:\nMonetization &\n$5k Zoho Partner"]
    P8["Phase 8:\nReplicate to\nBeauty & Exp."]

    P0 --> P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7 --> P8
```

---

## 📋 Phase-by-Phase Checklist & Acceptance Criteria

### Phase 0: Foundations & Schemas ✅ (COMPLETED)
- [x] **M01–M05 Schemas Defined:** Complete TypeScript schemas in `src/types/schema.ts` for `BusinessProfile`, `KenyanLocation`, `HomeProduct`, `HomeService`, and `BusinessAttributes`.
- [x] **Architectural Blueprint:** System topology and critique documented in `docs/ARCHITECTURE.md`.
- [x] **Zero-Friction Ingestion Blueprint:** Documented in `docs/INGESTION_PIPELINE.md`.
- [x] **Monetization Mechanics:** M-Pesa micro-boosts and badges documented in `docs/MONETIZATION_AND_GROWTH.md`.
- [x] **English Outreach Playbook:** Standardized scripts in `docs/WHATSAPP_OUTREACH_AND_ONBOARDING_PLAYBOOK.md`.
- [x] **Pre-Build & Claim Engine:** Playbook and psychology in `docs/PRE_BUILD_AND_CLAIM_PLAYBOOK.md`.
- [x] **Vendor Lifecycle & Portal Specs:** Documented in `docs/VENDOR_PRODUCT_LIFECYCLE.md`.
- [x] **Dual WhatsApp Channels:** Architecture in `docs/WHATSAPP_CHANNEL_ECOSYSTEM.md`.
- [x] **Scarcity Drops Engine:** Documented in `docs/CHANNEL_MONETIZATION_DROPS.md`.
- [x] **Zoho One & Bigin $5k Strategy:** Complete blueprint in `docs/BIGIN_PARTNER_STRATEGY_AND_PLAYBOOK.md` and `docs/ZOHO_ONE_AND_COMMUNITY_ARCHITECTURE.md`.

---

### Phase 1: Zero-Dollar Infrastructure & Database Setup 🏗️ ✅ (COMPLETED)
*Deliverable: Fully connected, production-ready cloud database and edge hosting running at $0.00/mo.*
- [x] **1.1 Web App Framework:** Next.js 15 (App Router) scaffolded with TypeScript, Tailwind CSS, Lucide React, and mobile-first responsive layout.
- [x] **1.2 Supabase PostgreSQL Setup:**
  - Production SQL migration script created in `supabase/migrations/20261006_init_schema.sql`.
  - Enabled **PostGIS** extension for spatial radial queries.
  - Complete tables: `businesses`, `products`, `services`, `channel_drops`, `lead_events`.
  - GIN & GIST spatial indexing and authentic Kenyan seed data.
- [x] **1.3 Cloudflare R2 Storage Configuration:** Configured in `.env.example` with zero egress fees.
- [x] **1.4 Google Gemini 2.0 Flash API Integration:** Connected in `src/app/api/ingest/route.ts` with fallback extractor.
- [x] **1.5 Edge Deployment & Git Repository:** Git initialized and first production-ready build (`npm run build`) compiled successfully in 106 kB first-load JS.

---

### Phase 2: Core Web Discovery Engine (Consumer Frontend) 🛋️ ✅ (COMPLETED)
*Deliverable: Ultra-fast (<1s load time) consumer web experience optimized for Kenyan mobile devices.*
- [x] **2.1 Homepage & Kenyan Mental Geography Search (`src/app/page.tsx`):**
  - Instant landmark search bar with popular neighborhood pills (Ruiru Kamakis, Kilimani, Westlands, Syokimau, Karen).
  - Category quick-cards (Living & Sofas, Beds & Hardwood, Plumbers & Solar, Movers, Gypsum & Paint).
  - High-CTR WhatsApp Community Banner ("Over 5,400+ Homeowners on WhatsApp").
- [x] **2.2 Business Showroom / Decision Page (`src/app/biz/[slug]/page.tsx`):**
  - High-resolution workshop visual gallery.
  - Kenyan Trust Bar: Physical landmark anchor, M-Pesa Buy Goods Till badge, "Pay on Delivery" badge, 2-Year Warranty badge.
  - Structured attributes checklist (Solid Hardwood, EPRA Certified, Brings Own Tools, Customer Parking).
  - Sticky mobile floating button: **"Chat on WhatsApp"** with prefilled context.
- [x] **2.3 Scarcity Drop of the Day Showcase (`src/components/DropOfTheDay.tsx`):**
  - Daily 1-of-2 category drop slot demonstrating KSh 300–500 scarcity monetization.
- [x] **2.4 Programmatic SEO & Schema.org LocalBusiness (`src/utils/seo_generator.ts`):**
  - Structured data injected on showroom pages for Google rich snippets.

---

### Phase 3: The Pre-Build & Ingestion Factory ⚙️ ✅ (CORE READY)
*Deliverable: Automated pipeline that turns an Instagram link, Facebook post, or WhatsApp catalog into a live showroom.*
- [x] **3.1 AI Ingestion Endpoint (`src/app/api/ingest/route.ts`):**
  - Accepts raw text/social links and parses them with Gemini 2.0 Flash into validated `BusinessProfile` schema.
- [x] **3.2 Database Seed & Pre-Build Generator:** Seed data active with authentic pilot listings (Classic Hardwood Kamakis, QuickFix Plumbers Kilimani).
- [x] **3.3 Automated Outreach Message Formatter:** Documented in `docs/PRE_BUILD_AND_CLAIM_PLAYBOOK.md`.
- [ ] **3.4 Pilot Batch Execution:** Pre-build next batch of 30 live businesses on Supabase.

---

### Phase 5: Self-Service Vendor Lifecycle (Magic Link & Bot) 📱 ✅ (PORTAL READY)
*Deliverable: Zero-password vendor management allowing instant product additions and out-of-stock toggles.*
- [x] **5.1 Tokenized Magic-Link Mobile Portal (`src/app/portal/[token]/page.tsx`):**
  - Passwordless mobile UI displaying live showroom products.
  - Instant toggle: `[🟢 In Stock / 🔴 Sold Out]`.
  - Delete / Archive button.
- [x] **5.2 "Add Product in 3 Fields" Sheet (`src/app/portal/[token]/page.tsx`):**
  - 1) Photo snap, 2) Title, 3) Price (KES).
  - Real-time client-side simulation and publishing feedback loop.
- [x] **5.3 WhatsApp Lead Attribution Links (`src/utils/whatsapp_link.ts`):**
  - Pre-filled referral links connecting buyers directly to sellers.

---

### Phase 3: The Pre-Build & Ingestion Factory ⚙️
*Deliverable: Automated pipeline that turns an Instagram link, Facebook post, or WhatsApp catalog into a live showroom in < 60 seconds.*
- [ ] **3.1 Raw Input Ingestion Script:**
  - Accepts a social media URL, text dump, or image set.
  - Extracts business bio, landmark, products, and prices via Gemini 2.0 Flash.
- [ ] **3.2 Database Seed & Pre-Build Generator:**
  - Inserts listing into Supabase with `is_claimed = false`.
  - Generates the live preview URL: `homekenya.co.ke/biz/[slug]`.
- [ ] **3.3 Automated Outreach Message Formatter:**
  - Generates the personalized pre-build WhatsApp copy ready to be sent to the business owner with one click.
- [ ] **3.4 Pilot Batch (Seed 30 Businesses):**
  - Pre-build 15 furniture makers in Ruiru/Kamakis/Ngong Road.
  - Pre-build 10 verified emergency plumbers & electricians in Kilimani/Westlands.
  - Pre-build 5 professional moving companies.

---

### Phase 4: WhatsApp Dual-Channel Launch & Outreach Campaign 📢
*Deliverable: 30 claimed vendors onboarded; B2B and B2C channels initialized.*
- [ ] **4.1 Launch Channel 1 (B2B): Biashara Professionals:**
  - Set up WhatsApp Announcement Channel with 1-way broadcast and threaded comments.
  - Prepare first 5 daily micro-tips (taking better lighting photos, reviving dead WhatsApp inquiries).
- [ ] **4.2 Launch Channel 2 (B2C): Home Kenya Deals & Living:**
  - Set up consumer broadcast channel.
  - Add subscription buttons on the platform homepage and product pages.
- [ ] **4.3 Execute Outreach Batch (30 Pre-Built Vendors):**
  - Dispatch the "Pre-Build & Claim" message to the 30 pilot businesses.
  - Target: **18+ Claimed listings (60%+ conversion rate)**.
  - Invite all claimed vendors into the Biashara Professionals channel.

---

### Phase 5: Self-Service Vendor Lifecycle (Magic Link & Bot) 📱
*Deliverable: Zero-password vendor management allowing instant product additions and out-of-stock toggles.*
- [ ] **5.1 Tokenized Magic-Link Mobile Portal (`/portal/[vendor-token]`):**
  - Passwordless mobile UI displaying active products.
  - Simple Green/Gray toggle: `[In Stock / Sold Out]`.
  - Delete button.
- [ ] **5.2 "Add Product in 3 Fields" Drawer:**
  - Fields: 1) Photo upload, 2) Title, 3) Price (KES).
  - Background AI pipeline: Auto-generates description, tags, room category, and SEO schema in 5 seconds.
- [ ] **5.3 Instant WhatsApp Confirmation Feedback:**
  - Sends immediate WhatsApp message back to the vendor with their live product link and quick text commands (`OUT`, `PRICE`, `DELETE`).

---

### Phase 6: Zoho One Integration & Operational HQ 🏢
*Deliverable: Centralized operations command center inside Zoho One managing multi-platform growth.*
- [ ] **6.1 Zoho CRM Setup:**
  - Add mandatory custom field: `Platform: [Home Kenya, Beauty Kenya, Experiences Kenya]`.
  - Configure Layout Rules for Home Kenya (show workshop landmarks, solid hardwood type, EPRA certification).
  - Set up dedicated Deal Pipelines: `Home Vendor Onboarding`, `Weekend Micro-Boosts`, `Bigin Partner Upgrades`.
- [ ] **6.2 Zoho Flow Webhook Relay:**
  - Connect Supabase database webhooks via `src/utils/zoho_flow_webhook.ts`.
  - Automatically create/update Accounts, Contacts, and Deals in Zoho CRM in real time.
- [ ] **6.3 Zoho Mail & Zoho Desk Multi-Domain Setup:**
  - Verify `homekenya.co.ke` domain in Zoho Mail.
  - Set up `hello@homekenya.co.ke` and create dedicated support department in Zoho Desk.
- [ ] **6.4 Biashara Professionals Masterclasses via Zoho Meeting:**
  - Schedule bi-weekly live session inside Zoho Meeting for vendors.

---

### Phase 7: Monetization Rollout & The $5,000 USD Partner Goal 💰
*Deliverable: Recurring cash flow from M-Pesa micro-boosts, category drops, and hitting the Zoho Partner tier.*
- [ ] **7.1 M-Pesa Daraja API Integration (Micro-Boosts):**
  - Set up Safaricom Daraja STK Push integration.
  - Enable one-tap KSh 250 weekend boost for vendors.
- [ ] **7.2 WhatsApp Consumer Channel "Drop of the Day" (KSh 300 – 500):**
  - Open 2–3 daily category slots on a first-come, first-served basis.
  - Broadcast exclusive channel drops to consumers at 11:00 AM daily.
- [ ] **7.3 Serious Shop CRM Outreach (Day 10–14 Trigger):**
  - Identify top 15 showrooms and high-ticket home businesses with 2+ staff.
  - Execute the "Biashara Sales Tracker (Bigin Free)" pitch.
  - Provision pre-configured Kenyan Home Sales Pipeline boards.
- [ ] **7.4 Close 20 "Biashara Growth Suite" Annual Bundles:**
  - Package: Verified Directory Top Spot + 2 Monthly WhatsApp Drops + Bigin Premier Setup (KSh 35,000/year).
  - **Milestone Reached:** $5,000+ USD in Zoho subscription revenue achieves next-level Partner tier.

---

### Phase 8: Factory Replication (Beauty & Experiences) 🚀
*Deliverable: Clone the tested engine into vertical #2 and #3.*
- [ ] **8.1 Launch Vertical 2: Beauty Kenya (`beautykenya.co.ke`):**
  - Clone database schema and UI components.
  - Target: Salons, barbers, spas, braiding, and cosmetic retailers.
  - Leverage existing B2B seller network in Biashara Professionals.
- [ ] **8.2 Launch Vertical 3: Experiences Kenya (`experienceskenya.co.ke`):**
  - Decision engine for family activities, kid-friendly dining, weekend events, and outdoor experiences.
