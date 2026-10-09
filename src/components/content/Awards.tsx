import { initialAwards } from "@/data/live-awards";
import { getContent } from "@/lib/cms-server";
import { Media } from "@/components/ui/Media";
import { TextLink } from "@/components/ui/Editorial";
import { ArticleBody } from "@/components/ui/ArticleBody";
export async function Awards({full=false}:{full?:boolean}){const published=await getContent("award");const items=published.length?published:initialAwards;return <section id="basarilar" className={"shell section award-editorial "+(full?"award-full":"")}><p className="eyebrow">BAŞARILARIMIZ</p>{(full?items:items.slice(0,1)).map(p=><article key={p.id}><div className="award-photo-pair">{p.payload.images.slice(0,2).map(i=><Media key={i.src} asset={{desktopSrc:i.src,alt:i.alt,aspectRatio:"4 / 5"}}/>)}</div><div className="award-editorial-copy"><p className="eyebrow">{[p.payload.event,p.payload.year].filter(Boolean).join(" · ")}</p><h2>{p.payload.title}</h2><p>{p.payload.description}</p>{full?<ArticleBody text={p.payload.body}/>:<TextLink href="/hakkimizda/#basarilar">Bu özel anın hikâyesi</TextLink>}</div></article>)}</section>;}
