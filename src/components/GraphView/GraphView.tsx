import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
} from "d3-force";
import type { GraphLink, GraphNode, NodeKind } from "../../data/types";
import {
  buildGraph,
  KIND_LABEL,
  LINK_DASH,
  LINK_LABEL,
  neighborsOf,
  radiusFor,
  type SimLink,
  type SimNode,
} from "../../lib/graph";
import "./GraphView.css";

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
  onOpenCase: (caseId: string) => void;
}

interface View {
  x: number;
  y: number;
  k: number;
}

const KIND_ORDER: NodeKind[] = [
  "project",
  "initiative",
  "channel",
  "team",
  "outcome",
];

export default function GraphView({ nodes, links, onOpenCase }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { simNodes, simLinks } = useMemo(
    () => buildGraph(nodes, links),
    [nodes, links],
  );

  const kindColor = useRef<Record<string, string>>({});
  const view = useRef<View>({ x: 0, y: 0, k: 1 });
  const sim = useRef<Simulation<SimNode, SimLink> | null>(null);
  const fitRef = useRef<() => void>(() => {});
  const interacted = useRef(false);

  const hoverId = useRef<string | null>(null);
  const [hoverNode, setHoverNode] = useState<SimNode | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [activeKinds, setActiveKinds] = useState<Set<NodeKind>>(
    () => new Set(KIND_ORDER),
  );
  const [hint, setHint] = useState(true);

  const dragNode = useRef<SimNode | null>(null);
  const panning = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0, moved: false });
  const tooltipPos = useRef({ x: 0, y: 0, flip: false });
  const [, bump] = useState(0);

  const highlight = useMemo(() => {
    const id = pinnedId ?? hoverNode?.id ?? null;
    return id ? neighborsOf(id, links) : null;
  }, [pinnedId, hoverNode, links]);
  const highlightRef = useRef(highlight);
  highlightRef.current = highlight;
  const activeKindsRef = useRef(activeKinds);
  activeKindsRef.current = activeKinds;

  /* ---------- координаты ---------- */
  const toScreen = (wx: number, wy: number) => {
    const v = view.current;
    return { x: wx * v.k + v.x, y: wy * v.k + v.y };
  };
  const toWorld = (sx: number, sy: number) => {
    const v = view.current;
    return { x: (sx - v.x) / v.k, y: (sy - v.y) / v.k };
  };

  const nodeAt = useCallback(
    (sx: number, sy: number): SimNode | null => {
      const w = toWorld(sx, sy);
      let best: SimNode | null = null;
      let bestD = Infinity;
      for (const n of simNodes) {
        if (!activeKindsRef.current.has(n.kind)) continue;
        const d = Math.hypot(n.x - w.x, n.y - w.y);
        const r = radiusFor(n) + 6 / view.current.k;
        if (d < r && d < bestD) {
          best = n;
          bestD = d;
        }
      }
      return best;
    },
    [simNodes],
  );

  /* ---------- отрисовка ---------- */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const hl = highlightRef.current;
    const kinds = activeKindsRef.current;
    const colors = kindColor.current;
    const k = view.current.k;
    const narrow = W < 560;

    for (const l of simLinks) {
      const s = l.source;
      const t = l.target;
      if (!kinds.has(s.kind) || !kinds.has(t.kind)) continue;
      const a = toScreen(s.x, s.y);
      const b = toScreen(t.x, t.y);
      const lit = hl ? hl.has(s.id) && hl.has(t.id) : false;
      const dim = hl && !lit;
      ctx.save();
      ctx.setLineDash(LINK_DASH[l.kind].map((n) => n * k));
      ctx.strokeStyle = lit
        ? "rgba(77, 225, 255, 0.8)"
        : dim
          ? "rgba(120, 140, 170, 0.05)"
          : "rgba(120, 150, 190, 0.2)";
      ctx.lineWidth = lit ? 1.6 : 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      if (!dim) {
        const ang = Math.atan2(b.y - a.y, b.x - a.x);
        const tr = radiusFor(t) * k + 4;
        const hx = b.x - Math.cos(ang) * tr;
        const hy = b.y - Math.sin(ang) * tr;
        const size = lit ? 7 : 5;
        ctx.fillStyle = lit
          ? "rgba(77, 225, 255, 0.9)"
          : "rgba(120, 150, 190, 0.28)";
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(hx - Math.cos(ang - 0.4) * size, hy - Math.sin(ang - 0.4) * size);
        ctx.lineTo(hx - Math.cos(ang + 0.4) * size, hy - Math.sin(ang + 0.4) * size);
        ctx.closePath();
        ctx.fill();
      }

      if (lit && l.label && k > 0.7) {
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        ctx.setLineDash([]);
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const tw = ctx.measureText(l.label).width;
        ctx.fillStyle = "rgba(6, 10, 18, 0.92)";
        ctx.fillRect(mx - tw / 2 - 5, my - 8, tw + 10, 16);
        ctx.fillStyle = "rgba(180, 235, 255, 0.92)";
        ctx.fillText(l.label, mx, my);
      }
      ctx.restore();
    }

    for (const n of simNodes) {
      if (!kinds.has(n.kind)) continue;
      const p = toScreen(n.x, n.y);
      const r = radiusFor(n) * k;
      const lit = hl ? hl.has(n.id) : false;
      const dim = hl && !lit;
      const col = colors[n.kind] ?? "#4de1ff";
      const isHover = hoverId.current === n.id || pinnedId === n.id;

      ctx.save();
      ctx.globalAlpha = dim ? 0.22 : 1;
      if (!dim) {
        ctx.shadowColor = col;
        ctx.shadowBlur = isHover ? 26 : lit ? 16 : 8;
      }

      ctx.beginPath();
      if (n.kind === "project") {
        ctx.moveTo(p.x, p.y - r);
        ctx.lineTo(p.x + r, p.y);
        ctx.lineTo(p.x, p.y + r);
        ctx.lineTo(p.x - r, p.y);
        ctx.closePath();
      } else if (n.kind === "outcome") {
        for (let i = 0; i < 6; i++) {
          const ang = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const x = p.x + Math.cos(ang) * r;
          const y = p.y + Math.sin(ang) * r;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
      } else {
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      }
      ctx.fillStyle = "rgba(8, 12, 20, 0.92)";
      ctx.fill();
      ctx.lineWidth = isHover ? 2.4 : 1.6;
      ctx.strokeStyle = col;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1.5, r * 0.22), 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();

      const showLabel =
        !dim &&
        (lit || (!narrow && (k > 0.72 || n.kind === "project")));
      if (showLabel) {
        ctx.font =
          n.kind === "project"
            ? "600 12px 'Space Grotesk', sans-serif"
            : "11px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const tw = ctx.measureText(n.label).width;
        // держим подпись внутри канвы, чтобы не обрезалась у края
        const lx = Math.max(tw / 2 + 6, Math.min(W - tw / 2 - 6, p.x));
        const ly = Math.min(p.y + r + 6, H - 30);
        ctx.fillStyle = "rgba(6, 10, 18, 0.8)";
        ctx.fillRect(lx - tw / 2 - 4, ly - 2, tw + 8, 16);
        ctx.fillStyle = lit ? "#eaf6ff" : "rgba(200, 214, 232, 0.82)";
        ctx.fillText(n.label, lx, ly);
        if (n.metric && (lit || k > 0.9)) {
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = col;
          ctx.fillText(n.metric, lx, ly + 15);
        }
      }
      ctx.restore();
    }
  }, [simNodes, simLinks, pinnedId]);

  /* ---------- симуляция ---------- */
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const cs = getComputedStyle(document.documentElement);
    kindColor.current = {
      project: cs.getPropertyValue("--kind-project").trim() || "#4de1ff",
      initiative: cs.getPropertyValue("--kind-initiative").trim() || "#a06bff",
      channel: cs.getPropertyValue("--kind-channel").trim() || "#46e5a4",
      team: cs.getPropertyValue("--kind-team").trim() || "#ff8a5c",
      outcome: cs.getPropertyValue("--kind-outcome").trim() || "#ffcf5c",
    };

    simNodes.forEach((n, i) => {
      const ang = (i / simNodes.length) * Math.PI * 2;
      n.x = Math.cos(ang) * 280 + (i % 2 ? 20 : -20);
      n.y = Math.sin(ang) * 150;
      n.vx = 0;
      n.vy = 0;
      n.fx = null;
      n.fy = null;
    });

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const simulation = forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((l) =>
            l.source.kind === "project" || l.target.kind === "project" ? 150 : 104,
          )
          .strength(0.42),
      )
      .force("charge", forceManyBody<SimNode>().strength(-340).distanceMax(520))
      .force("collide", forceCollide<SimNode>((d) => radiusFor(d) + 18))
      .force("x", forceX<SimNode>(0).strength(0.028))
      .force("y", forceY<SimNode>(0).strength(0.1))
      .force("center", forceCenter(0, 0).strength(0.04))
      .alpha(1)
      .alphaDecay(reduced ? 0.25 : 0.028);
    sim.current = simulation;

    const fit = () => {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      if (!W || !H) return;
      const top =
        (wrap.querySelector<HTMLElement>(".graph__hud-top")?.offsetHeight ?? 44) +
        18;
      const bottom = W < 560 ? 30 : 52;
      const side = W < 560 ? 46 : 96;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const n of simNodes) {
        const r = radiusFor(n);
        minX = Math.min(minX, n.x - r);
        maxX = Math.max(maxX, n.x + r);
        minY = Math.min(minY, n.y - r);
        maxY = Math.max(maxY, n.y + r + 24);
      }
      const bw = Math.max(maxX - minX, 1);
      const bh = Math.max(maxY - minY, 1);
      const availW = Math.max(W - side * 2, 60);
      const availH = Math.max(H - top - bottom, 60);
      // На узком экране не уменьшаем сильнее порога — граф становится
      // поверхностью для перетаскивания, лишнее просто уходит за край.
      const minK = W < 560 ? 0.52 : 0.34;
      const k = Math.max(
        Math.min(availW / bw, availH / bh, 1.3),
        minK,
      );
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      view.current = {
        k,
        x: W / 2 - cx * k,
        y: top + availH * 0.46 - cy * k,
      };
    };
    fitRef.current = fit;

    simulation.on("tick", () => {
      if (!interacted.current) fit();
      draw();
    });
    simulation.on("end", () => {
      if (!interacted.current) fit();
      draw();
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, canvas.clientWidth * dpr);
      canvas.height = Math.max(1, canvas.clientHeight * dpr);
      if (!interacted.current) fit();
      draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    return () => {
      simulation.stop();
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simNodes, simLinks]);

  useEffect(() => {
    draw();
  }, [highlight, activeKinds, draw]);

  const reheat = (target = 0.2) => {
    sim.current?.alphaTarget(target).restart();
  };
  const cool = () => sim.current?.alphaTarget(0);

  /* ---------- указатель ---------- */
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const rect = canvasRef.current!.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    pointerStart.current = { x: sx, y: sy, moved: false };
    const hit = nodeAt(sx, sy);
    if (hit) {
      dragNode.current = hit;
      hit.fx = hit.x;
      hit.fy = hit.y;
      reheat(0.15);
    } else {
      panning.current = true;
      setHint(false);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const st = pointerStart.current;
    if (Math.hypot(sx - st.x, sy - st.y) > 4) st.moved = true;
    tooltipPos.current = {
      x: sx,
      y: sy,
      flip: sx > rect.width - 290,
    };

    if (dragNode.current) {
      interacted.current = true;
      const w = toWorld(sx, sy);
      dragNode.current.fx = w.x;
      dragNode.current.fy = w.y;
      draw();
      return;
    }
    if (panning.current) {
      interacted.current = true;
      view.current = {
        ...view.current,
        x: view.current.x + e.movementX,
        y: view.current.y + e.movementY,
      };
      draw();
      return;
    }
    const hit = nodeAt(sx, sy);
    if ((hit?.id ?? null) !== hoverId.current) {
      hoverId.current = hit?.id ?? null;
      setHoverNode(hit ?? null);
      canvasRef.current!.style.cursor = hit
        ? hit.caseId
          ? "pointer"
          : "grab"
        : "default";
      draw();
    } else if (hit) {
      bump((n) => n + 1);
    }
  };

  const endPointer = (e: React.PointerEvent) => {
    const st = pointerStart.current;
    const wasNode = dragNode.current;
    if (wasNode) {
      if (!st.moved) {
        if (wasNode.caseId) onOpenCase(wasNode.caseId);
        else setPinnedId((p) => (p === wasNode.id ? null : wasNode.id));
      }
      wasNode.fx = null;
      wasNode.fy = null;
      cool();
    } else if (panning.current && !st.moved) {
      setPinnedId(null);
    }
    dragNode.current = null;
    panning.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    interacted.current = true;
    setHint(false);
    const rect = canvasRef.current!.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const v = view.current;
    const factor = Math.exp(-e.deltaY * 0.0016);
    const k = Math.min(Math.max(v.k * factor, 0.3), 3);
    view.current = {
      k,
      x: sx - (sx - v.x) * (k / v.k),
      y: sy - (sy - v.y) * (k / v.k),
    };
    draw();
  };

  const resetView = () => {
    interacted.current = false;
    setPinnedId(null);
    simNodes.forEach((n) => {
      n.fx = null;
      n.fy = null;
    });
    sim.current?.alpha(0.9).restart();
    fitRef.current();
    draw();
  };

  const toggleKind = (kind: NodeKind) => {
    setActiveKinds((prev) => {
      const next = new Set(prev);
      next.has(kind) ? next.delete(kind) : next.add(kind);
      return next.size === 0 ? prev : next;
    });
  };

  const tipNode =
    (pinnedId && simNodes.find((n) => n.id === pinnedId)) || hoverNode;

  return (
    <div className="graph hud" ref={wrapRef}>
      <canvas
        ref={canvasRef}
        className="graph__canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onPointerLeave={() => {
          if (!dragNode.current && !panning.current) {
            hoverId.current = null;
            setHoverNode(null);
            draw();
          }
        }}
        onWheel={onWheel}
      />

      <div className="graph__hud-top">
        <div className="graph__legend">
          <span className="graph__legend-title mono">СЛОИ</span>
          {KIND_ORDER.map((kind) => (
            <button
              key={kind}
              className={`graph__chip ${activeKinds.has(kind) ? "is-on" : ""}`}
              style={{ ["--c" as string]: `var(--kind-${kind})` }}
              onClick={() => toggleKind(kind)}
            >
              <span className="graph__chip-dot" />
              {KIND_LABEL[kind]}
            </button>
          ))}
          <button
            className="graph__tool"
            onClick={resetView}
            title="Пересобрать граф"
          >
            <span aria-hidden="true">⟳</span>
            <span className="graph__tool-text">пересобрать</span>
          </button>
        </div>
      </div>

      {hint && (
        <div className="graph__hint mono">
          тащи узлы · колесо — зум · клик по проекту открывает кейс
        </div>
      )}

      {tipNode && (
        <div
          className={`graph__tip ${tooltipPos.current.flip ? "is-flip" : ""}`}
          style={{ left: tooltipPos.current.x, top: tooltipPos.current.y }}
        >
          <div
            className="graph__tip-kind"
            style={{ color: `var(--kind-${tipNode.kind})` }}
          >
            {KIND_LABEL[tipNode.kind]}
          </div>
          <div className="graph__tip-label">{tipNode.label}</div>
          {tipNode.metric && (
            <div className="graph__tip-metric mono">{tipNode.metric}</div>
          )}
          {tipNode.summary && (
            <p className="graph__tip-summary">{tipNode.summary}</p>
          )}
          <div
            className={`graph__tip-cta mono ${
              tipNode.caseId ? "" : "graph__tip-cta--muted"
            }`}
          >
            {tipNode.caseId
              ? "открыть кейс →"
              : pinnedId === tipNode.id
                ? "клик — снять выделение"
                : "клик — выделить связи"}
          </div>
        </div>
      )}

      <div className="graph__links-legend mono">
        {(Object.keys(LINK_LABEL) as (keyof typeof LINK_LABEL)[]).map((kk) => (
          <span key={kk}>
            <i data-kind={kk} /> {LINK_LABEL[kk]}
          </span>
        ))}
      </div>
    </div>
  );
}
