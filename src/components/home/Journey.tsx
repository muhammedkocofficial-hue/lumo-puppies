import { site, verifiedCare } from "@/data/site";
import { editorial } from "@/data/editorial";
import { Standard } from "./Standard";
import { BreedList } from "@/components/breeds/BreedList";
import { PuppyList } from "@/components/puppies/PuppyList";
import { Proofs } from "@/components/ui/Proofs";
import { Media } from "@/components/ui/Media";
import { TextLink } from "@/components/ui/Editorial";
import { FamilyStories, People } from "./Stories";
import { Process } from "./Process";
import { Faq } from "@/components/ui/Faq";
export function Journey() {
  return (
    <>
      <Standard />
      <section className="puppies-feature section shell">
        <header className="portrait-heading">
          <p className="chapter-label">
            <span>{editorial.chapters.puppies}</span>
            {site.puppies.eyebrow}
          </p>
          <h2 data-reveal="text">{site.puppies.title}</h2>
          <p>{site.puppies.text}</p>
        </header>
        <PuppyList limit={3} />
        <TextLink href="/yavrular/">Tüm yavruları keşfedin</TextLink>
      </section>
      <section className="breeds-feature section shell">
        <header className="discovery-heading">
          <p className="chapter-label">
            <span>{editorial.chapters.breeds}</span>
            {site.breeds.eyebrow}
          </p>
          <h2 data-reveal="text">
            {editorial.breeds.title}
            <br />
            <em>{editorial.breeds.accent}</em>
          </h2>
          <p>{site.breeds.text}</p>
        </header>
        <BreedList />
        <div className="breed-outro">
          <p className="fine-note">{site.breeds.note}</p>
          <TextLink href="/irklar/">{site.breeds.link}</TextLink>
        </div>
      </section>
      <section className="care-feature">
        <div className="shell care-layout">
          <p className="eyebrow">{editorial.care.label}</p>
          <h2 data-reveal="text">
            {editorial.care.title}
            <br />
            <em>{editorial.care.accent}</em>
          </h2>
          <div className="care-copy">
            <p>{site.care.text}</p>
            <TextLink href="/lumo-standardi/#sorular">
              {site.care.link}
            </TextLink>
          </div>
          <Proofs items={verifiedCare} />
        </div>
      </section>
      <FamilyStories />
      <section className="about-feature section shell">
        <div className="about-image" data-reveal="media">
          <Media asset={site.aboutMedia} />
          <span>{editorial.about.signature}</span>
        </div>
        <div className="about-feature-copy">
          <p className="eyebrow">{editorial.about.label}</p>
          <h2 data-reveal="text">{site.about.title}</h2>
          <p>{site.about.text}</p>
          <TextLink href="/hakkimizda/">{site.about.homeLink}</TextLink>
        </div>
      </section>
      <div className="shell">
        <People />
      </div>
      <Process />
      <Faq />
    </>
  );
}
