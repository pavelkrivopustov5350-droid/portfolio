import { useEffect } from "react";

/** Блокирует прокрутку body, пока `locked === true` (для мобильного меню). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { overflow, paddingRight } = document.body.style;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}
