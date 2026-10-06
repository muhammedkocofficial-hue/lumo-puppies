"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { navigation, site } from "@/data/site";
import { editorial } from "@/data/editorial";
import { contactChannels } from "@/lib/contact";
function Wordmark() {
  return site.logo ? (
    <img
      className="brand-logo"
      src={site.logo}
      alt="Lumo Puppies"
      width="1402"
      height="1122"
    />
  ) : (
    <span className="wordmark">
      LUMO<span>PUPPIES</span>
    </span>
  );
}
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scroll = useRef<{ y: number; css: string } | null>(null);
  const pathname = usePathname();
  const release = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    dialog.current?.removeAttribute("data-closing");
    trigger.current?.setAttribute("aria-expanded", "false");
    if (scroll.current) {
      const { y, css } = scroll.current;
      scroll.current = null;
      document.body.style.cssText = css;
      window.scrollTo({ top: y, behavior: "instant" });
    }
  }, []);
  const finish = useCallback(() => {
    dialog.current?.close();
    release();
  }, [release]);
  function closeMenu() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    if (timer.current) return;
    dialog.current?.setAttribute("data-closing", "true");
    timer.current = setTimeout(finish, 160);
  }
  function open() {
    if (!dialog.current || dialog.current.open) return;
    scroll.current = { y: window.scrollY, css: document.body.style.cssText };
    dialog.current.showModal();
    Object.assign(document.body.style, {
      position: "fixed",
      top: "-" + scroll.current.y + "px",
      left: "0",
      right: "0",
      width: "100%",
      overflow: "hidden",
    });
    trigger.current?.setAttribute("aria-expanded", "true");
  }
  useEffect(() => {
    finish();
    return finish;
  }, [pathname, finish]);
  return (
    <>
      <header className="site-header">
        <nav className="header-quicklinks" aria-label="Hızlı erişim">
          <Link href="/irklar/">{navigation[0].label}</Link>
          <Link href="/yavrular/">{navigation[1].label}</Link>
        </nav>
        <Link className="brand" href="/" aria-label="Lumo Puppies — Ana sayfa">
          <Wordmark />
        </Link>
        <button
          ref={trigger}
          className="menu-trigger"
          onClick={open}
          aria-haspopup="dialog"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="menu-label">{site.ui.menu}</span>
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Ana menü"
        onClose={() => {
          if (!dialog.current?.open) release();
        }}
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
      >
        <div className="menu-head">
          <Link className="brand" href="/" onClick={finish}>
            <Wordmark />
          </Link>
          <button className="close-menu" onClick={closeMenu} autoFocus>
            {site.ui.close}
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="menu-body">
          <p className="eyebrow menu-kicker">{editorial.navigation.label}</p>
          <nav aria-label="Mobil menü">
            {navigation.map((item, i) => (
              <Link
                className="menu-item"
                style={{ "--menu-order": i } as CSSProperties}
                href={item.href}
                key={item.href}
                onClick={finish}
                aria-current={
                  pathname.startsWith(item.href.slice(0, -1))
                    ? "page"
                    : undefined
                }
              >
                <span className="menu-index">0{i + 1}</span>
                <span className="menu-item-label">{item.label}</span>
                <span className="menu-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </nav>
          <div className="menu-bottom">
            <p className="menu-signoff">{site.footer.line}</p>
            {contactChannels().length > 0 && (
              <div className="menu-social">
                <p className="eyebrow">{editorial.navigation.social}</p>
                {contactChannels().map((c) => (
                  <a key={c.label} href={c.href} onClick={finish}>
                    {c.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
