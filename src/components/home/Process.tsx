import { site } from "@/data/site";
export function Process() {
  return (
    <section className="process section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{site.process.eyebrow}</p>
          <h2>{site.process.title}</h2>
        </div>
        <p>{site.process.text}</p>
      </div>
      <ol>
        {site.process.steps.map((step, i) => (
          <li key={step.title}>
            <span className="eyebrow">0{i + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
