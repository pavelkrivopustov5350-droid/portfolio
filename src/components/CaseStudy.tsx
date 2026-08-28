import { useEffect, useRef } from "react";
import type { CaseStudy as CaseStudyType } from "../data/types";
import Pipeline from "./Pipeline";

export default function CaseStudy({
  data,
  onClose,
}: {
  data: CaseStudyType;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [onClose]);

  return (
    <div className="cs" ref={ref} role="region" aria-label={data.name}>
      <button className="cs__close" onClick={onClose} aria-label="Свернуть кейс">
        <span />
        <span />
      </button>

      <div className="cs__head">
        <span className="tech">
          CASE_{data.index} / {data.company.toUpperCase()}
        </span>
        <h3 className="cs__name">{data.name}</h3>
        <div className="cs__cats">
          {data.categories.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <p className="cs__summary">{data.summary}</p>
      </div>

      <div
        className={`cs__metrics ${data.metrics.length <= 2 ? "cs__metrics--few" : ""}`}
      >
        {data.metrics.map((m) => (
          <div className="cs__metric" key={m.label}>
            <span className="cs__metric-v">{m.value}</span>
            <span className="cs__metric-l">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="cs__body">
        <div className="cs__col">
          <section className="cs__block">
            <span className="tech">CHALLENGE</span>
            <p>{data.challenge}</p>
          </section>

          <section className="cs__block">
            <span className="tech">APPROACH</span>
            <ul className="cs__list">
              {data.approach.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>

          <section className="cs__block">
            <span className="tech">RESULT</span>
            <ul className="cs__list cs__list--result">
              {data.result.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>

          {data.team && (
            <section className="cs__block">
              <span className="tech">TEAM</span>
              <div className="cs__team">
                {data.team.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.pipeline && (
          <aside className="cs__aside">
            <Pipeline data={data.pipeline} />
          </aside>
        )}
      </div>

      {data.quote && (
        <blockquote className="cs__quote">«{data.quote}»</blockquote>
      )}
    </div>
  );
}
