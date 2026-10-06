import { demoContent } from "@/data/demo";
import { site } from "@/data/site";
import { Media } from "./Media";
export function DemoPeople() {
  if (site.launchReady) return null;
  return <div><p className="demo-note">Temsili ekip · İsimler ve görevler örnektir.</p><div className="demo-info-grid">{demoContent.team.map(p => <article key={p.name}><p className="eyebrow">{p.role}</p><h3>{p.name}</h3><p>{p.text}</p></article>)}</div></div>;
}
export function DemoStories() {
  if (site.launchReady) return null;
  return <section className="shell section demo-stories"><p className="eyebrow">LUMO AİLESİ</p><h2>Birlikte yazılan hikâyeler.</h2><p className="demo-note">Temsili aile hikâyeleri · Gerçek müşteri yorumu değildir.</p><div className="demo-story-grid">{demoContent.stories.map(p => <article key={p.name}><Media asset={{ desktopSrc: `/media/examples/${p.image}.webp`, alt: p.name + " için temsili yavru görseli", isExample: true, aspectRatio: "4 / 3" }} /><div><blockquote>“{p.quote}”</blockquote><p className="eyebrow">{p.name} · {p.city}</p></div></article>)}</div></section>;
}
export function DemoCare() {
  if (site.launchReady) return null;
  return <section className="shell section"><p className="eyebrow">TEMSİLİ DOSYA İÇERİĞİ</p><h2>Tanışmadan önce, bütün ayrıntılar.</h2><div className="demo-info-grid">{demoContent.care.map(c => <article key={c.title}><h3>{c.title}</h3><p>{c.text}</p></article>)}</div></section>;
}
export function ExamplePuppyDetails({ name }: { name: string }) {
  return <section className="shell section demo-profile-details"><p className="eyebrow">TEMSİLİ PROFİL AYRINTILARI</p><h2>{name} hakkında biraz daha.</h2><p className="demo-note">Aşağıdaki içerik tasarım örneğidir; gerçek soy, bakım veya sağlık kaydı değildir.</p><div className="demo-info-grid"><article><h3>Ailesi</h3><dl><div><dt>Anne · örnek isim</dt><dd>Olivia</dd></div><div><dt>Baba · örnek isim</dt><dd>Oscar</dd></div></dl><p>Aile fotoğrafları ve doğrulanmış soy bilgileri bu bölümde paylaşılabilir.</p></article><article><h3>Günlük ritmi</h3><p>Kısa oyun anları, sessiz bir dinlenme alanı ve yavaş ilerleyen tanışmalar. Sevdiği oyuncak: yumuşak kumaş top. Bunlar bu profil için yazılmış örnek gözlem notlarıdır.</p></article><article><h3>Tanışma dosyası</h3><p>Bakım alışkanlıkları, beslenme notları ve yeni eve hazırlık listesi. Sağlık belgeleri ve mikroçip bilgisi gerçek kayıtlar eklendiğinde ayrıca gösterilir.</p></article></div></section>;
}
