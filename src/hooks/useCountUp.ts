import { useEffect, useRef, useState } from "react";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Считает число от 0 до `target`, когда элемент впервые попадает во вьюпорт.
 * Возвращает `[ref, value]`.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  duration = 1400,
) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(reduced ? target : 0);
  const done = useRef(reduced);

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return [ref, value] as const;
}
