"use client";
import { useEffect, useRef } from "react";
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    const update = () => {
      if (preference.matches || document.hidden || !inView) element.pause();
      else void element.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(element);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); element.pause(); };
  }, [src]);
  return <video ref={video} className="hero-film" src={src} poster={poster} muted loop playsInline preload="metadata" aria-label="Lumo Puppies tanıtım filmi" />;
}
