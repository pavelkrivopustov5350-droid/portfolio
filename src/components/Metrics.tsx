import type { Metric } from "../data/types";
import Stat from "./Stat";
import "./Metrics.css";

export default function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="section metrics-section" id="impact">
      <div className="container">
        <p className="tech reveal" style={{ marginBottom: 26 }}>
          IMPACT / KEY_METRICS
        </p>
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <div
              className="metric reveal"
              key={m.label}
              style={{ ["--reveal-delay" as string]: `${(i % 4) * 55}ms` }}
            >
              <Stat metric={m} />
              <span className="metric__label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
