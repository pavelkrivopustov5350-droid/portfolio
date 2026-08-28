import { useEffect, useRef, useState } from "react";
import "./Process.css";

const STEPS: { cmd: string; out: string }[] = [
  { cmd: "analyze --unit-economics --funnel", out: "экономика направления, воронка, ограничения" },
  { cmd: "concept --business-model --mvp", out: "концепция, бизнес-модель, требования к MVP" },
  { cmd: "roadmap --priorities", out: "roadmap и приоритеты развития продукта" },
  { cmd: "design --crm --database", out: "проектирование CRM и структуры базы данных" },
  { cmd: "integrate --sms x4 --bigdata x2 --triggers", out: "4 SMS-сервиса, 2 агрегатора Big Data, свои триггеры" },
  { cmd: "connect --partner-networks x2", out: "2 партнёрские сети с офферами" },
  { cmd: "automate --pipeline", out: "данные → сегментация → отправка SMS → сбор результатов" },
  { cmd: "analytics --economics --control", out: "система аналитики и контроль экономики канала" },
  { cmd: "optimize --sources --segments --budget", out: "сегментация аудитории, оптимизация источников" },
  { cmd: "scale --5k-to-50k", out: "масштабирование: 5 000 → 50 000 SMS в день" },
];

const FINAL =
  "направление запущено · ROI ~50% · CPL −50% · 300–500 заявок в день";

const BAR_END = 0.82; // прогресс-бар достигает 100% на этой доле прокрутки

export default function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );
  const [p, setP] = useState(reduced.current ? 1 : 0);

  useEffect(() => {
    if (reduced.current) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setP(Math.min(Math.max(scrolled / Math.max(total, 1), 0), 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const share = BAR_END / STEPS.length;
  const activeIdx = Math.floor(p / share); // индекс «выполняющегося» шага
  const pct = Math.min(Math.round((p / BAR_END) * 100), 100);
  const doneAll = pct >= 100;

  return (
    <section className="process-wrap" id="process" ref={wrapRef}>
      <div className="process-stage">
        <div className="container process-inner">
          <div className="process-head reveal">
            <p className="eyebrow">Process</p>
            <h2>Как я запускаю направление</h2>
            <p>
              От экономики и MVP до инфраструктуры и масштабирования. Пролистайте —
              последовательность соберётся по шагам.
            </p>
          </div>

          <div className="term reveal">
            <div className="term__bar">
              <span className="term__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="term__title tech">launch.sh — marketing direction</span>
              <span className="term__pct tech">{pct}%</span>
            </div>

            <div className="term__body">
              {STEPS.map((s, i) => {
                const state =
                  doneAll || i < activeIdx
                    ? "done"
                    : i === activeIdx
                      ? "run"
                      : "wait";
                if (state === "wait") return null;
                return (
                  <div className={`term__line term__line--${state}`} key={i}>
                    <div className="term__cmd">
                      <span className="term__prompt">$</span>
                      <span className="term__cmd-text">{s.cmd}</span>
                      <span className="term__status">
                        {state === "done" ? "OK" : "···"}
                      </span>
                    </div>
                    <div className="term__out">{s.out}</div>
                  </div>
                );
              })}

              {!doneAll && (
                <div className="term__cursor" aria-hidden="true">
                  <span className="term__prompt">$</span>
                  <span className="term__caret" />
                </div>
              )}

              {doneAll && (
                <div className="term__final">
                  <span aria-hidden="true">✓</span> {FINAL}
                </div>
              )}
            </div>

            <div className="term__progress" aria-hidden="true">
              <span style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
