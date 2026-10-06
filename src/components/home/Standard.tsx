import { site } from "@/data/site";
import { standardMedia } from "@/data/editorial";
import { TextLink } from "@/components/ui/Editorial";
import { Media } from "@/components/ui/Media";
export function Standard({ full = false }: { full?: boolean }) {
  return <section className={"standard visual-standard " + (full ? "standard-full" : "")}>
    <div className="shell standard-layout">
      <header className="standard-heading">
        <p className="eyebrow">{site.standard.eyebrow}</p>
        {!full && <h2 data-reveal="text">{site.standard.title}</h2>}
        <p className="standard-introduction">{site.standard.text}</p>
        {!full && <TextLink href="/lumo-standardi/">{site.standard.link}</TextLink>}
      </header>
      <div className="principles">
        {site.principles.map((p, i) => <article className="principle" key={p.title}>
          <div className="principle-visual" data-reveal="media"><Media asset={standardMedia[i]} /></div>
          <div className="principle-copy" data-reveal="text"><p className="eyebrow">{p.title}</p><h3>{p.subtitle}</h3><p>{p.text}</p></div>
        </article>)}
      </div>
    </div>
    {full && <p className="shell fine-note standard-note">{site.standard.note}</p>}
  </section>;
}
