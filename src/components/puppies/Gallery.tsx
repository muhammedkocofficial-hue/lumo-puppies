"use client";
import { Icon } from "@/components/ui/Icon";

import { useRef, useState } from "react";
import { Media } from "@/components/ui/Media";
import type { MediaAsset } from "@/types/content";
import { site } from "@/data/site";
export function Gallery({ images }: { images: MediaAsset[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  function go(index: number) {
    const el = rail.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
      inline: "start",
    });
  }
  if (!images.length) return <Media />;
  return (
    <section className="gallery" aria-label={site.ui.gallery}>
      <div
        className="gallery-rail"
        ref={rail}
        tabIndex={0}
        onScroll={() => {
          const el = rail.current;
          if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {images.map((asset, i) => (
          <div className="gallery-slide" key={asset.desktopSrc || i}>
            <Media asset={asset} priority={i === 0} />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="gallery-controls">
          <button
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label={site.ui.previous}
          >
            <Icon className="arrow-left"/>
          </button>
          <span aria-live="polite">
            {site.ui.photo} {active + 1} / {images.length}
          </span>
          <button
            onClick={() => go(active + 1)}
            disabled={active === images.length - 1}
            aria-label={site.ui.next}
          >
            <Icon/>
          </button>
        </div>
      )}
    </section>
  );
}
