import type { ApproachStep } from "../data/types";
import "./Approach.css";

export default function Approach({ steps }: { steps: ApproachStep[] }) {
  return (
    <section className="section approach-section" id="approach">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">About / Approach</p>
          <h2>Как я работаю</h2>
        </div>

        <div className="approach-grid">
          {steps.map((s, i) => (
            <div
              className="approach reveal"
              key={s.title}
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <span className="approach__index tech">{s.index}</span>
              <h3 className="approach__title">{s.title}</h3>
              <p className="approach__text">{s.text}</p>
            </div>
          ))}
        </div>

        <p className="approach-eq reveal">
          Marketing <span>×</span> Data <span>×</span> Technology
        </p>
      </div>
    </section>
  );
}
