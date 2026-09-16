import React, { useState } from 'react'
import {
  FileText,
  MessageSquare,
  Receipt,
  UserCheck,
  Search,
  Download,
  Clock,
  TrendingUp,
  Building,
  PhoneCall
} from 'lucide-react'
import { MOCK_RESERVATIONS } from '../data/mockData'
import type { Environment, ViewMode, Screen } from './PrototypeController'

interface Props {
  env: Environment
  viewMode: ViewMode
  onNavigate: (screen: Screen) => void
}

export const AgencyIntranet: React.FC<Props> = ({ env, viewMode, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [selectedTab, setSelectedTab] = useState<'reservas' | 'facturas' | 'mensajes' | 'comisiones'>('reservas')

  const isHalcon = env === 'halpru'
  const isAgent = viewMode === 'agent'

  const filteredReservations = MOCK_RESERVATIONS.filter((res) => {
    const matchesSearch =
      res.localizador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.leadPassenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.destination.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'Todos' || res.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. Welcome & Operational Header */}
      <div
        className={`py-8 px-4 text-white transition-colors duration-300 ${
          isHalcon ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-[#FF2F28]/40' : 'bg-gradient-to-r from-dynamic-navy via-slate-900 to-dynamic-blue/60'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-dynamic-sky font-semibold">
              <Building className="w-3.5 h-3.5 text-dynamic-light" />
              <span>Intranet Profesional B2B · Código Agencia: DT-ES-4029</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Bienvenido, {isHalcon ? 'HALCÓN PRUEBA' : 'DYNAMIC TOURS MINORISTA'}
            </h1>
            <p className="text-xs text-slate-300">
              Razón Social: {isHalcon ? 'VIAJES HALCON S.A.U. (CIF: A10005510)' : 'AGENCIA VIAJES DEMO S.L. (CIF: B82345678)'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur border border-white/15 px-3 py-2 rounded-xl text-xs">
              <span className="text-[10px] text-slate-300 uppercase block font-semibold">Mesa de Reservas Directa</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3 text-emerald-400" />
                915 521 443 · reservas@dynamic-tours.com
              </span>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow transition ${
                isHalcon ? 'bg-[#FF2F28] hover:bg-red-700' : 'bg-dynamic-blue hover:bg-dynamic-light'
              }`}
            >
              + Nueva Cotización
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI Metrics Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Expedientes en Vigor
              </span>
              <span className="text-2xl font-black text-slate-900">4</span>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                1 salida en 7 días
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-dynamic-blue flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Presupuestos Activos
              </span>
              <span className="text-2xl font-black text-slate-900">3</span>
              <span className="text-[11px] text-amber-600 font-semibold block mt-0.5">
                Validez hasta 72h
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Comisiones Generadas
              </span>
              <span className="text-2xl font-black text-emerald-600">3.503 €</span>
              <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                Acuerdo pactado: 18%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Facturación Acumulada
              </span>
              <span className="text-2xl font-black text-slate-900">19.456 €</span>
              <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                Total PVP clientes
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Operational Navigation Tabs (The 4 Pillar Modules) */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-2xl p-2 border border-slate-200 flex flex-wrap gap-2 shadow-sm">
          <button
            onClick={() => setSelectedTab('reservas')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              selectedTab === 'reservas'
                ? isHalcon
                  ? 'bg-[#FF2F28] text-white shadow'
                  : 'bg-dynamic-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Mis Reservas & Presupuestos (4)</span>
          </button>

          <button
            onClick={() => setSelectedTab('facturas')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              selectedTab === 'facturas'
                ? isHalcon
                  ? 'bg-[#FF2F28] text-white shadow'
                  : 'bg-dynamic-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Histórico de Facturas</span>
          </button>

          <button
            onClick={() => setSelectedTab('mensajes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              selectedTab === 'mensajes'
                ? isHalcon
                  ? 'bg-[#FF2F28] text-white shadow'
                  : 'bg-dynamic-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Mensajes con Operativa</span>
          </button>

          <button
            onClick={() => setSelectedTab('comisiones')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              selectedTab === 'comisiones'
                ? isHalcon
                  ? 'bg-[#FF2F28] text-white shadow'
                  : 'bg-dynamic-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Datos & Pactos Comerciales</span>
          </button>
        </div>
      </div>

      {/* 4. Tab Content */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        {selectedTab === 'reservas' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Buscar por localizador (DT-...), pasajero titular o viaje..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-dynamic-blue transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['Todos', 'Confirmada', 'Pendiente Emisión', 'Presupuesto', 'En Viaje'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                      statusFilter === status
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Reservations Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Localizador</th>
                    <th className="py-3 px-4">Pasajero Titular</th>
                    <th className="py-3 px-4">Circuito / Destino</th>
                    <th className="py-3 px-4">Salida</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4">PVP Total</th>
                    {isAgent && (
                      <>
                        <th className="py-3 px-4 text-emerald-700">Neto</th>
                        <th className="py-3 px-4 text-dynamic-accent">Comisión</th>
                      </>
                    )}
                    <th className="py-3 px-4 text-right">Documentación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredReservations.map((res) => (
                    <tr key={res.localizador} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-black text-dynamic-blue">
                        {res.localizador}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {res.leadPassenger}
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {res.passengersCount} Pasajeros
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-[200px] truncate" title={res.destination}>
                        {res.destination}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {res.departureDate}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            res.status === 'Confirmada'
                              ? 'bg-emerald-100 text-emerald-800'
                              : res.status === 'Pendiente Emisión'
                              ? 'bg-amber-100 text-amber-800'
                              : res.status === 'En Viaje'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {res.pvpTotal} €
                      </td>
                      {isAgent && (
                        <>
                          <td className="py-3.5 px-4 font-black text-emerald-600">
                            {res.netTotal} €
                          </td>
                          <td className="py-3.5 px-4 font-black text-dynamic-accent">
                            +{res.commissionTotal} €
                          </td>
                        </>
                      )}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => alert(`Descargando bono de viaje para localizador ${res.localizador}...`)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition"
                            title="Descargar Bono / Voucher"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => alert(`Abriendo detalle del expediente ${res.localizador}...`)}
                            className="px-2.5 py-1.5 bg-dynamic-blue/10 hover:bg-dynamic-blue text-dynamic-blue hover:text-white rounded-lg text-[11px] font-bold transition"
                          >
                            Ver
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Facturas Tab */}
        {selectedTab === 'facturas' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900">Histórico de Facturas Emitidas</h3>
            <p className="text-xs text-slate-500">
              Descarga facturas oficiales en PDF de los expedientes liquidados y comisionados.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b">
                  <tr>
                    <th className="py-3 px-4">Nº Factura</th>
                    <th className="py-3 px-4">Localizador</th>
                    <th className="py-3 px-4">Fecha Emisión</th>
                    <th className="py-3 px-4">Importe Neto</th>
                    <th className="py-3 px-4">Comisión Retenida</th>
                    <th className="py-3 px-4 text-right">Descargar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr>
                    <td className="py-3.5 px-4 font-bold">F-2026/0891</td>
                    <td className="py-3.5 px-4 font-bold text-dynamic-blue">DT-2026-9630</td>
                    <td className="py-3.5 px-4">2026-09-01</td>
                    <td className="py-3.5 px-4 font-black">4.739 €</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold">1.041 € (18%)</td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-dynamic-blue hover:underline font-bold">Descargar PDF</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold">F-2026/0842</td>
                    <td className="py-3.5 px-4 font-bold text-dynamic-blue">DT-2026-9510</td>
                    <td className="py-3.5 px-4">2026-08-15</td>
                    <td className="py-3.5 px-4 font-black">3.240 €</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold">712 € (18%)</td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-dynamic-blue hover:underline font-bold">Descargar PDF</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mensajes Tab */}
        {selectedTab === 'mensajes' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900">Bandeja de Mensajería con Operativa</h3>
            <p className="text-xs text-slate-500">
              Canal bidireccional directo para peticiones especiales de dietas, asientos o ampliación de noches.
            </p>
            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Operativa Dynamic Tours (Alberto)</span>
                <span className="text-slate-400 font-normal">Hoy a las 11:20</span>
              </div>
              <p className="text-slate-700">
                Confirmados los camarotes contiguos en la motonave Royal Princess para la reserva DT-2026-9812 (Familia García López). Ya podéis emitir el bono definitivo.
              </p>
            </div>
          </div>
        )}

        {/* Comisiones & Acuerdos Tab */}
        {selectedTab === 'comisiones' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Pactos Comerciales y Escala de Comisiones
              </h3>
              <p className="text-xs text-slate-500">
                Condiciones mayoristas vigentes pactadas entre la dirección comercial de Dynamic Tours y tu red de agencias.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Comisión Catálogo General
                </span>
                <span className="text-3xl font-black text-dynamic-blue">18%</span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Aplicable a programación regular
                </span>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Comisión Ofertas & Rebajas
                </span>
                <span className="text-3xl font-black text-emerald-600">18%</span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Sobre precio rebajado
                </span>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Suplementos y Carburante
                </span>
                <span className="text-3xl font-black text-purple-600">18%</span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Protegida según acuerdo 2026
                </span>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Venta Web / Autogestión
                </span>
                <span className="text-3xl font-black text-dynamic-accent">18%</span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Liquidación directa quincenal
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
