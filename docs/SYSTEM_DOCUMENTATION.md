# HomeDuka (Home Kenya) — System Architecture & Feature Documentation

> **Platform Version:** 2.0.0  
> **Target Market:** Kenya (Nairobi Metro, Kiambu, Machakos, Kajiado, Mombasa, Nakuru, Kisumu, Eldoret)  
> **Brand Identity:** HomeDuka Kenya (`#B45309` Terracotta / Stone Charcoal `#1C1917` / Warm Cream `#FDFBF7`)  
> **Core Principle:** **"Act > Read"** — High-velocity conversions, scannable micro-badges, zero fluff, instant WhatsApp & Lipa na M-Pesa transactions.

---

## 1. Executive Summary & Value Proposition

HomeDuka is Kenya's dedicated, hyper-local digital home marketplace. It bridges the gap between Kenyan homeowners/renters and local artisan workshops, hardware stores, certified fundis, and monthly upkeep service providers.

### The Kenyan Market Problem
1. **Middleman Inflation:** High street furniture showrooms and brokers mark up artisan workshop prices by 60% to 150%.
2. **Contact Form Friction:** Kenyan buyers do not fill out web inquiry forms or send emails; they demand immediate 1-tap WhatsApp chats.
3. **Trust Deficit:** Rampant Facebook/Instagram furniture scams and unqualified fundis cause buyers severe anxiety regarding upfront payments.
4. **Neighborhood Specificity:** Delivery costs, site visits, and emergency responsiveness depend entirely on micro-locations (e.g., *Ruiru Kamakis*, *Kileleshwa*, *Membley*, *Ngong Road*).

### HomeDuka's Solution
- **Direct-to-Workshop:** Direct connection to workshops along Eastern Bypass, Ngong Road, Jogoo Road, and Bomas.
- **Contextual WhatsApp Engine:** Pre-filled links specifying item name, direct price, buyer's estate, and verified Till.
- **Lipa na M-Pesa Till Verification:** Anti-fake proof ensuring legitimate trade names before money changes hands.
- **Action-Oriented Design:** Universal high-contrast black action buttons (`bg-stone-900 hover:bg-black text-white`) with zero bright yellow distraction.

---

## 2. Core Design System & The "Act > Read" Rule

