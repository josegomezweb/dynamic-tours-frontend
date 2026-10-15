import React, { useState } from "react";
import { CHAPTERS, type Chapter } from "../data";
import { Search, Calendar, Plane, Building2, ArrowRight, Download, Filter } from "lucide-react";

interface ScrollyCatalogProps {
  onSelectChapter: (chapter: Chapter) => void;
}

export default function ScrollyCatalog({ onSelectChapter }: ScrollyCatalogProps) {
  const [filterCountry, setFilterCountry] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = CHAPTERS.filter((c) => {
    if (filterCountry !== "todos" && c.country.toLowerCase() !== filterCountry.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return c.title.toLowerCase().includes(q) || c.country.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section id="catalogo-completo" className="relative min-h-screen py-24 px-4 sm:px-8 bg-[#03060e] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10 text-left">
          <div>
            <span className="text-xs font-black tracking-widest text-[#D4AF37] uppercase block mb-1">
              PORTAFOLIO OFICIAL 2026 / 2027
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
              Catálogo de Grandes Viajes
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
              Todos los programas con cupos confirmados y vuelos directos chárter garantizados
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 glass-panel px-4 py-2 rounded-2xl">
            <span>Mostrando <strong className="text-white">{filtered.length}</strong> expedientes activos</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {["todos", "Egipto", "Uzbekistán", "Japón", "Turquía"].map((country) => (
              <button
                key={country}
                onClick={() => setFilterCountry(country)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterCountry === country
                    ? "bg-[#1F82D2] text-white shadow-lg"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                {country === "todos" ? "Todos los Países" : country}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Buscar por destino o título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#1F82D2]"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="rounded-3xl overflow-hidden glass-panel border border-white/15 hover:border-white/35 transition-all flex flex-col justify-between group text-left shadow-xl"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.bgImage} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span 
                    className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white shadow-md"
                    style={{ backgroundColor: item.accentColor }}
                  >
                    {item.country}
                  </span>
                  <span className="text-[10px] font-bold bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-200 border border-white/10">
                    {item.duration}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[9px] uppercase font-bold text-amber-300 block">{item.badge}</span>
                  <h4 className="text-base font-bold font-serif leading-snug truncate">{item.title}</h4>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-300 font-light line-clamp-2">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="space-y-1.5 text-[11px] text-slate-400 bg-black/30 p-2.5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5 truncate">
                    <Plane className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="truncate">{item.flights}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{item.hotels}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Mayorista Desde</span>
                    <span className="text-2xl font-black text-white font-sans">
                      {item.price} <span className="text-xs text-amber-400">€</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectChapter(item)}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 cursor-pointer"
                    aria-label="Ver ficha del circuito"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
