import React, { useState } from 'react'
import {
  Building2,
  Phone,
  MessageCircle,
  ChevronDown,
  Search,
  FileText,
  LogOut,
  User,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { CONTINENTS_MENU } from '../data/mockData'
import type { Environment, Screen } from './PrototypeController'

interface Props {
  env: Environment
  onNavigate: (screen: Screen) => void
}

export const Navbar: React.FC<Props> = ({ env, onNavigate }) => {
  const [megamenuOpen, setMegamenuOpen] = useState(false)
  const [selectedContinentIndex, setSelectedContinentIndex] = useState(0)

  const isHalcon = env === 'halpru'
  const isAuthenticated = env !== 'public'

  const activeContinent = CONTINENTS_MENU[selectedContinentIndex]

  return (
    <header className="sticky top-9 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* 1. Top B2B Operational Bar */}
      <div
        className={`text-xs py-1.5 px-4 transition-colors duration-300 ${
          isHalcon ? 'bg-[#1e293b] text-white' : 'bg-dynamic-navy text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left info */}
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-200">
              <Building2 className="w-3.5 h-3.5 text-dynamic-light" />
              {isAuthenticated ? (
                <span>
                  Portal Agencias de Viajes ·{' '}
                  <span className="font-bold text-amber-400">
                    {isHalcon ? 'Entorno Red Halcón Viajes' : 'Entorno Minorista General'}
                  </span>
                </span>
              ) : (
                <span>Touroperador Mayorista Exclusivo B2B</span>
              )}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <a
              href="tel:915521443"
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-dynamic-light" />
              915 521 443
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=34690125031"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-medium"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp Operativa
            </a>
          </div>

          {/* Right info / Auth status */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                  <User className="w-3 h-3 text-emerald-400" />
                  <span className="text-slate-200 font-semibold">
                    {isHalcon ? 'HALCON PRUEBA' : 'DYNAMIC TOURS MINORISTA'}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('intranet')}
                  className="text-dynamic-sky hover:underline font-medium"
                >
                  Mi Zona Agencia
                </button>
                <button
                  onClick={() => {}}
                  className="text-slate-400 hover:text-red-400 transition flex items-center gap-1"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden md:inline">Salir</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <a href="#registro" className="text-slate-300 hover:text-white transition font-medium">
                  Alta Agencias
                </a>
                <button
                  onClick={() => {}}
                  className="bg-dynamic-blue hover:bg-dynamic-light text-white px-3 py-1 rounded text-xs font-bold transition shadow"
                >
                  Acceso Agencias
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            {isHalcon ? (
              <div className="flex items-center gap-2">
                <div className="bg-[#FF2F28] text-white font-black text-sm px-2.5 py-1 rounded shadow tracking-tight">
                  HALCÓN
                </div>
                <div className="border-l border-slate-300 pl-2">
                  <span className="text-xs font-bold text-slate-700 block">Canal Mayorista</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block -mt-1 font-semibold">
                    powered by Dynamic Tours
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-dynamic-navy to-dynamic-blue flex items-center justify-center text-white font-black text-lg shadow-md tracking-wider">
                  DT
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span className="text-xl font-black tracking-tight text-dynamic-navy">DYNAMIC</span>
                    <span className="text-xl font-light tracking-wider text-dynamic-blue ml-1.5">TOURS</span>
                  </div>
                  <span className="block text-[10px] tracking-widest uppercase text-slate-400 font-bold -mt-1">
                    Touroperador B2B · Desde 1988
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links with Editorial Megamenu */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 rounded-lg hover:text-dynamic-blue hover:bg-slate-50 transition"
            >
              Inicio
            </button>

            {/* Megamenu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setMegamenuOpen(true)}
              onMouseLeave={() => setMegamenuOpen(false)}
            >
              <button
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 font-bold ${
                  megamenuOpen || isHalcon
                    ? isHalcon
                      ? 'text-[#FF2F28] bg-red-50'
                      : 'text-dynamic-blue bg-blue-50/70'
                    : 'hover:text-dynamic-blue hover:bg-slate-50'
                }`}
              >
                <Compass className="w-4 h-4" />
                Grandes Viajes & Destinos
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    megamenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mega Dropdown Panel */}
              {megamenuOpen && (
                <div className="absolute left-0 top-full pt-2 w-[780px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-12 gap-6">
                    {/* Left: Continents list */}
                    <div className="col-span-4 border-r border-slate-100 pr-4 space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                        Continentes
                      </div>
                      {CONTINENTS_MENU.map((c, idx) => (
                        <button
                          key={c.name}
                          onMouseEnter={() => setSelectedContinentIndex(idx)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-sm transition flex items-center justify-between ${
                            selectedContinentIndex === idx
                              ? isHalcon
                                ? 'bg-[#FF2F28] text-white shadow-sm'
                                : 'bg-dynamic-blue text-white shadow-sm'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{c.name}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 -rotate-90 transition ${
                              selectedContinentIndex === idx ? 'opacity-100' : 'opacity-40'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Middle: Countries in active continent */}
                    <div className="col-span-4 pl-2 space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-1">
                        Destinos en {activeContinent.name}
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {activeContinent.topDestinations.map((dest) => (
                          <button
                            key={dest}
                            onClick={() => {
                              setMegamenuOpen(false)
                              onNavigate('home')
                            }}
                            className="text-left px-2.5 py-1.5 rounded-lg text-sm text-slate-700 hover:text-dynamic-blue hover:bg-blue-50 font-medium transition flex items-center justify-between group"
                          >
                            <span>{dest}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-dynamic-blue" />
                          </button>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setMegamenuOpen(false)
                            onNavigate('home')
                          }}
                          className="text-xs font-bold text-dynamic-blue hover:underline flex items-center gap-1"
                        >
                          Ver todos los circuitos de {activeContinent.name} →
                        </button>
                      </div>
                    </div>

                    {/* Right: Featured editorial card */}
                    <div className="col-span-4 bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
                      <div>
                        <div className="relative rounded-lg overflow-hidden h-28 mb-3 group">
                          <img
                            src={activeContinent.highlightTrip.image}
                            alt={activeContinent.highlightTrip.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                            {activeContinent.highlightTrip.tag}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 leading-snug mb-1">
                          {activeContinent.highlightTrip.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {activeContinent.highlightTrip.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Desde</span>
                          <span className="text-sm font-black text-dynamic-blue">
                            {activeContinent.highlightTrip.price}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setMegamenuOpen(false)
                            onNavigate('detail')
                          }}
                          className="bg-dynamic-blue hover:bg-dynamic-light text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition"
                        >
                          Ver Ficha
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('detail')}
              className="px-3 py-1.5 rounded-lg hover:text-dynamic-blue hover:bg-slate-50 transition"
            >
              Egipto Provincias
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 rounded-lg hover:text-dynamic-blue hover:bg-slate-50 transition"
            >
              Grupos a Medida
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 rounded-lg hover:text-dynamic-blue hover:bg-slate-50 transition"
            >
              Buceo Mar Rojo
            </button>
            <button
              onClick={() => onNavigate('passports')}
              className="px-3 py-1.5 rounded-lg text-dynamic-blue bg-blue-50/70 hover:bg-blue-100/70 font-semibold transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-dynamic-accent" />
              Lector Pasaportes
            </button>
          </nav>
        </div>

        {/* Search & Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Buscar circuito, destino..."
              className="pl-9 pr-3 py-1.5 text-xs rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-dynamic-blue w-52 transition"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={() => onNavigate(isAuthenticated ? 'intranet' : 'detail')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              isHalcon
                ? 'bg-[#FF2F28] hover:bg-red-700 text-white shadow-sm'
                : 'bg-dynamic-blue hover:bg-dynamic-light text-white shadow-sm'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {isAuthenticated ? 'Mis Reservas' : 'Ficha Ejemplo'}
          </button>
        </div>
      </div>
    </header>
  )
}
