import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ComparisonProvider } from "../context/ComparisonContext";
import ComparisonDrawer from "../components/ComparisonDrawer";
import ComparisonModal from "../components/ComparisonModal";
import MobileQuickDock from "../components/MobileQuickDock";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#B45309",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://homeduka.co.ke"),
  title: {
    default: "HomeDuka Kenya | Verified Home Furniture, Fundis & Refills",
    template: "%s | HomeDuka Kenya",
  },
  description: "Direct prices from verified timber yards and shops across Kenya. Bespoke sofas, hardwood beds, kitchen cookware, water tank cleaning, cooking gas refills, and vetted fundis with countrywide delivery.",
  keywords: [
    "furniture kenya",
    "sofa makers nairobi",
    "mahogany beds kenya",
    "gikomba timber yard",
    "ngong road furniture",
    "fundis nairobi",
    "water tank cleaning kenya",
    "cooking gas refill delivery",
    "pickup mtaani furniture",
    "boda boda delivery nairobi",
    "matatu route parcel kenya",
  ],
  authors: [{ name: "HomeDuka Kenya" }],
  creator: "HomeDuka Kenya",
  publisher: "HomeDuka Kenya",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://homeduka.co.ke",
  },
  openGraph: {
    title: "HomeDuka Kenya | Verified Home Furniture, Fundis & Refills",
    description: "Direct prices from verified timber yards and shops across Kenya. Pay on delivery & countrywide transport.",
    url: "https://homeduka.co.ke",
    siteName: "HomeDuka Kenya",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "HomeDuka Kenya Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeDuka Kenya | Verified Home Furniture, Fundis & Refills",
    description: "Direct prices from verified timber yards and shops across Kenya. Pay on delivery & countrywide transport.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HomeDuka",
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HomeDuka Kenya",
    url: "https://homeduka.co.ke",
    logo: "https://homeduka.co.ke/icons/icon.svg",
    description: "Kenya's trusted digital home marketplace connecting buyers with verified local furniture shops, timber yards, routine refills, and vetted fundis.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "KE",
    },
    areaServed: [
      "Nairobi",
      "Mombasa",
      "Kisumu",
      "Nakuru",
      "Eldoret",
      "Thika",
      "Naivasha",
      "Nyeri",
      "Meru",
      "Kitale",
      "Machakos",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+254712345678",
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    },
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HomeDuka Kenya",
    url: "https://homeduka.co.ke",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://homeduka.co.ke/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="HomeDuka" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className={`${fontSans.className} ${fontSans.variable} min-h-screen flex flex-col bg-[#FDFBF7] text-slate-900 antialiased selection:bg-stone-200 selection:text-stone-900 pb-16 sm:pb-0`}>
        <ComparisonProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ComparisonDrawer />
          <ComparisonModal />
          <MobileQuickDock />
        </ComparisonProvider>
      </body>
    </html>
  );
}
