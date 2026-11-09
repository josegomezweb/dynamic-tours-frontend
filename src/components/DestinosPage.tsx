import React, { useState, useMemo, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SeamlessHeroVideo from "./SeamlessHeroVideo";
import { assetUrl } from "../utils/assets";
import { 
  ZONES, 
  CATALOG_PROGRAMS, 
  findZoneForCountry, 
  TourProgram 
} from "../data/destinosCatalog";
import { 
  Search, 
  ChevronDown, 
  ArrowRight, 
  Lock, 
  X, 
  MapPin, 
  Calendar, 
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
  initialCountry?: string;
  initialZoneId?: string;
}

export default function DestinosPage({
  onBackToHome,
  onEnterB2B,
  onSelectSenior,
  onSelectLeyendas,
  onSelectGrupos,
  initialCountry,
  initialZoneId
}: DestinosPageProps) {
  // Navigation states
  const [selectedZoneId, setSelectedZoneId] = useState<string>(() => {
    if (initialCountry) {
      const z = findZoneForCountry(initialCountry);
      if (z) return z.id;
    }
    if (initialZoneId) return initialZoneId.replace("_", "-");
    if (typeof window !== "undefined" && window.location.hash.includes("?")) {
      const p = new URLSearchParams(window.location.hash.split("?")[1]);
      const pais = p.get("pais");
      if (pais) {
        const z = findZoneForCountry(pais);
        if (z) return z.id;
      }
      const zona = p.get("zona");
      if (zona) return zona.replace("_", "-");
    }
    return "oriente-medio";
  });

  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    if (initialCountry) return initialCountry;
    if (typeof window !== "undefined" && window.location.hash.includes("?")) {
      const p = new URLSearchParams(window.location.hash.split("?")[1]);
      const pais = p.get("pais");
      if (pais) return pais;
    }
    return "Egipto";
  });

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

  // Sync props or hash navigation changes
  useEffect(() => {
    const handleSync = () => {
      const hash = window.location.hash;
      if (hash.includes("?")) {
        const params = new URLSearchParams(hash.split("?")[1]);
        const pais = params.get("pais");
        const zona = params.get("zona");
        if (pais) {
          setSelectedCountry(pais);
          const z = findZoneForCountry(pais);
          if (z) setSelectedZoneId(z.id);
        } else if (zona) {
          const cleanZone = zona.replace("_", "-");
          setSelectedZoneId(cleanZone);
          const zObj = ZONES.find((z) => z.id === cleanZone);
          if (zObj && zObj.countries.length > 0) setSelectedCountry(zObj.countries[0]);
        }
      }
    };

    if (initialCountry) {
      setSelectedCountry(initialCountry);
      const z = findZoneForCountry(initialCountry);
      if (z) setSelectedZoneId(z.id);
    } else if (initialZoneId) {
      const cleanZone = initialZoneId.replace("_", "-");
      setSelectedZoneId(cleanZone);
      const zObj = ZONES.find((z) => z.id === cleanZone);
      if (zObj && zObj.countries.length > 0) setSelectedCountry(zObj.countries[0]);
    } else {
      handleSync();
    }

    window.addEventListener("hashchange", handleSync);
    return () => window.removeEventListener("hashchange", handleSync);
  }, [initialCountry, initialZoneId]);

  // Active zone definition
  const activeZone = useMemo(() => {
    return ZONES.find((z) => z.id === selectedZoneId) || ZONES[0];
  }, [selectedZoneId]);

  // When changing zone
  const handleSelectZone = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    const zone = ZONES.find((z) => z.id === zoneId);
    if (zone) {
      const nextCountry = zone.countries.includes(selectedCountry) ? selectedCountry : zone.countries[0];
      setSelectedCountry(nextCountry);
      window.location.hash = `#destinos?pais=${encodeURIComponent(nextCountry)}&zona=${encodeURIComponent(zoneId)}`;
    }
  };

  // When changing country
  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    window.location.hash = `#destinos?pais=${encodeURIComponent(country)}&zona=${encodeURIComponent(selectedZoneId)}`;
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
        result = result.filter((p) => p.duration.includes("3 DÍAS") || p.duration.includes("4 DÍAS") || p.duration.includes("5 DÍAS"));
      } else if (durationFilter === "long") {
        result = result.filter((p) => p.duration.includes("10 DÍAS") || p.duration.includes("11 DÍAS") || p.duration.includes("12 DÍAS"));
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
      
      {/* 1. CABECERA CORPORATIVA OFICIAL */}
      <Header 
        activeNav="destinos"
        onNavigateHome={onBackToHome}
        onNavigateDestinos={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onNavigateGrupos={() => {
          if (onSelectGrupos) onSelectGrupos();
          else window.location.hash = "viajes-a-medida-grupos";
        }}
        onNavigateOfertas={() => {
          onBackToHome();
          setTimeout(() => {
            const el = document.getElementById("ofertas");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        onNavigateNosotros={() => {
          onBackToHome();
          setTimeout(() => {
            const el = document.getElementById("nosotros");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        onOpenB2BLogin={() => setIsLoginModalOpen(true)}
        onOpenRegister={() => {
          onBackToHome();
          setTimeout(() => {
            const el = document.getElementById("alta-agencia");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 120);
        }}
        onSearch={(query) => {
          setSearchQuery(query);
          const el = document.getElementById("catalogo-programas");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onSelectDestination={(destKey, countryName, regionId) => {
          const dest = countryName || destKey;
          if (dest) {
            setSelectedCountry(dest);
            const found = findZoneForCountry(dest);
            if (found) {
              setSelectedZoneId(found.id);
            } else if (regionId) {
              setSelectedZoneId(regionId.replace("_", "-"));
            }
            window.location.hash = `#destinos?pais=${encodeURIComponent(dest)}`;
            setSearchQuery("");
            const el = document.getElementById("catalogo-programas");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } else if (regionId) {
            const clean = regionId.replace("_", "-");
            handleSelectZone(clean);
          }
        }}
      />

      {/* 1. PORTADA PANORÁMICA CON VÍDEO DE LA TIERRA */}
      <section className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden bg-slate-950">
        <SeamlessHeroVideo 
          src={assetUrl("portada_destinos.mp4")}
          poster={assetUrl("portada_destinos_poster.jpg")}
          crossfadeDuration={1.2}
          objectPosition="object-[82%_center] sm:object-[78%_center] lg:object-right"
        />

        {/* Degradado para máxima legibilidad del texto en el lado oscuro izquierdo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none z-20" />

        {/* Textos superpuestos alineados a la izquierda dinámicos por país */}
        <div className="absolute inset-0 flex items-center z-30 pointer-events-none">
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-2xl sm:max-w-3xl text-left pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider mb-2.5">
                <span>{activeZone.name}</span>
                <span className="text-white/60">·</span>
                <span className="text-white font-bold">{selectedCountry}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-bold text-white tracking-tight leading-[1.06] font-sans drop-shadow-md">
                Viajes a {selectedCountry}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-slate-100 mt-2 sm:mt-3 font-medium drop-shadow-sm leading-snug">
                Descubre todos los programas, circuitos y viajes organizados en {selectedCountry}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Breadcrumb: Inicio / Destinos / Zona / País */}
        <nav aria-label="Breadcrumb" className="pt-5 pb-3">
          <ol className="flex items-center text-xs text-slate-500 font-medium flex-wrap gap-y-1">
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
            <li>
              <button
                type="button"
                onClick={() => {
                  window.location.hash = "destinos";
                  window.scrollTo({ top: 320, behavior: "smooth" });
                }}
                className="hover:text-[#1F82D2] transition-colors cursor-pointer"
              >
                Destinos
              </button>
            </li>
            <li className="mx-2 text-slate-300">/</li>
            <li>
              <span className="text-slate-500 font-medium">
                {activeZone.name}
              </span>
            </li>
            <li className="mx-2 text-slate-300">/</li>
            <li className="text-slate-800 font-bold" aria-current="page">
              {selectedCountry}
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
                  onClick={() => handleSelectCountry(country)}
                  className="group relative flex flex-col items-center px-2 py-1 text-xs sm:text-sm font-medium text-slate-800 hover:text-[#1F82D2] transition-colors cursor-pointer select-none"
                >
                  <span className={`leading-tight ${isSelected ? "font-bold text-[#0A1931]" : ""}`}>
                    {country}
                  </span>
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
        <section id="catalogo-programas" aria-label="Filtros del catálogo" className="pt-2 pb-6 sm:pb-8 scroll-mt-24">
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 items-center">
              
              {/* Ciudad de salida */}
              <div className="lg:col-span-3 relative">
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-8 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20 appearance-none cursor-pointer"
                >
                  <option value="all">Ciudad de salida: Todas</option>
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

              {/* Fecha de viaje */}
              <div className="lg:col-span-3 relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-8 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20 appearance-none cursor-pointer"
                >
                  <option value="all">Fecha de viaje: Todas las fechas</option>
                  <option value="2026-11">Noviembre 2026</option>
                  <option value="2026-12">Diciembre 2026</option>
                  <option value="2026-fin-ano">Fin de Año 2026</option>
                  <option value="2027-primavera">Primavera 2027</option>
                  <option value="2027-verano">Verano 2027</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Duración */}
              <div className="lg:col-span-2 relative">
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-8 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20 appearance-none cursor-pointer"
                >
                  <option value="all">Duración: Cualquier</option>
                  <option value="short">Escapadas (3-5 días)</option>
                  <option value="8d">Circuitos (8 días / 7 noches)</option>
                  <option value="long">Grandes viajes (10+ días)</option>
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
              Programas de {selectedCountry} ({displayedPrograms.length})
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
                      <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-[7px] sm:rounded-[9px] bg-white/85 backdrop-blur-md border border-white/80 text-[#24766F] font-semibold text-[9.5px] sm:text-[11px] uppercase tracking-wider shadow-xs whitespace-nowrap">
                        {program.tag}
                      </span>

                      <span className="text-white font-medium text-[10.5px] sm:text-[11.5px] tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] pt-0.5 whitespace-nowrap shrink-0">
                        {program.duration}
                      </span>
                    </div>
                  </div>

                  {/* Panel inferior esmerilado */}
                  <div className="relative z-10 w-full h-[174px] sm:h-[176px] lg:h-[178px] xl:h-[182px] rounded-t-[16px] sm:rounded-t-[18px] overflow-hidden border-t border-white/90 border-x border-white/60 shadow-[0_-2px_14px_rgba(0,0,0,0.03)] shrink-0">
                    
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

                    <div className="relative z-10 w-full h-full px-4 sm:px-4.5 xl:px-5 pt-2.5 sm:pt-3 xl:pt-3 pb-2.5 sm:pb-3 xl:pb-3 flex flex-col justify-between">
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

      {/* Pie de página corporativo */}
      <Footer 
        onOpenB2BLogin={() => setIsLoginModalOpen(true)}
        onNavigateDestinos={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

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
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Agente (Nombre o Email)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={agentUser}
                    onChange={(e) => setAgentUser(e.target.value)}
                    placeholder="Ej. Laura Martínez"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre de la Agencia / Sucursal
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={agencyAgency}
                    onChange={(e) => setAgencyAgency(e.target.value)}
                    placeholder="Ej. Halcón Viajes - Gran Vía"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#1F82D2]/20"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#1F82D2] hover:bg-[#1868A7] text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  Acceder a disponibilidad y tarifas B2B
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                ¿No tienes clave de agencia?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    onBackToHome();
                    setTimeout(() => {
                      const el = document.getElementById("alta-agencia");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 120);
                  }}
                  className="text-[#1F82D2] hover:underline font-semibold"
                >
                  Solicitar alta de agencia minorista
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
