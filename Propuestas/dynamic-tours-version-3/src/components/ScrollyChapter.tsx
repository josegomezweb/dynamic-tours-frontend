import React, { useState } from "react";
import { type Chapter } from "../data";
import { 
  Calendar, 
  Plane, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  FileText, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface ScrollyChapterProps {
  chapter: Chapter;
  onOpenQuote: (chapter: Chapter) => void;
}

export default function ScrollyChapter({ chapter, onOpenQuote }: ScrollyChapterProps) {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const currentStory = chapter.storyPoints[activeStoryIdx] || chapter.storyPoints[0];

  return (
    <section 
      id={chapter.id}
      className="relative min-h-screen py-20 px-4 sm:px-8 border-t border-white/10 bg-[#060914] text-white overflow-hidden"
    >
      {/* 1. DYNAMIC AMBIENT BACKDROP GLOW */}
      <div 
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: chapter.accentColor }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.4)_0%,rgba(6,9,20,0.95)_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* CHAPTER NUMBER & TITLE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span 
                className="text-xs font-black font-cinzel tracking-[0.3em] px-3 py-1 rounded-full uppercase"
                style={{ backgroundColor: `${chapter.accentColor}25`, color: chapter.accentColor, border: `1px solid ${chapter.accentColor}50` }}
              >
                Capítulo {chapter.number} • {chapter.country}
              </span>
              <span className="text-xs font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                {chapter.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              {chapter.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light mt-2 italic">
              {chapter.tagline}
            </p>
          </div>

          {/* Price & Booking Callout */}
          <div className="text-left md:text-right flex flex-col items-start md:items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400">Tarifa Neta Minorista</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-white font-sans">
                {chapter.price}
              </span>
              <span className="text-base font-bold" style={{ color: chapter.accentColor }}>€</span>
              <span className="text-xs text-slate-400 ml-1">/ persona</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full mt-1">
              Comisión de Agencia +14% Garantizada
            </span>
          </div>
        </div>

        {/* 2. SPLIT SCROLLY EXPERIENCE: LEFT (STORY NARRATIVE) + RIGHT (STICKY VISUAL STAGE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: NARRATIVE CHAPTER STORY (Scrollable) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Editorial Quote */}
            <blockquote className="p-5 rounded-2xl glass-panel-gold text-slate-200 text-sm font-serif italic border-l-4 leading-relaxed" style={{ borderLeftColor: chapter.accentColor }}>
              {chapter.heroQuote}
            </blockquote>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              {chapter.description}
            </p>

            {/* Circuit Specifications Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl glass-panel flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Duración</span>
                  <strong className="text-white font-semibold">{chapter.duration}</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl glass-panel flex items-center gap-2.5">
                <Plane className="w-4 h-4 text-sky-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Vuelos</span>
                  <strong className="text-white font-semibold truncate block">{chapter.flights}</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl glass-panel flex items-center gap-2.5 sm:col-span-2">
                <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Alojamiento de Firma</span>
                  <strong className="text-white font-semibold truncate block">{chapter.hotels}</strong>
                </div>
              </div>
            </div>

            {/* Interactive Story Progression Milestones */}
            <div className="space-y-4 pt-4">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 block">
                Itinerario de Autor (Selecciona o haz scroll para explorar)
              </span>

              {chapter.storyPoints.map((point, idx) => {
                const isActive = activeStoryIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStoryIdx(idx)}
                    className={`p-5 rounded-2xl transition-all cursor-pointer border text-left ${
                      isActive 
                        ? "glass-panel ring-2 ring-white/40 shadow-xl scale-[1.01]" 
                        : "bg-white/5 hover:bg-white/10 border-white/5 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-6 h-6 rounded-full flex items-center justify-center font-black text-xs text-slate-950"
                          style={{ backgroundColor: chapter.accentColor }}
                        >
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-white">
                          {point.title}
                        </h4>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90 text-white" : "text-slate-500"}`} />
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-light pl-8 mb-2 leading-relaxed">
                      {point.description}
                    </p>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-white/10 pl-8 text-[11px] font-semibold text-amber-300/90 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                        <span>{point.detail}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* B2B Agency Advantages Accordion / List */}
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-left space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Ventajas Blindadas para Agencias en este Circuito:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {chapter.b2bPerks.map((perk, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chapter Action Button */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuote(chapter)}
                className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl transition-all shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Cotizar este Viaje con Marca de tu Agencia</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* RIGHT: STICKY CINEMATIC VISUAL STAGE */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4">
            
            {/* Main Stage Image Frame */}
            <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/15 group">
              <img 
                src={currentStory.image} 
                alt={currentStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 select-none"
              />

              {/* Gradient Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent" />

              {/* Floating Story Badge */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                <span 
                  className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-white backdrop-blur-md shadow-lg"
                  style={{ backgroundColor: chapter.accentColor }}
                >
                  Punto de Itinerario 0{activeStoryIdx + 1} / 0{chapter.storyPoints.length}
                </span>

                <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {chapter.country}
                </span>
              </div>

              {/* Bottom Image Caption */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-panel text-left z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                  Enclave Destacado
                </span>
                <h4 className="text-base sm:text-lg font-bold font-serif text-white leading-tight">
                  {currentStory.title}
                </h4>
              </div>
            </div>

            {/* Thumbnail switcher underneath */}
            <div className="grid grid-cols-3 gap-3">
              {chapter.storyPoints.map((pt, sIdx) => (
                <div
                  key={sIdx}
                  onClick={() => setActiveStoryIdx(sIdx)}
                  className={`relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    activeStoryIdx === sIdx 
                      ? "border-white scale-105 shadow-lg" 
                      : "border-white/10 opacity-50 hover:opacity-80"
                  }`}
                >
                  <img 
                    src={pt.image} 
                    alt={pt.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-bold text-white truncate drop-shadow-md">
                    {pt.title}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
