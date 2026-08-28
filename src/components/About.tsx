import type { AboutData } from "../data/types";
import "./About.css";

export default function About({ data }: { data: AboutData }) {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">About</p>
          <h2>О себе</h2>
        </div>

        <div className="about-grid">
          <div className="about-text reveal">
            <p className="about-lead">{data.lead}</p>
            {data.paragraphs.map((p, i) => (
              <p key={i} className="about-p">
                {p}
              </p>
            ))}

            <div className="about-ai">
              <span className="tech">AI &amp; AUTOMATION</span>
              <p>{data.ai}</p>
            </div>
          </div>

          <aside className="about-facts reveal">
            {data.facts.map((f) => (
              <div className="about-fact" key={f.label}>
                <span className="about-fact__v">{f.value}</span>
                <span className="about-fact__l">{f.label}</span>
              </div>
            ))}
          </aside>
        </div>

        <p className="about-footnote reveal tech">{data.footnote}</p>
      </div>
    </section>
  );
}
