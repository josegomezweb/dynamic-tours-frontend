import React, { useState } from "react";
import Logo from "./Logo";
import { assetUrl } from "../utils/assets";
import {
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft, 
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
  Pause,
  X
} from "lucide-react";

interface PublicWebProps {
  onEnterB2B: (agent: string, agency: string) => void;
  onSelectLeyendas?: () => void;
  onSelectMaravillas?: () => void;
}

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

const REGIONS_DATA: RegionItem[] = [
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

interface DestinationCardItem {
  id: string;
  name: string;
  image: string;
  objectPosition: string;
  categoryUrl: string;
  countries: string[];
  lineGroups?: string[][];
}

const DESTINATION_CARDS_DATA: DestinationCardItem[] = [
  {
    id: "oriente_medio",
    name: "ORIENTE MEDIO",
    image: "/destino_card_oriente_medio.jpg",
    objectPosition: "center 30%",
    categoryUrl: "https://www.dynamic-tours.com/destinos/oriente-medio/",
    countries: ["Egipto", "Jordania", "Dubai", "Irán", "Israel"],
    lineGroups: [
      ["Egipto", "Jordania"],
      ["Dubai", "Irán", "Israel"]
    ]
  },
  {
    id: "asia",
    name: "ASIA",
    image: "/destino_card_asia.jpg",
    objectPosition: "center 20%",
    categoryUrl: "https://www.dynamic-tours.com/destinos/asia/",
    countries: ["Uzbekistán", "China", "Japón", "Sri\u00A0Lanka", "Maldivas", "Tailandia", "Vietnam", "Camboya", "Armenia", "India", "Nepal"]
  },
  {
    id: "europa",
    name: "EUROPA",
    image: "/destino_card_europa.jpg",
    objectPosition: "center 25%",
    categoryUrl: "https://www.dynamic-tours.com/destinos/europa/",
    countries: [
      "Turquía", "Alemania", "Austria", "Bulgaria", "Bélgica", "Croacia", 
      "Escocia", "España", "Georgia", "Grecia", "Holanda", "Hungría", 
      "Inglaterra", "Irlanda", "Italia", "Moldavia", "Polonia", "Portugal", 
      "Rep.\u00A0Bálticas", "Rep.\u00A0Checa", "Rumanía"
    ]
  },
  {
    id: "america",
    name: "AMÉRICA",
    image: "/destino_card_america.jpg",
    objectPosition: "center 25%",
    categoryUrl: "https://www.dynamic-tours.com/destinos/america/",
    countries: ["Canadá", "México", "Costa\u00A0Rica", "Argentina"],
    lineGroups: [
      ["Canadá", "México"],
      ["Costa\u00A0Rica", "Argentina"]
    ]
  },
  {
    id: "africa",
    name: "ÁFRICA",
    image: "/destino_card_africa.jpg",
    objectPosition: "center 20%",
    categoryUrl: "https://www.dynamic-tours.com/destinos/africa/",
    countries: ["Marruecos", "Túnez", "Tanzania", "Kenia"],
    lineGroups: [
      ["Marruecos", "Túnez"],
      ["Tanzania", "Kenia"]
    ]
  }
];

export interface DynamicCatalogTour {
  id: string;
  title: string;
  country: string;
  region: string;
  type: "Circuito" | "Escapada" | "Grupos a medida";
  duration: string;
  price: string;
  description: string;
  image: string;
  tag: string;
  officialUrl: string;
  highlights: string[];
  isLeyendas?: boolean;
}

const ALL_COUNTRIES_LIST = [
  {
    regionId: "oriente_medio",
    regionName: "Oriente Medio",
    countries: ["Egipto", "Jordania", "Dubai", "Irán", "Israel"]
  },
  {
    regionId: "asia",
    regionName: "Asia",
    countries: ["Armenia", "Camboya", "China", "India", "Japón", "Maldivas", "Nepal", "Sri Lanka", "Tailandia", "Uzbekistán", "Vietnam"]
  },
  {
    regionId: "europa",
    regionName: "Europa",
    countries: ["Alemania", "Austria", "Bélgica", "Bulgaria", "Croacia", "Escocia", "España", "Georgia", "Grecia", "Holanda", "Hungría", "Inglaterra", "Irlanda", "Italia", "Moldavia", "Polonia", "Portugal", "Rep. Bálticas", "Rep. Checa", "Rumanía", "Turquía"]
  },
  {
    regionId: "america",
    regionName: "América",
    countries: ["Argentina", "Canadá", "Costa Rica", "Estados Unidos", "México"]
  },
  {
    regionId: "africa",
    regionName: "África",
    countries: ["Kenia", "Marruecos", "Tanzania", "Túnez"]
  }
];

const DYNAMIC_CATALOG_TOURS: DynamicCatalogTour[] = [
  // 1. EGIPTO
  {
    id: "egipto-descubre",
    title: "Descubre Egipto - Crucero por el Nilo + El Cairo",
    country: "Egipto",
    region: "Oriente Medio",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "499 €",
    description: "Crucero por el Nilo en pensión completa y estancia en El Cairo con visitas guiadas a templos y pirámides.",
    image: "/egipto_feluca.png",
    tag: "SUPER OFERTA",
    officialUrl: "https://www.dynamic-tours.com/destinos/egipto/",
    highlights: ["4N crucero Nilo PC", "3N El Cairo AD", "Vuelos y traslados incluidos", "Guía egiptólogo en español"]
  },
  {
    id: "egipto-maravillas",
    title: "Maravillas del Nilo con El Cairo",
    country: "Egipto",
    region: "Oriente Medio",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "924 €",
    description: "El circuito insignia de Dynamic Tours. 4N crucero Nilo en motonave 5★ Lujo + 3N El Cairo y visitas completas con egiptólogo.",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
    tag: "CIRCUITO ESTRELLA",
    officialUrl: "https://www.dynamic-tours.com/destinos/egipto/",
    highlights: ["Motonave 5★ Lujo", "Pirámides de Guiza y Esfinge", "Karnak, Luxor, Edfu y Kom Ombo", "Vuelos regulares EgyptAir"]
  },
  {
    id: "egipto-leyendas",
    title: "Leyendas de Egipto (con Abu Simbel)",
    country: "Egipto",
    region: "Oriente Medio",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "889 €",
    description: "Salidas fijas los viernes. 3N crucero Nilo en PC + 4N El Cairo en AD + Visitas completas y excursión a Abu Simbel incluida.",
    image: "/abu_simbel.jpg",
    tag: "INCLUYE ABU SIMBEL",
    officialUrl: "https://www.dynamic-tours.com/destinos/egipto/",
    highlights: ["Excursión a Abu Simbel incluida", "Crucero 5★ Pensión Completa", "El Cairo histórico y zocos", "Egiptólogo oficial"]
  },
  {
    id: "egipto-senior",
    title: "Egipto Selecto Senior (+55 Años)",
    country: "Egipto",
    region: "Oriente Medio",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "1.285 €",
    description: "Programa exclusivo para mayores de 55 años. Pensión completa con agua, visado incluido, ritmo pausado y seguro ampliado.",
    image: "/senior dynamic ok.png",
    tag: "SENIOR 55+",
    officialUrl: "https://www.dynamic-tours.com/destinos/egipto/",
    highlights: ["Todo Incluido con agua en comidas", "Visado y propinas incluidas", "Auriculares en visitas", "Seguro médico y cancelación ampliado"]
  },
  {
    id: "egipto-fin-ano",
    title: "Descubre Egipto Especial Fin de Año",
    country: "Egipto",
    region: "Oriente Medio",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "1.150 €",
    description: "Salida especial de Nochevieja con cena de gala y cotillón en crucero de 5 estrellas por el Nilo y estancia en El Cairo.",
    image: "/noche_cairota.jpg",
    tag: "FIN DE AÑO",
    officialUrl: "https://www.dynamic-tours.com/destinos/egipto/",
    highlights: ["Cena de gala de Nochevieja", "Crucero Nilo 5★", "Pirámides y Museo Egipcio", "Cupos aéreos garantizados"]
  },
  {
    id: "egipto-infinito",
    title: "Egipto Infinito: Nilo & Desierto Blanco",
    country: "Egipto",
    region: "Oriente Medio",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "1.359 €",
    description: "Ruta de contrastes: 3N crucero Nilo en PC + 3N El Cairo en MP + 1N de acampada bajo las estrellas en el Desierto Blanco en 4x4.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    tag: "AVENTURA & CONFORT",
    officialUrl: "https://www.dynamic-tours.com/destinos/egipto/",
    highlights: ["Expedición en 4x4 por Bahariya", "Noche en jaimas en Desierto Blanco", "Crucero Nilo 5★", "Pensión completa"]
  },
  {
    id: "egipto-hurghada",
    title: "Isis + Hurghada (Nilo & Mar Rojo)",
    country: "Egipto",
    region: "Oriente Medio",
    type: "Circuito",
    duration: "11 Días / 10 Noches",
    price: "1.365 €",
    description: "El combo perfecto: crucero Nilo en PC + El Cairo en AD + 3 noches en resort de playa en Hurghada con régimen de Todo Incluido.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    tag: "PLAYA & CULTURA",
    officialUrl: "https://www.dynamic-tours.com/destinos/egipto/",
    highlights: ["3N Resort Mar Rojo Todo Incluido", "Arrecifes de coral y buceo", "Crucero Nilo 5★", "Vuelos internos incluidos"]
  },
  {
    id: "egipto-charter",
    title: "Joyas del Nilo - Chárter Directo desde Provincias",
    country: "Egipto",
    region: "Oriente Medio",
    type: "Grupos a medida",
    duration: "8 Días / 7 Noches",
    price: "1.250 €",
    description: "Operación chárter directo desde Zaragoza, Bilbao, Asturias, Santiago y Valencia. Cupos 100% asegurados para agencias.",
    image: "/dynamic_egipto_abu_simbel.png",
    tag: "CHÁRTER EXCLUSIVO",
    officialUrl: "https://www.dynamic-tours.com/egipto-desde-provincias",
    highlights: ["Vuelo chárter directo sin escala en Madrid", "Abu Simbel en avión incluido", "Motonave 5★ Gran Lujo", "Comisiones preferentes"]
  },
  {
    id: "egipto-grupos-b2b",
    title: "Egipto Arqueológico Grupos a Medida",
    country: "Egipto",
    region: "Oriente Medio",
    type: "Grupos a medida",
    duration: "8 a 10 Días",
    price: "A consultar",
    description: "Diseño a medida para grupos cerrados de agencias: barcos en exclusiva, egiptólogos dedicados y eventos privados.",
    image: "/globo_luxor.jpg",
    tag: "GRUPOS B2B",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Barco completo en exclusiva", "Itinerario personalizado", "Precios netos de cotización rápida", "Atención 24/7"]
  },

  // 2. TURQUÍA
  {
    id: "turquia-suenos",
    title: "Sueños de Estambul y Capadocia",
    country: "Turquía",
    region: "Europa",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "899 €",
    description: "4 noches en Estambul (AD) y 3 noches en Capadocia (PC) con vuelo doméstico, visitas guiadas y vuelos Turkish Airlines.",
    image: "/turquia_dynamic.png",
    tag: "VUELO DOMÉSTICO INCLUIDO",
    officialUrl: "https://www.dynamic-tours.com/destinos/turquia/",
    highlights: ["Turkish Airlines con equipaje", "Vuelo doméstico Estambul-Capadocia", "Valle de Göreme y chimeneas de hadas", "Bósforo y Santa Sofía"]
  },
  {
    id: "turquia-ruta-completa",
    title: "Ruta Turca Completa - Confort",
    country: "Turquía",
    region: "Europa",
    type: "Circuito",
    duration: "10 Días / 9 Noches",
    price: "1.150 €",
    description: "Gran recorrido por Anatolia: Estambul monumental, Ankara, Capadocia, piscinas de Pamukkale, ruinas de Éfeso y Esmirna.",
    image: "/pamukkale_ruta_turca.jpg",
    tag: "RUTA COMPLETA",
    officialUrl: "https://www.dynamic-tours.com/destinos/turquia/",
    highlights: ["Travertinos de Pamukkale", "Ruinas grecorromanas de Éfeso", "Capadocia en pensión completa", "Autocar de gran confort"]
  },
  {
    id: "turquia-escapada-estambul",
    title: "Escapada Estambul Mágico y Bósforo",
    country: "Turquía",
    region: "Europa",
    type: "Escapada",
    duration: "4 Días / 3 Noches",
    price: "385 €",
    description: "Hotel céntrico seleccionado, crucero por el Estrecho del Bósforo, visitas a Santa Sofía, Mezquita Azul y Gran Bazar.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80",
    tag: "ESCAPADA URBANA",
    officialUrl: "https://www.dynamic-tours.com/destinos/turquia/",
    highlights: ["Paseo en barco por el Bósforo", "Hotel 4★ céntrico con desayuno", "Traslados aeropuerto incluidos", "Tiempo libre para compras"]
  },
  {
    id: "turquia-grupos",
    title: "Turquía a Medida para Colectivos y Empresas",
    country: "Turquía",
    region: "Europa",
    type: "Grupos a medida",
    duration: "7 a 10 Días",
    price: "A consultar",
    description: "Programación exclusiva para grupos de agencias con autocares de última generación, hoteles seleccionados y vuelos chárter o de línea.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
    tag: "GRUPOS A MEDIDA",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Guía privado para el grupo", "Hoteles cueva en Capadocia", "Cenas tradicionales con danzas", "Tarifas netas competitivas"]
  },

  // 3. JORDANIA
  {
    id: "jordania-maravillas",
    title: "Maravillas del Hachemita y Wadi Rum",
    country: "Jordania",
    region: "Oriente Medio",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "1.425 €",
    description: "4N Ammán + 2N Petra + 1N en campamento beduino en Wadi Rum en MP. Safari 4x4 por el desierto, entrada a Petra y Mar Muerto.",
    image: "/jordania_petra.jpg",
    tag: "PETRA & DESIERTO",
    officialUrl: "https://www.dynamic-tours.com/destinos/jordania/",
    highlights: ["Día completo en Petra", "Noche en campamento de Wadi Rum", "Safari 4x4 de 2 horas", "Flotar en el Mar Muerto"]
  },
  {
    id: "jordania-escapada",
    title: "Escapada Ammán y Mar Muerto Wellness",
    country: "Jordania",
    region: "Oriente Medio",
    type: "Escapada",
    duration: "4 Días / 3 Noches",
    price: "590 €",
    description: "Tratamientos de sales minerales en el Mar Muerto, ciudadela de Ammán, ruinas romanas de Jerash y vuelos regulares.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    tag: "WELLNESS & RELAX",
    officialUrl: "https://www.dynamic-tours.com/destinos/jordania/",
    highlights: ["Resort 5★ en el Mar Muerto", "Visita de Jerash la Pompeya de Oriente", "Ammán histórica", "Traslados ejecutivos"]
  },
  {
    id: "jordania-grupos",
    title: "Jordania e Incentivos Grupos a Medida",
    country: "Jordania",
    region: "Oriente Medio",
    type: "Grupos a medida",
    duration: "7 a 9 Días",
    price: "A consultar",
    description: "Eventos exclusivos en Little Petra, cenas de gala en el desierto de Wadi Rum y operativas para asociaciones y empresas.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    tag: "GRUPOS B2B",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Cena de gala privada en Wadi Rum", "Entrada nocturna Petra by Night", "Autocar de lujo", "Coordinador mayorista in situ"]
  },

  // 4. PORTUGAL
  {
    id: "portugal-porto",
    title: "Escapada Porto & Crucero Seis Puentes",
    country: "Portugal",
    region: "Europa",
    type: "Escapada",
    duration: "3 Días / 2 Noches",
    price: "199 €",
    description: "Escapada gastronómica y cultural en Oporto. Alojamiento y desayuno, crucero en barco rabelo por el río Duero y cata en bodegas.",
    image: "/portugal_porto.jpg",
    tag: "ESCAPADA CULTURAL",
    officialUrl: "https://www.dynamic-tours.com/destinos/portugal/",
    highlights: ["Crucero por el río Duero", "Hotel 4★ céntrico con desayuno", "Degustación de vinos de Oporto", "Vuelos y seguro incluidos"]
  },
  {
    id: "portugal-lisboa",
    title: "Escapada Lisboa, Sintra & Cascais",
    country: "Portugal",
    region: "Europa",
    type: "Escapada",
    duration: "4 Días / 3 Noches",
    price: "265 €",
    description: "Descubra el encanto de Lisboa histórica, barrio de Alfama, Torre de Belém y excursión de día completo al Palacio da Pena en Sintra.",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=800&q=80",
    tag: "TOP VENTAS",
    officialUrl: "https://www.dynamic-tours.com/destinos/portugal/",
    highlights: ["Excursión a Sintra y Cascais", "Hotel 4★ con desayuno buffet", "Vuelos regulares", "Visitas panorámicas"]
  },
  {
    id: "portugal-circuito",
    title: "Gran Circuito Portugal de Norte a Sur",
    country: "Portugal",
    region: "Europa",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "790 €",
    description: "Oporto, Coímbra, Fátima, Lisboa, Évora y playas del Algarve con visitas culturales, catas y guía acompañante en español.",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
    tag: "CIRCUITO COMPLETO",
    officialUrl: "https://www.dynamic-tours.com/destinos/portugal/",
    highlights: ["Ruta completa norte a sur", "Hoteles 4★ seleccionados", "Media pensión con bebidas", "Guía en español"]
  },
  {
    id: "portugal-grupos",
    title: "Rutas del Vino y Grupos Portugal a Medida",
    country: "Portugal",
    region: "Europa",
    type: "Grupos a medida",
    duration: "5 Días / 4 Noches",
    price: "A consultar",
    description: "Diseño para grupos de agencias con quintas vinícolas en el Valle del Duero, tranvía privado en Lisboa y gastronomía de autor.",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80",
    tag: "GRUPOS A MEDIDA",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Quintas y bodegas del Duero", "Paseos privados en barco", "Restaurantes con fado tradicional", "Autocar ejecutivo"]
  },

  // 5. UZBEKISTÁN
  {
    id: "uzbekistan-clasico",
    title: "Uzbekistán Clásico: Ruta de la Seda",
    country: "Uzbekistán",
    region: "Asia",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "1.390 €",
    description: "Tashkent, Samarcanda con la Plaza del Registán, el gran oasis de Bujará y la amurallada Jiva. Billetes de tren rápido Afrosiyob.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    tag: "RUTA DE LA SEDA",
    officialUrl: "https://www.dynamic-tours.com/destinos/uzbekistan/",
    highlights: ["Plaza del Registán en Samarcanda", "Tren de alta velocidad Afrosiyob", "Vuelo doméstico Tashkent-Urgench", "Media Pensión en hoteles boutique"]
  },
  {
    id: "uzbekistan-grupos",
    title: "Ruta de la Seda Grupos a Medida",
    country: "Uzbekistán",
    region: "Asia",
    type: "Grupos a medida",
    duration: "10 Días / 9 Noches",
    price: "A consultar",
    description: "Itinerario ampliado por los desiertos de Kizil Kum, valles de Ferganá y talleres de seda artesanal para grupos culturales.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    tag: "GRUPOS A MEDIDA",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Talleres de cerámica y seda", "Cena con folclore tradicional", "Guía experto historiador", "Hoteles con encanto"]
  },

  // 6. INDIA
  {
    id: "india-triangulo",
    title: "Triángulo de Oro y Benarés",
    country: "India",
    region: "Asia",
    type: "Circuito",
    duration: "9 Días / 7 Noches",
    price: "1.290 €",
    description: "Delhi histórica y moderna, la majestuosidad del Taj Mahal en Agra, la Ciudad Rosa de Jaipur y la mística Benarés en el río Ganges.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    tag: "ESPIRITUALIDAD Y COLOR",
    officialUrl: "https://www.dynamic-tours.com/destinos/india/",
    highlights: ["Visita al atardecer del Taj Mahal", "Ceremonia Aarti en el río Ganges", "Subida en elefante o jeep a Fuerte Amber", "Hoteles 5★ en Media Pensión"]
  },
  {
    id: "india-grupos",
    title: "Rajastán Imperial Grupos Privados",
    country: "India",
    region: "Asia",
    type: "Grupos a medida",
    duration: "12 Días / 10 Noches",
    price: "A consultar",
    description: "Hoteles palacio Heritage, vehículos privados climatizados y guías exclusivos para incentivos y grupos familiares de agencias.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    tag: "GRUPOS A MEDIDA",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Hoteles palacio de maharajás", "Vehículos ejecutivos climatizados", "Atención VIP receptivo local", "Itinerario flexible"]
  },

  // 7. JAPÓN
  {
    id: "japon-banzai",
    title: "Japón Banzai & Ryokan Tradicional",
    country: "Japón",
    region: "Asia",
    type: "Circuito",
    duration: "12 Días / 10 Noches",
    price: "2.490 €",
    description: "Tokio, Kioto, Takayama, Kanazawa, noche en auténtico Ryokan japonés con aguas termales Onsen y trenes bala Shinkansen.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    tag: "GRAN VIAJE",
    officialUrl: "https://www.dynamic-tours.com/destinos/japon/",
    highlights: ["Noche en Ryokan con cena kaiseki y onsen", "Billetes de tren bala Shinkansen", "Templos de Kioto y santuarios de Tokio", "Guías en español"]
  },
  {
    id: "japon-escapada",
    title: "Escapada Tokio Vanguardista",
    country: "Japón",
    region: "Asia",
    type: "Escapada",
    duration: "6 Días / 4 Noches",
    price: "1.350 €",
    description: "Estancia en hotel céntrico en Shinjuku o Shibuya, pases de metro ilimitados y visitas a Akihabara, Asakusa y miradores de la metrópoli.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    tag: "ESCAPADA",
    officialUrl: "https://www.dynamic-tours.com/destinos/japon/",
    highlights: ["Hotel seleccionado en Tokio", "Pase de transporte metropolitano", "Excursión opcional al Monte Fuji", "Asistencia 24h en español"]
  },

  // 8. MARRUECOS
  {
    id: "marruecos-desierto",
    title: "Ciudades Rojas y Desierto de Merzouga",
    country: "Marruecos",
    region: "África",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "635 €",
    description: "Marrakech, gargantas del Todra, noche en campamento de jaimas en las dunas de Merzouga, kasbahs de Ait Ben Haddou y Ouarzazate.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
    tag: "DESIERTO & KASBAHS",
    officialUrl: "https://www.dynamic-tours.com/destinos/marruecos/",
    highlights: ["Noche en jaimas en las dunas de Merzouga", "Travesía en 4x4 por el desierto", "Kasbah de Ait Ben Haddou (UNESCO)", "Media Pensión completa"]
  },
  {
    id: "marruecos-escapada",
    title: "Escapada Marrakech Express y Riad con Encanto",
    country: "Marruecos",
    region: "África",
    type: "Escapada",
    duration: "4 Días / 3 Noches",
    price: "280 €",
    description: "Estancia en Riad tradicional en la Medina, plaza Jemaa el-Fna, Jardines de Majorelle y cena tradicional marroquí con espectáculo.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    tag: "ESCAPADA RIAD",
    officialUrl: "https://www.dynamic-tours.com/destinos/marruecos/",
    highlights: ["Alojamiento en Riad de la Medina", "Visita guiada privada por los zocos", "Vuelos directos incluidos", "Traslados privados"]
  },
  {
    id: "marruecos-grupos",
    title: "Marruecos Gran Sur y 4x4 Grupos a Medida",
    country: "Marruecos",
    region: "África",
    type: "Grupos a medida",
    duration: "6 Días / 5 Noches",
    price: "A consultar",
    description: "Flota de 4x4 cruzando el Alto Atlas, campamento nómada privado de lujo y cenas de gala bajo las estrellas para colectivos de agencias.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    tag: "GRUPOS A MEDIDA",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Flota privada de vehículos 4x4", "Campamento bereber en exclusiva", "Paseo en dromedario al atardecer", "Precios mayoristas directos"]
  },

  // 9. KENIA & ÁFRICA
  {
    id: "kenia-safari",
    title: "Safari Masái Footsteps & Naivasha",
    country: "Kenia",
    region: "África",
    type: "Circuito",
    duration: "9 Días / 6 Noches",
    price: "2.190 €",
    description: "2N Amboseli frente al Kilimanjaro + 1N Lago Naivasha + 2N en Masái Mara en Pensión Completa con safaris para avistar los cinco grandes.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    tag: "SAFARI FOTOGRÁFICO",
    officialUrl: "https://www.dynamic-tours.com/destinos/kenia/",
    highlights: ["Pensión Completa en Lodges de safari", "Vehículo 4x4 con techo abatible", "Conductor-guía experto en español", "Entradas a parques nacionales"]
  },
  {
    id: "kenia-grupos",
    title: "Safaris Privados e Incentivos B2B",
    country: "Kenia",
    region: "África",
    type: "Grupos a medida",
    duration: "8 a 11 Días",
    price: "A consultar",
    description: "Campamentos exclusivos y lodges de lujo para grupos reducidos, vuelos en avioneta privada entre reservas y guías naturalistas.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    tag: "GRUPOS A MEDIDA",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Vuelos en avioneta privada entre reservas", "Campamentos de lujo en exclusiva", "Cenas de gala bajo las acacias", "Coordinación técnica mayorista"]
  },

  // 10. EUROPA
  {
    id: "escocia-tesoros",
    title: "Tesoros y Castillos de Escocia",
    country: "Escocia",
    region: "Europa",
    type: "Circuito",
    duration: "8 Días / 7 Noches",
    price: "1.450 €",
    description: "Edimburgo, Tierras Altas, Lago Ness, Isla de Skye y Castillo de Stirling con Media Pensión en ruta, destilería de whisky y vuelos.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    tag: "TIERRAS ALTAS",
    officialUrl: "https://www.dynamic-tours.com/destinos/escocia/",
    highlights: ["Crucero por el Lago Ness", "Visita a destilería tradicional de whisky", "Castillos de Stirling y Urquhart", "Guía oficial en español"]
  },
  {
    id: "europa-roma",
    title: "Escapada Roma Monumental & Vaticano",
    country: "Italia",
    region: "Europa",
    type: "Escapada",
    duration: "4 Días / 3 Noches",
    price: "320 €",
    description: "Coliseo, Foros Imperiales, Museos Vaticanos y Fontana di Trevi con hotel 4★ céntrico, desayunos y traslados privados.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    tag: "ESCAPADA CLÁSICA",
    officialUrl: "https://www.dynamic-tours.com/destinos/italia/",
    highlights: ["Hotel 4★ céntrico", "Vuelos y traslados privados", "Entrada prioritaria al Coliseo", "Paseo guiado por el centro histórico"]
  },
  {
    id: "europa-praga",
    title: "Escapada Praga Ciudad de las Cien Torres",
    country: "Rep. Checa",
    region: "Europa",
    type: "Escapada",
    duration: "4 Días / 3 Noches",
    price: "295 €",
    description: "Castillo de Praga, Puente de Carlos, Reloj Astronómico y paseo en barco por el río Moldava con guía de habla hispana.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    tag: "ESCAPADA ROMÁNTICA",
    officialUrl: "https://www.dynamic-tours.com/destinos/republica-checa/",
    highlights: ["Crucero panorámico por el Moldava", "Hotel 4★ con desayuno", "Visita guiada al Castillo de Praga", "Seguro y traslados"]
  },
  {
    id: "europa-grupos",
    title: "Capitales Imperiales Grupos a Medida",
    country: "Austria",
    region: "Europa",
    type: "Grupos a medida",
    duration: "7 Días / 6 Noches",
    price: "A consultar",
    description: "Viena, Praga y Budapest con conciertos de música clásica, visitas palaciegas exclusivas y autocar privado para grupos de agencias.",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80",
    tag: "GRUPOS B2B",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Concierto de vals en Viena", "Palacios de Schönbrunn y Hofburg", "Cena típica en Budapest", "Autocar exclusivo"]
  },

  // 11. AMÉRICA
  {
    id: "costa-rica-pura-vida",
    title: "Costa Rica Pura Vida & Tortuguero",
    country: "Costa Rica",
    region: "América",
    type: "Circuito",
    duration: "9 Días / 7 Noches",
    price: "1.790 €",
    description: "Canales de Tortuguero, Volcán Arenal, aguas termales y bosques nubosos de Monteverde con guía y traslados privados.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    tag: "NATURALEZA PURA",
    officialUrl: "https://www.dynamic-tours.com/destinos/costa-rica/",
    highlights: ["Navegación por los canales de Tortuguero", "Aguas termales de Tabacón en Arenal", "Puentes colgantes en Monteverde", "Hoteles ecolodge de alta gama"]
  },
  {
    id: "canada-rocosas",
    title: "Canadá Rocosas & Lagos Glaciares",
    country: "Canadá",
    region: "América",
    type: "Circuito",
    duration: "10 Días / 8 Noches",
    price: "2.450 €",
    description: "Calgary, Parque Nacional Banff, Lago Louise, Glaciar Athabasca y Vancouver con hoteles de primera categoría.",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
    tag: "GRANDES ESPACIOS",
    officialUrl: "https://www.dynamic-tours.com/destinos/canada/",
    highlights: ["Lago Louise y Parque Nacional Banff", "Vehículo especial sobre el Glaciar Athabasca", "Vancouver y Costa del Pacífico", "Guía acompañante en español"]
  },
  {
    id: "america-grupos",
    title: "América e Incentivos para Empresas y Grupos",
    country: "Estados Unidos",
    region: "América",
    type: "Grupos a medida",
    duration: "6 a 12 Días",
    price: "A consultar",
    description: "Programas exclusivos para grupos en Nueva York, Ruta 66 o Costa Oeste americana coordinados por nuestro receptivo mayorista.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    tag: "GRUPOS B2B",
    officialUrl: "https://www.dynamic-tours.com/viajes-grupos",
    highlights: ["Entradas VIP y eventos en Nueva York", "Rutas en autocar de gran confort", "Hoteles céntricos garantizados", "Presupuestos a medida en 24h"]
  }
];

