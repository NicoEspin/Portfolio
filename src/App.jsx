import StarsCanvas from "./components/bg/Stars";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import { Navbar } from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ChatWidget } from "./components/ChatWidget";

function App() {
  return (
    <div className="overflow-hidden">
      <StarsCanvas />
      <Navbar />
      <ChatWidget />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
