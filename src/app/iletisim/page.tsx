import { site } from "@/data/site";
import { PageIntro } from "@/components/ui/Editorial";
import { Icon } from "@/components/ui/Icon";
import { ContactActions } from "@/components/ui/ContactActions";
import { ContactForm } from "@/components/ui/ContactForm";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata("İletişim","Lumo Puppies ile tanışın. Telefon, WhatsApp ve Instagram üzerinden bize ulaşın. Ataşehir, İstanbul. Her gün 09.00–21.00.","/iletisim/");
export default function Page(){return <div data-contact-section><PageIntro eyebrow="BİR MERHABA İLE" title="Konuşacak çok güzel şeyler var." text="Yeni dostunuz, merak ettikleriniz ve birlikte kuracağınız hayat. Sizi dinleyelim."/><section className="shell contact-live"><div className="contact-dark"><p className="eyebrow">LUMO PUPPIES</p><a className="contact-number" href="tel:+905511276214">{site.contact.phone}</a><ContactActions/><div className="contact-details"><a href={"mailto:"+site.contact.email}><Icon name="mail"/>{site.contact.email}</a><a href={site.contact.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram"/>@lumopuppies</a><p><Icon name="pin"/>Ataşehir / İstanbul</p><p><Icon name="clock"/>Görüşme saatleri · 09.00–21.00</p></div></div><ContactForm/></section></div>;}
