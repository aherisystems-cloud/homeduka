# Playbook: Flagship Vendor Curating, Room Taxonomy & Automated Social Scheduling

> **Strategic Directive:** Position `Home Kenya` as the definitive, relatable home authority ("Everything Your Home Needs"), curate 5 trusted flagship Kenyan businesses with high-resolution products, implement room-based and monthly recurring categorization, and automate social media distribution via Zoho Social.

---

## 1. Brand Identity & Visual Positioning: The "Serene Home" Aesthetic

### Why We Moved Away from Bright Green & Heavy Banners
* **The Problem:** Heavy stacked colored banners, pulsing emergency alerts, and harsh neon green created visual clutter, making the platform look like a chaotic fintech dashboard or a classifieds ad board.
* **The Solution:** A warm, refined, architectural palette:
  - **Dominant Base:** Warm off-white / stone (`#FDFBF7`) and soft cream (`#FAF8F5`).
  - **Typography & Structure:** Grounded warm slate and deep charcoal (`#1C1917` / `#1E293B`).
  - **Warm Accents:** Cedar wood, warm amber, and terracotta (`#925C47` / `#B45309`).
* **The Tagline:**
  > **"Everything Your Home Needs. All in One Place."**  
  > *From bespoke living room sofas and fitted kitchens to routine water tank cleaning and skilled fundis — discover verified products and trusted artisans across Kenya.*

---

## 2. Information Architecture: The 3 Discovery Angles

A Kenyan homeowner approaches their home through three distinct lenses:

```
                                  HOME KENYA
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
   1. BY ROOM                   2. BY OFFERING                3. BY FREQUENCY
   • Living Room                • Tangible Products           • One-off Purchases
   • Bedroom                    • Skilled Trade Labor         • Emergency Fixes
   • Kitchen & Dining           • Installation Packages       • Monthly Recurring Care
   • Bathroom & Water                                           (Tanks, fumigation,
   • Compound & Outdoor                                          sofa shampoo, solar)
   • Home Office
```

### The Master Room Taxonomy (`HOME_ROOMS`)
1. **Living Room:** Sofas (Chesterfield, L-shaped, 7-seater), TV wall units, coffee tables, curtains, warm LED lighting, rugs.
2. **Bedroom:** Kiln-dried hardwood beds (6x6 King), hydraulic lift storage beds, orthopedic mattresses, fitted wardrobes.
3. **Kitchen & Dining:** Solid mahogany dining tables, modular acrylic/marine-ply cabinetry, quartz/granite worktops, pantry organizers.
4. **Bathroom & Water:** EPRA-certified solar water heaters, automatic pressure booster pumps, mixer taps, wall tiles.
5. **Compound & Outdoor:** Heavy-duty interlocking cabro paving, steel perimeter gates, outdoor patio sets, landscaping.
6. **Home Office & Study:** Bespoke study desks, ergonomic chairs, solid wood bookshelves.

### The Monthly Recurring Care Engine
Highlighting routine maintenance that every Kenyan homeowner needs every 1–3 months:
* **Water Tank Scrubbing & Chlorination:** Draining silt and biofilm from 1,000L–10,000L tanks.
* **Eco-Friendly Fumigation & Pest Shield:** Child- and pet-safe gel baits for cockroaches and bedbugs.
* **Sofa & Carpet Fabric Steam Shampooing:** Injection-extraction deep cleaning for velvet and fabric furniture.
* **Solar Water Heater Servicing:** Magnesium sacrificial anode check and glass tube descaling.
* **Garden & Compound Care:** Monthly hedge trimming, lawn mowing, and perimeter sweeping.

---

## 3. The 5 Flagship Vetted Kenyan Workshops

These 5 businesses serve as our benchmark flagship partners:

