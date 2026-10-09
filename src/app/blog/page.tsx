import { getContent } from "@/lib/cms-server";
import { PageIntro } from "@/components/ui/Editorial";
import { ContentCards } from "@/components/content/ContentCards";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata("Blog — Birlikte yaşam rehberi","Toy Poodle, Pomeranian ve yavru köpeklerle günlük yaşam, bakım ve eve hazırlık üzerine Lumo rehberleri.","/blog/");
export const dynamic="force-dynamic";
export default async function Page(){return <><PageIntro eyebrow="LUMO JOURNAL" title="Birlikte yaşamın küçük notları." text="Yeni bir dosta hazırlanırken, her güne biraz daha özen."/><section className="shell section"><ContentCards items={await getContent("post")}/></section></>;}
