import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { site } from "@/data/site";
import { editorial } from "@/data/editorial";
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link className={"text-link " + className} href={href}>
      <span>{children}</span>
      <span aria-hidden="true"><Icon className="arrow-diagonal"/></span>
    </Link>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="page-intro shell">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      {text && <p className="lead">{text}</p>}
      <span className="page-intro-rule" aria-hidden="true" />
    </header>
  );
}
export function ContactInvitation() {
  return (
    <section className="invitation shell" data-contact-section>
      <p className="eyebrow">{site.cta.eyebrow}</p>
      <div className="invitation-main">
        <h2 data-reveal="text">
          {editorial.invitation.title}
          <br />
          <em>{editorial.invitation.accent}</em>
        </h2>
        <div>
          <p>{site.cta.text}</p>
          <Link className="invitation-link" href="/iletisim/">
            <span>{site.cta.action}</span>
            <span className="invitation-arrow" aria-hidden="true">
              <Icon className="arrow-diagonal"/>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
