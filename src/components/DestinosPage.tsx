import React, { useState, useMemo } from "react";
import Logo from "./Logo";
import SeamlessHeroVideo from "./SeamlessHeroVideo";
import { assetUrl } from "../utils/assets";
import { 
  Search, 
  ChevronDown, 
  ArrowRight, 
  Lock, 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles,
  Building2,
  CheckCircle2,
  User,
  ShieldCheck,
  Phone,
  Mail
} from "lucide-react";

export interface DestinosPageProps {
  onBackToHome: () => void;
  onEnterB2B?: (agent: string, agency: string) => void;
  onSelectSenior?: () => void;
  onSelectLeyendas?: () => void;
  onSelectGrupos?: () => void;
}

interface TourProgram {
  id: string;
  country: string;
  region: string;
  title: string;
  titleLine1?: string;
  titleLine2?: string | null;
  subtitle?: string | null;
  tag: string;
  duration: string;
  description: string;
  price?: string | null; // e.g. "1.285 €" or null for "Consultar precio"
  image: string;
  imagePos?: string;
  bottomImagePos?: string;
  departureCities?: string[];
  isSenior?: boolean;
  isLeyendas?: boolean;
}

// 5 ZONES as specified: Oriente Medio, Asia, África, Europa, América
interface ZoneDefinition {
  id: string;
  name: string;
  countries: string[];
}

const ZONES: ZoneDefinition[] = [
  {
    id: "oriente-medio",
    name: "Oriente Medio",
    countries: ["Egipto", "Jordania", "Dubái", "Irán", "Israel"]
  },
  {
    id: "asia",
    name: "Asia",
    countries: ["Armenia", "Camboya", "China", "India", "Japón", "Maldivas", "Nepal", "Sri Lanka", "Tailandia", "Uzbekistán", "Vietnam"]
  },
  {
    id: "europa",
    name: "Europa",
    countries: ["Turquía", "Portugal", "Alemania", "Austria", "Bélgica", "Croacia", "España", "Grecia", "Italia", "Reino Unido"]
  },
  {
    id: "america",
    name: "América",
    countries: ["Argentina", "Canadá", "Costa Rica", "Estados Unidos", "México"]
  },
  {
    id: "africa",
    name: "África",
    countries: ["Kenia", "Marruecos", "Tanzania", "Túnez"]
  }
];

