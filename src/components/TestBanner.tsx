import React from "react";

export default function TestBanner() {
  return (
    <aside 
      aria-label="Aviso de entorno de pruebas"
      className="w-full bg-[#00529b] text-white py-2 px-4 shadow-sm border-b border-white/15 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-cyan-200 text-[10.5px] font-extrabold uppercase tracking-widest border border-white/20 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
          Entorno de Pruebas
        </span>
        <p className="text-xs sm:text-[13px] text-blue-50 font-medium">
          Esta es una versión de demostración y validación técnica de <strong className="font-bold text-white">Dynamic Tours</strong>. Los datos y reservas son simulados.
        </p>
      </div>
    </aside>
  );
}
