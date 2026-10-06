import type { Proof } from "@/types/content";
import { Media } from "./Media";
export function Proofs({ items }: { items: Proof[] }) {
  const verified = items.filter((p) => p.verified);
  if (!verified.length) return null;
  return (
    <div className="proof-list">
      {verified.map((p) => (
        <article key={p.title}>
          {p.media && <Media asset={p.media} />}
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          {p.href && (
            <a
              className="text-link"
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.title}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </article>
      ))}
    </div>
  );
}
