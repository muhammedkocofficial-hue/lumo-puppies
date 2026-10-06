"use client";
import { useEffect, useRef, useState } from "react";
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    const update = () => {
      if (preference.matches || userPaused.current || document.hidden || !inView) element.pause();
      else void element.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(element);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); element.pause(); };
  }, [src]);
  function toggle() {
    const element = video.current;
    if (!element) return;
    if (element.paused) { userPaused.current = false; void element.play().catch(() => setFailed(true)); }
    else { userPaused.current = true; element.pause(); }
  }
  return <>
    <video ref={video} className="hero-film" src={src} poster={poster} muted loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} aria-label="Temsili köpek videosu" />
    {!failed && <button className="hero-video-toggle" type="button" onClick={toggle} aria-label={playing ? "Videoyu durdur" : "Videoyu oynat"}><span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>{playing ? "Durdur" : "Oynat"}</button>}
  </>;
}
