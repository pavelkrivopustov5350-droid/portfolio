import type { SkillGroup } from "../data/types";
import "./Skills.css";

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Skills / Expertise</p>
          <h2>Карта компетенций</h2>
          <p>Четыре направления, которые я держу вместе в одной роли.</p>
        </div>

        <div className="skills-grid">
          {groups.map((g, i) => (
            <div
              className="skill reveal"
              key={g.title}
              style={{ ["--reveal-delay" as string]: `${(i % 2) * 60}ms` }}
            >
              <div className="skill__top">
                <span className="tech">{g.index}</span>
                <h3 className="skill__title">{g.title}</h3>
              </div>
              <ul className="skill__items">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="skills-eq reveal" aria-hidden="true">
          <span>MARKETING</span>
          <i>×</i>
          <span>DATA</span>
          <i>×</i>
          <span>TECHNOLOGY</span>
          <i>×</i>
          <span>MANAGEMENT</span>
          <i className="skills-eq__is">=</i>
          <span className="skills-eq__out">GROWTH</span>
        </div>
      </div>
    </section>
  );
}
