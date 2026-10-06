# Kenya Digital Marketplace & Discovery Network: Home Vertical

> **A zero-friction, attribute-driven local discovery engine for Home products & services in Kenya.**  
> Built for organic SEO dominance, high-trust local transactions, and zero-dollar monthly infrastructure overhead.

---

## 📁 Repository Structure

```
c:\Dev\Home - Digital Mktplc\
├── docs\
│   ├── ARCHITECTURE.md          # Complete blueprint, critique, and system topology
│   ├── INGESTION_PIPELINE.md    # Zero-friction seller onboarding via WhatsApp/Voice/AI
│   ├── MONETIZATION_AND_GROWTH.md# M-Pesa micro-boosts, verified badges & economics
│   ├── CHANNEL_MONETIZATION_DROPS.md # Scarcity-driven WhatsApp channel monetization ($300-500)
│   ├── BIGIN_PARTNER_STRATEGY_AND_PLAYBOOK.md # Path to $5k USD Zoho Partner threshold
│   ├── WHATSAPP_OUTREACH_AND_ONBOARDING_PLAYBOOK.md # Cold outreach scripts & intake flow
│   ├── PRE_BUILD_AND_CLAIM_PLAYBOOK.md # Pre-build & claim engine and psychology
│   ├── VENDOR_PRODUCT_LIFECYCLE.md# WhatsApp photo publishing & inventory management
│   ├── WHATSAPP_CHANNEL_ECOSYSTEM.md # B2B Biashara vs B2C Consumer channels
│   └── ZOHO_ONE_AND_COMMUNITY_ARCHITECTURE.md # Zoho One multi-platform setup & Bigin bridge
├── src\
│   ├── data\
│   │   └── mock_listings.ts     # Authentic Kenyan test listings (Ruiru, Kilimani, etc.)
│   ├── types\
│   │   └── schema.ts            # M01 - M05 Master schemas (Business, Location, Products)
│   └── utils\
│       ├── seo_generator.ts     # Programmatic Schema.org JSON-LD and SEO engine
│       ├── whatsapp_link.ts     # Frictionless Kenyan WhatsApp lead dispatch with prefill
│       └── zoho_flow_webhook.ts # Real-time sync from marketplace to Zoho One CRM
└── README.md                    # This document
```

---

## 🛠️ The $0 Infrastructure Stack

- **Frontend & Edge Routing:** Next.js 15 (App Router) / Astro on Cloudflare Pages or Vercel Hobby ($0/mo)
- **Database & Spatial Engine:** Supabase PostgreSQL + PostGIS ($0/mo free tier)
- **Asset Storage & CDN:** Cloudflare R2 (10GB free, $0 egress fees)
- **AI Ingestion & Enrichment:** Google Gemini 2.0 Flash (Free tier on Google AI Studio - 1,500 req/day)
- **Lead Communication:** Direct WhatsApp deep linking (`wa.me`) with zero intermediary API fees

---

## 🚀 The 15 Marketplace Operating System (MOS) Modules

- **M01: Business Schema** (`src/types/schema.ts` - `BusinessProfile`)
- **M02: Product Schema** (`src/types/schema.ts` - `HomeProduct`)
- **M03: Service Schema** (`src/types/schema.ts` - `HomeService`)
- **M04: Location Schema** (`src/types/schema.ts` - `KenyanLocation` with landmark anchors)
- **M05: Attribute Graph** (`src/types/schema.ts` - `BusinessAttributes`)
- **M06: Listing Intake** (`docs/INGESTION_PIPELINE.md` - Audio voice notes & WhatsApp bots)
- **M07: Trust & Verification** (M-Pesa Till verification, physical shop GPS checks)
- **M08: AI Enrichment** (Multi-modal vision + Swahili/Sheng translation)
- **M09: Programmatic SEO** (`src/utils/seo_generator.ts` - Schema.org JSON-LD)
- **M10: Programmatic Content** (Auto-generated social cards, collection directories)
- **M11: Distribution & Dispatch** (`src/utils/whatsapp_link.ts` - Contextual lead links)
- **M12: Monetization** (`docs/MONETIZATION_AND_GROWTH.md` - M-Pesa STK push micro-boosts)
- **M13: Analytics & Lead Metrics** (WhatsApp tap tracking, CTR per neighborhood)
- **M14: Moderation & Anti-Scam** (Reverse image search, deposit warning filters)
- **M15: Engine Replication** (Clone to Beauty & Experiences in Years 2 & 3)
