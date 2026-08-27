import type { Profile } from "../data/types";
import "./Contact.css";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__card hud reveal">
          <div className="contact__scan" aria-hidden="true" />
          <p className="eyebrow">Связь</p>
          <h2 className="contact__title">
            Нужен человек на трафик, CRM и данные?
          </h2>
          <p className="contact__text">
            Ищу роль Project / Growth Lead. Открыт к полной и проектной работе,
            консультациям по закупке трафика, CRM-маркетингу и аналитике.
            Предпочтительный способ связи — телефон или Telegram.
          </p>

          <div className="contact__links">
            {profile.contacts.map((c) => (
              <a
                key={c.label}
                href={c.url}
                className="contact__link"
                target={c.url.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <span className="contact__link-label mono">{c.label}</span>
                <span className="contact__link-value">{c.value}</span>
                <span className="contact__link-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
