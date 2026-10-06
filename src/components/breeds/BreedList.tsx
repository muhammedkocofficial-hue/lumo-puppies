import Link from "next/link";
import { publishedBreeds } from "@/data/breeds";
import { site } from "@/data/site";
import { editorial } from "@/data/editorial";
import { Media } from "@/components/ui/Media";
import { TextLink } from "@/components/ui/Editorial";
export function BreedList() {
  return (
    <div className="breed-list">
      {publishedBreeds.map((breed) => (
        <article
          className={
            "breed-chapter " + (!breed.media?.desktopSrc ? "without-photo" : "")
          }
          key={breed.slug}
        >
          <div className="breed-chapter-top">
            <span>{breed.index}</span>
            <span>{editorial.breeds.label}</span>
          </div>
          {breed.media?.desktopSrc && (
            <Link
              className="breed-portrait"
              href={"/irklar/" + breed.slug + "/"}
              aria-label={breed.name + " — " + site.ui.read}
              data-reveal="media"
            >
              <Media asset={breed.media} />
            </Link>
          )}
          <div className="breed-chapter-copy" data-reveal="text">
            <h3>
              <Link href={"/irklar/" + breed.slug + "/"}>{breed.name}</Link>
            </h3>
            <div>
              <p>{breed.short}</p>
              <TextLink href={"/irklar/" + breed.slug + "/"}>
                {site.ui.read}
              </TextLink>
            </div>
          </div>
          {!breed.media?.desktopSrc && (
            <p className="breed-photo-note">{editorial.breeds.photoNote}</p>
          )}
        </article>
      ))}
    </div>
  );
}
