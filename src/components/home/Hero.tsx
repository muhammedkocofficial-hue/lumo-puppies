import Link from "next/link";
import { site } from "@/data/site";
import { editorial } from "@/data/editorial";
import { HeroVideo } from "./HeroVideo";
export function Hero() {
  return <section className="campaign-hero video-campaign" aria-labelledby="campaign-title">
    <div className="video-hero-stage">
      <HeroVideo src="/media/hero/hero-film.mp4" poster="/media/hero/hero-film-poster.webp" />
      <span className="hero-film-label">Temsili video</span>
      <div className="video-hero-copy">
        <p className="eyebrow">{site.hero.eyebrow}</p>
        <h1 id="campaign-title">{editorial.hero.title}<br /><em>{editorial.hero.accent}</em></h1>
        <p>{editorial.hero.text}</p>
        <div className="video-hero-actions">
          <Link className="button" href="/yavrular/"><span>Yavrularımızı keşfedin</span><span aria-hidden="true">↗</span></Link>
          <a className="button hero-story-button" href="#lumo-hikayesi"><span>Hikayemizi keşfedin</span><span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </div>
  </section>;
}
