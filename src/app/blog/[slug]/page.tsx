import { notFound } from "next/navigation";
import { getEntry } from "@/lib/cms-server";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { Media } from "@/components/ui/Media";
import { TextLink,ContactInvitation } from "@/components/ui/Editorial";
import { ArticleBody } from "@/components/ui/ArticleBody";
export const dynamic="force-dynamic";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const e=await getEntry("post",slug);return e?pageMetadata(e.payload.title,e.payload.description,"/blog/"+slug+"/"):{};}
export default async function Page({params}:Props){const {slug}=await params;const entry=await getEntry("post",slug);if(!entry)notFound();const p=entry.payload;const schema={"@context":"https://schema.org","@type":"BlogPosting",headline:p.title,description:p.description,author:{"@type":"Organization",name:"Lumo Puppies"},...(site.url?{url:new URL('/blog/'+slug+'/',site.url).href}:{}),dateModified:entry.updated_at};return <><article className="shell blog-article"><TextLink href="/blog/">Tüm yazılar</TextLink><header><p className="eyebrow">{p.category||"LUMO JOURNAL"}</p><h1>{p.title}</h1><p className="lead">{p.description}</p><p className="reading-time">{Math.max(1,Math.ceil(p.body.split(/\s+/).length/180))} dakika okuma · Lumo Puppies</p></header><Media asset={{desktopSrc:p.images[0]?.src,alt:p.images[0]?.alt||p.title,aspectRatio:"16 / 9"}} priority/><ArticleBody text={p.body}/>{p.images.slice(1).map(i=><Media key={i.src} asset={{desktopSrc:i.src,alt:i.alt,aspectRatio:"3 / 2"}}/>)}<aside className="article-sources"><p>Irklar hakkında daha fazla bilgi:</p><a href="https://www.akc.org/dog-breeds/pomeranian/" target="_blank" rel="noopener noreferrer">AKC · Pomeranian</a><a href="https://www.akc.org/dog-breeds/poodle-toy/" target="_blank" rel="noopener noreferrer">AKC · Toy Poodle</a></aside></article><ContactInvitation/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\u003c")}}/></>;}
