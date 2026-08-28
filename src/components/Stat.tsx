import type { Metric } from "../data/types";
import { useCountUp } from "../hooks/useCountUp";

function group(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Значение метрики. Если у метрики есть `count` — число «набегает»
 * при появлении. Иначе выводится как есть.
 */
export default function Stat({ metric }: { metric: Metric }) {
  const canCount = typeof metric.count === "number";
  const [ref, value] = useCountUp<HTMLSpanElement>(metric.count ?? 0);

  if (!canCount) {
    return <span className="stat__value">{metric.value}</span>;
  }

  const shown = metric.group ? group(value) : value.toString();
  return (
    <span className="stat__value" ref={ref}>
      {metric.prefix}
      {shown}
      {metric.suffix}
    </span>
  );
}
