import { faq } from "@/data/faq";
import { site } from "@/data/site";
export function Faq() {
  return (
    <section id="sorular" className="faq section shell divider">
      <div>
        <p className="eyebrow">{site.faq.eyebrow}</p>
        <h2>{site.faq.title}</h2>
      </div>
      <div className="faq-items">
        {faq.map((f) => (
          <details key={f.question} name="faq">
            <summary>
              {f.question}
              <span className="faq-symbol" aria-hidden="true" />
            </summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
