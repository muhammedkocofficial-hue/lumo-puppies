import type { Metadata } from "next";
import { site } from "@/data/site";
export function pageMetadata(
  title: string,
  description: string,
  pathname = "/",
): Metadata {
  const url = site.url ? new URL(pathname, site.url).href : undefined;
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
      ...(url ? { url } : {}),
    },
    twitter: { card: "summary", title, description },
  };
}
