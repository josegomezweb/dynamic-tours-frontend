import React, { useState } from "react";
import { 
  Compass, 
  Sparkles, 
  Briefcase, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  Users, 
  Globe, 
  BookOpen, 
  Download, 
  PhoneCall, 
  Percent, 
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  FileText,
  Calendar,
  ChevronRight,
  Info
} from "lucide-react";
import { Booking } from "../types";

interface HomeProps {
  setActiveTab: (tab: string) => void;
  bookings: Booking[];
  agencyName: string;
  agentName: string;
}

export default function Home({ setActiveTab, bookings, agencyName, agentName }: HomeProps) {
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Calculate stats based on real bookings
  const activeBookings = bookings.filter(b => b.status !== "Cancelado");
  const totalVolume = activeBookings.reduce((sum, b) => sum + b.totalPriceRetail, 0);
  const totalCommission = activeBookings.reduce((sum, b) => sum + (b.totalPriceRetail - b.totalPriceNet), 0);

  // Custom high-end news articles
  const newsCampaigns = [
    {
      id: 1,
      tag: "Operación Especial",
      title: "Egipto desde Provincias: Vuelos Chárter Directos",
      date: "Salidas Otoño - Invierno 2026",
      desc: "Reserve plazas garantizadas desde aeropuertos de provincias españoles como Zaragoza, Bilbao, Asturias, Valencia o Santiago con vuelos directos. Comisiones preferentes y cupos aéreos 100% asegurados.",
      image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80",
      targetTab: "catalog",
      highlights: ["Vuelo chárter directo sin escalas", "Crucero 5★ Pensión Completa", "Guía Egiptólogo nativo en español"]
    },
    {
      id: 2,
      tag: "Destino Destacado",
      title: "Tesoros de Turquía y Capadocia Confort",
      date: "Cupos Garantizados 2026/2027",
      desc: "Nuestro circuito estrella con estancias cuidadas en Estambul y Capadocia. Incluye visitas arqueológicas guiadas, traslados internos de alta gama y facilidades de reservas express para minoristas.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80",
      targetTab: "ai-builder",
      highlights: ["Hoteles seleccionados de 4★/5★", "Vuelos internos incluidos", "Paseo opcional en globo sobre Capadocia"]
    },
    {
      id: 3,
      tag: "Gran Ruta Cultural",
      title: "Uzbekistán: El Alma de la Ruta de la Seda",
      date: "Salidas semanales garantizadas",
      desc: "Una inmersión profunda en Samarcanda, Bujará y Jiva. Transporte terrestre exclusivo, billetes de tren rápido incluidos y un 15% de comisión neta base para agencias minoristas.",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
      targetTab: "bookings",
      highlights: ["Tren rápido Tashkent - Samarcanda", "Guías oficiales en español", "Hoteles con encanto tradicional"]
    }
  ];

  // Marketing materials list
  const materials = [
    {
      title: "Catálogo de Grandes Viajes 2026",
      size: "14.2 MB",
      format: "PDF Co-Brandeable",
      downloads: 412
    },
    {
      title: "Plantillas de Redes Sociales - Lujo",
      size: "45.8 MB",
      format: "ZIP / Canva Links",
      downloads: 873
    },
    {
      title: "Dossier de Seguros de Viaje Exclusivos",
      size: "2.1 MB",
      format: "PDF",
      downloads: 198
    },
    {
      title: "Video Inspiracional Maldivas 4K",
      size: "180 MB",
      format: "MP4 de alta resolución",
      downloads: 320
    }
  ];

  const handleDownload = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A0F1D] via-[#043457] to-[#0A436E] text-white shadow-xl border border-[#0A0F1D] p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(197,160,89,0.15),_transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 opacity-10 pointer-events-none">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 80 C 40 10, 60 10, 90 80" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M20 70 C 45 20, 55 20, 80 70" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F82D2]/20 text-[#1F82D2] border border-[#1F82D2]/30 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            Socio Preferente Elite
          </span>
          
          <h1 className="text-3xl md:text-5xl font-extrabold font-serif leading-tight tracking-tight">
            Diseñamos Experiencias Extraordinarias de Viaje Mayorista
          </h1>
          
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-2xl font-light">
            Bienvenido de nuevo, <strong className="text-white font-bold">{agentName}</strong>. Su portal de confianza en <strong className="text-[#1F82D2]">{agencyName}</strong> está listo para cotizar, gestionar y formalizar sus itinerarios de viaje.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab("ai-builder")}
              className="bg-[#1F82D2] hover:bg-[#D4AF37] text-[#0A0F1D] font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Probar Cotizador Inteligente
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl border border-white/10 transition-all flex items-center gap-2"
            >
              Explorar Catálogo
              <ArrowRight className="w-4 h-4 text-[#1F82D2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Agency Health Dashboard Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Expedientes Activos</span>
            <p className="text-3xl font-black text-[#0A0F1D] font-serif">{activeBookings.length}</p>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 w-max mt-1">
              <CheckCircle className="w-3 h-3" />
              Sincronizado Mayorista
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#0A0F1D]">
            <Briefcase className="w-6 h-6 text-[#1F82D2]" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Volumen Administrado</span>
            <p className="text-3xl font-black text-[#0A0F1D] font-serif">{totalVolume.toLocaleString()} €</p>
            <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded block mt-1">
              Precio Venta al Público (P.V.P.)
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#0A0F1D]">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#0A0F1D] p-6 rounded-2xl shadow-lg flex items-center justify-between text-white transition-all hover:shadow-xl border border-[#0A0F1D]">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#1F82D2] uppercase tracking-widest block">Comisiones Acumuladas</span>
            <p className="text-3xl font-black text-white font-serif">{totalCommission.toLocaleString()} €</p>
            <span className="text-[10px] text-[#1F82D2] font-bold bg-white/10 px-2.5 py-1 rounded border border-white/10 block mt-1 w-max">
              Garantía de Pago Inmediato
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
            <Percent className="w-6 h-6 text-[#1F82D2]" />
          </div>
        </div>

      </div>

      {/* Main Core Shortcuts */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
          Consola y Herramientas Principales B2B
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0A0F1D] group-hover:bg-[#0A0F1D] group-hover:text-white transition-colors">
                <Globe className="w-5 h-5 text-[#1F82D2]" />
              </div>
              <h4 className="text-base font-extrabold text-[#0A0F1D] font-serif group-hover:text-[#1F82D2] transition-colors">
                Catálogo de Firmas
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Explore nuestra selección exclusiva de rutas combinadas con servicios privados de alta gama, hoteles boutique y asistencia 24/7 en destino.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("catalog")}
              className="text-xs font-bold text-[#0A0F1D] hover:text-[#1F82D2] flex items-center gap-1 pt-2 transition-colors w-max"
            >
              Ver Catálogo Completo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#0A0F1D] group-hover:bg-[#0A0F1D] group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5 text-[#1F82D2]" />
              </div>
              <h4 className="text-base font-extrabold text-[#0A0F1D] font-serif group-hover:text-[#1F82D2] transition-colors">
                Diseñador de Itinerarios Exprés
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Utilice el motor de diseño avanzado de Dynamic Tours para generar cotizaciones complejas a medida en tiempo récord con tácticas de up-selling.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("ai-builder")}
              className="text-xs font-bold text-[#0A0F1D] hover:text-[#1F82D2] flex items-center gap-1 pt-2 transition-colors w-max"
            >
              Comenzar a Cotizar
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#0A0F1D] group-hover:bg-[#0A0F1D] group-hover:text-white transition-colors">
                <Briefcase className="w-5 h-5 text-[#1F82D2]" />
              </div>
              <h4 className="text-base font-extrabold text-[#0A0F1D] font-serif group-hover:text-[#1F82D2] transition-colors">
                Control de Expedientes
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Supervise el estado de sus reservas, emita facturas proforma, actualice el ciclo de pago y genere propuestas co-brandeadas impecables para su cliente.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("bookings")}
              className="text-xs font-bold text-[#0A0F1D] hover:text-[#1F82D2] flex items-center gap-1 pt-2 transition-colors w-max"
            >
              Gestionar Mis Reservas
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Campaigns and Promos Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Campaigns Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Campañas Destacadas & Salidas de Firma
            </h3>
            <span className="text-[10px] text-[#1F82D2] font-bold uppercase bg-slate-100 px-2.5 py-1 rounded">
              Actualizado hoy
            </span>
          </div>

          <div className="space-y-4">
            {newsCampaigns.map((n) => (
              <div 
                key={n.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-all group"
              >
                {/* Visual */}
                <div className="sm:w-1/3 relative h-48 sm:h-auto overflow-hidden">
                  <img 
                    src={n.image} 
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A0F1D] text-[#1F82D2] border border-[#0A0F1D] px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider">
                    {n.tag}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#1F82D2] uppercase tracking-wider">{n.date}</p>
                    <h4 className="text-lg font-extrabold text-[#0A0F1D] font-serif leading-tight">
                      {n.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {n.desc}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {n.highlights.map((h, idx) => (
                        <span 
                          key={idx} 
                          className="bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3 text-[#1F82D2]" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                    <button
                      onClick={() => setSelectedNews(n.id)}
                      className="text-xs font-extrabold text-slate-500 hover:text-[#0A0F1D] flex items-center gap-1 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      Más Información
                    </button>

                    <button
                      onClick={() => setActiveTab(n.targetTab)}
                      className="bg-[#0A0F1D] hover:bg-[#003B66] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      Comenzar Cotización
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Marketing Downloads and Direct Support */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Section: Download Center */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1F82D2]" />
              Materiales y Dossieres B2B
            </h3>

            {downloadSuccess && (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>¡Descarga iniciada de: {downloadSuccess}!</span>
              </div>
            )}

            <div className="divide-y divide-slate-100">
              {materials.map((m, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between first:pt-0 last:pb-0 gap-3">
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-bold text-slate-800 line-clamp-1">{m.title}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {m.format} • {m.size}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownload(m.title)}
                    className="p-2 bg-slate-50 hover:bg-[#0A0F1D] hover:text-[#1F82D2] rounded-lg border border-slate-100 text-slate-500 transition-all flex items-center justify-center shrink-0"
                    title="Descargar material"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Direct Mayorista Agent Care */}
          <div className="bg-gradient-to-br from-[#0A0F1D] to-[#0A3252] text-white rounded-2xl p-6 shadow-md relative overflow-hidden border border-[#0A0F1D] space-y-4">
            <div className="absolute right-0 bottom-0 opacity-10">
              <PhoneCall className="w-24 h-24 text-white" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] text-[#1F82D2] font-black uppercase tracking-widest block">
                  ATENCIÓN TELEFÓNICA VIP
                </span>
                <h4 className="text-base font-extrabold font-serif">
                  ¿Necesita asistencia inmediata con un grupo o cotización?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Nuestros supervisores de reservas de Dynamic Tours están disponibles de lunes a domingo para ayudarle a cerrar ventas complejas con servicios terrestres a medida.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between items-center bg-white/5 px-3.5 py-2.5 rounded-lg border border-white/10">
                  <span className="text-slate-300 font-semibold">Línea Directa Agentes</span>
                  <strong className="text-[#1F82D2] font-black">+34 910 888 222</strong>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-3.5 py-2.5 rounded-lg border border-white/10">
                  <span className="text-slate-300 font-semibold">Urgencias en Destino</span>
                  <strong className="text-emerald-400 font-black">+34 600 999 999</strong>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Frequently Asked Questions (FAQ Accordion) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">
        <div className="space-y-1.5 border-b border-slate-100 pb-4">
          <span className="text-[10px] font-bold text-[#1F82D2] uppercase tracking-widest">
            Soporte Operativo B2B
          </span>
          <h3 className="text-lg font-extrabold text-[#0A0F1D] font-serif">
            Preguntas Frecuentes de Agencias de Viajes
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="space-y-1.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h5 className="font-bold text-[#0A0F1D] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#1F82D2]" />
              ¿Cuáles son los plazos de confirmación de servicios terrestres?
            </h5>
            <p className="leading-relaxed">
              Los servicios en régimen estrictamente privado (guías, vehículos, traslados) suelen confirmarse en un plazo máximo de 24 a 48 horas laborables desde la recepción de la reserva en firme.
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h5 className="font-bold text-[#0A0F1D] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#1F82D2]" />
              ¿Cómo puedo modificar el porcentaje de comisión predefinido?
            </h5>
            <p className="leading-relaxed">
              En el panel de su Cotizador Inteligente o durante la exploración del Catálogo, puede deslizar el selector de porcentaje. El sistema reajustará automáticamente los valores neto y de venta (P.V.P.) al instante.
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h5 className="font-bold text-[#0A0F1D] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#1F82D2]" />
              ¿Las cotizaciones autogeneradas bloquean plazas reales?
            </h5>
            <p className="leading-relaxed">
              No. El Cotizador Inteligente simula propuestas realistas basadas en disponibilidad de calidad mayorista. Para formalizar la reserva, bloquear plazas y garantizar vuelos, debe guardar el expediente y confirmar con su agente asignado.
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h5 className="font-bold text-[#0A0F1D] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#1F82D2]" />
              ¿La propuesta PDF para el cliente muestra información de costes netos?
            </h5>
            <p className="leading-relaxed">
              No. Las propuestas del generador co-brandeado de Dynamic Tours están rigurosamente auditadas para que muestren únicamente el precio final unificado de Venta al Público (P.V.P.), manteniendo a salvo su margen comercial.
            </p>
          </div>
        </div>
      </div>

      {/* Campaign detail modal */}
      {selectedNews !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scale-up">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-[#1F82D2] uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                {newsCampaigns.find(n => n.id === selectedNews)?.tag}
              </span>
              <button 
                onClick={() => setSelectedNews(null)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-sm"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xl font-extrabold font-serif text-[#0A0F1D]">
                {newsCampaigns.find(n => n.id === selectedNews)?.title}
              </h4>
              <p className="text-xs text-[#1F82D2] font-bold">
                {newsCampaigns.find(n => n.id === selectedNews)?.date}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {newsCampaigns.find(n => n.id === selectedNews)?.desc}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <h5 className="text-[10px] font-black text-[#0A0F1D] uppercase tracking-widest">
                Detalles del Programa de Firma
              </h5>
              <ul className="space-y-1 text-xs text-slate-500">
                <li className="flex items-center gap-1.5">✓ Vuelos ida y vuelta en línea regular exclusiva</li>
                <li className="flex items-center gap-1.5">✓ Alojamiento en hoteles superiores calificados de 5★</li>
                <li className="flex items-center gap-1.5">✓ Seguro de asistencia médica multiasistencia incluido</li>
                <li className="flex items-center gap-1.5">✓ Soporte VIP exclusivo en español en destino</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setSelectedNews(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  const targetTab = newsCampaigns.find(n => n.id === selectedNews)?.targetTab;
                  if (targetTab) {
                    setActiveTab(targetTab);
                  }
                  setSelectedNews(null);
                }}
                className="bg-[#0A0F1D] hover:bg-[#003B66] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all"
              >
                Comenzar Cotización
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
