/**
 * Типы контента. Весь текст сайта — в `profile.ts`, `cases.ts`, `experience.ts`.
 * Компоненты не редактируем ради контента.
 */

export interface Metric {
  /** Отображаемое значение: "×10", "−50%", "50 000", "150–200K". */
  value: string;
  label: string;
  /** Целое число для счётчика при появлении. Если не задано — значение статично. */
  count?: number;
  /** Приставка / суффикс вокруг счётчика ("×", "−", "%"). */
  prefix?: string;
  suffix?: string;
  /** Разделять счётчик тонкими пробелами по тысячам. */
  group?: boolean;
}

export interface PipelineData {
  title: string;
  steps: string[];
  /** Первые N шагов — параллельные входы, сходящиеся в шаг N. */
  merge?: number;
  /** Дорисовать петлю обратной связи от последнего шага. */
  loop?: boolean;
  loopLabel?: string;
}

export interface CaseStudy {
  id: string;
  index: string; // "01"
  name: string; // "SMS Growth Engine"
  company: string;
  categories: string[];
  summary: string;
  /** 1–2 метрики на карточке. */
  headline: Metric[];
  /** Полный список метрик в раскрытом кейсе. */
  metrics: Metric[];
  challenge: string;
  approach: string[];
  result: string[];
  team?: string[];
  pipeline?: PipelineData;
  quote?: string;
}

export interface SubProject {
  name: string;
  kind: string;
  url?: string;
  metrics: Metric[];
  bullets: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  location?: string;
  summary: string;
  /** Показывается в свёрнутом виде. */
  highlights: string[];
  /** Раскрывается по клику. */
  details?: string[];
  /** Подпроекты (для LSR). */
  projects?: SubProject[];
  /** id кейсов, к которым ведёт эта роль. */
  relatedCases?: string[];
}

export interface SkillGroup {
  index: string;
  title: string;
  items: string[];
}

export interface ApproachStep {
  index: string;
  title: string;
  text: string;
}

export interface AboutData {
  lead: string;
  paragraphs: string[];
  ai: string;
  facts: { value: string; label: string }[];
  footnote: string;
}

export interface Contact {
  kind: "phone" | "telegram" | "email";
  label: string;
  value: string;
  href: string;
  /** Значение для копирования в буфер. */
  copy?: string;
}

export interface Profile {
  name: string;
  nameLat: string;
  titleLines: string[];
  role: string;
  subtitle: string;
  statement: string;
  location: string;
  availability: string;
  metrics: Metric[];
  skills: SkillGroup[];
  approach: ApproachStep[];
  about: AboutData;
  contacts: Contact[];
}
