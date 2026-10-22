import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import B2BLoginModal from "./B2BLoginModal";
import { assetUrl } from "../utils/assets";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Plane, 
  Sparkles, 
  Calendar, 
  Info,
  ChevronDown,
  ChevronUp,
  FileText,
  User,
  Heart,
  Share2,
  AlertTriangle,
  Printer,
  Download,
  Trash2,
  Edit3,
  Save,
  Eye,
  EyeOff,
  ShieldCheck,
  TrendingUp,
  Percent,
  DollarSign,
  Upload,
  X,
  Building2,
  Phone,
  Mail,
  Lock,
  Check,
  RotateCcw,
  Send,
  Sliders,
  ExternalLink,
  Users
} from "lucide-react";
import { Booking } from "../types";

interface EgiptoSeniorDetailProps {
  onBack: () => void;
  onEnterB2B?: () => void;
  agencyName?: string;
  agentName?: string;
  onAddBooking?: (booking: Omit<Booking, "id" | "createdAt">) => void;
}

interface SavedQuote {
  id: string;
  title: string;
  date: string;
  clientName: string;
  adults: number;
  kids: number;
  departureDay: "lunes" | "viernes";
  departureDate: string;
  departureAirport: string;
  hotelCategory: "standard" | "lujo";
  excursions: string[];
  commissionRate: number;
  markupPercent: number;
  agencyFee: number;
  totalBase: number;
  totalNet: number;
  totalRetail: number;
  agentProfit: number;
  agencyName: string;
  agentName: string;
}

