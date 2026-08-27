import { useEffect, useRef } from "react";
import "./Backdrop.css";

/**
 * Живой фон: слабо дрейфующие частицы + горизонтальная «радар»-развёртка.
 * Рисуется на canvas позади всего контента, не перехватывает события.
 * Полностью замирает при prefers-reduced-motion.
 */
export default function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; z: number; vx: number; vy: number };
    let particles: P[] = [];

    function seed() {
      const count = Math.round((w * h) / 26000);
      particles = Array.from({ length: Math.min(count, 90) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.7 + 0.3,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
      }));
    }

    function resize() {
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    let sweep = 0;
    let raf = 0;
    let last = performance.now();

    function frame(now: number) {
      const dt = Math.min(now - last, 60);
      last = now;
      ctx!.clearRect(0, 0, w, h);

      // частицы
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        if (p.y > h + 4) p.y = -4;
        const r = p.z * 1.6;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(122, 208, 255, ${0.10 + p.z * 0.22})`;
        ctx!.fill();
      }

      // связи между близкими частицами
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const o = (1 - Math.sqrt(d2) / 130) * 0.12;
            ctx!.strokeStyle = `rgba(77, 225, 255, ${o})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // радар-развёртка сверху вниз
      if (!reduced) {
        sweep += dt * 0.02;
        if (sweep > h + 200) sweep = -200;
        const grd = ctx!.createLinearGradient(0, sweep - 160, 0, sweep);
        grd.addColorStop(0, "rgba(77, 225, 255, 0)");
        grd.addColorStop(1, "rgba(77, 225, 255, 0.05)");
        ctx!.fillStyle = grd;
        ctx!.fillRect(0, sweep - 160, w, 160);
        ctx!.strokeStyle = "rgba(77, 225, 255, 0.10)";
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(0, sweep);
        ctx!.lineTo(w, sweep);
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      // один статичный кадр
      frame(performance.now());
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__grid" />
      <canvas ref={canvasRef} className="backdrop__canvas" />
      <div className="backdrop__vignette" />
      <div className="backdrop__noise" />
    </div>
  );
}
