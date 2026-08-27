import type { Profile } from "../data/types";
import GlitchText from "./ui/GlitchText";
import "./Hero.css";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <p className="eyebrow reveal">Портфолио · трафик · CRM · данные</p>

        <h1 className="hero__title reveal">
          <GlitchText>{profile.name}</GlitchText>
          <span className="hero__title-role">{profile.title}</span>
        </h1>

        <p className="hero__pitch reveal">{profile.pitch}</p>

        <div className="hero__meta reveal">
          <span className="mono">{profile.location}</span>
          <span className="hero__status">
            <span className="hero__dot" />
            <span className="mono">открыт к предложениям</span>
          </span>
        </div>

        <div className="hero__actions reveal">
          <a href="#cases" className="btn btn--primary">
            Смотреть кейсы
          </a>
          <a href="#contact" className="btn btn--ghost">
            Связаться
          </a>
        </div>

        <ul className="hero__ticker reveal" aria-label="Ключевые результаты">
          {profile.highlights.map((h) => (
            <li key={h}>
              <span className="hero__ticker-mark">▸</span>
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__scrollcue" aria-hidden="true">
        <span>SCROLL</span>
        <span className="hero__scrollcue-line" />
      </div>
    </section>
  );
}
