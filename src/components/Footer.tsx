import "./Footer.css";

export default function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="tech">© {year} {name}</span>
        <span className="tech footer__mid">MARKETING · DATA · TECHNOLOGY</span>
        <a href="#top" className="tech footer__top">
          Наверх ↑
        </a>
      </div>
    </footer>
  );
}
