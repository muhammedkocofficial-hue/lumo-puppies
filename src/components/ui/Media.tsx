import type { CSSProperties } from "react";
import type { MediaAsset } from "@/types/content";
import { site } from "@/data/site";
export function Media({
  asset,
  priority = false,
  className = "",
}: {
  asset?: MediaAsset;
  priority?: boolean;
  className?: string;
}) {
  const style = {
    "--media-ratio": asset?.aspectRatio || "4 / 5",
    "--media-mobile-ratio":
      asset?.mobileAspectRatio || asset?.aspectRatio || "4 / 5",
    "--media-focus": asset?.focalPosition || "50% 50%",
    "--media-mobile-focus":
      asset?.mobileFocalPosition || asset?.focalPosition || "50% 50%",
  } as CSSProperties;
  return (
    <figure
      className={
        "media " + (!asset?.desktopSrc ? "media-empty " : "") + className
      }
      style={style}
      data-example={asset?.isExample || undefined}
    >
      {asset?.desktopSrc ? (
        <picture>
          {asset.mobileSrc && (
            <source media="(max-width: 767px)" srcSet={asset.mobileSrc} />
          )}
          <img
            src={asset.desktopSrc}
            alt={asset.alt}
            width={asset.width || 1200}
            height={asset.height || 1500}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
          />
        </picture>
      ) : (
        <div className="media-placeholder">
          <span className="placeholder-caption">
            {asset?.caption || site.ui.noPhoto}
          </span>
          <span className="placeholder-label">LUMO PUPPIES</span>
        </div>
      )}

    </figure>
  );
}
