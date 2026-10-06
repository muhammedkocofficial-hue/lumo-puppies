import { awardExamples } from "@/data/showcase";
import { verifiedAwards } from "@/data/awards";
import { site } from "@/data/site";
import { Media } from "@/components/ui/Media";
import { AwardFeature } from "./Stories";

export function AwardShowcase() {
  if (verifiedAwards.length) return <AwardFeature />;
  if (site.launchReady) return null;
  return (
    <section className="award-showcase" aria-label="Ödüllerimiz — temsili vitrin">
      <div className="shell">
        <header className="award-showcase-heading">
          <div><p className="eyebrow">TEMSİLİ ÖDÜL VİTRİNİ</p><h2 data-reveal="text">Ödüllerimiz</h2></div>
          <p>Temsili başarı seçkisi. Görseller, yıllar ve dereceler tasarım örneğidir; gerçek bir ödül kaydı değildir.</p>
        </header>
        <p className="award-swipe-hint">Seçkiyi kaydırarak keşfedin <span aria-hidden="true">→</span></p>
        <div className="award-showcase-grid" tabIndex={0} role="region" aria-label="Temsili ödül görselleri, yatay kaydırılabilir seçki">
          {awardExamples.map((item) => <article key={item.title}>
            <div data-reveal="media"><Media asset={item.media} /></div>
            <div className="award-example-caption"><p className="eyebrow">{item.subtitle}</p><h3>{item.title}</h3></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
