import { notFound } from "next/navigation";
import { getEntry } from "@/lib/cms-server";
import { pageMetadata } from "@/lib/seo";
import { Gallery } from "@/components/puppies/Gallery";
import { TextLink } from "@/components/ui/Editorial";
import { ContactActions } from "@/components/ui/ContactActions";
import { ArticleBody } from "@/components/ui/ArticleBody";
export const dynamic="force-dynamic";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const entry=await getEntry("puppy",slug);return entry?pageMetadata(entry.payload.title,entry.payload.description,"/yavrular/"+slug+"/"):{};}
export default async function Page({params}:Props){const {slug}=await params;const entry=await getEntry("puppy",slug);if(!entry)notFound();const p=entry.payload;return <><div className="shell breadcrumb"><TextLink href="/yavrular/">Tüm yavrular</TextLink></div><section className="shell puppy-profile"><header className="puppy-profile-title"><p className="eyebrow">{p.breed}</p><h1>{p.title}</h1></header><Gallery images={p.images.map(i=>({desktopSrc:i.src,alt:i.alt}))}/><div className="puppy-profile-copy"><p className="lead">{p.description}</p><p className="personality">{p.traits?.join(" · ")}</p><dl>{[["Cinsiyet",p.sex],["Renk",p.colour],["Doğum tarihi",p.birthDate?new Date(p.birthDate+"T12:00:00Z").toLocaleDateString("tr-TR",{timeZone:"UTC"}):""],["Durum",p.status?{available:"Tanışmaya açık",reserved:"Rezerve",home:"Yuvasını buldu"}[p.status]:""]].filter(([,v])=>v).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><ContactActions name={p.title}/></div></section>{p.body&&<section className="shell puppy-notes"><ArticleBody text={p.body}/></section>}</>;}
