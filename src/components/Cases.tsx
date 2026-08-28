import { useState } from "react";
import type { CaseStudy as CaseStudyType } from "../data/types";
import CaseStudy from "./CaseStudy";
import "./Cases.css";

function CaseCard({
  data,
  active,
  onToggle,
}: {
  data: CaseStudyType;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={`case-card reveal ${active ? "is-active" : ""}`}
      onClick={onToggle}
      aria-expanded={active}
    >
      <div className="case-card__top">
        <span className="tech">CASE_{data.index}</span>
        <span className="tech case-card__company">{data.company}</span>
      </div>

      <h3 className="case-card__name">{data.name}</h3>

      <div className="case-card__cats">
        {data.categories.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

      <p className="case-card__summary">{data.summary}</p>

      <div className="case-card__metrics">
        {data.headline.map((m) => (
          <div key={m.label}>
            <span className="case-card__mv">{m.value}</span>
            <span className="case-card__ml">{m.label}</span>
          </div>
        ))}
      </div>

      <span className="case-card__cta">
        {active ? "Свернуть" : "Открыть кейс"}
        <span className="case-card__arrow" aria-hidden="true">
          {active ? "–" : "→"}
        </span>
      </span>
    </button>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Cases({ cases }: { cases: CaseStudyType[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const rows = chunk(cases, 2);

  return (
    <section className="section cases-section" id="cases">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Selected cases</p>
          <h2>Кейсы</h2>
          <p>
            Проекты, где маркетинг, данные и технологии работают как единая
            система.
          </p>
        </div>

        <div className="cases-grid">
          {rows.map((row, ri) => (
            <div className="cases-row" key={ri}>
              {row.map((c) => (
                <CaseCard
                  key={c.id}
                  data={c}
                  active={openId === c.id}
                  onToggle={() =>
                    setOpenId((cur) => (cur === c.id ? null : c.id))
                  }
                />
              ))}
              {row.some((c) => c.id === openId) && (
                <CaseStudy
                  data={cases.find((c) => c.id === openId)!}
                  onClose={() => setOpenId(null)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
