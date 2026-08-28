import type { Metric } from "../data/types";
import { useCountUp } from "../hooks/useCountUp";

const NBSP = " "; // узкий неразрывный пробел

function group(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
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
  const prefix = metric.prefix ? metric.prefix.replace(/ $/, NBSP) : "";
  return (
    <span className="stat__value" ref={ref}>
      {prefix}
      {shown}
      {metric.suffix}
    </span>
  );
}
