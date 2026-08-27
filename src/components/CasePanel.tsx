import { useEffect, useRef } from "react";
import type { CaseStudy } from "../data/types";
import Metric from "./ui/Metric";
import { TagRow } from "./ui/Tag";
import "./CasePanel.css";

interface Props {
  study: CaseStudy | null;
  allCases: CaseStudy[];
  onClose: () => void;
  onOpenRelated: (id: string) => void;
}

export default function CasePanel({
  study,
  allCases,
  onClose,
  onOpenRelated,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!study) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    panelRef.current?.scrollTo(0, 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [study, onClose]);

  const related =
    study?.related
      ?.map((id) => allCases.find((c) => c.id === id))
      .filter((c): c is CaseStudy => !!c) ?? [];

  return (
    <div
      className={`cp-overlay ${study ? "is-open" : ""}`}
      onClick={onClose}
      aria-hidden={!study}
    >
      <aside
        className="cp-panel"
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={study?.title}
        onClick={(e) => e.stopPropagation()}
        style={
          study?.accent
            ? ({ ["--accent-case" as string]: study.accent } as object)
            : undefined
        }
      >
        <button className="cp-close" onClick={onClose} aria-label="Закрыть">
          <span />
          <span />
        </button>

        {study && (
          <div className="cp-body">
            <div className="cp-scanline" aria-hidden="true" />

            <header className="cp-head">
              <p className="eyebrow">Кейс · {study.role}</p>
              <h2 className="cp-title">{study.title}</h2>
              <p className="cp-tagline">{study.tagline}</p>
              <dl className="cp-facts">
                <div>
                  <dt>Период</dt>
                  <dd className="mono">{study.period}</dd>
                </div>
                <div>
                  <dt>Контекст</dt>
                  <dd>{study.org}</dd>
                </div>
              </dl>
              <TagRow items={study.tags} />
            </header>

            <section className="cp-metrics">
              {study.metrics.map((m) => (
                <Metric key={m.label} m={m} />
              ))}
            </section>

            <div className="cp-content">
              {study.blocks.map((b, i) => (
                <section key={i} className="cp-block">
                  <h3 className="cp-block__h">
                    <span className="mono cp-block__num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {b.heading}
                  </h3>
                  {b.body.map((p, j) => (
                    <p key={j} className="cp-block__p">
                      {p}
                    </p>
                  ))}
                  {b.bullets && (
                    <ul className="cp-block__list">
                      {b.bullets.map((li, j) => (
                        <li key={j}>{li}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {study.links && study.links.length > 0 && (
              <div className="cp-links">
                {study.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="cp-link"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}

            {related.length > 0 && (
              <section className="cp-related">
                <p className="eyebrow">Связанные проекты</p>
                <div className="cp-related__grid">
                  {related.map((r) => (
                    <button
                      key={r.id}
                      className="cp-related__card"
                      onClick={() => onOpenRelated(r.id)}
                    >
                      <span className="cp-related__title">{r.title}</span>
                      <span className="cp-related__tag mono">
                        {r.metrics[0]?.value} · {r.metrics[0]?.label}
                      </span>
                      <span className="cp-related__go mono">→</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
