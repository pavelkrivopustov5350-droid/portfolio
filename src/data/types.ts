/**
 * Типы данных портфолио.
 * Весь контент сайта описывается объектами этих типов в файлах
 * `profile.ts` и `projects.ts`. Больше нигде тексты править не нужно.
 */

/** Категория узла в графе — задаёт цвет и форму. */
export type NodeKind =
  | "project" // продукт / направление
  | "initiative" // отдельная инициатива внутри проекта
  | "channel" // канал привлечения / роста
  | "team" // команда / роль
  | "outcome"; // достигнутый результат

/** Тип связи между узлами графа. */
export type LinkKind =
  | "drives" // A двигает / усиливает B
  | "depends" // A зависит от B
  | "spawned" // из A выросло B
  | "shares" // A и B делят ресурс / команду
  | "informs"; // A даёт данные / инсайты для B

export interface GraphNode {
  id: string;
  label: string;
  kind: NodeKind;
  /** Короткое пояснение — показывается в тултипе и боковой панели. */
  summary?: string;
  /** id кейса из `cases`, который открывается по клику. */
  caseId?: string;
  /** Ключевая метрика узла, напр. "+38% MRR". */
  metric?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  kind: LinkKind;
  /** Подпись связи, напр. "перформанс-трафик → онбординг". */
  label?: string;
}

export interface CaseMetric {
  label: string;
  value: string;
  /** Динамика: положительная / отрицательная / нейтральная. */
  trend?: "up" | "down" | "flat";
  hint?: string;
}

export interface CaseBlock {
  /** Заголовок смыслового блока кейса. */
  heading: string;
  /** Абзацы текста. Поддерживается только простой текст. */
  body: string[];
  /** Необязательный список пунктов под текстом. */
  bullets?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  /** Роль в проекте. */
  role: string;
  /** Период, напр. "2023 — 2024". */
  period: string;
  /** Компания / контекст. */
  org: string;
  /** Одно предложение — суть кейса. */
  tagline: string;
  /** Теги стека и подходов. */
  tags: string[];
  /** Ключевые цифры результата. */
  metrics: CaseMetric[];
  /** Контекст → задача → действия → результат. */
  blocks: CaseBlock[];
  /** id связанных кейсов — блок «Связанные проекты» внизу. */
  related?: string[];
  /** Ссылки: демо, статья, деку. */
  links?: { label: string; url: string }[];
  /** Акцентный цвет кейса (hex). По умолчанию — из темы. */
  accent?: string;
}

export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  note: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  /** Питч в 2–3 предложения для верхнего экрана. */
  pitch: string;
  /** Короткие факты-достижения для бегущей строки под питчем. */
  highlights: string[];
  skills: SkillGroup[];
  timeline: TimelineEntry[];
  contacts: { label: string; value: string; url: string }[];
}

export interface PortfolioData {
  profile: Profile;
  cases: CaseStudy[];
  graph: { nodes: GraphNode[]; links: GraphLink[] };
}
