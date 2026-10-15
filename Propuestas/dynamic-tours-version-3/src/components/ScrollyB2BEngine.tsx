import React, { useState } from "react";
import { B2B_PILLARS, CHAPTERS } from "../data";
import { 
  ShieldCheck, 
  Sparkles, 
  Plane, 
  PhoneCall, 
  Download, 
  FileCheck2, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Send,
  Zap,
  Building2
} from "lucide-react";

export default function ScrollyB2BEngine() {
  const [agencyName, setAgencyName] = useState("Viajes Horizonte");
  const [clientName, setClientName] = useState("Luna de Miel Carlos & Sofía");
  const [selectedDest, setSelectedDest] = useState(CHAPTERS[0].id);
  const [margin, setMargin] = useState(15);
  const [isGenerated, setIsGenerated] = useState(false);

  const dest = CHAPTERS.find(c => c.id === selectedDest) || CHAPTERS[0];
  const finalClientPrice = Math.round(dest.price * (1 + margin / 100));
  const agencyCommission = finalClientPrice - dest.price;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  return (
    <section id="motor-b2b" className="relative min-h-screen py-24 px-4 sm:px-8 bg-[#040711] text-white border-t border-white/10 overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#1F82D2]/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-20 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold tracking-widest text-emerald-400 uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>TECNOLOGÍA EXCLUSIVA PARA PROFESIONALES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            El Motor B2B que Potencia tu Agencia
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            Dynamic Tours nunca vende a clientes finales. Hemos desarrollado herramientas inteligentes para que cotices en segundos y entregues presupuestos de autor con la imagen de tu propia marca.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {B2B_PILLARS.map((pillar, pIdx) => (
            <div key={pIdx} className="p-6 rounded-2xl glass-panel text-left space-y-3 hover:border-white/25 transition-all">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#1F82D2] to-[#52A72B] flex items-center justify-center text-white shadow-md">
                {pillar.icon === "ShieldCheck" && <ShieldCheck className="w-5 h-5" />}
                {pillar.icon === "Plane" && <Plane className="w-5 h-5" />}
                {pillar.icon === "Sparkles" && <Sparkles className="w-5 h-5" />}
                {pillar.icon === "PhoneCall" && <PhoneCall className="w-5 h-5" />}
              </div>
              <h4 className="font-bold text-base text-white font-serif">{pillar.title}</h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* INTERACTIVE LIVE DEMO: INSTANT WHITE-LABEL QUOTER WITH AI */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Form Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] block mb-1">
                  Simulador en Vivo para la Reunión
                </span>
                <h3 className="text-2xl font-bold font-serif text-white">
                  Generador de Propuesta Marca Blanca con IA
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Personaliza los datos y observa cómo se genera en directo el dossier oficial para tu viajero.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Nombre de tu Agencia
                    </label>
                    <input 
                      type="text"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-semibold focus:outline-none focus:border-[#1F82D2]"
                      placeholder="Ej. Halcón Viajes Pozuelo"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Referencia / Cliente
                    </label>
                    <input 
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-semibold focus:outline-none focus:border-[#1F82D2]"
                      placeholder="Ej. Familia Sánchez"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Circuito Seleccionado
                    </label>
                    <select
                      value={selectedDest}
                      onChange={(e) => setSelectedDest(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-semibold focus:outline-none focus:border-[#1F82D2]"
                    >
                      {CHAPTERS.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.price} € neta)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Margen Agencia Aplicado (%): {margin}%
                    </label>
                    <input 
                      type="range"
                      min="10"
                      max="30"
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="w-full accent-[#1F82D2] mt-2 cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-bold py-3 px-6 rounded-xl uppercase tracking-wider text-xs transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generar Documento de Venta Inteligente</span>
                </button>
              </form>
            </div>

            {/* Generated Document Preview Column */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md p-6 rounded-2xl bg-white text-slate-900 shadow-2xl space-y-4 text-left border border-slate-200">
                
                {/* Document Header with Agency Brand */}
                <div className="flex justify-between items-start pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1F82D2] block">
                      Presupuesto Oficial Personalizado
                    </span>
                    <h4 className="text-lg font-black text-slate-900 font-serif">
                      {agencyName}
                    </h4>
                    <span className="text-[10px] text-slate-500">Agencia Asociada Autorizada</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full block mb-1">
                      Cupo Confirmado
                    </span>
                    <span className="text-[10px] text-slate-400">Ref: DT-2026-X8</span>
                  </div>
                </div>

                {/* Client Reference & Destination */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Expediente Preparado para:</span>
                  <p className="font-extrabold text-sm text-slate-800">{clientName}</p>
                </div>

                {/* Circuit Banner */}
                <div className="relative h-28 rounded-xl overflow-hidden shadow-inner">
                  <img 
                    src={dest.bgImage} 
                    alt={dest.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <span className="text-[9px] font-bold uppercase text-amber-300 block">{dest.country}</span>
                    <h5 className="text-xs font-bold truncate">{dest.title}</h5>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Duración:</span>
                    <strong className="text-slate-700">{dest.duration}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Vuelos:</span>
                    <strong className="text-slate-700 truncate block">{dest.flights}</strong>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="pt-2 border-t border-slate-200 flex items-end justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">PVP Recomendado Cliente</span>
                    <span className="text-2xl font-black text-[#0A0F1D] font-sans">
                      {finalClientPrice} <span className="text-sm font-semibold text-[#1F82D2]">€</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] font-bold uppercase text-emerald-600 block">
                      Beneficio Neto Agencia:
                    </span>
                    <span className="text-sm font-black text-emerald-600">
                      +{agencyCommission} € (+{margin}%)
                    </span>
                  </div>
                </div>

                {/* Download PDF Action */}
                <button
                  onClick={() => alert("¡Dossier PDF descargado con éxito con la cabecera de " + agencyName + " y sin logos visibles de Dynamic Tours!")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Descargar PDF Oficial con tu Marca</span>
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
