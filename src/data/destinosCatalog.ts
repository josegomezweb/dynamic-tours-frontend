export interface TourProgram {
  id: string;
  country: string;
  region: string;
  title: string;
  titleLine1?: string;
  titleLine2?: string | null;
  subtitle?: string | null;
  tag: string;
  duration: string;
  description: string;
  price?: string | null;
  image: string;
  imagePos?: string;
  bottomImagePos?: string;
  departureCities?: string[];
  isSenior?: boolean;
  isLeyendas?: boolean;
}

export interface ZoneDefinition {
  id: string;
  name: string;
  countries: string[];
}

export const ZONES: ZoneDefinition[] = [
  {
    id: "oriente-medio",
    name: "Oriente Medio",
    countries: ["Egipto", "Jordania", "Dubái", "Irán", "Israel"]
  },
  {
    id: "asia",
    name: "Asia",
    countries: [
      "Armenia",
      "Camboya",
      "China",
      "India",
      "Japón",
      "Maldivas",
      "Nepal",
      "Sri Lanka",
      "Tailandia",
      "Uzbekistán",
      "Vietnam"
    ]
  },
  {
    id: "europa",
    name: "Europa",
    countries: [
      "Turquía",
      "Alemania",
      "Austria",
      "Bulgaria",
      "Bélgica",
      "Croacia",
      "Escocia",
      "España",
      "Georgia",
      "Grecia",
      "Holanda",
      "Hungría",
      "Inglaterra",
      "Irlanda",
      "Italia",
      "Moldavia",
      "Polonia",
      "Portugal",
      "Rep. Bálticas",
      "Rep. Checa",
      "Rumanía"
    ]
  },
  {
    id: "america",
    name: "América",
    countries: [
      "Argentina",
      "Canadá",
      "Costa Rica",
      "Estados Unidos",
      "México"
    ]
  },
  {
    id: "africa",
    name: "África",
    countries: [
      "Kenia",
      "Marruecos",
      "Tanzania",
      "Túnez"
    ]
  }
];

