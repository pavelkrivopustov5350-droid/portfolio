import type { Profile } from "../data/types";
import HeroViz from "./HeroViz";
import "./Hero.css";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__main">
          <p className="tech reveal">PROFILE / GROWTH_SYSTEM</p>

          <h1 className="hero__name reveal">{profile.nameLat}</h1>

          <div className="hero__title reveal">
            {profile.titleLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < profile.titleLines.length - 1 && (
                  <span className="hero__slash"> / </span>
                )}
              </span>
            ))}
          </div>

          <p className="hero__subtitle reveal">{profile.subtitle}</p>

          <blockquote className="hero__statement reveal">
            «{profile.statement}»
          </blockquote>

          <div className="hero__actions reveal">
            <a href="#cases" className="btn btn--primary">
              Смотреть кейсы
            </a>
            <a href="#contact" className="btn btn--ghost">
              Связаться
            </a>
          </div>

          <div className="hero__meta reveal">
            <span className="hero__dot" aria-hidden="true" />
            <span>{profile.availability}</span>
            <span className="hero__sep">·</span>
            <span>{profile.location}</span>
          </div>
        </div>

        <div className="hero__viz-wrap reveal" aria-hidden="true">
          <HeroViz />
        </div>
      </div>
    </section>
  );
}
