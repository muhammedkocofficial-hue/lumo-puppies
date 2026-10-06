import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { PageIntro, ContactInvitation } from "@/components/ui/Editorial";
import { BreedList } from "@/components/breeds/BreedList";
export const metadata = pageMetadata(
  "Irkları tanıyın",
  site.breeds.text,
  "/irklar/",
);
export default function BreedsPage() {
  return (
    <>
      <PageIntro
        eyebrow={site.breeds.eyebrow}
        title={site.breeds.title}
        text={site.breeds.text}
      />
      <section className="shell listing-section">
        <BreedList />
        <p className="fine-note breed-note">{site.breeds.note}</p>
      </section>
      <ContactInvitation />
    </>
  );
}