export default function EgiptoSeniorDetail({ 
  onBack, 
  onEnterB2B, 
  agencyName: propAgencyName, 
  agentName: propAgentName, 
  onAddBooking 
}: EgiptoSeniorDetailProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // Navigation tabs with hash support
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "visits" | "hotels" | "flights" | "quote">(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes("incluye") || hash.includes("inclusions")) return "inclusions";
    if (hash.includes("visitas") || hash.includes("visits")) return "visits";
    if (hash.includes("hoteles") || hash.includes("hotels")) return "hotels";
    if (hash.includes("vuelos") || hash.includes("flights")) return "flights";
    if (hash.includes("cotizacion") || hash.includes("cotizar") || hash.includes("quote")) return "quote";
    return "itinerary";
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("incluye") || hash.includes("inclusions")) setActiveTab("inclusions");
      else if (hash.includes("visitas") || hash.includes("visits")) setActiveTab("visits");
      else if (hash.includes("hoteles") || hash.includes("hotels")) setActiveTab("hotels");
      else if (hash.includes("vuelos") || hash.includes("flights")) setActiveTab("flights");
      else if (hash.includes("cotizacion") || hash.includes("cotizar") || hash.includes("quote")) setActiveTab("quote");
      else if (hash.includes("itinerario") || hash.includes("itinerary")) setActiveTab("itinerary");
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const [departureDay, setDepartureDay] = useState<"lunes" | "viernes">("lunes");
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);

  const toggleDay = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  };

  const expandAllDays = () => {
    setExpandedDays([1, 2, 3, 4, 5, 6, 7, 8]);
  };

  const collapseAllDays = () => {
    setExpandedDays([]);
  };
  
  // Excursions selection
  const [selectedExcursions, setSelectedExcursions] = useState<string[]>([]);
  const [calcAdults, setCalcAdults] = useState<number>(2);
  const [calcKids, setCalcKids] = useState<number>(0);
  const [selectedHotelCategory, setSelectedHotelCategory] = useState<"standard" | "lujo">("standard");
  const [viewingExcursionId, setViewingExcursionId] = useState<string | null>(null);

  // B2B Quote controls
  const [counterMode, setCounterMode] = useState<boolean>(false); // false = Modo Agente B2B, true = Modo Mostrador (Cara al cliente)
  const [commissionRate, setCommissionRate] = useState<number>(12); // Comisión pactada mayorista (10%, 12%, 15%)
  const [markupPercent, setMarkupPercent] = useState<number>(5); // Margen comercial añadido sobre PVP (0% a 20%)
  const [agencyFee, setAgencyFee] = useState<number>(30); // Gastos de gestión de la agencia (EUR)
  
  // Client & Agency data
  const [clientName, setClientName] = useState<string>("Viajeros Titulares (+55)");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("Lunes, 26 de Octubre de 2026");
  const [departureAirport, setDepartureAirport] = useState<string>("Madrid (MAD) - Vuelo directo");

  // Agency branding & profile
  const [b2bAgencyName, setB2bAgencyName] = useState<string>(() => {
    return propAgencyName || localStorage.getItem("dt_agency_name") || "Viajes y Experiencias B2B";
  });
  const [b2bAgentName, setB2bAgentName] = useState<string>(() => {
    return propAgentName || localStorage.getItem("dt_agent_name") || "Asesor Especialista";
  });
  const [agencyLic, setAgencyLic] = useState<string>(() => {
    return localStorage.getItem("dt_agency_lic") || "CICMA 2849 / CV-1948";
  });
  const [agencyPhone, setAgencyPhone] = useState<string>(() => {
    return localStorage.getItem("dt_agency_phone") || "+34 91 542 2211";
  });
  const [agencyEmail, setAgencyEmail] = useState<string>(() => {
    return localStorage.getItem("dt_agency_email") || "reservas@agencia-asociada.com";
  });
  const [agencyLogo, setAgencyLogo] = useState<string | null>(() => {
    return localStorage.getItem("dt_agency_logo") || null;
  });

  // Modals & Drawers
  const [showClientProposalModal, setShowClientProposalModal] = useState<boolean>(false);
  const [showSavedQuotesModal, setShowSavedQuotesModal] = useState<boolean>(false);
  const [showAgencySettingsModal, setShowAgencySettingsModal] = useState<boolean>(false);
  const [showBookingRequestModal, setShowBookingRequestModal] = useState<boolean>(false);
  const [lastBookingRef, setLastBookingRef] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Saved quotes repository in localStorage
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>(() => {
    try {
      const stored = localStorage.getItem("dt_saved_quotes_egipto_senior");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("dt_saved_quotes_egipto_senior", JSON.stringify(savedQuotes));
  }, [savedQuotes]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Pricing configuration for Egipto Selecto Senior
  const basePriceStandard = 1285; // PVP base estándar por adulto con tasas incluidas
  const basePriceLujo = 1590; // PVP base lujo por adulto con tasas incluidas
  const currentBasePvp = selectedHotelCategory === "standard" ? basePriceStandard : basePriceLujo;

  // Precios para menores (acompañantes)
  const childPrice = selectedHotelCategory === "standard" ? 980 : 1190;

  // Catálogo de excursiones opcionales
  const optionalExcursions = [
    {
      id: "globo-luxor",
      title: "Paseo en Globo Aerostático al Amanecer en Luxor",
      price: 135,
      timing: "Día 2 · Al amanecer sobre el Valle de los Reyes",
      image: "globo_luxor.jpg",
      highlight: "Vistas panorámicas inolvidables a 500m de altura",
      detailedDesc: "Traslado de madrugada y travesía en lancha hasta la orilla occidental del Nilo. Vuelo en globo aerostático al amanecer sobrevolando los templos de Hatshepsut, Medinet Habu, los Colosos de Memnón y las fértiles riberas del Nilo mientras el sol ilumina el desierto tebano. Incluye certificado de vuelo, té/café y traslados."
    },
    {
      id: "poblado-nubio",
      title: "Poblado Nubio en Lancha Rápida con Baño en Playa de Arena Fina",
      price: 65,
      timing: "Día 4 · Asuán (Tarde)",
      image: "egipto_feluca.png",
      highlight: "Cultura viva nubia, casas tradicionales y camellos",
      detailedDesc: "Navegación en lancha motora por la primera catarata del Nilo y la Reserva Natural de Saluga y Ghazal. Parada en una playa de arena dorada para bañarse en las aguas más limpias del Nilo. Llegada a Gharb Soheil, un auténtico pueblo nubio, visita a una vivienda tradicional con té de hibisco (karkadé) y contacto con sus gentes y cocodrilos sagrados."
    },
    {
      id: "alejandria-dia",
      title: "Excursión Día Completo a Alejandría con Almuerzo Mediterráneo",
      price: 130,
      timing: "Día 7 · Desde El Cairo",
      image: "alejandria.jpg",
      highlight: "La joya del Mediterráneo, Catacumbas de Kom el Shoqafa y Nueva Biblioteca",
      detailedDesc: "Salida por la autopista del desierto hacia Alejandría, la perla del Mediterráneo fundada por Alejandro Magno. Visita a las Catacumbas romanas de Kom el Shoqafa, el Pilar de Pompeyo, la imponente Ciudadela de Qaitbay sobre el antiguo Faro de Alejandría y la moderna Biblioteca de Alejandría. Almuerzo incluido de pescado fresco en un restaurante panorámico frente al mar."
    }
  ];

  // Itinerarios según día de salida
  const itineraryLunes = [
    {
      day: 1,
      title: "España · Luxor (Llegada, Visado Asistido y Embarque en Motonave 5★)",
      meals: "Cena a bordo (cena fría si el vuelo llega después de las 21:00)",
      hotel: "Motonave 5★ Gran Lujo (Camarote exterior)",
      image: "joyas nilo 2.png",
      desc: "Presentación en el aeropuerto 3 horas antes de la salida en vuelo chárter o de línea regular con destino Luxor. Llegada y bienvenida por nuestro coordinador. Asistencia en los trámites de visado (incluido) y traslado en autobús climatizado hacia la motonave fluvial. Distribución de camarotes, cena y primera noche a bordo en Luxor."
    },
    {
      day: 2,
      title: "Luxor · Templos de Karnak y Luxor · Necrópolis Tebana · Esna · Edfú",
      meals: "Pensión Completa (Desayuno, Almuerzo y Cena a bordo)",
      hotel: "Motonave 5★ Gran Lujo",
      image: "senior dynamic ok.png",
      desc: "Pensión completa. Al amanecer, opción de realizar el Paseo en Globo Aerostático sobre el valle tebano. Visita a la impresionante orilla oriental: los Templos de Karnak (el mayor recinto religioso del mundo antiguo) y el Templo de Luxor. Cruce a la orilla occidental para admirar el Valle de los Reyes, el majestuoso Templo funerario de Hatshepsut y los Colosos de Memnón. Regreso al barco para el almuerzo y navegación plácida hacia la esclusa de Esna. Cruce de esclusa y continuación hacia Edfú. Cena y noche a bordo."
    },
    {
      day: 3,
      title: "Edfú · Templo de Horus · Navegación · Templo Dual de Kom Ombo · Asuán",
      meals: "Pensión Completa (Desayuno, Almuerzo y Cena a bordo)",
      hotel: "Motonave 5★ Gran Lujo",
      image: "egipto_senior_clean.jpg",
      desc: "Pensión completa. Por la mañana, traslado en calesa tradicional para visitar el Templo de Horus en Edfú, el templo ptolemaico mejor conservado de Egipto. Regreso a bordo y navegación panorámica mientras se sirve el almuerzo con vistas a los palmerales y riberas del Nilo. Por la tarde, llegada y visita al singular Templo de Kom Ombo, consagrado a dos divinidades: Sobek (el dios cocodrilo) y Haroeris (el halcón solar), con su fascinante museo de momias de cocodrilo. Navegación hacia Asuán. Cena y noche a bordo."
    },
    {
      day: 4,
      title: "Asuán · Excursión a los Templos de Abu Simbel (Incluida) · Templo de Philae y Faluca",
      meals: "Pensión Completa (Desayuno, Almuerzo y Cena a bordo)",
      hotel: "Motonave 5★ Gran Lujo",
      image: "dynamic_egipto_abu_simbel.png",
      desc: "Pensión completa. Salida en convoy de madrugada en autobús climatizado hacia Abu Simbel (aprox. 3 horas de trayecto cómodo por carretera). Llegada al amanecer para maravillarse ante los colosales Templos de Ramsés II y Nefertari excavados en la roca del lago Nasser, salvados por la UNESCO. Tiempo libre para recorrer su interior y fotografiar las cuatro estatuas gigantes. Regreso a Asuán para el almuerzo. Por la tarde, visita en lancha motora al bellísimo Templo de Philae, consagrado a la diosa Isis en su isla sagrada, y apacible paseo en faluca tradicional de vela por el Nilo. Opcional: visita al Poblado Nubio en lancha. Cena y noche a bordo en Asuán."
    },
    {
      day: 5,
      title: "Asuán · Vuelo a El Cairo · Tarde Libre y Alojamiento en Hotel 5★",
      meals: "Pensión Completa (Desayuno en motonave, Almuerzo y Cena incluidos)",
      hotel: "Hotel 5★ El Cairo (Pensión Completa)",
      image: "oficinas_dynamic_b2b.png",
      desc: "Desayuno a bordo y desembarque. Tiempo libre según horario del vuelo para pasear por Asuán o compras de especias y esencias. Traslado al aeropuerto de Asuán y vuelo doméstico hacia El Cairo. Recepción por nuestro equipo, traslado en autocar privado de gran confort al hotel 5★ seleccionado. Almuerzo y cena incluidos en restaurantes locales. Alojamiento en El Cairo."
    },
    {
      day: 6,
      title: "El Cairo · Pirámides de Guiza (con Entrada a Pirámide) · Esfinge · Gran Museo Egipcio (GEM) · Noche Cairota",
      meals: "Pensión Completa (Desayuno en hotel, Almuerzo en restaurante local y Cena temática Noche Cairota)",
      hotel: "Hotel 5★ El Cairo",
      image: "dia_5_guiza.jpg",
      desc: "Desayuno. Excursión completa a la meseta de Guiza para contemplar las legendarias Pirámides de Keops, Kefrén y Micerinos, incluyendo de serie la entrada al interior de la segunda o tercera pirámide para vivir la experiencia faraónica. Visita a la enigmática Gran Esfinge de Guiza y al Templo del Valle. Almuerzo en restaurante local con gastronomía egipcia de calidad. Por la tarde, visita al nuevo y majestuoso Gran Museo Egipcio (GEM), la mayor pinacoteca arqueológica del mundo dedicada a una sola civilización. Al caer la tarde, paseo nocturno guiado por las históricas calles de la zona islámica de El Cairo y cena típica en restaurante cairota («Noche Cairota»). Regreso al hotel y alojamiento."
    },
    {
      day: 7,
      title: "El Cairo · Ciudadela de Saladino · Mezquita de Alabastro · Barrio Copto · Saqqara · Bazar Khan el Khalili",
      meals: "Pensión Completa (Desayuno en hotel, Almuerzo y Cena en restaurantes locales seleccionados)",
      hotel: "Hotel 5★ El Cairo",
      image: "gem.jpeg",
      desc: "Desayuno. Día completo con visitas culturales de máximo nivel: la imponente Ciudadela de Saladino y la deslumbrante Mezquita de Alabastro de Mehmet Alí con su mirador sobre la metrópoli. Recorrido por el histórico Barrio Copto, cuna de los primeros cristianos de Egipto, visitando la Iglesia Colgante y la cripta de la Sagrada Familia en San Sergio. Almuerzo en restaurante local. Continuación hacia la Necrópolis de Saqqara para admirar la Pirámide Escalonada del faraón Zoser, la primera pirámide de piedra de la historia humana. Por la tarde, tiempo libre para compras y té con menta en el mítico Bazar de Khan el Khalili. Cena en restaurante local y alojamiento en el hotel."
    },
    {
      day: 8,
      title: "El Cairo · España (Desayuno y Vuelo de Regreso)",
      meals: "Desayuno en el hotel",
      hotel: "Fin de servicios",
      image: "nuevo logo dynamic transparente.png",
      desc: "Desayuno en el hotel. A la hora indicada por nuestro coordinador, traslado privado en autocar hacia el Aeropuerto Internacional de El Cairo. Asistencia en la facturación y embarque en el vuelo chárter o de línea regular con destino a España. Llegada y fin de una experiencia inolvidable con Dynamic Tours."
    }
  ];

  const itineraryViernes = [
    {
      day: 1,
      title: "España · Asuán (Llegada, Visado Asistido y Embarque en Motonave 5★)",
      meals: "Cena a bordo (cena fría si el vuelo llega tras las 21:00)",
      hotel: "Motonave 5★ Gran Lujo",
      image: "egipto_feluca.png",
      desc: "Presentación en el aeropuerto 3 horas antes de la salida en vuelo chárter o línea regular hacia Asuán. Llegada, bienvenida por el equipo de Dynamic Tours, gestión del visado incluido y traslado para embarcar en la motonave 5★. Cena y noche a bordo en Asuán."
    },
    {
      day: 2,
      title: "Asuán · Templos de Abu Simbel (Incluido) · Templo de Philae · Faluca · Kom Ombo",
      meals: "Pensión Completa (Desayuno, Almuerzo y Cena a bordo)",
      hotel: "Motonave 5★ Gran Lujo",
      image: "dynamic_egipto_abu_simbel.png",
      desc: "Pensión completa. Salida de madrugada en convoy hacia los majestuosos Templos de Abu Simbel. Visita completa a los santuarios de Ramsés II y Nefertari frente al Lago Nasser. Regreso a Asuán, visita al Templo de Isis en la isla de Philae y paseo en faluca tradicional de vela por el Nilo. Almuerzo a bordo e inicio de la navegación hacia Kom Ombo. Visita del templo dual de Sobek y Haroeris. Cena y noche a bordo rumbo a Edfú."
    },
    {
      day: 3,
      title: "Kom Ombo · Edfú (Templo de Horus) · Cruce Esclusa de Esna · Luxor",
      meals: "Pensión Completa (Desayuno, Almuerzo y Cena a bordo)",
      hotel: "Motonave 5★ Gran Lujo",
      image: "joyas nilo 2.png",
      desc: "Pensión completa. Por la mañana visita en calesa al Templo de Horus en Edfú. Almuerzo a bordo mientras se navega hacia la esclusa de Esna. Cruce de esclusa y continuación de la navegación hacia la legendaria ciudad de Luxor. Al atardecer, visita iluminada al Templo de Luxor en el corazón de la ciudad. Cena y noche a bordo en Luxor."
    },
    {
      day: 4,
      title: "Luxor (Karnak, Valle de los Reyes, Hatshepsut, Memnón) · Vuelo a El Cairo",
      meals: "Pensión Completa (Desayuno, Almuerzo y Cena incluidos)",
      hotel: "Hotel 5★ El Cairo",
      image: "senior dynamic ok.png",
      desc: "Pensión completa. Al amanecer, posibilidad opcional de paseo en globo aerostático. Visita al colosal Templo de Karnak, cruce del Nilo hacia la orilla occidental para recorrer el Valle de los Reyes, el Templo de la Reina Hatshepsut y los Colosos de Memnón. Almuerzo. A la hora indicada, traslado al aeropuerto de Luxor para tomar el vuelo doméstico a El Cairo. Llegada, traslado al hotel 5★, cena y alojamiento."
    },
    {
      day: 5,
      title: "El Cairo · Pirámides de Guiza (con Entrada a Pirámide) · Esfinge · GEM · Noche Cairota",
      meals: "Pensión Completa (Desayuno, Almuerzo y Cena en Noche Cairota)",
      hotel: "Hotel 5★ El Cairo",
      image: "dia_5_guiza.jpg",
      desc: "Desayuno. Excursión completa a las Pirámides de Keops, Kefrén y Micerinos con entrada incluida al interior de la 2ª o 3ª pirámide, Esfinge y Templo del Valle. Almuerzo en restaurante local. Por la tarde, visita al nuevo Gran Museo Egipcio (GEM). Al anochecer, recorrido nocturno guiado y cena típica en la Noche Cairota. Regreso al hotel y alojamiento."
    },
    {
      day: 6,
      title: "El Cairo · Ciudadela · Mezquita de Alabastro · Barrio Copto · Saqqara · Khan el Khalili",
      meals: "Pensión Completa (Desayuno, Almuerzo y Cena en restaurantes locales)",
      hotel: "Hotel 5★ El Cairo",
      image: "gem.jpeg",
      desc: "Desayuno. Visita a la Ciudadela de Saladino, Mezquita de Alabastro, el histórico Barrio Copto y la Necrópolis de Saqqara con la Pirámide Escalonada. Almuerzo en restaurante local y tarde en el Bazar de Khan el Khalili. Cena en restaurante local y alojamiento en el hotel."
    },
    {
      day: 7,
      title: "El Cairo · Día Libre o Excursión Opcional de Día Completo a Alejandría",
      meals: "Pensión Completa (Desayuno, Almuerzo y Cena incluidos)",
      hotel: "Hotel 5★ El Cairo",
      image: "alejandria.jpg",
      desc: "Desayuno. Día libre para disfrutar de los jardines y piscina del hotel, realizar compras personales o unirse a la excursión opcional de día completo a Alejandría con almuerzo mediterráneo (Catacumbas de Kom el Shoqafa, Ciudadela de Qaitbay, Biblioteca y vistas al Mediterráneo). Almuerzo y cena incluidos. Alojamiento en El Cairo."
    },
    {
      day: 8,
      title: "El Cairo · España (Desayuno y Vuelo de Regreso)",
      meals: "Desayuno en el hotel",
      hotel: "Fin de servicios",
      image: "nuevo logo dynamic transparente.png",
      desc: "Desayuno en el hotel. Traslado asistido al aeropuerto internacional de El Cairo y vuelo de regreso a España. Fin del viaje."
    }
  ];

  const currentItinerary = departureDay === "lunes" ? itineraryLunes : itineraryViernes;

  // Cálculos económicos
  const excursionsTotalPerPerson = selectedExcursions.reduce((acc, excId) => {
    const exc = optionalExcursions.find(e => e.id === excId);
    return acc + (exc ? exc.price : 0);
  }, 0);

  const basePvpTotal = (calcAdults * currentBasePvp) + (calcKids * childPrice);
  const excursionsTotal = (calcAdults + calcKids) * excursionsTotalPerPerson;
  const rawPvp = basePvpTotal + excursionsTotal;

  // Desglose de comisiones y beneficios de la agencia
  const wholesalerCommissionAmount = (rawPvp * commissionRate) / 100;
  const netMayorista = rawPvp - wholesalerCommissionAmount;

  // Markup adicional que añade la minorista sobre el PVP
  const clientMarkupAmount = (rawPvp * markupPercent) / 100;
  const finalPvpBeforeFee = rawPvp + clientMarkupAmount;
  const finalClientPvp = finalPvpBeforeFee + agencyFee;

  // Beneficio total neto de la agencia
  const totalAgencyProfit = wholesalerCommissionAmount + clientMarkupAmount + agencyFee;
  const profitMarginPercent = finalClientPvp > 0 ? (totalAgencyProfit / finalClientPvp) * 100 : 0;

  // Guardar presupuesto
  const handleSaveQuote = () => {
    const newQuote: SavedQuote = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      title: `Egipto Selecto Senior - ${calcAdults} Adultos (+55)`,
      date: new Date().toLocaleDateString("es-ES"),
      clientName: clientName || "Viajero Titular",
      adults: calcAdults,
      kids: calcKids,
      departureDay: departureDay,
      departureDate: departureDate,
      departureAirport: departureAirport,
      hotelCategory: selectedHotelCategory,
      excursions: [...selectedExcursions],
      commissionRate,
      markupPercent,
      agencyFee,
      totalBase: rawPvp,
      totalNet: Math.round(netMayorista),
      totalRetail: Math.round(finalClientPvp),
      agentProfit: Math.round(totalAgencyProfit),
      agencyName: b2bAgencyName,
      agentName: b2bAgentName
    };
    setSavedQuotes([newQuote, ...savedQuotes]);
    showToast("Presupuesto B2B guardado correctamente.");
  };

  const handleRestoreQuote = (quote: SavedQuote) => {
    setCalcAdults(quote.adults);
    setCalcKids(quote.kids);
    setDepartureDay(quote.departureDay || "lunes");
    setDepartureDate(quote.departureDate);
    setDepartureAirport(quote.departureAirport);
    setSelectedHotelCategory(quote.hotelCategory);
    setSelectedExcursions(quote.excursions);
    setCommissionRate(quote.commissionRate);
    setMarkupPercent(quote.markupPercent);
    setAgencyFee(quote.agencyFee);
    setClientName(quote.clientName);
    setShowSavedQuotesModal(false);
    setActiveTab("quote");
    showToast(`Presupuesto #${quote.id} cargado en el cotizador.`);
  };

  const handleDeleteSavedQuote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedQuotes(savedQuotes.filter(q => q.id !== id));
    showToast("Presupuesto eliminado.");
  };

  // Enviar reserva a sistema B2B
  const handleConfirmBookingRequest = () => {
    const bookingRef = `DTR-SN-${Math.floor(100000 + Math.random() * 900000)}`;
    setLastBookingRef(bookingRef);

    if (onAddBooking) {
      onAddBooking({
        clientName: clientName.trim() || "Viajeros Titulares (+55)",
        agencyName: b2bAgencyName,
        agentName: b2bAgentName,
        destination: "Egipto Selecto Senior",
        startDate: departureDate || "2026-10-23",
        endDate: "2026-10-30",
        paxCount: calcAdults + calcKids,
        totalPriceNet: Math.round(netMayorista),
        totalPriceRetail: Math.round(finalClientPvp),
        commissionPercent: commissionRate,
        status: "En Revisión"
      });
    }

    setShowBookingRequestModal(false);
    showToast(`¡Solicitud ${bookingRef} registrada con éxito en estado En Revisión!`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A0F1D] font-sans pb-28 sm:pb-32 selection:bg-[#1F82D2]/20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[100] bg-[#0A0F1D] text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#52A72B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* CABECERA CORPORATIVA OFICIAL */}
      <Header 
        activeNav="ofertas"
        onNavigateHome={onBack}
        onNavigateDestinos={() => {
          window.location.hash = "destinos";
        }}
        onNavigateOfertas={onBack}
        onNavigateGrupos={() => {
          window.location.hash = "viajes-a-medida-grupos";
        }}
        onNavigateNosotros={() => {
          onBack();
          setTimeout(() => {
            const el = document.getElementById("nosotros");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        onOpenB2BLogin={() => setIsLoginModalOpen(true)}
      />

      {/* TOP HEADER: Breadcrumbs & Agency Controls */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          
          {/* Back & Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0A0F1D] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title="Volver a la portada de Dynamic Tours"
            >
              <ArrowLeft className="w-4 h-4 text-[#1F82D2]" />
              <span className="hidden sm:inline">Volver</span>
            </button>
            <div className="h-4 w-px bg-slate-200 shrink-0" />
            <nav className="text-xs text-slate-500 truncate flex items-center gap-1.5 font-medium">
              <span className="hover:text-slate-800 cursor-pointer" onClick={onBack}>Inicio</span>
              <span>/</span>
              <span className="hover:text-slate-800 cursor-pointer" onClick={onBack}>Ofertas destacadas</span>
              <span>/</span>
              <span className="text-[#0A0F1D] font-bold truncate">Egipto Selecto Senior (+55)</span>
            </nav>
          </div>

          {/* Right Action Controls: Counter Mode, Agency Logo & Cotizador */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Toggle Modo Mostrador (Cara al cliente sin comisiones) */}
            <button
              type="button"
              onClick={() => setCounterMode(!counterMode)}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                counterMode 
                  ? "bg-amber-50 border-amber-300 text-amber-900 shadow-2xs" 
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
              title="Alternar entre visión interna de agente (con márgenes) y visión de mostrador para enseñar al cliente"
            >
              {counterMode ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden md:inline">Modo Mostrador</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold uppercase">Cliente</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#1F82D2]" />
                  <span className="hidden md:inline">Modo Agente</span>
                  <span className="text-[10px] bg-blue-100 text-[#1F82D2] px-1.5 py-0.2 rounded font-bold uppercase">B2B</span>
                </>
              )}
            </button>

            {/* Agency Settings Modal Button */}
            <button
              type="button"
              onClick={() => setShowAgencySettingsModal(true)}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
              title="Personalizar datos y logotipo de la agencia para las propuestas de clientes"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="max-w-[110px] truncate">{b2bAgencyName}</span>
              <Edit3 className="w-3 h-3 text-slate-400" />
            </button>

            {/* Ver Propuesta Imprimible */}
            <button
              type="button"
              onClick={() => setShowClientProposalModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0A0F1D] text-white hover:bg-[#132338] transition-all cursor-pointer shadow-xs"
              title="Generar propuesta imprimible para entregar al cliente"
            >
              <Printer className="w-3.5 h-3.5 text-[#52A72B]" />
              <span className="hidden sm:inline">Propuesta</span>
            </button>
          </div>

        </div>
      </div>

      {/* HERO SECTION: Portada inmersiva con pareja senior en Karnak */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[490px] overflow-hidden bg-[#0A0F1D]">
        <img 
          src={assetUrl("/senior dynamic ok.png")} 
          alt="Egipto Selecto Senior - Dynamic Tours"
          className="w-full h-full object-cover object-[center_48%] scale-100"
          loading="eager"
        />
        
        {/* Degradados suaves de lectura para iluminar la fotografía manteniendo el contraste del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent pointer-events-none" />
        
        {/* Top Badges */}
        <div className="absolute top-6 left-4 sm:left-10 flex flex-wrap items-center gap-2 z-10 pointer-events-none">
          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[8px] sm:rounded-[9px] bg-white/85 backdrop-blur-md border border-white/80 text-[#24766F] font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-xs whitespace-nowrap">
            TODO INCLUIDO + AGUA
          </span>
          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[8px] sm:rounded-[9px] bg-white/85 backdrop-blur-md border border-white/80 text-[#24766F] font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-xs whitespace-nowrap">
            ABU SIMBEL EN BUS INCLUIDO
          </span>
        </div>

        {/* Hero content positioning */}
        <div className="absolute bottom-6 left-4 sm:left-10 max-w-2xl text-left space-y-2.5 z-10">
          <div className="flex flex-wrap items-center gap-2.5 text-white/95">
            <span className="px-2.5 py-0.5 rounded bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
              Programa especial mayores de 55 años y acompañantes
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-white/90">
              <Clock className="w-3.5 h-3.5 text-[#1F82D2]" />
              <span>8 Días / 7 Noches</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-white/90">
              <Plane className="w-3.5 h-3.5 text-[#52A72B]" />
              <span>Salidas en Lunes y Viernes</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            Egipto Selecto Senior
          </h1>
          
          <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-xl font-normal drop-shadow-sm">
            Crucero de 4 o 3 noches por el Nilo y 3 o 4 noches en El Cairo con almuerzos y cenas en restaurantes locales. Incluye Abu Simbel, agua mineral en visitas, visado con asistencia y coordinador permanente en español.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Navigation Tabs & Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto md:overflow-x-visible pb-0.5 no-scrollbar gap-1 sm:gap-2 md:gap-1 lg:gap-2 justify-between items-center w-full">
            {[
              { id: "itinerary", label: "Itinerario", icon: Clock },
              { id: "inclusions", label: "Incluye", icon: CheckCircle },
              { id: "visits", label: "Visitas", icon: Sparkles },
              { id: "hotels", label: "Hoteles", icon: MapPin },
              { id: "flights", label: "Vuelos", icon: Plane },
              { id: "quote", label: "Cotización B2B", icon: Sliders, isHighlighted: true, badge: selectedExcursions.length > 0 ? `${selectedExcursions.length} opc.` : null }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1 sm:gap-1.5 pb-3 px-1.5 sm:px-2 md:px-1.5 lg:px-2.5 text-xs lg:text-[13px] font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 md:shrink ${
                    isActive 
                      ? "border-[#1F82D2] text-[#1F82D2]" 
                      : tab.isHighlighted
                        ? "border-transparent text-emerald-700 hover:text-emerald-800"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#1F82D2]" : tab.isHighlighted ? "text-emerald-600" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[9px] bg-emerald-100 text-emerald-800 font-extrabold rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB 1: ITINERARIO CON SELECTOR DE SALIDA LUNES / VIERNES */}
          {activeTab === "itinerary" && (
            <div className="space-y-6 text-left">
              
              {/* Selector de día de salida */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#0A0F1D] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#1F82D2]" />
                      Selecciona la operativa de salida:
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      El recorrido y distribución de noches varía según el día de la semana.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setDepartureDay("lunes");
                        setExpandedDays([1]);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        departureDay === "lunes"
                          ? "bg-white text-[#1F82D2] shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Salida Lunes (4N Nilo + 3N Cairo)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDepartureDay("viernes");
                        setExpandedDays([1]);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        departureDay === "viernes"
                          ? "bg-white text-[#1F82D2] shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Salida Viernes (3N Nilo + 4N Cairo)
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/70 text-xs text-blue-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">
                      {departureDay === "lunes" 
                        ? "Ruta Lunes: Entrada por Luxor y salida por El Cairo." 
                        : "Ruta Viernes: Entrada por Asuán y salida por El Cairo."}
                    </span>{" "}
                    Ambas opciones incluyen <strong>Abu Simbel en bus</strong>, visitas completas con egiptólogo en español y pensión completa garantizada.
                  </div>
                </div>
              </div>

              {/* Controles y Acordeón de días */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1 pb-1">
                <span className="font-medium text-slate-500">{currentItinerary.length} días de viaje</span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={expandAllDays}
                    className="hover:text-[#1F82D2] font-semibold cursor-pointer transition-colors text-slate-600"
                  >
                    Desplegar todos
                  </button>
                  <span className="text-slate-300">·</span>
                  <button
                    type="button"
                    onClick={collapseAllDays}
                    className="hover:text-[#1F82D2] font-semibold cursor-pointer transition-colors text-slate-600"
                  >
                    Plegar todos
                  </button>
                </div>
              </div>

              {/* Acordeón de días */}
              <div className="space-y-3.5">
                {currentItinerary.map((item) => {
                  const isExpanded = expandedDays.includes(item.day);
                  return (
                    <div 
                      key={item.day}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleDay(item.day)}
                        className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#1F82D2]/10 text-[#1F82D2] text-xs font-extrabold flex items-center justify-center shrink-0">
                              {item.day}
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              Día {item.day}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-[#0A0F1D]">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            {item.meals} · {item.hotel}
                          </p>
                        </div>
                        <div className="p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0 mt-1">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 space-y-3.5 animate-fadeIn">
                          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                          <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                            <div className="flex items-center gap-2 text-slate-700">
                              <span className="font-bold text-[#0A0F1D]">Régimen:</span>
                              <span>{item.meals}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700">
                              <span className="font-bold text-[#0A0F1D]">Alojamiento:</span>
                              <span>{item.hotel}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: INCLUYE / NO INCLUYE Y VENTAJAS SENIOR */}
          {activeTab === "inclusions" && (
            <div className="space-y-6 text-left">
              
              {/* Highlight Banner: Ventajas Exclusivas Senior */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-5 border border-emerald-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    55+
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-emerald-950">
                      Ventajas Exclusivas del Programa «Selecto Senior»
                    </h3>
                    <p className="text-xs text-emerald-800">
                      Solo es necesario que <strong>uno de los pasajeros</strong> de la reserva tenga 55 años o más.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pensión completa con almuerzos y cenas en restaurantes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Agua mineral incluida durante todas las visitas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Visado de entrada a Egipto incluido (con asistencia)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Excursión a los Templos de Abu Simbel en bus incluida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Coordinador de habla hispana durante toda la estancia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tasas y carburante incluidos (280 € netos)</span>
                  </div>
                </div>
              </div>

              {/* Qué Incluye */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-[#0A0F1D]">Servicios Incluidos</h3>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Precio por persona en habitación doble o triple.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Vuelo chárter o de línea regular desde Madrid, Barcelona, Valencia, Málaga y Bilbao + vuelos domésticos en Egipto.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>4 o 3 noches de crucero por el Nilo según programa en régimen de Pensión Completa.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>3 o 4 noches en El Cairo según programa en régimen de Pensión Completa.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Almuerzos y cenas en restaurantes locales de El Cairo de alta calidad.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Visado de entrada a Egipto incluido (tramitado a la llegada con personal de asistencia).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Cuota de servicios y propinas generales del crucero incluidas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Agua mineral incluida durante todas las visitas del circuito.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Coordinador de Dynamic Tours en contacto durante toda la estancia.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Traslados en autocares confortables con aire acondicionado y acompañante de habla hispana.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Paquete completo de visitas con egiptólogo: Pirámides de Guiza con entrada a pirámide, GEM, Noche Cairota, Saqqara, Ciudadela, Karnak, Luxor, Valle de los Reyes, Hatshepsut, Edfú, Kom Ombo, Philae y faluca.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Excursión a los Templos de Abu Simbel en autobús climatizado incluida de serie.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Seguro básico de viaje incluido.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tasas y carburantes incluidos (280 € netos por persona).</span>
                  </li>
                </ul>
              </div>

              {/* Qué No Incluye */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-rose-700">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <h3 className="text-base font-bold text-[#0A0F1D]">No Incluido</h3>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Visitas y excursiones opcionales (Paseo en Globo, Poblado Nubio, Alejandría).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Bebidas durante las comidas (excepto el agua provista durante las visitas guiadas).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Propinas del guía egiptólogo (se sugiere 3 € por persona/día, aprox. 20 € semana).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Seguro opcional de cancelación y gastos médicos ampliados.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Gastos personales (lavandería, teléfono, llamadas, compras, propinas extra).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>Cualquier servicio no especificado detalladamente como incluido.</span>
                  </li>
                </ul>
              </div>

              {/* Observaciones y Notas Oficiales */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2.5">
                <h4 className="font-bold text-[#0A0F1D] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#1F82D2]" />
                  Observaciones Importantes para la Agencia
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                  <li><strong>Pasaporte:</strong> Vigencia mínima de 6 meses desde la fecha de salida del país.</li>
                  <li><strong>Requisito de edad:</strong> Para acceder a la tarifa y ventajas Senior, al menos un pasajero de la habitación/reserva debe tener 55 años cumplidos en la fecha del viaje. Los acompañantes pueden tener cualquier edad.</li>
                  <li><strong>Abu Simbel:</strong> Salida de madrugada en convoy (aprox. 3h por carretera) para presenciar el amanecer frente a los templos.</li>
                  <li><strong>Visado:</strong> Tramitado a la llegada a Egipto en los mostradores oficiales con la asistencia presencial de nuestros corresponsales.</li>
                  <li><strong>Vuelos:</strong> Billetes de avión emitidos bajo condiciones de grupo chárter o tarifa tour operador no reembolsables.</li>
                </ul>
              </div>

            </div>
          )}

          {/* TAB 3: VISITAS DETALLADAS */}
          {activeTab === "visits" && (
            <div className="space-y-6 text-left">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <h3 className="text-base font-bold text-[#0A0F1D] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#1F82D2]" />
                  Catálogo de Visitas Incluidas y Opcionales
                </h3>
                <p className="text-xs text-slate-600">
                  Todas las visitas se realizan en autobús climatizado moderno con egiptólogo nativo oficial de habla hispana y agua mineral incluida.
                </p>
              </div>

              {/* Visitas Incluidas Principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Templos de Abu Simbel (Incluido)",
                    badge: "INCLUIDO EN SENIOR",
                    badgeColor: "bg-emerald-100 text-emerald-800",
                    image: "dynamic_egipto_abu_simbel.png",
                    desc: "Obra cumbre de Ramsés II y Nefertari, salvada de las aguas del Nilo por la UNESCO. Las 4 colosales estatuas talladas en la roca son el mayor icono del sur de Egipto."
                  },
                  {
                    title: "Pirámides de Guiza con Entrada a Pirámide",
                    badge: "INCLUIDO CON ENTRADA",
                    badgeColor: "bg-blue-100 text-blue-800",
                    image: "dia_5_guiza.jpg",
                    desc: "Keops, Kefrén y Micerinos junto a la Gran Esfinge. Incluye entrada al interior de la 2ª o 3ª pirámide para vivir la emoción arqueológica."
                  },
                  {
                    title: "Gran Museo Egipcio (GEM)",
                    badge: "INCLUIDO",
                    badgeColor: "bg-slate-100 text-slate-800",
                    image: "gem.jpeg",
                    desc: "La nueva maravilla cultural a los pies de las pirámides, albergando la mayor colección de tesoros faraónicos jamás reunida."
                  },
                  {
                    title: "Noche Cairota y Cena Típica",
                    badge: "EXPERIENCIA EXCLUSIVA",
                    badgeColor: "bg-purple-100 text-purple-800",
                    image: "noche_cairota.jpg",
                    desc: "Paseo nocturno guiado por las calles iluminadas del centro histórico islámico y cena en restaurante cairota tradicional."
                  },
                  {
                    title: "Necrópolis de Saqqara y Pirámide Escalonada",
                    badge: "INCLUIDO",
                    badgeColor: "bg-slate-100 text-slate-800",
                    image: "dia_5_guiza.jpg",
                    desc: "La primera edificación monumental de piedra de la humanidad, mandada erigir por el arquitecto Imhotep para el faraón Zoser."
                  },
                  {
                    title: "Templos de Karnak y Luxor",
                    badge: "INCLUIDO",
                    badgeColor: "bg-slate-100 text-slate-800",
                    image: "senior dynamic ok.png",
                    desc: "La grandiosa sala hipóstila con sus 134 columnas gigantescas y la avenida de las esfinges que une ambos templos faraónicos."
                  },
                  {
                    title: "Valle de los Reyes y Templo de Hatshepsut",
                    badge: "INCLUIDO",
                    badgeColor: "bg-slate-100 text-slate-800",
                    image: "joyas nilo 2.png",
                    desc: "Las tumbas secretas de los faraones del Imperio Nuevo excavadas en el desierto y el espectacular templo aterrazado de la reina-faraón."
                  },
                  {
                    title: "Templo de Philae y Paseo en Faluca",
                    badge: "INCLUIDO",
                    badgeColor: "bg-slate-100 text-slate-800",
                    image: "egipto_feluca.png",
                    desc: "Santuario flotante en la isla sagrada de Isis rescatado de las aguas y navegación en la tradicional faluca de vela blanca."
                  }
                ].map((v, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
                    <div className="h-36 sm:h-40 overflow-hidden relative">
                      <img src={assetUrl(v.image)} alt={v.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 left-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${v.badgeColor}`}>
                          {v.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#0A0F1D]">{v.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Excursiones Opcionales que se pueden añadir */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#52A72B]" />
                    <h3 className="text-sm font-bold text-[#0A0F1D]">Excursiones Opcionales para Añadir en Cotizador</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Contratación en origen o destino</span>
                </div>

                <div className="space-y-3">
                  {optionalExcursions.map((exc) => {
                    const isSelected = selectedExcursions.includes(exc.id);
                    return (
                      <div 
                        key={exc.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          isSelected 
                            ? "bg-blue-50/70 border-[#1F82D2] shadow-xs" 
                            : "bg-slate-50 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-[#0A0F1D]">{exc.title}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#1F82D2] border border-blue-200">
                              {exc.price} €/pers.
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">{exc.timing} · {exc.highlight}</p>
                          <p className="text-xs text-slate-600 leading-relaxed pt-1">{exc.detailedDesc}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedExcursions(selectedExcursions.filter(id => id !== exc.id));
                            } else {
                              setSelectedExcursions([...selectedExcursions, exc.id]);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                            isSelected
                              ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                              : "bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white hover:brightness-105"
                          }`}
                        >
                          {isSelected ? "Quitar de cotización" : "Añadir a cotización +"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: HOTELES Y MOTONAVES */}
          {activeTab === "hotels" && (
            <div className="space-y-6 text-left">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <h3 className="text-base font-bold text-[#0A0F1D] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#1F82D2]" />
                  Motonaves Fluviales y Hoteles Previstos
                </h3>
                <p className="text-xs text-slate-600">
                  Alojamientos 5★ cuidadosamente seleccionados para garantizar el descanso, la accesibilidad y la excelencia gastronómica del público Senior.
                </p>
              </div>

              {/* Categoría 5★ Estándar */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Opción Incluida</span>
                    <h4 className="text-base font-extrabold text-[#0A0F1D]">Categoría 5★ Estándar / Lujo (Desde 1.285 €)</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">5 Estrellas</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-2">
                    <span className="font-bold text-[#1F82D2] block uppercase text-[11px] tracking-wide">Crucero Nilo (4 o 3 Noches)</span>
                    <p className="font-semibold text-slate-800">M/S Royal Princess, M/S Grand Princess, M/S Radamis o similar</p>
                    <p className="text-slate-600 leading-relaxed">
                      Motonave de 5 estrellas con piscina en cubierta solárium, restaurante panorámico, ascensor, salón bar con entretenimiento nocturno y camarotes exteriores con grandes ventanales climatizados.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-2">
                    <span className="font-bold text-[#1F82D2] block uppercase text-[11px] tracking-wide">El Cairo (3 o 4 Noches)</span>
                    <p className="font-semibold text-slate-800">Tolip El Galaa, Hilton Pyramids Golf, Grand Nile Tower o similar</p>
                    <p className="text-slate-600 leading-relaxed">
                      Hoteles 5★ con amplias habitaciones, piscina, spa, múltiples restaurantes y excelentes comunicaciones para los traslados del programa. Régimen en pensión completa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Categoría 5★ Gran Lujo Superior */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Upgrade Opcional</span>
                    <h4 className="text-base font-extrabold text-[#0A0F1D]">Categoría 5★ Gran Lujo Superior (+305 €)</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">5★ Gran Lujo</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-amber-50/50 rounded-xl space-y-2 border border-amber-200/60">
                    <span className="font-bold text-amber-800 block uppercase text-[11px] tracking-wide">Motonave 5★ Gran Lujo Superior</span>
                    <p className="font-semibold text-slate-800">M/S Acamar, M/S Mayfair, M/S Sonesta Sun Goddess o similar</p>
                    <p className="text-slate-600 leading-relaxed">
                      Barcos boutique de lujo con servicio personalizado, gastronomía gourmet, suites exteriores de alta gama con balcón francés y ambiente sereno y distinguido.
                    </p>
                  </div>
                  <div className="p-3.5 bg-amber-50/50 rounded-xl space-y-2 border border-amber-200/60">
                    <span className="font-bold text-amber-800 block uppercase text-[11px] tracking-wide">Hotel 5★ Gran Lujo El Cairo</span>
                    <p className="font-semibold text-slate-800">Marriott Mena House, Four Seasons Nile Plaza o Fairmont Nile City</p>
                    <p className="text-slate-600 leading-relaxed">
                      Emblemáticos hoteles de gran prestigio internacional con vistas panorámicas al Nilo o a las mismísimas Pirámides de Guiza.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: VUELOS Y TRASLADOS */}
          {activeTab === "flights" && (
            <div className="space-y-6 text-left">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <h3 className="text-base font-bold text-[#0A0F1D] flex items-center gap-2">
                  <Plane className="w-5 h-5 text-[#1F82D2]" />
                  Conexiones Aéreas y Traslados
                </h3>
                <p className="text-xs text-slate-600">
                  Operativa con vuelos directos chárter y de línea regular desde los principales aeropuertos de España, con asistencia personalizada de salida y llegada.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-xs">
                {[
                  { city: "Madrid (MAD)", days: "Lunes y Viernes", note: "Vuelos directos chárter y EgyptAir" },
                  { city: "Barcelona (BCN)", days: "Lunes y Viernes", note: "Vuelos directos chárter y línea regular" },
                  { city: "Valencia (VLC)", days: "Operativa chárter", note: "Consultar cupos según temporada" },
                  { city: "Málaga (AGP)", days: "Operativa chárter", note: "Salidas directas programadas" },
                  { city: "Bilbao (BIO)", days: "Operativa chárter", note: "Salidas directas de temporada" }
                ].map((f, i) => (
                  <div key={i} className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
                    <span className="font-extrabold text-[#0A0F1D] block text-sm">{f.city}</span>
                    <span className="text-[11px] text-[#1F82D2] font-bold block">{f.days}</span>
                    <p className="text-slate-500 text-[11px]">{f.note}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50/70 rounded-2xl p-4 sm:p-5 border border-blue-200 text-xs text-blue-950 space-y-2">
                <h4 className="font-bold flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#1F82D2]" />
                  Equipaje y Traslados Incluidos
                </h4>
                <p className="leading-relaxed text-blue-900">
                  • <strong>1 Maleta facturada de hasta 20 kg</strong> por pasajero + 1 equipaje de mano en cabina (hasta 7 kg).
                  <br />
                  • <strong>Vuelo doméstico en Egipto incluido:</strong> El Cairo - Asuán o Luxor - El Cairo para evitar largos trayectos por carretera.
                  <br />
                  • <strong>Traslados integrales:</strong> Aeropuerto - Motonave - Hotel - Aeropuerto en vehículos modernos de última generación con climatización reforzada y egiptólogo acompañante.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: COTIZADOR B2B INTERACTIVO */}
          {activeTab === "quote" && (
            <div className="space-y-6 text-left">
              
              {/* Header Cotizador B2B */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                      Cotizador en Tiempo Real
                    </span>
                    <span className="text-xs text-slate-400">PVP oficial mayorista</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0A0F1D] mt-1">
                    Configura la Propuesta para tu Cliente
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveQuote}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#0A0F1D] transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-[#1F82D2]" />
                    <span>Guardar Cotización</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSavedQuotesModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#0A0F1D] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#52A72B]" />
                    <span>Recuperar ({savedQuotes.length})</span>
                  </button>
                </div>
              </div>

              {/* Formulario de Configuración del Viaje */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-5 text-xs">
                
                {/* Datos del Cliente */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nombre del Cliente / Titular *</label>
                    <input 
                      type="text" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ej. Matrimonio Gómez / Titular +55"
                      className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email de Contacto</label>
                    <input 
                      type="email" 
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="cliente@email.com"
                      className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Teléfono</label>
                    <input 
                      type="tel" 
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                    />
                  </div>
                </div>

                {/* Pasajeros, Salida y Aeropuerto */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Adultos (+55 y acomp.)</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcAdults(Math.max(1, calcAdults - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                      >-</button>
                      <span className="w-8 text-center font-bold text-sm">{calcAdults}</span>
                      <button
                        type="button"
                        onClick={() => setCalcAdults(calcAdults + 1)}
                        className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Menores (hasta 11 años)</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcKids(Math.max(0, calcKids - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                      >-</button>
                      <span className="w-8 text-center font-bold text-sm">{calcKids}</span>
                      <button
                        type="button"
                        onClick={() => setCalcKids(calcKids + 1)}
                        className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Operativa de Salida</label>
                    <select
                      value={departureDay}
                      onChange={(e) => setDepartureDay(e.target.value as any)}
                      className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2] cursor-pointer"
                    >
                      <option value="lunes">Lunes (4N Nilo + 3N Cairo)</option>
                      <option value="viernes">Viernes (3N Nilo + 4N Cairo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Aeropuerto de Salida</label>
                    <select
                      value={departureAirport}
                      onChange={(e) => setDepartureAirport(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2] cursor-pointer"
                    >
                      <option value="Madrid (MAD) - Vuelo directo">Madrid (MAD)</option>
                      <option value="Barcelona (BCN) - Vuelo directo">Barcelona (BCN)</option>
                      <option value="Valencia (VLC) - Chárter directo">Valencia (VLC)</option>
                      <option value="Málaga (AGP) - Chárter directo">Málaga (AGP)</option>
                      <option value="Bilbao (BIO) - Chárter directo">Bilbao (BIO)</option>
                    </select>
                  </div>
                </div>

                {/* Categoría Hotelera */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Categoría Hotelera Seleccionada</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedHotelCategory("standard")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedHotelCategory === "standard"
                          ? "bg-blue-50/70 border-[#1F82D2] ring-1 ring-[#1F82D2]"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0A0F1D]">5★ Estándar / Lujo</span>
                        <span className="font-extrabold text-[#1F82D2]">1.285 €</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Motonaves M/S Royal Princess / Radamis + Hoteles Tolip / Hilton Pyramids Golf.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedHotelCategory("lujo")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedHotelCategory === "lujo"
                          ? "bg-amber-50/70 border-amber-500 ring-1 ring-amber-500"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0A0F1D]">5★ Gran Lujo Superior</span>
                        <span className="font-extrabold text-amber-600">1.590 €</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Motonaves Acamar / Mayfair + Hoteles Four Seasons / Marriott Mena House.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Excursiones Opcionales a Incluir */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    Excursiones Opcionales a Incluir en la Cotización ({selectedExcursions.length} seleccionadas)
                  </label>
                  <div className="space-y-2">
                    {optionalExcursions.map((exc) => {
                      const isChecked = selectedExcursions.includes(exc.id);
                      return (
                        <label 
                          key={exc.id}
                          className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                            isChecked 
                              ? "bg-blue-50/60 border-[#1F82D2]" 
                              : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedExcursions([...selectedExcursions, exc.id]);
                                } else {
                                  setSelectedExcursions(selectedExcursions.filter(id => id !== exc.id));
                                }
                              }}
                              className="w-4 h-4 text-[#1F82D2] rounded border-slate-300 focus:ring-[#1F82D2]"
                            />
                            <div>
                              <span className="font-bold text-slate-800">{exc.title}</span>
                              <span className="text-[11px] text-slate-500 block">{exc.timing}</span>
                            </div>
                          </div>
                          <span className="font-extrabold text-[#1F82D2] text-xs">+{exc.price} €/p</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* PANEL EXCLUSIVO AGENCIA B2B: Márgenes y Comisiones (Oculto en Modo Mostrador) */}
                {!counterMode ? (
                  <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#52A72B]" />
                        <h4 className="font-bold text-sm text-white">Panel de Rentabilidad de la Agencia</h4>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                        CONFIDENCIAL B2B
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Comisión Mayorista Pactada</label>
                        <select
                          value={commissionRate}
                          onChange={(e) => setCommissionRate(Number(e.target.value))}
                          className="w-full text-xs font-bold px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                        >
                          <option value="10">10% estándar</option>
                          <option value="12">12% preferente Dynamic</option>
                          <option value="14">14% premium</option>
                          <option value="16">16% cupo cerrado</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Margen Comercial Agencia (+%)</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            min="0"
                            max="25"
                            value={markupPercent}
                            onChange={(e) => setMarkupPercent(Math.max(0, Number(e.target.value)))}
                            className="w-full text-xs font-bold px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                          />
                          <span className="text-slate-400 font-bold">%</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Gastos de Gestión Agencia (€)</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            min="0"
                            value={agencyFee}
                            onChange={(e) => setAgencyFee(Math.max(0, Number(e.target.value)))}
                            className="w-full text-xs font-bold px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                          />
                          <span className="text-slate-400 font-bold">€</span>
                        </div>
                      </div>
                    </div>

                    {/* Desglose de rentabilidad */}
                    <div className="p-3 bg-slate-800/80 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10.5px]">Comisión Mayorista:</span>
                        <span className="font-bold text-emerald-400">{Math.round(wholesalerCommissionAmount)} €</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10.5px]">Margen + Fee Minorista:</span>
                        <span className="font-bold text-emerald-400">{Math.round(clientMarkupAmount + agencyFee)} €</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10.5px]">Total Neto a Pagar a Dynamic:</span>
                        <span className="font-bold text-white font-mono">{Math.round(netMayorista)} €</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10.5px]">BENEFICIO TOTAL AGENCIA:</span>
                        <span className="text-base font-extrabold text-[#52A72B]">
                          +{Math.round(totalAgencyProfit)} € ({profitMarginPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-amber-600" />
                      Modo Mostrador activado: Los márgenes y comisiones internas están ocultos.
                    </span>
                    <button
                      type="button"
                      onClick={() => setCounterMode(false)}
                      className="text-xs font-bold underline hover:text-amber-950"
                    >
                      Ver márgenes B2B
                    </button>
                  </div>
                )}

                {/* Resumen Final de la Cotización */}
                <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Presupuesto Final Cara al Cliente
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#0A0F1D]">
                        {Math.round(finalClientPvp)} €
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        ({Math.round(finalClientPvp / (calcAdults + calcKids))} € / persona)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Incluye {calcAdults} adultos {calcKids > 0 ? `+ ${calcKids} niños` : ""}, tasas de 280€, pensión completa, Abu Simbel y {selectedExcursions.length} opcionales.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowClientProposalModal(true)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0A0F1D] text-white hover:bg-[#132338] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#52A72B]" />
                      <span>Ver Propuesta Formal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowBookingRequestModal(true)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-105 active:scale-95 text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>Solicitar Reserva B2B</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Right Column: Resumen Rápido / Ficha Fija de Servicios Senior */}
        <div className="space-y-6">
          
          {/* Ficha Rápida del Viaje */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs text-left space-y-4">
            <h3 className="text-sm font-bold text-[#0A0F1D] flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#1F82D2]" />
              Ficha Técnica del Viaje
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Destino:</span>
                <span className="font-bold text-[#0A0F1D] text-right">Egipto (El Cairo + Nilo)</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Duración:</span>
                <span className="font-bold text-[#0A0F1D]">8 Días / 7 Noches</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Público:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Mayores de 55 y acomp.</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Régimen:</span>
                <span className="font-bold text-[#0A0F1D]">Todo Incluido + Agua</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Abu Simbel:</span>
                <span className="font-bold text-emerald-700">Incluido en bus</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Visado:</span>
                <span className="font-bold text-emerald-700">Incluido con asistencia</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Salidas:</span>
                <span className="font-bold text-[#0A0F1D]">Lunes y Viernes</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Tasas aéreas:</span>
                <span className="font-bold text-[#52A72B]">280 € netos incluidas</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab("quote")}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-105 text-white transition-all cursor-pointer shadow-xs"
              >
                Configurar Cotización B2B
              </button>
            </div>
          </div>

          {/* Banner de Asistencia de Dynamic Tours */}
          <div className="bg-gradient-to-br from-slate-900 to-[#132338] text-white rounded-2xl p-5 shadow-lg space-y-3 text-left">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#52A72B]" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                Soporte de Mayorista para Agencias
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ¿Tienes un grupo de personas mayores, asociación o fechas especiales? Nuestro departamento de grupos diseña cotizaciones a medida con condiciones exclusivas.
            </p>
            <div className="pt-2">
              <a
                href="#formulario-grupos"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = "formulario-grupos";
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F82D2] hover:text-white transition-colors"
              >
                <span>Solicitar propuesta para grupo</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM STICKY BAR: Acceso rápido de precio y reserva en móvil/escritorio */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-5px_20px_rgba(0,0,0,0.06)] py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight mb-0.5">
              Egipto Selecto Senior (+55)
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs">
              <span className="text-xl sm:text-2xl font-extrabold text-[#0A0F1D] leading-none">
                {activeTab === "quote" ? `${Math.round(finalClientPvp)} €` : "Desde 1.285 €"}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {activeTab === "quote" ? "total propuesta" : "/ persona"}
              </span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <span className="text-[11px] sm:text-xs text-slate-600 font-medium whitespace-nowrap">
                Tasas y carburante incluidos (280€ netos de tasas incluidas)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowClientProposalModal(true)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-[#0A0F1D] text-white hover:bg-[#132338] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-[#52A72B]" />
              <span className="hidden sm:inline">Imprimir / Enviar</span>
              <span className="sm:hidden">Propuesta</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (activeTab !== "quote") {
                  setActiveTab("quote");
                } else {
                  setShowBookingRequestModal(true);
                }
              }}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-105 active:scale-95 text-white transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              {activeTab === "quote" ? "Confirmar Reserva B2B →" : "Cotizar este Viaje →"}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: PROPUESTA FORMAL PARA EL CLIENTE (Imprimible / PDF limpio) */}
      {showClientProposalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 text-left flex flex-col animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#1F82D2]" />
                <h3 className="text-sm font-bold text-[#0A0F1D]">Propuesta de Viaje para el Cliente</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0A0F1D] text-white hover:bg-[#132338] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#52A72B]" />
                  <span>Imprimir / Guardar PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowClientProposalModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Documento formal para entregar */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700">
              
              {/* Encabezado con datos de la agencia minorista */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-5">
                <div>
                  <h2 className="text-lg font-extrabold text-[#0A0F1D]">{b2bAgencyName}</h2>
                  <p className="text-xs text-slate-500 font-medium">Asesor: {b2bAgentName} · Licencia: {agencyLic}</p>
                  <p className="text-xs text-slate-500">Teléfono: {agencyPhone} · Email: {agencyEmail}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Documento Informativo</span>
                  <span className="font-mono text-xs font-bold text-[#1F82D2]">PROP-EG-SENIOR</span>
                  <p className="text-[10.5px] text-slate-400 mt-1">{new Date().toLocaleDateString("es-ES")}</p>
                </div>
              </div>

              {/* Título de la propuesta */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  PROGRAMA SELECTO SENIOR (+55)
                </span>
                <h3 className="text-xl font-extrabold text-[#0A0F1D]">Egipto Selecto Senior (8 Días / 7 Noches)</h3>
                <p className="text-xs text-slate-500">
                  Preparado para: <strong>{clientName}</strong> · Salida: <strong>{departureDate}</strong> desde <strong>{departureAirport.split(" - ")[0]}</strong>.
                </p>
              </div>

              {/* Resumen de Inclusiones Clave */}
              <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                <h4 className="font-bold text-xs text-[#0A0F1D]">Servicios Clave Incluidos en tu Viaje:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px] text-slate-700">
                  <li>• Pensión Completa en Crucero y El Cairo con almuerzos y cenas</li>
                  <li>• Agua mineral incluida durante todas las visitas</li>
                  <li>• Excursión a los Templos de Abu Simbel en autobús climatizado</li>
                  <li>• Visitas completas con egiptólogo y entrada interior a pirámide</li>
                  <li>• Visado de entrada a Egipto incluido con asistencia en el aeropuerto</li>
                  <li>• Coordinador en español durante toda la estancia</li>
                  <li>• Tasas aéreas y carburante de 280 € incluidos</li>
                </ul>
              </div>

              {/* Desglose Económico Transparente */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-700">
                    <tr>
                      <th className="p-2.5">Concepto</th>
                      <th className="p-2.5 text-center">Viajeros</th>
                      <th className="p-2.5 text-right">PVP Estimado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5">
                        Circuito Egipto Selecto Senior 8D/7N (Cat. {selectedHotelCategory === "lujo" ? "5★ Gran Lujo" : "5★ Estándar"})
                      </td>
                      <td className="p-2.5 text-center">{calcAdults} Adultos {calcKids > 0 ? `+ ${calcKids} niños` : ""}</td>
                      <td className="p-2.5 text-right font-bold text-[#0A0F1D]">{basePvpTotal} €</td>
                    </tr>
                    {selectedExcursions.map(id => {
                      const exc = optionalExcursions.find(e => e.id === id);
                      if (!exc) return null;
                      return (
                        <tr key={id} className="text-slate-600">
                          <td className="p-2.5 pl-4">↳ Excursión: {exc.title}</td>
                          <td className="p-2.5 text-center">{calcAdults + calcKids}</td>
                          <td className="p-2.5 text-right font-medium">{(calcAdults + calcKids) * exc.price} €</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-slate-50/80 font-bold">
                      <td className="p-3 text-sm text-[#0A0F1D]">TOTAL PROPUESTA VIAJERO (PVP)</td>
                      <td className="p-3 text-center text-xs text-slate-500">Tasas incluidas</td>
                      <td className="p-3 text-right text-base text-[#1F82D2]">
                        {Math.round(finalClientPvp)} €
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                * Presupuesto sujeto a disponibilidad de plazas en el momento de confirmar la reserva. Dynamic Tours Mayorista de Viajes.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
              <button
                type="button"
                onClick={() => setShowClientProposalModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: CONFIRMACIÓN DE SOLICITUD DE RESERVA B2B */}
      {showBookingRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-left space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0A0F1D]">Confirmar Solicitud de Reserva</h3>
                <p className="text-xs text-slate-500">Egipto Selecto Senior (+55)</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Titular:</span>
                <strong className="text-slate-800">{clientName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Salida:</span>
                <span className="font-semibold text-slate-800">{departureDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Operativa:</span>
                <span className="font-semibold text-slate-800">{departureDay === "lunes" ? "Lunes (Luxor - Cairo)" : "Viernes (Asuán - Cairo)"}</span>
              </div>
              <div className="flex justify-between">
                <span>Pasajeros:</span>
                <span>{calcAdults} Adultos {calcKids > 0 ? `+ ${calcKids} niños` : ""}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm text-[#0A0F1D]">
                <span>Total Liquidación:</span>
                <span className="text-[#1F82D2]">{Math.round(finalClientPvp)} €</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBookingRequestModal(false)}
                className="w-1/2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmBookingRequest}
                className="w-1/2 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-105 text-white transition-all shadow-xs"
              >
                Enviar a Dynamic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: RECUPERAR PRESUPUESTOS GUARDADOS */}
      {showSavedQuotesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 text-left flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0A0F1D]">Presupuestos Guardados ({savedQuotes.length})</h3>
              <button 
                onClick={() => setShowSavedQuotesModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5 flex-1 text-xs">
              {savedQuotes.length === 0 ? (
                <p className="text-center text-slate-400 py-8">No tienes cotizaciones guardadas para este circuito.</p>
              ) : (
                savedQuotes.map((q) => (
                  <div key={q.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-[#0A0F1D] block">{q.clientName}</span>
                      <span className="text-slate-500 text-[11px] block">{q.date} · {q.adults} adultos · {q.totalRetail} €</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleRestoreQuote(q)}
                        className="px-2.5 py-1 rounded-lg bg-[#0A0F1D] text-white font-bold text-[11px]"
                      >
                        Recuperar
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteSavedQuote(q.id, e)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                type="button"
                onClick={() => setShowSavedQuotesModal(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: DATOS DE AGENCIA */}
      {showAgencySettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 text-left space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-[#0A0F1D]">Datos Comerciales de tu Agencia</h3>
              <button onClick={() => setShowAgencySettingsModal(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre Comercial de la Agencia</label>
                <input 
                  type="text" 
                  value={b2bAgencyName}
                  onChange={(e) => {
                    setB2bAgencyName(e.target.value);
                    localStorage.setItem("dt_agency_name", e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre del Asesor</label>
                <input 
                  type="text" 
                  value={b2bAgentName}
                  onChange={(e) => {
                    setB2bAgentName(e.target.value);
                    localStorage.setItem("dt_agent_name", e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Licencia de Agencia</label>
                <input 
                  type="text" 
                  value={agencyLic}
                  onChange={(e) => {
                    setAgencyLic(e.target.value);
                    localStorage.setItem("dt_agency_lic", e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Teléfono y Email</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    value={agencyPhone}
                    onChange={(e) => {
                      setAgencyPhone(e.target.value);
                      localStorage.setItem("dt_agency_phone", e.target.value);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                  <input 
                    type="email" 
                    value={agencyEmail}
                    onChange={(e) => {
                      setAgencyEmail(e.target.value);
                      localStorage.setItem("dt_agency_email", e.target.value);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowAgencySettingsModal(false)}
                className="px-4 py-2 rounded-xl bg-[#0A0F1D] text-white font-bold"
              >
                Guardar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pie de página corporativo */}
      <Footer 
        onOpenB2BLogin={() => setIsLoginModalOpen(true)}
        onNavigateDestinos={() => {
          window.location.hash = "destinos";
        }}
      />

      {/* Modal B2B */}
      <B2BLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onEnterB2B={onEnterB2B} 
      />

    </div>
  );
}
