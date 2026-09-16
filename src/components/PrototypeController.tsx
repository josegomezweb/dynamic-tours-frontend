import React from 'react'
import { Eye, Shield, Building } from 'lucide-react'

export type Environment = 'public' | 'dtprueba' | 'halpru'
export type ViewMode = 'agent' | 'client'
export type Screen = 'home' | 'detail' | 'intranet'

interface Props {
  env: Environment
  setEnv: (e: Environment) => void
  viewMode: ViewMode
  setViewMode: (v: ViewMode) => void
  screen: Screen
  setScreen: (s: Screen) => void
}

export const PrototypeController: React.FC<Props> = ({
  env,
  setEnv,
  viewMode,
  setViewMode,
  screen,
  setScreen,
}) => {
  return (
    <aside aria-label="Controles del prototipo interactivo" className="bg-slate-900 border-b border-slate-700 text-white text-xs py-2 px-4 shadow-lg sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Prototype title & badge */}
        <div className="flex items-center gap-2">
          <span className="bg-dynamic-accent text-white px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider animate-pulse">
            Demo Prototipo
          </span>
          <span className="font-semibold text-slate-300 hidden sm:inline">
            Dynamic Tours B2B Experience
          </span>
        </div>

        {/* Center: Environment Switcher (Public vs DTprueba vs Halcon) */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-lg border border-slate-700">
          <span className="text-[11px] font-bold text-slate-400 px-1.5 hidden md:inline">Entorno:</span>
          <button
            onClick={() => setEnv('public')}
            className={`px-2.5 py-1 rounded font-medium transition text-xs ${
              env === 'public'
                ? 'bg-slate-700 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Público
          </button>
          <button
            onClick={() => setEnv('dtprueba')}
            className={`px-2.5 py-1 rounded font-medium transition text-xs flex items-center gap-1.5 ${
              env === 'dtprueba'
                ? 'bg-dynamic-blue text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-3 h-3" />
            DTprueba (Genérico)
          </button>
          <button
            onClick={() => setEnv('halpru')}
            className={`px-2.5 py-1 rounded font-medium transition text-xs flex items-center gap-1.5 ${
              env === 'halpru'
                ? 'bg-[#FF2F28] text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
            halpru (Halcón)
          </button>
        </div>

        {/* Right: The Game-Changer Agent / Client Mode Toggle */}
        {env !== 'public' && (
          <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-lg border border-slate-700">
            <span className="text-[11px] font-bold text-slate-400 px-1.5 hidden lg:inline">Pantalla:</span>
            <button
              onClick={() => setViewMode('agent')}
              className={`px-2.5 py-1 rounded font-bold transition text-xs flex items-center gap-1.5 ${
                viewMode === 'agent'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Muestra desglose de neto mayorista, márgenes y comisiones"
            >
              <Shield className="w-3 h-3" />
              Modo Agente (Neto + Comisión)
            </button>
            <button
              onClick={() => setViewMode('client')}
              className={`px-2.5 py-1 rounded font-bold transition text-xs flex items-center gap-1.5 ${
                viewMode === 'client'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Oculta comisiones y netos para enseñar la pantalla al viajero sin miedo"
            >
              <Eye className="w-3 h-3" />
              Modo Mostrador (Cara al Cliente)
            </button>
          </div>
        )}

        {/* Screen selector */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setScreen('home')}
            className={`px-2.5 py-1 rounded font-medium transition text-xs ${
              screen === 'home'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Catálogo & Home
          </button>
          <button
            onClick={() => setScreen('detail')}
            className={`px-2.5 py-1 rounded font-medium transition text-xs ${
              screen === 'detail'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Ficha de Viaje
          </button>
          {env !== 'public' && (
            <button
              onClick={() => setScreen('intranet')}
              className={`px-2.5 py-1 rounded font-medium transition text-xs ${
                screen === 'intranet'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Intranet B2B
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
