import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { Footer, Header } from "@/components/SiteChrome";
import { getSettings } from "@/lib/sanity";

const noto = Noto_Sans_TC({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-noto" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: settings.seoTitle, template: "%s｜HC 畫策" },
    description: settings.seoDescription,
    alternates: { canonical: "/" },
    openGraph: { type: "website", locale: "zh_TW", siteName: settings.brandName, title: settings.seoTitle, description: settings.seoDescription, images: settings.defaultSeo?.ogImage?.asset?.url ? [settings.defaultSeo.ogImage.asset.url] : undefined },
  };
}
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  return <html lang="zh-Hant" className={noto.variable}><body><Header insightsEnabled={settings.insightsEnabled}/><main id="main">{children}</main><Footer settings={settings}/><Analytics/></body></html>;
}
