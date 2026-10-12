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
  title: "HomeDuka Kenya | Everything For Your Home",
  description: "From custom furniture and electronics to monthly water refills and skilled fundis — discover verified home products and services across Kenya.",
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
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Home Kenya" />
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
