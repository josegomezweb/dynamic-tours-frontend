import React, { useState } from "react";
import { Booking } from "../types";
import { 
  Briefcase, 
  Search, 
  Trash2, 
  Printer, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  XCircle, 
  Calendar, 
  ChevronRight, 
  DollarSign, 
  User, 
  Sparkles,
  Building,
  RefreshCw,
  FileText,
  X,
  Plus
} from "lucide-react";

interface BookingsDashboardProps {
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: Booking["status"]) => void;
  onDeleteBooking: (id: string) => void;
  agencyName: string;
}

export default function BookingsDashboard({ 
  bookings, 
  onUpdateBookingStatus, 
  onDeleteBooking,
  agencyName 
}: BookingsDashboardProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");
  const [selectedProposalBooking, setSelectedProposalBooking] = useState<Booking | null>(null);

  // Filtered bookings based on agency name matches
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Todos" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const totalVolumeRetail = filteredBookings
    .filter(b => b.status !== "Cancelado")
    .reduce((sum, b) => sum + b.totalPriceRetail, 0);

  const totalVolumeNet = filteredBookings
    .filter(b => b.status !== "Cancelado")
    .reduce((sum, b) => sum + b.totalPriceNet, 0);

  const totalCommission = totalVolumeRetail - totalVolumeNet;

  const confirmedCount = filteredBookings.filter(b => b.status === "Confirmado").length;
  const pendingCount = filteredBookings.filter(b => b.status === "Pendiente Pago").length;
  const reviewCount = filteredBookings.filter(b => b.status === "En Revisión").length;

  const getStatusBadgeClass = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmado":
        return "bg-emerald-50 text-emerald-800 border-emerald-100";
      case "Pendiente Pago":
        return "bg-amber-50 text-amber-800 border-amber-100";
      case "En Revisión":
        return "bg-blue-50 text-blue-800 border-blue-100";
      case "Cancelado":
        return "bg-rose-50 text-rose-800 border-rose-100";
    }
  };

  const getStatusIcon = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmado":
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />;
      case "Pendiente Pago":
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
      case "En Revisión":
        return <AlertCircle className="w-3.5 h-3.5 text-blue-600" />;
      case "Cancelado":
        return <XCircle className="w-3.5 h-3.5 text-rose-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-[#1F82D2] uppercase tracking-wider">
            Gestión de Reservas B2B
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0A0F1D] font-serif mt-1">
            Historial de Cotizaciones y Expedientes
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Supervise el estado de sus reservas mayoristas, actualice expedientes e imprima propuestas co-brandeadas para sus clientes.
          </p>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Volumen Total (P.V.P.)
            </span>
            <p className="text-2xl font-black text-[#0A0F1D]">
              {totalVolumeRetail.toLocaleString()} €
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 w-max">
              <TrendingUp className="w-3 h-3" />
              Ingresos Activos
            </span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <DollarSign className="w-5 h-5 text-[#0A0F1D]" />
          </div>
        </div>

        {/* Total B2B Payments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Neto Mayorista (B2B)
            </span>
            <p className="text-2xl font-black text-slate-700">
              {totalVolumeNet.toLocaleString()} €
            </p>
            <span className="text-[10px] text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded w-max block">
              Coste de Adquisición
            </span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <Building className="w-5 h-5 text-slate-600" />
          </div>
        </div>

        {/* Agency Net Profit Commission */}
        <div className="bg-[#0A0F1D] p-5 rounded-2xl shadow-lg border border-[#0A0F1D] flex items-center justify-between text-white">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#1F82D2] uppercase tracking-widest block">
              Tu Margen / Beneficio
            </span>
            <p className="text-2xl font-black text-white">
              {totalCommission.toLocaleString()} €
            </p>
            <span className="text-[10px] text-[#1F82D2] font-bold bg-white/10 px-2.5 py-1 rounded border border-white/10 w-max block">
              Promedio com. {bookings.length ? Math.round((totalCommission / (totalVolumeRetail || 1)) * 100) : 0}%
            </span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#1F82D2]" />
          </div>
        </div>

        {/* Booking Counts Summary */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Estado de Operaciones
          </span>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-100">
              <p className="font-extrabold text-sm">{confirmedCount}</p>
              <p className="text-[9px] font-medium text-emerald-600">Conf.</p>
            </div>
            <div className="bg-amber-50 text-amber-800 p-2 rounded-lg border border-amber-100">
              <p className="font-extrabold text-sm">{pendingCount}</p>
              <p className="text-[9px] font-medium text-amber-600">Pend.</p>
            </div>
            <div className="bg-blue-50 text-blue-800 p-2 rounded-lg border border-blue-100">
              <p className="font-extrabold text-sm">{reviewCount}</p>
              <p className="text-[9px] font-medium text-blue-600">Revis.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Buscar por cliente, destino o agente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#1F82D2] transition-all font-medium text-[#0A0F1D] placeholder-slate-400"
          />
          <span className="absolute right-3.5 top-3 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          {["Todos", "Confirmado", "Pendiente Pago", "En Revisión", "Cancelado"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === status
                  ? "bg-[#0A0F1D] text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                <th className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">ID</th>
                <th className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Cliente / Titular</th>
                <th className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Destino del Viaje</th>
                <th className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Fechas & Pax</th>
                <th className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">P.V.P (Cliente)</th>
                <th className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Neto B2B</th>
                <th className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Comisión (Ganas)</th>
                <th className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Estado</th>
                <th className="p-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400 text-sm">
                    No se han encontrado registros de reservas correspondientes a su búsqueda.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* ID */}
                    <td className="p-4 text-xs font-black text-[#0A0F1D] tracking-wider font-mono">
                      {b.id}
                    </td>

                    {/* Client / Titular */}
                    <td className="p-4">
                      <p className="text-xs font-bold text-slate-800">{b.clientName}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                        Agente: {b.agentName}
                      </p>
                    </td>

                    {/* Destination */}
                    <td className="p-4">
                      <p className="text-xs font-bold text-slate-700 truncate max-w-[180px]" title={b.destination}>
                        {b.destination}
                      </p>
                    </td>

                    {/* Dates & Pax */}
                    <td className="p-4 text-xs font-medium text-slate-500">
                      <p className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#1F82D2]" />
                        {b.startDate}
                      </p>
                      <p className="text-[10px] mt-0.5 font-semibold text-slate-400">
                        {b.paxCount} {b.paxCount === 1 ? "Pasajero" : "Pasajeros (PAX)"}
                      </p>
                    </td>

                    {/* PVP Retail Price */}
                    <td className="p-4 text-xs font-extrabold text-slate-900">
                      {b.totalPriceRetail.toLocaleString()} €
                    </td>

                    {/* Wholesale Net */}
                    <td className="p-4 text-xs font-medium text-slate-600">
                      {b.totalPriceNet.toLocaleString()} €
                    </td>

                    {/* Profit */}
                    <td className="p-4 text-xs font-extrabold text-emerald-600 bg-emerald-50/40">
                      +{(b.totalPriceRetail - b.totalPriceNet).toLocaleString()} €
                      <span className="text-[9px] font-medium text-slate-400 block mt-0.5">({b.commissionPercent}%)</span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border flex items-center gap-1.5 ${getStatusBadgeClass(b.status)}`}>
                          {getStatusIcon(b.status)}
                          {b.status}
                        </span>
                      </div>
                    </td>

                    {/* Quick status transitions and proposal generation */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Status cycle trigger button */}
                        <div className="relative group/actions">
                          <button 
                            className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-500 hover:text-[#0A0F1D] transition-all"
                            title="Cambiar estado del expediente"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          {/* Hover Action Menu */}
                          <div className="hidden group-hover/actions:block absolute right-0 top-6 bg-white border border-slate-100 rounded-lg shadow-xl py-1 z-20 w-36 text-left">
                            <button 
                              onClick={() => onUpdateBookingStatus(b.id, "Confirmado")}
                              className="w-full text-xs hover:bg-slate-50 px-3 py-1.5 text-emerald-800 font-bold flex items-center gap-1.5"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                              Confirmado
                            </button>
                            <button 
                              onClick={() => onUpdateBookingStatus(b.id, "Pendiente Pago")}
                              className="w-full text-xs hover:bg-slate-50 px-3 py-1.5 text-amber-800 font-bold flex items-center gap-1.5"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                              Pendiente Pago
                            </button>
                            <button 
                              onClick={() => onUpdateBookingStatus(b.id, "En Revisión")}
                              className="w-full text-xs hover:bg-slate-50 px-3 py-1.5 text-blue-800 font-bold flex items-center gap-1.5"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                              En Revisión
                            </button>
                            <button 
                              onClick={() => onUpdateBookingStatus(b.id, "Cancelado")}
                              className="w-full text-xs hover:bg-slate-50 px-3 py-1.5 text-rose-800 font-bold flex items-center gap-1.5"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                              Cancelado
                            </button>
                          </div>
                        </div>

                        {/* Co-branded PDF/Proposal preview */}
                        <button
                          onClick={() => setSelectedProposalBooking(b)}
                          className="bg-[#0A0F1D] hover:bg-[#003B66] text-white rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-[#0A0F1D]/10"
                          title="Generar propuesta de cliente"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#1F82D2]" />
                          Propuesta
                        </button>

                        {/* Delete entry */}
                        <button
                          onClick={() => {
                            if (confirm(`¿Estás seguro de eliminar el expediente ${b.id}?`)) {
                              onDeleteBooking(b.id);
                            }
                          }}
                          className="hover:bg-rose-50 text-slate-300 hover:text-rose-600 rounded-lg p-1.5 transition-all"
                          title="Eliminar registro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Co-branded Customer Proposal Modal (Print preview / Email export) */}
      {selectedProposalBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col animate-scale-up">
            
            {/* Modal Header controls */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold text-[#0A0F1D] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1F82D2]" />
                Generador de Propuestas Co-Brandeadas de Alta Gama
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir / Guardar PDF
                </button>
                <button
                  onClick={() => setSelectedProposalBooking(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full p-1.5 transition-all"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Print Area content */}
            <div className="p-8 space-y-8 flex-1 overflow-y-auto" id="proposal-print-area">
              
              {/* Co-branding logos area */}
              <div className="flex justify-between items-center border-b-2 border-[#1F82D2] pb-6">
                <div>
                  <p className="text-[10px] font-bold text-[#1F82D2] tracking-widest uppercase mb-1">MAYORISTA EXCLUSIVO</p>
                  <span className="text-lg font-black text-[#0A0F1D] tracking-wider">DYNAMIC TOURS</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">PRESENTADO POR SU AGENCIA</p>
                  <span className="text-sm font-black text-slate-700">{selectedProposalBooking.agencyName}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Asesor: {selectedProposalBooking.agentName}</p>
                </div>
              </div>

              {/* Cover layout */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">PROPUESTA DE VIAJE PERSONALIZADA</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A0F1D] font-serif tracking-tight leading-snug">
                    {selectedProposalBooking.destination}
                  </h2>
                  <p className="text-xs text-[#1F82D2] font-bold tracking-wide">
                    Expediente: #{selectedProposalBooking.id} • Preparado para: {selectedProposalBooking.clientName}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Fecha de Salida</span>
                    <strong className="text-slate-700 text-xs mt-0.5 block">{selectedProposalBooking.startDate}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Duración</span>
                    <strong className="text-slate-700 text-xs mt-0.5 block">Servicio Exclusivo Multi-días</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Número de Viajeros</span>
                    <strong className="text-slate-700 text-xs mt-0.5 block">{selectedProposalBooking.paxCount} {selectedProposalBooking.paxCount === 1 ? "Pasajero" : "Pasajeros (PAX)"}</strong>
                  </div>
                </div>
              </div>

              {/* Itinerary highlight message */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">
                  Detalles del Itinerario de Firma
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Esta propuesta exclusiva engloba una selección rigurosa de servicios en régimen estrictamente privado. Traslados con chófer VIP, visitas a puerta cerrada con guías oficiales en su idioma y alojamiento en hoteles exclusivos de 5 estrellas o superiores seleccionados por nuestro departamento de calidad mayorista.
                </p>
              </div>

              {/* Inclusions summary for clients */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Servicios Incluidos de Alta Gama</h5>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Asistencia VIP en aeropuertos y traslados ejecutivos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Visitas y actividades organizadas en régimen estrictamente privado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Guías locales oficiales bilingües de excelente reputación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Hoteles seleccionados de categoría 5 estrellas / Boutique Lujo</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-sans">Condiciones Generales</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Las tarifas mostradas corresponden al total comisionable consolidado para su grupo. Las reservas de servicios están sujetas a disponibilidad y reconfirmación hasta la emisión final de la documentación mayorista oficial de Dynamic Tours.
                  </p>
                </div>
              </div>

              {/* Total final price display (Net Cost is strictly HIDDEN from client eye) */}
              <div className="border-t-2 border-slate-100 pt-6 flex flex-col items-end justify-center space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">IMPORTE TOTAL CONSOLIDADO P.V.P</span>
                <p className="text-3xl font-black text-[#0A0F1D] font-serif">
                  {selectedProposalBooking.totalPriceRetail.toLocaleString()} €
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Impuestos directos, tasas locales de alojamiento y cargos de gestión incluidos.</p>
              </div>

            </div>

            {/* Modal footer information */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
              <p className="text-[10px] text-slate-400">
                Propuesta digital autogenerada el {new Date().toLocaleDateString("es-ES")} desde el portal B2B de Dynamic Tours. Reservado el derecho a modificaciones.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
