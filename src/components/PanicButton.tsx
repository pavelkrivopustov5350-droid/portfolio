import { useCallback, useEffect, useState } from "react";
import "./PanicButton.css";

const ERRORS = [
  "FATAL: reality.exe перестал отвечать",
  "ERR 0x8007007E: не найден здравый смысл",
  "panic: runtime error — index out of range [-1]",
  "SEGFAULT at 0xDEADBEEF · stack smashed",
  "WARN: пользователь проигнорировал инструкцию",
  "kernel: CPU#0 завис на 22s [rickroll:1337]",
  "core dumped → /dev/null",
  "CRITICAL: сбой поля сдерживания",
  "retry... retry... сдаёмся",
];

const VIDEO =
  "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1";

export default function PanicButton() {
  const [stage, setStage] = useState<"idle" | "crash" | "video">("idle");

  const close = useCallback(() => setStage("idle"), []);

  useEffect(() => {
    if (stage === "idle") return;
    document.body.classList.add("is-panicking");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-panicking");
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [stage, close]);

  useEffect(() => {
    if (stage !== "crash") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const t = setTimeout(() => setStage("video"), reduced ? 700 : 2500);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <>
      <div className="panic-cta">
        <button
          className="panic-btn"
          onClick={() => setStage("crash")}
          disabled={stage !== "idle"}
        >
          Не нажимать!
        </button>
      </div>

      {stage !== "idle" && (
        <div
          className={`panic ${
            stage === "crash" ? "panic--crash" : "panic--video"
          }`}
        >
          {stage === "video" && (
            <div className="panic__player">
              <button
                className="panic__close"
                onClick={close}
                aria-label="Закрыть"
              >
                ×
              </button>
              <div className="panic__frame">
                <iframe
                  src={VIDEO}
                  title="video"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {stage === "crash" && (
            <div className="panic__crash" aria-hidden="true">
              <div className="panic__scan" />
              <div className="panic__glitch" data-text="SYSTEM FAILURE">
                SYSTEM FAILURE
              </div>
              <div className="panic__sub">КРИТИЧЕСКАЯ ОШИБКА · 0xC0FFEE</div>
              <pre className="panic__log">
                {ERRORS.map((e, i) => (
                  <span key={i} style={{ animationDelay: `${180 + i * 190}ms` }}>
                    &gt; {e}
                  </span>
                ))}
              </pre>
            </div>
          )}
        </div>
      )}
    </>
  );
}
