import type { Profile } from "../data/types";
import "./Timeline.css";

export default function Timeline({ profile }: { profile: Profile }) {
  return (
    <section className="section timeline" id="path">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Траектория</p>
          <h2>Путь</h2>
          <p>От платного трафика в агентстве до сборки growth-функции с нуля.</p>
        </div>

        <ol className="tl">
          {profile.timeline.map((t) => (
            <li key={t.period + t.org} className="tl__item reveal">
              <div className="tl__node" aria-hidden="true" />
              <div className="tl__period mono">{t.period}</div>
              <div className="tl__card hud">
                <div className="tl__role">{t.role}</div>
                <div className="tl__org">{t.org}</div>
                <p className="tl__note">{t.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
