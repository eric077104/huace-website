import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Montserrat, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { Footer, Header } from "@/components/SiteChrome";
import { getSettings } from "@/lib/sanity";

const noto = Noto_Sans_TC({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-noto", preload: false, display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-montserrat" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(siteUrl),
    icons: { icon: "/brand/favicon.png", apple: "/brand/apple-icon.png" },
    title: { default: settings.seoTitle, template: "%s｜畫策整合行銷" },
    description: settings.seoDescription,
    alternates: { canonical: "/" },
    openGraph: { type: "website", locale: "zh_TW", siteName: settings.brandName, title: settings.seoTitle, description: settings.seoDescription, images: settings.defaultSeo?.ogImage?.asset?.url ? [settings.defaultSeo.ogImage.asset.url] : ["/brand/og-image.png"] },
  };
}
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  return <html lang="zh-Hant" className={`${noto.variable} ${inter.variable} ${montserrat.variable} ${mono.variable}`}><body><Header insightsEnabled={settings.insightsEnabled} lineUrl={settings.lineUrl}/><main id="main">{children}</main><Footer settings={settings}/><Analytics/></body></html>;
}
