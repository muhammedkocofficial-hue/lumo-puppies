import { Journey } from "@/components/home/Journey";
import { AwardShowcase } from "@/components/home/AwardShowcase";
import { Hero } from "@/components/home/Hero";
import { site } from "@/data/site";
import { editorial } from "@/data/editorial";
import { ContactInvitation, TextLink } from "@/components/ui/Editorial";
export default function Home() {
  return (
    <>
      <Hero />
      <AwardShowcase />
      <section id="lumo-hikayesi" className="intro shell">
        <div className="intro-caption">
          <p className="eyebrow">{site.intro.eyebrow}</p>
          <span>{editorial.intro.side}</span>
        </div>
        <h2 data-reveal="text">
          {editorial.intro.title}
          <br />
          <em>{editorial.intro.accent}</em>
        </h2>
        <div className="intro-body">
          <p>{site.intro.text}</p>
          <TextLink href="/hakkimizda/">{site.intro.link}</TextLink>
        </div>
      </section>
      <Journey />
      <ContactInvitation />
    </>
  );
}