export default function PublicWeb({ onEnterB2B, onSelectLeyendas, onSelectMaravillas }: PublicWebProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [inquiryName, setInquiryName] = useState<string>("");
  const [inquiryEmail, setInquiryEmail] = useState<string>("");
  const [inquiryAgency, setInquiryAgency] = useState<string>("");
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);
  
  // States for interactive travel finder (Buscador B2B)
  const [selectedDest, setSelectedDest] = useState<string>("todos");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("todos");
  
  const [isDestPickerOpen, setIsDestPickerOpen] = useState<boolean>(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isTypePickerOpen, setIsTypePickerOpen] = useState<boolean>(false);
  
  const [destSearchQuery, setDestSearchQuery] = useState<string>("");
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [calendarMonth, setCalendarMonth] = useState<number>(10); // Noviembre 2026 (0-indexed: 10)
  
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [resultTypeTab, setResultTypeTab] = useState<string>("todos");
  const finderBarRef = React.useRef<HTMLDivElement | null>(null);

  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);
  const [featuredCardIndex, setFeaturedCardIndex] = useState<number>(0);
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState<boolean>(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string>("oriente_medio");
  const [expandedDestCards, setExpandedDestCards] = useState<Record<string, boolean>>({});

  const toggleDestCard = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedDestCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const destinosButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const megamenuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDestDropdownOpen) {
        setIsDestDropdownOpen(false);
        destinosButtonRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        megamenuRef.current && 
        !megamenuRef.current.contains(e.target as Node) &&
        destinosButtonRef.current &&
        !destinosButtonRef.current.contains(e.target as Node)
      ) {
        setIsDestDropdownOpen(false);
      }
    };

    if (isDestDropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDestDropdownOpen]);

  // Click-outside listener for Travel Finder popovers
  React.useEffect(() => {
    const handleClickOutsideFinder = (e: MouseEvent) => {
      if (finderBarRef.current && !finderBarRef.current.contains(e.target as Node)) {
        setIsDestPickerOpen(false);
        setIsDatePickerOpen(false);
        setIsTypePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideFinder);
    return () => document.removeEventListener("mousedown", handleClickOutsideFinder);
  }, []);

  // Calendar helpers
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const weekDayLabels = ["L", "M", "X", "J", "V", "S", "D"];

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(y => y - 1);
    } else {
      setCalendarMonth(m => m - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(y => y + 1);
    } else {
      setCalendarMonth(m => m + 1);
    }
  };

  const daysInCurrentMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfMonth = (new Date(calendarYear, calendarMonth, 1).getDay() + 6) % 7; // Monday = 0
  const daysInPreviousMonth = new Date(calendarYear, calendarMonth, 0).getDate();

  // Filtered countries in Destino popover
  const filteredRegionsList = React.useMemo(() => {
    if (!destSearchQuery.trim()) return ALL_COUNTRIES_LIST;
    const q = destSearchQuery.toLowerCase().trim();
    return ALL_COUNTRIES_LIST.map(reg => ({
      ...reg,
      countries: reg.countries.filter(c => c.toLowerCase().includes(q))
    })).filter(reg => reg.countries.length > 0);
  }, [destSearchQuery]);

  // Filtered actual trips from dynamic-tours.com
  const filteredCatalogTrips = React.useMemo(() => {
    return DYNAMIC_CATALOG_TOURS.filter((tour) => {
      // 1. Destino
      if (selectedDest !== "todos") {
        const destLower = selectedDest.toLowerCase();
        const countryMatch = tour.country.toLowerCase() === destLower ||
                             tour.region.toLowerCase() === destLower ||
                             tour.title.toLowerCase().includes(destLower);
        if (!countryMatch) return false;
      }

      // 2. Tipo (either from finder or from result tab)
      const effectiveType = resultTypeTab !== "todos" ? resultTypeTab : selectedType;
      if (effectiveType !== "todos") {
        if (tour.type.toLowerCase() !== effectiveType.toLowerCase()) return false;
      }

      return true;
    });
  }, [selectedDest, selectedType, selectedDate, resultTypeTab]);

  const handleSearch = () => {
    setHasSearched(true);
    setIsDestPickerOpen(false);
    setIsDatePickerOpen(false);
    setIsTypePickerOpen(false);
    setTimeout(() => {
      const el = document.getElementById("resultados-busqueda");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  // Animation trigger for introductory block
  const [introInView, setIntroInView] = useState<boolean>(false);
  const introRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroInView(true);
      return;
    }

    const checkVisibility = () => {
      if (introRef.current) {
        const rect = introRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIntroInView(true);
          return true;
        }
      }
      return false;
    };

    if (checkVisibility()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeRegion = REGIONS_DATA.find((r) => r.id === selectedRegionId) || REGIONS_DATA[0];

  const getGridColsClass = (regionId: string) => {
    switch (regionId) {
      case "oriente_medio":
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";
      case "america":
      case "africa":
        return "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4";
      case "asia":
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";
      case "europa":
        return "grid-cols-2 sm:grid-cols-4 lg:grid-cols-7";
      default:
        return "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5";
    }
  };

  const featuredCards = [
    {
      id: "portugal",
      badge: "ESCAPADA",
      badgeBg: "bg-white/25",
      country: "PORTUGAL",
      duration: "3D / 2N",
      description: "Escapada gastronómica y cultural con encanto atlántico.",
      price: "299 €",
      image: "/portugal_porto.jpg",
      destKey: "portugal"
    },
    {
      id: "egipto",
      badge: "CIRCUITO ESTRELLA",
      badgeBg: "bg-[#eab308]",
      country: "EGIPTO",
      duration: "8D / 7N",
      description: "Maravillas del Nilo: 4N crucero Pensión Completa + 3N Cairo + Pirámides.",
      price: "924 €",
      image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
      destKey: "egipto"
    },
    {
      id: "turquia",
      badge: "GRAN VIAJE",
      badgeBg: "bg-[#10b981]",
      country: "TURQUÍA",
      duration: "8D / 7N",
      description: "Sueños de Estambul y Capadocia: Bósforo, Göreme y vuelos Turkish Airlines.",
      price: "899 €",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
      destKey: "turquia"
    },
    {
      id: "jordania",
      badge: "AVENTURA",
      badgeBg: "bg-[#f97316]",
      country: "JORDANIA",
      duration: "8D / 7N",
      description: "Maravillas del Hachemita: Petra al completo, desierto de Wadi Rum y Mar Muerto.",
      price: "1.425 €",
      image: "/jordania_petra.jpg",
      destKey: "jordania"
    },
    {
      id: "india",
      badge: "ESPIRITUALIDAD",
      badgeBg: "bg-[#ec4899]",
      country: "INDIA",
      duration: "9D / 7N",
      description: "Triángulo de Oro y Benarés: Delhi monumental, Jaipur, Taj Mahal y el Ganges.",
      price: "1.290 €",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      destKey: "india"
    },
    {
      id: "uzbekistan",
      badge: "RUTA DE LA SEDA",
      badgeBg: "bg-[#8b5cf6]",
      country: "UZBEKISTÁN",
      duration: "8D / 7N",
      description: "Uzbekistán Clásico: Samarcanda, oasis de Bujará y Jiva con tren rápido Afrosiyob.",
      price: "1.390 €",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      destKey: "uzbekistan"
    },
    {
      id: "kenia",
      badge: "SAFARI",
      badgeBg: "bg-[#eab308]",
      country: "KENIA",
      duration: "9D / 6N",
      description: "Masái Footsteps: Safaris en Masái Mara, Lago Naivasha y vistas al Kilimanjaro.",
      price: "2.190 €",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      destKey: "kenia"
    },
    {
      id: "marruecos",
      badge: "DESIERTO",
      badgeBg: "bg-[#06b6d4]",
      country: "MARRUECOS",
      duration: "8D / 7N",
      description: "Ciudades Rojas y Desierto: Marrakech, kasbahs de Ait Ben Haddou y Merzouga.",
      price: "635 €",
      image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
      destKey: "marruecos"
    }
  ];

  const featuredOffers = [
    {
      id: "senior-55",
      title: "Egipto Selecto Senior",
      titleLine1: "Egipto",
      titleLine2: "Selecto Senior",
      subtitle: "Especial mayores de 55 años",
      tag: "ESPECIAL +55",
      duration: "8 DÍAS | 7 NOCHES",
      description: "Crucero de 4 noches por el Nilo y 3 noches en El Cairo con visitas exclusivas, traslados y régimen todo incluido.",
      price: "1.285€",
      image: "/senior dynamic ok.png",
      imagePos: "object-[center_36%]",
      bottomImagePos: "object-[center_70%]",
      isLeyendas: false
    },
    {
      id: "suenos-estambul",
      title: "Sueños de Estambul y Capadocia",
      titleLine1: "Sueños",
      titleLine2: "de Estambul y Capadocia",
      subtitle: null,
      tag: "VUELO DOMÉSTICO INCLUIDO",
      duration: "8 DÍAS | 7 NOCHES",
      description: "4 noches en Estambul y 3 noches en Capadocia con vuelo doméstico, visitas guiadas y traslados incluidos.",
      price: "1.509€",
      image: "/turquia_dynamic.png",
      imagePos: "object-[center_32%]",
      bottomImagePos: "object-[center_60%]",
      isLeyendas: false
    },
    {
      id: "descubre-egipto",
      title: "Descubre Egipto - Crucero por el Nilo + El Cairo",
      titleLine1: "Descubre Egipto",
      titleLine2: "Crucero por el Nilo + El Cairo",
      subtitle: null,
      tag: "BAJADA DE PRECIOS",
      duration: "8 DÍAS | 7 NOCHES",
      description: "Crucero por el Nilo en pensión completa y estancia en El Cairo con visitas guiadas a templos y pirámides.",
      price: "499€",
      image: "/egipto_feluca.png",
      imagePos: "object-[20%_74%]",
      bottomImagePos: "object-[20%_90%]",
      isLeyendas: false
    },
    {
      id: "ruta-turca",
      title: "Ruta turca completa - Confort",
      titleLine1: "Ruta turca completa",
      titleLine2: "Confort",
      subtitle: null,
      tag: "CIRCUITO CON VUELOS",
      duration: "8 DÍAS | 7 NOCHES",
      description: "Estambul, Capadocia y Pamukkale con vuelo doméstico, hoteles seleccionados y recorrido cultural completo.",
      price: "1.599€",
      image: "/pamukkale_ruta_turca.jpg",
      imagePos: "object-[center_42%]",
      bottomImagePos: "object-[center_60%]",
      isLeyendas: false
    },
    {
      id: "fin-ano-egipto",
      title: "Descubre Egipto - Especial Fin de Año",
      titleLine1: "Descubre Egipto",
      titleLine2: "Especial Fin de Año",
      subtitle: null,
      tag: "SALIDAS DESDE PROVINCIAS",
      duration: "8 DÍAS | 7 NOCHES",
      description: "Crucero por el Nilo y estancia en El Cairo con cupos garantizados y vuelos directos desde múltiples aeropuertos.",
      price: "1.064€",
      image: "/egipto_fin_de_ano.jpg",
      imagePos: "object-center",
      bottomImagePos: "object-[center_70%]",
      isLeyendas: false
    },
    {
      id: "leyendas-egipto",
      title: "Leyendas de Egipto",
      titleLine1: "Leyendas de Egipto",
      titleLine2: null,
      subtitle: null,
      tag: "SIN ABU SIMBEL",
      duration: "8 DÍAS | 7 NOCHES",
      description: "Crucero por el Nilo en pensión completa y estancia en El Cairo con entrada por Asuán y salidas en viernes.",
      price: "764€",
      image: "/dia_5_guiza.jpg",
      imagePos: "object-[center_28%]",
      bottomImagePos: "object-[center_60%]",
      isLeyendas: true
    }
  ];
  
  // Auto-advance featured hero cards every 5 seconds with subtle fade transition
  const [isCardFading, setIsCardFading] = useState<boolean>(false);
  const cardFadeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeFeaturedCard = React.useCallback((nextIndex: number) => {
    setIsCardFading(true);
    if (cardFadeTimeoutRef.current) clearTimeout(cardFadeTimeoutRef.current);
    cardFadeTimeoutRef.current = setTimeout(() => {
      setFeaturedCardIndex(nextIndex);
      setIsCardFading(false);
    }, 240);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      changeFeaturedCard((featuredCardIndex + 1) % featuredCards.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      if (cardFadeTimeoutRef.current) clearTimeout(cardFadeTimeoutRef.current);
    };
  }, [featuredCardIndex, featuredCards.length, changeFeaturedCard]);

  const handleManualNext = () => {
    changeFeaturedCard((featuredCardIndex + 1) % featuredCards.length);
  };

  const handleManualPrev = () => {
    changeFeaturedCard((featuredCardIndex - 1 + featuredCards.length) % featuredCards.length);
  };

  // 3D Circular Carousel States and Config
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [radius, setRadius] = useState<number>(310);
  const [cardSize, setCardSize] = useState({ width: 450, height: 260 });

  // Dragging states
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        window.scrollTo(0, el.offsetTop);
      }
    }
  }, []);
  const dragStartXRef = React.useRef<number>(0);
  const dragStartAngleRef = React.useRef<number>(0);
  const hasDraggedRef = React.useRef<boolean>(false);
  const resumeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

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
      image: "/dia_5_guiza.jpg",
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
      image: "/senior dynamic ok.png",
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
      image: "/dynamic_egipto_abu_simbel.png",
      price: "1250€"
    },
    {
      id: 2,
      title: "TURQUÍA:\nDescuento de 100€ por persona",
      subtitle: "Para reservas hasta agotar cupos.",
      tag: "Rebajas 2026",
      image: "/turquia_dynamic.png"
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
      image: "/senior dynamic ok.png"
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
      image: "/noche_cairota.jpg",
      badges: ["Asistencia Vip", "Traslado Privado", "Hotel 5★ Lujo"],
      icon: Sparkles
    },
    {
      day: "Día 2",
      title: "El Despertar de los Faraones",
      subtitle: "Las Grandes Pirámides de Guiza y la Esfinge",
      narrative: "Desayuno gourmet. Visita privada al legendario complejo arqueológico de Guiza: las pirámides de Keops, Kefrén y Micerino, la mística Esfinge esculpida en roca y el templo del valle. Acompañados en exclusiva por un arqueólogo egiptólogo bilingüe oficial de nuestra firma.",
      image: "/dia_5_guiza.jpg",
      badges: ["Egiptólogo Privado", "Acceso Preferencial", "Almuerzo de Autor"],
      icon: Compass
    },
    {
      day: "Día 3",
      title: "Vuelo a Luxor y Crucero Fluvial",
      subtitle: "Embarque en Motonave de Firma de 5★",
      narrative: "Vuelo de conexión directo a Luxor incluido. Embarque prioritario en nuestro barco fluvial exclusivo. Por la tarde, visita monumental a los espectaculares Templos de Karnak y Luxor, conectados por la famosa avenida de las esfinges e iluminados al atardecer.",
      image: "/globo_luxor.jpg",
      badges: ["Vuelo Doméstico", "Crucero Fluvial", "Pensión Completa"],
      icon: Anchor
    },
    {
      day: "Día 4",
      title: "El Valle de los Reyes y Navegación",
      subtitle: "Tumbas Reales y Cruzar la Esclusa de Esna",
      narrative: "Paseo al amanecer por el Valle de los Reyes para explorar las tumbas secretas de los grandes faraones del Imperio Nuevo. Visita al Templo de la Reina Hatshepsut y parada fotográfica en los Colosos de Memnón. Tarde de navegación contemplativa hacia Esna disfrutando del té en cubierta.",
      image: "/alejandria.jpg",
      badges: ["Valle de los Reyes", "Hatshepsut", "Navegación Relax"],
      icon: MapPin
    },
    {
      day: "Día 5",
      title: "El Esplendor del Nilo Medio",
      subtitle: "Templos Monumentales de Edfu y Kom Ombo",
      narrative: "Traslado tradicional en calesas para visitar el Templo de Horus en Edfu, el mejor conservado del país. De vuelta a bordo, navegación hacia Kom Ombo para visitar el singular templo doble dedicado a los dioses Sobek (cocodrilo) y Haroeris (halcón). Cena de gala egipcia a bordo.",
      image: "/joyas nilo 2.png",
      badges: ["Calesa Clásica", "Kom Ombo", "Cena de Gala"],
      icon: ShieldCheck
    },
    {
      day: "Día 6",
      title: "Aswan y la Joya de Abu Simbel",
      subtitle: "Expedición en Avión a los Templos de Ramsés II",
      narrative: "Traslado VIP al aeropuerto de Aswan para volar hacia los colosales Templos de Abu Simbel, esculpidos en la roca del desierto por Ramsés II para su amada Nefertari. Por la tarde, navegación romántica en faluca tradicional y visita al Templo de Philae en la sagrada isla de Isis.",
      image: "/abu_simbel.jpg",
      badges: ["Abu Simbel en Avión", "Paseo en Faluca", "Isla de Philae"],
      icon: Plane
    },
    {
      day: "Día 7",
      title: "Regreso a El Cairo Histórico",
      subtitle: "Ciudadela, Barrio Copto y Gran Bazar",
      narrative: "Vuelo de retorno a El Cairo. Recorrido privado por la majestuosa Ciudadela de Saladino, la Mezquita de Alabastro y el pintoresco Barrio Copto. Finalizaremos el día perdiéndonos entre los aromas de especias, perfumes y artesanía del histórico bazar Khan el-Khalili.",
      image: "/DYNAMIC-logo-oscurecido.png",
      badges: ["Vuelo Incluido", "Bazar Khan el-Khalili", "Mezquita de Alabastro"],
      icon: Award
    },
    {
      day: "Día 8",
      title: "Despedida de Autor y Retorno",
      subtitle: "Custodia de Trámites y Vuelo de Regreso",
      narrative: "Último desayuno en el hotel. Traslado privado al aeropuerto internacional de El Cairo con nuestro personal, quien le custodiará y guiará en los trámites de facturación del equipaje y control de seguridad para garantizar un viaje de retorno plácido y sin complicaciones.",
      image: "/gem.jpeg",
      badges: ["Traslado Aeropuerto", "Asistencia Prioritaria", "Fin de Servicios"],
      icon: CheckCircle
    }
  ];

  const destinations = [
    // Portugal
    {
      title: "Escapada Porto & Crucero Seis Puentes",
      category: "escapada",
      image: "/portugal_porto.jpg",
      description: "Escapada gastronómica y cultural con encanto atlántico. 2N en Oporto en AD, paseo en barco rabelo de los seis puentes por el Duero, cata de vinos y seguro.",
      duration: "3 Días / 2 Noches",
      flights: "Vuelos regulares y traslados privados",
      price: "Desde 199 €"
    },
    // Egipto
    {
      title: "Descubre Egipto - ¡Últimas Plazas!",
      category: "oriente-medio",
      image: "https://www.dynamic-tours.com/images/ofertas/oferta3107.jpg",
      description: "3/4N Crucero por el Nilo en Pensión Completa + 3/4N El Cairo en AD + Vuelos + Traslados + Visitas guiadas en español + Seguro + Tasas incluidas.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos chárter directos y de línea regular",
      price: "Desde 499 €"
    },
    {
      title: "Maravillas del Nilo",
      category: "oriente-medio",
      image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
      description: "4N Crucero por el Nilo en motonave 5★ Lujo (Pensión Completa) + 3N en El Cairo (AD) + Vuelos domésticos + Pirámides de Guiza y templos de Luxor y Asuán.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos regulares con EgyptAir",
      price: "Desde 924 €"
    },
    {
      title: "Leyendas de Egipto (Con Abu Simbel)",
      category: "oriente-medio",
      image: "https://www.dynamic-tours.com/images/ofertas/oferta2693.jpg",
      description: "Salidas fijas los viernes. 3N Crucero Nilo en PC + 4N Cairo en AD + Visitas arqueológicas completas con egiptólogo y excursión a los Templos de Abu Simbel incluida.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos internacionales y domésticos",
      price: "Desde 889 €"
    },
    {
      title: "Egipto Infinito: Nilo & Desierto Blanco",
      category: "oriente-medio",
      image: "https://www.dynamic-tours.com/images/ofertas/oferta3093.jpg",
      description: "Ruta de contrastes: 3N crucero Nilo en PC + 3N El Cairo en MP + 1N de acampada bajo las estrellas en el Desierto Blanco en MP con travesía en 4x4 por Bahariya.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos y expedición 4x4 incluida",
      price: "Desde 1.359 €"
    },
    {
      title: "Egipto Selecto Senior (+55 Años)",
      category: "oriente-medio",
      image: "https://www.dynamic-tours.com/images/ofertas/oferta2990.jpg",
      description: "Programa exclusivo para mayores de 55 años y acompañantes. Pensión completa en crucero y El Cairo con agua incluida, visado pagado, visitas pausadas y seguro ampliado.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos garantizados y asistencia 24h",
      price: "Desde 1.285 €"
    },
    {
      title: "Isis + Hurghada (Nilo & Mar Rojo)",
      category: "oriente-medio",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      description: "El combo perfecto: 4N crucero Nilo en PC + 3N El Cairo en AD + 3N en resort de playa en Hurghada con régimen de Todo Incluido frente a los arrecifes de coral.",
      duration: "11 Días / 10 Noches",
      flights: "Vuelos internacionales y vuelos internos",
      price: "Desde 1.365 €"
    },
    // Turquía
    {
      title: "Sueños de Estambul y Capadocia",
      category: "turquia",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
      description: "4N Estambul en AD + 3N Capadocia en Pensión Completa + 1 vuelo doméstico + Vuelos Turkish Airlines + Visitas a Santa Sofía, Bósforo y chimeneas de hadas de Göreme.",
      duration: "8 Días / 7 Noches",
      flights: "Turkish Airlines con 20kg en bodega",
      price: "Desde 899 €"
    },
    {
      title: "Ruta Turca Completa Confort",
      category: "turquia",
      image: "https://www.dynamic-tours.com/images/ofertas/oferta2940.jpg",
      description: "Gran circuito por Anatolia: Estambul monumental, Ankara, Capadocia, Pamukkale (castillo de algodón de calcio), ruinas de Éfeso y Casa de la Virgen María.",
      duration: "10 Días / 9 Noches",
      flights: "Circuito terrestre en autocar VIP",
      price: "Desde 1.150 €"
    },
    // Jordania
    {
      title: "Maravillas del Hachemita y Wadi Rum",
      category: "oriente-medio",
      image: "/jordania_petra.jpg",
      description: "4N Ammán en MP + 2N Petra en MP + 1N en Campamento Beduino en Wadi Rum en MP bajo las estrellas. Safari en 4x4 por el desierto, entrada a Petra y Mar Muerto.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos regulares a Ammán y traslados",
      price: "Desde 1.425 €"
    },
    // India
    {
      title: "Triángulo de Oro y Benarés",
      category: "asia",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      description: "Delhi histórica y moderna, la majestuosidad del Taj Mahal en Agra, la Ciudad Rosa de Jaipur y la mística Benarés con ceremonia Aarti en el río Ganges.",
      duration: "9 Días / 7 Noches",
      flights: "Vuelos internacionales y chofer privado",
      price: "Desde 1.290 €"
    },
    // Uzbekistán
    {
      title: "Uzbekistán Clásico: Ruta de la Seda",
      category: "uzbekistan",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      description: "Tashkent, Samarcanda con la Plaza del Registán, el gran oasis de Bujará y la amurallada Jiva. Billetes de tren rápido Afrosiyob y guías oficiales en español.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos y tren de alta velocidad incluidos",
      price: "Desde 1.390 €"
    },
    // Kenia
    {
      title: "Safari Masái Footsteps & Naivasha",
      category: "africa",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      description: "2N Nairobi + 1N Amboseli frente al Monte Kilimanjaro + 1N Lago Naivasha + 2N en Masái Mara en Pensión Completa con safaris para avistar los cinco grandes.",
      duration: "9 Días / 6 Noches",
      flights: "Vuelos regulares y 4x4 de safari",
      price: "Desde 2.190 €"
    },
    // Marruecos
    {
      title: "Ciudades Rojas y Desierto de Merzouga",
      category: "africa",
      image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
      description: "Marrakech, gargantas del Todra, noche en campamento de jaimas en las dunas de Merzouga, kasbahs de Ait Ben Haddou y Ouarzazate en Media Pensión.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos a Marrakech incluidos",
      price: "Desde 635 €"
    },
    // Japón
    {
      title: "Japón Fascinante: Tokio, Kioto y Kanazawa",
      category: "asia",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      description: "La perfecta combinación de modernidad y tradición. Templos de Kioto, jardines Kenroku-en de Kanazawa, metrópoli de Tokio y tren bala Shinkansen.",
      duration: "9 Días / 7 Noches",
      flights: "Línea regular internacional",
      price: "Desde 2.390 €"
    },
    // Escocia
    {
      title: "Tesoros y Castillos de Escocia",
      category: "europa",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
      description: "Edimburgo, Aberdeen, Tierras Altas, Lago Ness y Castillo de Stirling con Media Pensión en ruta, destilería de whisky y entradas históricas.",
      duration: "8 Días / 7 Noches",
      flights: "Vuelos directos a Edimburgo",
      price: "Desde 1.450 €"
    }
  ];

  const brochures = [
    {
      title: "Folleto Egipto Completo",
      desc: "Programas regulares, cruceros de firma, extensiones al Mar Rojo y salidas desde provincias españolas.",
      image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80",
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
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800 overflow-x-hidden">
      
            {/* Main Header matching reference design */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo and Slogan */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="cursor-pointer flex items-center"
              >
                <Logo className="h-7.5 sm:h-8 shrink-0" classNameImg="mix-blend-multiply" />
              </div>
              <div className="hidden sm:block h-4.5 w-px bg-slate-300"></div>
              <div className="hidden sm:flex items-center gap-1 font-bold text-[10px] sm:text-[10.5px] tracking-wide uppercase whitespace-nowrap">
                <span className="text-[#1F82D2]">AGENCIA MAYORISTA</span>
                <span className="text-[#52A72B]">DE VIAJES</span>
              </div>
            </div>

            {/* Public Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 text-[11px] xl:text-xs font-bold text-slate-800 whitespace-nowrap">
              <button 
                ref={destinosButtonRef}
                onClick={() => setIsDestDropdownOpen(!isDestDropdownOpen)}
                aria-expanded={isDestDropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 uppercase tracking-wider transition-all py-1.5 px-3 rounded-lg cursor-pointer font-bold text-xs ${
                  isDestDropdownOpen 
                    ? "bg-white border border-[#1F82D2] text-[#0A0F1D]" 
                    : "bg-transparent border border-transparent text-slate-800 hover:text-[#1F82D2]"
                }`}
              >
                <span>DESTINOS</span>
                {isDestDropdownOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#1F82D2]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              <span className="text-slate-300">·</span>
              <a href="#ofertas" className="hover:text-[#1F82D2] transition-colors font-bold">Ofertas</a>
              <span className="text-slate-300">·</span>
              <a href="#grupos" className="hover:text-[#1F82D2] transition-colors font-bold">Grupos</a>
              <span className="text-slate-300">·</span>
              <a href="#nosotros" className="hover:text-[#1F82D2] transition-colors font-bold">Sobre Dynamic</a>
            </nav>

            {/* Right Buttons: Buscador + ACCESO AGENCIAS */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <button
                onClick={() => setIsDestDropdownOpen(!isDestDropdownOpen)}
                className={`lg:hidden flex items-center gap-1 font-bold text-xs py-1.5 px-2.5 rounded-lg transition-all cursor-pointer ${
                  isDestDropdownOpen 
                    ? "bg-white border border-[#1F82D2] text-[#0A0F1D]" 
                    : "bg-[#f1f5f9] text-slate-700 hover:bg-[#e2e8f0]"
                }`}
              >
                <span>Destinos</span>
                {isDestDropdownOpen ? <ChevronUp className="w-3 h-3 text-[#1F82D2]" /> : <ChevronDown className="w-3 h-3 text-slate-500" />}
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("hero-finder");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:flex items-center gap-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-slate-700 font-bold text-xs py-1.5 px-3 rounded-full border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>Buscador</span>
              </button>

              <button
                onClick={() => setIsLoginModalOpen(true)}
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
                  onClick={() => {
                    setIsDestDropdownOpen(false);
                    destinosButtonRef.current?.focus();
                  }}
                  aria-label="Cerrar menú de destinos"
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
                    onClick={(e) => {
                      if (country.destKey) {
                        setSelectedDest(country.destKey);
                        setIsDestDropdownOpen(false);
                        const el = document.getElementById("ofertas");
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    className="text-slate-600 hover:text-[#1F82D2] font-medium text-sm sm:text-[14.5px] transition-colors py-1 cursor-pointer focus:outline-none focus:text-[#1F82D2] truncate"
                  >
                    {country.name}
                  </a>
                ))}
              </div>

              {/* Franja Inferior */}
              <div className="border-t border-slate-200/70 mt-5 sm:mt-6 pt-4 sm:pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <p className="text-xs sm:text-[13px] text-slate-500 font-normal text-left max-w-xl">
                  {activeRegion.phrase}
                </p>

                <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-end">
                  <a
                    href="https://www.dynamic-tours.com/destinos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-[13px] font-bold text-[#0A0F1D] hover:text-[#1F82D2] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Ir a Destinos Dynamic
                  </a>

                  <a
                    href={activeRegion.categoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-105 text-white font-bold text-xs sm:text-[12px] uppercase tracking-wider py-2.5 px-4 sm:px-5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>VER PROGRAMAS DE {activeRegion.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION MATCHING REFERENCE DESIGN */}
      <section className="relative z-20 text-white overflow-visible min-h-[640px] md:h-[calc(100vh-4rem)] md:max-h-[665px] md:min-h-[560px] flex flex-col justify-between">
        
        {/* Hero Video Background Layer (kept exactly as inserted) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
          <video
            ref={videoRef}
            src={assetUrl("home_dynamic_hero_optimized.mp4")}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-100"
          >
            <source src={assetUrl("home_dynamic_hero_optimized.mp4")} type="video/mp4" />
            <source src={assetUrl("home_dynamic_hero_720p.mp4")} type="video/mp4" />
          </video>
          {/* Natural cinematic overlay for readability while keeping video luminous */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20"></div>
        </div>

        {/* Hero Main Content Area */}
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-14 pb-4 sm:pb-6 relative z-20 flex-1 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Big Headline & Explorar destinos Button */}
          <div className="max-w-xl lg:max-w-2xl text-left space-y-6 sm:space-y-7">
            <h1 className="text-[27px] sm:text-4xl lg:text-[50px] xl:text-[56px] leading-[1.15] text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] font-sans">
              <span className="font-normal">Más </span>
              <span className="font-bold">mundo</span>
              <span className="font-normal"> para tus</span><br />
              <span className="font-bold">viajeros.</span>
              <span className="font-normal"> Más </span>
              <span className="font-bold">respaldo</span><br />
              <span className="font-normal">para tu </span>
              <span className="font-bold">agencia.</span>
            </h1>

            <div>
              <a
                href="#ofertas"
                className="inline-flex items-center justify-center bg-white/[0.14] hover:bg-white/[0.22] backdrop-blur-md border border-white/25 text-white font-medium text-sm px-6 py-3 rounded-xl shadow-xs transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                Explorar destinos
              </a>
            </div>
          </div>

          {/* Right Column: Floating Tour Card (Reduced width & Translucent Frosted Glass) */}
          <div className="w-full sm:w-[300px] lg:w-[305px] shrink-0 lg:mr-4 xl:mr-8">
            <div 
              className="rounded-[20px] shadow-[0_15px_35px_rgba(0,0,0,0.25)] border"
              style={{
                borderColor: "rgba(255, 255, 255, 0.25)",
              }}
            >
              
              {/* Card Image */}
              <div className={`relative w-full aspect-[2/1] overflow-hidden rounded-t-[20px] transition-opacity duration-300 ease-in-out ${isCardFading ? "opacity-30" : "opacity-100"}`}>
                <img 
                  src={assetUrl(featuredCards[featuredCardIndex].image)} 
                  alt={featuredCards[featuredCardIndex].country} 
                  className="w-full h-full object-cover rounded-t-[20px]"
                />
                {/* Pill Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="inline-block bg-white/25 backdrop-blur-md border border-white/40 text-white text-[10px] font-bold tracking-wider px-3 py-0.5 rounded-full shadow-xs uppercase">
                    {featuredCards[featuredCardIndex].badge}
                  </span>
                </div>
              </div>

              {/* Card Body - Frosted Translucent Glass matching the search bar */}
              <div 
                className="p-4 sm:p-5 text-left space-y-2.5 rounded-b-[20px]"
                style={{
                  background: "rgba(255, 255, 255, 0.16)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                }}
              >
                <div className={`space-y-2.5 transition-opacity duration-300 ease-in-out ${isCardFading ? "opacity-30" : "opacity-100"}`}>
                  {/* Title & Duration */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-xs sm:text-[13px] font-bold tracking-widest uppercase">
                      {featuredCards[featuredCardIndex].country}
                    </h3>
                    <span className="text-white/80 text-[11px] font-medium tracking-tight">
                      {featuredCards[featuredCardIndex].duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/85 text-xs font-normal leading-relaxed min-h-[34px] line-clamp-2">
                    {featuredCards[featuredCardIndex].description}
                  </p>

                  {/* Price */}
                  <div className="pt-0.5 flex items-baseline gap-1.5">
                    <span className="text-white/70 text-xs font-normal">Desde</span>
                    <span className="text-white text-2xl font-bold tracking-tight">
                      {featuredCards[featuredCardIndex].price}
                    </span>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-2.5 flex items-center justify-between border-t border-white/15">
                  {/* Small button with transparent background and thin gradient border */}
                  <button
                    onClick={() => {
                      const card = featuredCards[featuredCardIndex];
                      if (card.id === "egipto" && onSelectLeyendas) {
                        onSelectLeyendas();
                      } else {
                        setSelectedDest(card.destKey);
                        const el = document.getElementById("ofertas");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="relative group inline-flex items-center gap-1.5 px-3 py-1.5 text-white text-[11px] sm:text-xs font-medium rounded-lg hover:bg-white/10 transition-colors cursor-pointer bg-transparent"
                  >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-lg" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="vpBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1F82D2" />
                          <stop offset="100%" stopColor="#52A72B" />
                        </linearGradient>
                      </defs>
                      <rect x="0.75" y="0.75" width="calc(100% - 1.5px)" height="calc(100% - 1.5px)" rx="7" ry="7" fill="none" stroke="url(#vpBorderGrad)" strokeWidth="1.5" />
                    </svg>
                    <span className="relative z-10">Ver programa</span>
                    <ArrowRight className="w-3 h-3 text-white relative z-10" />
                  </button>

                  {/* Prev / Next controls */}
                  <div className="flex items-center gap-1 text-white/80">
                    <button
                      onClick={handleManualPrev}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      title="Anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleManualNext}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      title="Siguiente"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom Horizontal Search Bar (Buscador B2B Translúcido con cajas limpias) */}
        <div id="hero-finder" className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5 lg:mb-6 relative z-30">
          <div 
            ref={finderBarRef}
            className="rounded-[18px] p-2 sm:p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 md:gap-3 transition-all relative"
            style={{
              background: "rgba(10, 15, 29, 0.55)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
            }}
          >
            
            {/* Box 1: DESTINO */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => {
                  setIsDestPickerOpen(!isDestPickerOpen);
                  setIsDatePickerOpen(false);
                  setIsTypePickerOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2.5 px-4 py-3 rounded-xl transition-all cursor-pointer border ${
                  isDestPickerOpen 
                    ? "bg-white/25 border-white/40 ring-2 ring-[#1F82D2] text-white" 
                    : "bg-white/10 hover:bg-white/15 border-white/15 text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin className="w-4 h-4 text-[#1F82D2] shrink-0" />
                  <span className={`text-sm sm:text-[15px] truncate ${selectedDest !== "todos" ? "font-semibold text-white" : "font-normal text-white/90"}`}>
                    {selectedDest === "todos" ? "Destino" : selectedDest}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {selectedDest !== "todos" && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDest("todos");
                      }}
                      className="p-1 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors"
                      title="Quitar destino"
                    >
                      <X className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isDestPickerOpen ? "rotate-180 text-white" : ""}`} />
                </div>
              </button>

              {/* Popover Destino: Todos los países que trabaja Dynamic */}
              {isDestPickerOpen && (
                <div 
                  className="absolute top-full left-0 mt-2.5 w-[94vw] sm:w-[480px] max-w-[520px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-200/90 z-50 overflow-hidden text-slate-800 text-left animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Buscador rápido de países */}
                  <div className="p-3.5 bg-slate-50 border-b border-slate-200/80">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={destSearchQuery}
                        onChange={(e) => setDestSearchQuery(e.target.value)}
                        placeholder="Buscar entre los 42 países de Dynamic Tours..."
                        className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F82D2] focus:border-transparent transition-all"
                        autoFocus
                      />
                      {destSearchQuery && (
                        <button 
                          onClick={() => setDestSearchQuery("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Listado de países de Dynamic Tours */}
                  <div className="max-h-[350px] overflow-y-auto p-3.5 space-y-3.5">
                    {/* Opción Todos los destinos */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDest("todos");
                        setIsDestPickerOpen(false);
                        setDestSearchQuery("");
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        selectedDest === "todos"
                          ? "bg-[#1F82D2] text-white"
                          : "bg-slate-100 hover:bg-slate-200/70 text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4 shrink-0" />
                        Todos los destinos
                      </span>
                      <span className="text-[11px] opacity-80">42 países</span>
                    </button>

                    {/* Agrupación por regiones */}
                    {filteredRegionsList.map((reg) => (
                      <div key={reg.regionId} className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 pt-1">
                          <span>{reg.regionName}</span>
                          <span className="font-normal text-slate-400">{reg.countries.length} países</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {reg.countries.map((c) => {
                            const isSelected = selectedDest.toLowerCase() === c.toLowerCase();
                            return (
                              <button
                                key={c}
                                type="button"
                                onClick={() => {
                                  setSelectedDest(c);
                                  setIsDestPickerOpen(false);
                                  setDestSearchQuery("");
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white shadow-xs"
                                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900"
                                }`}
                              >
                                {c}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Box 2: FECHA */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => {
                  setIsDatePickerOpen(!isDatePickerOpen);
                  setIsDestPickerOpen(false);
                  setIsTypePickerOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2.5 px-4 py-3 rounded-xl transition-all cursor-pointer border ${
                  isDatePickerOpen 
                    ? "bg-white/25 border-white/40 ring-2 ring-[#52A72B] text-white" 
                    : "bg-white/10 hover:bg-white/15 border-white/15 text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Calendar className="w-4 h-4 text-[#52A72B] shrink-0" />
                  <span className={`text-sm sm:text-[15px] truncate ${selectedDate ? "font-semibold text-white" : "font-normal text-white/90"}`}>
                    {!selectedDate ? "Fecha" : selectedDate}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {selectedDate && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDate("");
                      }}
                      className="p-1 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors"
                      title="Quitar fecha"
                    >
                      <X className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isDatePickerOpen ? "rotate-180 text-white" : ""}`} />
                </div>
              </button>

              {/* Popover Calendario */}
              {isDatePickerOpen && (
                <div 
                  className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 mt-2.5 w-[94vw] sm:w-[360px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-200/90 z-50 p-4 text-slate-800 text-left animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Encabezado Mes / Año con flechas */}
                  <div className="flex items-center justify-between mb-3.5 px-1">
                    <span className="text-sm font-bold text-slate-900 tracking-tight">
                      {monthNames[calendarMonth]} {calendarYear}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Días de la semana */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                    {weekDayLabels.map((wd) => (
                      <span key={wd} className="text-[11px] font-semibold text-slate-400 py-1">
                        {wd}
                      </span>
                    ))}
                  </div>

                  {/* Cuadrícula de días */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Días mes anterior */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <span key={`prev-${i}`} className="text-xs text-slate-300 py-2">
                        {daysInPreviousMonth - firstDayOfMonth + i + 1}
                      </span>
                    ))}

                    {/* Días mes actual */}
                    {Array.from({ length: daysInCurrentMonth }).map((_, i) => {
                      const dayNumber = i + 1;
                      const dateStr = `${dayNumber} ${monthNames[calendarMonth].slice(0, 3)} ${calendarYear}`;
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          key={`day-${dayNumber}`}
                          type="button"
                          onClick={() => {
                            setSelectedDate(dateStr);
                            setIsDatePickerOpen(false);
                          }}
                          className={`text-xs py-2 rounded-lg font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white font-bold shadow-xs scale-105"
                              : "hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                          }`}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>

                  {/* Accesos rápidos de fechas / temporadas */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Accesos directos por temporada
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDate("");
                          setIsDatePickerOpen(false);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          !selectedDate ? "bg-[#1F82D2] text-white font-medium" : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                        }`}
                      >
                        Cualquier fecha
                      </button>
                      {["Noviembre 2026", "Diciembre 2026", "Fin de Año 2026", "Semana Santa 2027"].map((season) => (
                        <button
                          key={season}
                          type="button"
                          onClick={() => {
                            setSelectedDate(season);
                            setIsDatePickerOpen(false);
                          }}
                          className={`text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            selectedDate === season
                              ? "bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white font-medium shadow-xs"
                              : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                          }`}
                        >
                          {season}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Box 3: TIPO DE VIAJE */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => {
                  setIsTypePickerOpen(!isTypePickerOpen);
                  setIsDestPickerOpen(false);
                  setIsDatePickerOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2.5 px-4 py-3 rounded-xl transition-all cursor-pointer border ${
                  isTypePickerOpen 
                    ? "bg-white/25 border-white/40 ring-2 ring-[#1F82D2] text-white" 
                    : "bg-white/10 hover:bg-white/15 border-white/15 text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Compass className="w-4 h-4 text-[#1F82D2] shrink-0" />
                  <span className={`text-sm sm:text-[15px] truncate ${selectedType !== "todos" ? "font-semibold text-white" : "font-normal text-white/90"}`}>
                    {selectedType === "todos" ? "Tipo de viaje" : selectedType}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {selectedType !== "todos" && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedType("todos");
                      }}
                      className="p-1 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors"
                      title="Quitar tipo de viaje"
                    >
                      <X className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isTypePickerOpen ? "rotate-180 text-white" : ""}`} />
                </div>
              </button>

              {/* Popover Tipo de Viaje */}
              {isTypePickerOpen && (
                <div 
                  className="absolute top-full right-0 mt-2.5 w-[94vw] sm:w-[340px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-200/90 z-50 p-2 text-slate-800 text-left animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Seleccionar tipo de viaje
                    </span>
                  </div>

                  <div className="p-1 space-y-1">
                    {/* Opción Todos */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType("todos");
                        setIsTypePickerOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-start gap-3 transition-all cursor-pointer text-left ${
                        selectedType === "todos" ? "bg-[#F0F7FF] ring-1 ring-[#1F82D2]" : "hover:bg-slate-50"
                      }`}
                    >
                      <Globe className="w-4 h-4 text-[#1F82D2] mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-xs sm:text-sm font-semibold text-slate-900">
                          Todos los tipos
                        </span>
                        <span className="block text-[11px] text-slate-500">
                          Ver todo el catálogo oficial
                        </span>
                      </div>
                    </button>

                    {/* 1. Circuito */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType("Circuito");
                        setIsTypePickerOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-start gap-3 transition-all cursor-pointer text-left ${
                        selectedType === "Circuito" ? "bg-[#F0F7FF] ring-1 ring-[#1F82D2]" : "hover:bg-slate-50"
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-[#1F82D2] mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-xs sm:text-sm font-semibold text-slate-900">
                          Circuito
                        </span>
                        <span className="block text-[11px] text-slate-500 leading-tight">
                          Grandes viajes, cruceros fluviales y rutas culturales completas
                        </span>
                      </div>
                    </button>

                    {/* 2. Escapada */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType("Escapada");
                        setIsTypePickerOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-start gap-3 transition-all cursor-pointer text-left ${
                        selectedType === "Escapada" ? "bg-[#F0F7FF] ring-1 ring-[#1F82D2]" : "hover:bg-slate-50"
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#52A72B] mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-xs sm:text-sm font-semibold text-slate-900">
                          Escapada
                        </span>
                        <span className="block text-[11px] text-slate-500 leading-tight">
                          City breaks y estancias en ciudades de 3 a 5 días
                        </span>
                      </div>
                    </button>

                    {/* 3. Grupos a medida */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType("Grupos a medida");
                        setIsTypePickerOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-start gap-3 transition-all cursor-pointer text-left ${
                        selectedType === "Grupos a medida" ? "bg-[#F0F7FF] ring-1 ring-[#1F82D2]" : "hover:bg-slate-50"
                      }`}
                    >
                      <Users className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-xs sm:text-sm font-semibold text-slate-900">
                          Grupos a medida
                        </span>
                        <span className="block text-[11px] text-slate-500 leading-tight">
                          Cotizaciones exclusivas para agencias, empresas e incentivos
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Search className="w-4 h-4 text-white" />
              <span>Buscar</span>
            </button>

          </div>
        </div>

      </section>

      {/* Nuevo Bloque Introductorio B2B */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={introRef}
            className={`max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 transition-all duration-[600ms] ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              introInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
            }`}
          >
            {/* Antetítulo */}
            <span className="block text-[11.5px] sm:text-xs lg:text-[13px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent select-none">
              DYNAMIC TOURS · MAYORISTA DE VIAJES
            </span>

            {/* Título: igual tipografía y tamaño que 'Cada cliente, una forma de viajar...' */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-normal text-[#0A0F1D] font-sans tracking-tight leading-[1.25] sm:leading-[1.2]">
              Conocemos el destino.<br className="hidden sm:inline" />{" "}
              Entendemos tu negocio.
            </h2>

            {/* Párrafo debajo del título */}
            <p className="pt-2 sm:pt-3 text-[#475569] text-base sm:text-lg lg:text-[17px] xl:text-[18px] font-normal leading-relaxed sm:leading-[1.65] max-w-3xl mx-auto">
              Trabajamos junto a las agencias de viajes para dar forma a lo que sus clientes buscan. Ampliamos de forma continua y &ldquo;Dynamica&rdquo; nuestra programación con nuevos destinos y experiencias, combinando circuitos, cruceros y viajes a medida, ofreciendo respaldo desde la elección del itinerario hasta la gestión de la reserva.
            </p>
          </div>
        </div>
      </section>

      {/* RESULTADOS DE BÚSQUEDA Section (Basados en dynamic-tours.com) */}
      {hasSearched && (
        <section id="resultados-busqueda" className="py-10 sm:py-14 bg-[#F1F5F9] border-b border-slate-200/80 scroll-mt-20 relative animate-in fade-in duration-300">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header del Bloque de Resultados */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 text-left">
              <div>
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent mb-1">
                  CATÁLOGO OFICIAL · DYNAMIC-TOURS.COM
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1D] font-sans tracking-tight flex items-center flex-wrap gap-2.5">
                  <span>Resultados de búsqueda</span>
                  <span className="text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[#1F82D2] shadow-xs">
                    {filteredCatalogTrips.length} viajes encontrados
                  </span>
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
                  Itinerarios comisionables, cupos confirmados y operativa profesional de Dynamic Tours para agencias de viajes.
                </p>
              </div>

              {/* Botón para cerrar o resetear búsqueda */}
              <div className="flex items-center gap-2 shrink-0">
                {(selectedDest !== "todos" || selectedDate || selectedType !== "todos") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDest("todos");
                      setSelectedDate("");
                      setSelectedType("todos");
                      setResultTypeTab("todos");
                    }}
                    className="text-xs font-semibold text-[#1F82D2] hover:text-[#1868A8] bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer"
                  >
                    Limpiar filtros
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setHasSearched(false)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Ocultar</span>
                </button>
              </div>
            </div>

            {/* Badges de filtros activos */}
            {(selectedDest !== "todos" || selectedDate || selectedType !== "todos") && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs font-semibold text-slate-400 mr-1">Filtros activos:</span>
                {selectedDest !== "todos" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
                    <MapPin className="w-3 h-3 text-[#1F82D2]" />
                    <span>Destino: <strong>{selectedDest}</strong></span>
                    <button 
                      type="button"
                      onClick={() => setSelectedDest("todos")}
                      className="text-slate-400 hover:text-slate-700 p-0.5 rounded-full hover:bg-slate-100 cursor-pointer"
                      title="Quitar destino"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedDate && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
                    <Calendar className="w-3 h-3 text-[#52A72B]" />
                    <span>Fecha: <strong>{selectedDate}</strong></span>
                    <button 
                      type="button"
                      onClick={() => setSelectedDate("")}
                      className="text-slate-400 hover:text-slate-700 p-0.5 rounded-full hover:bg-slate-100 cursor-pointer"
                      title="Quitar fecha"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedType !== "todos" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
                    <Compass className="w-3 h-3 text-[#1F82D2]" />
                    <span>Tipo: <strong>{selectedType}</strong></span>
                    <button 
                      type="button"
                      onClick={() => {
                        setSelectedType("todos");
                        setResultTypeTab("todos");
                      }}
                      className="text-slate-400 hover:text-slate-700 p-0.5 rounded-full hover:bg-slate-100 cursor-pointer"
                      title="Quitar tipo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Pestañas de Tipo de Viaje secundarias */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar text-xs sm:text-sm">
              {[
                { id: "todos", label: "Todos los viajes" },
                { id: "Circuito", label: "Circuitos" },
                { id: "Escapada", label: "Escapadas" },
                { id: "Grupos a medida", label: "Grupos a medida" },
              ].map((tab) => {
                const isCurrent = (resultTypeTab === tab.id) || (resultTypeTab === "todos" && selectedType === tab.id);
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setResultTypeTab(tab.id);
                      if (tab.id !== "todos") {
                        setSelectedType(tab.id);
                      } else {
                        setSelectedType("todos");
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                      isCurrent
                        ? "bg-[#0A1628] text-white shadow-xs"
                        : "bg-white hover:bg-slate-200/70 text-slate-600 border border-slate-200/80"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Cuadrícula de Resultados */}
            {filteredCatalogTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 xl:gap-[34px]">
                {filteredCatalogTrips.map((trip) => {
                  const badgeStyle = 
                    trip.type === "Circuito"
                      ? "bg-emerald-600 text-white"
                      : trip.type === "Escapada"
                      ? "bg-[#1F82D2] text-white"
                      : "bg-purple-600 text-white";

                  return (
                    <div 
                      key={trip.id}
                      className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-slate-200/80 transition-all duration-300 group flex flex-col h-full text-left"
                    >
                      {/* Imagen superior */}
                      <div className="relative w-full h-[210px] overflow-hidden bg-slate-100">
                        <img 
                          src={assetUrl(trip.image)} 
                          alt={trip.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                        {/* Badges superiores */}
                        <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2 z-10 pointer-events-none">
                          <span className={`px-2.5 py-1 rounded-[7px] text-[10px] font-bold uppercase tracking-wider shadow-xs ${badgeStyle}`}>
                            {trip.type.toUpperCase()}
                          </span>
                          <span className="px-2.5 py-1 rounded-[7px] bg-black/60 backdrop-blur-md text-white font-medium text-[10.5px] tracking-wide uppercase">
                            {trip.duration}
                          </span>
                        </div>

                        {/* Badge de país inferior en la foto */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
                          <span className="px-2.5 py-1 rounded-[7px] bg-white/90 backdrop-blur-md text-[#0A1628] font-bold text-[11px] tracking-wide flex items-center gap-1 shadow-xs">
                            <MapPin className="w-3 h-3 text-[#1F82D2]" />
                            {trip.country.toUpperCase()}
                          </span>
                          {trip.tag && (
                            <span className="px-2 py-0.5 rounded-[6px] bg-[#52A72B]/90 backdrop-blur-md text-white font-semibold text-[9.5px] uppercase tracking-wider shadow-xs">
                              {trip.tag}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Cuerpo de la tarjeta */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-base sm:text-[17px] font-bold text-[#0A1628] leading-snug line-clamp-2 group-hover:text-[#1F82D2] transition-colors">
                            {trip.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed line-clamp-2">
                            {trip.description}
                          </p>

                          {/* Puntos destacados / Highlights */}
                          {trip.highlights && trip.highlights.length > 0 && (
                            <div className="pt-2 border-t border-slate-100 space-y-1">
                              {trip.highlights.slice(0, 3).map((hl, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-[11.5px] text-slate-600">
                                  <CheckCircle className="w-3 h-3 text-[#52A72B] shrink-0" />
                                  <span className="truncate">{hl}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Base: Precio y Botón Ver Viaje */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                          <div>
                            <span className="block text-[10.5px] text-slate-400 font-medium leading-none mb-0.5">
                              {trip.price.includes("€") ? "Desde" : "Tarifa B2B"}
                            </span>
                            <span className="text-lg sm:text-xl font-extrabold text-[#0A1628] tracking-tight">
                              {trip.price}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {trip.officialUrl && (
                              <a
                                href={trip.officialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-97 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                              >
                                <span>Ver viaje</span>
                                <ArrowRight className="w-3 h-3 text-white" />
                              </a>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 text-center max-w-xl mx-auto space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    No se encontraron viajes con estos filtros
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                    Dynamic Tours opera circuitos, escapadas y grupos a medida en más de 42 países. Restablece la búsqueda o contacta con reservas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDest("todos");
                    setSelectedDate("");
                    setSelectedType("todos");
                    setResultTypeTab("todos");
                  }}
                  className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs hover:brightness-110 transition-all cursor-pointer"
                >
                  Ver todos los viajes
                </button>
              </div>
            )}

          </div>
        </section>
      )}

      {/* OFERTAS DESTACADAS Section */}
      <section id="ofertas" className="pt-10 sm:pt-14 pb-12 sm:pb-16 bg-[#F8FAFC] border-t border-slate-200/70 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-left mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1D] font-sans tracking-tight">
              Ofertas destacadas
            </h2>
          </div>

          {/* Grid: Exactly 3 columns and 2 rows on desktop (2 cols on tablet, 1 col on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 xl:gap-[38px]">
            {featuredOffers.map((offer) => (
              <div 
                key={offer.id}
                className="relative rounded-[18px] sm:rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-slate-200/80 transition-all duration-300 group flex flex-col h-[385px] sm:h-[395px] lg:h-[400px] xl:h-[415px]"
              >
                {/* 1. ÁREA SUPERIOR: Fotografía encuadrada respecto al área visible superior */}
                <div className="relative w-full flex-1 overflow-hidden bg-slate-100">
                  <img 
                    src={assetUrl(offer.image)} 
                    alt={offer.title} 
                    className={`w-full h-full object-cover ${offer.imagePos || "object-center"} group-hover:scale-104 transition-transform duration-700 ease-out`}
                    loading="eager"
                  />

                  {/* Etiquetas superiores sobre la fotografía */}
                  <div className="absolute top-0 inset-x-0 p-3 sm:p-4.5 flex items-start justify-between gap-1.5 z-10 pointer-events-none">
                    {/* Etiqueta superior izquierda: Blanca esmerilada con texto #24766F y borde blanco */}
                    <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-[7px] sm:rounded-[9px] bg-white/85 backdrop-blur-md border border-white/80 text-[#24766F] font-semibold text-[9.5px] sm:text-[11px] uppercase tracking-wider shadow-xs whitespace-nowrap">
                      {offer.tag}
                    </span>

                    {/* Duración superior derecha */}
                    <span className="text-white font-medium text-[10.5px] sm:text-[11.5px] tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] pt-0.5 whitespace-nowrap shrink-0">
                      {offer.duration}
                    </span>
                  </div>
                </div>

                {/* 2. PANEL INFERIOR: Cristal esmerilado luminoso con capa independiente de la misma imagen detrás */}
                <div className="relative z-10 w-full h-[174px] sm:h-[176px] lg:h-[178px] xl:h-[182px] rounded-t-[16px] sm:rounded-t-[18px] overflow-hidden border-t border-white/90 border-x border-white/60 shadow-[0_-2px_14px_rgba(0,0,0,0.03)] shrink-0">
                  
                  {/* Capa independiente de la misma imagen detrás del panel para producir el esmerilado */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <img 
                      src={assetUrl(offer.image)} 
                      alt="" 
                      aria-hidden="true"
                      className={`w-full h-full object-cover filter blur-[20px] scale-110 ${offer.bottomImagePos || offer.imagePos || "object-center"}`}
                    />
                    {/* Base blanca neutra luminosa y translúcida */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'rgba(255, 255, 255, 0.72)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.85)',
                      }}
                    />
                  </div>

                  {/* Contenido interior del panel */}
                  <div className="relative z-10 w-full h-full px-4 sm:px-4.5 xl:px-5 pt-2.5 sm:pt-3 xl:pt-3 pb-2.5 sm:pb-3 xl:pb-3 flex flex-col justify-between">
                    {/* Bloque superior de textos */}
                    <div className="space-y-0.5 text-left">
                      <h3 className="text-[17px] sm:text-[18px] lg:text-[18px] xl:text-[20px] font-semibold text-[#0A1931] leading-[1.14] tracking-tight">
                        <span className="block">{offer.titleLine1}</span>
                        {offer.titleLine2 && <span className="block">{offer.titleLine2}</span>}
                      </h3>

                      {offer.subtitle && (
                        <p className="text-[11.5px] sm:text-[12px] font-semibold text-[#0A1931] pt-0.5 leading-tight">
                          {offer.subtitle}
                        </p>
                      )}

                      <p className="text-slate-600 text-[11px] sm:text-[11.5px] xl:text-[12px] font-normal leading-[1.32] pt-0.5">
                        {offer.description}
                      </p>
                    </div>

                    {/* Fila inferior: Precio y Botón compacto (con separación mínima garantizada > 12px) */}
                    <div className="flex items-end justify-between gap-3 mt-3 pt-0.5 shrink-0">
                      <div className="text-left">
                        <span className="block text-[10.5px] sm:text-[11px] font-semibold text-[#0A1931] tracking-tight leading-none mb-1">
                          Desde
                        </span>
                        <span className="block text-2xl sm:text-[25px] xl:text-[27px] font-semibold text-[#0A1931] leading-none tracking-tight">
                          {offer.price}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (offer.isLeyendas && onSelectLeyendas) {
                            onSelectLeyendas();
                          } else {
                            setIsLoginModalOpen(true);
                          }
                        }}
                        className="inline-flex items-center justify-center gap-1.5 w-[118px] sm:w-[126px] xl:w-[132px] h-[36px] sm:h-[38px] rounded-[9px] sm:rounded-[10px] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-105 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap border-0 shrink-0"
                      >
                        <span>Ver viaje</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white stroke-[2]" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Destinos: Frase inspiracional y 5 Tarjetas Verticales de Regiones */}
      <section id="destinos-cards" className="pt-16 sm:pt-20 lg:pt-24 xl:pt-28 pb-12 sm:pb-16 bg-white relative overflow-hidden">
        {/* Frase inspiracional B2B */}
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-normal text-[#0A0F1D] font-sans tracking-tight leading-[1.25] sm:leading-[1.2]">
            Cada cliente, una forma de viajar.<br className="hidden sm:inline" />{" "}
            Tu agencia, un mundo de posibilidades.
          </h2>
        </div>

        <div className="w-full lg:w-[95%] max-w-[1680px] mx-auto">
          {/* Header del apartado */}
          <div className="text-left mb-6 sm:mb-7 px-4 sm:px-6 lg:px-0">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A0F1D] font-sans tracking-tight">
              Destinos Dynamic
            </h3>
          </div>

          {/* Fila en escritorio / carrusel fluido con snap en móvil */}
          <div className="flex lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-3.5 xl:gap-4.5 overflow-x-auto snap-x snap-mandatory pb-6 lg:pb-0 px-4 sm:px-6 lg:px-0 scrollbar-none items-stretch">
            {DESTINATION_CARDS_DATA.map((region) => {
              const isExpanded = !!expandedDestCards[region.id];
              return (
                <div
                  key={region.id}
                  onClick={() => {
                    if (!isExpanded) {
                      toggleDestCard(region.id);
                    }
                  }}
                  className="group relative shrink-0 w-[76vw] max-w-[320px] sm:w-[46vw] sm:max-w-[380px] md:w-[32vw] lg:w-auto lg:max-w-none h-[410px] sm:h-[430px] lg:h-[445px] xl:h-[465px] rounded-[20px] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)] transition-all duration-300 block select-none snap-start lg:snap-align-none border border-black/5 cursor-pointer"
                >
                  {/* Fotografía de fondo con zoom suave al hover */}
                  <img
                    src={assetUrl(region.image)}
                    alt={region.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ objectPosition: region.objectPosition }}
                    loading="eager"
                  />

                  {/* Degradado oscuro suavizado sobre la fotografía */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 30%, rgba(6,10,18,0.28) 46%, rgba(6,10,18,0.56) 64%, rgba(6,10,18,0.72) 84%, rgba(6,10,18,0.80) 100%)',
                    }}
                  />

                  {/* Contenido alineado: se desplaza suavemente hacia arriba al desplegar */}
                  <div
                    className={`absolute inset-x-0 px-3 sm:px-4 lg:px-3 xl:px-4 flex flex-col items-center text-center pointer-events-auto transition-all duration-500 ease-out ${
                      isExpanded
                        ? "top-[28%] sm:top-[30%] lg:top-[28%] xl:top-[30%]"
                        : "top-[48%] sm:top-[50%] lg:top-[48%] xl:top-[50%]"
                    }`}
                  >
                    {/* Título de la región */}
                    <h3 className="text-white font-extrabold text-lg sm:text-xl xl:text-2xl uppercase tracking-wider leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-2 sm:mb-2.5">
                      {region.name}
                    </h3>

                    {/* Elemento visual para desplegar / ocultar */}
                    <button
                      type="button"
                      onClick={(e) => toggleDestCard(region.id, e)}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? "Plegar países" : "Ver países"}
                      className={`inline-flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md border border-white/30 text-white shadow-xs transition-all duration-200 cursor-pointer ${
                        isExpanded
                          ? "w-7 h-7 sm:w-7.5 sm:h-7.5"
                          : "gap-1.5 px-3.5 py-1 sm:px-4 sm:py-1 text-[11px] sm:text-xs font-medium tracking-wide"
                      }`}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-white stroke-[2.5]" />
                      ) : (
                        <>
                          <span>Ver países</span>
                          <ChevronDown className="w-3.5 h-3.5 text-white stroke-[2]" />
                        </>
                      )}
                    </button>

                    {/* Bloque desplegable: Países y Botón Ver Programas */}
                    <div
                      className={`transition-all duration-500 ease-in-out flex flex-col items-center overflow-hidden w-full ${
                        isExpanded
                          ? "max-h-[260px] opacity-100 mt-3 sm:mt-3.5 pointer-events-auto"
                          : "max-h-0 opacity-0 mt-0 pointer-events-none"
                      }`}
                    >
                      {/* Países */}
                      <p className="text-slate-100 text-[11px] sm:text-[11.5px] lg:text-[11px] xl:text-[11.5px] font-medium leading-[1.38] sm:leading-[1.4] max-w-[270px] mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] text-center">
                        {region.lineGroups ? (
                          region.lineGroups.map((line, lineIdx) => (
                            <span key={lineIdx} className="block whitespace-nowrap">
                              {line.map((country, cIdx) => (
                                <React.Fragment key={country}>
                                  <span>{country}</span>
                                  {cIdx < line.length - 1 && (
                                    <span className="mx-1 text-white/60">·</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </span>
                          ))
                        ) : (
                          region.countries.map((country, cIdx) => (
                            <React.Fragment key={country}>
                              <span className="inline-block whitespace-nowrap">{country}</span>
                              {cIdx < region.countries.length - 1 && (
                                <span className="mx-1 text-white/60">·</span>
                              )}
                            </React.Fragment>
                          ))
                        )}
                      </p>

                      {/* Botón Ver programas esmerilado sin color */}
                      <div className="mt-3.5 sm:mt-4">
                        <a
                          href={region.categoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRegionId(region.id);
                          }}
                          className="inline-flex items-center gap-1.5 px-4.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-md border border-white/35 text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.35)] transition-all cursor-pointer whitespace-nowrap"
                        >
                          <span>Ver programas</span>
                          <ChevronRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. GRUPOS A MEDIDA: Cada grupo, un viaje a medida */}
      <section id="grupos-a-medida" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-t border-slate-200/80 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header centrado estilo Conocemos el destino */}
          <div className="text-center max-w-4xl mx-auto space-y-2.5 sm:space-y-3 mb-10 sm:mb-14">
            <span className="block text-[11.5px] sm:text-xs lg:text-[13px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent select-none">
              GRUPOS A MEDIDA
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-normal text-[#0A0F1D] font-sans tracking-tight leading-[1.25] sm:leading-[1.2]">
              Cada grupo, un viaje <span className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent font-normal">a medida.</span>
            </h2>
          </div>

          {/* Bloque: Imagen a la izquierda, texto a la derecha */}
          <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
              
              {/* Imagen a la izquierda */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.08)] border border-slate-200 group aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]">
                  <img 
                    src={assetUrl("grupos_a_medida_egipto.jpg")} 
                    alt="Grupos a medida con guía arqueológico especializado · Dynamic Tours" 
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-white/95 tracking-wide drop-shadow-xs">
                      Itinerarios y Asesoramiento Técnico Exclusivo
                    </span>
                    <span className="text-[10px] font-semibold text-white/95 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/25">
                      100% B2B
                    </span>
                  </div>
                </div>
              </div>

              {/* Texto a la derecha */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left flex flex-col justify-center">
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm sm:text-base lg:text-[16.5px] leading-relaxed">
                    El motivo del viaje, el ritmo y las expectativas cambian de un grupo a otro. Diseñamos itinerarios, alojamientos y servicios adaptados, con especialistas que acompañan a tu agencia en la preparación del viaje.
                  </p>
                  <p className="text-[#0A0F1D] font-medium text-sm sm:text-base lg:text-[16.5px] leading-relaxed">
                    Cuéntanos qué grupo tienes en mente. Empezamos por ahí.
                  </p>
                </div>

                <div className="pt-2">
                  <a 
                    href="#alta-agencia"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 active:scale-98 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer group w-fit"
                  >
                    <span>Solicitar propuesta para un grupo</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. NUESTRA CARTA DE GARANTÍA: Compromiso Exclusivo con el Canal Profesional */}
      <section id="nosotros" className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200/80 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Bloque Principal: Texto y Fotografía Corporativa */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              <span className="block text-[11.5px] sm:text-xs lg:text-[13px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent select-none">
                NUESTRA CARTA DE GARANTÍA
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-normal text-[#0A0F1D] font-sans tracking-tight leading-[1.25] sm:leading-[1.2]">
                Compromiso Exclusivo con el Canal Profesional
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                Fundada en Madrid, <strong className="text-[#0A0F1D]">Dynamic Tours S.A.</strong> es una de las instituciones mayoristas de referencia en la península ibérica para destinos de Oriente Medio y grandes viajes de larga distancia. Nuestra filosofía operativa se asienta sobre la excelencia absoluta del servicio terrestre privado en destino, una política inquebrantable de fidelidad al canal minorista y una constante inversión tecnológica para dotar de herramientas avanzadas a las agencias colaboradoras.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                Cada programa que lleva nuestra firma cuenta con el respaldo legal exigido por el Ministerio de Turismo, un robusto seguro multiasistencia médico líder, canales de comunicación directa de urgencia 24/7/365 en español y guías nativos titulados en arqueología e historia.
              </p>
            </div>

            {/* Fotografía de Sede Corporativa B2B con Logo Dynamic */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-slate-200 group">
                <img 
                  src={assetUrl("oficinas_dynamic_b2b.png")} 
                  alt="Sede Central y Compromiso Profesional B2B · Dynamic Tours" 
                  className="w-full h-auto aspect-[16/10] sm:aspect-[16/9] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#52A72B] inline-block animate-pulse"></span>
                    <span className="text-xs font-bold tracking-wide">Sede Central B2B</span>
                  </div>
                  <span className="text-[10px] font-semibold text-white/95 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/25">
                    Atención Exclusiva a Agencias
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Delegaciones Central España y Oficial Portugal */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Delegación España */}
            <div className="bg-[#F8FAFC] p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow text-left">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-3.5">
                <h5 className="text-xs font-black text-[#0A0F1D] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#1F82D2] inline-block"></span>
                  Delegación Central España
                </h5>
                <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider">MADRID</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#1F82D2] shrink-0 mt-0.5" />
                  <span className="text-slate-700">Avda. Menéndez Pelayo, 83, Madrid</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#1F82D2] shrink-0" />
                  <a href="tel:+34915521443" className="text-[#0A0F1D] font-bold hover:text-[#1F82D2] transition-colors">+34 915 521 443</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#1F82D2] shrink-0" />
                  <a href="mailto:reservas@dynamic-tours.com" className="text-slate-700 hover:text-[#1F82D2] transition-colors">reservas@dynamic-tours.com</a>
                </p>
              </div>
            </div>

            {/* Delegación Portugal */}
            <div className="bg-[#F8FAFC] p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow text-left">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-3.5">
                <h5 className="text-xs font-black text-[#0A0F1D] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#52A72B] inline-block"></span>
                  Delegación Oficial Portugal
                </h5>
                <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider">PORTO</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#52A72B] shrink-0 mt-0.5" />
                  <span className="text-slate-700">Rua 5 de Outubro, 185, Porto</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#52A72B] shrink-0" />
                  <a href="tel:+351912757377" className="text-[#0A0F1D] font-bold hover:text-[#52A72B] transition-colors">+351 912 757 377</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#52A72B] shrink-0" />
                  <a href="mailto:reservas@dynamic-tours.pt" className="text-slate-700 hover:text-[#52A72B] transition-colors">reservas@dynamic-tours.pt</a>
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SOPORTE Y SOLVENCIA: El Rigor de un Gran Mayorista */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-t border-slate-200/80 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
            <span className="block text-[11.5px] sm:text-xs lg:text-[13px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent select-none">
              SOPORTE Y SOLVENCIA
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-normal text-[#0A0F1D] font-sans tracking-tight leading-[1.25] sm:leading-[1.2]">
              El Rigor de un Gran Mayorista
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Ventajas logísticas y garantías operativas diseñadas exclusivamente para la agencia minorista.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white hover:bg-slate-50/80 border border-slate-200/80 p-5 sm:p-6 rounded-2xl transition-all duration-300 text-left space-y-2.5 group hover:shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#1F82D2]/10 text-[#1F82D2] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0A0F1D] tracking-tight">
                Especialistas por Destino
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Egiptólogos y técnicos expertos. Asesoramiento riguroso y cotizaciones a medida inmediatas.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white hover:bg-slate-50/80 border border-slate-200/80 p-5 sm:p-6 rounded-2xl transition-all duration-300 text-left space-y-2.5 group hover:shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#52A72B]/10 text-[#52A72B] flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0A0F1D] tracking-tight">
                Seguro de Viaje Incluido
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Asistencia médica y multiviaje en toda la programación base para máxima tranquilidad.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white hover:bg-slate-50/80 border border-slate-200/80 p-5 sm:p-6 rounded-2xl transition-all duration-300 text-left space-y-2.5 group hover:shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#1F82D2]/10 text-[#1F82D2] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0A0F1D] tracking-tight">
                Cupos Chárter Propios
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Vuelos directos desde múltiples aeropuertos de provincias con plazas garantizadas.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white hover:bg-slate-50/80 border border-slate-200/80 p-5 sm:p-6 rounded-2xl transition-all duration-300 text-left space-y-2.5 group hover:shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#52A72B]/10 text-[#52A72B] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#0A0F1D] tracking-tight">
                Fidelidad 100% B2B
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Blindaje absoluto: jamás atendemos cliente final, protegiendo tu comisión y relación.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. B2B QUICK ACTION DASHBOARD: Tarjetas de accesos directos */}
      <section className="bg-white border-t border-b border-slate-200/80 py-12 relative z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Action 1 */}
            <div 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-[#F8FAFC] hover:bg-slate-100/70 border-t-2 border-t-[#1F82D2] border-x border-b border-slate-200/80 p-6 rounded-lg transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between min-h-[180px] shadow-xs hover:shadow-md hover:-translate-y-0.5"
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
              <span className="text-[9px] font-black uppercase text-[#1F82D2] tracking-widest pt-4 block border-t border-slate-200 group-hover:text-[#52A72B] transition-colors">Acceso Seguro &rarr;</span>
            </div>

            {/* Action 2 */}
            <a 
              href="#ofertas"
              className="bg-[#F8FAFC] hover:bg-slate-100/70 border-t-2 border-t-[#52A72B] border-x border-b border-slate-200/80 p-6 rounded-lg transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between min-h-[180px] shadow-xs hover:shadow-md hover:-translate-y-0.5 no-underline"
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
              <span className="text-[9px] font-black uppercase text-[#52A72B] tracking-widest pt-4 block border-t border-slate-200 group-hover:text-[#1F82D2] transition-colors">Biblioteca Digital &rarr;</span>
            </a>

            {/* Action 3 */}
            <a 
              href="#alta-agencia"
              className="bg-[#F8FAFC] hover:bg-slate-100/70 border-t-2 border-t-[#1F82D2] border-x border-b border-slate-200/80 p-6 rounded-lg transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between min-h-[180px] shadow-xs hover:shadow-md hover:-translate-y-0.5 no-underline"
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
              <span className="text-[9px] font-black uppercase text-[#1F82D2] tracking-widest pt-4 block border-t border-slate-200 group-hover:text-[#52A72B] transition-colors">Registrarse Ahora &rarr;</span>
            </a>

            {/* Action 4 */}
            <div 
              onClick={() => window.open("https://wa.me/34690125031", "_blank")}
              className="bg-[#F8FAFC] hover:bg-slate-100/70 border-t-2 border-t-emerald-500 border-x border-b border-slate-200/80 p-6 rounded-lg transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between min-h-[180px] shadow-xs hover:shadow-md hover:-translate-y-0.5"
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
              <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest pt-4 block border-t border-slate-200 group-hover:text-[#1F82D2] transition-colors">WhatsApp Activo &rarr;</span>
            </div>

          </div>
        </div>
      </section>

      {/* Agency Registration Form (Alta de Agencia) */}
      <section id="alta-agencia" className="py-20 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <div className="space-y-2.5 sm:space-y-3">
            <span className="block text-[11.5px] sm:text-xs lg:text-[13px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] bg-gradient-to-r from-[#1F82D2] to-[#52A72B] bg-clip-text text-transparent select-none">
              REGISTRO DE AGENCIA COLABORADORA
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[42px] font-normal text-[#0A0F1D] font-sans tracking-tight leading-[1.25] sm:leading-[1.2]">
              Solicitud de Registro de Agencia B2B
            </h3>
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
