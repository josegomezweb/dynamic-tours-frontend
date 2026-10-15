import React, { useState } from "react";
import HeroRealGlobe3D from "./components/HeroRealGlobe3D";
import HeroDepthStack from "./components/HeroDepthStack";
import HeroCurvedTilt from "./components/HeroCurvedTilt";
import HeroFusionB2B from "./components/HeroFusionB2B";
import { 
  Globe2,
  Layers, 
  Sparkles, 
  Compass, 
  FileText, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight,
  Award
} from "lucide-react";

type HeroOption = "globe-3d" | "depth-stack" | "curved-tilt" | "fusion-b2b";

export default function App() {
  const [currentOption, setCurrentOption] = useState<HeroOption>("globe-3d");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-[#1F82D2] selection:text-white">
      
      {/* ========================================================================= */}
      {/* TOP CONTROLLER BAR: SWITCH BETWEEN THE CONCEPTS                           */}
      {/* ========================================================================= */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Brand & Context */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#1F82D2] to-[#52A72B] flex items-center justify-center font-black text-white text-sm shadow-md">
              DT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide text-white font-sans">
                  DYNAMIC TOURS
                </span>
                <span className="text-[10px] bg-blue-500/20 text-sky-300 font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                  3D ENGINE LAB
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Comparador de Experiencias 3D para la Presentación
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-black/50 rounded-2xl border border-white/10 text-xs font-bold overflow-x-auto max-w-full">
            
            <button
              onClick={() => setCurrentOption("globe-3d")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                currentOption === "globe-3d"
                  ? "bg-gradient-to-r from-[#1F82D2] to-[#0ea5e9] text-white shadow-xl scale-105"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Globe2 className="w-4 h-4 text-sky-300 animate-spin" style={{ animationDuration: "14s" }} />
              <span>★ Globo Terráqueo 3D Real (WebGL)</span>
            </button>

            <button
              onClick={() => setCurrentOption("depth-stack")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                currentOption === "depth-stack"
                  ? "bg-[#1F82D2] text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Pila Depth 3D</span>
            </button>

            <button
              onClick={() => setCurrentOption("curved-tilt")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                currentOption === "curved-tilt"
                  ? "bg-[#1F82D2] text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Curved Arc & Tilt</span>
            </button>

            <button
              onClick={() => setCurrentOption("fusion-b2b")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                currentOption === "fusion-b2b"
                  ? "bg-[#52A72B] text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Fusión B2B</span>
            </button>

          </div>

          {/* Argumentario Modal Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-md"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Guía para la Reunión</span>
            </button>
          </div>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* ACTIVE HERO VIEW RENDER                                                   */}
      {/* ========================================================================= */}
      <main className="flex-1 relative">
        {currentOption === "globe-3d" && <HeroRealGlobe3D />}
        {currentOption === "depth-stack" && <HeroDepthStack />}
        {currentOption === "curved-tilt" && <HeroCurvedTilt />}
        {currentOption === "fusion-b2b" && <HeroFusionB2B />}
      </main>

      {/* ========================================================================= */}
      {/* FOOTER BAR WITH COMPARATIVE LINKS                                         */}
      {/* ========================================================================= */}
      <footer className="bg-slate-900 border-t border-white/10 px-6 py-3.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span>Comparar con las otras propuestas:</span>
            <a 
              href="http://localhost:3001" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#1F82D2] hover:underline flex items-center gap-1 font-semibold"
            >
              Propuesta 1 (Puerto 3001) <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">•</span>
            <a 
              href="http://localhost:3002" 
              target="_blank" 
              rel="noreferrer" 
              className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Propuesta 2 (Puerto 3002) <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <span className="text-[11px] text-slate-500">
            Showcase creado para evaluación técnica de Dynamic Tours
          </span>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* EXECUTIVE MODAL: GUÍA Y ARGUMENTARIO PARA LA REUNIÓN DE MAÑANA            */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white">
                  Guía Ejecutiva para la Reunión de Mañana
                </h3>
                <p className="text-xs text-slate-400">
                  Por qué este 3D WebGL real es el estándar que deja atrás a toda la competencia
                </p>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="space-y-5 text-left text-xs">
              
              {/* Globe 3D Pitch */}
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-sky-300 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4" />
                    Globo Terráqueo 3D WebGL (Three.js) — ¡La Estrella!
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 font-bold text-[10px]">
                    Verdadero 3D de GPU
                  </span>
                </div>
                <p className="text-slate-300">
                  <strong>Argumento de venta:</strong> <em>«No son tarjetas 2D giradas con CSS. Es un planeta Tierra 3D interactivo real que el usuario puede orbitar en 360°, con arcos de vuelo luminosos que despegan desde Madrid y aterrizan en los destinos clave de Dynamic Tours (Egipto, Japón, Uzbekistán, Turquía, Tailandia). Transmite inmediatamente que Dynamic Tours conecta el mundo al más alto nivel tecnológico.»</em>
                </p>
                <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Efecto WOW inmediato: ningún turoperador en España tiene esto en su portada.
                </div>
              </div>

              {/* Other Options Pitch */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-extrabold text-sm text-slate-200">
                  ¿Y si prefieren ver fotos de gran formato en lugar del globo?
                </span>
                <p className="text-slate-300">
                  Tienes las pestañas <strong>Pila Depth 3D</strong> y <strong>Fusión B2B</strong>, donde la fotografía de lujo es la protagonista absoluta acompañada de ficha técnica y cotizador directo.
                </p>
              </div>

            </div>

            {/* Close CTA */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-200"
              >
                Cerrar y Ver en Directo
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
