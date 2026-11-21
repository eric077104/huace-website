import type { Metadata } from "next";

export const defaultOgImage = "/brand/og-image.png";

type PageMetadataInput = {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
};

/** Include the complete Open Graph object because child metadata replaces its parent object. */
export function pageMetadata({ title, description, canonical, image }: PageMetadataInput): Metadata {
  const images = [image || defaultOgImage];
  return {
    title: { absolute: title },
    ...(description ? { description } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type: "website",
      locale: "zh_TW",
      siteName: "畫策整合行銷",
      title,
      ...(description ? { description } : {}),
      ...(canonical ? { url: canonical } : {}),
      images,
    },
    twitter: { card: "summary_large_image", title, ...(description ? { description } : {}), images },
  };
}
