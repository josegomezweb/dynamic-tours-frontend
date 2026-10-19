import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { assetUrl } from "../utils/assets";
import { 
  ArrowRight, 
  Check, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  AlertCircle, 
  Copy, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  Search,
  ExternalLink,
  Users,
  Compass,
  FileText
} from "lucide-react";

interface ViajesMedidaGruposProps {
  onBackToHome: () => void;
  onEnterB2B?: (agent: string, agency: string) => void;
  initialScrollToForm?: boolean;
}

export default function ViajesMedidaGrupos({
  onBackToHome,
  onEnterB2B,
  initialScrollToForm = false,
}: ViajesMedidaGruposProps) {
  // Panel 01: Tu agencia
  const [agencia, setAgencia] = useState("");
  const [contacto, setContacto] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  // Panel 02: El viaje
  const [tipoViaje, setTipoViaje] = useState<"a-medida" | "grupo" | "">("");
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [destino, setDestino] = useState("");
  const [otroDestino, setOtroDestino] = useState("");
  const [asesoramientoDestino, setAsesoramientoDestino] = useState(false);

  const [fechaSalida, setFechaSalida] = useState("");
  const [duracionDias, setDuracionDias] = useState("");
  const [ciudadSalida, setCiudadSalida] = useState("");
  const [flexibilidadFechas, setFlexibilidadFechas] = useState(false);

  const [adultos, setAdultos] = useState<number | "">("");
  const [menoresCount, setMenoresCount] = useState<number>(0);
  const [edadesMenores, setEdadesMenores] = useState<string[]>([]);

  const [presupuestoPersona, setPresupuestoPersona] = useState("");
  const [incluyeVuelos, setIncluyeVuelos] = useState<"si" | "no" | "por-definir" | "">("");

  // Panel 03: Preferencias y servicios
  const [categoriaAlojamiento, setCategoriaAlojamiento] = useState("Necesito asesoramiento");
  const [regimen, setRegimen] = useState("Necesito asesoramiento");
  const [servicios, setServicios] = useState<{
    vuelos: boolean;
    traslados: boolean;
    excursiones: boolean;
    otros: boolean;
  }>({
    vuelos: false,
    traslados: false,
    excursiones: false,
    otros: false,
  });
  const [particularidades, setParticularidades] = useState("");

  // Cierre y validación
  const [politicaAceptada, setPoliticaAceptada] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Sync menores age inputs count
  useEffect(() => {
    setEdadesMenores((prev) => {
      const next = [...prev];
      if (next.length < menoresCount) {
        while (next.length < menoresCount) next.push("");
      } else if (next.length > menoresCount) {
        return next.slice(0, menoresCount);
      }
      return next;
    });
  }, [menoresCount]);

  // Initial scroll if coming from hero button or direct anchor
  useEffect(() => {
    if (initialScrollToForm || window.location.hash === "#formulario-grupos") {
      const doScroll = () => {
        const el = document.getElementById("formulario-grupos");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      doScroll();
      const timer1 = setTimeout(doScroll, 100);
      const timer2 = setTimeout(doScroll, 350);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [initialScrollToForm]);

  const toggleServicio = (key: keyof typeof servicios) => {
    setServicios((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!agencia.trim()) {
      errs.agencia = "Por favor indica el nombre de tu agencia minorista.";
    }
    if (!contacto.trim()) {
      errs.contacto = "Por favor indica la persona de contacto en la agencia.";
    }
    if (!email.trim()) {
      errs.email = "El email profesional es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Introduce un formato de email válido (ej. agente@agencia.com).";
    }

    if (!tipoViaje) {
      errs.tipoViaje = "Selecciona si deseas organizar un Viaje a medida o un Grupo.";
    }

    if (!asesoramientoDestino) {
      if (!destino) {
        errs.destino = "Selecciona un país o destino, o marca 'Necesito asesoramiento'.";
      } else if (destino === "Otro destino" && !otroDestino.trim()) {
        errs.otroDestino = "Indica el país o destino que tienes en mente.";
      }
    }

    if (adultos === "" || Number(adultos) < 1) {
      errs.adultos = "Indica al menos 1 adulto.";
    }

    if (!politicaAceptada) {
      errs.politica = "Debes aceptar la política de privacidad para enviar la solicitud.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        const resultEl = document.getElementById("estado-solicitud");
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const el = document.getElementById(`field-${firstErrorField}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const getSummaryText = () => {
    const destStr = asesoramientoDestino 
      ? "Asesoramiento sobre destino requerido" 
      : destino === "Otro destino" 
      ? `Otro: ${otroDestino}` 
      : destino;

    const servsList = [
      servicios.vuelos ? "Vuelos" : null,
      servicios.traslados ? "Traslados" : null,
      servicios.excursiones ? "Excursiones" : null,
      servicios.otros ? "Otros servicios" : null,
    ].filter(Boolean).join(", ") || "No especificados";

    return `SOLICITUD DE VIAJE A MEDIDA / GRUPOS - DYNAMIC TOURS
-----------------------------------------------------------
AGENCIA: ${agencia}
CONTACTO: ${contacto}
EMAIL: ${email}
TELÉFONO: ${telefono || "No indicado"}

TIPO: ${tipoViaje === "grupo" ? `Grupo${nombreGrupo ? ` (${nombreGrupo})` : ""}` : "Viaje a medida"}
DESTINO: ${destStr}
FECHA SALIDA: ${fechaSalida || "Flexible / Por definir"} ${flexibilidadFechas ? "(Flexibilidad confirmada)" : ""}
DURACIÓN: ${duracionDias ? `${duracionDias} días` : "Por definir"}
CIUDAD SALIDA: ${ciudadSalida || "Por definir"}
VIAJEROS: ${adultos} Adulto(s)${menoresCount > 0 ? `, ${menoresCount} Menor(es) (Edades: ${edadesMenores.join(", ")})` : ""}
PRESUPUESTO ESTIMADO / PAX: ${presupuestoPersona ? `${presupuestoPersona} €` : "A cotizar"}
VUELOS: ${incluyeVuelos || "Por definir"}

ALOJAMIENTO: ${categoriaAlojamiento}
RÉGIMEN: ${regimen}
SERVICIOS REQUERIDOS: ${servsList}
PARTICULARIDADES:
${particularidades || "Ninguna especificada"}`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getSummaryText());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 font-sans flex flex-col selection:bg-[#1F82D2]/20 selection:text-[#1F82D2]">
      
      {/* 1. CABECERA CORPORATIVA OFICIAL */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left Brand Identity: Logo + Subtitle */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button 
              type="button" 
              onClick={onBackToHome}
              className="flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
              title="Ir al inicio de Dynamic Tours"
            >
              <Logo className="h-8 sm:h-9 w-auto" />
            </button>
            <div className="hidden sm:block h-4.5 w-px bg-slate-300"></div>
            <div className="hidden sm:flex items-center gap-1 font-bold text-[10px] sm:text-[10.5px] tracking-wide uppercase whitespace-nowrap">
              <span className="text-[#1F82D2]">AGENCIA MAYORISTA</span>
              <span className="text-[#52A72B]">DE VIAJES</span>
            </div>
          </div>

          {/* Menú Central */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 text-[11px] xl:text-xs font-bold text-slate-800 whitespace-nowrap">
            <button 
              type="button"
              onClick={onBackToHome}
              className="flex items-center gap-1.5 uppercase tracking-wider transition-all py-1.5 px-3 rounded-lg cursor-pointer font-bold text-xs bg-transparent text-slate-800 hover:text-[#1F82D2]"
            >
              <span>DESTINOS</span>
            </button>
            <span className="text-slate-300">·</span>
            <button 
              type="button"
              onClick={() => {
                onBackToHome();
                setTimeout(() => {
                  const el = document.getElementById("ofertas");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="hover:text-[#1F82D2] transition-colors font-bold cursor-pointer"
            >
              Ofertas
            </button>
            <span className="text-slate-300">·</span>
            <button 
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-[#1F82D2] font-extrabold cursor-pointer transition-colors"
            >
              Grupos
            </button>
            <span className="text-slate-300">·</span>
            <button 
              type="button"
              onClick={() => {
                onBackToHome();
                setTimeout(() => {
                  const el = document.getElementById("nosotros");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="hover:text-[#1F82D2] transition-colors font-bold cursor-pointer"
            >
              Sobre Dynamic
            </button>
          </nav>

          {/* Right Buttons: Buscador + ACCESO AGENCIAS */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                onBackToHome();
                setTimeout(() => {
                  const el = document.getElementById("hero-finder");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="hidden sm:flex items-center gap-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-slate-700 font-bold text-xs py-1.5 px-3 rounded-full border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Buscador</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onEnterB2B) onEnterB2B("Agente Profesional", "Agencia Colaboradora");
              }}
              className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:opacity-95 text-white font-extrabold text-[10.5px] sm:text-[11px] uppercase tracking-wider py-1.5 px-2.5 sm:px-3 rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>ACCESO AGENCIAS</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. PORTADA DE CAPADOCIA CON VIAJEROS */}
      <section className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden bg-slate-950">
        <img 
          src={assetUrl("cappadocia_grupos.jpg")} 
          alt="Paisaje de Capadocia con grupo de viajeros · Dynamic Tours" 
          className="w-full h-full object-cover object-[78%_center] sm:object-[82%_center] lg:object-right"
          loading="eager"
        />
        
        {/* Oscurecimiento lateral equilibrado para legibilidad del título blanco sin degradado blanco inferior */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />
        
        {/* Contenido alineado a la izquierda */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-xl text-left space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.08] font-sans drop-shadow-sm">
                Viajes a medida<br />y grupos
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTENEDOR PRINCIPAL: INTRODUCCIÓN Y FORMULARIO */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Miga de pan e Introducción */}
        <div id="formulario-grupos" className="scroll-mt-24 sm:scroll-mt-28 mb-8 sm:mb-10 text-left">
          {/* Miga de pan */}
          <nav aria-label="Miga de pan" className="text-xs text-slate-500 mb-3 sm:mb-4 flex items-center gap-1.5 font-medium">
            <button 
              type="button"
              onClick={onBackToHome}
              className="hover:text-[#1F82D2] transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-700">Viajes a medida y grupos</span>
          </nav>

          {/* Título de introducción */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0A0F1D] tracking-tight leading-tight">
            Cuéntanos qué buscan tus clientes.
          </h2>

          {/* Párrafo explicativo */}
          <p className="text-sm sm:text-[15.5px] text-slate-600 mt-2 sm:mt-2.5 max-w-2xl leading-relaxed">
            Indícanos el destino, las fechas aproximadas y las necesidades del viaje. No hace falta tener todos los detalles decididos: nuestro equipo puede ayudarte a concretarlos.
          </p>

          {/* Nota de obligatoriedad */}
          <p className="text-xs text-slate-500 mt-3 font-medium">
            Los campos con <span className="text-red-500 font-bold">*</span> son obligatorios.
          </p>
        </div>

        {/* 4. FORMULARIO EN TRES PANELES */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-8">
          
          {/* PANEL 01 · TU AGENCIA */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-left">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <span className="text-lg font-bold text-[#1F82D2]">01</span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0A0F1D] tracking-tight">Tu agencia</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* Agencia * */}
              <div id="field-agencia" className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Agencia <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  value={agencia}
                  onChange={(e) => {
                    setAgencia(e.target.value);
                    if (errors.agencia) setErrors((prev) => ({ ...prev, agencia: "" }));
                  }}
                  placeholder="Nombre de la agencia minorista"
                  className={`w-full bg-[#FAFAFC] sm:bg-white border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all ${
                    errors.agencia ? "border-red-400 bg-red-50/20" : "border-slate-200"
                  }`}
                />
                {errors.agencia && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.agencia}</span>
                  </p>
                )}
              </div>

              {/* Persona de contacto * */}
              <div id="field-contacto" className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Persona de contacto <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  value={contacto}
                  onChange={(e) => {
                    setContacto(e.target.value);
                    if (errors.contacto) setErrors((prev) => ({ ...prev, contacto: "" }));
                  }}
                  placeholder="Nombre y apellidos del agente"
                  className={`w-full bg-[#FAFAFC] sm:bg-white border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all ${
                    errors.contacto ? "border-red-400 bg-red-50/20" : "border-slate-200"
                  }`}
                />
                {errors.contacto && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.contacto}</span>
                  </p>
                )}
              </div>

              {/* Email profesional * */}
              <div id="field-email" className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Email profesional <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder="agente@agenciadeviajes.com"
                  className={`w-full bg-[#FAFAFC] sm:bg-white border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all ${
                    errors.email ? "border-red-400 bg-red-50/20" : "border-slate-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Teléfono
                </label>
                <input 
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Teléfono directo o móvil"
                  className="w-full bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all"
                />
              </div>
            </div>
          </div>

          {/* PANEL 02 · EL VIAJE */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-left space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <span className="text-lg font-bold text-[#1F82D2]">02</span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0A0F1D] tracking-tight">El viaje</h3>
            </div>

            {/* ¿Qué quieres organizar? * */}
            <div id="field-tipoViaje" className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                ¿Qué quieres organizar? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Opción 1: Viaje a medida */}
                <button
                  type="button"
                  onClick={() => {
                    setTipoViaje("a-medida");
                    if (errors.tipoViaje) setErrors((prev) => ({ ...prev, tipoViaje: "" }));
                  }}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                    tipoViaje === "a-medida"
                      ? "border-teal-500 bg-teal-50/40 ring-1 ring-teal-500 text-slate-900 font-semibold"
                      : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    tipoViaje === "a-medida" ? "border-teal-600 bg-teal-600" : "border-slate-300"
                  }`}>
                    {tipoViaje === "a-medida" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="text-sm">Viaje a medida</span>
                </button>

                {/* Opción 2: Grupo */}
                <button
                  type="button"
                  onClick={() => {
                    setTipoViaje("grupo");
                    if (errors.tipoViaje) setErrors((prev) => ({ ...prev, tipoViaje: "" }));
                  }}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                    tipoViaje === "grupo"
                      ? "border-teal-500 bg-teal-50/40 ring-1 ring-teal-500 text-slate-900 font-semibold"
                      : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    tipoViaje === "grupo" ? "border-teal-600 bg-teal-600" : "border-slate-300"
                  }`}>
                    {tipoViaje === "grupo" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="text-sm">Grupo</span>
                </button>

              </div>
              {errors.tipoViaje && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.tipoViaje}</span>
                </p>
              )}
            </div>

            {/* Nombre del grupo (opcional) - visible únicamente si tipoViaje === "grupo" */}
            {tipoViaje === "grupo" && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
                <label className="block text-xs font-semibold text-slate-700">
                  Nombre del grupo (opcional)
                </label>
                <input 
                  type="text"
                  value={nombreGrupo}
                  onChange={(e) => setNombreGrupo(e.target.value)}
                  placeholder="Ej. Asociación Cultural, Empresa Incentivo, Familia Ruiz..."
                  className="w-full bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all"
                />
              </div>
            )}

            {/* País o destino * */}
            <div id="field-destino" className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-xs font-semibold text-slate-700">
                  País o destino {!asesoramientoDestino && <span className="text-red-500">*</span>}
                </label>
                
                {/* Casilla: Necesito asesoramiento */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={asesoramientoDestino}
                    onChange={(e) => {
                      setAsesoramientoDestino(e.target.checked);
                      if (e.target.checked && errors.destino) {
                        setErrors((prev) => ({ ...prev, destino: "", otroDestino: "" }));
                      }
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-[#1F82D2] focus:ring-[#1F82D2]"
                  />
                  <span className="text-xs text-slate-600 font-medium">Necesito asesoramiento</span>
                </label>
              </div>

              {!asesoramientoDestino && (
                <div className="space-y-3">
                  <div className="relative">
                    <select
                      value={destino}
                      onChange={(e) => {
                        setDestino(e.target.value);
                        if (errors.destino) setErrors((prev) => ({ ...prev, destino: "" }));
                      }}
                      className={`w-full appearance-none bg-[#FAFAFC] sm:bg-white border rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all cursor-pointer ${
                        errors.destino ? "border-red-400 bg-red-50/20" : "border-slate-200"
                      }`}
                    >
                      <option value="">Selecciona un destino</option>
                      <option value="Egipto">Egipto</option>
                      <option value="Jordania">Jordania</option>
                      <option value="Turquía">Turquía</option>
                      <option value="Portugal">Portugal</option>
                      <option value="India">India</option>
                      <option value="Uzbekistán">Uzbekistán</option>
                      <option value="Kenia">Kenia</option>
                      <option value="Marruecos">Marruecos</option>
                      <option value="Combinado Oriente Medio">Combinado Oriente Medio (Egipto + Jordania)</option>
                      <option value="Otro destino">Otro destino (especificar)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>

                  {destino === "Otro destino" && (
                    <div className="space-y-1.5 animate-in fade-in duration-200">
                      <input 
                        type="text"
                        value={otroDestino}
                        onChange={(e) => {
                          setOtroDestino(e.target.value);
                          if (errors.otroDestino) setErrors((prev) => ({ ...prev, otroDestino: "" }));
                        }}
                        placeholder="Indica el país, ciudad o región deseada..."
                        className={`w-full bg-[#FAFAFC] sm:bg-white border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all ${
                          errors.otroDestino ? "border-red-400 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                      {errors.otroDestino && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.otroDestino}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {errors.destino && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.destino}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Fila: Fecha de salida · Duración en días · Ciudad de salida */}
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Fecha de salida */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Fecha de salida
                  </label>
                  <div className="relative">
                    <input 
                      type="date"
                      value={fechaSalida}
                      onChange={(e) => setFechaSalida(e.target.value)}
                      className="w-full bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all"
                    />
                  </div>
                </div>

                {/* Duración en días */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Duración en días
                  </label>
                  <input 
                    type="number"
                    min="1"
                    value={duracionDias}
                    onChange={(e) => setDuracionDias(e.target.value)}
                    placeholder="Ej. 8"
                    className="w-full bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all"
                  />
                </div>

                {/* Ciudad de salida */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Ciudad de salida
                  </label>
                  <input 
                    type="text"
                    value={ciudadSalida}
                    onChange={(e) => setCiudadSalida(e.target.value)}
                    placeholder="Ej. Madrid, Barcelona..."
                    className="w-full bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all"
                  />
                </div>
              </div>

              {/* Casilla: Tenemos flexibilidad de fechas */}
              <label className="inline-flex items-center gap-2 cursor-pointer select-none pt-1">
                <input 
                  type="checkbox"
                  checked={flexibilidadFechas}
                  onChange={(e) => setFlexibilidadFechas(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#1F82D2] focus:ring-[#1F82D2]"
                />
                <span className="text-xs text-slate-600 font-medium">Tenemos flexibilidad de fechas</span>
              </label>
            </div>

            {/* Viajeros: Adultos * y Menores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-1">
              
              {/* Adultos * */}
              <div id="field-adultos" className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Adultos <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={adultos}
                    onChange={(e) => {
                      const val = e.target.value ? Number(e.target.value) : "";
                      setAdultos(val);
                      if (errors.adultos) setErrors((prev) => ({ ...prev, adultos: "" }));
                    }}
                    className={`w-full appearance-none bg-[#FAFAFC] sm:bg-white border rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all cursor-pointer ${
                      errors.adultos ? "border-red-400 bg-red-50/20" : "border-slate-200"
                    }`}
                  >
                    <option value="">Selecciona número de adultos</option>
                    {[...Array(20)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "adulto" : "adultos"}
                      </option>
                    ))}
                    <option value="25">21 - 30 adultos (Grupo mediano)</option>
                    <option value="40">31 - 50 adultos (Grupo grande / Autocar)</option>
                    <option value="60">Más de 50 adultos</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {errors.adultos && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.adultos}</span>
                  </p>
                )}
              </div>

              {/* Menores */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Menores
                </label>
                <div className="relative">
                  <select
                    value={menoresCount}
                    onChange={(e) => setMenoresCount(Number(e.target.value))}
                    className="w-full appearance-none bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all cursor-pointer"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "menor" : "menores"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>

                {/* Campos dinámicos de edades si hay menores */}
                {menoresCount > 0 && (
                  <div className="pt-2.5 space-y-2 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {edadesMenores.map((edad, idx) => (
                        <div key={idx} className="space-y-1">
                          <label className="block text-[11px] font-medium text-slate-600">
                            Edad menor {idx + 1}
                          </label>
                          <input 
                            type="number"
                            min="0"
                            max="17"
                            value={edad}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEdadesMenores((prev) => {
                                const next = [...prev];
                                next[idx] = val;
                                return next;
                              });
                            }}
                            placeholder="Años"
                            className="w-full bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Edades en la fecha del viaje.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Presupuesto y ¿Incluye vuelos? */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-1">
              
              {/* Presupuesto por persona (€) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Presupuesto por persona (€)
                </label>
                <input 
                  type="text"
                  value={presupuestoPersona}
                  onChange={(e) => setPresupuestoPersona(e.target.value)}
                  placeholder="Importe aproximado"
                  className="w-full bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all"
                />
              </div>

              {/* ¿Incluye vuelos? */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  ¿Incluye vuelos?
                </label>
                <div className="grid grid-cols-3 border border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-0.5">
                  {(["si", "no", "por-definir"] as const).map((opt) => {
                    const label = opt === "si" ? "Sí" : opt === "no" ? "No" : "Por definir";
                    const isSelected = incluyeVuelos === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setIncluyeVuelos(opt)}
                        className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-white text-[#1F82D2] shadow-2xs font-bold" 
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* PANEL 03 · PREFERENCIAS Y SERVICIOS */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-left space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <span className="text-lg font-bold text-[#1F82D2]">03</span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0A0F1D] tracking-tight">Preferencias y servicios</h3>
            </div>

            {/* Categoría de alojamiento y Régimen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Categoría de alojamiento */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Categoría de alojamiento
                </label>
                <div className="relative">
                  <select
                    value={categoriaAlojamiento}
                    onChange={(e) => setCategoriaAlojamiento(e.target.value)}
                    className="w-full appearance-none bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all cursor-pointer"
                  >
                    <option value="Necesito asesoramiento">Necesito asesoramiento</option>
                    <option value="3 estrellas / Confort">3 estrellas / Confort</option>
                    <option value="4 estrellas / Primera">4 estrellas / Primera</option>
                    <option value="4 estrellas Superior">4 estrellas Superior</option>
                    <option value="5 estrellas / Lujo">5 estrellas / Lujo</option>
                    <option value="5 estrellas Gran Lujo / Boutique">5 estrellas Gran Lujo / Boutique</option>
                    <option value="Hoteles con encanto / Tradicionales">Hoteles con encanto / Tradicionales</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Régimen */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Régimen
                </label>
                <div className="relative">
                  <select
                    value={regimen}
                    onChange={(e) => setRegimen(e.target.value)}
                    className="w-full appearance-none bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all cursor-pointer"
                  >
                    <option value="Necesito asesoramiento">Necesito asesoramiento</option>
                    <option value="Solo Alojamiento (SA)">Solo Alojamiento (SA)</option>
                    <option value="Alojamiento y Desayuno (AD)">Alojamiento y Desayuno (AD)</option>
                    <option value="Media Pensión (MP)">Media Pensión (MP)</option>
                    <option value="Pensión Completa (PC)">Pensión Completa (PC)</option>
                    <option value="Todo Incluido (TI)">Todo Incluido (TI)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Servicios que necesitas */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Servicios que necesitas
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(
                  [
                    { key: "vuelos", label: "Vuelos" },
                    { key: "traslados", label: "Traslados" },
                    { key: "excursiones", label: "Excursiones" },
                    { key: "otros", label: "Otros" },
                  ] as const
                ).map(({ key, label }) => {
                  const checked = servicios[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleServicio(key)}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer text-left ${
                        checked
                          ? "border-[#1F82D2] bg-[#F0F7FF] text-[#1F82D2] font-semibold"
                          : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        checked ? "border-[#1F82D2] bg-[#1F82D2] text-white" : "border-slate-300 bg-white"
                      }`}>
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span className="text-xs sm:text-sm">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Particularidades del viaje */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Particularidades del viaje
              </label>
              <textarea 
                rows={4}
                value={particularidades}
                onChange={(e) => setParticularidades(e.target.value)}
                placeholder="Motivo del viaje, preferencias, distribución de habitaciones o necesidades especiales…"
                className="w-full bg-[#FAFAFC] sm:bg-white border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2]/30 focus:border-[#1F82D2] transition-all resize-y"
              />
            </div>

          </div>

          {/* 5. CIERRE DEL FORMULARIO */}
          <div className="pt-2 space-y-5 text-left">
            
            {/* Casilla obligatoria: Política de privacidad */}
            <div id="field-politica" className="space-y-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={politicaAceptada}
                  onChange={(e) => {
                    setPoliticaAceptada(e.target.checked);
                    if (e.target.checked && errors.politica) {
                      setErrors((prev) => ({ ...prev, politica: "" }));
                    }
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-[#1F82D2] focus:ring-[#1F82D2] mt-0.5"
                />
                <span className="text-xs text-slate-600 leading-normal">
                  He leído y acepto la{" "}
                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPrivacyModal(true);
                    }}
                    className="text-[#1F82D2] hover:underline font-semibold"
                  >
                    política de privacidad
                  </button>
                  .
                </span>
              </label>
              {errors.politica && (
                <p className="text-xs text-red-600 flex items-center gap-1 pl-6">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.politica}</span>
                </p>
              )}
            </div>

            {/* Botón principal centrado */}
            <div className="flex flex-col items-center justify-center pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 rounded-full shadow-md transition-all cursor-pointer group"
              >
                <span>Solicitar una propuesta</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
              
              {/* Texto debajo */}
              <p className="text-xs text-slate-500 mt-2.5 text-center font-normal">
                Esta solicitud no implica una reserva.
              </p>
            </div>

          </div>

          {/* 6. AVISO TÉCNICO Y VALIDACIÓN DE SOLICITUD (Sin confirmación falsa) */}
          {isSubmitted && (
            <div id="estado-solicitud" className="mt-8 bg-white border-2 border-emerald-500/80 rounded-2xl p-6 sm:p-8 shadow-sm text-left animate-in fade-in duration-300 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    Solicitud validada y lista para gestión mayorista
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Todos los datos del grupo o viaje a medida han sido validados con éxito. Al ser un entorno de desarrollo frontend, el formulario está preparado a la espera de conectar el endpoint de API / Webhook o SMTP definitivo de Dynamic Tours.
                  </p>
                </div>
              </div>

              {/* Resumen de los datos preparados */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-xs text-slate-700 font-mono space-y-1">
                <div className="flex justify-between font-bold text-slate-900 pb-1 border-b border-slate-200">
                  <span>RESUMEN PREPARADO DE LA SOLICITUD</span>
                  <span className="text-[#1F82D2]">{tipoViaje === "grupo" ? "GRUPO" : "A MEDIDA"}</span>
                </div>
                <p><strong>Agencia:</strong> {agencia} | <strong>Contacto:</strong> {contacto} ({email})</p>
                <p><strong>Destino:</strong> {asesoramientoDestino ? "Requiere asesoramiento" : destino === "Otro destino" ? otroDestino : destino}</p>
                <p><strong>Salida:</strong> {fechaSalida || "A definir"} | <strong>Duración:</strong> {duracionDias ? `${duracionDias} días` : "A definir"}</p>
                <p><strong>Viajeros:</strong> {adultos} adultos {menoresCount > 0 ? `+ ${menoresCount} menores (${edadesMenores.join(", ")} años)` : ""}</p>
                <p><strong>Presupuesto / Pax:</strong> {presupuestoPersona ? `${presupuestoPersona} €` : "A cotizar"} | <strong>Vuelos:</strong> {incluyeVuelos || "Por definir"}</p>
              </div>

              {/* Botón para copiar el resumen */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>¡Resumen copiado al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar datos de solicitud</span>
                    </>
                  )}
                </button>
                <span className="text-xs text-slate-500">
                  Los datos permanecen en los campos para cualquier consulta o edición.
                </span>
              </div>
            </div>
          )}

        </form>

      </main>

      {/* 7. PIE DE PÁGINA CORPORATIVO */}
      <footer className="bg-slate-100 text-slate-800 border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="space-y-4">
            <div className="flex flex-row items-center gap-3">
              <Logo className="h-11 shrink-0" classNameImg="mix-blend-multiply" />
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed max-w-xs">
              Mayorista de viajes con Licencia CICMA 1948. Especialistas en diseño exclusivo de experiencias a medida y de alta gama para agencias de viajes minoristas.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#0A0F1D] uppercase tracking-widest">Garantías & Licencias</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Cumplimos estrictamente con los avales, pólizas de responsabilidad civil y depósitos de garantía exigidos por la Directiva Europea de Viajes Combinados. Registrados en el registro de turismo de la Comunidad de Madrid con el código CICMA 1948.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#0A0F1D] uppercase tracking-widest">Área Legal</h4>
            <ul className="text-[11px] text-slate-600 space-y-1.5">
              <li><button type="button" onClick={() => setShowPrivacyModal(true)} className="hover:underline hover:text-[#0A0F1D] transition-colors cursor-pointer text-left">Condiciones Generales de Contratación</button></li>
              <li><button type="button" onClick={() => setShowPrivacyModal(true)} className="hover:underline hover:text-[#0A0F1D] transition-colors cursor-pointer text-left">Política de Privacidad de Datos</button></li>
              <li><button type="button" onClick={() => setShowPrivacyModal(true)} className="hover:underline hover:text-[#0A0F1D] transition-colors cursor-pointer text-left">Aviso Legal y Uso del Portal</button></li>
              <li><button type="button" onClick={() => setShowPrivacyModal(true)} className="hover:underline hover:text-[#0A0F1D] transition-colors cursor-pointer text-left">Política de Cookies</button></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 mt-8 pt-6 text-center text-[10px] text-slate-500">
          <p>© 2026 Dynamic Tours S.A. Todos los derechos reservados. Licencia CICMA 1948.</p>
        </div>
      </footer>

      {/* MODAL DE POLÍTICA DE PRIVACIDAD */}
      {showPrivacyModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-left space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Política de Privacidad y Protección de Datos</h3>
              <button 
                type="button" 
                onClick={() => setShowPrivacyModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                De conformidad con el Reglamento General de Protección de Datos (RGPD) y la LOPD-GDD, los datos de contacto y detalles de cotización facilitados en este formulario serán tratados exclusivamente por <strong>Dynamic Tours S.A.</strong> con la finalidad de gestionar su solicitud de cotización técnica mayorista para agencias de viajes.
              </p>
              <p>
                Sus datos no serán cedidos a terceros salvo para la ejecución de los servicios turísticos contratados o por obligación legal. En cualquier momento puede ejercer sus derechos de acceso, rectificación, supresión y oposición a través del canal oficial de atención a agencias minoristas.
              </p>
            </div>
            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 bg-[#1F82D2] text-white font-semibold text-xs rounded-lg hover:bg-[#1868A8] transition-colors"
              >
                Entendido y cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
