import React, { useState, useEffect } from "react";
import { AIItinerary, Booking } from "../types";
import { 
  Sparkles, 
  Send, 
  Clock, 
  Check, 
  Sliders, 
  DollarSign, 
  HelpCircle, 
  FileText, 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  MapPin, 
  Percent, 
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

interface AIAssistantProps {
  onAddBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  agencyName: string;
  agentName: string;
}

export default function AIAssistant({ onAddBooking, agencyName, agentName }: AIAssistantProps) {
  // Input fields
  const [destination, setDestination] = useState<string>("");
  const [daysCount, setDaysCount] = useState<number>(6);
  const [budget, setBudget] = useState<number>(4500);
  const [preferences, setPreferences] = useState<string>("Luna de miel, alta gastronomía, relax y cultura local");
  const [commission, setCommission] = useState<number>(15);

  // States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState<number>(0);
  const [resultItinerary, setResultItinerary] = useState<AIItinerary | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [showNetPricing, setShowNetPricing] = useState<boolean>(false);

  // Suggested prompt quick clicks
  const quickPrefs = [
    "Luna de miel con villas sobre el agua y playa privada",
    "Aventura ártica, auroras boreales, gastronomía de km 0 y spa de lujo",
    "Safari privado de lujo con vuelos en avioneta privada y guías expertos",
    "Inmersión cultural profunda, templos históricos, ryokanes y artesanía de firma"
  ];

  // Rotating messages on load
  const loadingMessages = [
    "Contactando receptivos exclusivos en destino...",
    "Curando alojamientos de 5* Gran Lujo y hoteles boutique de firma...",
    "Diseñando traslados eficientes en vehículos ejecutivos privados...",
    "Calculando márgenes de comisión óptimos para su agencia...",
    "Generando tips estratégicos de venta y up-selling para el agente..."
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isLoading) {
      timer = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  // Make server fetch to generate the itinerary
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;

    setIsLoading(true);
    setResultItinerary(null);
    setLoadingMessageIndex(0);

    try {
      const response = await fetch("/api/gemini/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          daysCount,
          budget,
          preferences,
          commission
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResultItinerary(data);
        setExpandedDay(1); // Auto-expand day 1
      } else {
        throw new Error("Failed to generate itinerary");
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al conectar con el servidor de diseño inteligente de Dynamic Tours. Por favor, inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Convert AI generated itinerary to a permanent booking
  const handleSaveToBookings = () => {
    if (!resultItinerary) return;

    onAddBooking({
      clientName: `Presupuesto Express: ${destination}`,
      agencyName: agencyName,
      agentName: agentName,
      destination: resultItinerary.title,
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +30 days
      endDate: new Date(Date.now() + (30 + daysCount) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      paxCount: 2, // Default to a standard couple
      totalPriceNet: resultItinerary.estimatedPriceWholesale * 2,
      totalPriceRetail: resultItinerary.estimatedPriceRetail * 2,
      commissionPercent: commission,
      status: "En Revisión"
    });

    alert("¡Itinerario Inteligente Guardado Exitosamente como Reserva/Presupuesto en Revisión!");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header banner */}
      <div className="bg-gradient-to-r from-[#0A0F1D] to-[#1E293B] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#1F82D2] via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#1F82D2] uppercase bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1.5 w-max">
            <Sparkles className="w-3.5 h-3.5" />
            Exclusivo Agentes B2B
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-serif">
            Diseñador de Itinerarios
          </h1>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-2xl">
            Reduzca el tiempo de cotización a medida de horas a segundos. Introduzca los requisitos de su cliente y nuestro sistema inteligente de Dynamic Tours generará un programa de lujo comisionable completo con tácticas de venta de alta conversión.
          </p>
        </div>
      </div>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: AI Generator Form */}
        <form 
          onSubmit={handleGenerate}
          className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-md p-6 space-y-5"
        >
          <h3 className="text-sm font-extrabold text-[#0A0F1D] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#1F82D2]" />
            Parámetros del Viaje
          </h3>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
              Destino Solicitado
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Egipto, Costa Rica, Polinesia, etc."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-[#1F82D2] font-medium text-[#0A0F1D] placeholder-slate-400"
            />
          </div>

          {/* Duration & Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
                Duración (Días)
              </label>
              <input
                type="number"
                min="3"
                max="15"
                value={daysCount}
                onChange={(e) => setDaysCount(Math.max(3, Math.min(15, parseInt(e.target.value) || 5)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-[#1F82D2] font-bold text-[#0A0F1D]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
                Presupuesto (€ / pax)
              </label>
              <input
                type="number"
                min="1000"
                max="25000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Math.max(1000, parseInt(e.target.value) || 3000))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-[#1F82D2] font-bold text-[#0A0F1D]"
              />
            </div>
          </div>

          {/* Commission selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block flex justify-between">
              <span>Porcentaje de Comisión</span>
              <span className="text-[#1F82D2] font-bold">{commission}%</span>
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={commission}
              onChange={(e) => setCommission(parseInt(e.target.value))}
              className="w-full accent-[#1F82D2] cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 font-medium block">
              Calcula automáticamente el neto mayorista frente al P.V.P de venta al público.
            </span>
          </div>

          {/* Preferences Text Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block">
              Preferencias y Estilo de Viaje
            </label>
            <textarea
              rows={3}
              placeholder="Ej: Hoteles con encanto, experiencias gastronómicas exclusivas, guías especializados..."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#1F82D2] font-medium text-[#0A0F1D] placeholder-slate-400 leading-relaxed"
            />
          </div>

          {/* Quick Click preference pills */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Estilos Rápidos de Firma
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrefs.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPreferences(p)}
                  className="bg-slate-50 hover:bg-slate-100 text-[10px] text-slate-600 hover:text-[#0A0F1D] px-2.5 py-1.5 rounded border border-slate-200 text-left line-clamp-1 truncate max-w-full font-medium transition-all"
                  title={p}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0A0F1D] hover:bg-[#003B66] text-white disabled:bg-slate-200 font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#1F82D2]" />
                Diseñando Itinerario de Viaje...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#1F82D2]" />
                Diseñar Itinerario
              </>
            )}
          </button>
        </form>

        {/* Right column: AI Generator Output Result Container */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Default state */}
          {!isLoading && !resultItinerary && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                <Compass className="w-8 h-8 text-[#1F82D2]" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h4 className="text-base font-bold text-[#0A0F1D] font-serif">
                  Esperando Parámetros de Diseño
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Introduzca los requisitos del cliente en el panel de la izquierda y presione "Diseñar Itinerario" para que nuestro consultor inteligente de Dynamic Tours prepare una cotización a medida instantánea.
                </p>
              </div>
            </div>
          )}

          {/* Loading state with reassurance messages */}
          {isLoading && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center space-y-6">
              <div className="relative h-16 w-16 mx-auto flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1F82D2]/20 opacity-75"></span>
                <Loader2 className="w-10 h-10 animate-spin text-[#1F82D2] relative z-10" />
              </div>
              <div className="max-w-md mx-auto space-y-3">
                <h4 className="text-base font-extrabold text-[#0A0F1D] tracking-tight">
                  Diseñando su Experiencia de Firma...
                </h4>
                {/* Rotating loading text */}
                <p className="text-xs text-[#1F82D2] font-semibold bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 w-max mx-auto animate-pulse">
                  {loadingMessages[loadingMessageIndex]}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  El proceso suele tomar entre 10 y 15 segundos mientras nuestro motor Gemini optimiza el itinerario, busca los mejores hoteles boutique y calcula las comisiones mayoristas para su agencia.
                </p>
              </div>
            </div>
          )}

          {/* Result state */}
          {resultItinerary && !isLoading && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 md:p-8 space-y-8 animate-scale-up">
              
              {/* Output Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] font-extrabold text-[#1F82D2] uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded">
                    Itinerario Inteligente de Firma
                  </span>
                  <h2 className="text-xl md:text-3xl font-extrabold text-[#0A0F1D] font-serif tracking-tight leading-snug">
                    {resultItinerary.title}
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm font-semibold">
                    {resultItinerary.subtitle}
                  </p>
                </div>

                {/* Actions inside generated results */}
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    onClick={() => setShowNetPricing(!showNetPricing)}
                    className={`px-3 py-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
                      showNetPricing 
                        ? "bg-[#0A0F1D] border-[#0A0F1D] text-[#1F82D2]"
                        : "bg-emerald-50 border-emerald-100 text-emerald-800"
                    }`}
                  >
                    {showNetPricing ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showNetPricing ? "Ocultar Precios Netos" : "Mostrar Precios Netos Mayorista"}
                  </button>

                  <button
                    onClick={handleSaveToBookings}
                    className="bg-[#0A0F1D] hover:bg-[#003B66] text-white font-bold text-xs uppercase tracking-wider py-2 px-3.5 rounded-lg transition-all shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#1F82D2]" />
                    Guardar Expediente
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Descripción General de la Propuesta
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  {resultItinerary.summary}
                </p>
              </div>

              {/* B2B Pricing Block */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Precio de Venta Sugerido (P.V.P.)
                  </p>
                  <p className="text-2xl font-black text-[#0A0F1D] mt-0.5">
                    {resultItinerary.estimatedPriceRetail.toLocaleString()} €
                    <span className="text-xs font-bold text-slate-400 ml-1">/ pax</span>
                  </p>
                </div>

                <div className="sm:text-right sm:pl-6 sm:border-l sm:border-slate-200">
                  {showNetPricing ? (
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Neto Mayorista B2B (Coste de Compra)
                      </p>
                      <p className="text-lg font-bold text-slate-700 mt-0.5">
                        {resultItinerary.estimatedPriceWholesale.toLocaleString()} €
                      </p>
                      <p className="text-xs font-black text-emerald-600 mt-0.5">
                        Margen de ganancia: +{(resultItinerary.estimatedPriceRetail - resultItinerary.estimatedPriceWholesale).toLocaleString()} € por pasajero
                      </p>
                    </div>
                  ) : (
                    <div className="bg-emerald-100 text-emerald-800 border border-emerald-200 rounded px-2.5 py-1 text-xs font-extrabold">
                      Comisión {commission}% Garantizada
                    </div>
                  )}
                </div>
              </div>

              {/* Daily activities Accordion */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                  Programa Diario Detallado
                </h4>

                <div className="space-y-3">
                  {resultItinerary.days.map((day) => {
                    const isExpanded = expandedDay === day.dayNumber;
                    return (
                      <div 
                        key={day.dayNumber} 
                        className="border border-slate-100 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                      >
                        {/* Accordion header */}
                        <button
                          onClick={() => setExpandedDay(isExpanded ? null : day.dayNumber)}
                          className="w-full text-left p-4 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-6 w-6 rounded-full bg-[#0A0F1D] text-[#1F82D2] flex items-center justify-center text-[10px] font-black shrink-0">
                              {day.dayNumber}
                            </span>
                            <div>
                              <p className="text-[9px] font-bold text-[#1F82D2] uppercase tracking-wider">
                                {day.location.toUpperCase()}
                              </p>
                              <h5 className="text-xs font-bold text-[#0A0F1D] font-serif leading-none mt-0.5">
                                {day.title}
                              </h5>
                            </div>
                          </div>
                          <span className="text-slate-400 shrink-0 ml-4">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </span>
                        </button>

                        {/* Accordion content */}
                        {isExpanded && (
                          <div className="p-4 md:p-6 space-y-4.5 border-t border-slate-100 text-xs">
                            
                            {/* Day portions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Mañana</span>
                                <p className="text-slate-600 leading-relaxed text-xs">{day.morning}</p>
                              </div>
                              <div className="space-y-1 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Tarde</span>
                                <p className="text-slate-600 leading-relaxed text-xs">{day.afternoon}</p>
                              </div>
                              <div className="space-y-1 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Noche</span>
                                <p className="text-slate-600 leading-relaxed text-xs">{day.evening}</p>
                              </div>
                            </div>

                            {/* Accommodation */}
                            <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                              <div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Alojamiento de Firma Seleccionado</span>
                                <p className="font-bold text-[#0A0F1D] mt-0.5">{day.accommodation}</p>
                              </div>
                              <span className="text-[10px] bg-[#1F82D2]/20 text-[#0A0F1D] px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">
                                5★ Lujo Garantizado
                              </span>
                            </div>

                            {/* Upsell tip / Strategy for agent */}
                            <div className="bg-[#1F82D2]/10 border border-[#1F82D2]/20 p-4 rounded-xl space-y-1.5">
                              <span className="text-[10px] font-black text-[#AA7C11] uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Estrategia de Venta e Incremental (Tip de Upsell para el Agente)
                              </span>
                              <p className="text-[11px] text-[#0A0F1D] leading-relaxed font-semibold">
                                {day.agentUpsellTips}
                              </p>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Agent Executive Summary */}
              <div className="bg-[#0A0F1D] text-white p-6 rounded-2xl border border-[#0A0F1D] space-y-2 relative overflow-hidden shadow-md">
                <div className="absolute right-0 bottom-0 top-0 w-1/4 opacity-10 pointer-events-none">
                  <Sparkles className="w-full h-full text-white" />
                </div>
                <div className="relative z-10 space-y-2">
                  <h4 className="text-[10px] font-black text-[#1F82D2] uppercase tracking-widest">
                    Resumen Ejecutivo de la Mayorista (B2B Sales Guide)
                  </h4>
                  <p className="text-xs text-slate-100 leading-relaxed font-medium">
                    {resultItinerary.agentExecutiveSummary}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
