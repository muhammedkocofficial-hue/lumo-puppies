import { DemoCare } from "@/components/ui/DemoContent";
import { site, verifiedCare } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { PageIntro, ContactInvitation } from "@/components/ui/Editorial";
import { Standard } from "@/components/home/Standard";
import { Process } from "@/components/home/Process";
import { Proofs } from "@/components/ui/Proofs";
import { Faq } from "@/components/ui/Faq";
export const metadata = pageMetadata(
  "Lumo Standardı",
  site.standard.text,
  "/lumo-standardi/",
);
export default function StandardPage() {
  return (
    <>
      <PageIntro
        eyebrow={site.standard.eyebrow}
        title={site.standard.title}
        text={site.standard.text}
      />
      <Standard full />
      {verifiedCare.some((p) => p.verified) && (
        <section className="shell section">
          <h2>{site.ui.records}</h2>
          <Proofs items={verifiedCare} />
        </section>
      )}
      {!verifiedCare.some(p => p.verified) && <DemoCare />}
      <Process />
      <Faq />
      <ContactInvitation />
    </>
  );
}
