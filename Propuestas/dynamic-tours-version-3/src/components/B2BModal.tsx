import React, { useState } from "react";
import { X, Building2, ShieldCheck, TrendingUp, Globe, Download, Sparkles, CheckCircle2, UserCheck, Lock } from "lucide-react";
import { CHAPTERS } from "../data";

interface B2BModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function B2BModal({ isOpen, onClose }: B2BModalProps) {
  const [agencyName, setAgencyName] = useState("DTprueba (Agencia Demostración)");
  const [activeTab, setActiveTab] = useState<"dashboard" | "itinerarios" | "personalizacion">("dashboard");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#0b101e] border border-white/20 rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative text-white my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10 text-left">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#1F82D2] to-[#52A72B] flex items-center justify-center text-white shadow-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sesión B2B Autorizada
                </span>
                <span className="text-xs text-slate-400">ID: CICMA-1948</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                Consola Profesional de Agencias
              </h3>
              <p className="text-xs text-slate-400">
                Agencia Activa: <strong className="text-slate-200">{agencyName}</strong>
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-bold">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "dashboard" ? "bg-[#1F82D2] text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("itinerarios")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "itinerarios" ? "bg-[#1F82D2] text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Cupos 2026
            </button>
            <button
              onClick={() => setActiveTab("personalizacion")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "personalizacion" ? "bg-[#52A72B] text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Marca Blanca
            </button>
          </div>
        </div>

        {/* CONTENT TABS */}
        <div className="py-6 text-left space-y-6">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl glass-panel">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Expedientes en Vigor</span>
                  <span className="text-3xl font-black text-white font-sans">14</span>
                  <span className="text-[11px] text-emerald-400 block mt-1">✦ 100% Salidas Confirmadas</span>
                </div>

                <div className="p-4 rounded-2xl glass-panel">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Comisión Acumulada Mes</span>
                  <span className="text-3xl font-black text-[#D4AF37] font-sans">4.820 €</span>
                  <span className="text-[11px] text-slate-300 block mt-1">Margen medio protegido: 14.5%</span>
                </div>

                <div className="p-4 rounded-2xl glass-panel">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Dossiers Generados con IA</span>
                  <span className="text-3xl font-black text-sky-400 font-sans">38</span>
                  <span className="text-[11px] text-slate-300 block mt-1">Formato PDF descargado</span>
                </div>
              </div>

              {/* Active Bookings Simulation */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Últimas Reservas de tu Agencia:
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <strong className="text-white">BK-9481 • Leyendas de Egipto & Crucero Nilo (2 Pax)</strong>
                      <span className="text-slate-400 block">Salida: 18 Octubre 2026 • Chárter Madrid</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      Confirmado & Emitido
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <strong className="text-white">BK-9442 • Japón Imperial en Ryokan (4 Pax)</strong>
                      <span className="text-slate-400 block">Salida: 04 Noviembre 2026 • Qatar Airways</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold">
                      En Gestión de Visados
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CUPOS Y DISPONIBILIDAD */}
          {activeTab === "itinerarios" && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Consulta de Plazas Libres para Mayoristas:
              </h4>
              <div className="space-y-2.5">
                {CHAPTERS.map(ch => (
                  <div key={ch.id} className="p-4 rounded-xl glass-panel flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-amber-300 uppercase">{ch.country}</span>
                      <h5 className="text-sm font-bold text-white">{ch.title}</h5>
                      <span className="text-slate-400 block">{ch.flights} • {ch.duration}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarifa Neta</span>
                        <strong className="text-base text-white">{ch.price} €</strong>
                      </div>
                      <button 
                        onClick={() => alert("Cupo de 4 plazas bloqueado provisionalmente durante 48 horas sin coste.")}
                        className="bg-[#1F82D2] hover:bg-[#1a70b6] text-white px-3.5 py-2 rounded-lg font-bold text-xs cursor-pointer"
                      >
                        Bloquear 48h
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PERSONALIZACIÓN MARCA BLANCA */}
          {activeTab === "personalizacion" && (
            <div className="space-y-4 text-xs">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Configuración del Entorno de tu Agencia (Marca Blanca):
              </h4>
              <p className="text-slate-300 font-light">
                Puedes probar cómo el sistema oculta todos los datos de Dynamic Tours cuando muestras la pantalla a un cliente final sentado frente a tu mostrador:
              </p>

              <div className="max-w-md space-y-3">
                <label className="font-bold text-slate-300 block">Nombre de Agencia para Mostrar al Viajero:</label>
                <input 
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-semibold"
                />
                <button
                  onClick={() => alert("Entorno personalizado guardado. Toda la web mostrará '" + agencyName + "' en el pie y en los PDF generados.")}
                  className="bg-[#52A72B] hover:bg-[#469324] text-white font-bold py-2 px-4 rounded-xl text-xs cursor-pointer"
                >
                  Guardar Preferencias de Marca Blanca
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 cursor-pointer"
          >
            Volver a la Web Principal
          </button>
        </div>

      </div>
    </div>
  );
}
