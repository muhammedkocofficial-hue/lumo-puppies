import Link from "next/link";
import type { ContentEntry } from "@/types/cms";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
export function ContentCards({items}:{items:ContentEntry[]}) {return <div className="content-grid">{items.map(p=><article key={p.id}><Link href={`/blog/${p.slug}/`}><Media asset={{desktopSrc:p.payload.images[0]?.src,alt:p.payload.images[0]?.alt||p.payload.title,aspectRatio:"3 / 2"}}/><p className="eyebrow">{p.payload.category||"LUMO JOURNAL"}</p><h3>{p.payload.title}</h3><p>{p.payload.description}</p><span className="text-link">Yazıyı okuyun <Icon/></span></Link></article>)}</div>;}
