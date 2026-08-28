import { useEffect } from "react";

/**
 * Один общий IntersectionObserver: добавляет `.in` элементам `.reveal`
 * при попадании во вьюпорт. Наблюдает и за элементами, добавленными позже.
 */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    };
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
