import { Icon } from "@/components/ui/Icon";
import { notFound } from "next/navigation";
import { publishedBreeds } from "@/data/breeds";
import { getContent } from "@/lib/cms-server";
import { toPuppy } from "@/lib/puppy-adapter";
import { site } from "@/data/site";
import { Media } from "@/components/ui/Media";
import { PuppyList } from "@/components/puppies/PuppyList";
import { ContactInvitation, TextLink } from "@/components/ui/Editorial";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return publishedBreeds.map((b) => ({ slug: b.slug }));
}
export const dynamicParams = false;
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = publishedBreeds.find((b) => b.slug === slug);
  return b ? pageMetadata(b.name, b.introduction, "/irklar/" + slug + "/") : {};
}
export default async function BreedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const breed = publishedBreeds.find((b) => b.slug === slug);
  if (!breed) notFound();
  const related = (await getContent("puppy")).filter(p => slug === "poodle-turevleri" ? ["Maltipoo", "Poodle melezi"].includes(p.payload.breed || "") : p.payload.breed === breed.name).map(toPuppy);
  return (
    <>
      <div className="shell breadcrumb">
        <TextLink href="/irklar/"><Icon className="arrow-left"/> {site.ui.backBreeds}</TextLink>
      </div>
      <section className="shell breed-detail-hero">
        <div>
          <p className="eyebrow">
            {site.ui.generalGuide} / {breed.index}
          </p>
          <h1>{breed.name}</h1>
          <p className="lead">{breed.introduction}</p>
          <a className="text-link" href="#karakter">
            {site.ui.read}
            <span aria-hidden="true"><Icon className="arrow-down"/></span>
          </a>
        </div>
        {breed.media ? (
          <Media asset={breed.media} priority />
        ) : (
          <div className="breed-cover" data-reveal="media">
            <span className="eyebrow">{site.ui.guideCover}</span>
            <p aria-hidden="true">{breed.index}</p>
            <span>{breed.short}</span>
          </div>
        )}
      </section>
      <section className="shell breed-knowledge section" id="karakter">
        <div className="knowledge-heading">
          <p className="eyebrow">{site.ui.important}</p>
          <p>{site.ui.breedDisclaimer}</p>
        </div>
        <div>
          {breed.categories.map((cat, i) => (
            <article
              key={cat.title}
              className="knowledge-row"
              data-reveal="text"
            >
              <span>0{i + 1}</span>
              <div>
                <h2>{cat.title}</h2>
                <p>{cat.text}</p>
              </div>
            </article>
          ))}
          <div className="sources">
            <p className="eyebrow">{site.ui.sources}</p>
            {breed.sources.map((s) => (
              <a
                href={s.href}
                key={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.title} <Icon className="arrow-diagonal"/>
              </a>
            ))}
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="shell section divider">
          <h2>{site.ui.relevantPuppies}</h2>
          <PuppyList items={related} />
        </section>
      )}
      <ContactInvitation />
    </>
  );
}
