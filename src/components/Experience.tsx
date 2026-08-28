import { useState } from "react";
import type { ExperienceItem, SubProject } from "../data/types";
import "./Experience.css";

function ProjectCard({ p }: { p: SubProject }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`proj ${open ? "is-open" : ""}`}>
      <button
        className="proj__head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="proj__name">{p.name}</span>
        <span className="proj__kind">{p.kind}</span>
        <span className="proj__toggle" aria-hidden="true">
          {open ? "–" : "+"}
        </span>
      </button>

      {open && (
        <div className="proj__body">
          {p.metrics.length > 0 && (
            <div className="proj__metrics">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <span className="proj__mv">{m.value}</span>
                  <span className="proj__ml">{m.label}</span>
                </div>
              ))}
            </div>
          )}
          <ul className="exp__list">
            {p.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          {p.url && (
            <a
              className="proj__link"
              href={p.url}
              target="_blank"
              rel="noreferrer"
            >
              {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function Item({
  item,
  open,
  onToggle,
}: {
  item: ExperienceItem;
  open: boolean;
  onToggle: () => void;
}) {
  const expandable = !!(item.details || item.projects);

  const handleClick = (e: React.MouseEvent) => {
    if (!expandable) return;
    // клики внутри раскрытого блока (подпроекты, ссылки) не сворачивают карточку
    if ((e.target as HTMLElement).closest(".exp__detail")) return;
    onToggle();
  };
  const handleKey = (e: React.KeyboardEvent) => {
    if (!expandable) return;
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <li className={`exp ${open ? "is-open" : ""}`}>
      <span className="exp__node" aria-hidden="true" />
      <div className="exp__period tech">{item.period}</div>

      <div
        className={`exp__card ${expandable ? "exp__card--btn" : ""}`}
        onClick={handleClick}
        onKeyDown={handleKey}
        role={expandable ? "button" : undefined}
        tabIndex={expandable ? 0 : undefined}
        aria-expanded={expandable ? open : undefined}
      >
        <div className="exp__head">
          <div>
            <div className="exp__role">{item.role}</div>
            <div className="exp__company">
              {item.company}
              {item.location && (
                <span className="exp__loc"> · {item.location}</span>
              )}
            </div>
          </div>
          {expandable && (
            <span className="exp__toggle" aria-hidden="true">
              {open ? "–" : "+"}
            </span>
          )}
        </div>

        <p className="exp__summary">{item.summary}</p>

        <ul className="exp__highlights">
          {item.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        {open && (
          <div className="exp__detail">
            {item.details && (
              <ul className="exp__list">
                {item.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}

            {item.projects && (
              <div className="exp__projects">
                <span className="tech exp__projects-label">
                  LSR / GROUP_PROJECTS
                </span>
                {item.projects.map((p) => (
                  <ProjectCard key={p.name} p={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="section exp-section" id="experience">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Experience</p>
          <h2>Опыт</h2>
          <p>5 лет в fintech: рост, аналитика, инфраструктура и команды.</p>
        </div>

        <ol className="exp-timeline reveal">
          {items.map((it) => (
            <Item
              key={it.id}
              item={it}
              open={openId === it.id}
              onToggle={() =>
                setOpenId((cur) => (cur === it.id ? null : it.id))
              }
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
