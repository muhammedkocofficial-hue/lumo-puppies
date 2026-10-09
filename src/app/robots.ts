import type { MetadataRoute } from "next";
import { site } from "@/data/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(site.launchReady ? { allow: "/", disallow: ["/admin/", "/api/"] } : { disallow: "/" }),
    },
    ...(site.url ? { sitemap: new URL("/sitemap.xml", site.url).href } : {}),
  };
}
