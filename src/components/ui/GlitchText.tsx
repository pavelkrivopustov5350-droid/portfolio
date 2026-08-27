import { createElement } from "react";
import "./GlitchText.css";

/**
 * Текст с лёгким сай-фай «глитчем» на hover.
 * data-text дублирует содержимое — по нему рисуются цветовые слои.
 */
export default function GlitchText({
  children,
  as = "span",
  className = "",
}: {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  return createElement(
    as,
    { className: `glitch ${className}`, "data-text": children },
    children,
  );
}
