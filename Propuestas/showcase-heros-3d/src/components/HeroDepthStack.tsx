import React, { useState, useEffect, useRef } from "react";
import { DESTINATIONS_HERO, type DestinationHero } from "../data";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Plane, 
  Building, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Maximize2
} from "lucide-react";

export default function HeroDepthStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const dragStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const current = DESTINATIONS_HERO[currentIndex];
  const total = DESTINATIONS_HERO.length;

  // Auto advance timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, total]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Drag handlers
  const handleTouchStart = (clientX: number) => {
    setIsAutoPlay(false);
    dragStartX.current = clientX;
  };

  const handleTouchMove = (clientX: number) => {
    if (dragStartX.current === null) return;
    setDragOffset(clientX - dragStartX.current);
  };

  const handleTouchEnd = () => {
    if (dragStartX.current === null) return;
    if (dragOffset > 80) {
      handlePrev();
    } else if (dragOffset < -80) {
      handleNext();
    }
    dragStartX.current = null;
    setDragOffset(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-[86vh] flex flex-col justify-between overflow-hidden bg-slate-950 text-white select-none">
      
      {/* 1. DYNAMIC AMBIENT GLOW (Reacts to destination accent color) */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-40 pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: current.accentColor }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.6)_0%,rgba(2,6,23,0.95)_100%)] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      {/* 2. TOP HEADER BADGE & PITCH HIGHLIGHT */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-slate-300">
            <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: current.accentColor }} />
            <span>OPCIÓN 1: CINEMATIC DEPTH STACK (PILA 3D DE PROFUNDIDAD)</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Física de capas profundas, desenfoque de campo óptico y luz ambiental reactiva al destino
          </p>
        </div>

        {/* Agency guarantee pill */}
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Venta Exclusiva Agencias B2B (CICMA 1948)</span>
        </div>
      </div>

      {/* 3. 3D INTERACTIVE STACK STAGE */}
      <div 
        className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-4 flex items-center justify-center py-6 cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handleTouchStart(e.clientX)}
        onMouseMove={(e) => handleTouchMove(e.clientX)}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleTouchMove(e.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="relative w-full max-w-[840px] h-[480px] sm:h-[520px] flex items-center justify-center"
          style={{ perspective: "1600px" }}
        >
          {DESTINATIONS_HERO.map((dest, idx) => {
            // Calculate distance relative to current index
            let diff = idx - currentIndex;
            if (diff < -Math.floor(total / 2)) diff += total;
            if (diff > Math.floor(total / 2)) diff -= total;

            const isCenter = diff === 0;
            const isLeft = diff < 0;
            const isRight = diff > 0;
            const absDiff = Math.abs(diff);

            // Hide cards further than 2 positions away for optimal performance
            if (absDiff > 2) return null;

            // Compute 3D transforms
            const translateX = diff * (absDiff === 1 ? 260 : 380) + (isCenter ? dragOffset * 0.4 : 0);
            const translateZ = -absDiff * 140;
            const rotateY = diff * -18;
            const scale = 1 - absDiff * 0.12;
            const blur = absDiff * 3.5;
            const opacity = 1 - absDiff * 0.35;
            const zIndex = 30 - absDiff * 10;

            return (
              <div
                key={dest.id}
                onClick={() => {
                  if (!isCenter) {
                    setIsAutoPlay(false);
                    setCurrentIndex(idx);
                  }
                }}
                className={`absolute w-[320px] sm:w-[420px] md:w-[460px] h-[450px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out bg-slate-900 border border-white/15 ${
                  isCenter ? "ring-2 ring-white/50 shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-default" : "cursor-pointer hover:opacity-90"
                }`}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  filter: `blur(${blur}px)`,
                  opacity: opacity,
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Background Image with referrerPolicy */}
                <img 
                  src={dest.image} 
                  alt={dest.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  draggable={false}
                />

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />

                {/* Card Top Pill */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                  <span 
                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white shadow-lg backdrop-blur-md border border-white/20"
                    style={{ backgroundColor: `${dest.accentColor}cc` }}
                  >
                    {dest.country} • {dest.category}
                  </span>
                  <span className="text-[10px] font-bold bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-slate-200">
                    {dest.tag}
                  </span>
                </div>

                {/* Card Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 flex flex-col justify-end z-10 text-left">
                  <p className="text-xs font-semibold text-slate-300 mb-1 line-clamp-1">
                    {dest.subtitle}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white leading-tight mb-3">
                    {dest.title}
                  </h3>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 mb-4 bg-slate-900/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{dest.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{dest.flights}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <Building className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{dest.hotels}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Precio Mayorista Desde</span>
                      <span className="text-2xl font-black text-white font-sans">
                        {dest.price} <span className="text-sm font-semibold text-amber-400">{dest.currency}</span>
                      </span>
                    </div>
                    <button 
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 transition-all hover:scale-105 shadow-lg"
                      style={{ backgroundColor: dest.accentColor }}
                    >
                      <span>Ver Ficha</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CONTROLS & BOTTOM NAVIGATION */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Destino anterior"
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            {DESTINATIONS_HERO.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentIndex === i ? "w-7" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                style={{
                  backgroundColor: currentIndex === i ? current.accentColor : undefined,
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Siguiente destino"
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Play / Pause toggle */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="hidden sm:inline">Usa las flechas del teclado ← → o arrastra</span>
          <button 
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-medium"
          >
            {isAutoPlay ? "Pausar Giro Automático" : "Activar Auto"}
          </button>
        </div>

      </div>

    </div>
  );
}
