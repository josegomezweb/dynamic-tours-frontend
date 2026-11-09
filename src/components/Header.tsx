import React, { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { assetUrl } from "../utils/assets";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  X, 
  ArrowRight,
  Menu
} from "lucide-react";

export interface DestinationItem {
  name: string;
  url: string;
  destKey?: string;
  image?: string;
}

export interface RegionItem {
  id: string;
  name: string;
  displayName: string;
  image: string;
  phrase: string;
  categoryUrl: string;
  countries: DestinationItem[];
}

export const REGIONS_DATA: RegionItem[] = [
  {
    id: "oriente_medio",
    name: "ORIENTE MEDIO",
    displayName: "Oriente Medio",
    image: "/destino_card_oriente_medio.jpg",
    phrase: "Del Nilo a Petra, descubre Oriente Medio.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/oriente-medio/",
    countries: [
      { name: "Egipto", url: "https://www.dynamic-tours.com/destinos/egipto/", destKey: "egipto", image: "/dia_5_guiza.jpg" },
      { name: "Jordania", url: "https://www.dynamic-tours.com/destinos/jordania/", destKey: "jordania", image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=600&auto=format&fit=crop&q=80" },
      { name: "Dubái", url: "https://www.dynamic-tours.com/destinos/dubai/", destKey: "dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80" },
      { name: "Irán", url: "https://www.dynamic-tours.com/destinos/iran/", destKey: "iran", image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&auto=format&fit=crop&q=80" },
      { name: "Israel", url: "https://www.dynamic-tours.com/destinos/israel/", destKey: "israel", image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?w=600&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "asia",
    name: "ASIA",
    displayName: "Asia",
    image: "/destino_card_asia.jpg",
    phrase: "Templos milenarios, culturas ancestrales y naturaleza exótica.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/asia/",
    countries: [
      { name: "Armenia", url: "https://www.dynamic-tours.com/destinos/armenia/", image: "/armenia_khor_virap.jpg" },
      { name: "Camboya", url: "https://www.dynamic-tours.com/destinos/camboya/", image: "/camboya_angkor_wat.jpg" },
      { name: "China", url: "https://www.dynamic-tours.com/destinos/china/", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&auto=format&fit=crop&q=80" },
      { name: "India", url: "https://www.dynamic-tours.com/destinos/india/", destKey: "india", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80" },
      { name: "Japón", url: "https://www.dynamic-tours.com/destinos/japon/", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80" },
      { name: "Maldivas", url: "https://www.dynamic-tours.com/destinos/maldivas/", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format&fit=crop&q=80" },
      { name: "Nepal", url: "https://www.dynamic-tours.com/destinos/nepal/", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=80" },
      { name: "Sri Lanka", url: "https://www.dynamic-tours.com/destinos/sri-lanka/", image: "/sri_lanka_portada.jpg" },
      { name: "Tailandia", url: "https://www.dynamic-tours.com/destinos/tailandia/", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&auto=format&fit=crop&q=80" },
      { name: "Uzbekistán", url: "https://www.dynamic-tours.com/destinos/uzbekistan/", destKey: "uzbekistan", image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&auto=format&fit=crop&q=80" },
      { name: "Vietnam", url: "https://www.dynamic-tours.com/destinos/vietnam/", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "europa",
    name: "EUROPA",
    displayName: "Europa",
    image: "/destino_card_europa.jpg",
    phrase: "Monumentos clásicos, capitales imperiales y paisajes de ensueño.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/europa/",
    countries: [
      { name: "Turquía", url: "https://www.dynamic-tours.com/destinos/turquia/", destKey: "turquia", image: "/pamukkale_ruta_turca.jpg" },
      { name: "Alemania", url: "https://www.dynamic-tours.com/destinos/alemania/", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&auto=format&fit=crop&q=80" },
      { name: "Austria", url: "https://www.dynamic-tours.com/destinos/austria/", image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=500&auto=format&fit=crop&q=80" },
      { name: "Bulgaria", url: "https://www.dynamic-tours.com/destinos/bulgaria/", image: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=600&auto=format&fit=crop&q=80" },
      { name: "Bélgica", url: "https://www.dynamic-tours.com/destinos/belgica/", image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=500&auto=format&fit=crop&q=80" },
      { name: "Croacia", url: "https://www.dynamic-tours.com/destinos/croacia/", image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?w=500&auto=format&fit=crop&q=80" },
      { name: "Escocia", url: "https://www.dynamic-tours.com/destinos/escocia/", image: "/escocia_highlands.jpg" },
      { name: "España", url: "https://www.dynamic-tours.com/destinos/espana/", image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=500&auto=format&fit=crop&q=80" },
      { name: "Georgia", url: "https://www.dynamic-tours.com/destinos/georgia/", image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=500&auto=format&fit=crop&q=80" },
      { name: "Grecia", url: "https://www.dynamic-tours.com/destinos/grecia/", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80" },
      { name: "Holanda", url: "https://www.dynamic-tours.com/destinos/holanda/", image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=500&auto=format&fit=crop&q=80" },
      { name: "Hungría", url: "https://www.dynamic-tours.com/destinos/hungria/", image: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=500&auto=format&fit=crop&q=80" },
      { name: "Inglaterra", url: "https://www.dynamic-tours.com/destinos/inglaterra/", image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=500&auto=format&fit=crop&q=80" },
      { name: "Irlanda", url: "https://www.dynamic-tours.com/destinos/irlanda/", image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=500&auto=format&fit=crop&q=80" },
      { name: "Italia", url: "https://www.dynamic-tours.com/destinos/italia/", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80" },
      { name: "Moldavia", url: "https://www.dynamic-tours.com/destinos/moldavia/", image: "/moldavia_orheiul_vechi.jpg" },
      { name: "Polonia", url: "https://www.dynamic-tours.com/destinos/polonia/", image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=500&auto=format&fit=crop&q=80" },
      { name: "Portugal", url: "https://www.dynamic-tours.com/destinos/portugal/", destKey: "portugal", image: "/portugal_porto.jpg" },
      { name: "Rep. Bálticas", url: "https://www.dynamic-tours.com/destinos/republicas-balticas/", image: "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?w=600&auto=format&fit=crop&q=80" },
      { name: "Rep. Checa", url: "https://www.dynamic-tours.com/destinos/republica-checa/", image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&auto=format&fit=crop&q=80" },
      { name: "Rumanía", url: "https://www.dynamic-tours.com/destinos/rumania/", image: "/rumania_peles.jpg" }
    ]
  },
  {
    id: "america",
    name: "AMÉRICA",
    displayName: "América",
    image: "/destino_card_america.jpg",
    phrase: "Grandes parques, maravillas naturales y metrópolis vibrantes.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/america/",
    countries: [
      { name: "Argentina", url: "https://www.dynamic-tours.com/destinos/argentina/", image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&auto=format&fit=crop&q=80" },
      { name: "Canadá", url: "https://www.dynamic-tours.com/destinos/canada/", image: "/canada_moraine_lake.jpg" },
      { name: "Costa Rica", url: "https://www.dynamic-tours.com/destinos/costa-rica/", image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=600&auto=format&fit=crop&q=80" },
      { name: "México", url: "https://www.dynamic-tours.com/destinos/mexico/", image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: "africa",
    name: "ÁFRICA",
    displayName: "África",
    image: "/destino_card_africa.jpg",
    phrase: "Safaris legendarios, desiertos infinitos y fauna salvaje.",
    categoryUrl: "https://www.dynamic-tours.com/destinos/africa/",
    countries: [
      { name: "Kenia", url: "https://www.dynamic-tours.com/destinos/kenia/", destKey: "kenia", image: "/kenia_amboseli.jpg" },
      { name: "Marruecos", url: "https://www.dynamic-tours.com/destinos/marruecos/", destKey: "marruecos", image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&auto=format&fit=crop&q=80" },
      { name: "Tanzania", url: "https://www.dynamic-tours.com/destinos/tanzania/", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80" },
      { name: "Túnez", url: "https://www.dynamic-tours.com/destinos/tunez/", image: "/tunez_sidi_bou_said.jpg" }
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
  onOpenRegister?: () => void;
  onSelectDestination?: (destKey: string, countryName?: string, regionId?: string) => void;
  onSearch?: (query: string) => void;
  activeNav?: "home" | "destinos" | "ofertas" | "grupos" | "nosotros" | "other";
}

export default function Header({
  onNavigateHome,
  onNavigateDestinos,
  onNavigateOfertas,
  onNavigateGrupos,
  onOpenB2BLogin,
  onOpenRegister,
  onSelectDestination,
  onSearch,
  activeNav = "home"
}: HeaderProps) {
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState("europa");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const buscadorButtonRef = useRef<HTMLButtonElement>(null);
  const megamenuRef = useRef<HTMLDivElement>(null);

  const activeRegion = REGIONS_DATA.find(r => r.id === selectedRegionId) || REGIONS_DATA[2];

  // Helper for responsive grid columns in countries list
  const getGridColsClass = (regionId: string) => {
    switch (regionId) {
      case "europa":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7";
      case "asia":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";
      case "america":
      case "africa":
        return "grid-cols-2 sm:grid-cols-4";
      case "oriente_medio":
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-5";
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

  const handleDestinosClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDestDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onNavigateDestinos) {
      onNavigateDestinos();
    } else {
      window.location.hash = "destinos";
    }
  };

  const handleLogoClick = () => {
    setIsDestDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOfertasClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDestDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onNavigateOfertas) {
      onNavigateOfertas();
    } else {
      const el = document.getElementById("ofertas");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.hash = "ofertas";
    }
  };

  const handleGruposClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDestDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onNavigateGrupos) {
      onNavigateGrupos();
    } else {
      window.location.hash = "viajes-a-medida-grupos";
    }
  };

  const handleCountryClick = (e: React.MouseEvent, country: DestinationItem) => {
    e.preventDefault();
    setIsDestDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onSelectDestination) {
      onSelectDestination(country.destKey || country.name, country.name, activeRegion.id);
    } else if (onNavigateDestinos) {
      onNavigateDestinos();
    }
  };

  const handleRegionClick = (region: RegionItem) => {
    setIsDestDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onSelectDestination) {
      onSelectDestination(region.id, region.displayName, region.id);
    } else if (onNavigateDestinos) {
      onNavigateDestinos();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setIsDestDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onSearch) {
      onSearch(q);
    }
  };

  const handleRegisterClick = () => {
    setIsDestDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onOpenRegister) {
      onOpenRegister();
    } else {
      const el = document.getElementById("alta-agencia");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.hash = "alta-agencia";
    }
  };

  const handleLoginClick = () => {
    setIsDestDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onOpenB2BLogin) onOpenB2BLogin();
    else window.location.hash = "b2b";
  };

  return (
    <header className="sticky top-0 z-50 bg-white font-sans">
      
      {/* 1. BARRA DE CONTACTO SUPERIOR */}
      <div className="bg-[#EBF3FA] border-b border-[#D6E6F5] py-1.5 px-3 sm:px-6 text-[11px] sm:text-xs font-medium text-slate-700">
        <div className="max-w-[1440px] mx-auto flex items-center justify-start gap-3 sm:gap-6 overflow-x-auto scrollbar-none whitespace-nowrap">
          <a 
            href="tel:915521443" 
            className="hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Teléfono Central"
          >
            <span className="font-semibold text-slate-800">915 521 443</span>
          </a>
          
          <span className="text-slate-300 font-light select-none">|</span>
          
          <a 
            href="tel:690125031" 
            className="hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Urgencias 24 horas"
          >
            <span className="text-slate-600">Urgencias:</span>
            <span className="font-semibold text-slate-800">690 125 031</span>
          </a>
          
          <span className="text-slate-300 font-light select-none">|</span>
          
          <a 
            href="mailto:reservas@dynamic-tours.com" 
            className="hover:text-[#1F82D2] transition-colors flex items-center gap-1.5 cursor-pointer text-slate-700"
            title="Correo de Reservas"
          >
            <span>reservas@dynamic-tours.com</span>
          </a>
        </div>
      </div>

      {/* 2. MENÚ PRINCIPAL */}
      <div className="border-b border-slate-200/90 shadow-2xs bg-white relative z-20">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex justify-between items-center h-16 sm:h-[68px] gap-2 lg:gap-4">
            
            {/* Logo y Descriptor Corporativo */}
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

            {/* Menú de Navegación Central (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-800 whitespace-nowrap">
              
              {/* Destinos: enlace directo a la página Destinos */}
              <button
                type="button"
                onClick={handleDestinosClick}
                className={`transition-colors cursor-pointer font-bold py-1.5 relative ${
                  activeNav === "destinos"
                    ? "text-[#1F82D2]" 
                    : "text-slate-800 hover:text-[#1F82D2]"
                }`}
              >
                <span>Destinos</span>
                {activeNav === "destinos" && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-[2.5px] rounded-full bg-[#1F82D2]" />
                )}
              </button>

              {/* Ofertas */}
              <a 
                href="#ofertas" 
                onClick={handleOfertasClick}
                className={`transition-colors cursor-pointer ${
                  activeNav === "ofertas" ? "text-[#1F82D2] font-bold" : "text-slate-800 hover:text-[#1F82D2]"
                }`}
              >
                Ofertas
              </a>

              {/* Grupos */}
              <a 
                href="#viajes-a-medida-grupos" 
                onClick={handleGruposClick}
                className={`transition-colors cursor-pointer ${
                  activeNav === "grupos" ? "text-[#1F82D2] font-bold" : "text-slate-800 hover:text-[#1F82D2]"
                }`}
              >
                Grupos
              </a>

            </nav>

            {/* Bloque Derecho: Buscador (abre desplegable) + Registro gratuito + Acceso agencias */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
              
              {/* Botón Buscador que abre el desplegable de zonas y países */}
              <button
                ref={buscadorButtonRef}
                type="button"
                onClick={() => setIsDestDropdownOpen(!isDestDropdownOpen)}
                className={`h-9 px-3.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-2xs ${
                  isDestDropdownOpen 
                    ? "border-[#1F82D2] bg-[#F0F7FF] text-[#1F82D2] ring-1 ring-[#1F82D2]/30" 
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#1F82D2] hover:border-slate-300"
                }`}
                aria-expanded={isDestDropdownOpen}
                aria-haspopup="true"
                title="Abrir buscador geográfico de zonas y países"
              >
                <Search className={`w-3.5 h-3.5 ${isDestDropdownOpen ? "text-[#1F82D2]" : "text-slate-400"}`} />
                <span>Buscador</span>
                {isDestDropdownOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#1F82D2] transition-transform" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform" />
                )}
              </button>

              {/* Botón Registro gratuito */}
              <button
                type="button"
                onClick={handleRegisterClick}
                className="bg-white hover:bg-[#F0F7FF] text-[#1F82D2] border border-[#1F82D2] font-bold text-xs py-2 px-3.5 rounded-lg transition-all shadow-2xs whitespace-nowrap cursor-pointer hover:border-[#166bb0]"
              >
                Registro gratuito
              </button>

              {/* Botón Acceso agencias */}
              <button
                type="button"
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-105 active:scale-98 text-white font-bold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Acceso agencias</span>
              </button>

            </div>

            {/* Mobile Controls (Hamburguesa & Botones rápidos) */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDestDropdownOpen(!isDestDropdownOpen)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5"
                title="Abrir buscador de zonas y países"
              >
                <Search className="w-3.5 h-3.5 text-[#1F82D2]" />
                <span>Buscador</span>
                {isDestDropdownOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white p-2 rounded-lg"
                title="Acceso agencias"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-[#1F82D2] rounded-lg hover:bg-slate-100"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3.5 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar viajes, destinos..."
                className="w-full h-10 pl-9 pr-8 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1F82D2]"
              />
            </form>

            <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-800 pt-1">
              <button
                onClick={handleDestinosClick}
                className="text-left py-2 px-1 hover:text-[#1F82D2] flex items-center justify-between"
              >
                <span>Destinos</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDestDropdownOpen(true);
                }}
                className="text-left py-2 px-1 hover:text-[#1F82D2] flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#1F82D2]" />
                  <span>Buscador de zonas y países</span>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              <a href="#ofertas" onClick={handleOfertasClick} className="py-2 px-1 hover:text-[#1F82D2]">
                Ofertas destacadas
              </a>
              <a href="#viajes-a-medida-grupos" onClick={handleGruposClick} className="py-2 px-1 hover:text-[#1F82D2]">
                Viajes a medida y Grupos
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleRegisterClick}
                className="w-full bg-white text-[#1F82D2] border border-[#1F82D2] font-bold text-xs py-2.5 rounded-lg text-center"
              >
                Registro gratuito
              </button>
              <button
                type="button"
                onClick={handleLoginClick}
                className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Acceso agencias</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. DESPLEGABLE DEL BUSCADOR (PANEL BLANCO OPACO A TODO EL ANCHO) */}
      {isDestDropdownOpen && (
        <div 
          ref={megamenuRef}
          role="region"
          aria-label="Panel del Buscador de Destinos"
          className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 max-h-[85vh] overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            
            {/* Encabezado: "BUSCADOR DE ZONAS Y DESTINOS", selector de 5 zonas (pills sin números) y botón de cierre × */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3.5 mb-4 border-b border-slate-100">
              <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#1F82D2]" />
                  <span className="text-xs sm:text-[13px] font-extrabold text-[#0A0F1D] uppercase tracking-[0.14em]">
                    BUSCADOR DE ZONAS Y DESTINOS
                  </span>
                </div>
                {/* Botón cerrar para móvil */}
                <button 
                  type="button"
                  onClick={() => {
                    setIsDestDropdownOpen(false);
                    buscadorButtonRef.current?.focus();
                  }}
                  aria-label="Cerrar buscador de destinos"
                  className="md:hidden w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Selector de las 5 Zonas (sin número de países entre paréntesis) */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
                {REGIONS_DATA.map((region) => {
                  const isActive = region.id === selectedRegionId;
                  return (
                    <button
                      key={region.id}
                      type="button"
                      onClick={() => setSelectedRegionId(region.id)}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white shadow-xs scale-[1.01]"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {region.displayName}
                    </button>
                  );
                })}

                {/* Botón cerrar para desktop */}
                <button 
                  type="button"
                  onClick={() => {
                    setIsDestDropdownOpen(false);
                    buscadorButtonRef.current?.focus();
                  }}
                  aria-label="Cerrar buscador de destinos"
                  className="hidden md:flex ml-2 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Barra de la zona activa: solo nombre de la zona (sin frase debajo) y enlace a programas */}
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {activeRegion.displayName}
              </h3>
              <button
                type="button"
                onClick={() => handleRegionClick(activeRegion)}
                className="text-xs sm:text-sm font-bold text-[#1F82D2] hover:text-[#166bb0] hover:underline inline-flex items-center gap-1.5 cursor-pointer group"
              >
                <span>Ver todos los programas de {activeRegion.displayName}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Rejilla de países: cada país con fotografía, sin etiquetas, solo el nombre del país bien equilibrado en la esquina inferior izquierda */}
            <div className={`grid ${getGridColsClass(activeRegion.id)} gap-2.5 sm:gap-3 lg:gap-3.5`}>
              {activeRegion.countries.map((country, idx) => (
                <button
                  key={country.destKey || country.name || idx}
                  type="button"
                  onClick={(e) => handleCountryClick(e, country)}
                  className="group relative aspect-[16/10.5] rounded-xl overflow-hidden shadow-2xs hover:shadow-md border border-slate-200/90 hover:border-[#1F82D2] transition-all duration-300 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#1F82D2]"
                  title={`Ver viajes a ${country.name}`}
                >
                  {/* Fotografía del país con zoom al hacer hover */}
                  <img
                    src={assetUrl(country.image || activeRegion.image)}
                    alt={country.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {/* Gradiente oscuro inferior para máximo contraste y legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                  {/* Solo el nombre del país, equilibrado en la esquina inferior izquierda, idéntico en todos */}
                  <span className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-3.5 text-white font-extrabold text-xs sm:text-[13px] lg:text-[13.5px] uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] select-none">
                    {country.name}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
