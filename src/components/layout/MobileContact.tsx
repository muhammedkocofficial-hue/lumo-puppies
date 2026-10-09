"use client";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
export function MobileContact(){const pathname=usePathname();if(pathname.startsWith('/admin'))return null;return <nav className="floating-contact" aria-label="Hızlı iletişim"><a href={"tel:"+site.contact.phone.replace(/\s/g,"")} aria-label="Lumo Puppies’i arayın"><Icon name="phone"/></a><a href={"https://wa.me/"+site.contact.whatsapp} aria-label="WhatsApp’tan yazın" target="_blank" rel="noopener noreferrer"><Icon name="whatsapp"/></a><a href={site.contact.instagram} aria-label="Instagram hesabımız" target="_blank" rel="noopener noreferrer"><Icon name="instagram"/></a></nav>;}
