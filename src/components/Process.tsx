import { useEffect, useRef, useState } from "react";
import "./Process.css";

const STEPS: { cmd: string; out: string }[] = [
  { cmd: "analyze --unit-economics --funnel", out: "экономика направления, воронка, ограничения" },
  { cmd: "concept --business-model --mvp", out: "концепция, бизнес-модель, требования к MVP" },
  { cmd: "roadmap --priorities", out: "roadmap и приоритеты развития продукта" },
  { cmd: "design --crm --database", out: "проектирование CRM и структуры базы данных" },
  { cmd: "integrate --sources --bigdata --triggers", out: "SMS-сервисы, агрегаторы данных, триггерные источники" },
  { cmd: "connect --partner-networks", out: "партнёрские сети с офферами" },
  { cmd: "automate --pipeline", out: "данные → сегментация → отправка → сбор результатов" },
  { cmd: "analytics --economics --control", out: "система аналитики и контроль экономики канала" },
  { cmd: "optimize --sources --segments --budget", out: "сегментация аудитории, оптимизация источников" },
  { cmd: "scale --volume --keep-roi", out: "масштабирование объёма без потери экономики" },
];

const FINAL = "направление запущено";
const DURATION = 4600; // мс на всю последовательность
const BAR_END = 0.88; // прогресс-бар достигает 100% на этой доле

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);
  const started = useRef(false);
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );
  const [p, setP] = useState(reduced.current ? 1 : 0);

  const play = () => {
    started.current = true;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // лёгкое ускорение к концу
      setP(t < 1 ? t * t * (3 - 2 * t) : 1);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    setP(0);
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (reduced.current) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const share = BAR_END / STEPS.length;
  const activeIdx = Math.floor(p / share);
  const pct = Math.min(Math.round((p / BAR_END) * 100), 100);
  const doneAll = pct >= 100;

  return (
    <section className="section process-section" id="process" ref={ref}>
      <div className="container process-inner">
        <div className="process-head reveal">
          <p className="eyebrow">Process</p>
          <h2>Как я запускаю направление</h2>
          <p>
            От экономики и MVP до инфраструктуры и масштабирования — один
            повторяемый путь.
          </p>
        </div>

        <div className="term reveal">
          <div className="term__bar">
            <span className="term__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="term__title tech">
              launch.sh — marketing direction
            </span>
            <button className="term__replay" onClick={play}>
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              повторить
            </button>
          </div>

          <div className="term__body">
            {STEPS.map((s, i) => {
              const state =
                doneAll || i < activeIdx ? "done" : i === activeIdx ? "run" : "wait";
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

          <div className="term__foot">
            <span className="term__foot-label tech">progress</span>
            <span className="term__track" aria-hidden="true">
              <span style={{ width: `${pct}%` }} />
            </span>
            <span className="term__pct">{pct}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
