import { assetUrl } from "../utils/assets";
import React, { useState } from "react";
import Logo from "./Logo";
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  MapPin, 
  Globe, 
  Award, 
  BookOpen, 
  Phone, 
  Mail, 
  Building2, 
  ChevronRight, 
  Clock, 
  Lock, 
  CheckCircle,
  HelpCircle,
  Star,
  Users,
  Anchor,
  Plane,
  Download,
  MessageSquare,
  Play,
  Pause
} from "lucide-react";

interface PublicWebProps {
  onEnterB2B: (agent: string, agency: string) => void;
  onSelectLeyendas?: () => void;
  onSelectMaravillas?: () => void;
}

export default function PublicWeb({ onEnterB2B, onSelectLeyendas, onSelectMaravillas }: PublicWebProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [inquiryName, setInquiryName] = useState<string>("");
  const [inquiryEmail, setInquiryEmail] = useState<string>("");
  const [inquiryAgency, setInquiryAgency] = useState<string>("");
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  
  // 3D Circular Carousel States and Config
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [radius, setRadius] = useState<number>(310);
  const [cardSize, setCardSize] = useState({ width: 450, height: 260 });

  // Dragging states
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartXRef = React.useRef<number>(0);
  const dragStartAngleRef = React.useRef<number>(0);
  const hasDraggedRef = React.useRef<boolean>(false);
  const resumeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    setIsAutoPlaying(false);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 6000); // 6 seconds of inactivity to return to Auto mode
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    setIsAutoPlaying(false);
    dragStartXRef.current = clientX;
    dragStartAngleRef.current = rotationAngle;
    hasDraggedRef.current = false;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }
    const dragSpeedFactor = window.innerWidth < 640 ? 0.35 : 0.22;
    setRotationAngle(dragStartAngleRef.current + deltaX * dragSpeedFactor);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    resetInactivityTimer();
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(95);
        setCardSize({ width: 130, height: 210 });
      } else if (w < 768) {
        setRadius(135);
        setCardSize({ width: 170, height: 250 });
      } else if (w < 1024) {
        setRadius(185);
        setCardSize({ width: 210, height: 290 });
      } else if (w < 1280) {
        setRadius(370);
        setCardSize({ width: 450, height: 260 });
      } else {
        setRadius(430);
        setCardSize({ width: 450, height: 260 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const circularSlides = [
    {
      id: 1,
      title: "JOYAS DEL NILO\nCHARTER PROVINCIAS",
      subtitle: "OPERACIÓN CHÁRTER DIRECTO — SALIDAS SEP / DIC 2026:\n¡Plazas muy limitadas! ¡Hasta agotar Cupos!",
      tag: "incluye\nAbu Simbel en avión",
      image: assetUrl("/dynamic_egipto_abu_simbel.png"),
      price: "1250€"
    },
    {
      id: 2,
      title: "TURQUÍA:\nDescuento de 100€ por persona",
      subtitle: "Para reservas hasta agotar cupos.",
      tag: "Rebajas 2026",
      image: assetUrl("/turquía dynamic.png")
    },
    {
      id: 3,
      title: "Ruta de la Seda: Uzbekistán",
      subtitle: "Descubra las místicas mezquitas de Samarcanda, las callejuelas medievales de Bujará y la magnífica ciudad amurallada de Jiva.",
      tag: "Gran Viaje Cultural",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "EGIPTO SELECTO SENIOR\nPara mayores de 55 años",
      subtitle: "SALIDAS: lunes y viernes | INCLUYE: agua, visado, cuota de servicios, supl. carb. y asistencia.",
      tag: "Selecto +55",
      image: assetUrl("/senior dynamic ok.png")
    },
    {
      id: 5,
      title: "INDIA\nTemplos, palacios y tradiciones milenarias",
      subtitle: "Programas de 7 | 9 noches.",
      tag: "Espiritualidad y Color",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const N = circularSlides.length;
  const activeIndex = (Math.round(-rotationAngle / (360 / N)) % N + N) % N;

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      // Speed factor: 0.011 degrees per millisecond
      // 360 degrees / (0.011 * 1000) = ~32 seconds for a full rotation (perfect midpoint of elegance and speed)
      const speed = 0.011; 
      setRotationAngle((prev) => prev - speed * delta);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoPlaying]);

  // States for B2B login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginAgency, setLoginAgency] = useState<string>("");
  const [loginAgent, setLoginAgent] = useState<string>("");
  const [loginCicma, setLoginCicma] = useState<string>("");

  const destinations = [
    // Oriente Medio
    {
      title: "Joyas del Nilo con Mar Rojo",
      category: "oriente-medio",
      image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=800&q=80",
      description: "Crucero de 4 noches por el Nilo con pensión completa, visitas completas a Luxor y Asuán, estancia en Cairo y descanso en las playas de Hurghada.",
      duration: "11 Días / 10 Noches",
      flights: "Vuelos Regulares Incluidos",
      price: "Desde 1.145 €"
    },
    {
      title: "Ramsés II Lujo",
      category: "oriente-medio",
      image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
      description: "Nuestra ruta más completa por Egipto con vuelos internos, crucero de lujo de 5 estrellas, visitas arqueológicas completas y hotelería de alta gama.",
      duration: "8 Días / 7 Noches",
      flights: "Salidas directas con guía en español",
      price: "Desde 1.490 €"
    },
    // Turquía
    {
      title: "Ruta Turca Completa Confort",
      category: "turquia",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
      description: "Circuito clásico por los paisajes más icónicos de Anatolia: Estambul monumental, la mágica Capadocia, las cascadas de algodón de Pamukkale y Éfeso.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos directos y hoteles 4★/5★",
      price: "Desde 895 €"
    },
    // Uzbekistán
    {
      title: "Uzbekistán Esencial",
      category: "uzbekistan",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      description: "Viaje al corazón de la Ruta de la Seda. Conozca las impresionantes madrazas de Samarcanda, las callejuelas medievales de Bujará y la amurallada Jiva.",
      duration: "8 Días / 6 Noches",
      flights: "Tren de alta velocidad Tashkent-Samarcanda",
      price: "Desde 1.540 €"
    },
    // Egipto desde provincias
    {
      title: "Egipto desde tu Provincia",
      category: "provincias",
      image: "https://images.unsplash.com/photo-1623345805780-8f01f714e65f?auto=format&fit=crop&w=800&q=80",
      description: "Cómodos vuelos chárter directos operados desde aeropuertos de provincias españoles: Zaragoza, Asturias, Bilbao, Valladolid, Valencia, Santiago y más.",
      duration: "8 Días / 7 Noches",
      flights: "Operación Chárter Especial",
      price: "Consulte Calendario de Salidas"
    },
    // Buceo
    {
      title: "Buceo en Mar Rojo - Ruta Norte Especial",
      category: "buceo",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      description: "Para amantes de los fondos marinos: pecios históricos de Thistlegorm, arrecifes de Ras Mohammed y vida coralina en régimen de vida a bordo.",
      duration: "8 Días / 7 Noches",
      flights: "Barco de Buceo Categoría Superior",
      price: "Desde 1.620 €"
    }
  ];

  const brochures = [
    {
      title: "Folleto Egipto Completo",
      desc: "Programas regulares, cruceros de firma, extensiones al Mar Rojo y salidas desde provincias españolas.",
      image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=400&q=80",
      year: "Temporada 2026 / 2027"
    },
    {
      title: "Folleto Turquía, Jordania & Dubai",
      desc: "Gran catálogo de Oriente Medio combinando circuitos históricos, desierto y playas exóticas.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&q=80",
      year: "Temporada 2026 / 2027"
    },
    {
      title: "Folleto Uzbekistán y Grandes Viajes",
      desc: "La mística Ruta de la Seda, Asia Central, safaris en África y propuestas culturales de larga distancia.",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
      year: "Temporada 2026 / 2027"
    },
    {
      title: "Folleto Especial Buceo y Aventura",
      desc: "Los mejores cruceros de vida a bordo y safaris de buceo en el Mar Rojo, Maldivas y Filipinas.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80",
      year: "Temporada 2026 / 2027"
    }
  ];

  const filteredDestinations = activeCategory === "todos" 
    ? destinations 
    : destinations.filter(d => d.category === activeCategory);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryName("");
      setInquiryEmail("");
      setInquiryAgency("");
    }, 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800">
      
      {/* Upper Utility Bar */}
      <div className="bg-[#002B49] text-white border-b border-white/10 py-2.5 px-4 text-xs overflow-x-auto scrollbar-none whitespace-nowrap">
        <div className="max-w-[1440px] mx-auto flex flex-row justify-between items-center gap-6 min-w-max">
          <div className="flex items-center gap-5 whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-slate-300 whitespace-nowrap">
              <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              Booking Madrid: <strong className="ml-0.5">+34 915 521 443</strong>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 whitespace-nowrap">
              <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              reservas@dynamic-tours.com
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 whitespace-nowrap">
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              WhatsApp Urgencias: <strong className="ml-0.5">+34 690 125 031</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 whitespace-nowrap">
            <span className="text-[10px] bg-slate-800 text-[#C5A059] px-2.5 py-0.5 rounded border border-white/5 font-semibold uppercase tracking-wider whitespace-nowrap">
              Venta Exclusiva a Agencias de Viajes
            </span>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-[#C5A059] hover:text-white font-bold transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              Acceso Agencias B2B
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            
            {/* Logo and Slogan */}
            <div className="flex flex-row items-center gap-3 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Logo className="h-11 shrink-0" />
              <div className="hidden sm:flex flex-col justify-center gap-1.5 h-11 pl-3 border-l border-slate-200 whitespace-nowrap">
                <p className="text-[9px] sm:text-[10px] font-black uppercase text-[#002B49] tracking-wider leading-none">
                  MÁS MUNDO PARA TUS VIAJEROS
                </p>
                <p className="text-[9px] sm:text-[10px] font-black uppercase text-[#C5A059] tracking-wider leading-none">
                  MÁS RESPALDO PARA TU AGENCIA
                </p>
              </div>
            </div>

            {/* Public Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-7 whitespace-nowrap mx-4">
              <a href="#nosotros" className="text-xs xl:text-sm font-bold text-slate-600 hover:text-[#002B49] transition-colors whitespace-nowrap">Quiénes Somos</a>
              <a href="#alta-agencia" className="text-xs xl:text-sm font-bold text-[#C5A059] hover:text-[#002B49] transition-colors whitespace-nowrap">Registro B2B</a>
            </nav>

            {/* Accentuated CTA to Login */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-[#002B49] hover:bg-[#C5A059] hover:text-[#002B49] text-white font-extrabold text-xs uppercase tracking-widest py-3 px-5 rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0 border border-[#002B49] whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              Portal de Agencias
            </button>

          </div>
        </div>
      </header>

      {/* 3D Circular Destination Carousel Hero */}
      <section className="relative bg-slate-950 text-white min-h-[640px] lg:min-h-[750px] flex flex-col justify-between overflow-hidden py-12 sm:py-16">
        {/* Subtle radial gradients in the background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.12),rgba(0,0,0,0))] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,43,73,0.3),rgba(0,0,0,0))] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center flex-grow justify-center">
          {/* Header introduction */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059] shadow-sm">
              MÁS MUNDO PARA TUS VIAJEROS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-serif uppercase tracking-wider leading-tight text-white max-w-2xl mx-auto">
              MÁS RESPALDO PARA TU AGENCIA
            </h1>
          </div>

          {/* 3D Carousel Stage */}
          <div 
            className={`w-full relative flex items-center justify-center mt-6 sm:mt-10 mb-16 sm:mb-24 select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} 
            style={{ height: `${cardSize.height + 60}px` }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {/* 3D Wrapper */}
            <div 
              className="relative flex items-center justify-center pointer-events-auto"
              style={{ 
                perspective: "1200px", 
                perspectiveOrigin: "50% 45%",
                width: "100%", 
                height: `${cardSize.height}px` 
              }}
            >
              <div 
                className={`relative w-full h-full ${(isAutoPlaying || isDragging) ? "transition-none" : "transition-transform duration-700 ease-out"}`}
                style={{
                  transform: `rotateY(${rotationAngle}deg)`,
                  transformStyle: "preserve-3d",
                  width: `${cardSize.width}px`,
                  height: `${cardSize.height}px`
                }}
              >
                {circularSlides.map((slide, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer ${
                        isActive 
                          ? "border-transparent ring-4 ring-white/35 scale-105 z-30 shadow-[0_0_25px_rgba(255,255,255,0.18)]" 
                          : "border border-white/10 opacity-30 hover:opacity-75 hover:border-white/20 scale-95 z-10"
                      }`}
                      style={{
                        transform: `rotateY(${idx * (360 / N)}deg) translateZ(${radius}px)`,
                        width: `${cardSize.width}px`,
                        height: `${cardSize.height}px`,
                        left: "50%",
                        top: "50%",
                        marginLeft: `-${cardSize.width / 2}px`,
                        marginTop: `-${cardSize.height / 2}px`,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                      }}
                      onClick={(e) => {
                        if (hasDraggedRef.current) {
                          e.preventDefault();
                          return;
                        }
                        const diff = idx - activeIndex;
                        let steps = diff;
                        if (steps > N / 2) steps -= N;
                        if (steps < -N / 2) steps += N;
                        setRotationAngle((prev) => prev - (steps * (360 / N)));
                        resetInactivityTimer();
                      }}
                    >
                      {/* Card Content with Image overlay */}
                      <div className="absolute inset-0 select-none">
                        <img
                          src={assetUrl(slide.image)}
                          alt={slide.title}
                          className="w-full h-full object-cover transition-transform duration-700 select-none"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/15 to-transparent"></div>
                      </div>

                      {/* Info on Card */}
                      <div className="absolute inset-0 pt-4 pb-4 pr-4 pl-6 sm:pt-5 sm:pb-5 sm:pr-5 sm:pl-7 flex flex-col justify-end text-left select-none">
                        <span className="text-[7.5px] sm:text-[8px] font-black uppercase text-slate-100 tracking-wider bg-white/15 backdrop-blur-md px-2 py-0.5 rounded border border-white/25 self-start mb-2 whitespace-pre-line">
                           {slide.tag}
                        </span>
                        <div className="flex justify-between items-end w-full gap-2">
                          <h4 className="text-xs sm:text-sm lg:text-base font-black text-white leading-tight font-serif whitespace-pre-line">
                            {slide.title}
                          </h4>
                          {'price' in slide && (
                            <div className="shrink-0 bg-slate-900/80 backdrop-blur-md text-white border border-white/15 font-black text-center px-3 py-1.5 rounded-lg tracking-wide flex flex-col justify-center leading-none">
                              <span className="text-[8px] sm:text-[9px] uppercase font-bold text-slate-300 tracking-wider pb-0.5">Desde</span>
                              <span className="text-[#C5A059] font-extrabold text-xs sm:text-sm">{slide.price}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Info on Active Card & Dynamic Controls */}
          <div className="w-full max-w-2xl relative z-20">
            {/* Soft, warm natural wood/beige background glow to replicate the exact light filtration of the screenshot's wooden table */}
            <div className="absolute -inset-12 bg-[radial-gradient(circle_at_center,rgba(162,140,117,0.45),rgba(140,115,85,0.3)_40%,transparent_70%)] blur-3xl rounded-full -z-10 pointer-events-none animate-pulse duration-[8000ms]" />
            
            <div className="w-full text-center space-y-5 transition-all duration-300">
              {/* Active Card Text */}
              <div key={activeIndex} className="space-y-2 animate-fade-in">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-light font-serif text-white tracking-wide whitespace-pre-line">
                  {circularSlides[activeIndex].title}
                </h3>
                <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.2em] mt-1 whitespace-pre-line">
                  {circularSlides[activeIndex].tag}
                </p>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-medium pt-2 whitespace-pre-line">
                  {circularSlides[activeIndex].subtitle}
                </p>
                {circularSlides[activeIndex].id === 1 && (
                  <div className="max-h-52 overflow-y-auto pr-1.5 mt-4 max-w-lg mx-auto scrollbar-thin scrollbar-thumb-white/10 text-left">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { city: "Badajoz", date: "20 SEP" },
                        { city: "Oviedo", date: "20 SEP" },
                        { city: "Sevilla", date: "27 SEP" },
                        { city: "Vitoria", date: "18 OCT" },
                        { city: "P. Mallorca", date: "25 OCT" },
                        { city: "P. Mallorca", date: "01 NOV" },
                        { city: "Sevilla", date: "22 NOV" },
                        { city: "Barcelona", date: "06 DIC" },
                        { city: "Burgos", date: "06 DIC" },
                        { city: "Madrid", date: "06 DIC" },
                        { city: "Valladolid", date: "13 DIC" },
                        { city: "Málaga", date: "20 DIC" },
                        { city: "Bilbao", date: "27 DIC" }
                      ].map((salida, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-between">
                          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider truncate mr-1" title={salida.city}>{salida.city}</span>
                          <span className="text-[10px] text-[#C5A059] font-black tracking-widest shrink-0">{salida.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions for active card */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-transparent hover:bg-[#C5A059] text-white hover:text-[#002B49] border-2 border-[#C5A059] font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-sm"
                >
                  Cotizar Destino B2B
                </button>
                <a
                  href="#destinos"
                  className="bg-transparent hover:bg-white text-white hover:text-[#002B49] font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-xl border-2 border-white transition-all flex items-center gap-1.5"
                >
                  Ver Más Catálogo
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </a>
              </div>

              {/* Carousel Interactive Controls (Spin, Play/Pause, Indicators) */}
              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Wheel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setRotationAngle((prev) => prev + (360 / N));
                      resetInactivityTimer();
                    }}
                    className="p-2 text-white/80 hover:text-[#C5A059] transition-all hover:scale-110 cursor-pointer bg-transparent border-none"
                    title="Girar Izquierda"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      if (isAutoPlaying) {
                        setIsAutoPlaying(false);
                        if (resumeTimeoutRef.current) {
                          clearTimeout(resumeTimeoutRef.current);
                        }
                      } else {
                        setIsAutoPlaying(true);
                      }
                    }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all flex items-center gap-1.5 px-3 cursor-pointer"
                    title={isAutoPlaying ? "Pausar Rotación" : "Iniciar Rotación"}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[9px] font-bold tracking-wider uppercase">Auto</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[9px] font-bold tracking-wider uppercase">Manual</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setRotationAngle((prev) => prev - (360 / N));
                      resetInactivityTimer();
                    }}
                    className="p-2 text-white/80 hover:text-[#C5A059] transition-all hover:scale-110 cursor-pointer bg-transparent border-none"
                    title="Girar Derecha"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                  {circularSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const diff = idx - activeIndex;
                        let steps = diff;
                        if (steps > N / 2) steps -= N;
                        if (steps < -N / 2) steps += N;
                        setRotationAngle((prev) => prev - (steps * (360 / N)));
                        resetInactivityTimer();
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeIndex
                          ? "w-7 bg-[#C5A059]"
                          : "w-2.5 bg-white/20 hover:bg-white/40 border border-white/10"
                      }`}
                      title={`Ver Destino ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-white border-y border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-[#C5A059]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#002B49] uppercase">30+ Años Operando</h4>
                <p className="text-xs text-slate-500">Garantía, experiencia y solvencia mayorista.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-[#C5A059]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#002B49] uppercase">Agentes Especializados</h4>
                <p className="text-xs text-slate-500">Asesores expertos asignados para cada destino.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#002B49] uppercase">Seguridad & Avales</h4>
                <p className="text-xs text-slate-500">Pólizas combinadas reguladas y Licencia CICMA.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#C5A059]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#002B49] uppercase">Asistencia 24 Horas</h4>
                <p className="text-xs text-slate-500">Teléfono exclusivo de urgencias en destino.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OFERTAS DESTACADAS Section */}
      <section id="ofertas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <span className="text-xs font-black text-[#C5A059] uppercase tracking-widest block">PROMOCIONES EXCLUSIVAS</span>
              <h2 className="text-3xl font-extrabold text-[#002B49] font-serif">OFERTAS DESTACADAS</h2>
              <p className="text-slate-500 text-sm max-w-xl">
                Selección especial de itinerarios con cupos confirmados y tarifas promocionales de rebajas. Reserve en su agencia de viajes autorizada.
              </p>
            </div>
          </div>

          {/* Grid de Ofertas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Maravillas del Nilo",
                duration: "8 días, 7 noches",
                price: "909€",
                image: assetUrl("/joyas nilo 2.png"),
                hasCupos: true,
                hasRebajas: true,
                description: "4N Crucero por el Nilo en PC + 3N El Cairo en AD + Vuelos internacionales y domésticos + Traslados + Visitas + Seguro + Tasas",
                specialBadge: {
                  type: "flight",
                  title: "Vuelo a Luxor",
                  subtitle: "Salidas Madrid, Valencia, Bilbao, Málaga y Barcelona"
                }
              },
              {
                title: "Leyendas de Egipto Sin Abu Simbel",
                duration: "8 días, 7 noches",
                price: "749€",
                image: assetUrl("/dia_5_guiza.jpg"),
                hasCupos: true,
                hasRebajas: true,
                description: "3N Crucero por el Nilo en PC + 4N El Cairo en AD + Vuelos internacionales y domésticos + Traslados + Visitas + Seguro + Tasas - NO INCLUYE ABU SIMBEL",
                specialBadge: {
                  type: "flight",
                  title: "Vuelo a Aswan",
                  subtitle: "Salidas directas los viernes"
                },
                url: "https://www.dynamic-tours.com/destino-leyendas-de-egipto-sin-abu-simbel-salida-viernes"
              },
              {
                title: "Joyas del Nilo - Charter Provincias",
                duration: "8 días, 7 noches",
                price: "1250€",
                image: assetUrl("/dynamic_egipto_abu_simbel.png"),
                hasCupos: true,
                hasRebajas: true,
                isUltimasPlazas: true,
                specialBadge: {
                  type: "highlight",
                  title: "Incluye Abu Simbel en avión",
                  subtitle: "Servicio exclusivo integrado"
                }
              },
              {
                title: "Sueños de Estambul y Capadocia",
                duration: "8 días, 7 noches",
                price: "1169€",
                image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
                hasCupos: true,
                hasRebajas: true,
              },
              {
                title: "Ruta Turca completa confort",
                duration: "8 días, 7 noches",
                price: "1395€",
                image: "https://images.unsplash.com/photo-1564135624576-c5c88640f235?auto=format&fit=crop&w=800&q=80",
                hasCupos: true,
                hasRebajas: true,
              },
              {
                title: "Egipto Azul Isis + Hurghada",
                duration: "11 días, 10 noches",
                price: "1400€",
                image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80",
                hasCupos: true,
                hasRebajas: true,
                isUltimasPlazas: true,
                specialBadge: {
                  type: "beach",
                  title: "Especial Playa",
                  subtitle: "Régimen Todo Incluido en Mar Rojo"
                }
              }
            ].map((item, idx) => {
              const isMaravillas = item.title === "Maravillas del Nilo" || item.title === "Leyendas de Egipto Sin Abu Simbel";
              
              const CardInner = (
                <>
                  {/* Full-Bleed Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={assetUrl(item.image)} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    {/* Soft gradient to keep images bright and vibrant, with just enough contrast for the text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>
                  </div>

                  {/* Top Overlay Badges */}
                  <div className="relative z-10 p-5 flex justify-between items-start">
                    <div className="flex flex-col gap-1.5">
                      {item.hasCupos && (
                        <span className="bg-[#002B49] text-[#C5A059] border border-[#C5A059]/30 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm self-start">
                          CUPOS
                        </span>
                      )}
                      {item.hasRebajas && (
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm self-start ${
                          item.isUltimasPlazas 
                            ? "bg-[#C5A059] text-[#002B49]" 
                            : "bg-red-600 text-white"
                        }`}>
                          {item.isUltimasPlazas ? "ÚLTIMAS PLAZAS!" : "REBAJAS"}
                        </span>
                      )}
                    </div>

                    {/* Price in Top Right Corner */}
                    <div className="text-right bg-slate-950/45 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 shadow-md">
                      <span className="text-[8px] block uppercase leading-none pb-1 tracking-widest text-slate-300 font-extrabold">desde</span>
                      <span className="text-xl font-black text-white font-serif leading-none">{item.price}</span>
                    </div>
                  </div>

                  {/* Bottom Overlay Content */}
                  <div className="relative z-10 p-6 space-y-3.5">
                    <div className="space-y-1.5">
                      <div className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${isMaravillas ? 'text-white' : 'text-slate-300'}`}>
                        <Clock className={`w-3.5 h-3.5 ${isMaravillas ? 'text-white' : 'text-[#C5A059]'}`} />
                        <span>{item.duration}</span>
                      </div>
                      
                      <h3 className={`text-lg font-bold text-white transition-colors leading-snug font-serif line-clamp-2 ${isMaravillas ? 'group-hover:text-white' : 'group-hover:text-[#C5A059]'}`}>
                        {item.title}
                      </h3>
                    </div>

                    {/* Unified Frosted Glass Capsule for Inclusions and Flight Badges */}
                    {(item.specialBadge || ('description' in item && item.description)) && (
                      <div className="bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-xl p-3 space-y-2.5">
                        {/* Inclusions */}
                        {'description' in item && item.description && (
                          <div className="flex items-start gap-1.5">
                            {isMaravillas && <CheckCircle className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />}
                            <p className={`text-[11px] leading-relaxed font-sans ${isMaravillas ? 'text-white font-medium' : 'text-slate-300'}`}>
                              {isMaravillas ? (
                                <>
                                  <span className="font-extrabold text-white">INCLUYE: </span>
                                  {item.description}
                                </>
                              ) : (
                                item.description
                              )}
                            </p>
                          </div>
                        )}

                        {/* Divider between Inclusions and Flights if both exist */}
                        {'description' in item && item.description && item.specialBadge && (
                          <div className="border-t border-white/10 my-1"></div>
                        )}

                        {/* Flight/Highlight Banner */}
                        {item.specialBadge && (
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg shrink-0 ${isMaravillas ? 'bg-white/20 text-white' : 'bg-[#C5A059]/20 text-[#C5A059]'}`}>
                              {item.specialBadge.type === "flight" ? (
                                <Plane className="w-3.5 h-3.5" />
                              ) : item.specialBadge.type === "beach" ? (
                                <Compass className="w-3.5 h-3.5 text-sky-300" />
                              ) : (
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-black uppercase text-white tracking-wider leading-none">{item.specialBadge.title}</p>
                              <p className={`text-[9px] truncate leading-tight mt-0.5 uppercase tracking-wider ${isMaravillas ? 'text-white' : 'text-slate-300'}`}>{item.specialBadge.subtitle}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Price Section */}
                    <div className="flex justify-between items-end pt-2.5 border-t border-white/10">
                      <span className={`text-[9px] uppercase font-black tracking-widest ${isMaravillas ? 'text-white' : 'text-slate-400'}`}>
                        Ver Detalles
                      </span>
                    </div>
                  </div>
                </>
              );

              const cardClasses = "relative h-[430px] rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all flex flex-col justify-between text-left border border-slate-200/50 block";

              if (item.title === "Leyendas de Egipto Sin Abu Simbel" && onSelectLeyendas) {
                return (
                  <div 
                    key={idx} 
                    onClick={onSelectLeyendas}
                    className={`${cardClasses} cursor-pointer`}
                  >
                    {CardInner}
                  </div>
                );
              }

              if (item.title === "Maravillas del Nilo" && onSelectMaravillas) {
                return (
                  <div 
                    key={idx} 
                    onClick={onSelectMaravillas}
                    className={`${cardClasses} cursor-pointer`}
                  >
                    {CardInner}
                  </div>
                );
              }

              if ('url' in item && item.url) {
                return (
                  <a 
                    key={idx} 
                    href={item.url as string} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={cardClasses}
                  >
                    {CardInner}
                  </a>
                );
              }

              return (
                <div 
                  key={idx} 
                  className={`${cardClasses} cursor-pointer`}
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  {CardInner}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Nosotros y Delegaciones */}
      <section id="nosotros" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-black text-[#C5A059] uppercase tracking-widest block">SOBRE DYNAMIC TOURS</span>
            <h3 className="text-3xl font-extrabold text-[#002B49] font-serif">Compromiso Exclusivo con el Canal Profesional</h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Fundada en Madrid, Dynamic Tours es una de las agencias mayoristas de referencia para destinos de Oriente Medio y grandes viajes de larga distancia. Nuestra filosofía de operación se sustenta sobre la excelencia del servicio terrestre privado, una política estricta de fidelidad al canal de agencias y una constante inversión en herramientas tecnológicas avanzadas para dinamizar el trabajo de las minoristas.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Diseñamos viajes culturales, lunas de miel, rutas arqueológicas y safaris de aventura aportando tranquilidad con un seguro multiasistencia médico líder, asistencia continuada 24/7 en español y guías nativos expertos.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h5 className="text-xs font-black text-[#002B49] uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">
                Sede Central España
              </h5>
              <div className="space-y-2 text-xs font-semibold text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Avda. Menéndez Pelayo, 83, 28007 - Madrid, España</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>+34 915 521 443</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>reservas@dynamic-tours.com</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h5 className="text-xs font-black text-[#002B49] uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">
                Delegación Portugal
              </h5>
              <div className="space-y-2 text-xs font-semibold text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Rua de Cinco de Outubro, 185, 4100-175 Porto, Portugal</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>+351 912 757 377</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>reservas@dynamic-tours.pt</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Agency Registration Form (Alta de Agencia) */}
      <section id="alta-agencia" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-black text-[#C5A059] uppercase tracking-widest block">REGISTRO DE AGENCIA COLABORADORA</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] font-serif">¿Aún no trabaja con Dynamic Tours?</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Si dispone de una agencia de viajes minorista legalmente establecida en España o Portugal y desea formalizar reservas, consultar tarifas netas de operador o usar el cotizador inteligente, solicite su alta de colaborador.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm text-left">
            <form onSubmit={handleInquiry} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-600 block">Nombre de la Agencia</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Viajes Castellana S.L."
                  value={inquiryAgency}
                  onChange={(e) => setInquiryAgency(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-3 bg-white focus:outline-none focus:border-[#002B49] font-medium"
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-600 block">Nombre de Contacto</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Laura Gómez"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-3 bg-white focus:outline-none focus:border-[#002B49] font-medium"
                />
              </div>

              <div className="space-y-1.5 text-xs sm:col-span-2">
                <label className="font-bold text-slate-600 block">Correo Electrónico Corporativo (B2B)</label>
                <input 
                  type="email" 
                  required
                  placeholder="Ej: laura@viajescastellana.com"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-3 bg-white focus:outline-none focus:border-[#002B49] font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#002B49] hover:bg-[#C5A059] text-white hover:text-[#002B49] font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-4 h-4" />
                  Enviar Solicitud de Colaboración
                </button>
              </div>
            </form>

            {inquirySubmitted && (
              <div className="mt-6 bg-emerald-50 text-emerald-800 border border-emerald-100 p-4 rounded-xl text-xs font-semibold animate-fade-in space-y-1 text-center">
                <p className="flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ¡Solicitud de Registro Enviada con Éxito!
                </p>
                <p className="text-[11px] text-slate-500 font-normal">Nuestro departamento de administración verificará su licencia minorista de turismo (CICMA/CV) y le remitirá las claves de acceso B2B en menos de 24 horas.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Public Footer */}
      <footer className="bg-slate-100 text-slate-800 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <Logo className="h-12" />
            <p className="text-[11px] text-slate-600 leading-relaxed max-w-xs">
              Mayorista de viajes con Licencia CICMA 1948. Especialistas en diseño exclusivo de experiencias a medida y de alta gama para agencias de viajes minoristas en España y Latinoamérica.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#002B49] uppercase tracking-widest">Garantías & Licencias</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Cumplimos estrictamente con los avales, pólizas de responsabilidad civil y depósitos de garantía exigidos por la Directiva Europea de Viajes Combinados. Registrados en el registro de turismo de la Comunidad de Madrid con el código CICMA 1948.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#002B49] uppercase tracking-widest">Área Legal</h4>
            <ul className="text-[11px] text-slate-600 space-y-1.5">
              <li><a href="#" className="hover:underline hover:text-[#002B49] transition-colors">Condiciones Generales de Contratación</a></li>
              <li><a href="#" className="hover:underline hover:text-[#002B49] transition-colors">Política de Privacidad de Datos</a></li>
              <li><a href="#" className="hover:underline hover:text-[#002B49] transition-colors">Aviso Legal y Uso del Portal</a></li>
              <li><a href="#" className="hover:underline hover:text-[#002B49] transition-colors">Política de Cookies</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 mt-8 pt-6 text-center text-[10px] text-slate-500">
          <p>© 2026 Dynamic Tours S.A. Todos los derechos reservados. Licencia CICMA 1948.</p>
        </div>
      </footer>

      {/* Modern B2B Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md border border-slate-200/80 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-[#002B49]/10 rounded-2xl flex items-center justify-center text-[#002B49]">
                <Lock className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#002B49]">
                Acceso Profesional B2B
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Área de cotización y reservas exclusiva para agentes minoristas autorizados de España y Portugal.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onEnterB2B(loginAgent, loginAgency);
                setIsLoginModalOpen(false);
              }}
              className="space-y-4 text-left"
            >
              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-600 block">Nombre del Agente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Laura Gómez"
                  value={loginAgent}
                  onChange={(e) => setLoginAgent(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#002B49] font-medium text-slate-800"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-600 block">Nombre de la Agencia</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Viajes Castellana S.L."
                  value={loginAgency}
                  onChange={(e) => setLoginAgency(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#002B49] font-medium text-slate-800"
                />
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-600">Licencia CICMA / Clave B2B</label>
                  <span className="text-[10px] text-slate-400 font-medium">Opcional en Demo</span>
                </div>
                <input
                  type="text"
                  placeholder="Ej: CICMA 1948"
                  value={loginCicma}
                  onChange={(e) => setLoginCicma(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#002B49] font-medium text-slate-800"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-[#002B49] hover:bg-[#C5A059] text-white hover:text-[#002B49] font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Acceso Seguro B2B
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onEnterB2B("Agente de Demostración", "Viajes Exclusivos B2B");
                    setIsLoginModalOpen(false);
                  }}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs py-3 rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-1 cursor-pointer"
                >
                  Continuar como Invitado B2B
                </button>

                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="w-full text-center text-slate-400 hover:text-slate-600 text-xs font-bold py-2 transition-all block"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
