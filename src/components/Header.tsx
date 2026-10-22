import React, { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { assetUrl } from "../utils/assets";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  X, 
  ArrowRight 
} from "lucide-react";

interface DestinationItem {
  name: string;
  url: string;
  destKey?: string;
}

interface RegionItem {
  id: string;
  name: string;
  image: string;
  phrase: string;
  categoryUrl: string;
  countries: DestinationItem[];
}

export const REGIONS_DATA: RegionItem[] = [
  {
    id: "oriente_medio",
    name: "ORIENTE MEDIO",
    image: "/destino_card_oriente_medio.jpg",
    phrase: "Del Nilo a Petra, descubre Oriente Medio.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/oriente-medio/",
    countries: [
      { name: "Egipto", url: "https://www.dynamic-tours.com/destinos/egipto/", destKey: "egipto" },
      { name: "Jordania", url: "https://www.dynamic-tours.com/destinos/jordania/", destKey: "jordania" },
      { name: "Dubai", url: "https://www.dynamic-tours.com/destinos/dubai/", destKey: "dubai" },
      { name: "Irán", url: "https://www.dynamic-tours.com/destinos/iran/", destKey: "iran" },
      { name: "Israel", url: "https://www.dynamic-tours.com/destinos/israel/", destKey: "israel" }
    ]
  },
  {
    id: "asia",
    name: "ASIA",
    image: "/region_asia.jpg",
    phrase: "Templos milenarios, culturas ancestrales y naturaleza exótica.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/asia/",
    countries: [
      { name: "Armenia", url: "https://www.dynamic-tours.com/destinos/armenia/" },
      { name: "Camboya", url: "https://www.dynamic-tours.com/destinos/camboya/" },
      { name: "China", url: "https://www.dynamic-tours.com/destinos/china/" },
      { name: "India", url: "https://www.dynamic-tours.com/destinos/india/", destKey: "india" },
      { name: "Japón", url: "https://www.dynamic-tours.com/destinos/japon/" },
      { name: "Maldivas", url: "https://www.dynamic-tours.com/destinos/maldivas/" },
      { name: "Nepal", url: "https://www.dynamic-tours.com/destinos/nepal/" },
      { name: "Sri Lanka", url: "https://www.dynamic-tours.com/destinos/sri-lanka/" },
      { name: "Tailandia", url: "https://www.dynamic-tours.com/destinos/tailandia/" },
      { name: "Uzbekistán", url: "https://www.dynamic-tours.com/destinos/uzbekistan/", destKey: "uzbekistan" },
      { name: "Vietnam", url: "https://www.dynamic-tours.com/destinos/vietnam/" }
    ]
  },
  {
    id: "europa",
    name: "EUROPA",
    image: "/destino_card_europa.jpg",
    phrase: "Monumentos clásicos, capitales imperiales y paisajes de ensueño.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/europa/",
    countries: [
      { name: "Turquía", url: "https://www.dynamic-tours.com/destinos/turquia/", destKey: "turquia" },
      { name: "Alemania", url: "https://www.dynamic-tours.com/destinos/alemania/" },
      { name: "Austria", url: "https://www.dynamic-tours.com/destinos/austria/" },
      { name: "Bulgaria", url: "https://www.dynamic-tours.com/destinos/bulgaria/" },
      { name: "Bélgica", url: "https://www.dynamic-tours.com/destinos/belgica/" },
      { name: "Croacia", url: "https://www.dynamic-tours.com/destinos/croacia/" },
      { name: "Escocia", url: "https://www.dynamic-tours.com/destinos/escocia/" },
      { name: "España", url: "https://www.dynamic-tours.com/destinos/espana/" },
      { name: "Georgia", url: "https://www.dynamic-tours.com/destinos/georgia/" },
      { name: "Grecia", url: "https://www.dynamic-tours.com/destinos/grecia/" },
      { name: "Holanda", url: "https://www.dynamic-tours.com/destinos/holanda/" },
      { name: "Hungría", url: "https://www.dynamic-tours.com/destinos/hungria/" },
      { name: "Inglaterra", url: "https://www.dynamic-tours.com/destinos/inglaterra/" },
      { name: "Irlanda", url: "https://www.dynamic-tours.com/destinos/irlanda/" },
      { name: "Italia", url: "https://www.dynamic-tours.com/destinos/italia/" },
      { name: "Moldavia", url: "https://www.dynamic-tours.com/destinos/moldavia/" },
      { name: "Polonia", url: "https://www.dynamic-tours.com/destinos/polonia/" },
      { name: "Portugal", url: "https://www.dynamic-tours.com/destinos/portugal/", destKey: "portugal" },
      { name: "Rep. Bálticas", url: "https://www.dynamic-tours.com/destinos/republicas-balticas/" },
      { name: "Rep. Checa", url: "https://www.dynamic-tours.com/destinos/republica-checa/" },
      { name: "Rumanía", url: "https://www.dynamic-tours.com/destinos/rumania/" }
    ]
  },
  {
    id: "america",
    name: "AMÉRICA",
    image: "/region_america.jpg",
    phrase: "Grandes parques, maravillas naturales y metrópolis vibrantes.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/america/",
    countries: [
      { name: "Argentina", url: "https://www.dynamic-tours.com/destinos/argentina/" },
      { name: "Canadá", url: "https://www.dynamic-tours.com/destinos/canada/" },
      { name: "Costa Rica", url: "https://www.dynamic-tours.com/destinos/costa-rica/" },
      { name: "México", url: "https://www.dynamic-tours.com/destinos/mexico/" }
    ]
  },
  {
    id: "africa",
    name: "ÁFRICA",
    image: "/region_africa.jpg",
    phrase: "Safaris legendarios, desiertos infinitos y fauna salvaje.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/africa/",
    countries: [
      { name: "Kenia", url: "https://www.dynamic-tours.com/destinos/kenia/", destKey: "kenia" },
      { name: "Marruecos", url: "https://www.dynamic-tours.com/destinos/marruecos/", destKey: "marruecos" },
      { name: "Tanzania", url: "https://www.dynamic-tours.com/destinos/tanzania/" },
      { name: "Túnez", url: "https://www.dynamic-tours.com/destinos/tunez/" }
    ]
  }
];

