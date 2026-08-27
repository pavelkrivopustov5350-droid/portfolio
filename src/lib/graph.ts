import type { GraphLink, GraphNode, LinkKind, NodeKind } from "../data/types";

/** Радиус узла в мировых координатах по его типу. */
export const NODE_RADIUS: Record<NodeKind, number> = {
  project: 15,
  initiative: 11,
  channel: 10,
  team: 10,
  outcome: 8,
};

export const KIND_LABEL: Record<NodeKind, string> = {
  project: "Проект",
  initiative: "Инициатива",
  channel: "Канал",
  team: "Команда",
  outcome: "Результат",
};

export const LINK_LABEL: Record<LinkKind, string> = {
  drives: "двигает",
  depends: "зависит от",
  spawned: "породило",
  shares: "делит ресурс",
  informs: "даёт данные",
};

/** Пунктир по типу связи (canvas setLineDash). */
export const LINK_DASH: Record<LinkKind, number[]> = {
  drives: [],
  depends: [2, 4],
  spawned: [8, 4],
  shares: [1, 3],
  informs: [4, 3],
};

export interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number | null;
  fy?: number | null;
  /** степень (число связей) — влияет на массу и размер */
  degree: number;
}

export interface SimLink {
  source: SimNode;
  target: SimNode;
  kind: LinkKind;
  label?: string;
}

/**
 * Готовит массивы для d3-force: считает степень узлов и
 * заменяет строковые id в связях на ссылки на объекты (d3 сделает это сам,
 * но degree нам нужен заранее для размеров).
 */
export function buildGraph(nodes: GraphNode[], links: GraphLink[]) {
  const degree = new Map<string, number>();
  for (const l of links) {
    degree.set(l.source, (degree.get(l.source) ?? 0) + 1);
    degree.set(l.target, (degree.get(l.target) ?? 0) + 1);
  }
  const simNodes: SimNode[] = nodes.map((n) => ({
    ...n,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    degree: degree.get(n.id) ?? 0,
  }));
  const byId = new Map(simNodes.map((n) => [n.id, n]));
  const simLinks = links
    .filter((l) => byId.has(l.source) && byId.has(l.target))
    .map((l) => ({
      source: byId.get(l.source)!,
      target: byId.get(l.target)!,
      kind: l.kind,
      label: l.label,
    }));
  return { simNodes, simLinks, byId };
}

/** Множество id соседей узла (для подсветки при наведении). */
export function neighborsOf(id: string, links: GraphLink[]) {
  const set = new Set<string>([id]);
  for (const l of links) {
    if (l.source === id) set.add(l.target);
    if (l.target === id) set.add(l.source);
  }
  return set;
}

export function radiusFor(n: SimNode) {
  return NODE_RADIUS[n.kind] + Math.min(n.degree, 6) * 0.9;
}
