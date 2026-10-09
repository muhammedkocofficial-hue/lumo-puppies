import type { Metadata } from "next";
import { site } from "@/data/site";
export function pageMetadata(
  title: string,
  description: string,
  pathname = "/",
  image = site.logo,
): Metadata {
  const url = site.url ? new URL(pathname, site.url).href : undefined;
  const imageUrl = new URL(image, site.url).href;
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      locale: "tr_TR",
      type: "website",
      siteName: site.name,
      images: [{ url: imageUrl, alt: site.name }],
      ...(url ? { url } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
  };
}
