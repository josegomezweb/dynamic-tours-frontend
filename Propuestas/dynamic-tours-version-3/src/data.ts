export interface Chapter {
  id: string;
  number: string;
  title: string;
  tagline: string;
  country: string;
  accentColor: string;
  badge: string;
  duration: string;
  flights: string;
  hotels: string;
  price: number;
  bgImage: string;
  heroQuote: string;
  description: string;
  storyPoints: {
    title: string;
    description: string;
    detail: string;
    image: string;
  }[];
  b2bPerks: string[];
}

export const CHAPTERS: Chapter[] = [
  {
    id: "cap-egipto",
    number: "01",
    title: "Egipto Milenario & Crucero de Firma",
    tagline: "Donde el tiempo se detiene a orillas del Nilo",
    country: "Egipto",
    accentColor: "#D4AF37", // Oro faraónico
    badge: "Operación Chárter Exclusiva",
    duration: "8 Días / 7 Noches",
    flights: "Chárter directo exclusivo desde Madrid y Provincias",
    hotels: "5★ Gran Lujo + Mota Fluvial 5★ Selección",
    price: 1195,
    bgImage: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=1920&q=85",
    heroQuote: "«Navegar el Nilo no es un traslado; es contemplar 5.000 años de historia desfilar frente al balcón de su camarote privado.»",
    description: "Nuestra joya de la corona. Un circuito diseñado al milímetro para agencias que buscan cero incidencias: vuelos directos sin escalas intermedias, motonaves fluviales inspeccionadas personalmente y guías egiptólogos exclusivos en nómina.",
    storyPoints: [
      {
        title: "El Despertar de Guiza & El Gran Museo Egipcio",
        description: "Acceso preferente a las Pirámides al amanecer antes de las horas punta turísticas, seguido de visita guiada privada al nuevo GEM.",
        detail: "Visita panorámica de Keops, Kefrén y Micerinos con almuerzo en restaurante de autor frente a las esfinges.",
        image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "La Magia Fluvial de Luxor a Asuán",
        description: "Cuatro noches a bordo de una motonave 5★ Gran Lujo con piscina panorámica en cubierta, cenas gourmet y camarotes con vistas al río eterno.",
        detail: "Pensión completa incluida, parada en los templos iluminados de Kom Ombo y Edfu.",
        image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "La Apoteosis de Abu Simbel",
        description: "Excursión incluida por carretera con convoy privado para presenciar el coloso de Ramsés II y Nefertari frente al Lago Nasser.",
        detail: "Explicación egiptológica personalizada y tiempo libre para fotografía con la luz matinal.",
        image: "https://images.unsplash.com/photo-1623345805780-8f01f714e65f?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    b2bPerks: [
      "Vuelo chárter propio garantizado sin cancelaciones",
      "Comisión de agencia protegida al 14%",
      "Servicio de maleteros y propinas de crucero gestionadas"
    ]
  },
  {
    id: "cap-uzbekistan",
    number: "02",
    title: "Uzbekistán: El Esplendor de la Ruta de la Seda",
    tagline: "Cúpulas de lapislázuli bajo el cielo de Asia Central",
    country: "Uzbekistán",
    accentColor: "#0284C7", // Azul zafiro Samarcanda
    badge: "Exclusivo Dynamic Tours",
    duration: "10 Días / 8 Noches",
    flights: "Vuelo con Turkish Airlines / Uzbekistan Airways",
    hotels: "Hoteles Boutique de encanto local 4★ Superior",
    price: 1680,
    bgImage: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=85",
    heroQuote: "«Samarcanda no se visita; se absorbe como un poema tallado en azulejos turquesas.»",
    description: "Una de las rutas más solicitadas por el viajero cultural culto. Diseñada para recorrer las cuatro joyas uzbekas unidas por el tren bala Afrosiyob, evitando pesadas jornadas de autobús.",
    storyPoints: [
      {
        title: "La Plaza Registán al Anochecer",
        description: "Contemple las tres madrazas monumentales iluminadas con espectáculo de luz privado reservado para nuestros grupos.",
        detail: "Madraza Ulugh Beg, Sher-Dor y Tilya-Kori con sus interiores cubiertos de pan de oro.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Bujará: La Ciudad de los Cien Minaretes",
        description: "Laberinto medieval de caravasares, talleres de forja artesanal y la fortaleza del Emir (El Arca de Bujará).",
        detail: "Cena en madraza histórica con concierto de música tradicional uzbeka y trajes de seda.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Jiva: Un Museo al Aire Libre Amurallado",
        description: "Ichan Kala, la fortaleza de barro protegida por la UNESCO donde el viajero siente retroceder al siglo X.",
        detail: "Paseo nocturno por las murallas con té verde tradicional y dulces de sésamo.",
        image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    b2bPerks: [
      "Billetes de tren de alta velocidad Afrosiyob garantizados en 1ª clase",
      "Guías oficiales de habla hispana formados en España",
      "Atención al pasajero 24 horas con receptivo en Tashkent"
    ]
  },
  {
    id: "cap-japon",
    number: "03",
    title: "Japón Imperial & Vértigo Vanguardista",
    tagline: "El diálogo eterno entre el silencio zen y el futuro neón",
    country: "Japón",
    accentColor: "#E11D48", // Rojo carmín torii
    badge: "Grupos Reducidos Selección",
    duration: "12 Días / 10 Noches",
    flights: "Vuelos regulares con Emirates / Qatar / ANA",
    hotels: "4★ Superior céntricos + 1 Noche en Ryokan Tradicional",
    price: 2890,
    bgImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=85",
    heroQuote: "«Japón te enseña que la más alta tecnología puede convivir en perfecta armonía con el silencio de una piedra musgosa.»",
    description: "El gran viaje por excelencia. Desde el bullicio ultramoderno de Tokio hasta la serenidad milenaria de los jardines de Kioto, durmiendo en un auténtico ryokan con aguas termales Onsen.",
    storyPoints: [
      {
        title: "Tokio: La Metrópolis que Nunca Duerme",
        description: "Cruce de Shibuya, santuario Meiji Jingu en el bosque sagrado, y el contraste pop de Akihabara y Ginza.",
        detail: "Alojamiento en hoteles de categoría superior situados a pasos de las estaciones principales.",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Kioto & El Bosque de Bambú de Arashiyama",
        description: "El Pabellón Dorado (Kinkaku-ji), los miles de toriis rojos de Fushimi Inari y el barrio de geishas de Gion.",
        detail: "Ceremonia privada del té dirigida por una maestra tradicional en templo zen.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Noche en Ryokan Tradicional con Aguas Onsen",
        description: "Dormir sobre tatami, vestir yukata y degustar una exquisita cena Kaiseki de múltiples platos elaborados con producto de estación.",
        detail: "Baño en aguas termales volcánicas con vistas al bosque o al Monte Fuji.",
        image: "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    b2bPerks: [
      "Pase Japan Rail Pass de alta velocidad incluido",
      "Envío de equipaje entre Tokio y Kioto para viajar ligero",
      "Cupos asegurados en temporada de cerezos y arces de otoño"
    ]
  },
  {
    id: "cap-turquia",
    number: "04",
    title: "Turquía Fascinante: Capadocia & Bósforo",
    tagline: "El puente donde confluyen dos continentes",
    country: "Turquía",
    accentColor: "#EA580C", // Naranja atardecer
    badge: "Salidas Todo el Año",
    duration: "8 Días / 7 Noches",
    flights: "Vuelos directos con Turkish Airlines",
    hotels: "Hotel Cueva en Capadocia + 5★ en Estambul",
    price: 980,
    bgImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1920&q=85",
    heroQuote: "«Sobrevolar Capadocia en silencio mientras el sol dora las chimeneas de hadas es una huella imborrable en el alma.»",
    description: "La propuesta con mejor relación calidad-precio del mercado mayorista. Hoteles cueva auténticos excavados en roca toba, navegación privada por el Bósforo y el exotismo de Santa Sofía.",
    storyPoints: [
      {
        title: "Capadocia al Amanecer desde un Globo",
        description: "Vuelo opcional en globo aerostático al alba sobre los valles de Goreme, seguido de brindis con champán.",
        detail: "Alojamiento en hotel cueva con terraza panorámica para ver el despegue de cientos de globos.",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Estambul: Entre Dos Mundos",
        description: "La Mezquita Azul, la imponente basílica de Santa Sofía y el bullicio de especias y joyas del Gran Bazar.",
        detail: "Barco privado exclusivo para Dynamic Tours en el estrecho del Bósforo al atardecer.",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Pamukkale & Las Cascadas de Algodón",
        description: "Piscinas naturales de travertino blanco petrificado y las ruinas grecorromanas de Hierápolis.",
        detail: "Baño en la mítica piscina termal de Cleopatra entre columnas sumergidas.",
        image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    b2bPerks: [
      "Vuelos domésticos incluidos Estambul - Capadocia para evitar carretera",
      "Hoteles 5★ céntricos de primeras marcas internacionales",
      "Garantía de salida desde 2 pasajeros"
    ]
  }
];

export const B2B_PILLARS = [
  {
    title: "100% Exclusivo para Agencias",
    desc: "Nunca vendemos directo al cliente final. Tu comisión y tu cliente están 100% blindados por contrato.",
    icon: "ShieldCheck"
  },
  {
    title: "Operación Chárter Propia",
    desc: "Vuelos directos desde Madrid, Bilbao, Zaragoza, Valencia y Santiago sin intermediarios que encarezcan el coste.",
    icon: "Plane"
  },
  {
    title: "Asistente B2B con IA Integrada",
    desc: "Genera propuestas personalizadas con la marca de tu agencia en menos de 15 segundos en formato PDF listo para enviar.",
    icon: "Sparkles"
  },
  {
    title: "Urgencias 24/7 en Español",
    desc: "Equipo resolutivo directo en Madrid y receptivos propios en destino despiertos cuando tus viajeros lo necesitan.",
    icon: "PhoneCall"
  }
];
