import "./Footer.css";

export default function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="mono">
          © {year} {name} · собрано вручную
        </span>
        <span className="mono footer__sys">
          SYS.STATUS: <b>ONLINE</b> · {year}.Q3
        </span>
        <a href="#top" className="mono footer__top">
          ↑ наверх
        </a>
      </div>
    </footer>
  );
}
