import type { CaseMetric } from "../../data/types";
import "./Metric.css";

const TREND_GLYPH: Record<NonNullable<CaseMetric["trend"]>, string> = {
  up: "▲",
  down: "▼",
  flat: "—",
};

export default function Metric({ m }: { m: CaseMetric }) {
  const trendClass = m.trend ? `metric--${m.trend}` : "";
  return (
    <div className={`metric ${trendClass}`} title={m.hint}>
      <div className="metric__value">
        {m.trend && <span className="metric__trend">{TREND_GLYPH[m.trend]}</span>}
        {m.value}
      </div>
      <div className="metric__label">{m.label}</div>
      {m.hint && <div className="metric__hint">{m.hint}</div>}
    </div>
  );
}
