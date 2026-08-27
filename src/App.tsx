import { useMemo } from "react";
import { portfolio } from "./data";
import { useHashRoute } from "./hooks/useHashRoute";
import { useReveal } from "./hooks/useReveal";
import Backdrop from "./components/Backdrop";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import GraphView from "./components/GraphView/GraphView";
import CaseIndex from "./components/CaseIndex";
import CasePanel from "./components/CasePanel";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const { profile, cases, graph } = portfolio;
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

        <section className="section graph-section" id="graph">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Карта системы</p>
              <h2>Связи между проектами</h2>
              <p>
                Проекты, каналы, команды и результаты — и то, как они друг друга
                усиливают. Тащите узлы, включайте слои, нажмите на проект, чтобы
                открыть кейс.
              </p>
            </div>
          </div>
          <div className="container graph-section__stage reveal">
            <GraphView
              nodes={graph.nodes}
              links={graph.links}
              onOpenCase={openCase}
            />
          </div>
        </section>

        <section className="section cases-section" id="cases">
          <div className="container">
            <div className="section-head reveal">
              <p className="eyebrow">Кейсы</p>
              <h2>Разборы проектов</h2>
              <p>
                Контекст, задача, что сделал и что из этого вышло — с цифрами.
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
