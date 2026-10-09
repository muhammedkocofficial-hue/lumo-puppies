import { getContent } from "@/lib/cms-server";
import { toPuppy } from "@/lib/puppy-adapter";
import { PageIntro,ContactInvitation } from "@/components/ui/Editorial";
import { PuppyList } from "@/components/puppies/PuppyList";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata("Yavrularımız","Pomeranian, Toy Poodle ve Poodle türevlerinden yeni dostunuzu yakından tanıyın.","/yavrular/");
export const dynamic="force-dynamic";
export default async function Page(){const items=await getContent("puppy");return <div className="catalogue-page"><PageIntro eyebrow="YAVRULARIMIZ" title="Yeni dostunuzla tanışın." text="Her birinin ayrı bir karakteri, birlikte başlayacak ayrı bir hikâyesi var."/><section className="shell listing-section"><PuppyList items={items.map(toPuppy)} filters/></section><ContactInvitation/></div>;}
