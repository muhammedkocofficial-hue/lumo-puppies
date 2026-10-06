import { site } from "@/data/site";
import { PageIntro, ContactInvitation } from "@/components/ui/Editorial";
import { PuppyList } from "@/components/puppies/PuppyList";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Yavrularımız",
  site.puppies.text,
  "/yavrular/",
);
export default function PuppiesPage() {
  return (
    <div className="catalogue-page">
      <PageIntro
        eyebrow={site.puppies.eyebrow}
        title="Yeni dostunuzla tanışın."
        text={site.puppies.text}
      />
      <section className="shell listing-section">
        <PuppyList filters />
      </section>
      <ContactInvitation />
    </div>
  );
}
