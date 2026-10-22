import React, { useState } from "react";
import { Lock, ArrowRight, X } from "lucide-react";

interface B2BLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterB2B?: (agent: string, agency: string) => void;
}

export default function B2BLoginModal({ isOpen, onClose, onEnterB2B }: B2BLoginModalProps) {
  const [loginAgent, setLoginAgent] = useState("");
  const [loginAgency, setLoginAgency] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onEnterB2B) {
      onEnterB2B(loginAgent, loginAgency);
    } else {
      localStorage.setItem("dt_agent_name", loginAgent || "Agente Profesional");
      localStorage.setItem("dt_agency_name", loginAgency || "Agencia Colaboradora");
      window.location.hash = "b2b";
      window.location.reload();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B0F19]/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-md w-full max-w-md border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-[#0A0F1D]/10 rounded-sm flex items-center justify-center text-[#0A0F1D]">
            <Lock className="w-6 h-6 text-[#1F82D2]" />
          </div>
          <h3 className="text-xl font-bold font-serif uppercase tracking-tight text-[#0A0F1D]">
            Acceso Profesional B2B
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Área consular reservada para la cotización y expedición de grandes viajes de firma de Dynamic Tours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 uppercase tracking-wider block">Nombre del Agente</label>
            <input
              type="text"
              required
              placeholder="Ej: Laura Gómez"
              value={loginAgent}
              onChange={(e) => setLoginAgent(e.target.value)}
              className="w-full border border-slate-200 rounded-sm py-2.5 px-3 focus:outline-none focus:border-[#0A0F1D] font-medium text-slate-800"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 uppercase tracking-wider block">Nombre de la Agencia</label>
            <input
              type="text"
              required
              placeholder="Ej: Viajes El Corte Inglés - Goya"
              value={loginAgency}
              onChange={(e) => setLoginAgency(e.target.value)}
              className="w-full border border-slate-200 rounded-sm py-2.5 px-3 focus:outline-none focus:border-[#0A0F1D] font-medium text-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A0F1D] hover:bg-[#1F82D2] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Acceder a la Consola Mayorista</span>
            <ArrowRight className="w-4 h-4 text-[#1F82D2]" />
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="w-full text-center text-xs text-slate-400 hover:text-slate-600 font-medium py-1 cursor-pointer transition-colors"
        >
          Cerrar y volver a la web
        </button>
      </div>
    </div>
  );
}
