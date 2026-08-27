import { useMemo } from "react";
import { portfolio } from "./data";
import { useHashRoute } from "./hooks/useHashRoute";
import { useReveal } from "./hooks/useReveal";
import Backdrop from "./components/Backdrop";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CaseIndex from "./components/CaseIndex";
import CasePanel from "./components/CasePanel";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const { profile, cases } = portfolio;
  const { route, openCase, closeCase } = useHashRoute();
  useReveal();

  const activeCase = useMemo(
    () => cases.find((c) => c.id === route.caseId) ?? null,
    [cases, route.caseId],
  );

  return (
    <>
      <Backdrop />
      <Nav name={profile.name} />

      <main>
        <Hero profile={profile} />

        <section className="section cases-section" id="cases">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Кейсы</p>
              <h2>Разборы проектов</h2>
              <p>
                Контекст, задача, что сделал и что из этого вышло — по каждой
                роли.
              </p>
            </div>
            <CaseIndex cases={cases} onOpen={openCase} />
          </div>
        </section>

        <About profile={profile} />
        <Timeline profile={profile} />
        <Contact profile={profile} />
      </main>

      <Footer name={profile.name} />

      <CasePanel
        study={activeCase}
        allCases={cases}
        onClose={closeCase}
        onOpenRelated={openCase}
      />
    </>
  );
}
