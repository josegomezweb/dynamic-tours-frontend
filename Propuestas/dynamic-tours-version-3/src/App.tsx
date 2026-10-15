import React, { useState, useEffect } from "react";
import ScrollyHeader from "./components/ScrollyHeader";
import ScrollyHero from "./components/ScrollyHero";
import ScrollyChapter from "./components/ScrollyChapter";
import ScrollyB2BEngine from "./components/ScrollyB2BEngine";
import ScrollyCatalog from "./components/ScrollyCatalog";
import B2BModal from "./components/B2BModal";
import { CHAPTERS, type Chapter } from "./data";
import { ExternalLink, ShieldCheck, Phone, Mail, Award, Compass, ArrowUp } from "lucide-react";

export default function App() {
  const [isB2BOpen, setIsB2BOpen] = useState(false);
  const [activeChapterTitle, setActiveChapterTitle] = useState("Prólogo");
  const [activeNavDot, setActiveNavDot] = useState("hero");

  // Track active chapter while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 350;

      if (scrollPos < 700) {
        setActiveChapterTitle("Prólogo");
        setActiveNavDot("hero");
        return;
      }

      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveChapterTitle(`${ch.number} • ${ch.country}`);
            setActiveNavDot(ch.id);
            return;
          }
        }
      }

      const b2bEl = document.getElementById("motor-b2b");
      if (b2bEl && scrollPos >= b2bEl.offsetTop) {
        setActiveChapterTitle("Tecnología B2B");
        setActiveNavDot("motor-b2b");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartJourney = () => {
    const firstCap = document.getElementById(CHAPTERS[0].id);
    if (firstCap) {
      firstCap.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuoteChapter = (chapter: Chapter) => {
    setIsB2BOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between selection:bg-[#1F82D2] selection:text-white relative">
      
      {/* 1. SCROLLYTELLING HEADER */}
      <ScrollyHeader 
        onOpenB2B={() => setIsB2BOpen(true)}
        activeChapter={activeChapterTitle}
      />

      {/* 2. FLOATING CHAPTER SIDEWAY DOCK (DESKTOP) */}
      <aside className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none">
        <div className="glass-panel p-2.5 rounded-2xl flex flex-col gap-2.5 pointer-events-auto shadow-2xl border border-white/10">
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`flex items-center gap-2 group cursor-pointer transition-all ${
              activeNavDot === "hero" ? "text-[#D4AF37]" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              00. Inicio
            </span>
            <span className={`w-2.5 h-2.5 rounded-full transition-all ${
              activeNavDot === "hero" ? "bg-[#D4AF37] scale-125" : "bg-white/30"
            }`} />
          </button>

          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                document.getElementById(ch.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`flex items-center gap-2 group cursor-pointer transition-all ${
                activeNavDot === ch.id ? "text-white font-bold" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {ch.number}. {ch.country}
              </span>
              <span 
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeNavDot === ch.id ? "scale-125" : "bg-white/30"
                }`}
                style={{ backgroundColor: activeNavDot === ch.id ? ch.accentColor : undefined }}
              />
            </button>
          ))}

          <button
            onClick={() => {
              document.getElementById("motor-b2b")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`flex items-center gap-2 group cursor-pointer transition-all ${
              activeNavDot === "motor-b2b" ? "text-emerald-400 font-bold" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Motor B2B
            </span>
            <span className={`w-2.5 h-2.5 rounded-full transition-all ${
              activeNavDot === "motor-b2b" ? "bg-emerald-400 scale-125" : "bg-white/30"
            }`} />
          </button>

        </div>
      </aside>

      {/* 3. SCROLLY SECTIONS */}
      <main className="flex-1">
        
        {/* Chapter 0: Hero Prologue */}
        <ScrollyHero onStartJourney={handleStartJourney} />

        {/* Chapters 1 to 4: The Journeys */}
        {CHAPTERS.map((chapter) => (
          <ScrollyChapter 
            key={chapter.id}
            chapter={chapter}
            onOpenQuote={handleQuoteChapter}
          />
        ))}

        {/* Chapter 5: The B2B Innovation Engine */}
        <ScrollyB2BEngine />

        {/* Chapter 6: Fast Catalog & Discovery */}
        <ScrollyCatalog onSelectChapter={handleQuoteChapter} />

      </main>

      {/* 4. FOOTER & CROSS-PROPOSAL NAVIGATION */}
      <footer className="bg-[#02040a] border-t border-white/10 py-12 px-6 text-slate-400 text-xs text-left">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#1F82D2] to-[#52A72B] flex items-center justify-center font-black text-white text-sm">
                  DT
                </div>
                <span className="font-extrabold text-base text-white tracking-wider font-sans">
                  DYNAMIC TOURS • PROPUESTA 3
                </span>
              </div>
              <p className="text-xs text-slate-400 font-light max-w-md leading-relaxed">
                Diseño editorial y scrollytelling de autor creado específicamente para transformar la presencia de Dynamic Tours en un referente internacional de lujo y tecnología mayorista.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Licencia Mayorista CICMA 1948 • Garantía de Responsabilidad Total</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-xs">Contacto Central B2B</h5>
              <p className="text-slate-400">Calle Orense 16, 2ª Planta, Madrid</p>
              <p className="text-slate-300 font-semibold">+34 915 521 443</p>
              <p className="text-slate-400">reservas@dynamic-tours.com</p>
              <p className="text-emerald-400 font-bold">Urgencias: +34 690 125 031</p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-xs">Comparar Propuestas</h5>
              <ul className="space-y-1.5">
                <li>
                  <a href="http://localhost:3001" target="_blank" rel="noreferrer" className="text-[#1F82D2] hover:underline flex items-center gap-1 font-semibold">
                    Propuesta 1 (Buscador Clásico) <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3002" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
                    Propuesta 2 (Carrusel 3D) <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3003" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline flex items-center gap-1 font-semibold">
                    Laboratorio 3D WebGL <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
            <span>© 2026 Dynamic Tours S.A. • Todos los derechos reservados. Venta exclusiva a través de agencias de viajes.</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Subir al inicio</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </footer>

      {/* 5. B2B INTRANET MODAL */}
      <B2BModal 
        isOpen={isB2BOpen}
        onClose={() => setIsB2BOpen(false)}
      />

    </div>
  );
}
