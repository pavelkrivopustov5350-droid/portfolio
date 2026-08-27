import { useEffect, useState } from "react";
import "./Nav.css";

const LINKS = [
  { href: "#graph", label: "Карта связей" },
  { href: "#cases", label: "Кейсы" },
  { href: "#about", label: "О себе" },
  { href: "#path", label: "Опыт" },
  { href: "#contact", label: "Контакты" },
];

export default function Nav({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#graph");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand">
          <span className="nav__brand-mark" aria-hidden="true" />
          <span className="nav__brand-text">
            {name}
            <span className="nav__brand-sub">PROJECT / GROWTH LEAD</span>
          </span>
        </a>
        <nav className="nav__links" aria-label="Разделы">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav__link ${active === l.href ? "is-active" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav__cta">
          Связаться
        </a>
      </div>
    </header>
  );
}