| Business Name | Location & Landmark | Specialty | Status | Flagship Products / Rates |
| :--- | :--- | :--- | :--- | :--- |
| **WoodCraft Living Kenya** | Kamakis, Eastern Bypass (Opposite Shell) | Solid Mahogany & Mvule Hardwood Furniture | Verified Pro (Claimed) | • 7-Seater Chesterfield Velvet Sofa: KSh 58,000<br>• 6x6 Storage Bed with Hydraulic Lift: KSh 42,000<br>• 6-Seater Mahogany Dining Set: KSh 46,000 |
| **FineLine Fitted Kitchens & Wardrobes** | Parklands / Westlands (Ojijo Road, Gate 2) | Modern Modular Kitchens & Built-in Wardrobes | Verified Pro (Claimed) | • Modular L-Shaped Fitted Kitchen: KSh 95,000<br>• 4-Door Fitted Bedroom Wardrobe: KSh 52,000<br>• Granite Worktop Fitting: KSh 7,500/m |
| **Solaria Energy & Water Systems** | Kilimani (Argwings Kodhek, nr Yaya) | EPRA Solar Heating, Pressure Pumps & Plumbing | Verified Pro (Claimed) | • 200L High-Pressure Solar Water Heater: KSh 78,000<br>• 0.75HP Automatic Booster Pump: KSh 24,500<br>• Emergency Pipe Burst Repair: KSh 1,800 labor |
| **Apex Gypsum Ceilings & Lighting** | Syokimau / Mombasa Rd (Gateway Mall) | Multi-Level Gypsum, LED Cove Lighting, Cabro | **Pre-Listed (Unclaimed)** | • Multi-Level Floating Gypsum: KSh 1,900/sqm<br>• TV Accent Wall with Fluted Panels: KSh 32,000<br>• 60mm Interlocking Cabro Paving: KSh 1,450/sqm |
| **CleanNest Pro Home Care & Movers** | Karen & Kilimani (Crossroad / Chania Ave) | Monthly Deep Cleaning, Sofa Shampoo, Relocations | Verified Pro (Claimed) | • Monthly Full-Home Deep Cleaning: KSh 6,500<br>• 7-Seater Sofa Steam Extraction: KSh 3,800<br>• Water Tank Scrubbing & Chlorination: KSh 3,500<br>• 2-Bedroom Moving with Packing: KSh 18,500 |

---

## 4. The Pre-Build & Claim Workflow

1. **Pre-Listing:** We build beautiful showcase pages for top workshops before contacting them.
2. **The "Unclaimed" Call-to-Action:** Unclaimed profiles feature a prominent banner:
   > *"Is this your workshop? This profile was pre-listed based on customer recommendations. Claim it free to manage your products."*
3. **The WhatsApp Outreach:**
   > *"Habari [Owner], tumetengeneza profile ya bure ya workshop yenu ya [Shop Name] kwenye Home Kenya kuonyesha sofa zenu nzuri na kazi za [Landmark]. Unaweza kuangalia hapa: homekenya.co.ke/shop/[slug]. Ukipenda, unaweza kuithibitisha (claim) bila malipo uweze kuongeza bidhaa zaidi."*
4. **Endowment Effect:** The owner sees their real products, their real landmark address, and their M-Pesa Till number already live and looking professional. They claim it because losing it feels like a loss.

---

## 5. Automated Social Media Distribution Pipeline (Zoho Social)

When a product or service is uploaded or marked for promotion, our system triggers an automated publishing pipeline:

```mermaid
flowchart LR
    Vendor[Vendor / Admin adds product] --> Formatted[social_scheduler.ts generates caption, hashtags & WA link]
    Formatted --> API[/api/social/schedule]
    API --> ZohoFlow[Zoho Flow Webhook]
    ZohoFlow --> ZohoSocial[Zoho Social Engine]
    ZohoSocial --> Channels["• Instagram Feed & Carousel<br>• Facebook Page & Groups<br>• WhatsApp Channel Drop<br>• X (Twitter)"]
```

### Pre-Formatted Social Media Copy Structure:
```text
✨ CHESTERFIELD 7-SEATER SOLID MAHOGANY MODERN SOFA SET ✨

🛋️ Price: KSh 58,000
📍 Workshop Landmark: Opposite Shell Petrol Station (Kamakis, Kiambu)
🛠️ Material: Kiln-Dried Solid Mahogany & Velvet Fabric
🚚 FREE Nairobi Delivery Included
🛡️ Verified Lipa na M-Pesa Buy Goods Till: 894211

💬 Order or inquire directly on WhatsApp:
https://wa.me/254712345678?text=...

🔗 See verified showcase on Home Kenya:
https://homekenya.co.ke/shop/woodcraft-living-kamakis

#HomeKenya #NairobiHomes #KenyanFurniture #KamakisCarpentry #MpesaVerified
```

### Zoho Social Integration Controls:
* In the Vendor Portal (`/portal/[token]`), each product features a 1-tap **"Schedule Social"** button.
* Clicking dispatches the payload to `/api/social/schedule`, queuing the drop directly into Zoho Social's publishing calendar without manual copy-pasting.
