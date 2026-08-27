import { useCallback, useEffect, useState } from "react";

/**
 * Мини-роутер на хеше. Нужен только для одного: делать кейсы
 * ссылаемыми — `#/case/<id>`. Всё остальное — обычный скролл по секциям.
 */
export interface Route {
  /** id открытого кейса или null. */
  caseId: string | null;
}

function parse(): Route {
  const h = window.location.hash.replace(/^#/, "");
  const m = h.match(/^\/case\/([\w-]+)/);
  return { caseId: m ? m[1] : null };
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const openCase = useCallback((id: string) => {
    window.location.hash = `/case/${id}`;
  }, []);

  const closeCase = useCallback(() => {
    // Убираем хеш, не плодя записи в истории сверх одной.
    if (window.location.hash) {
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search,
      );
      setRoute({ caseId: null });
    }
  }, []);

  return { route, openCase, closeCase };
}
