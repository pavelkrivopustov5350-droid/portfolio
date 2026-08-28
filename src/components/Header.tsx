import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollLock } from "../hooks/useScrollLock";
import "./Header.css";

const NAV = [
  { href: "#cases", label: "Cases" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
const IDS = NAV.map((n) => n.href.slice(1));

export default function Header({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
    <header className={`hdr ${scrolled ? "hdr--solid" : ""}`}>
      <div className="hdr__inner container">
        <a href="#top" className="hdr__brand" onClick={() => setOpen(false)}>
          <span className="hdr__mark" aria-hidden="true" />
          <span className="hdr__name">{name}</span>
        </a>

        <nav className="hdr__nav" aria-label="Разделы">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`hdr__link ${
                active === n.href.slice(1) ? "is-active" : ""
              } ${n.label === "Contact" ? "hdr__link--cta" : ""}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          className={`hdr__burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>

    <div
      className={`hdr__sheet ${open ? "is-open" : ""}`}
      onClick={() => setOpen(false)}
    >
      <nav className="hdr__sheet-nav" aria-label="Разделы">
        {NAV.map((n, i) => (
          <a
            key={n.href}
            href={n.href}
            style={{ transitionDelay: `${open ? 60 + i * 45 : 0}ms` }}
            onClick={() => setOpen(false)}
          >
            <span className="tech">{String(i + 1).padStart(2, "0")}</span>
            {n.label}
          </a>
        ))}
      </nav>
    </div>
    </>
  );
}
