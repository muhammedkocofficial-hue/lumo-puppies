"use client";
import { Icon } from "@/components/ui/Icon";

import { useState } from "react";
import { site } from "@/data/site";
export function ContactForm() {
  const [opened, setOpened] = useState(false);
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
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
      <h2>{site.contactPage.emailTitle}</h2>
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
      <p className="fine-note">{site.contactPage.formNote}</p>
      <button className="button" type="submit">
        {site.contactPage.submit}
        <span aria-hidden="true"><Icon className="arrow-diagonal"/></span>
      </button>
      {opened && (
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
