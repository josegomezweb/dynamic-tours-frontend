export interface DestinationHero {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  category: string;
  tag: string;
  duration: string;
  flights: string;
  hotels: string;
  price: number;
  currency: string;
  accentColor: string; // Hex for ambient glow
  bgGradient: string;
  image: string;
  description: string;
  highlights: string[];
}

export const DESTINATIONS_HERO: DestinationHero[] = [
  {
    id: "egipto-leyendas",
    title: "Leyendas de los Faraones & Crucero Nilo",
    subtitle: "El Cairo, Luxor, Edfu, Kom Ombo y Asuán",
    country: "Egipto",
    category: "Crucero & Cultura",
    tag: "Salidas Especiales Chárter",
    duration: "8 Días / 7 Noches",
    flights: "Chárter directo Madrid / Provincias",
    hotels: "5★ Lujo Superior + Mota Nilo 5★",
    price: 1195,
    currency: "€",
    accentColor: "#D4AF37", // Oro egipcio
    bgGradient: "from-amber-600/30 via-yellow-700/10 to-transparent",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=1600&q=85",
    description: "Navegue en un palacio flotante por las aguas milenarias del Nilo y asómbrese ante la majestuosidad de Abu Simbel y las pirámides de Guiza.",
    highlights: ["Templos de Abu Simbel incluidos", "Pensión completa durante el crucero", "Guías egiptólogos oficiales en español"]
  },
  {
    id: "japon-imperial",
    title: "Japón Imperial & Contraste Futurista",
    subtitle: "Tokio, Monte Fuji, Kioto, Nara y Osaka",
    country: "Japón",
    category: "Gran Viaje Cultural",
    tag: "Grupos Reducidos",
    duration: "12 Días / 10 Noches",
    flights: "Línea Regular Emirates / Qatar",
    hotels: "4★ Superior & 5★ Selección",
    price: 2890,
    currency: "€",
    accentColor: "#E11D48", // Rojo carmín japonés
    bgGradient: "from-rose-600/30 via-red-800/10 to-transparent",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
    description: "Desde la vanguardia de Shibuya y Akihabara hasta el silencio sagrado de los templos zen de Kioto y el bosque de bambú de Arashiyama.",
    highlights: ["Pase JR Pass Shinkansen incluido", "Experiencia tradicional en Ryokan", "Ceremonia de té privada en Kioto"]
  },
  {
    id: "uzbekistan-seda",
    title: "Uzbekistán: La Gran Ruta de la Seda",
    subtitle: "Tashkent, Samarcanda, Bujará y Jiva",
    country: "Uzbekistán",
    category: "Patrimonio UNESCO",
    tag: "Exclusivo Dynamic Tours",
    duration: "10 Días / 8 Noches",
    flights: "Vuelo especial con Turkish / Uzbekistan Airways",
    hotels: "Hoteles Boutique con encanto local",
    price: 1680,
    currency: "€",
    accentColor: "#0284C7", // Azul cúpulas Samarcanda
    bgGradient: "from-sky-600/30 via-blue-900/10 to-transparent",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85",
    description: "Cúpulas turquesas deslumbrantes, madrazas centenarias y mercados de especias en una de las rutas comerciales más legendarias del planeta.",
    highlights: ["Plaza Registán con iluminación nocturna", "Tren de alta velocidad Afrosiyob", "Cena espectáculo folclórico en Nadir Divan-begi"]
  },
  {
    id: "turquia-magica",
    title: "Turquía Fascinante: De Capadocia al Bósforo",
    subtitle: "Estambul, Capadocia, Pamukkale y Éfeso",
    country: "Turquía",
    category: "Circuito Clásico",
    tag: "Salidas Garantizadas Todo el Año",
    duration: "8 Días / 7 Noches",
    flights: "Vuelos directos Turkish Airlines",
    hotels: "Hoteles Cueva Capadocia + 5★",
    price: 980,
    currency: "€",
    accentColor: "#EA580C", // Naranja atardecer Capadocia
    bgGradient: "from-orange-600/30 via-amber-900/10 to-transparent",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85",
    description: "Vuelo en globo sobre las chimeneas de hadas, navegación privada por el Bósforo y el murmullo de la historia viva en Santa Sofía.",
    highlights: ["Opción vuelo en globo al amanecer", "Crucero exclusivo por el Bósforo", "Guía oficial de habla hispana 24/7"]
  },
  {
    id: "mar-rojo-buceo",
    title: "Buceo en el Mar Rojo & Vida a Bordo",
    subtitle: "Arrecifes de Ras Mohammed, Estrecho de Tirán y Pecio Thistlegorm",
    country: "Mar Rojo / Egipto",
    category: "Aventura & Buceo",
    tag: "Vida a Bordo Platinum",
    duration: "8 Días / 7 Noches",
    flights: "Vuelos chárter directos a Sharm el-Sheij / Hurgada",
    hotels: "Yate crucero 40m con suites de lujo",
    price: 1540,
    currency: "€",
    accentColor: "#059669", // Verde esmeralda arrecife
    bgGradient: "from-emerald-600/30 via-teal-900/10 to-transparent",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85",
    description: "Aguas cristalinas de 28°C con una biodiversidad marina inigualable, tiburones de arrecife, delfines salvajes y pecios legendarios de la II Guerra Mundial.",
    highlights: ["Hasta 21 inmersiones guiadas", "Nitrox gratuito para buceadores certificados", "Pensión completa gourmet a bordo"]
  },
  {
    id: "tailandia-paraiso",
    title: "Tailandia: Templos del Norte & Playas de Krabi",
    subtitle: "Bangkok, Ayutthaya, Chiang Mai y Krabi",
    country: "Tailandia",
    category: "Exótico & Relax",
    tag: "Ideal Lunas de Miel",
    duration: "13 Días / 11 Noches",
    flights: "Qatar Airways / Emirates",
    hotels: "Resorts 5★ frente al mar",
    price: 2150,
    currency: "€",
    accentColor: "#8B5CF6", // Púrpura orquídea
    bgGradient: "from-purple-600/30 via-violet-900/10 to-transparent",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85",
    description: "Santuarios de elefantes éticos en las montañas verdes de Chiang Mai, templos dorados de Bangkok y atardeceres en las calas de ensueño de Krabi.",
    highlights: ["Santuario ético de elefantes", "Cena crucero por el río Chao Phraya", "Excursión en lancha privada a las Islas Phi Phi"]
  }
];
