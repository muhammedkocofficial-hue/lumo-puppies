import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { site } from "@/data/site";
export default function NotFound() {
  return (
    <section className="not-found shell">
      <p className="eyebrow">LUMO PUPPIES / 404</p>
      <h1>{site.ui.notFoundTitle}</h1>
      <p>{site.ui.notFoundText}</p>
      <Link className="button" href="/">
        {site.ui.notFoundAction}
        <span aria-hidden="true"><Icon className="arrow-diagonal"/></span>
      </Link>
    </section>
  );
}
