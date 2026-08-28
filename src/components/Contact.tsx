import { useState } from "react";
import type { Contact as ContactType } from "../data/types";
import "./Contact.css";

const ICON: Record<ContactType["kind"], string> = {
  phone: "M6.6 3.5 8.5 8l-2 1.6a12 12 0 0 0 5.9 5.9l1.6-2 4.5 1.9-.7 3.4a2 2 0 0 1-2.2 1.6C10 23 1 14 1.5 5.7A2 2 0 0 1 3.2 3.5z",
  telegram: "M21.5 4.3 2.6 11.6c-1 .4-1 1.8 0 2.1l4.8 1.5 1.8 5.6c.3.8 1.3 1 1.9.4l2.7-2.6 4.7 3.5c.7.5 1.7.1 1.9-.7L23 5.6c.2-1-.7-1.7-1.5-1.3z",
  email: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.4V17h16V7.4l-8 5z",
};

function Card({ c }: { c: ContactType }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    if (!c.copy) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(c.copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = c.href;
    }
  };

  return (
    <a
      className="contact-card"
      href={c.href}
      target={c.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
    >
      <svg className="contact-card__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d={ICON[c.kind]} />
      </svg>
      <span className="contact-card__label tech">{c.label}</span>
      <span className="contact-card__value">{c.value}</span>

      {c.copy && (
        <button
          className="contact-card__copy"
          onClick={copy}
          aria-label={`Скопировать ${c.label}`}
        >
          {copied ? "скопировано" : "копировать"}
        </button>
      )}
      <span className="contact-card__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export default function Contact({ contacts }: { contacts: ContactType[] }) {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-head reveal">
          <p className="eyebrow">Contact</p>
          <h2 className="contact-title">Let's build something that scales.</h2>
          <p className="contact-sub">
            Если вам нужен человек, который может соединить маркетинг, данные и
            технологии — let's talk.
          </p>
        </div>

        <div className="contact-grid reveal">
          {contacts.map((c) => (
            <Card key={c.kind} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
