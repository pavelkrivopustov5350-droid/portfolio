import type { AboutData } from "../data/types";
import "./About.css";

export default function About({ data }: { data: AboutData }) {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-head about-head reveal">
          <p className="eyebrow">About</p>
          <h2>О себе</h2>
        </div>

        <div className="about-text reveal">
          <p className="about-lead">{data.lead}</p>

          {data.paragraphs.map((p, i) => (
            <p key={i} className="about-p">
              {p}
            </p>
          ))}

          <p className="about-p">
            <span className="about-ai-label">AI &amp; Automation — </span>
            {data.ai}
          </p>
        </div>
      </div>
    </section>
  );
}
