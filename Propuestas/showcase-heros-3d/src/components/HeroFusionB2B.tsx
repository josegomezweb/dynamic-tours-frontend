import React, { useState, useRef } from "react";
import { DESTINATIONS_HERO, type DestinationHero } from "../data";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Building2, 
  Plane, 
  Sparkles, 
  Download, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal
} from "lucide-react";

export default function HeroFusionB2B() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filterDest, setFilterDest] = useState("todos");
  const [filterMonth, setFilterMonth] = useState("todos");
  const [filterType, setFilterType] = useState("todos");

  const current = DESTINATIONS_HERO[activeIndex];

  // 3D Card Hover Tilt
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setCardTilt({
      x: -((y - centerY) / centerY) * 12,
      y: ((x - centerX) / centerX) * 12,
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-slate-950 text-white select-none">
      
      {/* 1. CINEMATIC FULLSCREEN BACKGROUND WITH KEN BURNS */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {DESTINATIONS_HERO.map((dest, idx) => (
          <div
            key={dest.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={dest.image}
              alt={dest.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-[12000ms] ease-out ${
                idx === activeIndex ? "scale-110" : "scale-100"
              }`}
              draggable={false}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* 2. TOP BANNER */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>OPCIÓN 3: FUSIÓN TOTAL (HERO INMERSIVO + CARD FLOTANTE 3D + BUSCADOR B2B)</span>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-[#76ca2a]" />
          <span>Exclusivo para Profesionales del Viaje</span>
        </div>
      </div>

      {/* 3. CENTER HERO GRID: LEFT (TYPOGRAPHY) + RIGHT (3D FLOATING CARD) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* LEFT COLUMN: Editorial Presentation */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Destination Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {DESTINATIONS_HERO.map((dest, i) => (
              <button
                key={dest.id}
                onClick={() => setActiveIndex(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeIndex === i
                    ? "bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white shadow-lg scale-105"
                    : "bg-black/40 hover:bg-black/60 text-slate-300 border border-white/10"
                }`}
              >
                {dest.country}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <span 
              className="text-[11px] font-black uppercase tracking-[0.25em] block drop-shadow-md"
              style={{ color: current.accentColor }}
            >
              ✦ {current.category} • {current.tag}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif leading-[1.08] tracking-tight text-white drop-shadow-xl">
              {current.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200/90 font-light max-w-xl leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Key Circuit Highlights */}
          <div className="space-y-2">
            {current.highlights.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center gap-2">
              <span>Cotizar Circuito B2B</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-400" />
              <span>Descargar Folleto PDF</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: 3D GLASSMORPHIC FLOATING CARD */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="w-full max-w-[380px] rounded-3xl p-6 bg-slate-900/80 backdrop-blur-xl border border-white/20 shadow-2xl transition-transform duration-200 text-left"
            style={{
              transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Card Header */}
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Ficha Oficial</span>
                <span className="text-sm font-bold text-white">{current.country}</span>
              </div>
              <span 
                className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg text-white"
                style={{ backgroundColor: current.accentColor }}
              >
                Garantizado
              </span>
            </div>

            {/* Thumbnail preview */}
            <div className="relative my-4 h-36 rounded-2xl overflow-hidden border border-white/15 bg-slate-800">
              <img 
                src={current.image} 
                alt={current.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 text-xs font-semibold text-white truncate">
                {current.subtitle}
              </div>
            </div>

            {/* Specs List */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Duración:
                </span>
                <strong className="text-white font-semibold">{current.duration}</strong>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-sky-400" />
                  Vuelos:
                </span>
                <strong className="text-white font-semibold truncate max-w-[160px]">{current.flights}</strong>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  Hoteles:
                </span>
                <strong className="text-white font-semibold truncate max-w-[160px]">{current.hotels}</strong>
              </div>
            </div>

            {/* Price Footer */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarifa Neta Agencia</span>
                <span className="text-3xl font-black text-white">
                  {current.price} <span className="text-sm font-semibold text-amber-400">{current.currency}</span>
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Comisión +14%
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* 4. INTEGRATED B2B FINDER DOCK (At the bottom) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pb-8">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            
            {/* Filter 1: Destino */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Destino / País
              </label>
              <select 
                value={filterDest}
                onChange={(e) => setFilterDest(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#1F82D2]"
              >
                <option value="todos">Todos los destinos</option>
                <option value="egipto">Egipto y Nilo</option>
                <option value="japon">Japón Imperial</option>
                <option value="turquia">Turquía y Capadocia</option>
                <option value="uzbekistan">Uzbekistán Ruta de la Seda</option>
                <option value="tailandia">Tailandia</option>
                <option value="mar-rojo">Buceo Mar Rojo</option>
              </select>
            </div>

            {/* Filter 2: Mes */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Mes de Salida
              </label>
              <select 
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#1F82D2]"
              >
                <option value="todos">Cualquier mes</option>
                <option value="octubre">Octubre 2026</option>
                <option value="noviembre">Noviembre 2026</option>
                <option value="diciembre">Diciembre 2026</option>
                <option value="puente-diciembre">Puente de Diciembre</option>
                <option value="navidad">Navidad y Fin de Año</option>
                <option value="primavera">Primavera 2027</option>
              </select>
            </div>

            {/* Filter 3: Tipo de Viaje */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Modalidad
              </label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#1F82D2]"
              >
                <option value="todos">Cualquier modalidad</option>
                <option value="charter">Chárter Exclusivo</option>
                <option value="regular">Línea Regular</option>
                <option value="crucero">Crucero Fluvial</option>
                <option value="buceo">Buceo Vida a Bordo</option>
              </select>
            </div>

            {/* Filter 4: Aeropuerto Origen */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Origen Vuelo
              </label>
              <select className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#1F82D2]">
                <option>Madrid / Barcelona</option>
                <option>Salidas desde Provincias</option>
                <option>Zaragoza / Bilbao</option>
                <option>Valencia / Santiago</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="pt-2 sm:pt-4 lg:pt-0">
              <button className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                <span>Buscar (24)</span>
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
