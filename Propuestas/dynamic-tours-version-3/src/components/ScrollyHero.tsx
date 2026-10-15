import React from "react";
import { ChevronDown, ShieldCheck, Sparkles, Plane, Compass, Award } from "lucide-react";

interface ScrollyHeroProps {
  onStartJourney: () => void;
}

export default function ScrollyHero({ onStartJourney }: ScrollyHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center text-center overflow-hidden bg-[#050811] text-white pt-28 pb-12 px-6">
      
      {/* 1. CINEMATIC LUXURY AMBIENT BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=2400&q=85" 
          alt="Gran Viaje Dynamic Tours"
          className="w-full h-full object-cover opacity-35 scale-105 animate-pulse"
          style={{ animationDuration: "14s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050811] via-[#050811]/70 to-[#050811]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,130,210,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.12)_0%,transparent_60%)] pointer-events-none" />
      </div>

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40 z-10" />

      {/* 2. CENTER STAGE HEADLINE */}
      <div className="relative z-20 max-w-5xl mx-auto my-auto space-y-8">
        
        {/* Editorial Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
          <span>EXPERIENCIA SCROLLYTELLING • TEMPORADA 2026 / 2027</span>
        </div>

        {/* Monumental Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif tracking-tight leading-[1.08] text-white">
            Diseñando Viajes. <br />
            <span className="bg-gradient-to-r from-[#1F82D2] via-[#D4AF37] to-[#76ca2a] bg-clip-text text-transparent">
              Respaldando Agencias.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            El gran viaje no comienza al subir a la escalerilla del avión. Comienza cuando el agente de viajes y el turoperador crean juntos algo irrepetible.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
          <button
            onClick={onStartJourney}
            className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-black text-xs uppercase tracking-widest py-4 px-8 rounded-2xl transition-all shadow-[0_10px_30px_rgba(31,130,210,0.3)] hover:scale-105 flex items-center gap-2.5 cursor-pointer border border-white/20"
          >
            <Compass className="w-4 h-4" />
            <span>Iniciar la Expedición</span>
          </button>

          <a
            href="#catalogo-completo"
            className="glass-panel hover:bg-white/10 text-slate-200 font-bold text-xs uppercase tracking-widest py-4 px-7 rounded-2xl transition-all flex items-center gap-2"
          >
            <span>Ir al Catálogo Rápido</span>
          </a>
        </div>

        {/* 4 Pillar Metrics Bar */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-2xl sm:text-3xl font-black text-white font-sans block">30+</span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400 tracking-wider">Años de Liderazgo</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#D4AF37] font-sans block">100%</span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400 tracking-wider">Exclusivo Agencias B2B</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#1F82D2] font-sans block">Chárter</span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400 tracking-wider">Operación Propia</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans block">24/7</span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-slate-400 tracking-wider">Garantía In Situ</span>
          </div>
        </div>

      </div>

      {/* 3. SCROLL DOWN INDICATOR */}
      <div 
        onClick={onStartJourney} 
        className="relative z-20 flex flex-col items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer pt-6 animate-bounce"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Desliza para comenzar</span>
        <div className="p-2 rounded-full glass-panel">
          <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
        </div>
      </div>

    </section>
  );
}
