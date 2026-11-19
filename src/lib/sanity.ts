import { createClient } from "next-sanity";
import { services as seedServices, solutions as seedSolutions, cases as seedCases, articles as seedArticles, siteSettings, homePage, aboutPage } from "@/content/seed";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityConfigured = Boolean(projectId);
export const client = projectId ? createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: true, token: process.env.SANITY_API_READ_TOKEN }) : null;

async function query<T>(groq: string, fallback: T): Promise<T> {
  if (!client) return fallback;
  try { return (await client.fetch<T>(groq)) ?? fallback; } catch { return fallback; }
}

const serviceProjection = "{..., \"slug\": slug.current, \"seo\": seo{..., \"ogImage\": ogImage{..., \"asset\": asset->{url}}}}";
const caseProjection = "{..., \"slug\": slug.current, \"coverUrl\": cover.asset->url, \"seo\": seo{..., \"ogImage\": ogImage{..., \"asset\": asset->{url}}}}";
const articleProjection = "{..., \"slug\": slug.current, \"category\": category->title, \"body\": pt::text(body), \"seo\": seo{..., \"ogImage\": ogImage{..., \"asset\": asset->{url}}}}";
export async function getHomePage() { return query("*[_type == 'homePage'][0] { ..., \"seo\": seo{..., \"ogImage\": ogImage{..., \"asset\": asset->{url}}} }", homePage); }
export async function getAboutPage() { return query("*[_type == 'aboutPage'][0] { ..., \"body\": pt::text(body), \"seo\": seo{..., \"ogImage\": ogImage{..., \"asset\": asset->{url}}} }", aboutPage); }
export async function getServices() { return query(`*[_type == 'service'] | order(order asc) ${serviceProjection}`, seedServices); }
export async function getService(slug: string) { return query(`*[_type == 'service' && slug.current == $slug][0] ${serviceProjection}`, seedServices.find((item) => item.slug === slug) ?? null); }
export async function getSolutions() { return query("*[_type == 'solution'] | order(order asc) { ..., \"slug\": slug.current }", seedSolutions); }
export async function getCases() { return query(`*[_type == 'caseStudy'] | order(order asc) ${caseProjection}`, seedCases); }
export async function getArticles() { return query(`*[_type == 'article' && defined(publishedAt)] | order(publishedAt desc) ${articleProjection}`, seedArticles); }
export async function getArticle(slug: string) { return query(`*[_type == 'article' && slug.current == $slug][0] ${articleProjection}`, seedArticles.find((item) => item.slug === slug) ?? null); }
export async function getSettings() {
  const settings = await query("*[_type == 'siteSettings'][0] { ..., \"defaultSeo\": defaultSeo{..., \"ogImage\": ogImage{..., \"asset\": asset->{url}}} }", siteSettings);
  return { ...siteSettings, ...settings, seoTitle: settings.seoTitle ?? settings.defaultSeo?.title ?? siteSettings.seoTitle, seoDescription: settings.seoDescription ?? settings.defaultSeo?.description ?? siteSettings.seoDescription };
}

export function docSeo(doc: { seo?: { title?: string; description?: string; ogImage?: { asset?: { url?: string } } }; title?: string }) {
  return { title: doc.seo?.title ?? doc.title ?? siteSettings.seoTitle, description: doc.seo?.description ?? siteSettings.seoDescription, openGraph: doc.seo?.ogImage?.asset?.url ? { images: [doc.seo.ogImage.asset.url] } : undefined };
}
