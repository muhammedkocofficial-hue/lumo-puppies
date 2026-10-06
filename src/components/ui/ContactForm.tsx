"use client";
import { useState } from "react";
import { site } from "@/data/site";
export function ContactForm() {
  const [opened, setOpened] = useState(false);
  const demo = !site.contact.email;
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (demo) { setOpened(true); return; }
        const data = new FormData(e.currentTarget);
        const body = [
          data.get("message"),
          "",
          "— " + data.get("name"),
          String(data.get("email")),
        ].join("\n");
        window.location.href =
          "mailto:" +
          site.contact.email +
          "?subject=" +
          encodeURIComponent("Lumo Puppies — " + data.get("name")) +
          "&body=" +
          encodeURIComponent(body);
        setOpened(true);
      }}
    >
      <h2>{demo ? "Tanışmak için yazın." : site.contactPage.emailTitle}</h2>
      <label htmlFor="contact-name">{site.contactPage.name}</label>
      <input
        id="contact-name"
        name="name"
        required
        autoComplete="name"
        maxLength={100}
      />
      <label htmlFor="contact-email">{site.contactPage.email}</label>
      <input
        id="contact-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        maxLength={200}
      />
      <label htmlFor="contact-message">{site.contactPage.message}</label>
      <textarea
        id="contact-message"
        name="message"
        required
        rows={5}
        maxLength={3000}
      />
      <p className="fine-note">{demo ? "Temsili form. Bilgileriniz gönderilmez veya kaydedilmez." : site.contactPage.formNote}</p>
      <button className="button" type="submit">
        {demo ? "Örnek formu dene" : site.contactPage.submit}
        <span aria-hidden="true">↗</span>
      </button>
      {opened && demo && <p role="status">Örnek form tamamlandı. Mesaj gönderilmedi; gerçek iletişim kanalı eklendiğinde bu alan kullanılabilir.</p>}
      {opened && !demo && (
        <div role="status">
          <p>{site.contactPage.formSuccess}</p>
          <p>
            {site.contactPage.formFallback}{" "}
            <a href={"mailto:" + site.contact.email}>{site.contact.email}</a>
          </p>
        </div>
      )}
    </form>
  );
}
