import { lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import { ChatWidget } from "./components/ChatWidget";
import { useGLTF } from "@react-three/drei";

// Componentes sin 3D — carga inmediata
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

// Componentes con Three.js — carga diferida para no bloquear el bundle inicial
const StarsCanvas = lazy(() => import("./components/bg/Stars"));
const Contact = lazy(() => import("./components/Contact"));

// Preload del modelo GLB cuando el navegador esté idle
// Lo descarga en segundo plano sin bloquear el hilo principal
if (typeof window !== "undefined") {
  const preload = () => useGLTF.preload("/models/moon.glb");
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preload);
  } else {
    // Fallback para Safari que no soporta requestIdleCallback
    setTimeout(preload, 2000);
  }
}

function App() {
  return (
    <div className="overflow-hidden">
      {/* Stars: visible de entrada pero con lazy import para no bloquear el JS inicial */}
      <Suspense fallback={null}>
        <StarsCanvas />
      </Suspense>

      <Navbar />
      <ChatWidget />
      <Hero />
      <Skills />
      <Experience />
      <Projects />

      {/* Contact contiene Moon — lazy import + lazy mount con IntersectionObserver */}
      <Suspense fallback={null}>
        <Contact />
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;