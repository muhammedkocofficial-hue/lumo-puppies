import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { navigation, site } from "@/data/site";
import { editorial } from "@/data/editorial";
import { contactChannels } from "@/lib/contact";
export function Footer() {
  return (
    <footer className="footer" data-contact-section>
      <div className="shell">
        <div className="footer-top">
          <p>{editorial.footer.note}</p>
          <a href="#top" className="footer-top-link">
            {site.footer.top}
            <span aria-hidden="true"><Icon className="arrow-up"/></span>
          </a>
        </div>
        <Link
          href="/"
          className="footer-brand"
          aria-label="Lumo Puppies — Ana sayfa"
        >
          {site.logo ? <img className="footer-logo" src={site.logo} alt="Lumo Puppies" width={1402} height={1122} loading="lazy" /> : <><span>LUMO</span><small>PUPPIES</small></>}
        </Link>
        <div className="footer-navigation">
          <nav aria-label="Alt menü">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          {contactChannels().length > 0 && (
            <nav className="footer-social" aria-label="İletişim kanalları">
              {contactChannels().map((c) => (
                <a href={c.href} key={c.label}>
                  <Icon name={c.label==="WhatsApp"?"whatsapp":c.label==="Telefon"?"phone":c.label==="Instagram"?"instagram":"mail"}/><span><small>{c.label}</small>{c.label==="Telefon"?site.contact.phone:c.label==="E-posta"?site.contact.email:c.label==="Instagram"?"@lumopuppies":"Mesaj gönderin"}</span>
                </a>
              ))}
            </nav>
          )}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.footer.copyright}
          </span>
          <p>{site.footer.note}</p>
          <a className="ddo-credit" href="https://denizdigitaloperate.com" target="_blank" rel="noopener noreferrer"><span>Tasarım & geliştirme</span><strong>DENİZ DİGİTAL OPERATE</strong><Icon className="arrow-diagonal"/></a>
        </div>
      </div>
    </footer>
  );
}
