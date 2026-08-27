import type { Profile } from "../data/types";
import "./About.css";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Профиль</p>
          <h2>Как я работаю с ростом</h2>
          <p>
            Рост как связка каналов, данных и автоматизации — а не отдельный
            перформанс-бюджет. Ниже — стек и подходы, которыми я это собираю.
          </p>
        </div>

        <div className="about__grid">
          {profile.skills.map((g) => (
            <div key={g.title} className="about__group reveal hud">
              <h3 className="about__group-title">
                <span className="mono about__group-marker">▚</span>
                {g.title}
              </h3>
              <ul className="about__list">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
