import { demoContent } from "@/data/demo";
import { site } from "@/data/site";
import { contactChannels } from "@/lib/contact";
import { PageIntro, TextLink } from "@/components/ui/Editorial";
import { ContactForm } from "@/components/ui/ContactForm";
import { Faq } from "@/components/ui/Faq";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "İletişim",
  site.contactPage.text,
  "/iletisim/",
);
export default function ContactPage() {
  const channels = contactChannels();
  return (
    <div data-contact-section>
      <PageIntro
        eyebrow={site.contactPage.eyebrow}
        title={site.contactPage.title}
        text={site.contactPage.text}
      />
      <section className="shell contact-content">
        {channels.length ? (
          <div>
            <p className="eyebrow">{site.contactPage.channelsTitle}</p>
            <div className="contact-channels">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {c.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            {site.legal.companyName && <p>{site.legal.companyName}</p>}
            {site.legal.address && <address>{site.legal.address}</address>}
          </div>
        ) : (
          <div className="contact-pending">
            <p className="eyebrow">BİRLİKTE PLANLAYALIM</p><h2>Bir merhaba kadar yakın.</h2>
            <p className="demo-note">Temsili iletişim bilgileri · Aktif iletişim kanalı değildir.</p>
            <dl className="demo-contact-list"><div><dt>Telefon & WhatsApp</dt><dd>{demoContent.contact.phone}</dd></div><div><dt>E-posta</dt><dd>{demoContent.contact.email}</dd></div><div><dt>Adres</dt><dd>{demoContent.contact.address}</dd></div><div><dt>Görüşme saatleri</dt><dd>{demoContent.contact.hours}</dd></div></dl><p>{demoContent.contact.visits}</p>
            <TextLink href="/yavrular/">Yavruları keşfedin</TextLink>
          </div>
        )}
        <ContactForm />
      </section>
      <Faq />
    </div>
  );
}
