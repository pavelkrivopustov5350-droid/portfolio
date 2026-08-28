import { useEffect, useRef } from "react";
import "./Backdrop.css";

/**
 * Очень сдержанный фон: редкие светящиеся точки, тонкие связи между
 * близкими. Никакого мерцания и развёрток. Замирает при reduced-motion.
 */
export default function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    type P = { x: number; y: number; vx: number; vy: number; z: number };
    let pts: P[] = [];

    const seed = () => {
      const n = Math.min(Math.round((w * h) / 46000), 46);
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        z: Math.random() * 0.6 + 0.4,
      }));
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - last, 60);
      last = now;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150) {
            const o = (1 - Math.sqrt(d2) / 150) * 0.08;
            ctx.strokeStyle = `rgba(120, 150, 220, ${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.z * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 165, 255, ${0.12 + p.z * 0.18})`;
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) frame(performance.now());
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="backdrop__canvas" />
    </div>
  );
}
