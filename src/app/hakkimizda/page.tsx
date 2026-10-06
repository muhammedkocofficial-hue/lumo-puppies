import { site } from "@/data/site";

import { People, FamilyStories } from "@/components/home/Stories";
import {
  PageIntro,
  ContactInvitation,
  TextLink,
} from "@/components/ui/Editorial";
import { Media } from "@/components/ui/Media";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Hakkımızda",
  site.about.text,
  "/hakkimizda/",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow={site.about.eyebrow}
        title={site.about.title}
        text={site.about.text}
      />
      <section className="shell about-body">
        <Media asset={site.aboutMedia} />
        <div>
          <h2>{site.intro.title}</h2>
          <p>{site.intro.text}</p>
          <TextLink href="/lumo-standardi/">{site.standard.link}</TextLink>
        </div>
      </section>
      <section className="shell section divider">
        <h2>{site.about.peopleTitle}</h2>
        <People />
      </section>
      <FamilyStories />
      <ContactInvitation />
    </>
  );
}
