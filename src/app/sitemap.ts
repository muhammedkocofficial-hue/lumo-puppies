import type { MetadataRoute } from "next";
import { site, navigation } from "@/data/site";
import { publishedBreeds } from "@/data/breeds";
import { publishedPuppies } from "@/data/puppies";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [
    "/",
    ...navigation.map((n) => n.href),
    ...publishedBreeds.map((b) => "/irklar/" + b.slug + "/"),
    ...publishedPuppies.map((p) => "/yavrular/" + p.slug + "/"),
  ].map((p) => ({ url: new URL(p, site.url).href }));
}
