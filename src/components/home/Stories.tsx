import { Icon } from "@/components/ui/Icon";
import { verifiedAwards } from "@/data/awards";
import { publicTestimonials } from "@/data/testimonials";
import { verifiedTeam } from "@/data/team";
import { site } from "@/data/site";
import { editorial } from "@/data/editorial";
import { Media } from "@/components/ui/Media";
import { TextLink } from "@/components/ui/Editorial";
export function AwardArchive() {
  return (
    <div className="award-archive">
      {verifiedAwards.map((a) => (
        <article className="archive-entry" key={a.title}>
          <div className="archive-year" data-reveal="text">
            <span>{a.year}</span>
            <p className="eyebrow">{a.organisation}</p>
          </div>
          <div className="archive-body">
            {a.photo && (
              <div data-reveal="media">
                <Media asset={a.photo} />
              </div>
            )}
            <div className="archive-copy">
              {a.event && <p className="eyebrow">{a.event}</p>}
              <h3 data-reveal="text">{a.title}</h3>
              <p>{a.description}</p>
              {a.certificate && (
                <a
                  className="text-link"
                  href={a.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{site.ui.records}</span>
                  <span aria-hidden="true"><Icon className="arrow-diagonal"/></span>
                </a>
              )}
            </div>
            {a.trophy && (
              <div className="archive-detail" data-reveal="media">
                <Media asset={a.trophy} />
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
export function AwardFeature() {
  if (!verifiedAwards.length) return null;
  return (
    <section className="section shell awards-feature">
      <header className="archive-heading">
        <p className="eyebrow">{site.archive.eyebrow}</p>
        <h2 data-reveal="text">{site.archive.title}</h2>
        <TextLink href="/basarilar/">{site.archive.link}</TextLink>
      </header>
      <AwardArchive />
    </section>
  );
}
export function FamilyStories() {
  if (!publicTestimonials.length) return null;
  return (
    <section className="family-stories section shell">
      <header>
        <p className="eyebrow">{site.families.eyebrow}</p>
        <h2 data-reveal="text">{site.families.title}</h2>
      </header>
      {publicTestimonials.map((t) => (
        <article className="family-story" key={t.displayName + t.quote}>
          {t.photo && (
            <div className="family-image" data-reveal="media">
              <Media asset={t.photo} />
            </div>
          )}
          <div className="family-voice">
            <blockquote data-reveal="text">{t.quote}</blockquote>
            <p className="family-identity">
              {[t.displayName, t.puppyName].filter(Boolean).join(" & ")}
            </p>
            {t.city && <p>{t.city}</p>}
            {t.date && <time dateTime={t.date}>{t.date}</time>}
            {t.video && (
              <video
                controls
                playsInline
                preload="none"
                poster={t.video.poster}
                src={t.video.src}
                aria-label={t.displayName}
              />
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
export function People() {
  if (!verifiedTeam.length) return null;
  return (
    <div className="team-list">
      {verifiedTeam.map((t) => (
        <article className="team-portrait" key={t.name}>
          {t.portrait && (
            <div data-reveal="media">
              <Media asset={t.portrait} />
            </div>
          )}
          <div className="team-copy">
            <p className="eyebrow">{t.role}</p>
            <h3 data-reveal="text">{t.name}</h3>
            <p>{t.biography}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
export function EmptyArchive() {
  return (
    <div className="archive-empty">
      <span className="empty-archive-title" aria-hidden="true">
        {editorial.archive.emptyFolio}
      </span>
      <div>
        <p className="eyebrow">{editorial.archive.caption}</p>
        <h2>{site.archive.emptyTitle}</h2>
        <p>{site.archive.emptyText}</p>
        <TextLink href="/lumo-standardi/">{site.standard.link}</TextLink>
      </div>
    </div>
  );
}
