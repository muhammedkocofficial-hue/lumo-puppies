import type { MetadataRoute } from "next";
import { site,navigation } from "@/data/site";
import { publishedBreeds } from "@/data/breeds";
import { getContent } from "@/lib/cms-server";
export const dynamic="force-dynamic";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{if(!site.url)return [];const [puppies,posts]=await Promise.all([getContent("puppy"),getContent("post")]);return ["/",...navigation.map(n=>n.href),...publishedBreeds.map(b=>"/irklar/"+b.slug+"/"),...puppies.map(p=>"/yavrular/"+p.slug+"/"),...posts.map(p=>"/blog/"+p.slug+"/")].map(p=>({url:new URL(p,site.url).href}));}