export interface HeaderProps {
  onNavigateHome?: () => void;
  onNavigateDestinos?: () => void;
  onNavigateOfertas?: () => void;
  onNavigateGrupos?: () => void;
  onNavigateNosotros?: () => void;
  onOpenB2BLogin?: () => void;
  onSelectDestination?: (destKey: string) => void;
  activeNav?: "home" | "destinos" | "ofertas" | "grupos" | "nosotros" | "other";
}

export default function Header({
  onNavigateHome,
  onNavigateDestinos,
  onNavigateOfertas,
  onNavigateGrupos,
  onNavigateNosotros,
  onOpenB2BLogin,
  onSelectDestination,
  activeNav = "home"
}: HeaderProps) {
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState("oriente_medio");
  
  const buscadorButtonRef = useRef<HTMLButtonElement>(null);
  const megamenuRef = useRef<HTMLDivElement>(null);

  const activeRegion = REGIONS_DATA.find(r => r.id === selectedRegionId) || REGIONS_DATA[0];

  const getGridColsClass = (regionId: string) => {
    switch (regionId) {
      case "europa":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
      case "asia":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
      default:
        return "grid-cols-2 sm:grid-cols-3";
    }
  };

  // Close megamenu on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isDestDropdownOpen &&
        megamenuRef.current &&
        !megamenuRef.current.contains(e.target as Node) &&
        buscadorButtonRef.current &&
        !buscadorButtonRef.current.contains(e.target as Node)
      ) {
        setIsDestDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDestDropdownOpen) {
        setIsDestDropdownOpen(false);
        buscadorButtonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDestDropdownOpen]);

  const handleLogoClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDestinosClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateDestinos) {
      onNavigateDestinos();
    } else {
      window.location.hash = "destinos";
    }
  };

  const handleOfertasClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateOfertas) {
      onNavigateOfertas();
    } else {
      if (onNavigateHome) {
        onNavigateHome();
        setTimeout(() => {
          const el = document.getElementById("ofertas");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        const el = document.getElementById("ofertas");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.location.hash = "ofertas";
      }
    }
  };

  const handleGruposClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateGrupos) {
      onNavigateGrupos();
    } else {
      window.location.hash = "viajes-a-medida-grupos";
    }
  };

  const handleNosotrosClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateNosotros) {
      onNavigateNosotros();
    } else {
      if (onNavigateHome) {
        onNavigateHome();
        setTimeout(() => {
          const el = document.getElementById("nosotros");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        const el = document.getElementById("nosotros");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.location.hash = "nosotros";
      }
    }
  };

  const handleCountryClick = (e: React.MouseEvent, country: DestinationItem) => {
    setIsDestDropdownOpen(false);
    if (country.destKey && onSelectDestination) {
      e.preventDefault();
      onSelectDestination(country.destKey);
      return;
    }
    // If we have onNavigateDestinos, open the destinos page
    if (onNavigateDestinos) {
      e.preventDefault();
      onNavigateDestinos();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs font-sans">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo y Slogan Corporativo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div 
              onClick={handleLogoClick}
              className="cursor-pointer flex items-center transition-opacity hover:opacity-90"
              title="Dynamic Tours - Inicio"
            >
              <Logo className="h-7.5 sm:h-8 shrink-0" classNameImg="mix-blend-multiply" />
            </div>
            <div className="hidden sm:block h-4.5 w-px bg-slate-300"></div>
            <div className="hidden sm:flex items-center gap-1 font-bold text-[10px] sm:text-[10.5px] tracking-wide uppercase whitespace-nowrap">
              <span className="text-[#1F82D2]">AGENCIA MAYORISTA</span>
              <span className="text-[#52A72B]">DE VIAJES</span>
            </div>
          </div>

          {/* Menú de Navegación */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 text-[11px] xl:text-xs font-bold text-slate-800 whitespace-nowrap">
            <a 
              href="#destinos" 
              onClick={handleDestinosClick}
              className={`hover:text-[#1F82D2] transition-colors font-bold cursor-pointer uppercase tracking-wider py-1.5 px-3 rounded-lg ${
                activeNav === "destinos" 
                  ? "bg-white border border-[#1F82D2] text-[#0A0F1D] shadow-2xs" 
                  : "text-slate-800"
              }`}
            >
              DESTINOS
            </a>

            <span className="text-slate-300">·</span>
            
            <a 
              href="#ofertas" 
              onClick={handleOfertasClick}
              className={`hover:text-[#1F82D2] transition-colors font-bold cursor-pointer ${
                activeNav === "ofertas" ? "text-[#1F82D2]" : "text-slate-800"
              }`}
            >
              Ofertas
            </a>
            
            <span className="text-slate-300">·</span>
            
            <a 
              href="#viajes-a-medida-grupos" 
              onClick={handleGruposClick}
              className={`hover:text-[#1F82D2] transition-colors font-bold cursor-pointer ${
                activeNav === "grupos" ? "text-[#1F82D2]" : "text-slate-800"
              }`}
            >
              Grupos
            </a>
            
            <span className="text-slate-300">·</span>
            
            <a 
              href="#nosotros" 
              onClick={handleNosotrosClick}
              className={`hover:text-[#1F82D2] transition-colors font-bold cursor-pointer ${
                activeNav === "nosotros" ? "text-[#1F82D2]" : "text-slate-800"
              }`}
            >
              Sobre Dynamic
            </a>
          </nav>

          {/* Botones Derecha: Buscador (abre el megamenú desplegable) + ACCESO AGENCIAS */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              ref={buscadorButtonRef}
              type="button"
              onClick={() => setIsDestDropdownOpen(!isDestDropdownOpen)}
              aria-expanded={isDestDropdownOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 font-bold text-xs py-1.5 px-3 rounded-full border transition-all cursor-pointer shadow-2xs ${
                isDestDropdownOpen 
                  ? "bg-white border-[#1F82D2] text-[#0A0F1D] ring-2 ring-[#1F82D2]/20" 
                  : "bg-[#f1f5f9] hover:bg-[#e2e8f0] border-slate-200/80 text-slate-700"
              }`}
            >
              <Search className={`w-3.5 h-3.5 ${isDestDropdownOpen ? "text-[#1F82D2]" : "text-slate-500"}`} />
              <span>Buscador</span>
              {isDestDropdownOpen ? (
                <ChevronUp className="w-3 h-3 text-[#1F82D2]" />
              ) : (
                <ChevronDown className="w-3 h-3 text-slate-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (onOpenB2BLogin) onOpenB2BLogin();
                else window.location.hash = "b2b";
              }}
              className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:opacity-95 text-white font-extrabold text-[10.5px] sm:text-[11px] uppercase tracking-wider py-1.5 px-2.5 sm:px-3 rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>ACCESO AGENCIAS</span>
            </button>
          </div>

        </div>
      </div>

      {/* MEGAMENÚ DESPLEGABLE DE DESTINOS */}
      {isDestDropdownOpen && (
        <div 
          ref={megamenuRef}
          role="region"
          aria-label="Megamenú de Destinos"
          className="absolute top-full left-0 w-full bg-white border-b border-slate-200/80 shadow-[0_20px_45px_rgba(0,0,0,0.14)] z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-1 max-h-[85vh] overflow-y-auto"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            
            {/* Encabezado pequeño y botón de cierre × */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                DESTINOS OFICIALES DYNAMIC
              </span>
              <button 
                type="button"
                onClick={() => {
                  setIsDestDropdownOpen(false);
                  buscadorButtonRef.current?.focus();
                }}
                aria-label="Cerrar menú del buscador"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Fila de 5 Regiones en horizontal */}
            <div className="flex overflow-x-auto no-scrollbar md:grid md:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 pb-2 md:pb-0">
              {REGIONS_DATA.map((region) => {
                const isActive = region.id === selectedRegionId;
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setSelectedRegionId(region.id)}
                    className={`flex-shrink-0 w-36 md:w-auto p-3 sm:py-3.5 sm:px-4 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer text-center ${
                      isActive 
                        ? "bg-[#F0F7FF]" 
                        : "bg-transparent hover:bg-slate-50/80"
                    }`}
                  >
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden transition-all duration-300 shadow-xs ${
                      isActive 
                        ? "ring-2 ring-[#1F82D2] ring-offset-2 ring-offset-[#F0F7FF] scale-102" 
                        : "hover:scale-105"
                    }`}>
                      <img 
                        src={assetUrl(region.image)} 
                        alt={region.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <span className={`mt-2.5 font-bold text-xs sm:text-[13px] tracking-tight uppercase transition-colors ${
                      isActive ? "text-[#1F82D2]" : "text-[#0A0F1D]"
                    }`}>
                      {region.name}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-400 font-normal mt-0.5">
                      {region.countries.length} países
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Separador fino */}
            <div className="border-t border-slate-200/70 my-4 sm:my-5"></div>

            {/* Título de la región activa con indicador vertical con degradado */}
            <div className="flex items-center gap-2.5 mb-4 text-left">
              <div className="w-2.5 h-6 rounded-xs bg-gradient-to-b from-[#1F82D2] to-[#52A72B]"></div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0A0F1D] tracking-tight uppercase">
                {activeRegion.name}
              </h3>
            </div>

            {/* Destinos de la región seleccionada */}
            <div className={`grid ${getGridColsClass(activeRegion.id)} gap-y-3 sm:gap-y-3.5 gap-x-4 sm:gap-x-6 text-left`}>
              {activeRegion.countries.map((country, idx) => (
                <a
                  key={idx}
                  href={country.url}
                  onClick={(e) => handleCountryClick(e, country)}
                  className="group flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-slate-100 hover:border-[#1F82D2]/30 hover:bg-[#F0F7FF]/60 hover:shadow-2xs transition-all cursor-pointer no-underline"
                >
                  <span className="text-xs sm:text-[13px] font-bold text-slate-700 group-hover:text-[#1F82D2] transition-colors">
                    {country.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#1F82D2] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
