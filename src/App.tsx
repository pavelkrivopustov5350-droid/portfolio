import { profile, cases, experience } from "./data";
import { useReveal } from "./hooks/useReveal";
import Backdrop from "./components/Backdrop";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Cases from "./components/Cases";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Approach from "./components/Approach";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  useReveal();

  return (
    <>
      <Backdrop />
      <Header name={profile.name} />

      <main>
        <Hero profile={profile} />
        <Metrics metrics={profile.metrics} />
        <Cases cases={cases} />
        <Experience items={experience} />
        <Skills groups={profile.skills} />
        <Approach steps={profile.approach} />
        <Contact contacts={profile.contacts} />
      </main>

      <Footer name={profile.name} />
    </>
  );
}
