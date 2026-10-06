import { site } from "@/data/site";
export function contactChannels() {
  const c = site.contact;
  return [
    {
      label: "WhatsApp",
      href: c.whatsapp ? "https://wa.me/" + c.whatsapp.replace(/\D/g, "") : "",
    },
    {
      label: "Telefon",
      href: c.phone ? "tel:" + c.phone.replace(/[^+\d]/g, "") : "",
    },
    { label: "Instagram", href: c.instagram },
    { label: "Messenger", href: c.messenger },
    { label: "E-posta", href: c.email ? "mailto:" + c.email : "" },
  ].filter((c) => c.href);
}
