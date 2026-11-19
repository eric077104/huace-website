export type SeoFields = { title?: string; description?: string; ogImage?: { asset?: { url?: string } } };
export type SiteSettings = { companyName: string; brandName: string; email: string; phone: string; lineUrl: string; lineId: string; socialUrl: string; privacyNotice: string; insightsEnabled: boolean; seoTitle: string; seoDescription: string; defaultSeo?: { title?: string; description?: string; ogImage?: { asset?: { url?: string } } } };
export type Service = { slug: string; number?: string; name: string; label: string; title: string; summary: string; problems: string[]; items: string[]; audience: string; method: string; pair: string[]; seo?: SeoFields };
export type Solution = { name: string; label: string; parts: string; desc: string; seo?: SeoFields };
export type CaseStudy = { slug: string; name: string; category: string; tags: string[]; description?: string; background?: string; challenge?: string; execution?: string; outcome?: string; detailEnabled?: boolean; placeholder?: boolean; coverUrl?: string; seo?: SeoFields };
export type Article = { slug: string; title: string; category: string; excerpt: string; publishedAt?: string; body: string; seo?: SeoFields };

export type HomePageContent = { title: string; subtitle: string; primaryCta: string; secondaryCta: string; positioning: string; problemScenarios: string[]; solutionsIntro: string; seo?: SeoFields };
export type AboutPageContent = { title: string; body: string; capabilities: string[]; seo?: SeoFields };
