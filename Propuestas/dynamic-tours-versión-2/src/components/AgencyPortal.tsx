import React, { useState, useRef } from "react";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Download, 
  CheckCircle, 
  Sliders, 
  Globe, 
  FileText, 
  Sparkles, 
  Upload, 
  DollarSign, 
  Settings, 
  Code, 
  Workflow, 
  Percent, 
  Printer, 
  ArrowRight, 
  Lock,
  Clock,
  Plane,
  ShieldCheck,
  Eye,
  Check
} from "lucide-react";

interface AgencyPortalProps {
  agencyName: string;
  agentName: string;
}

export default function AgencyPortal({ agencyName, agentName }: AgencyPortalProps) {
  // B2B Config State
  const [markup, setMarkup] = useState<number>(10); // user markup percentage
  const [commissionRate, setCommissionRate] = useState<number>(12); // commission tier
  const [customLogoName, setCustomLogoName] = useState<string>("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [b2bAgencyName, setB2bAgencyName] = useState<string>(agencyName);
  const [agencyLic, setAgencyLic] = useState<string>("GC-48192");
  
  // Tab states
  const [activeSubTab, setActiveSubTab] = useState<"autogestion" | "flow" | "specs">("autogestion");
  
  // Interactive Flow Simulator States
  const [selectedDestination, setSelectedDestination] = useState<string>("egipto");
  const [selectedDuration, setSelectedDuration] = useState<number>(8);
  const [passengerCount, setPassengerCount] = useState<number>(2);
  const [hotelCategory, setHotelCategory] = useState<"standard" | "superior" | "luxury">("superior");
  
  // Booking download modal simulator
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);
  const [downloadedDocName, setDownloadedDocName] = useState<string>("");

  // Logo file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Egypt baseline numbers
  const destinationsData: Record<string, { basePrice: number; name: string; icon: string }> = {
    egipto: { basePrice: 909, name: "Maravillas Del Nilo (Egipto)", icon: "🐫" },
    turquia: { basePrice: 749, name: "Turquía Fascinante", icon: "🕌" },
    crucero: { basePrice: 1250, name: "Crucero de Lujo Mediterráneo", icon: "🚢" }
  };

  const currentDest = destinationsData[selectedDestination] || destinationsData.egipto;
  
  // Calculate pricing based on logic
  const hotelMultiplier = hotelCategory === "standard" ? 0.9 : hotelCategory === "superior" ? 1.0 : 1.25;
  const rawNetPricePerPerson = Math.round(currentDest.basePrice * hotelMultiplier);
  const rawNetPriceTotal = rawNetPricePerPerson * passengerCount;
  
  // Retail Agent Pricing:
  // Net price received from wholesaler (includes agent commission)
  const agentCommission = Math.round(rawNetPriceTotal * (commissionRate / 100));
  const netPayToWholesaler = rawNetPriceTotal - agentCommission;
  
  // Retail markup over the base total price to show the customer
  const clientMarkupValue = Math.round(rawNetPriceTotal * (markup / 100));
  const clientFinalPrice = rawNetPriceTotal + clientMarkupValue;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomLogoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerDownload = (docType: string, filename: string) => {
    setDownloadingDoc(docType);
    setDownloadedDocName(filename);
    setDownloadProgress(0);
    setDownloadCompleted(false);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadCompleted(true);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="agency-portal-root">
      
      {/* Top Main Banner with executive tech style */}
      <div className="bg-gradient-to-r from-[#002B49] to-[#0D446E] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-100/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-max flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              Módulo de Integración y Consultoría B2B
            </span>
            <h1 className="text-3xl font-bold font-serif leading-tight">
              Portal Privado & Gestión de Agencias Minoristas
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Consola exclusiva diseñada para optimizar los flujos de cotización inmediata, configuración de comisiones cruzadas, autogestión de expedientes y prototipado de alta fidelidad para el desarrollo del panel minorista.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 shrink-0 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-100">Estado de Operativa</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Canal API Activo</span>
            </div>
            <p className="text-[10px] text-slate-300">Licencia Mayorista CICMA 1948</p>
          </div>
        </div>
      </div>

      {/* Primary Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab("autogestion")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-semibold transition-all ${
            activeSubTab === "autogestion"
              ? "border-[#002B49] text-[#002B49] bg-[#002B49]/5 rounded-t-xl"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Settings className="w-4 h-4" />
          Autogestión de Agencia B2B
        </button>
        <button
          onClick={() => setActiveSubTab("flow")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-semibold transition-all ${
            activeSubTab === "flow"
              ? "border-[#002B49] text-[#002B49] bg-[#002B49]/5 rounded-t-xl"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Workflow className="w-4 h-4" />
          Simulador de Flujos (Presupuestos & Expedientes)
        </button>
        <button
          onClick={() => setActiveSubTab("specs")}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-semibold transition-all ${
            activeSubTab === "specs"
              ? "border-[#002B49] text-[#002B49] bg-[#002B49]/5 rounded-t-xl"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Code className="w-4 h-4" />
          Especificaciones del Desarrollador
        </button>
      </div>

      {/* VIEW 1: Autogestión de Agencia */}
      {activeSubTab === "autogestion" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Settings Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-[#002B49] font-serif">Ajustes Generales del Canal Minorista</h3>
                <p className="text-xs text-slate-400">Personaliza la visualización de precios y tu identidad comercial</p>
              </div>

              {/* Profile setup fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nombre de Agencia Minorista</label>
                  <input 
                    type="text" 
                    value={b2bAgencyName}
                    onChange={(e) => setB2bAgencyName(e.target.value)}
                    className="w-full text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-[#002B49] rounded-xl px-4 py-2.5 transition-all outline-none text-slate-700 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Licencia Oficial (CV/CICMA)</label>
                  <input 
                    type="text" 
                    value={agencyLic}
                    onChange={(e) => setAgencyLic(e.target.value)}
                    className="w-full text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-[#002B49] rounded-xl px-4 py-2.5 transition-all outline-none text-slate-700 font-medium"
                  />
                </div>
              </div>

              {/* Logo upload simulated */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Logotipo Personalizado para Marca Blanca (PDF/Presupuestos)</label>
                <div className="border-2 border-dashed border-slate-200 hover:border-[#002B49] rounded-2xl p-6 transition-all flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleLogoUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  {logoPreview ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={logoPreview} alt="Logo preview" className="h-12 max-w-[200px] object-contain rounded border border-slate-200 p-1 bg-white" />
                      <p className="text-xs text-[#002B49] font-bold">Logotipo cargado correctamente</p>
                      <p className="text-[10px] text-slate-400">{customLogoName}</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs font-semibold text-[#002B49]">Sube el logotipo de tu agencia</p>
                      <p className="text-[10px] text-slate-400">Recomendado formato PNG transparente con fondo claro</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sliders for Commercial Management */}
              <div className="space-y-5 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Márgenes y Políticas de Comisión</h4>

                {/* Wholesaler Commission level */}
                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#002B49] flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        Comisión Cedida Pactada B2B
                      </span>
                      <p className="text-[10px] text-slate-400">Nivel de comisión asignado por la mayorista en tu contrato B2B</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {commissionRate}% Neto
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[10, 12, 15].map((val) => (
                      <button
                        key={val}
                        onClick={() => setCommissionRate(val)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          commissionRate === val 
                            ? "bg-[#002B49] border-[#002B49] text-white" 
                            : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                        }`}
                      >
                        Tasa {val}% {val === 10 ? "(Standard)" : val === 12 ? "(Superior)" : "(Gold)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client markup slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Margen Comercial (Overprice / Mark-up)</span>
                    <span className="text-sm font-extrabold text-[#002B49] bg-slate-100 px-2.5 py-1 rounded-lg">
                      +{markup}% PVP
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="25" 
                    step="1"
                    value={markup}
                    onChange={(e) => setMarkup(Number(e.target.value))}
                    className="w-full accent-[#002B49] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>0% (Tarifa Mayorista Neta)</span>
                    <span>10% (Recomendado)</span>
                    <span>25% (Margen Libre Máximo)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Preview Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6 sticky top-24">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-[#002B49] font-serif">Vista Previa de Marca Blanca</h3>
                <p className="text-xs text-slate-400">Cómo se presenta la cabecera del presupuesto a tus clientes</p>
              </div>

              {/* Render simulated quote page header */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white relative overflow-hidden space-y-4 shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#002B49]"></div>
                
                <div className="flex justify-between items-start pt-2">
                  <div className="space-y-1">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Uploaded logo" className="h-9 max-w-[140px] object-contain" />
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-800 font-extrabold text-sm uppercase tracking-wider">
                        <Globe className="w-4 h-4 text-slate-500" />
                        <span>{b2bAgencyName}</span>
                      </div>
                    )}
                    <p className="text-[9px] text-slate-400 font-medium">Licencia: {agencyLic}</p>
                  </div>
                  
                  <div className="text-right space-y-0.5">
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">PRESUPUESTO VIAJE</p>
                    <p className="text-[10px] text-slate-600 font-bold">Fecha: {new Date().toLocaleDateString("es-ES")}</p>
                    <p className="text-[10px] text-[#002B49] font-extrabold">Ref: DT-2026/09</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-500 leading-relaxed">
                  <p>Estimado Cliente,</p>
                  <p className="mt-1">A continuación detallamos la cotización de los servicios mayoristas reservados con atención prioritaria para su viaje combinado:</p>
                </div>

                {/* Price block summary in White Label */}
                <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Importe Total del Paquete</span>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 line-through">{(clientFinalPrice * 1.05).toFixed(0)}€</p>
                    <p className="text-lg font-black text-[#002B49] font-serif leading-none">{clientFinalPrice}€</p>
                    <p className="text-[8px] text-slate-400 font-bold tracking-wide mt-0.5">Tasas y Seguro Incluidos</p>
                  </div>
                </div>

                {/* Wholesaler signature hidden from customer */}
                <div className="border-t border-dashed border-slate-200 pt-3 flex items-center justify-between text-[9px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    Precios netos internos protegidos
                  </span>
                  <span>Wholesaler ID: DT-1948</span>
                </div>
              </div>

              {/* Quick tip */}
              <div className="bg-[#002B49]/5 rounded-xl p-4 text-xs text-[#002B49] flex gap-2 items-start leading-relaxed">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <p>
                  El sistema genera automáticamente presupuestos sin marcas externas. Su logotipo será insertado en el dossier PDF oficial para su entrega directa al cliente final.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Simulador de Flujos */}
      {activeSubTab === "flow" && (
        <div className="space-y-8">
          
          {/* Section Description */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#002B49] font-serif">Simulación de Operativa Mayorista B2B</h3>
            <p className="text-xs text-slate-500 mt-1">Sigue el flujo interactivo de cotización, reserva y expedición de documentación en tiempo real.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-center text-xs font-bold text-[#002B49] relative">
              <div className="p-4 bg-[#002B49]/5 rounded-xl border border-[#002B49]/10 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#002B49] text-[#C5A059] px-2.5 py-0.5 rounded-full text-[9px]">PASO 1</span>
                <p className="font-serif text-sm">Cotización Inmediata</p>
                <p className="text-[10px] text-slate-400 font-normal mt-1">Calcular costes netos vs PVP</p>
              </div>
              <div className="p-4 bg-[#002B49]/5 rounded-xl border border-[#002B49]/10 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#002B49] text-[#C5A059] px-2.5 py-0.5 rounded-full text-[9px]">PASO 2</span>
                <p className="font-serif text-sm">Reserva de Paquete</p>
                <p className="text-[10px] text-slate-400 font-normal mt-1">Adjudicación de cupos y plazas</p>
              </div>
              <div className="p-4 bg-[#002B49]/5 rounded-xl border border-[#002B49]/10 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#002B49] text-[#C5A059] px-2.5 py-0.5 rounded-full text-[9px]">PASO 3</span>
                <p className="font-serif text-sm">Descarga de Documentos</p>
                <p className="text-[10px] text-slate-400 font-normal mt-1">Expedir bonos de servicios y billetes</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Interactive Calculator Block */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h4 className="text-sm font-bold text-[#002B49] font-serif flex items-center gap-2">
                  <Percent className="w-4 h-4 text-[#C5A059]" />
                  Calculadora Interactiva de Precios e Margen
                </h4>
              </div>

              {/* Setup fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Destino de la Oferta</label>
                  <select 
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-200 focus:border-[#002B49] rounded-xl px-4 py-2.5 outline-none text-slate-700 font-semibold"
                  >
                    <option value="egipto">Egipto (Maravillas del Nilo) - Base 909€</option>
                    <option value="turquia">Turquía Fascinante - Base 749€</option>
                    <option value="crucero">Crucero de Lujo Mediterráneo - Base 1.250€</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Categoría de Hoteles</label>
                  <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-200">
                    {(["standard", "superior", "luxury"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setHotelCategory(cat)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                          hotelCategory === cat 
                            ? "bg-white text-[#002B49] shadow-sm border border-slate-200" 
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {cat === "standard" ? "4★" : cat === "superior" ? "5★ Alq" : "5★ Lujo"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Número de Pasajeros</label>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button 
                      onClick={() => setPassengerCount(prev => Math.max(1, prev - 1))}
                      className="px-4 py-2.5 hover:bg-slate-100 font-black text-slate-600 transition-all border-r border-slate-200"
                    >-</button>
                    <span className="flex-1 text-center text-sm font-extrabold text-slate-700">{passengerCount}</span>
                    <button 
                      onClick={() => setPassengerCount(prev => prev + 1)}
                      className="px-4 py-2.5 hover:bg-slate-100 font-black text-slate-600 transition-all border-l border-slate-200"
                    >+</button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Duración Predeterminada</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedDestination === "egipto" ? "8 Días / 7 Noches" : selectedDestination === "turquia" ? "10 Días / 9 Noches" : "8 Días / 7 Noches"} 
                    className="w-full text-sm bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-500 font-medium"
                  />
                </div>
              </div>

              {/* Breakdown numbers */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 space-y-4">
                <h5 className="text-xs font-bold text-[#002B49] uppercase tracking-wider pb-2 border-b border-slate-200">
                  Desglose Financiero de la Cotización
                </h5>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Base de Oferta</p>
                    <p className="text-base font-extrabold text-slate-700">{rawNetPricePerPerson}€ / pax</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Total Catálogo</p>
                    <p className="text-base font-extrabold text-slate-700">{rawNetPriceTotal}€</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Tu Comisión ({commissionRate}%)</p>
                    <p className="text-base font-extrabold text-emerald-600">-{agentCommission}€</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Tu Margen ({markup}%)</p>
                    <p className="text-base font-extrabold text-amber-600">+{clientMarkupValue}€</p>
                  </div>
                </div>

                {/* Final calculated price comparison */}
                <div className="border-t border-slate-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#002B49]/5 rounded-xl p-3 border border-[#002B49]/10 text-center">
                    <p className="text-[10px] text-[#002B49] uppercase font-bold tracking-widest">Neto a Pagar a Dynamic Tours</p>
                    <p className="text-2xl font-black text-[#002B49] font-serif mt-1">{netPayToWholesaler}€</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Importe de la liquidación mayorista</p>
                  </div>

                  <div className="bg-[#C5A059]/10 rounded-xl p-3 border border-[#C5A059]/20 text-center">
                    <p className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest">PVP para tu Cliente Final</p>
                    <p className="text-2xl font-black text-[#002B49] font-serif mt-1">{clientFinalPrice}€</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">Margen neto de agencia: <strong className="text-emerald-600">{(clientFinalPrice - netPayToWholesaler)}€</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Action Block / Downloads */}
            <div className="space-y-6">
              
              {/* Generate dossier widget */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-bold text-[#002B49] font-serif">Presupuesto y Expedición</h4>
                  <p className="text-xs text-slate-400">Descarga inmediata del presupuesto oficial</p>
                </div>
                
                <button 
                  onClick={() => triggerDownload("presupuesto", `Presupuesto_B2B_${b2bAgencyName.replace(/\s+/g, '_')}_${selectedDestination}.pdf`)}
                  className="w-full bg-[#002B49] hover:bg-[#003c66] text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <FileText className="w-4 h-4 text-[#C5A059]" />
                  Generar Dossier Cliente PDF
                </button>
              </div>

              {/* Downloads Center simulator */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-bold text-[#002B49] font-serif">Centro de Descarga de Bonos</h4>
                  <p className="text-xs text-slate-400">Descarga los expedientes de viaje emitidos</p>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-700">Bono de Hoteles y Servicios</p>
                      <p className="text-[10px] text-slate-400">PDF con código QR de confirmación</p>
                    </div>
                    <button 
                      onClick={() => triggerDownload("voucher", "Bono_Servicios_Egipto.pdf")}
                      className="p-2 hover:bg-slate-100 text-[#002B49] hover:text-[#C5A059] rounded-lg transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-700">Billetes Aéreos (Vuelo a Luxor)</p>
                      <p className="text-[10px] text-slate-400">SATE / Código localizador aéreo</p>
                    </div>
                    <button 
                      onClick={() => triggerDownload("tickets", "Localizadores_Aereos_Egipto.pdf")}
                      className="p-2 hover:bg-slate-100 text-[#002B49] hover:text-[#C5A059] rounded-lg transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-700">Póliza de Seguros de Viaje</p>
                      <p className="text-[10px] text-slate-400">Coberturas de anulación y asistencia médica</p>
                    </div>
                    <button 
                      onClick={() => triggerDownload("insurance", "Poliza_Seguro_Anulacion_Egipto.pdf")}
                      className="p-2 hover:bg-slate-100 text-[#002B49] hover:text-[#C5A059] rounded-lg transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Especificaciones del Desarrollador */}
      {activeSubTab === "specs" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tech Specs Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-[#002B49] font-serif">Especificaciones de Arquitectura B2B</h3>
                <p className="text-xs text-slate-400">Esquema técnico y endpoints requeridos para la integración</p>
              </div>

              {/* Endpoints Table */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">Mapeo de APIs e Interfaz de Base de Datos</h4>
                <div className="border border-slate-150 rounded-xl overflow-hidden text-xs">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-150 grid grid-cols-4 font-bold text-slate-600">
                    <div>Método</div>
                    <div className="col-span-2">Endpoint</div>
                    <div>Descripción</div>
                  </div>
                  <div className="px-4 py-3 border-b border-slate-100 grid grid-cols-4 items-center">
                    <div><span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-black font-sans">GET</span></div>
                    <div className="col-span-2 font-mono text-slate-600 text-[11px]">/api/b2b/agency/profile</div>
                    <div className="text-slate-500">Obtener datos y logo de agencia</div>
                  </div>
                  <div className="px-4 py-3 border-b border-slate-100 grid grid-cols-4 items-center">
                    <div><span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded font-black font-sans">POST</span></div>
                    <div className="col-span-2 font-mono text-slate-600 text-[11px]">/api/b2b/quote/calculate</div>
                    <div className="text-slate-500">Generar tarifas netas y PVPs</div>
                  </div>
                  <div className="px-4 py-3 border-b border-slate-100 grid grid-cols-4 items-center">
                    <div><span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded font-black font-sans">POST</span></div>
                    <div className="col-span-2 font-mono text-slate-600 text-[11px]">/api/b2b/quote/generate-pdf</div>
                    <div className="text-slate-500">Compilar dossier de marca blanca</div>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-4 items-center">
                    <div><span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-black font-sans">PUT</span></div>
                    <div className="col-span-2 font-mono text-slate-600 text-[11px]">/api/b2b/bookings/:id/status</div>
                    <div className="text-slate-500">Actualizar estado de cupos</div>
                  </div>
                </div>
              </div>

              {/* Data Schema (JSON Spec) */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-blue-600" />
                  Estructura del Objeto de Cotización (JSON)
                </h4>
                <div className="bg-slate-900 rounded-xl p-4 text-[11px] font-mono text-slate-300 leading-relaxed overflow-x-auto">
{`{
  "agencyId": "DT-AG-94821",
  "clientName": "Viaje Combinado Egipto",
  "commissionRate": ${commissionRate},
  "markupApplied": ${markup},
  "passengers": ${passengerCount},
  "destination": "${selectedDestination}",
  "hotelCategory": "${hotelCategory}",
  "pricing": {
    "netPricePerPerson": ${rawNetPricePerPerson},
    "grossPriceTotal": ${rawNetPriceTotal},
    "agentCommission": ${agentCommission},
    "wholesalerNetPayable": ${netPayToWholesaler},
    "markupValue": ${clientMarkupValue},
    "clientFinalPrice": ${clientFinalPrice}
  }
}`}
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines / Deliverables Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-[#002B49] font-serif">Componentes UI Modulares</h3>
                <p className="text-xs text-slate-400">Guía de diseño para la fase de prototipado de alta fidelidad</p>
              </div>

              <div className="space-y-4 text-xs leading-relaxed">
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-150 shrink-0">
                    <Sliders className="w-4 h-4 text-[#002B49]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Controles Reactivos de Margen</h5>
                    <p className="text-slate-500 mt-0.5">Sincronización instantánea de fórmulas matemáticas de precios netos para asegurar total precisión.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-150 shrink-0">
                    <Download className="w-4 h-4 text-[#002B49]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Módulo de Descarga Exclusiva</h5>
                    <p className="text-slate-500 mt-0.5">Soporte nativo para empaquetado zip de documentos de viaje, encriptado con protocolo JWT.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-150 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#002B49]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Seguridad del Canal B2B</h5>
                    <p className="text-slate-500 mt-0.5">Políticas de acceso estricto RBAC (Role-Based Access Control) que garantizan confidencialidad comercial.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#C5A059]/5 rounded-xl p-4 text-xs text-[#002B49] border border-[#C5A059]/20 flex gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Listo para Maquetar</p>
                  <p className="text-slate-600 leading-relaxed">Este prototipo de alta fidelidad cumple rigurosamente con los requerimientos B2B del sector de agencias de viaje mayoristas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Downloading Simulator Modal Overlay */}
      {downloadingDoc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl text-center space-y-4 animate-scaleUp">
            
            <div className="mx-auto h-12 w-12 rounded-full bg-[#002B49]/5 flex items-center justify-center text-[#002B49]">
              {downloadCompleted ? (
                <Check className="w-6 h-6 text-emerald-500" />
              ) : (
                <Clock className="w-6 h-6 text-[#C5A059] animate-spin" />
              )}
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-[#002B49] font-serif">
                {downloadCompleted ? "¡Descarga Completada!" : "Generando Archivo..."}
              </h4>
              <p className="text-[10px] text-slate-400 font-mono break-all">{downloadedDocName}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#002B49] to-[#C5A059] h-full transition-all duration-200" 
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>

            {downloadCompleted ? (
              <button 
                onClick={() => setDownloadingDoc(null)}
                className="w-full bg-[#002B49] hover:bg-[#003c66] text-white py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                Cerrar
              </button>
            ) : (
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Descargando {downloadProgress}%...</p>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
