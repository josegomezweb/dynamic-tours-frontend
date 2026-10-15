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
  
  // States for interactive travel finder (Buscador B2B)
  const [finderDest, setFinderDest] = useState<string>("todos");
  const [finderType, setFinderType] = useState<string>("todos");
  const [finderMonth, setFinderMonth] = useState<string>("todos");
  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);
  
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

  const heroSlides = [
    {
      id: 1,
      category: "GRANDES VIAJES: INDIA",
      title: "Viajes llenos de color y espiritualidad",
      subtitle: "Programas Exclusivos de 7 y 9 Noches",
      desc: "Descubra el Triángulo de Oro y las joyas históricas del Rajastán con la tranquilidad, garantías y servicios preferentes de un gran touroperador.",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80",
      targetId: "ofertas",
      priceLabel: "DESDE 1.150€",
      highlights: [
        "Vuelos de línea regular garantizados con conexiones optimizadas",
        "Selección premium de hoteles de categoría 5 estrellas",
        "Chófer privado con aire acondicionado y guías locales de habla hispana",
        "Asistencia receptiva propia de Dynamic Tours 24/7 en destino"
      ]
    },
    {
      id: 2,
      category: "EGIPTO DESDE PROVINCIAS",
      title: "Joyas del Nilo (8 Días / 7 Noches)",
      subtitle: "Operación Chárter Directo - Salidas Especiales Septiembre",
      desc: "Evite escalas molestas con nuestra exclusiva operación aérea regional directa. Su plaza está garantizada con cupos reales e inmediatos.",
      image: assetUrl("/dia_5_guiza.jpg"),
      targetId: "ofertas",
      priceLabel: "DESDE 1.250€",
      highlights: [
        "Vuelos chárter directos sin escalas desde Asturias, Badajoz y Sevilla",
        "Visita estrella a los Templos de Abu Simbel en avión incluida",
        "4 noches de crucero en Pensión Completa + 3 noches en El Cairo",
        "Traslados, visitas oficiales detalladas y seguro de asistencia"
      ]
    },
    {
      id: 3,
      category: "REBAJAS 2026: TURQUÍA",
      title: "Descuento Directo de 100€ por Persona",
      subtitle: "Circuitos Clásicos y Combinaciones con Capadocia",
      desc: "Reserve con las mejores ventajas de preventa y explore Estambul, las piscinas termales de Pamukkale y los valles de Capadocia.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80",
      targetId: "ofertas",
      priceLabel: "DESDE 895€",
      highlights: [
        "Descuento de 100€ aplicable de forma inmediata en reservas activas",
        "Cupos aéreos garantizados con la prestigiosa aerolínea Turkish Airlines",
        "Hoteles de categoría 5* con régimen de Media Pensión incluido",
        "Confirmación de plaza en tiempo real desde el portal de agencias"
      ]
    },
    {
      id: 4,
      category: "EGIPTO SELECTO SENIOR",
      title: "Programa Exclusivo Mayores de 55 Años",
      subtitle: "El Viaje Más Completo y Cómodo del Mercado",
      desc: "Un ritmo de viaje adaptado y diseñado exclusivamente para el público senior y acompañantes de cualquier edad con todo integrado.",
      image: assetUrl("/senior dynamic ok.png"),
      targetId: "ofertas",
      priceLabel: "TODO INCLUIDO",
      highlights: [
        "Agua mineral embotellada incluida en los almuerzos y cenas",
        "Tasas aéreas, visado de entrada y cuotas de servicio ya incluidos",
        "Visitas guiadas completas con auriculares individuales para las explicaciones",
        "Seguro especial de asistencia en viaje y cancelación médica de serie"
      ]
    }
  ];

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

  const [selectedTimelineDay, setSelectedTimelineDay] = useState<number>(0);

  const timelineDays = [
    {
      day: "Día 1",
      title: "Llegada al Cairo y Bienvenida de Autor",
      subtitle: "Recepción Privada y Traslado de Gala",
      narrative: "Asistencia preferencial en el aeropuerto de El Cairo por nuestro personal bilingüe uniformado antes del control de pasaportes. Traslados privados en vehículos de alta gama climatizados hacia su hotel de 5 estrellas seleccionado con vistas exclusivas a la ciudad.",
      image: assetUrl("/noche_cairota.jpg"),
      badges: ["Asistencia Vip", "Traslado Privado", "Hotel 5★ Lujo"],
      icon: Sparkles
    },
    {
      day: "Día 2",
      title: "El Despertar de los Faraones",
      subtitle: "Las Grandes Pirámides de Guiza y la Esfinge",
      narrative: "Desayuno gourmet. Visita privada al legendario complejo arqueológico de Guiza: las pirámides de Keops, Kefrén y Micerino, la mística Esfinge esculpida en roca y el templo del valle. Acompañados en exclusiva por un arqueólogo egiptólogo bilingüe oficial de nuestra firma.",
      image: assetUrl("/dia_5_guiza.jpg"),
      badges: ["Egiptólogo Privado", "Acceso Preferencial", "Almuerzo de Autor"],
      icon: Compass
    },
    {
      day: "Día 3",
      title: "Vuelo a Luxor y Crucero Fluvial",
      subtitle: "Embarque en Motonave de Firma de 5★",
      narrative: "Vuelo de conexión directo a Luxor incluido. Embarque prioritario en nuestro barco fluvial exclusivo. Por la tarde, visita monumental a los espectaculares Templos de Karnak y Luxor, conectados por la famosa avenida de las esfinges e iluminados al atardecer.",
      image: assetUrl("/globo_luxor.jpg"),
      badges: ["Vuelo Doméstico", "Crucero Fluvial", "Pensión Completa"],
      icon: Anchor
    },
    {
      day: "Día 4",
      title: "El Valle de los Reyes y Navegación",
      subtitle: "Tumbas Reales y Cruzar la Esclusa de Esna",
      narrative: "Paseo al amanecer por el Valle de los Reyes para explorar las tumbas secretas de los grandes faraones del Imperio Nuevo. Visita al Templo de la Reina Hatshepsut y parada fotográfica en los Colosos de Memnón. Tarde de navegación contemplativa hacia Esna disfrutando del té en cubierta.",
      image: assetUrl("/alejandria.jpg"),
      badges: ["Valle de los Reyes", "Hatshepsut", "Navegación Relax"],
      icon: MapPin
    },
    {
      day: "Día 5",
      title: "El Esplendor del Nilo Medio",
      subtitle: "Templos Monumentales de Edfu y Kom Ombo",
      narrative: "Traslado tradicional en calesas para visitar el Templo de Horus en Edfu, el mejor conservado del país. De vuelta a bordo, navegación hacia Kom Ombo para visitar el singular templo doble dedicado a los dioses Sobek (cocodrilo) y Haroeris (halcón). Cena de gala egipcia a bordo.",
      image: assetUrl("/joyas nilo 2.png"),
      badges: ["Calesa Clásica", "Kom Ombo", "Cena de Gala"],
      icon: ShieldCheck
    },
    {
      day: "Día 6",
      title: "Aswan y la Joya de Abu Simbel",
      subtitle: "Expedición en Avión a los Templos de Ramsés II",
      narrative: "Traslado VIP al aeropuerto de Aswan para volar hacia los colosales Templos de Abu Simbel, esculpidos en la roca del desierto por Ramsés II para su amada Nefertari. Por la tarde, navegación romántica en faluca tradicional y visita al Templo de Philae en la sagrada isla de Isis.",
      image: assetUrl("/abu_simbel.jpg"),
      badges: ["Abu Simbel en Avión", "Paseo en Faluca", "Isla de Philae"],
      icon: Plane
    },
    {
      day: "Día 7",
      title: "Regreso a El Cairo Histórico",
      subtitle: "Ciudadela, Barrio Copto y Gran Bazar",
      narrative: "Vuelo de retorno a El Cairo. Recorrido privado por la majestuosa Ciudadela de Saladino, la Mezquita de Alabastro y el pintoresco Barrio Copto. Finalizaremos el día perdiéndonos entre los aromas de especias, perfumes y artesanía del histórico bazar Khan el-Khalili.",
      image: assetUrl("/DYNAMIC-logo-oscurecido.png"),
      badges: ["Vuelo Incluido", "Bazar Khan el-Khalili", "Mezquita de Alabastro"],
      icon: Award
    },
    {
      day: "Día 8",
      title: "Despedida de Autor y Retorno",
      subtitle: "Custodia de Trámites y Vuelo de Regreso",
      narrative: "Último desayuno en el hotel. Traslado privado al aeropuerto internacional de El Cairo con nuestro personal, quien le custodiará y guiará en los trámites de facturación del equipaje y control de seguridad para garantizar un viaje de retorno plácido y sin complicaciones.",
      image: assetUrl("/gem.jpeg"),
      badges: ["Traslado Aeropuerto", "Asistencia Prioritaria", "Fin de Servicios"],
      icon: CheckCircle
    }
  ];

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

  const filteredDestinations = destinations.filter(d => {
    // 1. Tab category filter
    if (activeCategory !== "todos" && d.category !== activeCategory) {
      return false;
    }
    
    // 2. Finder Destination filter
    if (finderDest !== "todos") {
      const titleLower = d.title.toLowerCase();
      const descLower = d.description.toLowerCase();
      const catLower = d.category.toLowerCase();
      
      if (finderDest === "egipto") {
        if (!titleLower.includes("nilo") && !titleLower.includes("egipto") && !titleLower.includes("ramses") && !descLower.includes("cairo") && !descLower.includes("nilo") && !descLower.includes("egipto")) {
          return false;
        }
      } else if (finderDest === "turquia") {
        if (catLower !== "turquia" && !titleLower.includes("turquia") && !titleLower.includes("estambul")) return false;
      } else if (finderDest === "uzbekistan") {
        if (catLower !== "uzbekistan" && !titleLower.includes("uzbekistan")) return false;
      } else if (finderDest === "buceo") {
        if (catLower !== "buceo" && !titleLower.includes("buceo")) return false;
      } else if (finderDest === "otros") {
        if (catLower === "egipto" || catLower === "turquia" || catLower === "uzbekistan" || titleLower.includes("egipto") || titleLower.includes("turquía")) return false;
      }
    }

    // 3. Finder Type filter
    if (finderType !== "todos") {
      const tLower = finderType.toLowerCase();
      const titleLower = d.title.toLowerCase();
      const descLower = d.description.toLowerCase();
      
      if (tLower === "crucero") {
        if (!titleLower.includes("crucero") && !titleLower.includes("nilo") && !descLower.includes("crucero") && !descLower.includes("motonave")) {
          return false;
        }
      } else if (tLower === "circuito") {
        if (titleLower.includes("buceo") || d.category === "buceo") {
          return false;
        }
      } else if (tLower === "charter") {
        if (d.category !== "provincias" && !titleLower.includes("charter") && !titleLower.includes("provincia")) {
          return false;
        }
      } else if (tLower === "senior") {
        if (!titleLower.includes("senior") && !titleLower.includes("55")) {
          return false;
        }
      }
    }

    return true;
  });

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
      <div className="bg-slate-100 text-slate-700 border-b border-slate-200 py-2.5 px-4 text-xs overflow-x-auto scrollbar-none whitespace-nowrap">
        <div className="max-w-[1440px] mx-auto flex flex-row justify-between items-center gap-6 min-w-max">
          <div className="flex items-center gap-5 whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-slate-600 whitespace-nowrap font-medium text-[11px]">
              <Phone className="w-3.5 h-3.5 text-[#1F82D2] shrink-0" />
              Central Madrid: <strong className="ml-0.5 text-slate-900 font-bold">+34 915 521 443</strong>
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 whitespace-nowrap font-medium text-[11px]">
              <Mail className="w-3.5 h-3.5 text-[#1F82D2] shrink-0" />
              reservas@dynamic-tours.com
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 whitespace-nowrap font-bold text-[11px]">
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              Garantía Urgencias 24/7: <strong className="ml-0.5 text-slate-900 font-black">+34 690 125 031</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 whitespace-nowrap">
            <span className="text-[9px] bg-[#1F82D2]/10 text-[#1F82D2] px-3 py-1 rounded-sm border border-[#1F82D2]/35 font-extrabold uppercase tracking-widest whitespace-nowrap">
              ✦ Operador Autorizado CICMA 1948
            </span>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-[#1F82D2] hover:text-[#52A72B] font-extrabold text-[11px] transition-colors flex items-center gap-1 uppercase tracking-wider whitespace-nowrap cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              Acceso B2B Consular
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/85">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            
            {/* Logo and Slogan */}
            <div className="flex flex-row items-center gap-4 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Logo className="h-16 shrink-0" classNameImg="mix-blend-multiply" />
              <div className="hidden sm:flex flex-col justify-center gap-2 h-14 pl-4 border-l-2 border-slate-200 whitespace-nowrap">
                <p className="text-[10px] sm:text-[11px] font-black uppercase text-[#1F82D2] tracking-widest leading-none">
                  DISEÑANDO VIAJES
                </p>
                <p className="text-[10px] sm:text-[11px] font-black uppercase text-[#52A72B] tracking-widest leading-none">
                  RESPALDANDO AGENCIAS
                </p>
              </div>
            </div>

            {/* Public Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap mx-4">
              <a href="#nosotros" className="text-xs xl:text-xs font-black uppercase tracking-widest text-[#0A0F1D]/70 hover:text-[#0A0F1D] transition-colors whitespace-nowrap">QUIÉNES SOMOS</a>
              <a href="#ofertas" className="text-xs xl:text-xs font-black uppercase tracking-widest text-[#0A0F1D]/70 hover:text-[#0A0F1D] transition-colors whitespace-nowrap">VIAJES DESTACADOS</a>
              <a href="#alta-agencia" className="text-xs xl:text-xs font-black uppercase tracking-widest text-[#1F82D2] hover:text-[#0A0F1D] transition-colors whitespace-nowrap">REGISTRO OFICIAL B2B</a>
            </nav>

            {/* Accentuated CTA to Login */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-black text-xs uppercase tracking-widest py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2 shrink-0 border-0 whitespace-nowrap cursor-pointer hover:shadow-lg"
            >
              <Lock className="w-3.5 h-3.5 shrink-0" />
              Consola de Agencias
            </button>

          </div>
        </div>
      </header>

      {/* PROFESSIONAL HERO SLIDER & B2B FINDER */}
      <section className="relative bg-[#0B0F19] text-white overflow-hidden min-h-[85vh] flex flex-col justify-between">
        {/* Decorative Grid Map Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

        {/* Slider Images Layer */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, sIdx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeHeroSlide === sIdx ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={assetUrl(slide.image)}
                alt={slide.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Premium cinematic left-to-right vignette: guarantees perfect white/green text contrast while keeping the right side fully vibrant */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#070b12]/95 via-[#070b12]/60 to-transparent lg:from-[#070b12]/90 lg:via-[#070b12]/40 lg:to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Slider Content & Interface */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-20 flex-grow flex flex-col justify-center items-start text-left">
          <div className="max-w-3xl space-y-6 sm:space-y-8 animate-fade-in">
            
            {/* Dynamic Category Badge with modern breathing pulse but no green background frame */}
            <div className="inline-flex items-center gap-3 text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#76ca2a] opacity-90 scale-[1.9] duration-1000"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#76ca2a] shadow-[0_0_12px_rgba(118,202,42,0.8)]"></span>
              </span>
              <span>{heroSlides[activeHeroSlide].category}</span>
            </div>

            {/* Magnificent Modern Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5.5xl lg:text-7.5xl font-extrabold font-sans tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                {heroSlides[activeHeroSlide].title}
              </h1>
              
              {heroSlides[activeHeroSlide].subtitle ? (
                <p className="text-[#1F82D2] text-sm sm:text-lg font-black uppercase tracking-widest leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {heroSlides[activeHeroSlide].subtitle}
                </p>
              ) : null}

              <p className="text-slate-200 text-xs sm:text-sm lg:text-base max-w-xl font-semibold tracking-wide leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                {heroSlides[activeHeroSlide].desc}
              </p>

              {/* Dynamic Highlights Checklist */}
              {heroSlides[activeHeroSlide].highlights ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-6 pb-2 border-t border-white/10 max-w-2xl animate-fade-in">
                  {heroSlides[activeHeroSlide].highlights.map((hl, hlIdx) => (
                    <div key={hlIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#76ca2a] mt-0.5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
                      <span className="text-slate-100 text-[11px] sm:text-xs font-bold tracking-wide leading-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Action Buttons & Luxury Pricing tag */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={`#${heroSlides[activeHeroSlide].targetId}`}
                onClick={() => {
                  if (activeHeroSlide === 0) {
                    const cEl = document.getElementById("alta-agencia");
                    if (cEl) cEl.scrollIntoView({ behavior: "smooth" });
                  } else if (activeHeroSlide === 1) {
                    setFinderDest("egipto");
                    setFinderType("charter");
                  } else if (activeHeroSlide === 2) {
                    setFinderDest("turquia");
                  } else if (activeHeroSlide === 3) {
                    setFinderDest("egipto");
                    setFinderType("senior");
                  }
                }}
                className="bg-gradient-to-r from-[#1F82D2] to-[#76ca2a] hover:brightness-110 text-white font-extrabold text-[12px] uppercase tracking-widest py-4 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer border-0 flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                MÁS INFO [+]
              </a>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 py-3.5 px-6 rounded-full flex items-center gap-2 shadow-inner">
                <Sparkles className="w-4 h-4 text-[#76ca2a] animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-white text-xs sm:text-sm font-black uppercase tracking-wider">
                  {activeHeroSlide === 0 ? "DESDE 1.150€" : activeHeroSlide === 1 ? "DESDE 1.250€" : activeHeroSlide === 2 ? "DESDE 895€" : "OFERTAS SENIOR 55+"}
                </span>
              </div>
            </div>

          </div>

          {/* Slider Dots & Arrow Navigation */}
          <div className="flex items-center gap-3 pt-12">
            <button 
              onClick={() => setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="p-2 rounded-full border border-white/20 hover:border-[#1F82D2] text-white hover:text-[#1F82D2] transition-colors cursor-pointer bg-white/5 backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {heroSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveHeroSlide(dotIdx)}
                  className={`h-2 transition-all rounded-full ${
                    activeHeroSlide === dotIdx ? "w-8 bg-[#1F82D2]" : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                ></button>
              ))}
            </div>
            <button 
              onClick={() => setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length)}
              className="p-2 rounded-full border border-white/20 hover:border-[#1F82D2] text-white hover:text-[#1F82D2] transition-colors cursor-pointer bg-white/5 backdrop-blur-md"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* B2B QUICK ACTION DASHBOARD */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-12 relative z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Action 1 */}
            <div 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-white hover:bg-slate-50 border-t-2 border-t-[#1F82D2] border-x border-b border-slate-200/80 p-6 rounded-lg transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between min-h-[180px] shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-[#1F82D2]/5 rounded text-[#1F82D2] group-hover:bg-[#1F82D2] group-hover:text-white transition-all duration-300">
                    <Lock className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1F82D2] group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wider font-sans text-[#0A0F1D] group-hover:text-[#1F82D2] transition-colors">Sistema de Reservas B2B</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Acceso directo de consolidación para bloquear plazas, cotizar y emitir confirmaciones en tiempo real.
                </p>
              </div>
              <span className="text-[9px] font-black uppercase text-[#1F82D2] tracking-widest pt-4 block border-t border-slate-100 group-hover:text-[#52A72B] transition-colors">Acceso Seguro &rarr;</span>
            </div>

            {/* Action 2 */}
            <a 
              href="#ofertas"
              className="bg-white hover:bg-slate-50 border-t-2 border-t-[#52A72B] border-x border-b border-slate-200/80 p-6 rounded-lg transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between min-h-[180px] shadow-sm hover:shadow-md hover:-translate-y-0.5 no-underline"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-[#52A72B]/5 rounded text-[#52A72B] group-hover:bg-[#52A72B] group-hover:text-white transition-all duration-300">
                    <Download className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#52A72B] group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wider font-sans text-[#0A0F1D] group-hover:text-[#52A72B] transition-colors">Catálogos PDF 2026/27</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Descargue folletos oficiales listos para imprimir o compartir con sus clientes minoristas.
                </p>
              </div>
              <span className="text-[9px] font-black uppercase text-[#52A72B] tracking-widest pt-4 block border-t border-slate-100 group-hover:text-[#1F82D2] transition-colors">Biblioteca Digital &rarr;</span>
            </a>

            {/* Action 3 */}
            <a 
              href="#alta-agencia"
              className="bg-white hover:bg-slate-50 border-t-2 border-t-[#1F82D2] border-x border-b border-slate-200/80 p-6 rounded-lg transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between min-h-[180px] shadow-sm hover:shadow-md hover:-translate-y-0.5 no-underline"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-[#1F82D2]/5 rounded text-[#1F82D2] group-hover:bg-[#1F82D2] group-hover:text-white transition-all duration-300">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1F82D2] group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wider font-sans text-[#0A0F1D] group-hover:text-[#1F82D2] transition-colors">Acreditación Minorista</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Regístrese legalmente con su licencia CICMA o equivalente para comercializar nuestra programación exclusiva.
                </p>
              </div>
              <span className="text-[9px] font-black uppercase text-[#1F82D2] tracking-widest pt-4 block border-t border-slate-100 group-hover:text-[#52A72B] transition-colors">Registrarse Ahora &rarr;</span>
            </a>

            {/* Action 4 */}
            <div 
              onClick={() => window.open("https://wa.me/34690125031", "_blank")}
              className="bg-white hover:bg-slate-50 border-t-2 border-t-emerald-500 border-x border-b border-slate-200/80 p-6 rounded-lg transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between min-h-[180px] shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-wider font-sans text-[#0A0F1D] group-hover:text-[#1F82D2] transition-colors">Teléfono Guardia 24/7</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Canal de emergencia y soporte de urgencia operativa activo las 24 horas antes, durante y después del viaje.
                </p>
              </div>
              <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest pt-4 block border-t border-slate-100 group-hover:text-[#1F82D2] transition-colors">WhatsApp Activo &rarr;</span>
            </div>

          </div>
        </div>
      </section>

      {/* THE WHOLESALER'S PROMISE */}
      <section className="py-24 bg-white border-b border-slate-200/80 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <span className="text-xs font-black bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent uppercase tracking-[0.25em] block">SOPORTE Y SOLVENCIA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0F1D] font-sans uppercase tracking-tight">El Rigor de un Gran Mayorista</h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Trabajamos exclusivamente para la agencia de viajes minorista. Conozca las ventajas logísticas que diferencian los programas oficiales de Dynamic Tours S.A.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="flex gap-4 items-start text-left p-2">
              <div className="w-11 h-11 rounded-lg bg-[#0A0F1D]/5 flex items-center justify-center text-[#0A0F1D] shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">Especialistas por Destino</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Nuestros departamentos están integrados por egiptólogos y expertos calificados por destino. Brindamos asesoramiento técnico riguroso y cotizaciones a medida inmediatas para viajes de grupo e individuales.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 items-start text-left p-2">
              <div className="w-11 h-11 rounded-lg bg-[#52A72B]/5 flex items-center justify-center text-[#52A72B] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">Seguro de Viaje Incluido</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Toda nuestra programación base incluye un seguro de asistencia médica multiviaje, garantizando coberturas sólidas ante imprevistos de salud o cancelaciones para la tranquilidad de sus clientes.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 items-start text-left p-2">
              <div className="w-11 h-11 rounded-lg bg-[#1F82D2]/5 flex items-center justify-center text-[#1F82D2] shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">Cupos Especiales Chárter</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Operamos vuelos chárter especiales directos desde múltiples aeropuertos de provincias españolas durante todo el año, asegurando disponibilidad incluso en temporadas de máxima demanda vacacional.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4 items-start text-left p-2">
              <div className="w-11 h-11 rounded-lg bg-[#52A72B]/5 flex items-center justify-center text-[#52A72B] shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">Fidelidad 100% B2B</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Mantenemos un blindaje absoluto del canal mayorista. No atendemos bajo ninguna circunstancia a clientes finales de forma directa. Protegemos rigurosamente su comisión y su relación con el viajero.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* OFERTAS DESTACADAS Section */}
      <section id="ofertas" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        {/* Background Decorative Accent in Green and Blue */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1F82D2]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#52A72B]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-3 text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0F1D] font-sans tracking-tight uppercase leading-none">
                OFERTAS <span className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent">DESTACADAS DYNAMIC</span>
              </h2>
              <p className="text-slate-500 text-sm max-w-xl">
                Programas oficiales diseñados exclusivamente con cupos aéreos propios, tarifas comisionables preferentes y el respaldo técnico de nuestro equipo mayorista.
              </p>
            </div>
          </div>

          {/* Listado de Ofertas - Ficha Técnica Horizontal */}
          <div className="flex flex-col gap-6">
            {[
              {
                title: "Maravillas Del Nilo",
                duration: "8 días, 7 noches",
                price: "909€",
                image: assetUrl("/joyas nilo 2.png"),
                description: "4N Crucero por el Nilo en PC + 3N El Cairo en AD + Vuelos internacionales y domésticos + Traslados + Visitas + Seguro + Tasas",
                badges: [
                  { label: "CUPOS CONFIRMADOS", color: "green" },
                  { label: "VUELO A LUXOR", color: "blue" }
                ],
                highlight: "Especial Chárter Directo con Visitas Guiadas de Firma",
                isMaravillas: true
              },
              {
                title: "Leyendas de Egipto Sin Abu Simbel - Salida Viernes",
                duration: "8 días, 7 noches",
                price: "749€",
                image: assetUrl("/dia_5_guiza.jpg"),
                description: "3N Crucero por el Nilo en PC + 4N El Cairo en AD + Vuelos internacionales y domésticos + Traslados + Visitas + Seguro + Tasas - NO INCLUYE ABU SIMBEL",
                badges: [
                  { label: "OFERTA EXCLUSIVA", color: "green" },
                  { label: "VUELO A ASWAN", color: "blue" }
                ],
                highlight: "Programa líder en precio con cupos garantizados",
                isLeyendas: true
              },
              {
                title: "Joyas del Nilo - Charter Provincias",
                duration: "8 días, 7 noches",
                price: "1.250€",
                image: assetUrl("/dynamic_egipto_abu_simbel.png"),
                description: "3N El Cairo en AD + 3N Crucero Nilo en PC + 1N Luxor en PC + Vuelos internacionales, domésticos + ABU SIMBEL en avión + Traslados + Visitas + Seguro",
                badges: [
                  { label: "ÚLTIMAS PLAZAS", color: "green" },
                  { label: "ABU SIMBEL EN AVIÓN", color: "blue" }
                ],
                highlight: "Inclusión de Abu Simbel en avión con visitas guiadas",
                isJoyas: true
              },
              {
                title: "Sueños de Estambul y Capadocia",
                duration: "8 días, 7 noches",
                price: "1.169€",
                image: assetUrl("/globo_luxor.jpg"),
                description: "4N Estambul en AD + 3N Capadocia en PC + 1 Vuelo doméstico + Vuelos + Visitas + Traslados + Tasas + Seguro",
                badges: [
                  { label: "ALTA DEMANDA", color: "green" },
                  { label: "HOTELES SELECCIONADOS", color: "blue" }
                ],
                highlight: "Estancia singular en hotel de cueva en Capadocia",
                isSueños: true
              },
              {
                title: "Ruta Turca completa confort",
                duration: "8 días, 7 noches",
                price: "1.395€",
                image: assetUrl("/turquía dynamic.png"),
                description: "4N Estambul en AD + 2N Capadocia en PC + 1N Pamukkale en PC + 1 Vuelo doméstico +Visitas + Traslados + Tasas + Seguro",
                badges: [
                  { label: "CALIDAD CONFORT", color: "green" },
                  { label: "CONEXIONES DE LUJO", color: "blue" }
                ],
                highlight: "Circuito completo de confort por Estambul y Anatolia",
                isRutaTurca: true
              },
              {
                title: "Egipto Azul Isis + Hurghada",
                duration: "11 días, 10 noches",
                price: "1.400€",
                image: assetUrl("/hurghada beach.jpg"),
                description: "1N Aswan en AD + 3N Crucero por el Nilo en PC + 3N Hurghada en TI + 3N El Cairo en AD + Vuelos internacionales y domésticos + Traslados + Visitas",
                badges: [
                  { label: "COMBINADO PREMIUM", color: "green" },
                  { label: "TODO INCLUIDO RESORT", color: "blue" }
                ],
                highlight: "Estancia frente al Mar Rojo en resorts de 5 estrellas",
                isEgiptoAzul: true
              }
            ].map((item, idx) => {
              const CardContent = (
                <div className="relative w-full flex flex-col md:flex-row md:h-48 bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_15px_45px_rgba(31,130,210,0.08)] hover:-translate-y-0.5 transition-all duration-300 group text-left">
                  {/* Left accent bar */}
                  <div className="w-full md:w-1.5 h-1.5 md:h-auto bg-gradient-to-b from-[#1F82D2] to-[#52A72B] shrink-0"></div>

                  {/* Left Column: Image Container */}
                  <div className="w-full md:w-56 xl:w-60 shrink-0 h-40 md:h-full overflow-hidden relative">
                    <img 
                      src={assetUrl(item.image)} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        if (item.image.includes("hurghada") || item.image.includes("beach")) {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80";
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
                  </div>

                  {/* Middle Column: Detailed Tech Specs */}
                  <div className="flex-1 p-4 md:p-5 flex flex-col justify-center gap-2.5 min-w-0">
                    <div className="space-y-1.5 min-w-0">
                      {/* Premium Metadata Row (Duration & Real Badges) */}
                      <div className="flex flex-wrap items-center gap-2 pb-1">
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm border border-slate-200">
                          <Clock className="w-3 h-3 text-[#52A72B]" />
                          {item.duration}
                        </span>
                        {item.badges.map((b, bIdx) => (
                          <span 
                            key={bIdx}
                            className={`inline-flex items-center text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                              b.color === "green" 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200/50" 
                                : "bg-sky-50 text-sky-700 border-sky-200/50"
                            }`}
                          >
                            {b.label}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-[#0A0F1D] font-sans group-hover:text-[#1F82D2] transition-colors leading-snug tracking-tight uppercase line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed font-sans font-medium line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: B2B rates & actions */}
                  <div className="w-full md:w-48 xl:w-56 shrink-0 bg-slate-50/50 p-4 md:p-5 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-between items-center text-center gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[8px] uppercase tracking-widest text-slate-400 font-extrabold block">tarifa neto b2b desde</span>
                      <span className="text-2xl font-black bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent block">{item.price}</span>
                      <span className="text-[8px] text-emerald-600 font-black uppercase tracking-wider block">cupos confirmados</span>
                    </div>

                    <button className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white text-[10px] font-black py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow uppercase tracking-wider cursor-pointer border-0">
                      <span>Ver Detalles</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );

              if (item.isLeyendas && onSelectLeyendas) {
                return (
                  <div key={idx} onClick={onSelectLeyendas} className="cursor-pointer">
                    {CardContent}
                  </div>
                );
              }

              if (item.isMaravillas && onSelectMaravillas) {
                return (
                  <div key={idx} onClick={onSelectMaravillas} className="cursor-pointer">
                    {CardContent}
                  </div>
                );
              }

              return (
                <div 
                  key={idx} 
                  className="cursor-pointer"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  {CardContent}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Nosotros y Delegaciones */}
      <section id="nosotros" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-black bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent uppercase tracking-widest block">NUESTRA CARTA DE GARANTÍA</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0A0F1D] font-sans tracking-tight">Compromiso Exclusivo con el Canal Profesional</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Fundada en Madrid, <strong className="text-[#0A0F1D]">Dynamic Tours S.A.</strong> es una de las instituciones mayoristas de referencia en la península ibérica para destinos de Oriente Medio y grandes viajes de larga distancia. Nuestra filosofía operativa se asienta sobre la excelencia absoluta del servicio terrestre privado en destino, una política inquebrantable de fidelidad al canal minorista y una constante inversión tecnológica para dotar de herramientas avanzadas a las agencias colaboradoras.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Cada programa que lleva nuestra firma cuenta con el respaldo legal exigido por el Ministerio de Turismo, un robusto seguro multiasistencia médico líder, canales de comunicación directa de urgencia 24/7/365 en español y guías nativos titulados en arqueología e historia.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 shadow-sm text-left">
              <h5 className="text-xs font-black text-[#0A0F1D] uppercase tracking-widest border-b border-slate-200 pb-2.5 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#1F82D2] inline-block"></span>
                Delegación Central España
              </h5>
              <div className="space-y-3 text-xs font-semibold text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                  <span>Avda. Menéndez Pelayo, 83, 28007 - Madrid, España</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#1F82D2] shrink-0" />
                  <span className="text-[#0A0F1D] font-bold">+34 915 521 443</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#1F82D2] shrink-0" />
                  <span>reservas@dynamic-tours.com</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 shadow-sm text-left">
              <h5 className="text-xs font-black text-[#0A0F1D] uppercase tracking-widest border-b border-slate-200 pb-2.5 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#0A0F1D] inline-block"></span>
                Delegación Oficial Portugal
              </h5>
              <div className="space-y-3 text-xs font-semibold text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                  <span>Rua de Cinco de Outubro, 185, 4100-175 Porto, Portugal</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#1F82D2] shrink-0" />
                  <span className="text-[#0A0F1D] font-bold">+351 912 757 377</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#1F82D2] shrink-0" />
                  <span>reservas@dynamic-tours.pt</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Agency Registration Form (Alta de Agencia) */}
      <section id="alta-agencia" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-black bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent uppercase tracking-widest block">REGISTRO DE AGENCIA COLABORADORA</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1D] font-sans uppercase tracking-tight">Solicitud de Registro de Agencia B2B</h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Si dispone de una agencia de viajes minorista legalmente constituida y desea tramitar expedientes, cotizaciones, o formalizar reservas aéreas y terrestres directas, inicie su registro de acreditación.
            </p>
          </div>

          <div className="bg-white rounded-md p-8 sm:p-10 border border-slate-200 shadow-sm text-left">
            <form onSubmit={handleInquiry} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">Nombre de la Agencia</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Viajes Internacionales S.A."
                  value={inquiryAgency}
                  onChange={(e) => setInquiryAgency(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm py-3 px-3.5 bg-white focus:outline-none focus:border-[#0A0F1D] font-medium text-slate-800"
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">Nombre del Agente de Contacto</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Laura Gómez"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm py-3 px-3.5 bg-white focus:outline-none focus:border-[#0A0F1D] font-medium text-slate-800"
                />
              </div>

              <div className="space-y-1.5 text-xs sm:col-span-2">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">Correo Electrónico Corporativo (B2B)</label>
                <input 
                  type="email" 
                  required
                  placeholder="Ej: laura@viajesinternacionales.com"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm py-3 px-3.5 bg-white focus:outline-none focus:border-[#0A0F1D] font-medium text-slate-800"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-black text-xs uppercase tracking-widest py-4 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 border-0 hover:shadow-lg cursor-pointer"
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
              <li><a href="#" className="hover:underline hover:text-[#0A0F1D] transition-colors">Condiciones Generales de Contratación</a></li>
              <li><a href="#" className="hover:underline hover:text-[#0A0F1D] transition-colors">Política de Privacidad de Datos</a></li>
              <li><a href="#" className="hover:underline hover:text-[#0A0F1D] transition-colors">Aviso Legal y Uso del Portal</a></li>
              <li><a href="#" className="hover:underline hover:text-[#0A0F1D] transition-colors">Política de Cookies</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 mt-8 pt-6 text-center text-[10px] text-slate-500">
          <p>© 2026 Dynamic Tours S.A. Todos los derechos reservados. Licencia CICMA 1948.</p>
        </div>
      </footer>

      {/* Modern B2B Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B0F19]/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-md w-full max-w-md border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-[#0A0F1D]/10 rounded-sm flex items-center justify-center text-[#0A0F1D]">
                <Lock className="w-6 h-6 text-[#1F82D2]" />
              </div>
              <h3 className="text-xl font-bold font-serif uppercase tracking-tight text-[#0A0F1D]">
                Acceso Profesional B2B
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Área consular reservada para la cotización y expedición de grandes viajes de firma de Dynamic Tours.
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
                <label className="font-bold text-slate-700 uppercase tracking-wider block">Nombre del Agente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Laura Gómez"
                  value={loginAgent}
                  onChange={(e) => setLoginAgent(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm py-2.5 px-3 focus:outline-none focus:border-[#0A0F1D] font-medium text-slate-800"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">Nombre de la Agencia</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Viajes Internacionales S.A."
                  value={loginAgency}
                  onChange={(e) => setLoginAgency(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm py-2.5 px-3 focus:outline-none focus:border-[#0A0F1D] font-medium text-slate-800"
                />
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-700 uppercase tracking-wider">Licencia CICMA / Clave B2B</label>
                  <span className="text-[10px] text-slate-400 font-bold">Opcional en Demo</span>
                </div>
                <input
                  type="text"
                  placeholder="Ej: CICMA 1948"
                  value={loginCicma}
                  onChange={(e) => setLoginCicma(e.target.value)}
                  className="w-full border border-slate-200 rounded-sm py-2.5 px-3 focus:outline-none focus:border-[#0A0F1D] font-medium text-slate-800"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-[#0A0F1D] hover:bg-[#1F82D2] text-white hover:text-[#0A0F1D] font-black text-xs uppercase tracking-widest py-3.5 rounded-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Acceso Seguro Consular B2B
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onEnterB2B("Agente de Demostración", "Viajes Exclusivos B2B");
                    setIsLoginModalOpen(false);
                  }}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs py-3 rounded-sm transition-all border border-slate-200 flex items-center justify-center gap-1 cursor-pointer"
                >
                  Continuar como Invitado B2B
                </button>

                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="w-full text-center text-slate-400 hover:text-slate-600 text-xs font-bold py-2 transition-all block cursor-pointer"
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
