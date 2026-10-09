import type { MetadataRoute } from "next";
import { site, navigation } from "@/data/site";
import { publishedBreeds } from "@/data/breeds";
import { getContent } from "@/lib/cms-server";
import { isExamplePuppy } from "@/lib/search-indexing";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [puppies, posts] = await Promise.all([getContent("puppy"), getContent("post")]);
  const pages = ["/", ...navigation.map(n=>n.href), ...publishedBreeds.map(b=>"/irklar/"+b.slug+"/")];
  return [...new Set(pages)].map(p=>({url:new URL(p,site.url).href})).concat(
    [...puppies.filter(p=>!isExamplePuppy(p)), ...posts].map(p=>({
      url: new URL((p.kind==="puppy"?"/yavrular/":"/blog/")+p.slug+"/",site.url).href,
      ...(Number.isNaN(Date.parse(p.updated_at))?{}:{lastModified:new Date(p.updated_at)})
    }))
  );
}
