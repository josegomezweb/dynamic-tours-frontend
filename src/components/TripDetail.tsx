import React, { useState } from 'react'
import {
  CheckCircle,
  XCircle,
  Utensils,
  Download,
  Share2,
  ChevronDown,
  ShieldCheck,
  Star,
  Hotel,
  Sparkles,
  ArrowLeft,
  Plane
} from 'lucide-react'
import type { Environment, ViewMode, Screen } from './PrototypeController'
import { MOCK_TRIPS } from '../data/mockData'

interface Props {
  env: Environment
  viewMode: ViewMode
  onNavigate: (screen: Screen) => void
}

export const TripDetail: React.FC<Props> = ({ env, viewMode, onNavigate }) => {
  const [activeDay, setActiveDay] = useState(1)
  const [activeTab, setActiveTab] = useState<'itinerary' | 'hotels' | 'inclusions' | 'dates'>('itinerary')

  const trip = MOCK_TRIPS[0] // Joyas del Nilo
  const isAgent = viewMode === 'agent' && env !== 'public'
  const isHalcon = env === 'halpru'

  const commissionAmount = Math.round(trip.pvpPrice * (trip.commissionPercent / 100))

  const ITINERARY_DAYS = [
    {
      day: 1,
      title: 'España · El Cairo: Llegada y primer contacto',
      meals: 'Alojamiento',
      description:
        'Presentación en el aeropuerto 3 horas antes de la salida. Vuelo directo con destino El Cairo. Llegada, asistencia personalizada por parte de nuestro corresponsal en tierra antes del control de pasaportes y traslado privado al hotel 5* seleccionado.',
      hotel: 'Hotel Concorde El Salam o Grand Nile Tower 5*',
      highlight: 'Asistencia VIP y traslado privado'
    },
    {
      day: 2,
      title: 'El Cairo · Las Pirámides de Guiza, la Gran Esfinge & Saqqara',
      meals: 'Desayuno + Almuerzo típico',
      description:
        'Desayuno buffet. Excursión panorámica al recinto arqueológico de las Pirámides de Guiza (Keops, Kefrén y Micerinos) y la mítica Gran Esfinge con el Templo del Valle. Almuerzo en restaurante local y visita por la tarde a la necrópolis de Saqqara con la pirámide escalonada de Zoser.',
      hotel: 'Hotel 5* en El Cairo',
      highlight: 'Entrada al recinto de Guiza y visita de Saqqara'
    },
    {
      day: 3,
      title: 'El Cairo Monumental · Museo Egipcio, Ciudadela & Jan el-Jalili',
      meals: 'Desayuno + Almuerzo en restaurante local',
      description:
        'Visita completa de día completo: Museo de las Antigüedades Egipcias, Ciudadela de Saladino con la Mezquita de Alabastro y paseo por el bullicioso y legendario Gran Bazar de Jan el-Jalili con parada en el histórico café El Fishawy.',
      hotel: 'Hotel 5* en El Cairo',
      highlight: 'Tesoros de los faraones y paseo por el bazar'
    },
    {
      day: 4,
      title: 'El Cairo · Lúxor: Vuelo doméstico, embarque en Crucero & Templos',
      meals: 'Pensión Completa a bordo',
      description:
        'Traslado matinal al aeropuerto y vuelo doméstico a Lúxor. A la llegada, traslado y embarque en la motonave fluvial de 5* Gran Lujo. Almuerzo a bordo. Por la tarde, visita de los colosales Templos de Karnak y Lúxor iluminados.',
      hotel: 'Motonave Fluvial 5* Gran Lujo (M/S Royal Princess o similar)',
      highlight: 'Embarque en crucero por el Nilo y Templos de Karnak'
    },
    {
      day: 5,
      title: 'Lúxor · Valle de los Reyes, Hatshepsut & Navegación hacia Edfu',
      meals: 'Pensión Completa a bordo',
      description:
        'Cruce a la orilla occidental del Nilo para descubrir el Valle de los Reyes, el majestuoso Templo funerario de la reina Hatshepsut en Deir el-Bahari y los imponentes Colosos de Memnón. Regreso al barco y navegación fluvial hacia Edfu pasando la esclusa de Esna.',
      hotel: 'Motonave Fluvial 5* Gran Lujo',
      highlight: 'Tumbas faraónicas y navegación panorámica'
    },
    {
      day: 6,
      title: 'Edfu · Kom Ombo · Llegada a Asuán',
      meals: 'Pensión Completa a bordo',
      description:
        'Visita en calesa al Templo de Horus en Edfu, el templo ptolemaico mejor conservado de Egipto. Continuación de la navegación hacia Kom Ombo y visita del singular templo doble dedicado a Sobek y Haroeris. Llegada nocturna a Asuán con cena temática a bordo.',
      hotel: 'Motonave Fluvial 5* Gran Lujo en Asuán',
      highlight: 'Templo de Horus y Kom Ombo'
    },
    {
      day: 7,
      title: 'Asuán · Excursión a los Templos de Abu Simbel',
      meals: 'Pensión Completa a bordo',
      description:
        'Excursión incluida a los grandiosos Templos de Abu Simbel excavados en la roca por Ramsés II y Nefertari. Por la tarde, relajante paseo tradicional en faluca por el Nilo admirando el Mausoleo de Aga Khan y la Isla Elefantina.',
      hotel: 'Motonave Fluvial 5* Gran Lujo en Asuán',
      highlight: 'Visita completa de Abu Simbel y paseo en faluca'
    },
    {
      day: 8,
      title: 'Asuán · El Cairo · España: Regreso',
      meals: 'Desayuno a bordo',
      description:
        'Desembarque tras el desayuno. Traslado al aeropuerto de Asuán, vuelo doméstico a El Cairo y conexión inmediata con el vuelo internacional de regreso a España.',
      hotel: 'Fin del viaje',
      highlight: 'Vuelos y traslados de regreso coordinados'
    }
  ]

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Top Breadcrumb & Back */}
      <div className="bg-white border-b border-slate-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 text-slate-700 hover:text-dynamic-blue font-semibold transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver al catálogo
            </button>
            <span>/</span>
            <span>Grandes Viajes</span>
            <span>/</span>
            <span>Oriente Medio</span>
            <span>/</span>
            <span className="font-bold text-slate-900">{trip.country}</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-slate-600 hover:text-dynamic-blue font-medium transition">
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartir</span>
            </button>
            <button className="flex items-center gap-1 text-slate-600 hover:text-dynamic-blue font-medium transition">
              <Download className="w-3.5 h-3.5" />
              <span>Ficha PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 pt-6 space-y-8">
        {/* 1. Header with Gallery */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="bg-dynamic-navy text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {trip.country}
                </span>
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Salida Garantizada
                </span>
                <span className="bg-amber-500 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full">
                  Charter Directo Provincias
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {trip.title}
              </h1>
              <p className="text-sm text-slate-600 font-medium">
                {trip.destination} · Vuelos, Hoteles 5*, Crucero Pensión Completa, Excursiones & Abu Simbel
              </p>
            </div>

            {/* Quick Price Badge in Header */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shrink-0 min-w-[240px]">
              {isAgent ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400 font-bold uppercase">PVP Final:</span>
                    <span className="text-xl font-black text-slate-900">{trip.pvpPrice} €</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-emerald-700 font-bold uppercase">Neto Agencia:</span>
                    <span className="text-xl font-black text-emerald-600">{trip.netPrice} €</span>
                  </div>
                  <div className="text-[11px] font-bold text-dynamic-accent pt-1 border-t flex justify-between">
                    <span>Comisión ({trip.commissionPercent}%):</span>
                    <span>+{commissionAmount} €</span>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase block">
                    Precio por persona
                  </span>
                  <div className="text-3xl font-black text-dynamic-blue">
                    {trip.pvpPrice} €
                  </div>
                  <span className="text-[11px] text-slate-500">Tasas aéreas y carburante incluidos</span>
                </div>
              )}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden h-[340px]">
            <div className="md:col-span-2 relative group overflow-hidden">
              <img
                src={trip.image}
                alt="Pirámides"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-slate-950/70 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                Guiza & Esfinge
              </span>
            </div>
            <div className="relative group overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80"
                alt="Nilo"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-slate-950/70 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                Crucero por el Nilo
              </span>
            </div>
            <div className="relative group overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=600&q=80"
                alt="Abu Simbel"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-slate-950/70 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                Templos de Abu Simbel
              </span>
            </div>
          </div>
        </div>

        {/* 2. Sticky Subheader Anchor Navigation */}
        <div className="sticky top-24 z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 p-2 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'itinerary'
                ? isHalcon
                  ? 'bg-[#FF2F28] text-white shadow'
                  : 'bg-dynamic-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Itinerario Día a Día (8 Días)
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'inclusions'
                ? isHalcon
                  ? 'bg-[#FF2F28] text-white shadow'
                  : 'bg-dynamic-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Qué Incluye / Qué No Incluye
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'hotels'
                ? isHalcon
                  ? 'bg-[#FF2F28] text-white shadow'
                  : 'bg-dynamic-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Hoteles & Motonave 5*
          </button>
          <button
            onClick={() => setActiveTab('dates')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'dates'
                ? isHalcon
                  ? 'bg-[#FF2F28] text-white shadow'
                  : 'bg-dynamic-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Fechas de Salida & Cupos
          </button>
        </div>

        {/* 3. Tab Content */}
        {activeTab === 'itinerary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Day Selector Left */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
                Selecciona un día
              </div>
              {ITINERARY_DAYS.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setActiveDay(d.day)}
                  className={`w-full text-left p-3.5 rounded-2xl transition border flex items-center justify-between ${
                    activeDay === d.day
                      ? isHalcon
                        ? 'bg-red-50 border-[#FF2F28] text-slate-900 shadow-sm'
                        : 'bg-blue-50 border-dynamic-blue text-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                        activeDay === d.day
                          ? isHalcon
                            ? 'bg-[#FF2F28] text-white'
                            : 'bg-dynamic-blue text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {d.day}
                    </span>
                    <div>
                      <div className="text-xs font-bold line-clamp-1">{d.title}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{d.meals}</div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 -rotate-90 transition ${
                      activeDay === d.day ? 'opacity-100 text-dynamic-blue' : 'opacity-30'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Active Day Detail Right */}
            <div className="lg:col-span-8">
              {(() => {
                const day = ITINERARY_DAYS.find((d) => d.day === activeDay)!
                return (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-xs font-black text-dynamic-blue uppercase tracking-wider block">
                          Día {day.day} del Itinerario
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                          {day.title}
                        </h3>
                      </div>
                      <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-dynamic-accent" />
                        {day.meals}
                      </span>
                    </div>

                    <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-2xl flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-dynamic-blue shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold text-dynamic-blue uppercase block">
                          Punto Fuerte del Día
                        </span>
                        <span className="text-xs font-bold text-slate-800">{day.highlight}</span>
                      </div>
                    </div>

                    <div className="text-sm text-slate-700 leading-relaxed space-y-4 font-normal">
                      <p>{day.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-slate-400" />
                        <span>Alojamiento previsto: <strong>{day.hotel}</strong></span>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}

        {/* Inclusions Tab */}
        {activeTab === 'inclusions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Included */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-base border-b border-slate-100 pb-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>¿Qué incluye este viaje?</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Vuelo directo España - El Cairo y regreso, tasas aéreas y suplemento de carburante incluidos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Vuelos domésticos El Cairo - Lúxor y Asuán - El Cairo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>3 noches en El Cairo en hotel 5* con régimen de Alojamiento y Desayuno.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>4 noches de crucero por el Nilo en motonave 5* Gran Lujo con <strong>Pensión Completa</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Excursión a Abu Simbel incluida</strong> con entradas y guía de habla hispana.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Todas las visitas detalladas, traslados en autobús climatizado y seguro de asistencia 24h.</span>
                </li>
              </ul>
            </div>

            {/* Excluded */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-700 font-black text-base border-b border-slate-100 pb-3">
                <XCircle className="w-5 h-5 text-slate-400" />
                <span>No incluye</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Cuota de servicios, visado y propinas obligatorias generales (a pagar en destino: 95€ por persona).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Bebidas en las comidas del crucero y de las excursiones.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Entradas al interior de las pirámides de Keops o Kefrén (pago directo voluntario).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Gastos personales o extras en los hoteles.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Hotels Tab */}
        {activeTab === 'hotels' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-900">Alojamientos Seleccionados Categoría 5* Superior</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-2xl p-4 flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80"
                    alt="Hotel El Cairo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Grand Nile Tower / Concorde El Salam</h4>
                  <p className="text-xs text-slate-500">3 Noches en El Cairo · Régimen AD</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=300&q=80"
                    alt="Motonave Fluvial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Motonave M/S Royal Princess 5* GL</h4>
                  <p className="text-xs text-slate-500">4 Noches en Crucero Nilo · Pensión Completa</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dates Tab */}
        {activeTab === 'dates' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900">Salidas Programadas con Cupos Protegidos</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b">
                  <tr>
                    <th className="py-2.5 px-3">Fecha Salida</th>
                    <th className="py-2.5 px-3">Aeropuerto</th>
                    <th className="py-2.5 px-3">Compañía</th>
                    <th className="py-2.5 px-3">Plazas Libres</th>
                    <th className="py-2.5 px-3">PVP</th>
                    {isAgent && <th className="py-2.5 px-3 text-emerald-600">Neto</th>}
                    <th className="py-2.5 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr>
                    <td className="py-3 px-3 font-bold">12 Octubre 2026</td>
                    <td className="py-3 px-3">Madrid (MAD) - Directo</td>
                    <td className="py-3 px-3">Egyptair</td>
                    <td className="py-3 px-3 text-emerald-600 font-bold">6 plazas</td>
                    <td className="py-3 px-3 font-bold text-slate-900">1.250 €</td>
                    {isAgent && <td className="py-3 px-3 font-black text-emerald-600">1.025 €</td>}
                    <td className="py-3 px-3 text-right">
                      <button className="bg-dynamic-blue text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-dynamic-light transition">
                        Reservar
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold">19 Octubre 2026</td>
                    <td className="py-3 px-3">Valencia (VLC) - Charter</td>
                    <td className="py-3 px-3">Charter Dynamic</td>
                    <td className="py-3 px-3 text-amber-600 font-bold">Últimas 2</td>
                    <td className="py-3 px-3 font-bold text-slate-900">1.280 €</td>
                    {isAgent && <td className="py-3 px-3 font-black text-emerald-600">1.050 €</td>}
                    <td className="py-3 px-3 text-right">
                      <button className="bg-dynamic-blue text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-dynamic-light transition">
                        Reservar
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold">26 Octubre 2026</td>
                    <td className="py-3 px-3">Barcelona (BCN)</td>
                    <td className="py-3 px-3">Egyptair</td>
                    <td className="py-3 px-3 text-emerald-600 font-bold">8 plazas</td>
                    <td className="py-3 px-3 font-bold text-slate-900">1.250 €</td>
                    {isAgent && <td className="py-3 px-3 font-black text-emerald-600">1.025 €</td>}
                    <td className="py-3 px-3 text-right">
                      <button className="bg-dynamic-blue text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-dynamic-light transition">
                        Reservar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 4. The Sticky Booking Dock at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                {isAgent ? 'PVP / Neto Agencia' : 'Precio por persona'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">{trip.pvpPrice} €</span>
                {isAgent && (
                  <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Neto: {trip.netPrice} € (+{commissionAmount}€ com.)
                  </span>
                )}
              </div>
            </div>

            <div className="hidden sm:block border-l border-slate-200 pl-4">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Próxima Salida</span>
              <span className="text-xs font-bold text-slate-700">12 Oct 2026 (Madrid)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Generando propuesta para el cliente en PDF con marca blanca...')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </button>

            <button
              onClick={() => onNavigate(env !== 'public' ? 'intranet' : 'home')}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg transition flex items-center gap-2 ${
                isHalcon
                  ? 'bg-[#FF2F28] hover:bg-red-700'
                  : 'bg-dynamic-blue hover:bg-dynamic-light'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>{env !== 'public' ? 'Bloquear Plazas en Intranet' : 'Acceso Agencias para Reservar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
