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
            Есть продукт, которому нужен рост как система?
          </h2>
          <p className="contact__text">
            Открыт к роли Growth / Product Lead, консультациям по growth-модели и
            аудиту воронки. Пишите — отвечаю в течение дня.
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
