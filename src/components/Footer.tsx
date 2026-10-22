import React, { useState } from "react";
import Logo from "./Logo";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Building2, 
  ChevronRight,
  Globe
} from "lucide-react";

// Crisp SVG Icons for Instagram & Facebook (official vector paths matching modern high-end styling)
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

// 44 Destination programs from the official website catalog
const DESTINATION_LINKS: string[] = [
  "Viajes Alemania", "Viajes Argentina", "Viajes Armenia", "Viajes Austria", "Viajes Bélgica", "Viajes Bulgaria",
  "Viajes Camboya", "Viajes Canadá", "Viajes China", "Viajes Costa Rica", "Viajes Dubái", "Viajes Egipto",
  "Viajes Escocia", "Viajes España", "Viajes Georgia", "Viajes Grecia", "Viajes Holanda", "Viajes Hungría",
  "Viajes India", "Viajes Inglaterra", "Viajes Irán", "Viajes Irlanda", "Viajes Israel", "Viajes Italia",
  "Viajes Japón", "Viajes Jordania", "Viajes Kenia", "Viajes Maldivas", "Viajes Marruecos", "Viajes México",
  "Viajes Moldavia", "Viajes Nepal", "Viajes Polonia", "Viajes Portugal", "Viajes Rep. Bálticas", "Viajes Rep. Checa",
  "Viajes Rumanía", "Viajes Sri Lanka", "Viajes Tailandia", "Viajes Tanzania", "Viajes Túnez", "Viajes Turquía",
  "Viajes Uzbekistán", "Viajes Vietnam"
];

interface FooterProps {
  onOpenB2BLogin?: () => void;
  onNavigateDestinos?: () => void;
}

