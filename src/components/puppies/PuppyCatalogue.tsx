"use client";
import { useState } from "react";
import Link from "next/link";
import { breeds } from "@/data/breeds";
import { publishedPuppies } from "@/data/puppies";
import { site } from "@/data/site";
import type { Puppy } from "@/types/content";
import { Media } from "@/components/ui/Media";
const statuses = { available: "Tanışmaya açık", reserved: "Rezerve", home: "Yuvasını buldu" };
export function PuppyList({ items = publishedPuppies, filters = false, limit }: { items?: Puppy[]; filters?: boolean; limit?: number }) {
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [status, setStatus] = useState("");
  const all = items.filter(p => !site.launchReady || !p.isExample);
  const breedName = (p: Puppy) => p.breedName || breeds.find(b => b.slug === p.breedSlug)?.name || "";
  const names = Array.from(new Set(all.map(breedName))).filter(Boolean);
  const matching = all.filter(p => (!breed || breedName(p) === breed) && (!sex || p.sex === sex) && (!status || p.status === status));
  const visible = limit ? matching.slice(0, limit) : matching;
  return <div className="catalogue">
    {all.some(p => p.isExample) && <p className="demo-note">Temsili seçki · Yavru fotoğrafları ve profil bilgileri örnektir.</p>}
    {filters && <div className="catalogue-filters" aria-label="Yavru filtreleri">
      <label>Irk<select aria-label="Irk" value={breed} onChange={e => setBreed(e.target.value)}><option value="">Tüm ırklar</option>{names.map(n => <option key={n}>{n}</option>)}</select></label>
      <label>Cinsiyet<select aria-label="Cinsiyet" value={sex} onChange={e => setSex(e.target.value)}><option value="">Tümü</option><option>Dişi</option><option>Erkek</option></select></label>
      <label>Durum<select aria-label="Durum" value={status} onChange={e => setStatus(e.target.value)}><option value="">Tüm yavrular</option>{Object.entries(statuses).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <p role="status">{matching.length} yavru</p>
    </div>}
    <div className="catalogue-grid">{visible.map((p, index) => <article className="catalogue-card" key={p.slug}>
      <Link href={"/yavrular/" + p.slug + "/"} className="catalogue-photo" aria-label={p.name + " hakkında bilgi"}>
        <Media asset={p.gallery[0]} priority={index < 3} />
        {p.status && <span className={"catalogue-status status-" + p.status}>{statuses[p.status]}</span>}
      </Link>
      <div className="catalogue-copy"><p className="eyebrow">{breedName(p)}</p>
        <div className="catalogue-name"><h3><Link href={"/yavrular/" + p.slug + "/"}>{p.name}</Link></h3><span>{p.sex}</span></div>
        <p className="catalogue-facts">{[p.colour, p.birthDate ? new Date(p.birthDate + "T12:00:00Z").toLocaleDateString("tr-TR", { month: "long", year: "numeric", timeZone: "UTC" }) + " doğumlu" : null].filter(Boolean).join(" · ")}</p>
        {p.personality && <p className="catalogue-traits">{p.personality.join(" · ")}</p>}
        <Link className="catalogue-link" href={"/yavrular/" + p.slug + "/"}>Yakından tanıyın <span aria-hidden="true">↗</span></Link>
      </div>
    </article>)}</div>
    {!visible.length && <div className="catalogue-empty"><h3>Bu seçkide henüz bir yavru yok.</h3><p>Diğer yavruları görmek için filtreleri değiştirebilirsiniz.</p>{(breed || sex || status) && <button className="button" onClick={() => { setBreed(""); setSex(""); setStatus(""); }}>Filtreleri temizle</button>}</div>}
  </div>;
}