### 2.1 The "Act > Read" Mandate
Across every screen, component, and modal, the interface adheres to a strict rule:
- **Less Prose, More Punch:** Cut paragraph descriptions down to 1-line scannable value bullets.
- **Visual Micro-Badges:** Replace lengthy guarantee sentences with compact visual tags:
  - `📷 Free Photo Check` (Send photo/video on WhatsApp for free estimate)
  - `📐 Free Site Visit` (Free measurement in provider's neighborhood)
  - `🛡️ 36m Warranty` (Written hardwood or installation guarantee)
  - `✓ Lipa na M-Pesa Till` (Verified Merchant ID)
- **High-Velocity CTAs:** Buttons clearly state the action:
  - `Order on WhatsApp` (for physical products)
  - `Book on WhatsApp` (for service providers & fundis)
  - `Claim Deal on WhatsApp` (for 24h flash & monthly deals)
  - `Compare Side-by-Side` (for side-by-side spec evaluation)

### 2.2 Color System
| Token | Hex / Class | Purpose |
|---|---|---|
| **Terracotta Accent** | `#B45309` (`text-[#B45309]`, `bg-[#B45309]`) | Primary brand warmth, Kenyan red soil / clay homage |
| **Black Action Button** | `bg-stone-900 hover:bg-black text-white` | Primary universal CTA across all cards and modals |
| **Warm Canvas** | `#FDFBF7` (`bg-[#FDFBF7]`) | Editorial, high-end warm paper ground |
| **Surface Cards** | `#FFFFFF` (`bg-white border-stone-200`) | Clean product & service card containers |
| **Verification Emerald**| `text-emerald-700 bg-emerald-50 border-emerald-200` | Lipa na M-Pesa & verified inspection badges |
| **Flash Rose** | `text-rose-600 bg-rose-50 border-rose-200` | 24H flash discounts and emergency badges |

---

## 3. Information Architecture & Navigation

### 3.1 Layman Mega-Menus (`Header.tsx`)
- **Home Products:** Grouped by home spaces:
  - *Living Room:* 7-Seater Sofas, TV Wall Consoles, Chesterfields, Coffee Tables, Curtains.
  - *Bedroom:* 6x6 Hardwood Beds, Fitted Wardrobes, Orthopedic Mattresses, Storage Beds.
  - *Kitchen & Dining:* 6-Seater Dining, Modular Cabinetry, Granite Worktops, Cookware.
  - *Bathroom & Water:* Solar Water Heaters, Pressure Pumps, Mixer Taps, Instant Showers.
- **Home Services & Fundis:** Grouped by urgent vs maintenance trades:
  - *Repairs & Fundis:* EPRA Electricians, NCAW Plumbers, Custom Carpenters, Gypsum Ceilings, Appliance Technicians.
  - *Monthly Recurring Care:* Water Tank Cleaning, Pest Control & Fumigation, Sofa & Carpet Machine Wash.
- **Today's Deals:** Fast filter between 24H Flash Slashes and Monthly Upkeep Deals.
- **Shop by Room:** Visual spatial entry point (`/page.tsx#rooms`).
- **Buyer Guides:** Practical Kenyan buying guides (e.g., hardwood timber species, solar sizing).

### 3.2 Geographic Taxonomy (`src/data/kenyan_taxonomy.ts`)
Three-tier cascading location selector:
1. **County:** Nairobi, Kiambu, Machakos, Kajiado, Nakuru, Mombasa, Kisumu, Uasin Gishu.
2. **Sub-County:** Westlands, Ruiru, Lang'ata, Kasarani, Dagoretti North, Kikuyu, etc.
3. **Estate / Stage Landmark:** Kamakis Stage, Membley, Kileleshwa, Kilimani, Roysambu, Kahawa Sukari, Whispers/Runda, South C.

---

## 4. Key Feature Implementations

### 4.1 Feature 1: Elevated Visuals & Editorial Catalog (Option 1)
- High-resolution workshop and interior imagery showcasing authentic Kenyan woodwork, joinery, and completed installations.
- Badging indicating timber species (`Solid Kiln-Dried Mahogany`, `Mvule`, `Bluegum`), upholstery grade (`High-Density Foam`, `Turkish Velvet`), and production method (`In Stock` vs `Made to Order`).
- Clean visual room taxonomies (`BrowseByRoom.tsx`) allowing buyers to furnish entire living spaces room-by-room.

### 4.2 Feature 2: Pre-Filled Contextual WhatsApp Conversion Engine (Option 2)
Located at [`src/utils/whatsapp_link.ts`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/utils/whatsapp_link.ts):
- Converts buyer intent into structured, zero-typing Swahili-English WhatsApp messages.
- Dynamically injects:
  - Business Name & WhatsApp Number
  - Item Title and Reference Code
  - Direct Price (KES) & Discount Savings
  - Delivery Scope (Free Nairobi Metro vs Parcel)
  - Buyer's Estate / Landmark
  - Lipa na M-Pesa Till number confirmation
  - Affirmed Commitments (e.g. Free photo assessment, Free site measurement)

### 4.3 Feature 3: Mobile Quick-Action Dock (Option 3)
Located at [`src/components/MobileQuickDock.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/MobileQuickDock.tsx):
- Fixed sticky dock at the bottom of mobile viewports.
- High-velocity action triggers:
  1. **Search:** Smoothly scrolls and focuses the search input.
  2. **Estate:** Dispatches `open-location-modal` to open the county/estate selector.
  3. **Deals:** Jumps directly to `#today-deals` carousel.
  4. **Compare:** Displays dynamic count badge (`Scale (n)`) and opens side-by-side comparison.
  5. **Emergency:** Triggers 24/7 emergency fundi dispatch bar (`#emergency-dispatch`).

### 4.4 Feature 4: Seller Self-Serve Onboarding Flow (Option 4)
Located at [`src/app/sell/page.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/app/sell/page.tsx):
- Frictionless 2-minute vendor listing wizard.
- Three concise sections:
  1. *Workshop / Fundi Profile:* Business name, WhatsApp line, category.
  2. *Location & Local Trust:* County, sub-county, workshop stage landmark, and free local assessment affirmation.
  3. *Lipa na M-Pesa & First Listing:* Till number, sample product title, and direct price.
- 1-Click WhatsApp Activation: Generates pre-formatted verification message directly to HomeDuka operations team for instantaneous onboarding.

---

## 5. Anti-Fake Verified Buyer Review System

Located at:
- Component: [`src/components/VerifiedReviewsSection.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/VerifiedReviewsSection.tsx)
- Modal: [`src/components/WriteReviewModal.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/WriteReviewModal.tsx)
- Schema: `VerifiedReview` in [`src/types/schema.ts`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/types/schema.ts)
- Mock Data: `SAMPLE_VERIFIED_REVIEWS` in [`src/data/mock_listings.ts`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/data/mock_listings.ts)

### Anti-Fake Safeguards
1. **Mandatory Item Identification:** Reviewers must specify the exact item or service bought (e.g. *7-Seater Modern Chesterfield Sofa Set*, *Emergency Pipe Burst Repair*).
2. **Payment & Job Proof Verification:**
   - Lipa na M-Pesa Till snippet (e.g. `QK89***712 (Lipa na M-Pesa Till 894211)`).
   - Completed site visit verification.
   - Workshop invoice reference.
3. **Hyper-Local Buyer Attribution:** Shows buyer name/initials and estate (e.g. *Wanjiru M. • Kileleshwa, Nairobi*).
4. **Customer Showroom / Living-Room Photos:** Real photos of delivered furniture in Kenyan homes.
5. **Helpful Upvote System:** Allows buyers to mark helpful reviews to elevate authentic experiences.

---

## 6. Side-by-Side Comparison Engine

Located at:
- State Context: [`src/context/ComparisonContext.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/context/ComparisonContext.tsx)
- Floating Dock: [`src/components/ComparisonDrawer.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/ComparisonDrawer.tsx)
- Matrix Modal: [`src/components/ComparisonModal.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/ComparisonModal.tsx)
- Card Toggles: Integrated into [`ProductCard.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/ProductCard.tsx) and [`ServiceCard.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/ServiceCard.tsx).

### How It Works
- Users tap `⚖️ Compare` on any product or service card.
- Supports side-by-side evaluation of up to 4 items simultaneously.
- Persisted in browser `localStorage` (`homeduka_comparison_v1`).
- Side-by-side comparison matrix evaluates:
  1. *Direct Price (KES)*
  2. *Vendor Name & Estate Location*
  3. *Material / Trade Specs* (Solid Mahogany vs Mvule vs Cypress)
  4. *Nairobi Delivery Scope* (Free delivery vs standard transit)
  5. *Written Warranty Period* (e.g. 36 Months guarantee)
  6. *Lipa na M-Pesa Till Verification Status*
  7. *Direct WhatsApp CTA Button*

---

## 7. Web App Push Notifications & Alert Preference Center

Located at:
- Component: [`src/components/AlertPreferencesModal.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/AlertPreferencesModal.tsx)
- Triggers: Mounted in [`Header.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/Header.tsx) and [`InstallAppBanner.tsx`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/components/InstallAppBanner.tsx).
- Schema: `AlertNotificationPreference` in [`src/types/schema.ts`](file:///c:/Dev/Home%20-%20Digital%20Mktplc/src/types/schema.ts).

### User Alert Categories
- ⚡ **Today's Flash Slashes:** Price cuts >20% on sofas, beds, appliances.
- 🔄 **Monthly Refills & Upkeep:** Scheduled reminder (1st of month) for water tank cleaning, pest spray, filter replacements.
- 🏷️ **Estate Soko Offers:** Notifications when workshops in user's sub-county launch local promotions.
- 🚨 **24/7 Emergency Fundi Status:** Plumber and electrician on-call alerts during power trips or water rationing.

### Push Features
- Integrated with native browser `Notification.requestPermission()`.
- Interactive **"Test Alert"** simulator to preview alert formatting.
- Preferences persisted to `localStorage` (`homeduka_alert_preferences_v1`).

---

## 8. Today vs Monthly Deals Engine (`TodayDealsCarousel.tsx`)

- **Dual-Mode Toggle:** Users toggle seamlessly between:
  - `[ Today's Flash Deals ]` (24-hour price cuts ending at midnight EAT).
  - `[ Monthly Deals & Refills ]` (Curated monthly subscriptions & home upkeep specials).
- **Live Kenya-Time Countdown:** Real-time clock counting down to midnight East Africa Time (UTC+3).
- **Urgent Inventory Scarcity:** Live `⚡ Only n slots left` indicator.
- **Sponsored Slices:** Distinct terracotta `SPONSORED` badge for featured merchant deals.

---

## 9. Codebase Directory Structure

```text
c:\Dev\Home - Digital Mktplc\
├── docs\
│   └── SYSTEM_DOCUMENTATION.md      # This master architectural documentation
├── src\
│   ├── app\
│   │   ├── layout.tsx                # Root layout with ComparisonProvider, Dock & Modals
│   │   ├── page.tsx                  # High-velocity homepage with Act > Read microcopy
│   │   ├── sell\
│   │   │   └── page.tsx              # 2-minute seller self-serve onboarding flow
│   │   ├── deals\                    # Dedicated deals and promotions page
│   │   ├── services\                 # Home services & fundi catalog
│   │   ├── shop\                     # Product catalog & room filters
│   │   ├── biz\                      # Programmatic merchant profile pages
│   │   ├── blog\                     # Buyer education & materials guides
│   │   └── portal\                   # Merchant self-service management
│   ├── components\
│   │   ├── Header.tsx                # Layman mega-menus, location switcher, alerts trigger
│   │   ├── MobileQuickDock.tsx       # Sticky mobile bottom action bar
│   │   ├── TodayDealsCarousel.tsx    # Daily vs monthly deals with EAT countdown
│   │   ├── ProductCard.tsx           # Direct price, compare toggle, WhatsApp CTA
│   │   ├── ServiceCard.tsx           # Labor unit rate, micro-badges, compare toggle
│   │   ├── BusinessCard.tsx          # Workshop showroom, physical landmark & Till badge
│   │   ├── ComparisonDrawer.tsx      # Sticky bottom comparison preview bar
│   │   ├── ComparisonModal.tsx       # Side-by-side spec & price comparison matrix
│   │   ├── VerifiedReviewsSection.tsx# Anti-fake buyer reviews with M-Pesa badges
│   │   ├── WriteReviewModal.tsx      # Verified review submission modal
│   │   ├── AlertPreferencesModal.tsx # Web app deal & upkeep alert preferences
│   │   ├── EmergencyDispatchBar.tsx  # 24/7 urgent plumbing/electrical callout bar
│   │   ├── MonthlyRecurringServices.tsx # Monthly upkeep essentials
│   │   ├── BrowseByRoom.tsx          # Spatial room taxonomy selector
│   │   └── WelcomeLocationModal.tsx  # County, sub-county & estate picker
│   ├── context\
│   │   └── ComparisonContext.tsx     # Global comparison state & modal management
│   ├── data\
│   │   ├── mock_listings.ts          # Authentic Kenyan listings, reviews, deals, products
│   │   └── kenyan_taxonomy.ts        # 47 Kenyan counties, subcounties & estates
│   ├── types\
│   │   └── schema.ts                 # Full TypeScript schema graph
│   └── utils\
│       └── whatsapp_link.ts          # High-converting WhatsApp link generator
```

---

## 10. Verification & Quality Checklist

- [x] Universal black buttons (`bg-stone-900 hover:bg-black text-white`) applied consistently.
- [x] Zero bright yellow across all components.
- [x] "Act > Read" rule enforced across hero, cards, banners, and modals.
- [x] Comparison engine supports side-by-side analysis for up to 4 items.
- [x] Verified buyer reviews feature real M-Pesa Till verification safeguards and anti-fake validation.
- [x] Web app push alert preferences center with live test alert simulator.
- [x] Seller self-serve onboarding flow at `/sell` with 1-tap WhatsApp activation.
- [x] Mobile quick dock sticky on all mobile viewports.
- [x] Full TypeScript type coverage with zero schema errors.
