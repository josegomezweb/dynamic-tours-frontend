import React, { useState } from 'react'
import {
  Search,
  MapPin,
  Calendar,
  Plane,
  ShieldCheck,
  Share2,
  Printer,
  Download,
  QrCode,
  X,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react'
import { MOCK_TRIPS, type Trip } from '../data/mockData'
import type { Environment, ViewMode, Screen } from './PrototypeController'

interface Props {
  env: Environment
  viewMode: ViewMode
  onSelectTrip: (tripId: string) => void
  onNavigate: (screen: Screen) => void
}

export const HomeCatalog: React.FC<Props> = ({
  env,
  viewMode,
  onSelectTrip,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [flyerTrip, setFlyerTrip] = useState<Trip | null>(null)
  const [shareToast, setShareToast] = useState<string | null>(null)

  const isHalcon = env === 'halpru'
  const isAgent = viewMode === 'agent' && env !== 'public'

  const categories = [
    'Todos los Circuitos',
    'Salida Garantizada',
    'Egipto Charter',
    'Rebajas 2026',
    'Safaris & Aventura',
    'Lunas de Miel'
  ]

  const handleShareWhatsApp = (trip: Trip) => {
    setShareToast(`Enlace para cliente copiado: "${trip.title}" listo para enviar por WhatsApp.`)
    setTimeout(() => setShareToast(null), 3500)
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Toast notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 border border-emerald-500/50 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{shareToast}</span>
        </div>
      )}

      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-dynamic-navy to-slate-900 text-white pt-12 pb-24 px-4 overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-dynamic-light/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-dynamic-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-xs font-semibold text-dynamic-sky mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Programación Mayorista 2026 · Cupos Confirmados</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Grandes viajes con la solvencia técnica que tu agencia exige.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Accede a tarifas netas consolidadas, plazas garantizadas en vuelos directos y charters de provincias, y asistencia en tierra 24/7 en español.
            </p>

            {/* Notification alert for agencies */}
            {isAgent && (
              <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-emerald-200 font-medium">
                    Estás viendo precios con tu <strong>acuerdo de comisión del 18%</strong>. Usa el conmutador de arriba para pasar al <em>Modo Mostrador</em> si estás con un viajero.
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('intranet')}
                  className="text-emerald-400 hover:text-emerald-300 font-bold whitespace-nowrap"
                >
                  Ver mis acuerdos →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Floating Search Box */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Field 1: Destination */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Destino / País
              </label>
              <div className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-dynamic-blue transition">
                <MapPin className="w-4 h-4 text-dynamic-blue shrink-0" />
                <select className="bg-transparent text-xs w-full focus:outline-none text-slate-800 font-semibold cursor-pointer">
                  <option>Todos los destinos</option>
                  <option>Egipto (El Cairo & Nilo)</option>
                  <option>Turquía (Estambul & Capadocia)</option>
                  <option>Jordania & Petra</option>
                  <option>Kenia & Safaris</option>
                  <option>Japón Clásico</option>
                  <option>Costa Rica</option>
                </select>
              </div>
            </div>

            {/* Field 2: Departure City */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Aeropuerto de Salida
              </label>
              <div className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-dynamic-blue transition">
                <Plane className="w-4 h-4 text-dynamic-blue shrink-0" />
                <select className="bg-transparent text-xs w-full focus:outline-none text-slate-800 font-semibold cursor-pointer">
                  <option>Cualquier aeropuerto</option>
                  <option>Madrid (MAD) - Vuelo Directo</option>
                  <option>Barcelona (BCN)</option>
                  <option>Valencia (VLC) - Charter</option>
                  <option>Bilbao (BIO) - Charter</option>
                  <option>Sevilla (SVQ) - Charter</option>
                  <option>Santiago / A Coruña</option>
                </select>
              </div>
            </div>

            {/* Field 3: Departure Date / Month */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Mes / Temporada
              </label>
              <div className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-dynamic-blue transition">
                <Calendar className="w-4 h-4 text-dynamic-blue shrink-0" />
                <select className="bg-transparent text-xs w-full focus:outline-none text-slate-800 font-semibold cursor-pointer">
                  <option>Septiembre - Octubre 2026</option>
                  <option>Noviembre 2026 (Puente)</option>
                  <option>Diciembre 2026 (Navidad/Fin de Año)</option>
                  <option>Primavera 2027</option>
                  <option>Semana Santa 2027</option>
                </select>
              </div>
            </div>

            {/* Field 4: Search Button */}
            <div className="flex items-end">
              <button
                className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-md flex items-center justify-center gap-2 transition ${
                  isHalcon
                    ? 'bg-[#FF2F28] hover:bg-red-700'
                    : 'bg-dynamic-blue hover:bg-dynamic-light'
                }`}
              >
                <Search className="w-4 h-4" />
                Consultar Cupos & Tarifas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Catalog Section with Category Pills */}
      <section className="max-w-7xl mx-auto px-4 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Circuitos & Programaciones Destacadas
            </h2>
            <p className="text-xs text-slate-500">
              Mostrando disponibilidad actualizada con tarifas mayoristas protegidas
            </p>
          </div>

          {/* Quick filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? isHalcon
                      ? 'bg-[#FF2F28] text-white shadow-sm'
                      : 'bg-dynamic-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Trip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TRIPS.map((trip) => {
            const commissionAmount = Math.round(
              trip.pvpPrice * (trip.commissionPercent / 100)
            )

            return (
              <div
                key={trip.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5 items-center justify-between">
                    <span className="bg-slate-900/80 backdrop-blur text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {trip.country}
                    </span>
                    <div className="flex gap-1.5">
                      {trip.badges.slice(0, 2).map((b, i) => (
                        <span
                          key={i}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-sm ${
                            b.color === 'green'
                              ? 'bg-emerald-600'
                              : b.color === 'red'
                              ? 'bg-red-600'
                              : b.color === 'amber'
                              ? 'bg-amber-600'
                              : b.color === 'purple'
                              ? 'bg-purple-600'
                              : 'bg-dynamic-blue'
                          }`}
                        >
                          {b.text}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[11px] font-bold text-dynamic-sky flex items-center gap-1 mb-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      {trip.duration}
                    </div>
                    <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {trip.destination}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => onSelectTrip(trip.id)}
                      className="font-black text-base text-slate-900 hover:text-dynamic-blue cursor-pointer transition leading-snug mb-2"
                    >
                      {trip.title}
                    </h3>

                    {/* Itinerary highlight pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {trip.itinerarySummary.map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-slate-500 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Plane className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{trip.flights}</span>
                      </div>
                    </div>
                  </div>

                  {/* The Pricing Box: Changes according to ViewMode */}
                  <div className="pt-3 border-t border-slate-100">
                    {isAgent ? (
                      /* Mode Agente: Shows Full B2B Breakdown */
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-3 space-y-2">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              PVP Recomendado
                            </span>
                            <span className="text-lg font-black text-slate-900">
                              {trip.pvpPrice} €
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                              Neto Agencia
                            </span>
                            <span className="text-lg font-black text-emerald-600">
                              {trip.netPrice} €
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200">
                          <span className="font-semibold text-slate-600 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-dynamic-accent" />
                            Comisión ({trip.commissionPercent}%):
                          </span>
                          <span className="font-black text-dynamic-accent">
                            +{commissionAmount} €
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Mode Client / Public: Shows Clean Luxury PVP Only */
                      <div className="flex items-baseline justify-between mb-3 py-1">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Precio por persona desde
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-dynamic-blue">
                              {trip.pvpPrice} €
                            </span>
                            <span className="text-xs text-slate-500 font-medium">Tasas incl.</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          Vuelos + Hoteles
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectTrip(trip.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 text-white shadow-sm ${
                          isHalcon
                            ? 'bg-[#FF2F28] hover:bg-red-700'
                            : 'bg-dynamic-blue hover:bg-dynamic-light'
                        }`}
                      >
                        <span>Ver Itinerario</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Quick tool for agents */}
                      {isAgent ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleShareWhatsApp(trip)}
                            title="Compartir enlace con el cliente por WhatsApp"
                            className="flex-1 py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200 transition flex items-center justify-center gap-1"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </button>
                          <button
                            onClick={() => setFlyerTrip(trip)}
                            title="Generar Cartel de Escaparate para Imprimir"
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onSelectTrip(trip.id)}
                          className="py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-center"
                        >
                          Solicitar Reserva
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. Interactive Window Flyer Modal (Cartel de Escaparate) */}
      {flyerTrip && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setFlyerTrip(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <span className="bg-dynamic-blue/10 text-dynamic-blue text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-1.5">
                Herramienta para el Punto de Venta
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Cartel de Escaparate (Listo para Imprimir A4)
              </h3>
              <p className="text-xs text-slate-500">
                Generado con marca blanca neutra y sin datos mayoristas confidenciales.
              </p>
            </div>

            {/* Flyer Preview Card */}
            <div className="border-4 border-slate-900 rounded-2xl p-4 bg-gradient-to-b from-white to-slate-50 shadow-inner space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-black text-sm tracking-wider text-slate-900">
                  {isHalcon ? 'HALCÓN VIAJES' : 'AGENCIA DE VIAJES'}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Oferta Exclusiva 2026
                </span>
              </div>

              <div className="h-44 rounded-xl overflow-hidden relative">
                <img
                  src={flyerTrip.image}
                  alt={flyerTrip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  {flyerTrip.duration}
                </div>
              </div>

              <div>
                <h4 className="font-black text-lg text-slate-900 leading-tight">
                  {flyerTrip.title}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {flyerTrip.destination}
                </p>
              </div>

              <div className="bg-dynamic-navy text-white p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-300 uppercase block font-semibold">
                    Precio final por persona
                  </span>
                  <span className="text-3xl font-black text-amber-400">
                    {flyerTrip.pvpPrice} €
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-lg">
                  <QrCode className="w-10 h-10 text-white" />
                  <span className="text-[9px] text-slate-200 leading-tight block">
                    Escanea para ver el itinerario completo
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  alert('Descargando archivo PDF en alta resolución (A4 listo para imprenta)...')
                  setFlyerTrip(null)
                }}
                className="flex-1 py-3 rounded-xl bg-dynamic-blue hover:bg-dynamic-light text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4" />
                Descargar PDF de Escaparate (A4)
              </button>
              <button
                onClick={() => setFlyerTrip(null)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
