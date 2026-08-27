import type { CaseStudy } from "../data/types";
import "./CaseIndex.css";

interface Props {
  cases: CaseStudy[];
  onOpen: (id: string) => void;
}

export default function CaseIndex({ cases, onOpen }: Props) {
  return (
    <div className="cx-grid">
      {cases.map((c, i) => (
        <button
          key={c.id}
          className="cx-card reveal hud"
          style={{
            ["--accent-case" as string]: c.accent ?? "var(--accent)",
            transitionDelay: `${(i % 3) * 60}ms`,
          }}
          onClick={() => onOpen(c.id)}
        >
          <div className="cx-card__top">
            <span className="cx-card__idx mono">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="cx-card__period mono">{c.period}</span>
          </div>

          <h3 className="cx-card__title">{c.title}</h3>
          <p className="cx-card__tagline">{c.tagline}</p>

          <div className="cx-card__metrics">
            {c.metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="cx-card__metric">
                <span className="cx-card__metric-val mono">{m.value}</span>
                <span className="cx-card__metric-lbl">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="cx-card__foot">
            <span className="cx-card__org">{c.org.split("·")[0].trim()}</span>
            <span className="cx-card__open mono">разобрать кейс →</span>
          </div>
        </button>
      ))}
    </div>
  );
}
