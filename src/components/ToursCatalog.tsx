import React, { useState } from "react";
import { Tour, Booking } from "../types";
import { SAMPLE_TOURS } from "../data";
import { assetUrl } from "../utils/assets";
import { 
  Globe, 
  Clock, 
  Award, 
  Check, 
  X, 
  ChevronRight, 
  Sparkles, 
  Info, 
  Percent, 
  DollarSign, 
  ChevronDown, 
  FileText,
  Calendar,
  Users,
  Building,
  Sliders,
  Send,
  Eye,
  EyeOff
} from "lucide-react";

interface ToursCatalogProps {
  onAddBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  agencyName: string;
  agentName: string;
}

export default function ToursCatalog({ onAddBooking, agencyName, agentName }: ToursCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  
  // Pricing toggle for agents: true hides wholesale prices, ideal for showing screens to retail customers
  const [showRetailOnly, setShowRetailOnly] = useState<boolean>(true);
  
  // Dynamic pricing customizer for agents
  const [customMarkup, setCustomMarkup] = useState<number>(15); // Default 15% commission
  
  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingClientName, setBookingClientName] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingPaxCount, setBookingPaxCount] = useState<number>(2);

  // Filtered tours
  const filteredTours = SAMPLE_TOURS.filter(tour => {
    const matchesCategory = selectedCategory === "Todos" || tour.category === selectedCategory;
    const matchesSearch = tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tour.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["Todos", "Cultura", "Playa"];

  // Calculate dynamic pricing based on selected tour & markup
  const calculatePricing = (tour: Tour) => {
    const wholesale = tour.wholesalePrice;
    const retail = Math.round(wholesale / (1 - customMarkup / 100));
    const profit = retail - wholesale;
    return { wholesale, retail, profit };
  };

  const handleOpenBookingModal = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingModalOpen(true);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTour || !bookingClientName || !bookingDate) return;

    const pricing = calculatePricing(selectedTour);
    
    // Add booking via state callback
    onAddBooking({
      clientName: bookingClientName,
      agencyName: agencyName,
      agentName: agentName,
      destination: selectedTour.title,
      startDate: bookingDate,
      endDate: calculateEndDate(bookingDate, selectedTour.duration),
      paxCount: bookingPaxCount,
      totalPriceNet: pricing.wholesale * bookingPaxCount,
      totalPriceRetail: pricing.retail * bookingPaxCount,
      commissionPercent: customMarkup,
      status: "En Revisión"
    });

    // Reset states and close modals
    setIsBookingModalOpen(false);
    setBookingClientName("");
    setBookingDate("");
    setBookingPaxCount(2);
    setSelectedTour(null);
    
    // Show success alert in custom banner
    alert(`¡Petición de Reserva B2B Enviada Exitosamente!\nSe ha guardado en tu panel de gestión de reservas.`);
  };

  const calculateEndDate = (start: string, duration: number): string => {
    const date = new Date(start);
    date.setDate(date.getDate() + duration);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Banner / Selector Header */}
      <div className="bg-gradient-to-r from-[#0A0F1D] to-[#1E293B] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none">
          {/* Geometrical decoration pattern to avoid low-effort gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#1F82D2] via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#1F82D2] uppercase bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            Diseño Exclusivo Mayorista
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-serif">
            Nuestros Viajes de Firma B2B
          </h1>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-2xl">
            Exclusivos itinerarios con servicios garantizados 100% privados y tarifas comisionables óptimas. Diseñados para optimizar la conversión de su agencia y encantar a sus clientes más exigentes.
          </p>
        </div>
      </div>

      {/* Control Bar: Search & Pricing Settings */}
      <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar por destino, palabra clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#1F82D2] transition-all text-[#0A0F1D] placeholder-slate-400 font-medium"
          />
          <span className="absolute right-3.5 top-3 text-slate-400">
            <Globe className="w-4 h-4" />
          </span>
        </div>

        {/* Dynamic Controls */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Mode Toggle: Show/Hide Net Price for Client Interactions */}
          <button
            onClick={() => setShowRetailOnly(!showRetailOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              showRetailOnly 
                ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                : "bg-[#0A0F1D] border-[#0A0F1D] text-[#1F82D2]"
            }`}
            title={showRetailOnly ? "Habilitado para mostrar frente al cliente final" : "Mostrando precios de compra neto B2B"}
          >
            {showRetailOnly ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {showRetailOnly ? "Modo: Mostrar Cliente (Ocultar Neto B2B)" : "Modo: Diseñador B2B (Ver Precios Netos)"}
          </button>

          {/* Dynamic Markup Modifier */}
          <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-[#1F82D2]" />
              Margen de Comisión:
            </span>
            <input
              type="number"
              min="5"
              max="40"
              value={customMarkup}
              onChange={(e) => setCustomMarkup(Math.max(5, Math.min(40, parseInt(e.target.value) || 15)))}
              className="w-12 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs font-bold text-center text-[#0A0F1D] focus:outline-none focus:border-[#1F82D2]"
            />
            <span className="text-xs font-bold text-slate-600">%</span>
          </div>

        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4.5 py-2 rounded-full text-xs font-bold tracking-wide uppercase border transition-all duration-200 whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-[#0A0F1D] border-[#0A0F1D] text-[#1F82D2] shadow-md"
                : "bg-white border-slate-200 text-slate-500 hover:border-[#0A0F1D] hover:text-[#0A0F1D]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTours.map((tour) => {
          const pricing = calculatePricing(tour);
          return (
            <div 
              key={tour.id} 
              className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              
              {/* Tour Image & Badges */}
              <div className="h-56 relative overflow-hidden">
                <img
                  src={assetUrl(tour.image)}
                  alt={tour.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Upper absolute badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#0A0F1D]/90 text-[#1F82D2] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-md backdrop-blur-sm border border-[#1F82D2]/20">
                    {tour.category}
                  </span>
                  <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-md shadow flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#1F82D2]" />
                    {tour.duration} días / {tour.duration - 1} noches
                  </span>
                </div>

                {/* Bottom title inside the image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-semibold text-[#1F82D2] uppercase tracking-widest mb-1">
                    {tour.destination.toUpperCase()}
                  </p>
                  <h3 className="text-lg font-bold font-serif leading-snug line-clamp-1">
                    {tour.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                  {tour.summary}
                </p>

                {/* Highlights Summary */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Puntos Clave del Programa
                  </p>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {tour.highlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Block with B2B toggle support */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4.5 flex items-center justify-between gap-4">
                  {/* Retail client price (always visible) */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Precio de Venta Sugerido (P.V.P.)
                    </p>
                    <p className="text-2xl font-black text-[#0A0F1D] mt-0.5">
                      {pricing.retail.toLocaleString()} <span className="text-xs font-bold">€</span>
                      <span className="text-[10px] text-slate-400 font-medium ml-1">/ pax</span>
                    </p>
                  </div>

                  {/* Net cost for agent B2B - hidden if showRetailOnly is enabled */}
                  <div className="text-right pl-4 border-l border-slate-200">
                    {showRetailOnly ? (
                      <div className="flex flex-col items-end justify-center py-2">
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-bold">
                          Comisión {customMarkup}% Incl.
                        </span>
                        <p className="text-[9px] text-slate-400 font-medium mt-1">Precio Neto Mayorista Oculto</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-end gap-1">
                          Neto B2B a Pagar
                        </p>
                        <p className="text-lg font-bold text-slate-700 mt-0.5">
                          {pricing.wholesale.toLocaleString()} <span className="text-xs font-bold">€</span>
                        </p>
                        <p className="text-[11px] font-extrabold text-[#1F82D2] mt-0.5">
                          Tú ganas: +{pricing.profit.toLocaleString()}€
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedTour(tour)}
                    className="flex-1 bg-white border border-slate-200 hover:border-[#0A0F1D] text-[#0A0F1D] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-all text-center"
                  >
                    Detalles e Itinerario
                  </button>
                  <button
                    onClick={() => handleOpenBookingModal(tour)}
                    className="flex-1 bg-[#0A0F1D] hover:bg-[#003B66] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-[#1F82D2]" />
                    Reservar B2B
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Tour Details Modal (Deep Dive) */}
      {selectedTour && !isBookingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-scale-up">
            
            {/* Header image & Close Button */}
            <div className="h-64 md:h-80 relative">
              <img
                src={assetUrl(selectedTour.image)}
                alt={selectedTour.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              
              <button
                onClick={() => setSelectedTour(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md transition-all border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="bg-[#1F82D2] text-[#0A0F1D] text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded">
                  {selectedTour.category}
                </span>
                <h2 className="text-xl md:text-3xl font-extrabold tracking-tight font-serif">
                  {selectedTour.title}
                </h2>
                <p className="text-slate-300 text-xs md:text-sm flex items-center gap-3">
                  <span>Destino: <strong>{selectedTour.destination}</strong></span>
                  <span>•</span>
                  <span>Duración: <strong>{selectedTour.duration} días / {selectedTour.duration - 1} noches</strong></span>
                  <span>•</span>
                  <span>Hoteles: <strong>{selectedTour.hotelCategory}</strong></span>
                </p>
              </div>
            </div>

            {/* Modal Body Grid */}
            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Itinerary breakdown */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                    Programa Detallado Día a Día
                  </h4>
                  <div className="space-y-6">
                    {selectedTour.itinerary.map((day) => (
                      <div key={day.day} className="flex gap-4 items-start relative pl-6 border-l border-slate-100 last:border-0 pb-1">
                        {/* Day indicator node */}
                        <div className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-[#0A0F1D] flex items-center justify-center text-white text-[10px] font-bold border-4 border-white shadow-sm">
                          {day.day}
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-bold text-[#0A0F1D] font-serif">
                            {day.title}
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {day.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Inclusions, Exclusions & Dynamic Quotation tool */}
              <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                
                {/* Agent Dynamic Pricing Panel */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-[#1F82D2]" />
                    Calculadora de Cotización B2B
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Comisión de su agencia:</span>
                      <span className="font-bold text-[#0A0F1D]">{customMarkup}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={customMarkup}
                      onChange={(e) => setCustomMarkup(parseInt(e.target.value))}
                      className="w-full accent-[#1F82D2]"
                    />
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Neto Mayorista:</span>
                      <span className="font-semibold text-slate-700">
                        {calculatePricing(selectedTour).wholesale.toLocaleString()}€
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Precio Sugerido P.V.P:</span>
                      <span className="font-semibold text-slate-700">
                        {calculatePricing(selectedTour).retail.toLocaleString()}€
                      </span>
                    </div>
                    <div className="border-t border-slate-100 pt-2 flex justify-between text-xs font-extrabold text-[#0A0F1D]">
                      <span>Su Ganancia por Pax:</span>
                      <span className="text-[#1F82D2] bg-slate-50 px-2 py-0.5 rounded">
                        +{calculatePricing(selectedTour).profit.toLocaleString()}€
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Servicios Incluidos
                  </h5>
                  <ul className="space-y-2">
                    {selectedTour.inclusions.map((inc, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    No Incluido
                  </h5>
                  <ul className="space-y-2">
                    {selectedTour.exclusions.map((exc, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions inside Modal */}
                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => handleOpenBookingModal(selectedTour)}
                    className="w-full bg-[#0A0F1D] hover:bg-[#003B66] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-all shadow flex items-center justify-center gap-2"
                  >
                    Solicitar Reserva B2B
                  </button>
                  <button
                    onClick={() => setSelectedTour(null)}
                    className="w-full bg-white hover:bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest py-3 rounded-lg border border-slate-200 transition-all"
                  >
                    Cerrar Detalle
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Booking Form Overlay Modal */}
      {isBookingModalOpen && selectedTour && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form 
            onSubmit={handleSubmitBooking}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-6 animate-scale-up"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#1F82D2] uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">
                  Petición de Reserva B2B
                </span>
                <h3 className="text-lg font-bold text-[#0A0F1D] font-serif mt-1">
                  {selectedTour.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Agency Metadata (ReadOnly display for transparency) */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Agencia Minorista</p>
                  <p className="text-xs font-bold text-slate-700 truncate">{agencyName}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Agente Solicitante</p>
                  <p className="text-xs font-bold text-slate-700 truncate">{agentName}</p>
                </div>
              </div>

              {/* Client Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
                  Nombre de la Familia o Cliente Titular
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Familia García Fernández"
                  value={bookingClientName}
                  onChange={(e) => setBookingClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-[#1F82D2] font-medium text-[#0A0F1D]"
                />
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
                    Fecha de Salida
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-[#1F82D2] text-slate-700 font-medium"
                  />
                </div>

                {/* Pax Count Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
                    Pasajeros (PAX)
                  </label>
                  <select
                    value={bookingPaxCount}
                    onChange={(e) => setBookingPaxCount(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-[#1F82D2] text-slate-700 font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Pasajero" : "Pasajeros"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing breakdown summary */}
              <div className="border-t border-dashed border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Precio Total Estimado Cliente (P.V.P.):</span>
                  <span className="font-bold text-slate-700">
                    {(calculatePricing(selectedTour).retail * bookingPaxCount).toLocaleString()} €
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Neto Mayorista a Facturar (B2B):</span>
                  <span className="font-bold text-slate-700">
                    {(calculatePricing(selectedTour).wholesale * bookingPaxCount).toLocaleString()} €
                  </span>
                </div>
                <div className="flex justify-between text-xs font-extrabold text-[#0A0F1D] bg-emerald-50 p-2 rounded border border-emerald-100">
                  <span className="text-emerald-800">Comisión de su Agencia ({customMarkup}%):</span>
                  <span className="text-emerald-800">
                    {((calculatePricing(selectedTour).retail - calculatePricing(selectedTour).wholesale) * bookingPaxCount).toLocaleString()} €
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-all shadow flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-emerald-100" />
                Confirmar Envío
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
