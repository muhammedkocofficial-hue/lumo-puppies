import { ExamplePuppyDetails } from "@/components/ui/DemoContent";
import { notFound } from "next/navigation";
import { puppies } from "@/data/puppies";
import { breeds } from "@/data/breeds";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { Gallery } from "@/components/puppies/Gallery";
import { Proofs } from "@/components/ui/Proofs";
import { Media } from "@/components/ui/Media";
import {
  ContactInvitation,
  PageIntro,
  TextLink,
} from "@/components/ui/Editorial";
export function generateStaticParams() {
  return puppies.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = puppies.find((p) => p.slug === slug);
  return p
    ? {
        ...pageMetadata(
          p.name,
          p.introduction || site.puppies.detailText,
          "/yavrular/" + slug + "/",
        ),
        ...(!p.published ? { robots: { index: false, follow: false } } : {}),
      }
    : {};
}
export default async function PuppyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = puppies.find((p) => p.slug === slug);
  if (!p || (p.isExample && site.launchReady)) notFound();
  if (!p.published)
    return (
      <>
        <PageIntro eyebrow={site.puppies.eyebrow} title={p.name} />
        <section className="shell pending-profile">
          <p>{site.puppies.detailText.replace("Taco", p.name)}</p>
          <TextLink href="/yavrular/">{site.ui.backPuppies}</TextLink>
        </section>
        <ContactInvitation />
      </>
    );
  const breed = breeds.find((b) => b.slug === p.breedSlug);
  return (
    <>
      <div className="shell breadcrumb">
        <TextLink href="/yavrular/">← {site.ui.backPuppies}</TextLink>
      </div>
      <section className="shell puppy-profile">
        <header className="puppy-profile-title">
          <p className="eyebrow">{p.breedName || breed?.name || site.puppies.eyebrow}</p>
          <h1>{p.name}</h1>
        </header>
        <Gallery images={p.gallery} />
        <div className="puppy-profile-copy" data-reveal="text">
          {p.isExample && <p className="demo-note">Temsili yavru profili · Fotoğraf, kimlik ve durum bilgileri örnektir.</p>}
          {p.introduction && <p className="lead">{p.introduction}</p>}
          {p.personality && (
            <p className="personality">{p.personality.join(" · ")}</p>
          )}
          {p.status && <p className="puppy-status">{{ available: "Tanışmaya açık", reserved: "Rezerve", home: "Yuvasını buldu" }[p.status]}</p>}
          <dl>
            {[
              [site.ui.colour, p.colour],
              [site.ui.sex, p.sex],
              [site.ui.born, p.birthDate ? new Date(p.birthDate + "T12:00:00Z").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : undefined],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
          <TextLink href="/iletisim/">{site.cta.action}</TextLink>
        </div>
      </section>
      {p.isExample && <ExamplePuppyDetails name={p.name} />}
      {p.video && (
        <section className="shell section">
          <video
            controls
            playsInline
            preload="none"
            poster={p.video.poster}
            src={p.video.src}
            aria-label={p.name + " — " + site.ui.video}
          />
        </section>
      )}
      {p.development.some((n) => n.verified) && (
        <section className="shell section divider">
          <h2>{site.ui.development}</h2>
          {p.development
            .filter((n) => n.verified)
            .map((n) => (
              <article className="development-note" key={n.date}>
                <time dateTime={n.date}>{n.date}</time>
                <p>{n.text}</p>
              </article>
            ))}
        </section>
      )}
      {p.parents.some((n) => n.verified) && (
        <section className="shell section divider">
          <h2>{site.ui.parents}</h2>
          <div className="team-list">
            {p.parents
              .filter((n) => n.verified)
              .map((n) => (
                <article key={n.name}>
                  {n.media && <Media asset={n.media} />}
                  <p className="eyebrow">{n.role}</p>
                  <h3>{n.name}</h3>
                  {n.description && <p>{n.description}</p>}
                </article>
              ))}
          </div>
        </section>
      )}
      {p.documents.some((d) => d.verified) && (
        <section className="shell section divider">
          <h2>{site.ui.records}</h2>
          <Proofs items={p.documents} />
        </section>
      )}
      <ContactInvitation />
    </>
  );
}