// Available programs catalog
const CATALOG_PROGRAMS: TourProgram[] = [
  // --- EGIPTO (4 programs matching mockup) ---
  {
    id: "egipto-selecto-senior",
    country: "Egipto",
    region: "Oriente Medio",
    title: "Egipto Selecto Senior",
    titleLine1: "Egipto Selecto Senior",
    subtitle: "Especial mayores de 55 años",
    tag: "ESPECIAL +55",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Crucero de 4 noches por el Nilo y 3 noches en El Cairo con visitas exclusivas, traslados y régimen todo incluido.",
    price: "1.285 €",
    image: "/senior dynamic ok.png",
    imagePos: "object-[center_36%]",
    bottomImagePos: "object-[center_70%]",
    departureCities: ["Madrid", "Barcelona"],
    isSenior: true
  },
  {
    id: "egipto-leyendas",
    country: "Egipto",
    region: "Oriente Medio",
    title: "Leyendas de Egipto",
    titleLine1: "Leyendas de Egipto",
    subtitle: null,
    tag: "SIN ABU SIMBEL",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Crucero por el Nilo en pensión completa y estancia en El Cairo con entrada por Asuán y salidas en viernes.",
    price: "764 €",
    image: "/dia_5_guiza.jpg",
    imagePos: "object-[center_28%]",
    bottomImagePos: "object-[center_60%]",
    departureCities: ["Madrid", "Barcelona", "Valencia"],
    isLeyendas: true
  },
  {
    id: "egipto-descubre",
    country: "Egipto",
    region: "Oriente Medio",
    title: "Descubre Egipto · Crucero por el Nilo + El Cairo",
    titleLine1: "Descubre Egipto ·",
    titleLine2: "Crucero por el Nilo + El Cairo",
    subtitle: null,
    tag: "BAJADA DE PRECIOS",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Crucero por el Nilo en pensión completa y estancia en El Cairo con visitas guiadas a templos y pirámides.",
    price: "499 €",
    image: "/egipto_feluca.png",
    imagePos: "object-[20%_74%]",
    bottomImagePos: "object-[20%_90%]",
    departureCities: ["Madrid", "Barcelona", "Bilbao"]
  },
  {
    id: "egipto-fin-de-ano",
    country: "Egipto",
    region: "Oriente Medio",
    title: "Descubre Egipto · Especial Fin de Año",
    titleLine1: "Descubre Egipto ·",
    titleLine2: "Especial Fin de Año",
    subtitle: null,
    tag: "SALIDAS DESDE PROVINCIAS",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Crucero por el Nilo y estancia en El Cairo con cupos garantizados y vuelos directos desde múltiples aeropuertos.",
    price: "Consultar precio", // Fallback test: no "Desde" preceding it
    image: "/egipto_fin_de_ano.jpg",
    imagePos: "object-center",
    bottomImagePos: "object-[center_70%]",
    departureCities: ["Madrid", "Barcelona", "Valencia", "Zaragoza", "Bilbao", "Santiago"]
  },

  // --- TURQUÍA ---
  {
    id: "turquia-suenos",
    country: "Turquía",
    region: "Europa",
    title: "Sueños de Estambul y Capadocia",
    titleLine1: "Sueños",
    titleLine2: "de Estambul y Capadocia",
    subtitle: null,
    tag: "VUELO DOMÉSTICO INCLUIDO",
    duration: "8 DÍAS / 7 NOCHES",
    description: "4 noches en Estambul con desayuno y 3 noches en Capadocia en pensión completa. Incluye vuelo doméstico, visitas guiadas y traslados.",
    price: "1.509 €",
    image: "/turquia_dynamic.png",
    imagePos: "object-[center_32%]",
    bottomImagePos: "object-[center_60%]",
    departureCities: ["Madrid", "Barcelona", "Málaga"]
  },
  {
    id: "turquia-ruta-confort",
    country: "Turquía",
    region: "Europa",
    title: "Ruta turca completa - Confort",
    titleLine1: "Ruta turca completa",
    titleLine2: "Confort",
    subtitle: null,
    tag: "CIRCUITO CON VUELOS",
    duration: "8 DÍAS / 7 NOCHES",
    description: "4 noches en Estambul con desayuno, 2 noches en Capadocia y 1 noche en Pamukkale en pensión completa. Vuelos y traslados incluidos.",
    price: "1.599 €",
    image: "/pamukkale_ruta_turca.jpg",
    imagePos: "object-[center_42%]",
    bottomImagePos: "object-[center_60%]",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- JORDANIA ---
  {
    id: "jordania-maravillas",
    country: "Jordania",
    region: "Oriente Medio",
    title: "Maravillas del Hachemita y Wadi Rum",
    titleLine1: "Maravillas de Jordania",
    subtitle: null,
    tag: "PETRA & DESIERTO",
    duration: "8 DÍAS / 7 NOCHES",
    description: "4N Ammán + 2N Petra + 1N en campamento beduino en Wadi Rum en MP. Safari 4x4 por el desierto, entrada a Petra y Mar Muerto.",
    price: "1.425 €",
    image: "/jordania_petra.jpg",
    imagePos: "object-center",
    bottomImagePos: "object-center",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- PORTUGAL ---
  {
    id: "portugal-oporto",
    country: "Portugal",
    region: "Europa",
    title: "Escapada Porto & Crucero Seis Puentes",
    titleLine1: "Escapada Porto & Seis Puentes",
    subtitle: null,
    tag: "ESCAPADA CULTURAL",
    duration: "3 DÍAS / 2 NOCHES",
    description: "Escapada cultural en Oporto. Alojamiento y desayuno, crucero rabelo por el río Duero y cata en bodegas tradicionales.",
    price: "199 €",
    image: "/portugal_porto.jpg",
    imagePos: "object-center",
    bottomImagePos: "object-center",
    departureCities: ["Madrid", "Barcelona", "Bilbao", "Valencia"]
  }
];

export default function DestinosPage({
  onBackToHome,
  onEnterB2B,
  onSelectSenior,
  onSelectLeyendas,
  onSelectGrupos
}: DestinosPageProps) {
  // Navigation & filter states
  const [selectedZoneId, setSelectedZoneId] = useState<string>("oriente-medio");
  const [selectedCountry, setSelectedCountry] = useState<string>("Egipto");

  // Filter bar states
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recommended");

  // B2B Login modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [agentUser, setAgentUser] = useState<string>("");
  const [agencyAgency, setAgencyAgency] = useState<string>("");

  // Active zone definition
  const activeZone = useMemo(() => {
    return ZONES.find((z) => z.id === selectedZoneId) || ZONES[0];
  }, [selectedZoneId]);

  // When changing zone, select first country in that zone if current not present
  const handleSelectZone = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    const zone = ZONES.find((z) => z.id === zoneId);
    if (zone && !zone.countries.includes(selectedCountry)) {
      setSelectedCountry(zone.countries[0]);
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setCityFilter("all");
    setDateFilter("all");
    setDurationFilter("all");
    setSearchQuery("");
    setSortBy("recommended");
  };

  // Filter and sort programs
  const displayedPrograms = useMemo(() => {
    let result = CATALOG_PROGRAMS.filter((p) => p.country.toLowerCase() === selectedCountry.toLowerCase());

    if (cityFilter !== "all") {
      result = result.filter((p) => p.departureCities?.includes(cityFilter));
    }

    if (durationFilter !== "all") {
      if (durationFilter === "8d") {
        result = result.filter((p) => p.duration.includes("8 DÍAS") || p.duration.includes("8 Días"));
      } else if (durationFilter === "short") {
        result = result.filter((p) => p.duration.includes("3 DÍAS") || p.duration.includes("4 DÍAS"));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => {
        const numA = parseInt(a.price?.replace(/[^\d]/g, "") || "99999", 10);
        const numB = parseInt(b.price?.replace(/[^\d]/g, "") || "99999", 10);
        return numA - numB;
      });
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => {
        const numA = parseInt(a.price?.replace(/[^\d]/g, "") || "0", 10);
        const numB = parseInt(b.price?.replace(/[^\d]/g, "") || "0", 10);
        return numB - numA;
      });
    }

    return result;
  }, [selectedCountry, cityFilter, durationFilter, searchQuery, sortBy]);

  // Handle click on "Ver detalles"
  const handleProgramClick = (program: TourProgram) => {
    if (program.isSenior && onSelectSenior) {
      onSelectSenior();
    } else if (program.isLeyendas && onSelectLeyendas) {
      onSelectLeyendas();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onEnterB2B) {
      onEnterB2B(agentUser || "Agente Profesional", agencyAgency || "Agencia Colaboradora");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#1F82D2] selection:text-white pb-24">
      
      {/* 1. CABECERA REAL DEL PROYECTO */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
          
          {/* Logo y Slogan */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button 
              type="button" 
              onClick={onBackToHome}
              className="flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
              title="Ir al inicio de Dynamic Tours"
            >
              <Logo className="h-8 sm:h-9 w-auto" />
            </button>
            <div className="hidden sm:block h-4.5 w-px bg-slate-300" />
            <div className="hidden sm:flex items-center gap-1 font-bold text-[10px] sm:text-[10.5px] tracking-wide uppercase whitespace-nowrap">
              <span className="text-[#1F82D2]">AGENCIA MAYORISTA</span>
              <span className="text-[#52A72B]">DE VIAJES</span>
            </div>
          </div>

          {/* Menú Central */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 text-[11px] xl:text-xs font-bold text-slate-800 whitespace-nowrap">
            {/* DESTINOS (Página actual activa) */}
            <div className="flex items-center gap-1.5 uppercase tracking-wider py-1.5 px-3 rounded-lg font-bold text-xs bg-white border border-[#1F82D2] text-[#0A0F1D] shadow-2xs">
              <span>Destinos</span>
            </div>

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
                if (onSelectGrupos) {
                  onSelectGrupos();
                } else {
                  window.location.hash = "viajes-a-medida-grupos";
                }
              }}
              className="hover:text-[#1F82D2] transition-colors font-bold cursor-pointer"
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

          {/* Botones Derecha: Buscador + ACCESO AGENCIAS */}
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
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:opacity-95 text-white font-extrabold text-[10.5px] sm:text-[11px] uppercase tracking-wider py-1.5 px-2.5 sm:px-3 rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>ACCESO AGENCIAS</span>
            </button>
          </div>

        </div>
      </header>

      {/* 1. PORTADA PANORÁMICA CON VÍDEO DE LA TIERRA */}
      <section className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden bg-slate-950">
        <SeamlessHeroVideo 
          src="/portada_destinos.mp4"
          poster="/portada_destinos_poster.jpg"
          crossfadeDuration={1.2}
          objectPosition="object-[82%_center] sm:object-[78%_center] lg:object-right"
        />

        {/* Degradado para máxima legibilidad del texto en el lado oscuro izquierdo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none z-20" />

        {/* Textos superpuestos alineados a la izquierda */}
        <div className="absolute inset-0 flex items-center z-30 pointer-events-none">
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-2xl sm:max-w-3xl text-left pointer-events-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-bold text-white tracking-tight leading-[1.04] font-sans drop-shadow-md">
                Destinos
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-[23px] xl:text-[25px] text-slate-100 mt-3 sm:mt-4 font-medium drop-shadow-sm leading-snug">
                Encuentra la próxima propuesta para tus clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Breadcrumb: Inicio / Destinos */}
        <nav aria-label="Breadcrumb" className="pt-5 pb-3">
          <ol className="flex items-center text-xs text-slate-500 font-medium">
            <li>
              <button 
                type="button" 
                onClick={onBackToHome}
                className="hover:text-[#1F82D2] transition-colors cursor-pointer"
              >
                Inicio
              </button>
            </li>
            <li className="mx-2 text-slate-300">/</li>
            <li className="text-slate-700 font-semibold" aria-current="page">
              Destinos
            </li>
          </ol>
        </nav>

        {/* 2. SELECCIÓN DE ZONAS (5 zonas exactas, en orden y centradas) */}
        <section aria-label="Selección de zonas" className="mt-2 border-b border-slate-200/80">
          <div className="overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex items-center justify-center min-w-max mx-auto gap-1 sm:gap-2 whitespace-nowrap pb-px">
              {ZONES.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => handleSelectZone(zone.id)}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-[15px] font-semibold transition-all cursor-pointer rounded-t-lg select-none relative ${
                      isSelected
                        ? "bg-[#EAF3FA] text-[#0A1931]"
                        : "text-slate-600 hover:text-[#1F82D2] hover:bg-slate-50"
                    }`}
                  >
                    <span>{zone.name}</span>
                    {/* Línea inferior de color para zona activa */}
                    {isSelected && (
                      <span className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. SELECCIÓN DE PAÍSES: DISEÑO LIGERO */}
        <section aria-label="Selección de país" className="py-4 sm:py-5">
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 shrink-0 mr-1 select-none">
              Destino:
            </span>

            {activeZone.countries.map((country) => {
              const isSelected = country.toLowerCase() === selectedCountry.toLowerCase();
              return (
                <button
                  key={country}
                  type="button"
                  onClick={() => setSelectedCountry(country)}
                  className="group relative flex flex-col items-center px-2 py-1 text-xs sm:text-sm font-medium text-slate-800 hover:text-[#1F82D2] transition-colors cursor-pointer select-none"
                >
                  <span className="leading-tight">{country}</span>
                  {/* Contenedor de indicador reservado (3px) para evitar saltos de línea/posición */}
                  <div className="w-full h-[3px] mt-1.5 flex items-center justify-center">
                    <span 
                      className={`w-full transition-all duration-200 ${
                        isSelected 
                          ? "h-[3px] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] rounded-full shadow-2xs" 
                          : "h-[1px] bg-slate-200 group-hover:bg-slate-300"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. BARRA DE FILTROS */}
        <section aria-label="Filtros del catálogo" className="mt-2 mb-8">
          <div className="bg-[#EDF4FA] rounded-2xl p-3 sm:p-4 border border-slate-200/60 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 items-center">
              
              {/* Ciudad de salida */}
              <div className="lg:col-span-3 relative">
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full h-10 px-3.5 pr-8 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20 appearance-none cursor-pointer"
                >
                  <option value="all">Ciudad de salida</option>
                  <option value="Madrid">Madrid</option>
                  <option value="Barcelona">Barcelona</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Bilbao">Bilbao</option>
                  <option value="Málaga">Málaga</option>
                  <option value="Zaragoza">Zaragoza</option>
                  <option value="Santiago">Santiago</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Fecha de salida */}
              <div className="lg:col-span-3 relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full h-10 px-3.5 pr-8 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20 appearance-none cursor-pointer"
                >
                  <option value="all">Fecha de salida</option>
                  <option value="prox">Próximas salidas</option>
                  <option value="nov">Noviembre 2026</option>
                  <option value="dic">Diciembre 2026 / Fin de Año</option>
                  <option value="ene">Enero 2027</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Duración */}
              <div className="lg:col-span-2 relative">
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full h-10 px-3.5 pr-8 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20 appearance-none cursor-pointer"
                >
                  <option value="all">Duración</option>
                  <option value="8d">8 Días / 7 Noches</option>
                  <option value="short">Escapadas (3-4 Días)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Buscar programa */}
              <div className="lg:col-span-3 relative">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar programa"
                    className="w-full h-10 pl-9 pr-3.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Limpiar */}
              <div className="lg:col-span-1 flex items-center justify-end sm:justify-center">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs sm:text-sm font-semibold text-[#1F82D2] hover:text-[#1868A7] hover:underline cursor-pointer py-1"
                >
                  Limpiar
                </button>
              </div>

            </div>
          </div>

          {/* Subcabecera de resultados: Título dinámico + Ordenar por */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 sm:mt-8">
            <h2 className="text-2xl sm:text-[26px] font-bold text-[#0A1931] tracking-tight font-sans">
              Programas de {selectedCountry}
            </h2>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 pl-3 pr-8 bg-white rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-hidden appearance-none cursor-pointer"
                >
                  <option value="recommended">Ordenar por: Recomendados</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* 5. TARJETAS DE PROGRAMAS (GRID: 3 col escritorio, 2 tablet, 1 móvil) */}
        {displayedPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {displayedPrograms.map((program) => {
              const isClickable = Boolean(
                (program.isSenior && onSelectSenior) || 
                (program.isLeyendas && onSelectLeyendas)
              );

              // Check if price is present or missing/fallback
              const hasPrice = program.price && program.price.trim() !== "" && program.price !== "Consultar precio";

              return (
                <div
                  key={program.id}
                  onClick={() => handleProgramClick(program)}
                  className={`relative rounded-[18px] sm:rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-slate-200/80 transition-all duration-300 group flex flex-col h-[385px] sm:h-[395px] lg:h-[400px] xl:h-[415px] ${
                    isClickable ? "cursor-pointer" : ""
                  }`}
                >
                  {/* Fotografía superior con etiquetas */}
                  <div className="relative w-full flex-1 overflow-hidden bg-slate-100">
                    <img
                      src={assetUrl(program.image)}
                      alt={program.title}
                      className={`w-full h-full object-cover ${program.imagePos || "object-center"} group-hover:scale-104 transition-transform duration-700 ease-out`}
                      loading="lazy"
                    />

                    {/* Etiquetas superiores sobre la fotografía */}
                    <div className="absolute top-0 inset-x-0 p-3 sm:p-4.5 flex items-start justify-between gap-1.5 z-10 pointer-events-none">
                      {/* Etiqueta superior izquierda: Blanca esmerilada */}
                      <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-[7px] sm:rounded-[9px] bg-white/85 backdrop-blur-md border border-white/80 text-[#24766F] font-semibold text-[9.5px] sm:text-[11px] uppercase tracking-wider shadow-xs whitespace-nowrap">
                        {program.tag}
                      </span>

                      {/* Duración superior derecha */}
                      <span className="text-white font-medium text-[10.5px] sm:text-[11.5px] tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] pt-0.5 whitespace-nowrap shrink-0">
                        {program.duration}
                      </span>
                    </div>
                  </div>

                  {/* Panel inferior esmerilado con acabado idéntico a Destacadas */}
                  <div className="relative z-10 w-full h-[174px] sm:h-[176px] lg:h-[178px] xl:h-[182px] rounded-t-[16px] sm:rounded-t-[18px] overflow-hidden border-t border-white/90 border-x border-white/60 shadow-[0_-2px_14px_rgba(0,0,0,0.03)] shrink-0">
                    
                    {/* Capa de fondo con desenfoque de la imagen */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <img
                        src={assetUrl(program.image)}
                        alt=""
                        aria-hidden="true"
                        className={`w-full h-full object-cover filter blur-[20px] scale-110 ${program.bottomImagePos || program.imagePos || "object-center"}`}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "rgba(255, 255, 255, 0.72)",
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.85)"
                        }}
                      />
                    </div>

                    {/* Contenido del panel inferior */}
                    <div className="relative z-10 w-full h-full px-4 sm:px-4.5 xl:px-5 pt-2.5 sm:pt-3 xl:pt-3 pb-2.5 sm:pb-3 xl:pb-3 flex flex-col justify-between">
                      {/* Título, subtítulo y descripción */}
                      <div className="space-y-0.5 text-left">
                        <h3 className="text-[17px] sm:text-[18px] lg:text-[18px] xl:text-[20px] font-semibold text-[#0A1931] leading-[1.14] tracking-tight">
                          <span className="block">{program.titleLine1 || program.title}</span>
                          {program.titleLine2 && <span className="block">{program.titleLine2}</span>}
                        </h3>

                        {program.subtitle && (
                          <p className="text-[11.5px] sm:text-[12px] font-semibold text-[#0A1931] pt-0.5 leading-tight">
                            {program.subtitle}
                          </p>
                        )}

                        <p className="text-slate-600 text-[11px] sm:text-[11.5px] xl:text-[12px] font-normal leading-[1.32] pt-0.5 line-clamp-2">
                          {program.description}
                        </p>
                      </div>

                      {/* Fila inferior: Precio («Desde» o «Consultar precio») y Botón con borde degradado */}
                      <div className="flex items-end justify-between gap-3 mt-2 pt-0.5 shrink-0">
                        <div className="text-left">
                          {hasPrice ? (
                            <>
                              <span className="block text-[10.5px] sm:text-[11px] font-semibold text-[#0A1931] tracking-tight leading-none mb-1">
                                Desde
                              </span>
                              <span className="block text-2xl sm:text-[25px] xl:text-[27px] font-semibold text-[#0A1931] leading-none tracking-tight">
                                {program.price}
                              </span>
                            </>
                          ) : (
                            <span className="block text-lg sm:text-[19px] xl:text-[20px] font-semibold text-[#0A1931] leading-none tracking-tight pb-1">
                              Consultar precio
                            </span>
                          )}
                        </div>

                        {/* 6. BOTÓN «Ver detalles»: SOLO BORDE FINO DEGRADADO, SIN RELLENO */}
                        <div className="p-[1.5px] rounded-[10px] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] inline-flex shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProgramClick(program);
                            }}
                            className="px-3 sm:px-3.5 h-[34px] sm:h-[36px] rounded-[8.5px] bg-white/95 hover:bg-white text-[#0A1931] hover:text-[#1F82D2] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <span>Ver detalles</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#1F82D2] stroke-[2]" />
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Estado vacío para países sin programas cargados todavía */
          <div className="text-center py-16 px-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 my-8">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Programas de {selectedCountry} en preparación
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-5">
              Actualmente estamos actualizando la programación oficial para {selectedCountry}. Consúltanos para cotizaciones a medida o grupos cerrados.
            </p>
            <button
              type="button"
              onClick={() => {
                if (onSelectGrupos) {
                  onSelectGrupos();
                } else {
                  window.location.hash = "viajes-a-medida-grupos";
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:opacity-95 cursor-pointer"
            >
              <span>Solicitar viaje a medida o grupo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </main>

      {/* MODAL DE ACCESO AGENCIAS / B2B */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative border border-slate-100">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-xl bg-blue-50 text-[#1F82D2] mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Acceso a Agencias de Viajes</h3>
              <p className="text-xs text-slate-500 mt-1">
                Dynamic Tours es mayorista exclusivo para agencias de viajes minoristas
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre de la Agencia
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={agencyAgency}
                    onChange={(e) => setAgencyAgency(e.target.value)}
                    placeholder="Ej. Viajes Halcón - Centro"
                    className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre del Agente
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={agentUser}
                    onChange={(e) => setAgentUser(e.target.value)}
                    placeholder="Ej. Laura Martínez"
                    className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20 focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 flex items-start gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-600 leading-tight">
                  Acceso directo a tarifas netas de mayorista, cupos de plazas en tiempo real y descarga de itinerarios.
                </p>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Acceder al Portal B2B</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
