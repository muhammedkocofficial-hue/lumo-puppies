"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
export function MobileContact() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const areas = Array.from(
      document.querySelectorAll("[data-contact-section]"),
    );
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        });
        node.hidden = visible.size > 0;
      },
      { threshold: 0 },
    );
    areas.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  if (pathname.startsWith("/iletisim")) return null;
  return (
    <div className="mobile-contact" ref={ref}>
      <span>LUMO PUPPIES</span>
      <Link href="/iletisim/">
        {site.ui.contact}
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
