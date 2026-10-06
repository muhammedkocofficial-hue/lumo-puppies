import { site } from "@/data/site";
import { verifiedAwards } from "@/data/awards";
import { AwardArchive } from "@/components/home/Stories";
import { AwardShowcase } from "@/components/home/AwardShowcase";
import { PageIntro } from "@/components/ui/Editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Başarılarımız",
  site.archive.emptyTitle,
  "/basarilar/",
);
export default function AwardsPage() {
  return (
    <>
      <PageIntro eyebrow={site.archive.eyebrow} title={site.archive.title} />
      {verifiedAwards.length ? <section className="shell listing-section"><AwardArchive /></section> : <AwardShowcase />}
    </>
  );
}
