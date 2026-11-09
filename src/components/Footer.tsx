import React, { useState } from "react";
import Logo from "./Logo";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Lock, 
  ChevronRight,
  Globe
} from "lucide-react";

// Crisp SVG Icons for Instagram, Facebook & WhatsApp
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
  const [isDestinosExpanded, setIsDestinosExpanded] = useState(false);

  const handleDestinationClick = (e: React.MouseEvent, dest: string) => {
    e.preventDefault();
    if (onNavigateDestinos) {
      onNavigateDestinos();
    } else {
      window.location.hash = "destinos";
    }
  };

  return (
    <footer 
      className="text-[#465568] border-t border-slate-300/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] font-sans relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F5F8FA 0%, #EBF0F4 32%, #E5EBF0 68%, #DFE5EB 100%)"
      }}
    >
      {/* Luces ambientales multicapa con efecto cristal nacarado y matices azul / verde */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 80% 12%, rgba(31, 130, 210, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 45% at 15% 85%, rgba(82, 167, 43, 0.06) 0%, transparent 70%),
            radial-gradient(ellipse 75% 55% at 50% 45%, rgba(255, 255, 255, 0.5) 0%, transparent 80%)
          `
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16 relative z-10 space-y-12 sm:space-y-14">
        
        {/* ==================================================================== */}
        {/* 1. CUADRÍCULA PRINCIPAL DE 4 COLUMNAS */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 text-left items-start">
          
          {/* COLUMNA 1 (lg:col-span-4): Identidad Corporativa y Redes Sociales */}
          <div className="lg:col-span-4 space-y-5">
            {/* Símbolo oficial D con sus colores originales */}
            <div className="flex items-center gap-3.5">
              <Logo iconOnly={true} className="h-10 sm:h-11 w-auto" classNameImg="select-none" />
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg font-bold text-[#14243B] tracking-wide">DYNAMIC TOURS S.A.</span>
                <span className="text-[10px] font-semibold tracking-wider text-[#465568] uppercase mt-1">Mayorista de Viajes · C.I.C.M.A. 1266</span>
              </div>
            </div>

            {/* Redes Sociales en contenedores blancos semitransparentes */}
            <div className="pt-2 space-y-3">
              <span className="block text-[11px] font-bold text-[#465568] uppercase tracking-widest">
                Síguenos en Redes y Canales Oficiales
              </span>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/dynamictours/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/90 to-white/70 hover:from-white hover:to-white/95 backdrop-blur-md border border-white/90 hover:border-[#1F82D2]/60 text-[#1F82D2] flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(20,36,59,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(31,130,210,0.15)]"
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
                  className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/90 to-white/70 hover:from-white hover:to-white/95 backdrop-blur-md border border-white/90 hover:border-[#1F82D2]/60 text-[#1F82D2] flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(20,36,59,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(31,130,210,0.15)]"
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
                  className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/90 to-white/70 hover:from-white hover:to-white/95 backdrop-blur-md border border-white/90 hover:border-[#1F82D2]/60 text-[#1F82D2] flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(20,36,59,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(31,130,210,0.15)]"
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
            <h4 className="text-xs sm:text-[13px] font-bold text-[#14243B] uppercase tracking-wider flex items-center gap-2 border-b border-slate-300/60 shadow-[0_1px_0_rgba(255,255,255,0.8)] pb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#1F82D2]" />
              <span>Sede Central Madrid</span>
            </h4>

            <ul className="space-y-3.5 text-xs sm:text-[12.5px] text-[#465568]">
              {/* Dirección */}
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#14243B] font-bold block">Oficinas Centrales</span>
                  <span className="text-[#465568]">Avda. Menéndez Pelayo, 83</span>
                  <span className="text-[#465568] block">28007 Madrid · España</span>
                </div>
              </li>

              {/* Email Reservas */}
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#465568] block text-[11px] uppercase tracking-wider font-bold">Booking & Reservas</span>
                  <a href="mailto:reservas@dynamic-tours.com" className="text-[#14243B] hover:text-[#1F82D2] transition-colors font-bold">
                    reservas@dynamic-tours.com
                  </a>
                </div>
              </li>

              {/* Teléfono Central */}
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#465568] block text-[11px] uppercase tracking-wider font-bold">Teléfono Central</span>
                  <a href="tel:915521443" className="text-[#14243B] hover:text-[#1F82D2] transition-colors font-bold text-sm tracking-wide">
                    915 521 443
                  </a>
                </div>
              </li>

              {/* Teléfono Urgencias / Guardia */}
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#0E6245] shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#465568] text-[11px] uppercase tracking-wider font-bold">Guardia 24/7</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#BFE9DD]/90 text-[#0E6245] font-bold text-[9px] uppercase tracking-wider border border-[#A5DEC9]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                      Urgencias
                    </span>
                  </div>
                  <a href="tel:690125031" className="text-[#0E6245] hover:text-[#0A4833] transition-colors font-bold text-sm tracking-wide">
                    690 125 031
                  </a>
                </div>
              </li>

              {/* Horario */}
              <li className="flex items-start gap-2.5 pt-2 border-t border-slate-300/60 shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                <Clock className="w-4 h-4 text-[#465568] shrink-0 mt-0.5" />
                <div className="text-[#465568] text-[11.5px] leading-relaxed">
                  <span className="text-[#14243B] font-bold block">Horario de Atención:</span>
                  <span>Lunes a Viernes: 9:30 a 14:00 h</span>
                  <span className="block">y de 15:30 a 19:00 h</span>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3 (lg:col-span-2): Información de Interés */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs sm:text-[13px] font-bold text-[#14243B] uppercase tracking-wider flex items-center gap-2 border-b border-slate-300/60 shadow-[0_1px_0_rgba(255,255,255,0.8)] pb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#52A72B]" />
              <span>Información de Interés</span>
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-[12.5px] text-[#465568]">
              <li>
                <a href="#ofertas" className="hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Ofertas y Programación</span>
                </a>
              </li>
              <li>
                <a href="#viajes-a-medida-grupos" className="hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Viajes a Medida y Grupos</span>
                </a>
              </li>
              <li>
                <a href="#condiciones" className="hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Condiciones Generales</span>
                </a>
              </li>
              <li>
                <a href="#pagos-cancelacion" className="hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Política de Pagos y Cancelación</span>
                </a>
              </li>
              <li>
                <a href="#seguros" className="hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
                  <span>Documentación de Seguros</span>
                </a>
              </li>
              <li>
                <a href="#alta-agencia" className="hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 group font-bold text-[#14243B]">
                  <ChevronRight className="w-3.5 h-3.5 text-[#52A72B] group-hover:translate-x-0.5 transition-all" />
                  <span>Registro de Nueva Agencia</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4 (lg:col-span-3): Canal Profesional B2B & Garantías */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-[13px] font-bold text-[#14243B] uppercase tracking-wider flex items-center gap-2 border-b border-slate-300/60 shadow-[0_1px_0_rgba(255,255,255,0.8)] pb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#1F82D2]" />
              <span>Garantías y Canal B2B</span>
            </h4>

            {/* Tarjeta de Garantía Legal */}
            <div className="bg-gradient-to-b from-white/90 to-white/65 backdrop-blur-md border border-white/90 rounded-2xl p-4 sm:p-5 space-y-2.5 text-xs shadow-[0_6px_24px_rgba(20,36,59,0.04),inset_0_1px_0_rgba(255,255,255,0.95)]">
              <div className="flex items-center gap-2 text-[#0E6245] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#0E6245] shrink-0" />
                <span>Garantía de Solvencia Mayorista</span>
              </div>
              <p className="text-[11.5px] text-[#465568] leading-relaxed">
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
                className="w-full bg-gradient-to-b from-white/90 to-white/70 hover:from-white hover:to-white/95 backdrop-blur-md border border-white/90 hover:border-[#1F82D2]/50 text-[#14243B] py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(20,36,59,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_4px_16px_rgba(31,130,210,0.12)] group"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#1F82D2]" />
                  <span>Acceso Intranet Agencias</span>
                </span>
                <ChevronRight className="w-4 h-4 text-[#465568] group-hover:text-[#1F82D2] group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 2. DIRECTORIO EXPANDIDO DE DESTINOS Y GRANDES VIAJES */}
        {/* ==================================================================== */}
        <section 
          aria-label="Directorio oficial de grandes viajes de Dynamic Tours"
          className="pt-8 border-t border-slate-300/60 shadow-[0_1px_0_rgba(255,255,255,0.8)] space-y-5 text-left"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-[#14243B] uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#1F82D2]" />
                <span>Grandes Viajes y Destinos Programados</span>
              </h4>
              <p className="text-[11.5px] text-[#465568] mt-1">
                Catálogo mayorista con operativas garantizadas, salidas desde múltiples aeropuertos y cotización a medida para agencias.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDestinosExpanded(!isDestinosExpanded)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-b from-white/90 to-white/70 hover:from-white hover:to-white/95 backdrop-blur-md border border-white/90 hover:border-[#1F82D2]/50 text-xs text-[#1F82D2] font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all duration-300 shadow-[0_2px_8px_rgba(20,36,59,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_4px_14px_rgba(31,130,210,0.12)]"
            >
              <span>{isDestinosExpanded ? "Contraer directorio" : "Ver todos los destinos (44)"}</span>
              <ChevronRight className={`w-3.5 h-3.5 text-[#1F82D2] transition-transform duration-200 ${isDestinosExpanded ? "rotate-90" : ""}`} />
            </button>
          </div>

          {isDestinosExpanded && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2 pt-2 animate-fade-in">
              {DESTINATION_LINKS.map((destination) => (
                <a
                  key={destination}
                  href="#destinos"
                  onClick={(e) => handleDestinationClick(e, destination)}
                  className="text-[11.5px] text-[#465568] hover:text-[#1F82D2] transition-colors py-0.5 truncate block group"
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
        {/* 3. SUBFOOTER INFERIOR (LEGAL, CICMA, DERECHOS) */}
        {/* ==================================================================== */}
        <div className="pt-8 border-t border-slate-300/60 shadow-[0_1px_0_rgba(255,255,255,0.8)] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#465568] text-center md:text-left">
          <div className="space-y-0.5">
            <p>© {new Date().getFullYear()} <strong className="text-[#14243B] font-bold">Dynamic Tours S.A.</strong> Todos los derechos reservados.</p>
            <p className="text-[#64748B] text-[10.5px]">Agencia Mayorista de Viajes · Licencia C.I.C.M.A. 1266 · Sede Central: Av. Menéndez Pelayo, 83, Madrid.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-[#465568]">
            <a href="#aviso-legal" className="hover:text-[#1F82D2] hover:underline transition-colors">
              Aviso Legal
            </a>
            <span className="text-slate-400">·</span>
            <a href="#privacidad" className="hover:text-[#1F82D2] hover:underline transition-colors">
              Política de Privacidad
            </a>
            <span className="text-slate-400">·</span>
            <a href="#cookies" className="hover:text-[#1F82D2] hover:underline transition-colors">
              Política de Cookies
            </a>
            <span className="text-slate-400">·</span>
            <a href="#condiciones" className="hover:text-[#1F82D2] hover:underline transition-colors">
              Condiciones Generales
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
