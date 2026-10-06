"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** One observer, native scrolling, visible SSR. Never gates content behind JavaScript. */
export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let observer: IntersectionObserver | undefined;
    function reset() {
      observer?.disconnect();
      nodes.forEach((node) => node.removeAttribute("data-motion"));
    }
    function setup() {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const node = entry.target as HTMLElement;
            node.dataset.motion = "visible";
            observer?.unobserve(node);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      nodes.forEach((node) => {
        const r = node.getBoundingClientRect();
        if (r.top >= window.innerHeight) {
          node.dataset.motion = "pending";
          observer?.observe(node);
        }
      });
    }
    setup();
    preference.addEventListener("change", setup);
    // Keyboard users see any focused content immediately, even before observer delivery.
    function onFocus(event: FocusEvent) {
      (event.target as HTMLElement)
        ?.closest<HTMLElement>("[data-reveal]")
        ?.setAttribute("data-motion", "visible");
    }
    document.addEventListener("focusin", onFocus);
    return () => {
      reset();
      preference.removeEventListener("change", setup);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);
  return null;
}
