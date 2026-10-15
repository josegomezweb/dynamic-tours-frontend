import React, { useState, useEffect, useRef } from "react";
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
  ExternalLink
} from "lucide-react";
import { Booking } from "../types";

interface LeyendasDetailProps {
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

export default function LeyendasDetail({ 
  onBack, 
  onEnterB2B, 
  agencyName: propAgencyName, 
  agentName: propAgentName, 
  onAddBooking 
}: LeyendasDetailProps) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "visits" | "hotels" | "flights" | "quote">("itinerary");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  
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
  const [clientName, setClientName] = useState<string>("Familia / Viajeros Titulares");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("Viernes, 23 de Octubre de 2026");
  const [departureAirport, setDepartureAirport] = useState<string>("Madrid (MAD) - Chárter directo");

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
      const stored = localStorage.getItem("dt_saved_quotes_leyendas");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "EGI-8419",
        title: "Leyendas de Egipto sin Abu Simbel",
        date: "14 Oct 2026",
        clientName: "Familia Gómez Rivas",
        adults: 2,
        kids: 0,
        departureDate: "Viernes, 23 de Octubre de 2026",
        departureAirport: "Madrid (MAD) - Chárter directo",
        hotelCategory: "standard",
        excursions: ["abusimbel", "globo"],
        commissionRate: 12,
        markupPercent: 5,
        agencyFee: 30,
        totalBase: 1968,
        totalNet: 1732,
        totalRetail: 2096,
        agentProfit: 364,
        agencyName: "Viajes y Experiencias B2B",
        agentName: "Asesor Especialista"
      }
    ];
  });

  // Sync savedQuotes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("dt_saved_quotes_leyendas", JSON.stringify(savedQuotes));
    } catch (e) {
      console.error(e);
    }
  }, [savedQuotes]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Excursions data of program
  const excursionsData = [
    {
      id: "abusimbel",
      category: "ABU SIMBEL",
      title: "Visita al Templo de Abu Simbel en Bus",
      adultPrice: 125,
      kidPrice: 125,
      desc: "Excursión en autobús para visitar los espectaculares templos tallados en la montaña dedicados al Faraón Ramsés II y a su amada Nefertari.",
      detailedDesc: "En las primeras horas del día, salida en autobús con guía hacia Abu Simbel, atravesando el desierto en un trayecto de aproximadamente 230 km (normalmente en convoy con otros vehículos). A la llegada, el guía ofrecerá una explicación previa y, después, dispondrás de tiempo libre para recorrer y fotografiar los dos templos. Visitarás uno de los conjuntos más impresionantes de Egipto: una obra colosal mandada construir por Ramsés II, el gran faraón constructor, famosa por sus gigantescas estatuas talladas en la roca. Además, conocerás la historia de su reubicación por la UNESCO en la década de 1960 para evitar que quedaran sumergidos tras la construcción de la presa de Asuán. Finalizada la visita (aprox. 1 h 30 min), regreso en autobús a Asuán.",
      image: "/abu_simbel.jpg"
    },
    {
      id: "alexandria",
      category: "ALEJANDRÍA",
      title: "Día completo en Alejandría con almuerzo",
      adultPrice: 115,
      kidPrice: 115,
      desc: "Excursión con traslados y guía para conocer la joya costera del Mediterráneo: puerto de la ciudad, catacumbas, Columna de Pompeyo y la moderna Biblioteca. Almuerzo incluido.",
      detailedDesc: "A la hora prevista saldremos de El Cairo por carretera rumbo a Alejandría (aprox. 225 km, unas 3 horas), la gran ciudad mediterránea y la segunda más importante de Egipto. Comenzaremos recorriendo el puerto alejandrino y visitando la Ciudadela de Qaitibay, fortaleza del siglo XV construida en el mismo enclave donde se alzaba el legendario Faro de Alejandría. Continuaremos hacia el sur para descubrir las Catacumbas de Kom el Shoqafa, un fascinante yacimiento subterráneo cuyos relieves muestran la fusión de tradiciones egipcias y grecorromanas, recorriendo sus distintos niveles entre pasadizos y cámaras funerarias. Muy cerca, veremos la Columna de Pompeyo, levantada en el área donde se encontraba el antiguo templo de Serapis. Después, disfrutaremos de un almuerzo en el centro de Alejandría. Por la tarde, visitaremos la Nueva Biblioteca de Alejandría, un icono cultural contemporáneo inaugurado en 2002 como homenaje a la mítica biblioteca de la Antigüedad. A última hora, regreso al hotel. Alojamiento.",
      image: "/alejandria.jpg"
    },
    {
      id: "sakkara",
      category: "EL CAIRO",
      title: "Día completo en El Cairo con Sakkara",
      adultPrice: 100,
      kidPrice: 100,
      desc: "Recorrido exhaustivo por la Ciudadela de Saladino, la Mezquita de Alabastro, el histórico Barrio Copto, el bazar de Jan el-Jalili y la Necrópolis de Saqqara con la pirámide escalonada de Zoser. Con almuerzo incluido.",
      detailedDesc: "A la hora prevista, recogida en el hotel para realizar una excursión de Día completo por El Cairo con Sakkara. Comenzaremos en el centro histórico con la Ciudadela de Saladino, gran fortaleza medieval que domina la ciudad, y la emblemática Mezquita de Alabastro, conocida por su elegante interior revestido en alabastro y sus vistas panorámicas; aquí el guía hará una introducción a los principios básicos del islam. Continuaremos hacia el Barrio Copto, uno de los rincones más singulares de la capital, donde visitaremos la Iglesia Colgante (Al-Muallaqa), construida sobre antiguas estructuras romanas, la Sinagoga Ben Ezra, vinculada a la tradición del hallazgo del bebé Moisés, y la Iglesia de San Sergio, asociada al paso de la Sagrada Familia por Egipto, además de un paseo por la zona medieval. Después, nos adentraremos en el animado bazar de Jan el-Jalili, el mercado más famoso de la ciudad, con tiempo libre para recorrer sus callejuelas, artesanía y puestos tradicionales. Almuerzo en restaurante local (bebidas no incluidas). Por la tarde, visitaremos la Necrópolis de Sakkara, el gran conjunto funerario de Menfis donde destaca la Pirámide Escalonada, una de las más antiguas de Egipto, y al finalizar regreso al hotel. Alojamiento.",
      image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gem",
      category: "EL CAIRO",
      title: "Gran Museo Egipcio (GEM)",
      adultPrice: 65,
      kidPrice: 65,
      desc: "Visita al nuevo y majestuoso centro arqueológico de clase mundial donde se conservan los mayores tesoros del antiguo Egipto.",
      detailedDesc: "Durante la tarde, tras el almuerzo visitarás el Gran Museo Egipcio (GEM), situado muy cerca de las pirámides de Guiza. Desde el exterior te sorprenderán sus proporciones y su arquitectura contemporánea; al entrar, comienza un recorrido fascinante por miles de años de historia a través de una cuidada selección de piezas, desde estatuas monumentales hasta ajuares y objetos procedentes de tumbas faraónicas. Uno de los grandes momentos de la visita es el Gran Vestíbulo, presidido por la colosal estatua de Ramsés II, una bienvenida espectacular que resume la grandeza del Antiguo Egipto. A medida que avanzas por las salas abiertas al público, cada detalle (la iluminación, los espacios y la narrativa del museo) refuerza esa conexión entre pasado y presente.",
      image: "/gem.jpeg"
    },
    {
      id: "nochecairota",
      category: "EL CAIRO",
      title: "Noche Cairota con cena tradicional",
      adultPrice: 80,
      kidPrice: 80,
      desc: "Paseo nocturno por la mística zona islámica de El Cairo, disfrutando de las luces y el ambiente cairota tradicional con cena incluida en restaurante local.",
      detailedDesc: "A la hora prevista, nos dirigiremos al centro histórico de El Cairo para disfrutar de un paseo por algunos de sus rincones más emblemáticos. Recorreremos la calle Al-Muizz, uno de los grandes ejes del Cairo medieval, y nos adentraremos en el Gran Bazar de Jan el-Jalili, el zoco más famoso de la ciudad, con sus angostas callejuelas y pasadizos repletos de vida y artesanía. Durante el recorrido haremos una pausa en el mítico Café El Fishawi, con más de 200 años de historia y conocido como el café de los espejos, donde podremos tomar un té o un café. Para finalizar, disfrutaremos de una cena en un restaurante tradicional para degustar la gastronomía egipcia (bebidas no incluidas) y, después, regreso al hotel.",
      image: "/noche_cairota.jpg"
    },
    {
      id: "globo",
      category: "LUXOR",
      title: "Paseo en Globo al Amanecer en Luxor",
      adultPrice: 110,
      kidPrice: 110,
      desc: "Inolvidable y mágico vuelo flotante al amanecer sobre los impresionantes valles, necrópolis y templos sagrados tebanos.",
      detailedDesc: "Antes del amanecer, recogida y traslado al punto de despegue para vivir una experiencia inolvidable: un paseo en globo aerostático sobre Luxor. A medida que ascendemos, contemplaremos cómo el sol va iluminando el Valle de los Reyes, el Valle de los Nobles y templos emblemáticos como el de la Reina Hatshepsut. La actividad tiene una duración aproximada de 50 minutos y, al finalizar, recibirás un certificado de vuelo como recuerdo de esta experiencia. Regreso al punto de partida. Nota: excursión sujeta a disponibilidad y condiciones meteorológicas.",
      image: "/globo_luxor.jpg"
    }
  ];

  // Itinerary
  const itineraryDays = [
    {
      day: 1,
      title: "ESPAÑA - ASUÁN",
      desc: "Presentación en el aeropuerto 3 horas antes de la salida. Embarque en vuelo chárter directo especial con destino Asuán. Llegada, trámites de visado y traslado a la motonave fluvial de 5 estrellas. Cena y noche a bordo."
    },
    {
      day: 2,
      title: "ASUÁN - KOM OMBO - EDFU",
      desc: "Pensión completa. Mañana libre a su disposición. De manera opcional, posibilidad de realizar la excursión a los Templos de Abu Simbel en bus. A la hora indicada, visita al Templo de Philae en la isla sagrada de Isis y apacible paseo por el Nilo en tradicionales falucas de vela. Regreso al barco, almuerzo a bordo e inicio de la navegación hacia Kom Ombo para visitar el templo dual dedicado a Sobek y Haroeris. Navegación hacia Edfu. Cena y noche a bordo."
    },
    {
      day: 3,
      title: "EDFU - ESNA - LUXOR",
      desc: "Pensión completa. Por la mañana, traslado en calesa y visita del Templo de Horus en Edfu, uno de los templos mejor conservados del antiguo Egipto. Regreso a la motonave y almuerzo a bordo mientras se navega hacia la esclusa de Esna, continuando hacia Luxor. A la llegada, visita monumental de los colosales Templos de Karnak y Luxor iluminados. Cena y noche a bordo."
    },
    {
      day: 4,
      title: "LUXOR - EL CAIRO",
      desc: "Pensión completa. Al amanecer, de manera opcional, posibilidad de realizar el inolvidable Paseo en Globo sobre los valles tebanos. Desayuno. Visita de la Necrópolis de Tebas: Valle de los Reyes, Templo funerario de la Reina Hatshepsut en Deir el-Bahari y los imponentes Colosos de Memnón. A la hora indicada, traslado al aeropuerto de Luxor para tomar vuelo regular con destino El Cairo. Llegada, traslado al hotel seleccionado y alojamiento."
    },
    {
      day: 5,
      title: "EL CAIRO - PIRÁMIDES DE GUIZA",
      desc: "Desayuno. Salida hacia Guiza para contemplar la Gran Esfinge y las emblemáticas pirámides de Keops, Kefrén y Micerinos junto con el Templo del Valle. Tarde libre. De manera opcional, posibilidad de visitar el Gran Museo Egipcio (GEM) con almuerzo o disfrutar del recorrido nocturno Noche Cairota por el zoco Jan el-Jalili con cena tradicional. Alojamiento."
    },
    {
      day: 6,
      title: "EL CAIRO - DÍA LIBRE O SAKKARA",
      desc: "Desayuno. Día libre a su disposición. De manera opcional, excursión de día completo por El Cairo histórico que incluye la Ciudadela de Saladino, la Mezquita de Alabastro, el Barrio Copto, el bazar de Jan el-Jalili y la Necrópolis de Saqqara con su Pirámide Escalonada de Zoser, con almuerzo incluido. Alojamiento."
    },
    {
      day: 7,
      title: "EL CAIRO - DÍA LIBRE O ALEJANDRÍA",
      desc: "Desayuno. Día libre a su disposición. De manera opcional, excursión de día completo a la ciudad mediterránea de Alejandría con almuerzo, visitando el puerto, la Ciudadela de Qaitibay, las catacumbas de Kom el Shoqafa, la Columna de Pompeyo y la moderna Biblioteca de Alejandría. Regreso a El Cairo y alojamiento."
    },
    {
      day: 8,
      title: "EL CAIRO - ESPAÑA",
      desc: "Desayuno. A la hora acordada, traslado al aeropuerto internacional de El Cairo para embarcar en vuelo de regreso a España. Llegada y fin de los servicios de Dynamic Tours."
    }
  ];

  const inclusionsList = [
    "Vuelo especial chárter directo desde España y vuelo doméstico interno Luxor - El Cairo.",
    "3 noches de crucero por el río Nilo en régimen de Pensión Completa (bebidas no incluidas).",
    "4 noches en El Cairo en hotel 5★ en régimen de Alojamiento y Desayuno.",
    "Visitas completas según programa en El Cairo y durante el crucero con guía egiptólogo de habla hispana.",
    "Todos los traslados y asistencias en aeropuertos y motonave con personal receptivo en español.",
    "Equipaje de bodega facturado de hasta 20 kg más equipaje de mano incluidos en el billete de chárter.",
    "Tasas aéreas y suplemento de carburante incluidos (280 € netos incluidos).",
    "Seguro básico de asistencia en viaje."
  ];

  const exclusionsList = [
    "Cuota de servicios de gestión, propinas generales obligatorias y tasas de barco/chóferes: 75 € por persona (a abonar directamente en destino).",
    "Visado de entrada a Egipto: 25 € por persona (a abonar en destino o mediante trámite electrónico previo).",
    "Excursión a los Templos de Abu Simbel (este programa específico la excluye de base, pudiendo añadirse en la cotización o contratarse en destino).",
    "Propinas del guía egiptólogo: se aconseja un promedio de 3 € por persona y día (aprox. 20 € para la semana completa).",
    "Bebidas en las comidas, extras de índole personal y cualquier servicio no especificado.",
    "Seguro opcional de cancelación de viaje y cobertura médica ampliada."
  ];

  const flightDetails = [
    { title: "Vuelo de Ida", route: "España (Madrid / Barcelona) ✈ Asuán (ASW)", type: "Chárter directo en viernes", day: "Viernes", baggage: "20 kg en bodega + equipaje de mano" },
    { title: "Vuelo Doméstico", route: "Luxor (LXR) ✈ El Cairo (CAI)", type: "Línea regular interna", day: "Lunes", baggage: "Equipaje facturado incluido" },
    { title: "Vuelo de Regreso", route: "El Cairo (CAI) ✈ España (Madrid / Barcelona)", type: "Chárter directo en viernes", day: "Viernes", baggage: "20 kg en bodega + equipaje de mano" }
  ];

  const hotelDetails = [
    {
      category: "Categoría Standard / Superior (A y B)",
      badge: "INCLUIDO EN TARIFA BASE",
      cairo: "Sheraton Cairo Hotel & Casino 5★ (o similar)",
      cruise: "Motonave Princess du Nile 5★ / Princess Sarah 5★ (o similar)",
      desc: "Excelente relación calidad-precio. Cabinas en motonave de 18 m² con vistas panorámicas al río, climatización, baño completo y televisión. Hotel céntrico de primera categoría en El Cairo.",
      suppPerPax: 0
    },
    {
      category: "Categoría Premium / Lujo (C y D)",
      badge: "+120 € / PASAJERO",
      cairo: "Sheraton Cairo Hotel (Habitación Superior con Vistas al Nilo)",
      cruise: "Motonaves seleccionadas de categoría Gran Lujo 5★ Premium",
      desc: "Opción recomendada para viajeros exigentes. Cabinas de gran lujo con ventanales panorámicos y atención VIP a bordo.",
      suppPerPax: 120
    }
  ];

  // Base pricing
  const baseAdultPrice = 749;
  const baseKidPrice = 599;

  // Real-time economic calculations
  const hotelCategorySupplement = (selectedHotelCategory === "lujo" ? 120 : 0) * (calcAdults + calcKids);
  const basePackageTotal = (baseAdultPrice * calcAdults) + (baseKidPrice * calcKids);
  
  // Calculate selected excursions cost
  const excursionsTotal = selectedExcursions.reduce((sum, id) => {
    const item = excursionsData.find(x => x.id === id);
    if (!item) return sum;
    return sum + (item.adultPrice * calcAdults) + (item.kidPrice * calcKids);
  }, 0);

  // Total base gross of the trip
  const totalBasePrice = basePackageTotal + hotelCategorySupplement + excursionsTotal;

  // 1. Comisión pactada B2B cedida por Dynamic Tours a la minorista
  const commissionAmount = Math.round(totalBasePrice * (commissionRate / 100));

  // 2. Margen comercial añadido por la agencia sobre PVP (Mark-up)
  const markupAmount = Math.round(totalBasePrice * (markupPercent / 100));

  // 3. Gastos de gestión de agencia (Fee)
  const safeAgencyFee = Number(agencyFee) || 0;

  // Final coherent prices
  // Coste neto a liquidar a Dynamic Tours: base - comision
  const totalNetToWholesaler = totalBasePrice - commissionAmount;

  // PVP Final para el cliente (sin mostrar comisiones ni netos)
  const totalClientPVP = totalBasePrice + markupAmount + safeAgencyFee;

  // Beneficio total para la agencia
  const totalAgentBenefit = commissionAmount + markupAmount + safeAgencyFee;

  // Price per person for customer
  const totalPax = calcAdults + calcKids;
  const pricePerPaxClient = totalPax > 0 ? Math.round(totalClientPVP / totalPax) : totalClientPVP;

  // Handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAgencyLogo(base64);
        try {
          localStorage.setItem("dt_agency_logo", base64);
        } catch (err) {
          console.error(err);
        }
        setToastMessage("Logotipo de agencia actualizado correctamente.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveQuote = () => {
    const quoteId = `EGI-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuote: SavedQuote = {
      id: quoteId,
      title: "Leyendas de Egipto sin Abu Simbel",
      date: new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }),
      clientName: clientName.trim() || "Cliente Sin Asignar",
      adults: calcAdults,
      kids: calcKids,
      departureDate: departureDate,
      departureAirport: departureAirport,
      hotelCategory: selectedHotelCategory,
      excursions: [...selectedExcursions],
      commissionRate: commissionRate,
      markupPercent: markupPercent,
      agencyFee: safeAgencyFee,
      totalBase: totalBasePrice,
      totalNet: totalNetToWholesaler,
      totalRetail: totalClientPVP,
      agentProfit: totalAgentBenefit,
      agencyName: b2bAgencyName,
      agentName: b2bAgentName
    };

    setSavedQuotes(prev => [newQuote, ...prev]);
    setToastMessage(`Presupuesto #${quoteId} guardado con éxito.`);
  };

  const handleRestoreQuote = (quote: SavedQuote) => {
    setCalcAdults(quote.adults);
    setCalcKids(quote.kids);
    if (quote.departureDate) setDepartureDate(quote.departureDate);
    if (quote.departureAirport) setDepartureAirport(quote.departureAirport);
    setSelectedHotelCategory(quote.hotelCategory);
    setSelectedExcursions([...quote.excursions]);
    setCommissionRate(quote.commissionRate);
    setMarkupPercent(quote.markupPercent);
    setAgencyFee(quote.agencyFee);
    setClientName(quote.clientName);
    setActiveTab("quote");
    setShowSavedQuotesModal(false);
    setToastMessage(`Presupuesto #${quote.id} recuperado con todos sus datos e importes.`);
  };

  const handleDeleteSavedQuote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedQuotes(prev => prev.filter(q => q.id !== id));
    setToastMessage(`Presupuesto #${id} eliminado.`);
  };

  const handleConfirmBookingRequest = () => {
    const ref = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastBookingRef(ref);

    if (onAddBooking) {
      onAddBooking({
        clientName: clientName.trim() || "Familia / Viajeros Titulares",
        agencyName: b2bAgencyName,
        agentName: b2bAgentName,
        destination: "Leyendas de Egipto sin Abu Simbel",
        startDate: "2026-10-23",
        endDate: "2026-10-30",
        paxCount: totalPax,
        totalPriceNet: totalNetToWholesaler,
        totalPriceRetail: totalClientPVP,
        commissionPercent: commissionRate,
        status: "En Revisión"
      });
    }

    setShowBookingRequestModal(false);
    setToastMessage(`Solicitud de reserva #${ref} registrada con éxito en estado En Revisión.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 relative font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A0F1D] text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-[#52A72B] shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Floating Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        
        {/* Left: Volver a la Web button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A0F1D] hover:text-[#1F82D2] transition-all bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl px-4 py-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-[#1F82D2]" />
          <span>Volver a la Web</span>
        </button>

        {/* Center: Badge B2B */}
        <div className="hidden md:flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#52A72B] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Ficha B2B · Dynamic Tours
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 font-semibold px-2 py-0.5 rounded">
            Demostración
          </span>
        </div>

        {/* Right actions: Presupuestos Guardados & Cotizar */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowSavedQuotesModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
            title="Ver presupuestos guardados"
          >
            <Save className="w-3.5 h-3.5 text-[#1F82D2]" />
            <span className="hidden sm:inline">Presupuestos</span>
            <span className="bg-[#1F82D2]/10 text-[#1F82D2] px-1.5 py-0.2 rounded-full font-bold text-[10px]">
              {savedQuotes.length}
            </span>
          </button>

          {activeTab === "quote" ? (
            <button 
              type="button"
              onClick={() => setShowClientProposalModal(true)}
              className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>Ver Propuesta</span>
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => setActiveTab("quote")}
              className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-white" />
              <span>Cotizar Agente B2B</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Header Section (Clean dark contrast, NO white gradient fade at bottom) */}
      <div className="relative h-[440px] sm:h-[480px] w-full overflow-hidden bg-slate-950">
        <img 
          src={assetUrl("dia_5_guiza.jpg")} 
          alt="Pirámides de Guiza Egipto"
          className="w-full h-full object-cover object-center scale-100"
          loading="eager"
        />
        
        {/* Dark shading only where text sits for legibility (NO white gradient at bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent pointer-events-none" />
        
        {/* Top Badges */}
        <div className="absolute top-6 left-4 sm:left-10 flex flex-wrap items-center gap-2 z-10 pointer-events-none">
          <span className="bg-[#0A0F1D]/80 backdrop-blur-md text-[#1F82D2] border border-white/20 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg shadow-sm">
            SALIDAS PROGRAMADAS EN VIERNES
          </span>
          <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
            SALIDAS CHÁRTER VIERNES
          </span>
        </div>

        {/* Hero content positioning */}
        <div className="absolute bottom-6 left-4 sm:left-10 max-w-2xl text-left space-y-2.5 z-10">
          <div className="flex flex-wrap items-center gap-2.5 text-white/95">
            <span className="px-2.5 py-0.5 rounded bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
              CIRCUITO COMBINADO
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-white/90">
              <Clock className="w-3.5 h-3.5 text-[#1F82D2]" />
              <span>8 Días / 7 Noches</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-white/90">
              <Plane className="w-3.5 h-3.5 text-[#52A72B]" />
              <span>Chárter Directo + Doméstico</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            Leyendas de Egipto sin Abu Simbel
          </h1>
          
          <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-xl font-normal drop-shadow-sm">
            Crucero fluvial de 3 noches por el Nilo en pensión completa y 4 noches en El Cairo con desayunos. Visitas a los templos faraónicos y pirámides con egiptólogo nativo de habla hispana.
          </p>
        </div>

        {/* Floating Price Box (Desktop) */}
        <div className="absolute bottom-6 right-4 sm:right-10 text-right bg-white rounded-2xl p-5 shadow-2xl border border-slate-200/90 w-52 hidden md:block z-10">
          <span className="text-[10px] block uppercase leading-none pb-1 tracking-wider text-slate-400 font-bold">Tarifa Base Desde</span>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-3xl font-extrabold text-[#0A0F1D] leading-none">749 €</span>
            <span className="text-xs font-semibold text-slate-500">/pers.</span>
          </div>
          <p className="text-[10px] text-[#52A72B] font-bold uppercase tracking-wide mt-2">Tasas y carburante incluidos</p>
          {activeTab === "quote" ? (
            <button 
              type="button"
              onClick={() => setShowClientProposalModal(true)}
              className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl mt-3.5 shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>Ver Propuesta</span>
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => setActiveTab("quote")}
              className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl mt-3.5 shadow-xs transition-all cursor-pointer"
            >
              Cotizar Agente B2B
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Navigation Tabs & Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Navigation Tabs (Desktop: All 6 visible without horizontal scrolling; Mobile: horizontal scrollable) */}
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
                        ? "border-transparent text-slate-800 hover:text-[#1F82D2]"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? "text-[#1F82D2]" : tab.isHighlighted ? "text-[#1F82D2]" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="bg-[#1F82D2] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1 shrink-0">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB 1: ITINERARIO */}
          {activeTab === "itinerary" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-left space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-[#0A0F1D]">Ruta Detallada Día a Día</h3>
                  <p className="text-xs text-slate-500">8 días / 7 noches recorriendo Asuán, Kom Ombo, Edfu, Luxor y El Cairo</p>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">Salidas los viernes</span>
              </div>

              <div className="border-l-2 border-[#1F82D2]/30 ml-3 space-y-6">
                {itineraryDays.map((day) => {
                  const isExpanded = expandedDay === day.day;
                  return (
                    <div key={day.day} className="relative pl-6">
                      {/* Indicator bullet */}
                      <div className={`absolute -left-[11px] top-0 h-5 w-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                        isExpanded 
                          ? "bg-[#1F82D2] border-[#1F82D2] text-white" 
                          : "bg-white border-slate-300 text-slate-500"
                      }`}>
                        {day.day}
                      </div>

                      {/* Header */}
                      <div 
                        onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                        className="flex justify-between items-center cursor-pointer group"
                      >
                        <h4 className="text-sm sm:text-base font-bold text-[#0A0F1D] group-hover:text-[#1F82D2] transition-colors pr-4">
                          Día {day.day}: {day.title}
                        </h4>
                        <button className="text-slate-400 group-hover:text-[#1F82D2] shrink-0 p-1">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Content */}
                      {isExpanded && (
                        <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3.5 animate-in fade-in duration-150">
                          {day.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: QUÉ INCLUYE / QUÉ NO INCLUYE (Cleaned markdown asterisks) */}
          {activeTab === "inclusions" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-left space-y-8 animate-in fade-in duration-200">
              
              {/* Inclusiones */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-[#0A0F1D] flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#52A72B]" />
                  <span>El viaje INCLUYE:</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inclusionsList.map((item, idx) => (
                    <div key={idx} className="bg-emerald-50/50 border border-emerald-500/15 rounded-xl p-3 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#52A72B] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divisor */}
              <div className="border-t border-slate-100" />

              {/* Exclusiones con Alerta Clave (Sin asteriscos) */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-rose-700 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>El viaje NO incluye:</span>
                </h4>
                
                {/* Specific Abu Simbel Alert Banner */}
                <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-rose-950 uppercase tracking-wide">
                      Aviso Importante para la Agencia: Programa sin Abu Simbel
                    </h5>
                    <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                      Este itinerario base <strong>NO INCLUYE</strong> la visita a los Templos de Abu Simbel. Para incluirla contratada en origen, márcala en la pestaña de <strong>Visitas y Excursiones</strong> o en el cotizador (125 €/persona en autobús climatizado).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exclusionsList.map((item, idx) => (
                    <div key={idx} className="bg-rose-50/30 border border-rose-500/10 rounded-xl p-3 flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-600 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: VISITAS Y EXCURSIONES */}
          {activeTab === "visits" && (
            <div className="space-y-6 text-left animate-in fade-in duration-200">
              
              {/* Visitas Incluidas */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <h4 className="text-base font-bold text-[#0A0F1D] flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <CheckCircle className="w-5 h-5 text-[#52A72B] shrink-0" />
                  <span>Visitas Incluidas en el Programa (Sin coste adicional)</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4 space-y-2">
                    <span className="bg-[#1F82D2]/10 text-[#1F82D2] text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      EL CAIRO
                    </span>
                    <h5 className="font-bold text-sm text-[#0A0F1D]">Necrópolis de Guiza</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pirámides de Keops, Kefrén y Micerinos junto con el avistamiento de la Gran Esfinge y el Templo del Valle.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4 space-y-2">
                    <span className="bg-[#1F82D2]/10 text-[#1F82D2] text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      CRUCERO · LUXOR
                    </span>
                    <h5 className="font-bold text-sm text-[#0A0F1D]">Tebas y Templos</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Valle de los Reyes, Templo de Hatshepsut, Colosos de Memnón y templos sagrados de Karnak y Luxor.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4 space-y-2">
                    <span className="bg-[#1F82D2]/10 text-[#1F82D2] text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      CRUCERO · NILO & ASUÁN
                    </span>
                    <h5 className="font-bold text-sm text-[#0A0F1D]">Horus, Kom Ombo y Philae</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Templo de Horus en Edfu en calesa, Templo dual de Kom Ombo, Templo de Philae en lancha y paseo en faluca.
                    </p>
                  </div>
                </div>
              </div>

              {/* Excursiones Opcionales Disponibles con Selector */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-[#0A0F1D] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#1F82D2] shrink-0" />
                      <span>Excursiones Opcionales para Añadir a la Cotización</span>
                    </h4>
                    <p className="text-xs text-slate-500">Marca las excursiones que solicite tu viajero para incluirlas en el presupuesto</p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#1F82D2] bg-[#1F82D2]/10 px-2.5 py-1 rounded-lg w-max">
                    {selectedExcursions.length} de {excursionsData.length} seleccionadas
                  </span>
                </div>

                <div className="space-y-3">
                  {excursionsData.map((item) => {
                    const isSelected = selectedExcursions.includes(item.id);
                    return (
                      <div 
                        key={item.id}
                        className={`border rounded-xl p-3.5 transition-all flex items-start sm:items-center justify-between gap-3 bg-white ${
                          isSelected ? "border-[#1F82D2] ring-1 ring-[#1F82D2]/30 bg-blue-50/20" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <input 
                            type="checkbox"
                            id={`excursion-${item.id}`}
                            checked={isSelected}
                            onChange={() => {
                              if (isSelected) {
                                setSelectedExcursions(selectedExcursions.filter(x => x !== item.id));
                              } else {
                                setSelectedExcursions([...selectedExcursions, item.id]);
                              }
                            }}
                            className="w-4.5 h-4.5 mt-0.5 text-[#1F82D2] rounded border-slate-300 focus:ring-[#1F82D2] cursor-pointer"
                          />
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                              <label htmlFor={`excursion-${item.id}`} className="font-bold text-xs sm:text-sm text-[#0A0F1D] hover:text-[#1F82D2] cursor-pointer truncate">
                                {item.title}
                              </label>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">{item.desc}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="text-sm font-extrabold text-[#0A0F1D]">{item.adultPrice} €</span>
                            <span className="text-[10px] text-slate-400 block leading-none">por persona</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setViewingExcursionId(item.id)}
                            className="text-xs font-semibold text-[#1F82D2] hover:underline p-1 cursor-pointer"
                          >
                            Ver detalle
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom CTA to quote */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-600">
                    <span>Suplemento actual de opcionales seleccionadas: </span>
                    <strong className="text-[#0A0F1D] text-sm">{excursionsTotal} €</strong>
                    <span className="text-slate-400 text-[11px]"> ({calcAdults} adultos {calcKids > 0 ? `+ ${calcKids} niños` : ""})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("quote")}
                    className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    Preparar Cotización B2B
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: HOTELES PREVISTOS */}
          {activeTab === "hotels" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-left space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-[#0A0F1D] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#1F82D2]" />
                  <span>Alojamientos Previstos (Crucero Nilo 5★ y Hotel El Cairo 5★)</span>
                </h3>
                <p className="text-xs text-slate-500">Motonaves fluviales y hoteles seleccionados previstos o de categoría similar</p>
              </div>

              <div className="space-y-4">
                {hotelDetails.map((category, idx) => {
                  const isCatSelected = (idx === 0 && selectedHotelCategory === "standard") || (idx === 1 && selectedHotelCategory === "lujo");
                  return (
                    <div 
                      key={idx} 
                      className={`border rounded-2xl p-5 space-y-3.5 transition-all ${
                        isCatSelected ? "border-[#1F82D2] ring-1 ring-[#1F82D2]/30 bg-blue-50/15" : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <span className="font-bold text-sm text-[#0A0F1D]">{category.category}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded ${
                            idx === 0 ? "bg-slate-100 text-slate-600" : "bg-[#1F82D2]/10 text-[#1F82D2]"
                          }`}>
                            {category.badge}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedHotelCategory(idx === 0 ? "standard" : "lujo")}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                              isCatSelected 
                                ? "bg-[#1F82D2] text-white" 
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {isCatSelected ? "Categoría Seleccionada" : "Seleccionar"}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Estancia en El Cairo (4 Noches)</span>
                          <p className="font-bold text-slate-800">{category.cairo}</p>
                          <p className="text-[11px] text-slate-500 mt-1">Régimen: Alojamiento y Desayuno buffet.</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Crucero por el Nilo (3 Noches)</span>
                          <p className="font-bold text-slate-800">{category.cruise}</p>
                          <p className="text-[11px] text-slate-500 mt-1">Régimen: Pensión Completa a bordo.</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {category.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                <p>
                  Las motonaves del Nilo (Princess du Nile o Princess Sarah) cuentan con cabinas climatizadas de 18 m² con amplios ventanales sobre el río, caja fuerte y baño completo. En El Cairo, Sheraton Cairo Hotel & Casino ofrece una ubicación idónea junto al Nilo. La motonave y hotel definitivos se confirman 7 días antes de la salida.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: VUELOS */}
          {activeTab === "flights" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-left space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-[#0A0F1D] flex items-center gap-2">
                    <Plane className="w-5 h-5 text-[#1F82D2]" />
                    <span>Operativa de Vuelos</span>
                  </h3>
                  <p className="text-xs text-slate-500">Vuelos chárter directos en viernes desde España (programación de referencia)</p>
                </div>
                <span className="text-xs font-bold text-[#52A72B] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  Equipaje 20 kg incluido
                </span>
              </div>

              <div className="space-y-3">
                {flightDetails.map((f, i) => (
                  <div key={i} className="border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50/50">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F82D2] bg-[#1F82D2]/10 px-2 py-0.5 rounded">
                        {f.title}
                      </span>
                      <h4 className="text-sm font-bold text-[#0A0F1D] mt-1">{f.route}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{f.baggage}</p>
                    </div>

                    <div className="text-left sm:text-right text-xs">
                      <span className="font-bold text-slate-700 block">{f.type}</span>
                      <span className="text-slate-500 text-[11px]">Operación: {f.day}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                <p>
                  Salidas programadas los viernes desde Madrid-Barajas y Barcelona-El Prat (otras ciudades según operativa de temporada). Información aérea de referencia sujeta a confirmación de plazas y horarios por parte de la mayorista. Tasas de aeropuerto y suplemento de carburante ya calculados e incluidos en la cotización base.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: COTIZACIÓN B2B INTEGRADA (El corazón del recorrido del agente) */}
          {activeTab === "quote" && (
            <div className="space-y-6 text-left animate-in fade-in duration-200">
              
              {/* Header de Cotización B2B con Conmutador de Modo Mostrador */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      ENTORNO PROFESIONAL B2B
                    </span>
                    <span className="text-[10px] font-semibold text-[#52A72B] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Datos de Demostración
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A0F1D] mt-1">
                    Cotización Dinámica · Leyendas de Egipto
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ajusta los viajeros, opcionales y política de margen para emitir la propuesta a tu cliente.
                  </p>
                </div>

                {/* Controls: Modo Mostrador & Personalizar */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Modo Mostrador Switch */}
                  <button
                    type="button"
                    onClick={() => setCounterMode(!counterMode)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      counterMode 
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs" 
                        : "bg-slate-100 hover:bg-slate-200/70 text-slate-700 border-slate-200"
                    }`}
                    title={counterMode ? "Actualmente en Modo Mostrador (márgenes ocultos)" : "Actualmente en Modo Agente (márgenes visibles)"}
                  >
                    {counterMode ? <EyeOff className="w-3.5 h-3.5 text-white" /> : <Eye className="w-3.5 h-3.5 text-[#1F82D2]" />}
                    <span>{counterMode ? "Modo Mostrador Activo" : "Activar Modo Mostrador"}</span>
                  </button>

                  {/* Personalizar Agencia */}
                  <button
                    type="button"
                    onClick={() => setShowAgencySettingsModal(true)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Tu Agencia</span>
                  </button>
                </div>
              </div>

              {/* Aviso si Modo Mostrador está activo */}
              {counterMode && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3.5 text-xs flex items-center justify-between gap-3 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Modo Mostrador activado:</strong> La pantalla oculta precios netos, comisiones mayoristas y margen interno. Puedes mostrarla con tranquilidad frente a tu cliente.</span>
                  </div>
                  <button 
                    onClick={() => setCounterMode(false)}
                    className="text-xs font-bold text-emerald-700 underline shrink-0 cursor-pointer"
                  >
                    Desactivar
                  </button>
                </div>
              )}

              {/* Grid: Configuración & Desglose Financiero */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Bloque 1: Parámetros del Viaje */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#1F82D2]" />
                    <span>1. Viajeros y Salida</span>
                  </h4>

                  {/* Nombre Cliente */}
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Nombre del Cliente / Titular</label>
                    <input 
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ej. Familia Gómez Rivas"
                      className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                    />
                  </div>

                  {/* Viajeros Adultos y Niños */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">Adultos</span>
                        <span className="text-xs font-bold text-slate-800">{calcAdults} pers.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => setCalcAdults(Math.max(1, calcAdults - 1))}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs hover:bg-slate-100"
                        >-</button>
                        <button 
                          onClick={() => setCalcAdults(calcAdults + 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs hover:bg-slate-100"
                        >+</button>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">Niños (2-11)</span>
                        <span className="text-xs font-bold text-slate-800">{calcKids} pers.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => setCalcKids(Math.max(0, calcKids - 1))}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs hover:bg-slate-100"
                        >-</button>
                        <button 
                          onClick={() => setCalcKids(calcKids + 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs hover:bg-slate-100"
                        >+</button>
                      </div>
                    </div>
                  </div>

                  {/* Fecha de Salida */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-600">Fecha de Salida</label>
                      <span className="text-[10px] text-slate-400 font-medium">Salidas en viernes · Datos de ejemplo</span>
                    </div>
                    <select
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                    >
                      <option value="Viernes, 23 de Octubre de 2026">Viernes, 23 de Octubre de 2026</option>
                      <option value="Viernes, 30 de Octubre de 2026">Viernes, 30 de Octubre de 2026</option>
                      <option value="Viernes, 06 de Noviembre de 2026">Viernes, 06 de Noviembre de 2026</option>
                      <option value="Viernes, 13 de Noviembre de 2026">Viernes, 13 de Noviembre de 2026</option>
                      <option value="Viernes, 20 de Noviembre de 2026">Viernes, 20 de Noviembre de 2026</option>
                    </select>
                  </div>

                  {/* Aeropuerto de Salida */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-600">Aeropuerto de Salida</label>
                      <span className="text-[10px] text-slate-400 font-medium">Operativa de ejemplo</span>
                    </div>
                    <select
                      value={departureAirport}
                      onChange={(e) => setDepartureAirport(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                    >
                      <option value="Madrid (MAD) - Chárter directo">Madrid (MAD) - Chárter directo</option>
                      <option value="Barcelona (BCN) - Chárter directo">Barcelona (BCN) - Chárter directo</option>
                      <option value="Bilbao (BIO) - Operativa especial">Bilbao (BIO) - Operativa especial</option>
                      <option value="Málaga (AGP) - Operativa especial">Málaga (AGP) - Operativa especial</option>
                      <option value="Valencia (VLC) - Operativa especial">Valencia (VLC) - Operativa especial</option>
                    </select>
                  </div>

                  {/* Categoría Hotelera */}
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Categoría Hotelera Seleccionada</label>
                    <select
                      value={selectedHotelCategory}
                      onChange={(e) => setSelectedHotelCategory(e.target.value as any)}
                      className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                    >
                      <option value="standard">Standard / Superior 5★ (Sheraton Cairo + Princess Sarah) - Sin suplemento</option>
                      <option value="lujo">Premium / Gran Lujo 5★ (Vistas al Nilo + Barco Lujo) - +120 €/persona</option>
                    </select>
                  </div>

                  {/* Excursiones Contratadas Resumen */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-600">Excursiones Opcionales ({selectedExcursions.length})</label>
                      <button 
                        type="button"
                        onClick={() => setActiveTab("visits")}
                        className="text-[11px] text-[#1F82D2] hover:underline font-bold"
                      >
                        Modificar en catálogo
                      </button>
                    </div>
                    {selectedExcursions.length === 0 ? (
                      <p className="text-xs text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-dashed border-slate-200">
                        Ninguna excursión opcional seleccionada. Puedes añadirlas desde la pestaña «Visitas y Excursiones».
                      </p>
                    ) : (
                      <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 text-xs">
                        {selectedExcursions.map(id => {
                          const item = excursionsData.find(x => x.id === id);
                          if (!item) return null;
                          const cost = (item.adultPrice * calcAdults) + (item.kidPrice * calcKids);
                          return (
                            <div key={id} className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                              <span className="font-medium text-slate-700 truncate pr-2">{item.title}</span>
                              <span className="font-bold text-slate-900 shrink-0">+{cost} €</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>

                {/* Bloque 2: Política de Márgenes y Desglose Financiero */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#52A72B]" />
                    <span>2. Desglose Comercial y Margen</span>
                  </h4>

                  {/* Si está en Modo Agente: muestra controles de comisión y markup */}
                  {!counterMode ? (
                    <div className="space-y-3.5">
                      {/* Comisión de ejemplo (Simulación) */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-semibold text-slate-700 flex items-center gap-1">
                              <Percent className="w-3.5 h-3.5 text-[#1F82D2]" />
                              Comisión de ejemplo
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              Simulación para cálculo de neto mayorista
                            </span>
                          </div>
                          <span className="font-extrabold text-[#52A72B]">{commissionAmount} € ({commissionRate}%)</span>
                        </div>
                        <div className="flex gap-1.5 mt-2">
                          {[10, 12, 15].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setCommissionRate(val)}
                              className={`flex-1 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                commissionRate === val 
                                  ? "bg-[#0A0F1D] text-white border-[#0A0F1D]" 
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {val}% (Simulada)
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">
                          Porcentaje a título demostrativo, no contractual. Sujeto a las condiciones comerciales acordadas con Dynamic Tours.
                        </p>
                      </div>

                      {/* Margen añadido (Mark-up) */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700 flex items-center gap-1">
                            <Sliders className="w-3.5 h-3.5 text-[#1F82D2]" />
                            Margen Añadido (Mark-up PVP)
                          </span>
                          <span className="font-bold text-[#0A0F1D]">+{markupAmount} € ({markupPercent}%)</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="20"
                          step="1"
                          value={markupPercent}
                          onChange={(e) => setMarkupPercent(Number(e.target.value))}
                          className="w-full accent-[#1F82D2] cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>0% (Tarifa Catálogo)</span>
                          <span>5% (Sugerido)</span>
                          <span>20% (Máx)</span>
                        </div>
                      </div>

                      {/* Gastos de gestión (Fee) */}
                      <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-xs font-semibold text-slate-700">Gastos de Gestión de Agencia (Fee)</span>
                        <div className="flex items-center gap-1 w-24">
                          <input 
                            type="number"
                            min="0"
                            max="200"
                            value={agencyFee}
                            onChange={(e) => setAgencyFee(Number(e.target.value))}
                            className="w-full text-xs font-bold text-right px-2 py-1 bg-white border border-slate-200 rounded-lg"
                          />
                          <span className="text-xs font-bold text-slate-500">€</span>
                        </div>
                      </div>

                      {/* Resumen Interno de Rentabilidad */}
                      <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Neto a liquidar a Dynamic Tours:</span>
                          <strong className="text-slate-900">{totalNetToWholesaler} €</strong>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Margen Total para tu Agencia:</span>
                          <strong className="text-[#52A72B]">{totalAgentBenefit} €</strong>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* En Modo Mostrador: Resumen limpio sin comisiones */
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-700 font-bold border-b border-slate-200 pb-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Resumen de Servicios para el Cliente</span>
                      </div>
                      <div className="space-y-1.5 text-slate-600">
                        <div className="flex justify-between">
                          <span>Paquete Base ({calcAdults} adultos {calcKids > 0 ? `+ ${calcKids} niños` : ""}):</span>
                          <strong className="text-slate-800">{basePackageTotal} €</strong>
                        </div>
                        {selectedHotelCategory === "lujo" && (
                          <div className="flex justify-between">
                            <span>Suplemento Hoteles Premium / Lujo 5★:</span>
                            <strong className="text-slate-800">+{hotelCategorySupplement} €</strong>
                          </div>
                        )}
                        {excursionsTotal > 0 && (
                          <div className="flex justify-between">
                            <span>Excursiones Opcionales Seleccionadas:</span>
                            <strong className="text-slate-800">+{excursionsTotal} €</strong>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Tasas Aéreas y Carburante:</span>
                          <span className="text-emerald-700 font-semibold">Incluidas</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PVP Final Destacado (Visible en ambos modos de forma 100% idéntica) */}
                  <div className="bg-[#0A0F1D] text-white p-4 rounded-xl text-left shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F82D2] block">
                      PVP Total Final (Tasas e Impuestos Incluidos)
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white">
                        {totalClientPVP} €
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        aprox. {pricePerPaxClient} € / persona
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Botones de Acción del Recorrido B2B */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Cotización lista: </span>
                  <span>{totalPax} viajeros · {totalClientPVP} € PVP</span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* 1. Guardar Presupuesto */}
                  <button
                    type="button"
                    onClick={handleSaveQuote}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-2xs transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-[#1F82D2]" />
                    <span>Guardar Presupuesto</span>
                  </button>

                  {/* 2. Generar Propuesta Cliente (PDF) */}
                  <button
                    type="button"
                    onClick={() => setShowClientProposalModal(true)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 shadow-xs transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-white" />
                    <span>Generar Propuesta Cliente (PDF)</span>
                  </button>

                  {/* 3. Solicitar Reserva a Dynamic Tours */}
                  <button
                    type="button"
                    onClick={() => setShowBookingRequestModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0A0F1D] hover:bg-[#132338] text-white shadow-2xs transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#52A72B]" />
                    <span>Solicitar Reserva a Dynamic</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 text-left">
          
          {/* Card Resumen de Operativa y Reserva */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-[#1F82D2] uppercase tracking-wider block mb-0.5">RESUMEN DEL PROGRAMA</span>
              <h4 className="text-base font-bold text-[#0A0F1D]">Leyendas de Egipto</h4>
              <p className="text-xs text-slate-500">Crucero Nilo 3N + Cairo 4N (Sin Abu Simbel de base)</p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Duración:</span>
                <strong className="text-slate-800">8 Días / 7 Noches</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Salida:</span>
                <strong className="text-slate-800">{departureAirport.split(" - ")[0]} ({departureDate.split(", ")[1]?.replace(" de 2026", "") || "Viernes"})</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Régimen:</span>
                <strong className="text-slate-800">PC Crucero + AD Cairo</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Opcionales marcadas:</span>
                <strong className="text-[#1F82D2]">{selectedExcursions.length} añadidas</strong>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Cotizado</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#0A0F1D]">{totalClientPVP} €</span>
                <span className="text-xs text-slate-500">PVP ({totalPax} pax)</span>
              </div>
            </div>

            {activeTab === "quote" ? (
              <button 
                type="button"
                onClick={() => setShowClientProposalModal(true)}
                className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-white" />
                <span>Ver Propuesta Cliente (PDF)</span>
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => setActiveTab("quote")}
                className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-xs transition-all cursor-pointer text-center block"
              >
                Iniciar Cotización B2B
              </button>
            )}
          </div>

          {/* Tarjeta de Garantía y Contacto Exclusivo de Agencias */}
          <div className="bg-slate-100/80 rounded-2xl border border-slate-200/90 p-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1F82D2]" />
              <h5 className="text-xs font-bold text-[#0A0F1D] uppercase tracking-wider">Mesa de Reservas Egipto</h5>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Atención directa y soporte para agencias minoristas colaboradoras. Consultas sobre cupos, operativas chárter y peticiones especiales de grupos.
            </p>
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-[#1F82D2]" />
                <span className="font-bold">+34 91 542 2211</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-[#52A72B]" />
                <span>egipto@dynamic-tours.com</span>
              </div>
            </div>
          </div>

          {/* Presupuestos Guardados Widget Rápido */}
          {savedQuotes.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#0A0F1D] flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5 text-[#1F82D2]" />
                  Últimos Presupuestos
                </span>
                <button 
                  onClick={() => setShowSavedQuotesModal(true)}
                  className="text-[11px] text-[#1F82D2] hover:underline font-semibold"
                >
                  Ver todos
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                {savedQuotes.slice(0, 2).map((q) => (
                  <div 
                    key={q.id}
                    onClick={() => handleRestoreQuote(q)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-all cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-slate-800 text-[11.5px] truncate max-w-[130px]">{q.clientName}</p>
                      <p className="text-[10px] text-slate-400">{q.date} · {q.adults + q.kids} pax</p>
                    </div>
                    <span className="font-bold text-[#0A0F1D] text-xs">{q.totalRetail} €</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL 1: PROPUESTA CLIENTE IMPRIMIBLE / PDF (Sin datos netos ni comisiones) */}
      {showClientProposalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto no-print">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-left flex flex-col">
            
            {/* Modal Actions Header */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between sticky top-0 z-10 no-print">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#1F82D2]" />
                <span className="text-xs font-bold text-[#0A0F1D]">Propuesta de Viaje Combinado (Cliente Final)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-white" />
                  <span>Imprimir / Guardar en PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowClientProposalModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body (Formatted for printing and screen presentation) */}
            <div id="printable-client-proposal" className="p-6 sm:p-8 space-y-6 text-slate-800 bg-white">
              
              {/* Header with Agency Branding & Co-branding */}
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5">
                <div className="space-y-1">
                  {agencyLogo ? (
                    <img src={agencyLogo} alt="Logo Agencia" className="h-10 max-w-[180px] object-contain mb-1" />
                  ) : (
                    <div className="flex items-center gap-1.5 text-base font-extrabold text-[#0A0F1D] uppercase tracking-wider">
                      <Building2 className="w-4 h-4 text-[#1F82D2]" />
                      <span>{b2bAgencyName}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-slate-500 font-medium">Asesor: <strong>{b2bAgentName}</strong> · Licencia: {agencyLic}</p>
                  <p className="text-[10px] text-slate-400">Contacto: {agencyPhone} · {agencyEmail}</p>
                </div>

                <div className="text-right space-y-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block">PRESUPUESTO PERSONALIZADO</span>
                  <p className="text-xs font-bold text-slate-700">Ref: PROP-{Math.floor(1000 + Math.random() * 9000)}</p>
                  <p className="text-[11px] text-slate-500">Fecha: {new Date().toLocaleDateString("es-ES")}</p>
                  <span className="text-[9.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-block">
                    Válido 15 días
                  </span>
                </div>
              </div>

              {/* Title & Beneficiary */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0F1D] tracking-tight">
                    Leyendas de Egipto sin Abu Simbel
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                    8 Días / 7 Noches
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Titular del Viaje</span>
                    <strong className="text-slate-800 truncate block">{clientName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Número de Viajeros</span>
                    <strong className="text-slate-800">{calcAdults} Adultos {calcKids > 0 ? `+ ${calcKids} Niños` : ""}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Fecha de Salida</span>
                    <strong className="text-slate-800">{departureDate}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Aeropuerto Salida</span>
                    <strong className="text-slate-800">{departureAirport.split(" - ")[0]}</strong>
                  </div>
                </div>
              </div>

              {/* Itinerario Resumido */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Itinerario del Viaje
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {itineraryDays.map(d => (
                    <div key={d.day} className="p-2 rounded-lg bg-slate-50/70 border border-slate-100">
                      <span className="font-bold text-[#1F82D2] mr-1.5">Día {d.day}:</span>
                      <strong className="text-slate-800">{d.title}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alojamientos & Vuelos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Alojamientos 5★ Previstos o Similares</span>
                  <p className="text-slate-700"><strong>Crucero Nilo (3N):</strong> Motonave Princess du Nile 5★ o Princess Sarah 5★ (Pensión Completa).</p>
                  <p className="text-slate-700"><strong>El Cairo (4N):</strong> Sheraton Cairo Hotel & Casino 5★ (Alojamiento y Desayuno).</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Vuelos Chárter y Domésticos</span>
                  <p className="text-slate-700">Vuelo chárter directo especial los viernes: salida desde {departureAirport} a Asuán / El Cairo a España.</p>
                  <p className="text-slate-700">Vuelo regular doméstico Luxor a El Cairo. Franquicia de 20 kg en bodega incluida.</p>
                </div>
              </div>

              {/* Servicios Incluidos */}
              <div className="space-y-1.5 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Servicios y Visitas Incluidas
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-600 text-[11.5px]">
                  <li>• Vuelos internacionales y domésticos con tasas aéreas y carburante.</li>
                  <li>• Guía egiptólogo de habla hispana exclusivo durante todas las excursiones.</li>
                  <li>• Pirámides de Guiza, Gran Esfinge y Templo del Valle en El Cairo.</li>
                  <li>• Templos de Karnak y Luxor, Valle de los Reyes y Colosos de Memnón.</li>
                  <li>• Templo de Horus en Edfu en calesa, Kom Ombo y Philae en Asuán en lancha.</li>
                  <li>• Paseo tradicional en faluca por el río Nilo.</li>
                  <li>• Traslados y asistencias en aeropuertos con vehículos climatizados.</li>
                  <li>• Seguro básico de asistencia en viaje.</li>
                </ul>
              </div>

              {/* Excursiones Opcionales Contratadas en este Presupuesto */}
              {selectedExcursions.length > 0 && (
                <div className="space-y-2 text-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    Excursiones Opcionales Contratadas
                  </h4>
                  <div className="space-y-1.5">
                    {selectedExcursions.map(id => {
                      const item = excursionsData.find(x => x.id === id);
                      if (!item) return null;
                      const sub = (item.adultPrice * calcAdults) + (item.kidPrice * calcKids);
                      return (
                        <div key={id} className="p-2.5 rounded-lg bg-blue-50/40 border border-blue-200/60 flex justify-between items-center text-xs">
                          <div>
                            <strong className="text-slate-900">{item.title}</strong>
                            <p className="text-[11px] text-slate-500">{item.desc}</p>
                          </div>
                          <span className="font-bold text-[#0A0F1D] shrink-0 ml-3">{sub} €</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pagos en destino */}
              <div className="bg-amber-50/60 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 space-y-1">
                <span className="font-bold block">Gastos y trámites obligatorios a abonar en destino:</span>
                <p className="text-[11px] text-amber-800">
                  • Cuota de servicios, tasas de navegación y propinas de crucero/chófer: 75 € por persona a la llegada.
                  <br />
                  • Visado de entrada a Egipto: 25 € por persona (o tramitación electrónica previa).
                </p>
              </div>

              {/* Desglose Económico para el Cliente (TOTALMENTE LIMPIO, CERO DATOS INTERNOS) */}
              <div className="border-t-2 border-slate-900 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Paquete Combinado Base ({calcAdults} Adultos {calcKids > 0 ? `+ ${calcKids} Niños` : ""}):</span>
                  <strong>{basePackageTotal} €</strong>
                </div>
                {selectedHotelCategory === "lujo" && (
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Suplemento Hoteles Premium / Gran Lujo 5★:</span>
                    <strong>+{hotelCategorySupplement} €</strong>
                  </div>
                )}
                {excursionsTotal > 0 && (
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Suplemento de Excursiones Opcionales Contratadas:</span>
                    <strong>+{excursionsTotal} €</strong>
                  </div>
                )}
                {safeAgencyFee > 0 && (
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Gastos de gestión de expediente:</span>
                    <strong>+{safeAgencyFee} €</strong>
                  </div>
                )}

                <div className="bg-[#0A0F1D] text-white p-4 rounded-xl flex items-center justify-between mt-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F82D2] block">
                      IMPORTE TOTAL DEL VIAJE COMBINADO
                    </span>
                    <span className="text-[10px] text-slate-400">Tasas aéreas, carburante e impuestos incluidos</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white leading-none block">
                      {totalClientPVP} €
                    </span>
                    <span className="text-xs text-slate-300">({pricePerPaxClient} € / persona)</span>
                  </div>
                </div>
              </div>

              {/* Footer legal */}
              <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-2">
                <p>Programa operado con el respaldo mayorista de <strong>Dynamic Tours S.A.</strong> (Licencia CICMA 1948).</p>
                <p>Presupuesto emitido para {clientName} por {b2bAgencyName}.</p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: GESTOR DE PRESUPUESTOS GUARDADOS */}
      {showSavedQuotesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 text-left flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4 text-[#1F82D2]" />
                <h3 className="text-sm font-bold text-[#0A0F1D]">Presupuestos Guardados ({savedQuotes.length})</h3>
              </div>
              <button 
                onClick={() => setShowSavedQuotesModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
              {savedQuotes.length === 0 ? (
                <div className="text-center py-8 space-y-2 text-slate-400">
                  <Save className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs font-semibold">No tienes presupuestos guardados de este viaje.</p>
                  <p className="text-[11px]">Prepara una cotización y pulsa «Guardar Presupuesto» para recuperarla en cualquier momento.</p>
                </div>
              ) : (
                savedQuotes.map((q) => (
                  <div 
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-[#1F82D2] transition-all bg-white hover:bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#0A0F1D]">{q.clientName}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.2 rounded font-semibold">#{q.id}</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {q.date} · {q.adults} ad. {q.kids > 0 ? `+ ${q.kids} ñ.` : ""} · {q.departureAirport ? q.departureAirport.split(" - ")[0] : "Madrid"} · {q.excursions.length} opc.
                      </p>
                      <p className="text-xs font-extrabold text-[#0A0F1D]">
                        Total PVP: <span className="text-[#1F82D2]">{q.totalRetail} €</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleRestoreQuote(q)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A0F1D] hover:bg-[#132338] text-white transition-all cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3 text-[#52A72B]" />
                        <span>Recuperar</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteSavedQuote(q.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Eliminar presupuesto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-right">
              <button
                type="button"
                onClick={() => setShowSavedQuotesModal(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PERSONALIZACIÓN DE AGENCIA (Logotipo y Datos Minoristas) */}
      {showAgencySettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 text-left flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#1F82D2]" />
                <h3 className="text-sm font-bold text-[#0A0F1D]">Datos Comerciales de tu Agencia</h3>
              </div>
              <button 
                onClick={() => setShowAgencySettingsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre Comercial de la Agencia</label>
                <input 
                  type="text"
                  value={b2bAgencyName}
                  onChange={(e) => {
                    setB2bAgencyName(e.target.value);
                    localStorage.setItem("dt_agency_name", e.target.value);
                  }}
                  className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nombre del Asesor</label>
                  <input 
                    type="text"
                    value={b2bAgentName}
                    onChange={(e) => {
                      setB2bAgentName(e.target.value);
                      localStorage.setItem("dt_agent_name", e.target.value);
                    }}
                    className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Licencia (CICMA/CV)</label>
                  <input 
                    type="text"
                    value={agencyLic}
                    onChange={(e) => {
                      setAgencyLic(e.target.value);
                      localStorage.setItem("dt_agency_lic", e.target.value);
                    }}
                    className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Teléfono Contacto</label>
                  <input 
                    type="text"
                    value={agencyPhone}
                    onChange={(e) => {
                      setAgencyPhone(e.target.value);
                      localStorage.setItem("dt_agency_phone", e.target.value);
                    }}
                    className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email de Contacto</label>
                  <input 
                    type="text"
                    value={agencyEmail}
                    onChange={(e) => {
                      setAgencyEmail(e.target.value);
                      localStorage.setItem("dt_agency_email", e.target.value);
                    }}
                    className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1F82D2]"
                  />
                </div>
              </div>

              {/* Logotipo upload */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Logotipo para la Propuesta en PDF</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-[#1F82D2] rounded-xl p-4 text-center cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all space-y-1.5"
                >
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {agencyLogo ? (
                    <div className="space-y-2">
                      <img src={agencyLogo} alt="Logo" className="h-10 mx-auto object-contain bg-white p-1 rounded border border-slate-200" />
                      <span className="text-[11px] font-bold text-[#1F82D2] block">Haz clic para cambiar el logotipo</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mx-auto text-slate-400" />
                      <p className="font-semibold text-slate-700">Subir logotipo de la agencia</p>
                      <p className="text-[10px] text-slate-400">PNG o JPG con fondo transparente recomendado</p>
                    </>
                  )}
                </div>
              </div>

            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-right">
              <button
                type="button"
                onClick={() => {
                  setShowAgencySettingsModal(false);
                  setToastMessage("Datos de agencia actualizados.");
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110"
              >
                Guardar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: SOLICITUD DE RESERVA A DYNAMIC TOURS */}
      {showBookingRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 text-left flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#52A72B]" />
                <h3 className="text-sm font-bold text-[#0A0F1D]">Solicitud de Reserva · Dynamic Tours</h3>
              </div>
              <button 
                onClick={() => setShowBookingRequestModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-slate-700 space-y-1">
                <span className="font-bold text-xs text-[#0A0F1D] block">Resumen de la Petición Mayorista</span>
                <p>• <strong>Viaje:</strong> Leyendas de Egipto sin Abu Simbel (8D/7N)</p>
                <p>• <strong>Viajeros:</strong> {calcAdults} Adultos {calcKids > 0 ? `+ ${calcKids} Niños` : ""} (Titular: {clientName})</p>
                <p>• <strong>Fecha Prevista:</strong> {departureDate}</p>
                <p>• <strong>Aeropuerto de Salida:</strong> {departureAirport}</p>
                <p>• <strong>Opcionales incluidas:</strong> {selectedExcursions.length > 0 ? selectedExcursions.map(id => excursionsData.find(x => x.id === id)?.title).join(", ") : "Ninguna"}</p>
                <p>• <strong>Importe Liquidación Neta a Dynamic:</strong> <strong className="text-slate-900">{totalNetToWholesaler} €</strong></p>
                <p>• <strong>PVP Venta Cliente:</strong> <strong className="text-[#1F82D2]">{totalClientPVP} €</strong></p>
              </div>

              {/* Honest B2B Disclaimer required by user */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <Info className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Estado de la Solicitud: En Revisión</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Esta acción registrará el expediente de reserva en tu panel con estado <strong>En Revisión</strong>. La asignación definitiva de cupos de vuelo chárter y cabina en motonave requiere la validación operativa por parte del departamento de reservas de Dynamic Tours. No se realizará ningún cobro ni emisión de billetes hasta la confirmación formal por parte del operador.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowBookingRequestModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmBookingRequest}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 shadow-xs"
              >
                Confirmar Petición Mayorista
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: DETALLE DE EXCURSIÓN */}
      {viewingExcursionId && (() => {
        const item = excursionsData.find(x => x.id === viewingExcursionId);
        if (!item) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] text-left">
              <div className="bg-[#0A0F1D] text-white p-4.5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-[#1F82D2] tracking-wider uppercase block">{item.category}</span>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                </div>
                <button 
                  onClick={() => setViewingExcursionId(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-4">
                {item.image && (
                  <div className="w-full h-48 overflow-hidden rounded-xl border border-slate-200">
                    <img src={assetUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Descripción del Servicio</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    {item.detailedDesc || item.desc}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Tarifa Adulto</span>
                    <strong className="text-base font-bold text-[#0A0F1D]">{item.adultPrice} €</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Tarifa Niño</span>
                    <strong className="text-base font-bold text-[#0A0F1D]">{item.kidPrice} €</strong>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => {
                    const isSelected = selectedExcursions.includes(item.id);
                    if (isSelected) {
                      setSelectedExcursions(selectedExcursions.filter(x => x !== item.id));
                    } else {
                      setSelectedExcursions([...selectedExcursions, item.id]);
                    }
                    setViewingExcursionId(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedExcursions.includes(item.id)
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white hover:brightness-110"
                  }`}
                >
                  {selectedExcursions.includes(item.id) ? "Quitar de la Cotización" : "Añadir a la Cotización"}
                </button>
                <button 
                  type="button"
                  onClick={() => setViewingExcursionId(null)}
                  className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