export const CATALOG_PROGRAMS: TourProgram[] = [
  // ==========================================
  // ORIENTE MEDIO
  // ==========================================
  // --- EGIPTO ---
  {
    id: "egipto-selecto-senior",
    country: "Egipto",
    region: "Oriente Medio",
    title: "Egipto Selecto Senior",
    titleLine1: "Egipto Selecto Senior",
    subtitle: "Especial mayores de 55 años",
    tag: "ESPECIAL +55",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Crucero de 4 noches por el Nilo y 3 noches en El Cairo con visitas exclusivas, traslados y régimen todo incluido.",
    price: "1.285 €",
    image: "/senior dynamic ok.png",
    imagePos: "object-[center_36%]",
    bottomImagePos: "object-[center_70%]",
    departureCities: ["Madrid", "Barcelona"],
    isSenior: true
  },
  {
    id: "egipto-leyendas",
    country: "Egipto",
    region: "Oriente Medio",
    title: "Leyendas de Egipto",
    titleLine1: "Leyendas de Egipto",
    subtitle: null,
    tag: "SIN ABU SIMBEL",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Crucero por el Nilo en pensión completa y estancia en El Cairo con entrada por Asuán y salidas en viernes.",
    price: "764 €",
    image: "/dia_5_guiza.jpg",
    imagePos: "object-[center_28%]",
    bottomImagePos: "object-[center_60%]",
    departureCities: ["Madrid", "Barcelona", "Valencia"],
    isLeyendas: true
  },
  {
    id: "egipto-descubre",
    country: "Egipto",
    region: "Oriente Medio",
    title: "Descubre Egipto · Crucero por el Nilo + El Cairo",
    titleLine1: "Descubre Egipto ·",
    titleLine2: "Crucero por el Nilo + El Cairo",
    subtitle: null,
    tag: "BAJADA DE PRECIOS",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Crucero por el Nilo en pensión completa y estancia en El Cairo con visitas guiadas a templos y pirámides.",
    price: "499 €",
    image: "/egipto_feluca.png",
    imagePos: "object-[20%_74%]",
    bottomImagePos: "object-[20%_90%]",
    departureCities: ["Madrid", "Barcelona", "Bilbao"]
  },
  {
    id: "egipto-fin-de-ano",
    country: "Egipto",
    region: "Oriente Medio",
    title: "Descubre Egipto · Especial Fin de Año",
    titleLine1: "Descubre Egipto ·",
    titleLine2: "Especial Fin de Año",
    subtitle: null,
    tag: "SALIDAS DESDE PROVINCIAS",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Crucero por el Nilo y estancia en El Cairo con cupos garantizados y vuelos directos desde múltiples aeropuertos.",
    price: "Consultar precio",
    image: "/egipto_fin_de_ano.jpg",
    imagePos: "object-center",
    bottomImagePos: "object-[center_70%]",
    departureCities: ["Madrid", "Barcelona", "Valencia", "Zaragoza", "Bilbao", "Santiago"]
  },
  {
    id: "egipto-infinito",
    country: "Egipto",
    region: "Oriente Medio",
    title: "Egipto Infinito: Nilo & Desierto Blanco",
    titleLine1: "Egipto Infinito:",
    titleLine2: "Nilo & Desierto Blanco",
    tag: "AVENTURA & CONFORT",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Ruta de contrastes: 3N crucero Nilo en PC + 3N El Cairo en MP + 1N de acampada en jaimas bajo las estrellas en el Desierto Blanco en 4x4.",
    price: "1.359 €",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- JORDANIA ---
  {
    id: "jordania-maravillas",
    country: "Jordania",
    region: "Oriente Medio",
    title: "Maravillas del Hachemita y Wadi Rum",
    titleLine1: "Maravillas de Jordania",
    tag: "PETRA & DESIERTO",
    duration: "8 DÍAS / 7 NOCHES",
    description: "4N Ammán + 2N Petra + 1N en campamento beduino en Wadi Rum en MP. Safari 4x4 por el desierto, entrada a Petra y Mar Muerto.",
    price: "1.425 €",
    image: "/jordania_petra.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },
  {
    id: "jordania-escapada",
    country: "Jordania",
    region: "Oriente Medio",
    title: "Escapada Ammán y Mar Muerto Wellness",
    titleLine1: "Escapada Ammán",
    titleLine2: "& Mar Muerto Wellness",
    tag: "WELLNESS & RELAX",
    duration: "4 DÍAS / 3 NOCHES",
    description: "Tratamientos de sales minerales en el Mar Muerto, ciudadela de Ammán, ruinas romanas de Jerash y vuelos regulares.",
    price: "590 €",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- DUBÁI ---
  {
    id: "dubai-futurista",
    country: "Dubái",
    region: "Oriente Medio",
    title: "Dubái Futurista & Safari por el Desierto",
    titleLine1: "Dubái Futurista",
    titleLine2: "& Safari por el Desierto",
    tag: "FUTURISMO & LUJO",
    duration: "5 DÍAS / 4 NOCHES",
    description: "Burj Khalifa, Dubai Mall, Marina y safari en 4x4 por las dunas doradas con cena barbacoa tradicional bajo las estrellas.",
    price: "890 €",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },
  {
    id: "dubai-abu-dabi",
    country: "Dubái",
    region: "Oriente Medio",
    title: "Dubái & Abu Dabi Gran Recorrido",
    titleLine1: "Dubái & Abu Dabi",
    titleLine2: "Gran Recorrido",
    tag: "EMIRATOS AL COMPLETO",
    duration: "7 DÍAS / 6 NOCHES",
    description: "Visita completa a la Gran Mezquita Sheikh Zayed y Museo Louvre en Abu Dabi combinado con la vanguardia urbana de Dubái.",
    price: "1.290 €",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- IRÁN ---
  {
    id: "iran-persia-clasica",
    country: "Irán",
    region: "Oriente Medio",
    title: "Persia Clásica: Isfahán, Shiraz & Persépolis",
    titleLine1: "Persia Clásica:",
    titleLine2: "Isfahán, Shiraz & Persépolis",
    tag: "CULTURA MILENARIA",
    duration: "10 DÍAS / 9 NOCHES",
    description: "Plaza de Naqsh-e Yahán, mezquitas turquesas, jardines de rosas en Shiraz y las colosales ruinas del Imperio Aqueménida en Persépolis.",
    price: "1.680 €",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- ISRAEL ---
  {
    id: "israel-tierra-santa",
    country: "Israel",
    region: "Oriente Medio",
    title: "Tierra Santa Monumental y Jerusalén Milenaria",
    titleLine1: "Tierra Santa Monumental",
    titleLine2: "y Jerusalén Milenaria",
    tag: "TIERRA SANTA",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Ciudad Vieja de Jerusalén, Muro de las Lamentaciones, Santo Sepulcro, Tel Aviv, Belén, Nazaret y Mar de Galilea.",
    price: "1.540 €",
    image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // ==========================================
  // ASIA
  // ==========================================
  // --- ARMENIA ---
  {
    id: "armenia-tesoros",
    country: "Armenia",
    region: "Asia",
    title: "Tesoros de Armenia y Cáucaso Sur",
    titleLine1: "Tesoros de Armenia",
    titleLine2: "y Cáucaso Sur",
    tag: "CULTURA Y PAISAJE",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Monasterio de Khor Virap con vistas al bíblico Monte Ararat, templos de Garni y Geghard, Lago Seván y centro histórico de Ereván.",
    price: "1.150 €",
    image: "/armenia_khor_virap.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- CAMBOYA ---
  {
    id: "camboya-angkor",
    country: "Camboya",
    region: "Asia",
    title: "Misterios de Angkor Wat & Siem Reap",
    titleLine1: "Misterios de Angkor Wat",
    titleLine2: "& Siem Reap",
    tag: "REINO JÉMER",
    duration: "7 DÍAS / 6 NOCHES",
    description: "Amanecer en Angkor Wat, rostros pétreos de Bayon, templos engullidos por raíces en Ta Prohm y aldeas flotantes en Tonlé Sap.",
    price: "1.190 €",
    image: "/camboya_angkor_wat.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- CHINA ---
  {
    id: "china-imperial",
    country: "China",
    region: "Asia",
    title: "Ruta Imperial: Pekín, Xi'an y Shanghái",
    titleLine1: "Ruta Imperial:",
    titleLine2: "Pekín, Xi'an y Shanghái",
    tag: "GRAN IMPERIO",
    duration: "11 DÍAS / 9 NOCHES",
    description: "Gran Muralla China, Ciudad Prohibida, Guerreros de Terracota de Xi'an y el vanguardista Bund iluminado de Shanghái en tren bala.",
    price: "2.150 €",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- INDIA ---
  {
    id: "india-triangulo",
    country: "India",
    region: "Asia",
    title: "Triángulo de Oro y Benarés",
    titleLine1: "Triángulo de Oro",
    titleLine2: "y Benarés",
    tag: "ESPIRITUALIDAD Y COLOR",
    duration: "9 DÍAS / 7 NOCHES",
    description: "Delhi histórica y moderna, majestuosidad del Taj Mahal en Agra, la Ciudad Rosa de Jaipur y la mística Benarés en el río Ganges.",
    price: "1.290 €",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },
  {
    id: "india-rajastan",
    country: "India",
    region: "Asia",
    title: "Rajastán Imperial Palacios de Maharajás",
    titleLine1: "Rajastán Imperial",
    titleLine2: "Palacios de Maharajás",
    tag: "PALACIOS & HISTORIA",
    duration: "12 DÍAS / 10 NOCHES",
    description: "Hoteles palacio heritage, Fuerte Amber, fortalezas de Jodhpur, lagos de Udaipur y vehículos privados climatizados.",
    price: "1.750 €",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- JAPÓN ---
  {
    id: "japon-banzai",
    country: "Japón",
    region: "Asia",
    title: "Japón Banzai & Ryokan Tradicional",
    titleLine1: "Japón Banzai",
    titleLine2: "& Ryokan Tradicional",
    tag: "GRAN VIAJE",
    duration: "12 DÍAS / 10 NOCHES",
    description: "Tokio, Kioto, Takayama, Kanazawa, noche en auténtico Ryokan japonés con aguas termales Onsen y trenes bala Shinkansen.",
    price: "2.490 €",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },
  {
    id: "japon-escapada",
    country: "Japón",
    region: "Asia",
    title: "Escapada Tokio Vanguardista y Monte Fuji",
    titleLine1: "Escapada Tokio Vanguardista",
    titleLine2: "y Monte Fuji",
    tag: "ESCAPADA",
    duration: "6 DÍAS / 4 NOCHES",
    description: "Estancia en hotel céntrico en Shinjuku o Shibuya, pases de metro ilimitados, Akihabara, Asakusa y excursión a Hakone y Monte Fuji.",
    price: "1.350 €",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- MALDIVAS ---
  {
    id: "maldivas-resort",
    country: "Maldivas",
    region: "Asia",
    title: "Atolones de Ensueño en Resort Overwater",
    titleLine1: "Atolones de Ensueño",
    titleLine2: "en Resort Overwater",
    tag: "PARADISÍACO",
    duration: "7 DÍAS / 5 NOCHES",
    description: "Villas sobre el agua cristalina en atolones vírgenes, régimen todo incluido, traslados en hidroavión y fondos de coral con mantas y tortugas.",
    price: "1.890 €",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- NEPAL ---
  {
    id: "nepal-himalaya",
    country: "Nepal",
    region: "Asia",
    title: "Valles del Himalaya: Katmandú y Pokhara",
    titleLine1: "Valles del Himalaya:",
    titleLine2: "Katmandú y Pokhara",
    tag: "HIMALAYA & AVENTURA",
    duration: "9 DÍAS / 7 NOCHES",
    description: "Plaza Durbar, estupa de Boudhanath, amanecer sobre los Annapurnas desde Sarangkot y travesía en barca por el Lago Phewa.",
    price: "1.390 €",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- SRI LANKA ---
  {
    id: "sri-lanka-lagrima",
    country: "Sri Lanka",
    region: "Asia",
    title: "Lágrima de la India & Sigiriya Roca del León",
    titleLine1: "Lágrima de la India",
    titleLine2: "& Sigiriya Roca del León",
    tag: "NATURALEZA & TEMPLOS",
    duration: "10 DÍAS / 8 Noches",
    description: "Fortaleza de Sigiriya, templos de Kandy, plantaciones de té en Nuwara Eliya, safari en Yala y playas doradas de Bentota.",
    price: "1.480 €",
    image: "/sri_lanka_portada.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- TAILANDIA ---
  {
    id: "tailandia-completo",
    country: "Tailandia",
    region: "Asia",
    title: "Tailandia al Completo: Bangkok, Chiang Mai y Phuket",
    titleLine1: "Tailandia al Completo:",
    titleLine2: "Bangkok, Chiang Mai y Phuket",
    tag: "TEMPLOS & PLAYAS",
    duration: "12 DÍAS / 10 NOCHES",
    description: "Gran Palacio de Bangkok, santuarios de elefantes éticos en Chiang Mai y playas paradisíacas de aguas turquesas en Phuket.",
    price: "1.590 €",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- UZBEKISTÁN ---
  {
    id: "uzbekistan-clasico",
    country: "Uzbekistán",
    region: "Asia",
    title: "Uzbekistán Clásico: Ruta de la Seda",
    titleLine1: "Uzbekistán Clásico:",
    titleLine2: "Ruta de la Seda",
    tag: "RUTA DE LA SEDA",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Tashkent, Samarcanda con la Plaza del Registán, el gran oasis de Bujará y la amurallada Jiva. Tren rápido Afrosiyob y hoteles boutique.",
    price: "1.390 €",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- VIETNAM ---
  {
    id: "vietnam-norte-sur",
    country: "Vietnam",
    region: "Asia",
    title: "Vietnam de Norte a Sur & Bahía de Halong",
    titleLine1: "Vietnam de Norte a Sur",
    titleLine2: "& Bahía de Halong",
    tag: "PAISAJES DE CINE",
    duration: "11 DÍAS / 9 NOCHES",
    description: "Barrio Antiguo de Hanói, crucero de lujo con noche a bordo en la Bahía de Halong, farolillos mágicos de Hoi An y túneles de Cu Chi en Saigón.",
    price: "1.620 €",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // ==========================================
  // EUROPA
  // ==========================================
  // --- TURQUÍA ---
  {
    id: "turquia-suenos",
    country: "Turquía",
    region: "Europa",
    title: "Sueños de Estambul y Capadocia",
    titleLine1: "Sueños",
    titleLine2: "de Estambul y Capadocia",
    tag: "VUELO DOMÉSTICO INCLUIDO",
    duration: "8 DÍAS / 7 NOCHES",
    description: "4 noches en Estambul con desayuno y 3 noches en Capadocia en pensión completa. Incluye vuelo doméstico, visitas guiadas y traslados.",
    price: "1.509 €",
    image: "/turquia_dynamic.png",
    departureCities: ["Madrid", "Barcelona", "Málaga"]
  },
  {
    id: "turquia-ruta-confort",
    country: "Turquía",
    region: "Europa",
    title: "Ruta turca completa - Confort",
    titleLine1: "Ruta turca completa",
    titleLine2: "Confort",
    tag: "CIRCUITO CON VUELOS",
    duration: "8 DÍAS / 7 NOCHES",
    description: "4 noches en Estambul con desayuno, 2 noches en Capadocia y 1 noche en Pamukkale en pensión completa. Vuelos y traslados incluidos.",
    price: "1.599 €",
    image: "/pamukkale_ruta_turca.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },
  {
    id: "turquia-escapada",
    country: "Turquía",
    region: "Europa",
    title: "Escapada Estambul Mágico y Bósforo",
    titleLine1: "Escapada Estambul Mágico",
    titleLine2: "y Bósforo",
    tag: "ESCAPADA URBANA",
    duration: "4 DÍAS / 3 NOCHES",
    description: "Hotel céntrico seleccionado, crucero por el Estrecho del Bósforo, visitas a Santa Sofía, Mezquita Azul y Gran Bazar.",
    price: "385 €",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona", "Valencia"]
  },

  // --- PORTUGAL ---
  {
    id: "portugal-oporto",
    country: "Portugal",
    region: "Europa",
    title: "Escapada Porto & Crucero Seis Puentes",
    titleLine1: "Escapada Porto & Seis Puentes",
    tag: "ESCAPADA CULTURAL",
    duration: "3 DÍAS / 2 NOCHES",
    description: "Escapada cultural en Oporto. Alojamiento y desayuno, crucero rabelo por el río Duero y cata en bodegas tradicionales.",
    price: "199 €",
    image: "/portugal_porto.jpg",
    departureCities: ["Madrid", "Barcelona", "Bilbao", "Valencia"]
  },
  {
    id: "portugal-lisboa",
    country: "Portugal",
    region: "Europa",
    title: "Escapada Lisboa, Sintra & Cascais",
    titleLine1: "Escapada Lisboa,",
    titleLine2: "Sintra & Cascais",
    tag: "TOP VENTAS",
    duration: "4 DÍAS / 3 NOCHES",
    description: "Lisboa histórica, barrio de Alfama, Torre de Belém y excursión de día completo al Palacio da Pena en Sintra y Costa de Cascais.",
    price: "265 €",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },
  {
    id: "portugal-circuito",
    country: "Portugal",
    region: "Europa",
    title: "Gran Circuito Portugal de Norte a Sur",
    titleLine1: "Gran Circuito Portugal",
    titleLine2: "de Norte a Sur",
    tag: "CIRCUITO COMPLETO",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Oporto, Coímbra, Fátima, Lisboa, Évora y playas del Algarve con visitas culturales, catas y guía acompañante en español.",
    price: "790 €",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- ALEMANIA ---
  {
    id: "alemania-baviera",
    country: "Alemania",
    region: "Europa",
    title: "Ruta Romántica y Castillos de Baviera",
    titleLine1: "Ruta Romántica",
    titleLine2: "y Castillos de Baviera",
    tag: "CASTILLOS DE CUENTO",
    duration: "7 DÍAS / 6 NOCHES",
    description: "Múnich, Castillo de Neuschwanstein, Núremberg, Rothenburg ob der Tauber y pueblos medievales con guía en español.",
    price: "1.180 €",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- AUSTRIA ---
  {
    id: "austria-imperial",
    country: "Austria",
    region: "Europa",
    title: "Capitales Imperiales: Viena, Salzburgo y Los Alpes",
    titleLine1: "Capitales Imperiales:",
    titleLine2: "Viena, Salzburgo y Los Alpes",
    tag: "MÚSICA & PALACIOS",
    duration: "7 DÍAS / 6 NOCHES",
    description: "Palacio de Schönbrunn en Viena, jardines de Mirabell en Salzburgo, región alpina de Hallstatt y concierto de música clásica.",
    price: "1.250 €",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- BULGARIA ---
  {
    id: "bulgaria-tesoros",
    country: "Bulgaria",
    region: "Europa",
    title: "Tesoros de Bulgaria & Monasterio de Rila",
    titleLine1: "Tesoros de Bulgaria",
    titleLine2: "& Monasterio de Rila",
    tag: "MONASTERIOS & VALLES",
    duration: "7 DÍAS / 6 NOCHES",
    description: "Sofía monumental, monasterio fortificado de Rila (UNESCO), Plovdiv antigua y valles de rosas búlgaros.",
    price: "920 €",
    image: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- BÉLGICA ---
  {
    id: "belgica-flandes",
    country: "Bélgica",
    region: "Europa",
    title: "Flandes Medieval: Bruselas, Brujas y Gante",
    titleLine1: "Flandes Medieval:",
    titleLine2: "Bruselas, Brujas y Gante",
    tag: "CANALES & ARTE",
    duration: "5 DÍAS / 4 NOCHES",
    description: "Grand Place de Bruselas, canales románticos de Brujas, castillo de los Condes en Gante y degustación de chocolate artesano.",
    price: "595 €",
    image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona", "Bilbao"]
  },

  // --- CROACIA ---
  {
    id: "croacia-perlas",
    country: "Croacia",
    region: "Europa",
    title: "Perlas del Adriático: Dubrovnik, Split & Plitvice",
    titleLine1: "Perlas del Adriático:",
    titleLine2: "Dubrovnik, Split & Plitvice",
    tag: "COSTA DÁLMATA",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Murallas medievales de Dubrovnik, Palacio de Diocleciano en Split y las cascadas turquesas del Parque Nacional de los Lagos de Plitvice.",
    price: "1.290 €",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- ESCOCIA ---
  {
    id: "escocia-tesoros",
    country: "Escocia",
    region: "Europa",
    title: "Tesoros y Castillos de Escocia",
    titleLine1: "Tesoros y Castillos",
    titleLine2: "de Escocia",
    tag: "TIERRAS ALTAS",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Edimburgo, Tierras Altas, Lago Ness, Isla de Skye y Castillo de Stirling con Media Pensión en ruta, destilería de whisky y vuelos.",
    price: "1.450 €",
    image: "/escocia_highlands.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- ESPAÑA ---
  {
    id: "espana-alandalus",
    country: "España",
    region: "Europa",
    title: "Joyas del Sur: Al-Ándalus Monumental",
    titleLine1: "Joyas del Sur:",
    titleLine2: "Al-Ándalus Monumental",
    tag: "PATRIMONIO & ARTE",
    duration: "7 DÍAS / 6 NOCHES",
    description: "La Alhambra de Granada, Mezquita-Catedral de Córdoba, Giralda de Sevilla y Ronda con hoteles seleccionados y visitas con guía oficial.",
    price: "890 €",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona", "Bilbao"]
  },

  // --- GEORGIA ---
  {
    id: "georgia-encanto",
    country: "Georgia",
    region: "Europa",
    title: "Encanto del Cáucaso: Tiflis y Kazbegi",
    titleLine1: "Encanto del Cáucaso:",
    titleLine2: "Tiflis y Kazbegi",
    tag: "MONTAÑAS & TRADICIÓN",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Centro histórico de Tiflis, Iglesia de la Trinidad de Guergueti frente al Monte Kazbek, bodegas subterráneas de Kajetia y gastronomía georgiana.",
    price: "1.120 €",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- GRECIA ---
  {
    id: "grecia-clasica",
    country: "Grecia",
    region: "Europa",
    title: "Grecia Clásica & Crucero Islas Griegas",
    titleLine1: "Grecia Clásica & Crucero",
    titleLine2: "Islas Griegas",
    tag: "MITOLOGÍA & EGEO",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Acrópolis de Atenas, Delfos, Monasterios de Meteora y crucero por las paradisíacas islas de Mykonos y Santorini con puestas de sol únicas.",
    price: "1.340 €",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- HOLANDA ---
  {
    id: "holanda-amsterdam",
    country: "Holanda",
    region: "Europa",
    title: "Ámsterdam Clásica, Molinos & Canales",
    titleLine1: "Ámsterdam Clásica,",
    titleLine2: "Molinos & Canales",
    tag: "ESCAPADA URBANA",
    duration: "4 DÍAS / 3 NOCHES",
    description: "Paseo en barco por los canales, Rijksmuseum, pueblo de molinos de Zaanse Schans y puerto pesquero de Volendam.",
    price: "490 €",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- HUNGRÍA ---
  {
    id: "hungria-budapest",
    country: "Hungría",
    region: "Europa",
    title: "Budapest Perla del Danubio & Balnearios",
    titleLine1: "Budapest Perla del Danubio",
    titleLine2: "& Balnearios",
    tag: "AGUAS TERMALES",
    duration: "4 DÍAS / 3 NOCHES",
    description: "Parlamento de Budapest, Bastión de los Pescadores, crucero nocturno por el Danubio y entrada a las termas Széchenyi.",
    price: "360 €",
    image: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- INGLATERRA ---
  {
    id: "inglaterra-londres",
    country: "Inglaterra",
    region: "Europa",
    title: "Londres Monumental, Cotswolds & Oxford",
    titleLine1: "Londres Monumental,",
    titleLine2: "Cotswolds & Oxford",
    tag: "CULTURA BRITÁNICA",
    duration: "5 DÍAS / 4 NOCHES",
    description: "Big Ben, Torre de Londres, palacio de Buckingham y excursión a la campiña de Cotswolds y colegios universitarios de Oxford.",
    price: "690 €",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- IRLANDA ---
  {
    id: "irlanda-esmeralda",
    country: "Irlanda",
    region: "Europa",
    title: "La Isla Esmeralda: Dublín & Acantilados de Moher",
    titleLine1: "La Isla Esmeralda:",
    titleLine2: "Dublín & Acantilados de Moher",
    tag: "PAISAJES VERDES",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Trinity College en Dublín, impresionantes Acantilados de Moher sobre el Atlántico, Anillo de Kerry y música tradicional en pubs de Galway.",
    price: "1.280 €",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- ITALIA ---
  {
    id: "italia-roma",
    country: "Italia",
    region: "Europa",
    title: "Escapada Roma Monumental & Vaticano",
    titleLine1: "Escapada Roma Monumental",
    titleLine2: "& Vaticano",
    tag: "ESCAPADA CLÁSICA",
    duration: "4 DÍAS / 3 NOCHES",
    description: "Coliseo, Foros Imperiales, Museos Vaticanos y Fontana di Trevi con hotel 4★ céntrico, desayunos y traslados privados.",
    price: "320 €",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona", "Valencia"]
  },
  {
    id: "italia-toscana",
    country: "Italia",
    region: "Europa",
    title: "Maravillas del Renacimiento: Florencia y Venecia",
    titleLine1: "Maravillas del Renacimiento:",
    titleLine2: "Florencia y Venecia",
    tag: "ARTE Y ROMANTICISMO",
    duration: "7 DÍAS / 6 NOCHES",
    description: "Galería Uffizi y Duomo en Florencia, colinas toscanas de Siena y paseo en góndola por los canales de Venecia en tren rápido.",
    price: "1.150 €",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- MOLDAVIA ---
  {
    id: "moldavia-orheiul",
    country: "Moldavia",
    region: "Europa",
    title: "Monasterios Rupestres & Bodegas de Moldavia",
    titleLine1: "Monasterios Rupestres",
    titleLine2: "& Bodegas de Moldavia",
    tag: "RUTAS DEL VINO",
    duration: "5 DÍAS / 4 NOCHES",
    description: "Complejo arqueológico de Orheiul Vechi sobre el río Răut, galerías subterráneas vinícolas de Cricova y catedrales de Chisináu.",
    price: "780 €",
    image: "/moldavia_orheiul_vechi.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- POLONIA ---
  {
    id: "polonia-historica",
    country: "Polonia",
    region: "Europa",
    title: "Polonia Histórica: Varsovia, Cracovia y Wieliczka",
    titleLine1: "Polonia Histórica:",
    titleLine2: "Varsovia, Cracovia y Wieliczka",
    tag: "CIUDADES HISTÓRICAS",
    duration: "7 DÍAS / 6 NOCHES",
    description: "Castillo Real de Varsovia, colina de Wawel y plaza del mercado en Cracovia, y la asombrosa catedral subterránea de sal en Wieliczka.",
    price: "890 €",
    image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- REPÚBLICAS BÁLTICAS ---
  {
    id: "balticas-joyas",
    country: "Rep. Bálticas",
    region: "Europa",
    title: "Joyas del Báltico: Vilna, Riga y Tallin",
    titleLine1: "Joyas del Báltico:",
    titleLine2: "Vilna, Riga y Tallin",
    tag: "CAPITALES BÁLTICAS",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Castillo medieval de Trakai, arquitectura modernista Art Nouveau en Riga, y el casco antiguo medieval amurallado de Tallin.",
    price: "1.190 €",
    image: "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- REPÚBLICA CHECA ---
  {
    id: "rep-checa-praga",
    country: "Rep. Checa",
    region: "Europa",
    title: "Escapada Praga Ciudad de las Cien Torres",
    titleLine1: "Escapada Praga",
    titleLine2: "Ciudad de las Cien Torres",
    tag: "ESCAPADA ROMÁNTICA",
    duration: "4 DÍAS / 3 NOCHES",
    description: "Castillo de Praga, Puente de Carlos, Reloj Astronómico y paseo en barco por el río Moldava con guía de habla hispana.",
    price: "295 €",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- RUMANÍA ---
  {
    id: "rumania-castillos",
    country: "Rumanía",
    region: "Europa",
    title: "Castillos de Transilvania y Bucarest",
    titleLine1: "Castillos de Transilvania",
    titleLine2: "y Bucarest",
    tag: "LEYENDAS DE LOS CÁRPATOS",
    duration: "7 DÍAS / 6 NOCHES",
    description: "Palacio de Peleș en Sinaia, Castillo de Bran (asociado a Drácula), ciudadela sajona de Brașov y el monumental Bucarest.",
    price: "980 €",
    image: "/rumania_peles.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },

  // ==========================================
  // AMÉRICA
  // ==========================================
  // --- ARGENTINA ---
  {
    id: "argentina-glaciares",
    country: "Argentina",
    region: "América",
    title: "Glaciares de la Patagonia, Iguazú y Buenos Aires",
    titleLine1: "Glaciares de la Patagonia,",
    titleLine2: "Iguazú y Buenos Aires",
    tag: "NATURALEZA EXTREMA",
    duration: "12 DÍAS / 10 NOCHES",
    description: "Cataratas de Iguazú, pasarelas frente al Glaciar Perito Moreno en El Calafate y espectáculo de tango en San Telmo, Buenos Aires.",
    price: "2.780 €",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- CANADÁ ---
  {
    id: "canada-rocosas",
    country: "Canadá",
    region: "América",
    title: "Canadá Rocosas & Lagos Glaciares",
    titleLine1: "Canadá Rocosas",
    titleLine2: "& Lagos Glaciares",
    tag: "GRANDES ESPACIOS",
    duration: "10 DÍAS / 8 NOCHES",
    description: "Calgary, Parque Nacional Banff, Lago Moraine y Lago Louise, vehículo especial sobre el Glaciar Athabasca y Vancouver costera.",
    price: "2.450 €",
    image: "/canada_moraine_lake.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- COSTA RICA ---
  {
    id: "costa-rica-pura-vida",
    country: "Costa Rica",
    region: "América",
    title: "Costa Rica Pura Vida & Tortuguero",
    titleLine1: "Costa Rica Pura Vida",
    titleLine2: "& Tortuguero",
    tag: "NATURALEZA PURA",
    duration: "9 DÍAS / 7 NOCHES",
    description: "Canales de Tortuguero, Volcán Arenal, aguas termales y bosques nubosos de Monteverde con puentes colgantes y traslados privados.",
    price: "1.790 €",
    image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- ESTADOS UNIDOS ---
  {
    id: "eeuu-nueva-york",
    country: "Estados Unidos",
    region: "América",
    title: "Nueva York Esencial & Costa Este",
    titleLine1: "Nueva York Esencial",
    titleLine2: "& Costa Este",
    tag: "METRÓPOLIS",
    duration: "7 DÍAS / 5 NOCHES",
    description: "Manhattan, Central Park, miradores Edge y Empire State, Estatua de la Libertad y opción de excursión a Washington D.C.",
    price: "1.490 €",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- MÉXICO ---
  {
    id: "mexico-maya",
    country: "México",
    region: "América",
    title: "Ruta Maya y Playas de Riviera Maya",
    titleLine1: "Ruta Maya y Playas",
    titleLine2: "de Riviera Maya",
    tag: "PIRÁMIDES & CARIBE",
    duration: "9 DÍAS / 7 NOCHES",
    description: "Chichén Itzá, cenotes sagrados, ruinas frente al mar en Tulum y descanso con todo incluido en resorts de Riviera Maya.",
    price: "1.420 €",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // ==========================================
  // ÁFRICA
  // ==========================================
  // --- KENIA ---
  {
    id: "kenia-safari",
    country: "Kenia",
    region: "África",
    title: "Safari Masái Footsteps & Naivasha",
    titleLine1: "Safari Masái Footsteps",
    titleLine2: "& Naivasha",
    tag: "SAFARI FOTOGRÁFICO",
    duration: "9 DÍAS / 6 NOCHES",
    description: "2N Amboseli frente al Kilimanjaro + 1N Lago Naivasha + 2N en Masái Mara en Pensión Completa con safaris para avistar los cinco grandes.",
    price: "2.190 €",
    image: "/kenia_amboseli.jpg",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- MARRUECOS ---
  {
    id: "marruecos-desierto",
    country: "Marruecos",
    region: "África",
    title: "Ciudades Rojas y Desierto de Merzouga",
    titleLine1: "Ciudades Rojas",
    titleLine2: "y Desierto de Merzouga",
    tag: "DESIERTO & KASBAHS",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Marrakech, gargantas del Todra, noche en campamento de jaimas en las dunas de Merzouga, kasbahs de Ait Ben Haddou y Ouarzazate.",
    price: "635 €",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },
  {
    id: "marruecos-escapada",
    country: "Marruecos",
    region: "África",
    title: "Escapada Marrakech Express y Riad con Encanto",
    titleLine1: "Escapada Marrakech Express",
    titleLine2: "y Riad con Encanto",
    tag: "ESCAPADA RIAD",
    duration: "4 DÍAS / 3 NOCHES",
    description: "Estancia en Riad tradicional en la Medina, plaza Jemaa el-Fna, Jardines de Majorelle y cena tradicional marroquí con espectáculo.",
    price: "280 €",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- TANZANIA ---
  {
    id: "tanzania-parques",
    country: "Tanzania",
    region: "África",
    title: "Grandes Parques de Tanzania & Zanzíbar",
    titleLine1: "Grandes Parques de Tanzania",
    titleLine2: "& Zanzíbar",
    tag: "SAFARI & PLAYA",
    duration: "10 DÍAS / 8 NOCHES",
    description: "Llanuras sin fin del Serengeti, Cráter de Ngorongoro en 4x4 y vuelo a la paradisíaca isla de Zanzíbar con playas de arena blanca.",
    price: "2.650 €",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    departureCities: ["Madrid", "Barcelona"]
  },

  // --- TÚNEZ ---
  {
    id: "tunez-arqueologico",
    country: "Túnez",
    region: "África",
    title: "Túnez Arqueológico: Oasis y Sidi Bou Said",
    titleLine1: "Túnez Arqueológico:",
    titleLine2: "Oasis y Sidi Bou Said",
    tag: "MEDINAS & SÁHARA",
    duration: "8 DÍAS / 7 NOCHES",
    description: "Ruinas romanas de Cartago, pueblo blanco y azul de Sidi Bou Said, anfiteatro de El Djem y oasis saharianos de Tozeur.",
    price: "680 €",
    image: "/tunez_sidi_bou_said.jpg",
    departureCities: ["Madrid", "Barcelona"]
  }
];

export function findZoneForCountry(countryName: string): ZoneDefinition | undefined {
  const norm = countryName.toLowerCase().trim();
  return ZONES.find((z) => z.countries.some((c) => c.toLowerCase().trim() === norm));
}
