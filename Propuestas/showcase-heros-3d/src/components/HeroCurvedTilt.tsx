import React, { useState, useRef } from "react";
import { DESTINATIONS_HERO, type DestinationHero } from "../data";
import { 
  Sparkles, 
  ArrowUpRight, 
  MapPin, 
  Calendar, 
  Plane, 
  Compass,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Individual Card with 3D Tilt & Specular Lighting
function TiltCard({ dest, isActive, onSelect }: { dest: DestinationHero; isActive: boolean; onSelect: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [light, setLight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalizing between -1 and 1
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 16; // Max 16 deg tilt
    const rotateY = ((x - centerX) / centerX) * 16;

    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setLight({ x: lightX, y: lightY, opacity: 0.45 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setLight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative shrink-0 w-[290px] sm:w-[340px] lg:w-[380px] h-[520px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive 
          ? "ring-2 ring-white/60 scale-[1.03] shadow-[0_20px_60px_rgba(0,0,0,0.8)]" 
          : "hover:scale-[1.02] shadow-2xl opacity-85 hover:opacity-100"
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out, scale 0.3s ease-out, opacity 0.3s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Destination Image with Parallax Depth */}
      <img
        src={dest.image}
        alt={dest.title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-105 hover:scale-110 select-none bg-slate-900"
        draggable={false}
      />

      {/* Dynamic Specular Light Glare Follower */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle 280px at ${light.x}% ${light.y}%, rgba(255,255,255,0.35), transparent 70%)`,
          opacity: light.opacity,
        }}
      />

      {/* Cinematic Dark Shading */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-transparent z-10" />

      {/* Top Floating Badge */}
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-20">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] font-extrabold uppercase tracking-widest text-white">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{dest.country}</span>
        </div>
        <span className="text-[10px] font-bold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-200 border border-white/10">
          {dest.duration}
        </span>
      </div>

      {/* Center 3D Floating Tag (appears when active or hovered) */}
      <div 
        className="absolute top-1/2 left-6 right-6 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ transform: "translateZ(30px)" }}
      >
        <span 
          className="inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg text-white shadow-xl"
          style={{ backgroundColor: dest.accentColor }}
        >
          {dest.tag}
        </span>
      </div>

      {/* Bottom Content with 3D Depth */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end text-left"
        style={{ transform: "translateZ(20px)" }}
      >
        <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
          {dest.category}
        </p>
        <h3 className="text-xl font-bold font-serif text-white leading-tight mb-2">
          {dest.title}
        </h3>
        <p className="text-xs text-slate-300/90 line-clamp-2 mb-4">
          {dest.description}
        </p>

        {/* Pricing bar */}
        <div className="flex items-center justify-between pt-3 border-t border-white/15">
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Tarifa Mayorista</span>
            <span className="text-2xl font-black text-white">
              {dest.price} <span className="text-sm font-semibold text-amber-400">€</span>
            </span>
          </div>

          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-950 font-bold transition-transform hover:scale-110 shadow-lg"
            style={{ backgroundColor: dest.accentColor }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroCurvedTilt() {
  const [selectedId, setSelectedId] = useState(DESTINATIONS_HERO[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedDest = DESTINATIONS_HERO.find((d) => d.id === selectedId) || DESTINATIONS_HERO[0];

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = direction === "left" ? -380 : 380;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-[86vh] flex flex-col justify-between overflow-hidden bg-[#070b14] text-white select-none">
      
      {/* Ambient background with subtle color shift */}
      <div 
        className="absolute inset-0 opacity-25 blur-[120px] transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${selectedDest.accentColor}, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#070b14_0%,transparent_80%)] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-slate-300">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>OPCIÓN 2: HORIZONTAL CURVED PARALLAX CON 3D TILT AL RATÓN</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Mueve el cursor sobre cada tarjeta: rota en 3D en tiempo real con luz especular reactiva
          </p>
        </div>

        {/* Quick Country Pills */}
        <div className="flex flex-wrap gap-2">
          {DESTINATIONS_HERO.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedId(dest.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedId === dest.id
                  ? "bg-white text-slate-950 shadow-lg scale-105"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {dest.country}
            </button>
          ))}
        </div>
      </div>

      {/* HORIZONTAL 3D GALLERY TRACK */}
      <div className="relative z-20 w-full py-6">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-6 overflow-x-auto px-6 sm:px-12 py-6 scrollbar-none scroll-smooth"
          style={{ perspective: "1400px" }}
        >
          {DESTINATIONS_HERO.map((dest) => (
            <TiltCard
              key={dest.id}
              dest={dest}
              isActive={selectedId === dest.id}
              onSelect={() => setSelectedId(dest.id)}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM CONTROLS & DETAILS */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-4">
        
        {/* Selected circuit summary */}
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: selectedDest.accentColor }} 
          />
          <span className="text-xs text-slate-300">
            Destino Seleccionado: <strong className="text-white">{selectedDest.title}</strong> ({selectedDest.flights})
          </span>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Desplazar izquierda"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Desplazar derecha"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
}