export default function Footer({ onOpenB2BLogin, onNavigateDestinos }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [isDestinosExpanded, setIsDestinosExpanded] = useState(true);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterError("Por favor, introduce un correo electrónico profesional válido.");
      return;
    }
    setNewsletterError("");
    setNewsletterSubmitted(true);
  };

  const handleDestinationClick = (e: React.MouseEvent, dest: string) => {
    e.preventDefault();
    if (onNavigateDestinos) {
      onNavigateDestinos();
    } else {
      window.location.hash = "destinos";
    }
  };

  return (
    <footer className="bg-[#070D18] text-slate-300 border-t border-slate-800/90 font-sans relative overflow-hidden">
      {/* Sutiles halos luminosos de ambientación con la paleta de la Home */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1F82D2]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-[#52A72B]/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-14 lg:py-18 relative z-10 space-y-14 sm:space-y-16">
        
        {/* ==================================================================== */}
        {/* 1. ESPACIO DESTACADO: NEWSLETTER PARA AGENCIAS Y PROFESIONALES */}
        {/* ==================================================================== */}
        <section 
          aria-label="Suscripción a la Newsletter de Dynamic Tours"
          className="relative rounded-2xl bg-gradient-to-br from-slate-900/95 via-[#0A1526]/95 to-slate-900/95 border border-slate-700/60 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden"
        >
          {/* Fina línea superior en degradado Dynamic */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1F82D2] via-[#52A72B] to-[#1F82D2]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Lado izquierdo: Información y llamada a la acción */}
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-3 text-left">
              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-snug">
                Recibe cupos preferentes, bajadas de tarifas y producto en primicia
              </h3>
              <p className="text-slate-400 text-xs sm:text-[13.5px] leading-relaxed max-w-2xl">
                Mantén a tu agencia informada con nuestra newsletter para profesionales: aperturas de programación, disponibilidad garantizada en grandes viajes, condiciones de cotización y ofertas especiales de última hora.
              </p>
            </div>

            {/* Lado derecho: Formulario interactivo con validación y estado de éxito */}
            <div className="lg:col-span-5 text-left">
              {newsletterSubmitted ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-5 text-left animate-fade-in space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <span>¡Suscripción confirmada!</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Hemos registrado <strong className="text-white font-medium">{newsletterEmail}</strong> en la lista preferente de agencias de Dynamic Tours. Recibirás nuestras próximas comunicaciones comerciales exclusivas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input 
                        type="email" 
                        required
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value);
                          if (newsletterError) setNewsletterError("");
                        }}
                        placeholder="Introduce tu email profesional..."
                        className="w-full h-11 sm:h-12 pl-10 pr-3 text-xs sm:text-sm bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#1F82D2] focus:ring-2 focus:ring-[#1F82D2]/30 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-11 sm:h-12 px-6 rounded-xl bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Suscribirme</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {newsletterError && (
                    <p className="text-xs text-rose-400 font-medium">{newsletterError}</p>
                  )}

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Sin spam. Comunicaciones exclusivas para profesionales del sector turístico. Puedes darte de baja en cualquier momento según nuestra Política de Privacidad.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 2. CUADRÍCULA PRINCIPAL DE 4 COLUMNAS */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 text-left items-start">
          
          {/* COLUMNA 1 (lg:col-span-4): Identidad Corporativa y Redes Sociales */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo oficial integrado directamente sobre el fondo oscuro sin caja blanca */}
            <div className="flex items-center gap-3.5">
              <Logo className="h-9 sm:h-10 w-auto" classNameImg="brightness-0 invert drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] select-none" />
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg font-bold text-white tracking-wide">DYNAMIC TOURS S.A.</span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-1">Mayorista de Viajes · C.I.C.M.A. 1266</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
              Fundada en Madrid en el año 2000, somos institución mayorista de referencia en la península ibérica para grandes viajes, circuitos culturales de alta gama y programación exclusiva con respaldo directo a agencias minoristas.
            </p>

            {/* Redes Sociales con diseño elegante */}
            <div className="pt-2 space-y-3">
              <span className="block text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                Síguenos en Redes y Canales Oficiales
              </span>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/dynamictours/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-pink-500/80 text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                  title="Síguenos en Instagram (@dynamictours)"
                  aria-label="Instagram de Dynamic Tours"
                >
                  <InstagramIcon className="w-4.5 h-4.5" />
                </a>

                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/DynamicToursMayorista" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-[#1877F2] text-slate-300 hover:text-white hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                  title="Síguenos en Facebook"
                  aria-label="Facebook de Dynamic Tours"
                >
                  <FacebookIcon className="w-4.5 h-4.5" />
                </a>

                {/* WhatsApp Directo */}
                <a 
                  href="https://wa.me/34690125031" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-emerald-500 text-slate-300 hover:text-white hover:bg-emerald-600 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
                  title="WhatsApp de Guardia y Urgencias 24h (+34 690 125 031)"
                  aria-label="WhatsApp de Atención de Urgencias 24h"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA 2 (lg:col-span-3): Sede Central y Datos de Oficina Madrid */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#1F82D2]" />
              <span>Sede Central Madrid</span>
            </h4>

            <ul className="space-y-3.5 text-xs sm:text-[12.5px] text-slate-300">
              {/* Dirección */}
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Oficinas Centrales</span>
                  <span className="text-slate-400">Avda. Menéndez Pelayo, 83</span>
                  <span className="text-slate-400 block">28007 Madrid · España</span>
                </div>
              </li>

              {/* Email Reservas */}
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Booking & Reservas</span>
                  <a href="mailto:reservas@dynamic-tours.com" className="text-white hover:text-[#1F82D2] transition-colors font-medium">
                    reservas@dynamic-tours.com
                  </a>
                </div>
              </li>

              {/* Teléfono Central */}
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Teléfono Central</span>
                  <a href="tel:915521443" className="text-white hover:text-[#1F82D2] transition-colors font-bold text-sm tracking-wide">
                    915 521 443
                  </a>
                </div>
              </li>

              {/* Teléfono Urgencias / Guardia */}
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Guardia 24/7</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9px] uppercase tracking-wider border border-emerald-500/30">
                      Urgencias
                    </span>
                  </div>
                  <a href="tel:690125031" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold text-sm tracking-wide">
                    690 125 031
                  </a>
                </div>
              </li>

              {/* Horario */}
              <li className="flex items-start gap-2.5 pt-1 border-t border-slate-800/60">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="text-slate-400 text-[11.5px] leading-relaxed">
                  <span className="text-slate-300 font-semibold block">Horario de Atención:</span>
                  <span>Lunes a Viernes: 9:30 a 14:00 h</span>
                  <span className="block">y de 15:30 a 19:00 h</span>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3 (lg:col-span-2): Información de Interés */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#52A72B]" />
              <span>Información de Interés</span>
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-[12.5px] text-slate-400">
              <li>
                <a href="#nosotros" className="hover:text-white hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Sobre Dynamic</span>
                </a>
              </li>
              <li>
                <a href="#ofertas" className="hover:text-white hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Ofertas y Programación</span>
                </a>
              </li>
              <li>
                <a href="#viajes-a-medida-grupos" className="hover:text-white hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Viajes a Medida y Grupos</span>
                </a>
              </li>
              <li>
                <a href="#condiciones" className="hover:text-white hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Condiciones Generales</span>
                </a>
              </li>
              <li>
                <a href="#pagos-cancelacion" className="hover:text-white hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Política de Pagos y Cancelación</span>
                </a>
              </li>
              <li>
                <a href="#seguros" className="hover:text-white hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Documentación de Seguros</span>
                </a>
              </li>
              <li>
                <a href="#alta-agencia" className="hover:text-white hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group font-medium text-slate-300">
                  <ChevronRight className="w-3.5 h-3.5 text-[#52A72B] group-hover:translate-x-0.5 transition-all" />
                  <span>Registro de Nueva Agencia</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4 (lg:col-span-3): Canal Profesional B2B & Garantías */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B]" />
              <span>Garantías y Canal B2B</span>
            </h4>

            {/* Tarjeta de Garantía Legal */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantía de Solvencia Mayorista</span>
              </div>
              <p className="text-[11.5px] text-slate-400 leading-relaxed">
                Cumplimos estrictamente con los avales, pólizas de responsabilidad civil y depósitos de garantía exigidos por la Directiva Europea de Viajes Combinados. Registrados en la Comunidad de Madrid con código C.I.C.M.A. 1266.
              </p>
            </div>

            {/* Acceso B2B para Agentes */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  if (onOpenB2BLogin) onOpenB2BLogin();
                  else window.location.hash = "b2b";
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-[#1F82D2] text-white py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer shadow-xs group"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#1F82D2]" />
                  <span>Acceso Intranet Agencias</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 3. DIRECTORIO EXPANDIDO DE DESTINOS Y GRANDES VIAJES */}
        {/* ==================================================================== */}
        <section 
          aria-label="Directorio oficial de grandes viajes de Dynamic Tours"
          className="pt-8 border-t border-slate-800/80 space-y-5 text-left"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#1F82D2]" />
                <span>Grandes Viajes y Destinos Programados</span>
              </h4>
              <p className="text-[11.5px] text-slate-400 mt-1">
                Catálogo mayorista con operativas garantizadas, salidas desde múltiples aeropuertos y cotización a medida para agencias.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDestinosExpanded(!isDestinosExpanded)}
              className="text-xs text-[#1F82D2] hover:text-[#52A72B] font-semibold flex items-center gap-1 self-start sm:self-auto cursor-pointer transition-colors"
            >
              <span>{isDestinosExpanded ? "Contraer directorio" : "Ver todos los destinos (44)"}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isDestinosExpanded ? "rotate-90" : ""}`} />
            </button>
          </div>

          {isDestinosExpanded && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2 pt-2 animate-fade-in">
              {DESTINATION_LINKS.map((destination) => (
                <a
                  key={destination}
                  href="#destinos"
                  onClick={(e) => handleDestinationClick(e, destination)}
                  className="text-[11.5px] text-slate-400 hover:text-white hover:text-[#1F82D2] transition-colors py-0.5 truncate block group"
                  title={`Programación mayorista de ${destination}`}
                >
                  <span className="group-hover:translate-x-0.5 inline-block transition-transform">
                    {destination}
                  </span>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* ==================================================================== */}
        {/* 4. SUBFOOTER INFERIOR (LEGAL, CICMA, DERECHOS) */}
        {/* ==================================================================== */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center md:text-left">
          <div className="space-y-0.5">
            <p>© {new Date().getFullYear()} <strong className="text-slate-300 font-semibold">Dynamic Tours S.A.</strong> Todos los derechos reservados.</p>
            <p className="text-slate-500 text-[10.5px]">Agencia Mayorista de Viajes · Licencia C.I.C.M.A. 1266 · Sede Central: Av. Menéndez Pelayo, 83, Madrid.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-slate-400">
            <a href="#aviso-legal" className="hover:text-white hover:underline transition-colors">
              Aviso Legal
            </a>
            <span className="text-slate-700">·</span>
            <a href="#privacidad" className="hover:text-white hover:underline transition-colors">
              Política de Privacidad
            </a>
            <span className="text-slate-700">·</span>
            <a href="#cookies" className="hover:text-white hover:underline transition-colors">
              Política de Cookies
            </a>
            <span className="text-slate-700">·</span>
            <a href="#condiciones" className="hover:text-white hover:underline transition-colors">
              Condiciones Generales
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
