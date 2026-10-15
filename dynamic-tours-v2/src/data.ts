import { Tour } from "./types";

export const SAMPLE_TOURS: Tour[] = [
  {
    id: "TR-101",
    title: "Maravillas del Nilo con El Cairo",
    destination: "Egipto",
    duration: 8,
    category: "Cultura",
    wholesalePrice: 785,
    retailPrice: 924,
    commission: 15,
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop",
    summary: "El circuito insignia de Dynamic Tours. Incluye crucero de 4 noches por el Nilo en pensión completa y 3 noches en El Cairo con desayunos, vuelos internacionales y domésticos, visitas completas a Karnak, Luxor, Valle de los Reyes, Edfu, Kom Ombo y Pirámides de Guiza.",
    highlights: [
      "Crucero de 4 noches por el Nilo en motonave 5★ Lujo",
      "Estancia de 3 noches en El Cairo en hotel 5★",
      "Visitas arqueológicas completas con egiptólogo de habla hispana",
      "Día completo a las Pirámides de Guiza, la Esfinge y Templo del Valle",
      "Traslados privados en vehículos modernos climatizados"
    ],
    hotelCategory: "Motonave 5★ Lujo & Hotel Cairo 5★",
    inclusions: [
      "Vuelos de línea regular España - El Cairo - Asuán / Luxor - El Cairo - España",
      "Vuelos domésticos internos en Egipto",
      "4 noches de crucero por el Nilo en régimen de pensión completa",
      "3 noches en El Cairo en régimen de alojamiento y desayuno",
      "Todas las visitas y traslados según programa con guía oficial",
      "Seguro multiasistencia de viaje con cobertura médica"
    ],
    exclusions: [
      "Visado de entrada a Egipto (25 USD)",
      "Cuota de servicios y propinas generales (75 €)",
      "Bebidas y gastos personales"
    ],
    itinerary: [
      { day: 1, title: "España - El Cairo - Asuán", description: "Salida en vuelo regular a El Cairo con enlace a Asuán. Asistencia en el aeropuerto y traslado a la motonave. Noche a bordo." },
      { day: 2, title: "Asuán - Templos de Filas & Paseo en Faluca", description: "Visita del Templo de Isis en la isla de Filas. Paseo en faluca tradicional alrededor de la Isla Elefantina. Navegación hacia Kom Ombo." },
      { day: 3, title: "Kom Ombo - Edfu - Esna - Luxor", description: "Visita al Templo de Kom Ombo (dioses Sobek y Haroeris). Traslado en calesa al Templo de Horus en Edfu. Cruce de la esclusa de Esna rumbo a Luxor." },
      { day: 4, title: "Luxor - Valle de los Reyes & Templos de Karnak", description: "Visita a la Necrópolis de Tebas: Valle de los Reyes, Templo de Hatshepsut y Colosos de Memnón. Visita monumental a los Templos de Karnak y Luxor." },
      { day: 5, title: "Luxor - El Cairo", description: "Desembarque y traslado al aeropuerto de Luxor para tomar vuelo a El Cairo. Llegada y traslado al hotel seleccionado." },
      { day: 6, title: "El Cairo - Pirámides de Guiza", description: "Visita al conjunto monumental de las Pirámides de Keops, Kefrén y Micerino, la Gran Esfinge y el Templo del Valle. Tarde libre." },
      { day: 7, title: "El Cairo - Día Libre (Excursiones Opcionales)", description: "Día libre. Posibilidad de contratar excursión opcional a la Ciudadela de Saladino, Museo Egipcio, Barrio Copto y zoco Jan el-Jalili." },
      { day: 8, title: "El Cairo - España", description: "Desayuno. Traslado al aeropuerto internacional de El Cairo para tomar vuelo regular de regreso a España." }
    ]
  },
  {
    id: "TR-102",
    title: "Escapada Porto & Crucero Seis Puentes",
    destination: "Portugal",
    duration: 3,
    category: "Cultura",
    wholesalePrice: 169,
    retailPrice: 199,
    commission: 15,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd81?q=80&w=800&auto=format&fit=crop",
    summary: "Escapada gastronómica y cultural en Oporto con encanto atlántico. Incluye 2 noches en hotel seleccionado en régimen de alojamiento y desayuno, crucero tradicional de los seis puentes por la Ribera del Duero y seguro básico.",
    highlights: [
      "2 noches de alojamiento en Oporto en régimen de AD",
      "Crucero de los Seis Puentes en barco rabelo tradicional por el río Duero",
      "City Tour a pie por el centro histórico de Oporto",
      "Degustación opcional en histórica bodega de vino de Oporto en Vila Nova de Gaia",
      "Conexiones de vuelos y traslados ejecutivos"
    ],
    hotelCategory: "Hotel 4★ Centro de Oporto",
    inclusions: [
      "Vuelos regulares directos desde España",
      "2 noches de estancia en hotel 4★ seleccionado con desayuno buffet",
      "Billete para crucero fluvial de los seis puentes en el río Duero",
      "Seguro multiasistencia básico de viaje"
    ],
    exclusions: [
      "Tasa turística municipal de Oporto (pago directo en hotel)",
      "Comidas y bebidas no especificadas",
      "Entradas a monumentos no indicados en el programa"
    ],
    itinerary: [
      { day: 1, title: "España - Oporto", description: "Llegada al aeropuerto de Oporto y traslado al hotel. Tarde para pasear por la Avenida dos Aliados y la Torre de los Clérigos." },
      { day: 2, title: "Oporto - Crucero del Duero & Ribeira", description: "Desayuno. Mañana para recorrer el barrio de Ribeira y disfrutar del crucero panorámico de los seis puentes en barco rabelo. Visita de bodegas en Gaia." },
      { day: 3, title: "Oporto - España", description: "Desayuno en el hotel. Tiempo libre para compras o visita al Palacio de la Bolsa antes del traslado al aeropuerto de regreso." }
    ]
  },
  {
    id: "TR-103",
    title: "Sueños de Estambul y Capadocia",
    destination: "Turquía",
    duration: 8,
    category: "Cultura",
    wholesalePrice: 1019,
    retailPrice: 1199,
    commission: 15,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
    summary: "Un recorrido equilibrado que combina 4 noches en Estambul con 3 noches en Capadocia en pensión completa, vuelos de Turkish Airlines, vuelo doméstico interno, traslados, visitas con guía de habla hispana y seguro.",
    highlights: [
      "4 noches en Estambul (Alojamiento y Desayuno) + 3 noches en Capadocia (Pensión Completa)",
      "Vuelos garantizados con Turkish Airlines y vuelo doméstico incluido",
      "Visita al Valle de Göreme, chimeneas de hadas y ciudades subterráneas",
      "Visitas en Estambul: Santa Sofía, Mezquita Azul y Bazar de las Especias",
      "Posibilidad de paseo en globo aerostático al amanecer en Capadocia"
    ],
    hotelCategory: "Hoteles Seleccionados 4★ / 5★ & Cueva Superior",
    inclusions: [
      "Vuelos internacionales de línea regular y vuelo interno",
      "Estancia en hoteles de 4★/5★ según programa",
      "Régimen de comidas: AD en Estambul y Pensión Completa en Capadocia",
      "Todos los traslados y visitas con guía oficial en español",
      "Seguro multiasistencia de viaje"
    ],
    exclusions: [
      "Excursión opcional en globo sobre Capadocia",
      "Bebidas en las comidas",
      "Propinas para guía y conductor"
    ],
    itinerary: [
      { day: 1, title: "España - Estambul", description: "Vuelo con destino a Estambul. Llegada, recepción y traslado al hotel." },
      { day: 2, title: "Estambul - Santa Sofía & Mezquita Azul", description: "Visita histórica: Santa Sofía, la Mezquita Azul, el Hipódromo y el Gran Bazar." },
      { day: 3, title: "Estambul - Crucero por el Bósforo", description: "Recorrido en barco por el Estrecho del Bósforo contemplando palacios y fortalezas otomanas." },
      { day: 4, title: "Estambul - Capadocia", description: "Traslado al aeropuerto para tomar vuelo a Capadocia. Llegada y traslado al hotel con cena." },
      { day: 5, title: "Capadocia - Museo al Aire Libre de Göreme", description: "Excursión en globo opcional al amanecer. Visita al valle de Göreme, chimeneas de hadas y pueblos trogloditas." },
      { day: 6, title: "Capadocia - Ciudad Subterránea & Valles", description: "Descubrimiento de una ciudad subterránea y los espectaculares valles de palomares y amor." },
      { day: 7, title: "Capadocia - Estambul", description: "Vuelo de regreso a Estambul. Tarde libre para últimas compras o paseo nocturno." },
      { day: 8, title: "Estambul - España", description: "Desayuno y traslado al aeropuerto para el vuelo regular de vuelta." }
    ]
  },
  {
    id: "TR-104",
    title: "Triángulo de Oro de la India",
    destination: "India",
    duration: 8,
    category: "Cultura",
    wholesalePrice: 1189,
    retailPrice: 1399,
    commission: 15,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
    summary: "El viaje clásico por la espiritualidad y el color del norte de la India. Visite Delhi monumental, la majestuosidad del Taj Mahal en Agra y los palacios maharajás de Jaipur en Media Pensión con vehículo privado.",
    highlights: [
      "Delhi: Vieja Delhi, Fuerte Rojo, Jama Masjid y Nueva Delhi",
      "Agra: Maravilla mundial del Taj Mahal y Fuerte Rojo de Agra",
      "Jaipur: Fuerte Amber, Palacio de los Vientos (Hawa Mahal) y Palacio de la Ciudad",
      "Hoteles seleccionados de categoría 5 estrellas en Media Pensión",
      "Chófer privado climatizado y guías oficiales en español"
    ],
    hotelCategory: "Hoteles 5★ Heritage & Gran Lujo",
    inclusions: [
      "Vuelos internacionales de línea regular",
      "7 noches en hoteles 5★ en régimen de Media Pensión (desayunos y cenas)",
      "Transporte privado con aire acondicionado durante todo el recorrido",
      "Entradas a todos los monumentos incluidos en el itinerario",
      "Seguro multiasistencia de viaje completo"
    ],
    exclusions: [
      "Visado de entrada a la India (tramitación online e-Visa)",
      "Propinas para guía, chófer y maleteros",
      "Gastos personales y bebidas"
    ],
    itinerary: [
      { day: 1, title: "España - Delhi", description: "Vuelo regular con destino Delhi. Llegada, bienvenida tradicional y traslado al hotel." },
      { day: 2, title: "Delhi - Recorrido Monumental", description: "Visitas guiadas por la Vieja Delhi (Jama Masjid, Chandni Chowk) y Nueva Delhi (Puerta de la India, Tumba de Humayun)." },
      { day: 3, title: "Delhi - Agra (Taj Mahal)", description: "Salida hacia Agra. Por la tarde, visita inolvidable al atardecer del Taj Mahal, el monumento al amor." },
      { day: 4, title: "Agra - Fatehpur Sikri - Jaipur", description: "Visita al Fuerte de Agra. Traslado hacia la Ciudad Rosa de Jaipur, visitando en ruta la ciudad abandonada de Fatehpur Sikri." },
      { day: 5, title: "Jaipur - Fuerte Amber & Palacios", description: "Subida al Fuerte Amber. Visita del Palacio de la Ciudad, Observatorio Astronómico Jantar Mantar y fachada del Hawa Mahal." },
      { day: 6, title: "Jaipur - Delhi", description: "Regreso por carretera a Delhi. Tarde libre para mercados de artesanía o descanso en el hotel." },
      { day: 7, title: "Delhi - Relax & Últimas Visitas", description: "Día para pasear por los jardines Lodhi o compras de sedas y especias." },
      { day: 8, title: "Delhi - España", description: "Traslado al aeropuerto internacional Indira Gandhi para el vuelo de regreso." }
    ]
  },
  {
    id: "TR-105",
    title: "La Ruta de la Seda: Uzbekistán Esencial",
    destination: "Uzbekistán",
    duration: 8,
    category: "Cultura",
    wholesalePrice: 1115,
    retailPrice: 1310,
    commission: 15,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
    summary: "Un fascinante circuito por los oasis de la antigua Ruta de la Seda. Visite Tashkent, la ciudad museo de Jiva, las cúpulas de Bujará y la grandiosa Samarcanda de Tamerlán con tren rápido Afrosiyob.",
    highlights: [
      "Recorrido completo: Tashkent, Jiva (Ichan Kala), Bujará y Samarcanda",
      "Vuelo doméstico interno Tashkent - Urgench incluido",
      "Trayecto en tren de alta velocidad Afrosiyob de Bujará a Samarcanda",
      "Hoteles tradicionales de categoría 4★ boutique en régimen de Media Pensión",
      "Guías oficiales dedicados de habla hispana"
    ],
    hotelCategory: "Hoteles Boutique Tradicionales 4★",
    inclusions: [
      "Vuelos internacionales de línea regular y vuelo interno",
      "Billete de tren rápido Afrosiyob",
      "6 noches de alojamiento en Media Pensión (desayunos y cenas)",
      "Todas las visitas y entradas según programa",
      "Seguro multiasistencia de viaje"
    ],
    exclusions: [
      "Bebidas y gastos de carácter personal",
      "Propinas para guías y chóferes locales",
      "Derechos de fotografía en monumentos"
    ],
    itinerary: [
      { day: 1, title: "España - Tashkent", description: "Vuelo con destino a Tashkent. Llegada y traslado al hotel." },
      { day: 2, title: "Tashkent - Urgench - Jiva", description: "Visita de Tashkent y vuelo a Urgench. Traslado a la joya amurallada de Jiva." },
      { day: 3, title: "Jiva - Ichan Kala al Completo", description: "Descubrimiento a pie de la ciudadela de Jiva: minaretes esmaltados, mezquitas y palacios." },
      { day: 4, title: "Jiva - Desierto de Kizil Kum - Bujará", description: "Cruce escénico del desierto de arena roja bordeando el río Amu Darya hasta Bujará." },
      { day: 5, title: "Bujará - El Gran Oasis Comercial", description: "Visita del conjunto de Lyabi-Khauz, la mezquita Kalyan y la imponente Fortaleza Ark." },
      { day: 6, title: "Bujará - Tren Rápido a Samarcanda", description: "Mañana libre y traslado a la estación para el tren Afrosiyob a la mítica Samarcanda." },
      { day: 7, title: "Samarcanda - Plaza del Registán", description: "Visita de la emblemática Plaza del Registán, el Mausoleo de Tamerlán y mezquita Bibi Khanum." },
      { day: 8, title: "Samarcanda - Tashkent - España", description: "Regreso a Tashkent y vuelo regular de retorno a España." }
    ]
  },
  {
    id: "TR-106",
    title: "Japón Banzai & Ryokan Tradicional",
    destination: "Japón",
    duration: 12,
    category: "Lujo",
    wholesalePrice: 2115,
    retailPrice: 2490,
    commission: 15,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    summary: "El gran viaje a Japón combinando vanguardia urbana y tradición milenaria. Conozca Tokio, Kioto, Takayama, Kanazawa, noche en auténtico Ryokan japonés con aguas termales Onsen en Gero y la vibrante Osaka.",
    highlights: [
      "Estancias en Tokio, Kioto, Takayama, Kanazawa, Gero y Osaka",
      "Noche en Ryokan tradicional con cena kaiseki japonesa y baños termales Onsen",
      "Billetes de tren bala Shinkansen incluidos",
      "Visitas guiadas en español a los principales templos y barrios históricos",
      "Vuelos regulares de línea internacional"
    ],
    hotelCategory: "Hoteles 4★ Superior & Ryokan Tradicional",
    inclusions: [
      "Vuelos internacionales de línea regular",
      "9 noches de alojamiento en hoteles seleccionados + 1 noche en Ryokan con media pensión",
      "Pases y billetes de tren Shinkansen",
      "Visitas y traslados indicados en itinerario con guía en español",
      "Seguro multiasistencia médico"
    ],
    exclusions: [
      "Almuerzos y cenas no especificados",
      "Gastos de equipaje extra o compras personales"
    ],
    itinerary: [
      { day: 1, title: "España - Tokio", description: "Salida en vuelo hacia Tokio." },
      { day: 2, title: "Llegada a Tokio", description: "Recepción en aeropuerto y traslado al hotel en Shibuya/Shinjuku." },
      { day: 3, title: "Tokio - Santuario Meiji y Asakusa", description: "Templo Senso-ji, cruce de Shibuya y miradores panorámicos de la metrópoli." },
      { day: 4, title: "Tokio - Día Libre", description: "Día para compras en Ginza o excursión al Monte Fuji y Hakone." },
      { day: 5, title: "Tokio - Takayama", description: "Viaje a los Alpes japoneses. Calles de madera históricas y sake tradicional." },
      { day: 6, title: "Takayama - Shirakawago - Kanazawa", description: "Visita de las aldeas de casas con techos de paja gassho-zukuri y jardines Kenrokuen en Kanazawa." },
      { day: 7, title: "Kanazawa - Gero Onsen", description: "Traslado al balneario de Gero. Estancia en Ryokan con cena kaiseki y baños termales." },
      { day: 8, title: "Gero - Kioto", description: "Llegada a la capital cultural. Paseo por Gion, el mítico barrio de las geishas." },
      { day: 9, title: "Kioto - Pabellón Dorado y Arashiyama", description: "Templo Kinkaku-ji, bosque de bambú de Arashiyama y santuario Fushimi Inari." },
      { day: 10, title: "Kioto - Nara - Osaka", description: "Parque de los ciervos de Nara, Gran Buda de Todai-ji y noche en Dotonbori (Osaka)." },
      { day: 11, title: "Osaka - Día Libre", description: "Castillo de Osaka y gastronomía callejera." },
      { day: 12, title: "Osaka - España", description: "Traslado al aeropuerto de Kansai para el vuelo de regreso." }
    ]
  },
  {
    id: "TR-107",
    title: "Tesoros y Castillos de Escocia",
    destination: "Escocia",
    duration: 8,
    category: "Cultura",
    wholesalePrice: 1230,
    retailPrice: 1450,
    commission: 15,
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop",
    summary: "Descubra las Tierras Altas de Escocia, sus leyendas gaélicas y castillos medievales. Incluye estancias en Edimburgo, Aberdeen, Inverness, el misterioso Lago Ness y la Costa Oeste con régimen de Media Pensión.",
    highlights: [
      "3 noches en Edimburgo + 4 noches de circuito por las Highlands",
      "Visita al Lago Ness y ruinas del Castillo de Urquhart",
      "Castillo de Stirling, destilería de whisky escocés con cata y Catedral de St. Andrews",
      "Hoteles seleccionados de categoría 4★ con desayunos y cenas en ruta",
      "Guía oficial de habla hispana durante todo el circuito"
    ],
    hotelCategory: "Hoteles Seleccionados 4★ en Edimburgo y Highlands",
    inclusions: [
      "Vuelos directos de ida y vuelta España - Edimburgo",
      "Circuito completo en autocar de alta gama climatizado",
      "7 noches de alojamiento según programa",
      "Régimen de Media Pensión (desayunos y cenas) en el circuito y AD en Edimburgo",
      "Seguro multiasistencia de viaje"
    ],
    exclusions: [
      "Almuerzos en ruta",
      "Propinas para guía y conductor",
      "Bebidas en las cenas"
    ],
    itinerary: [
      { day: 1, title: "España - Edimburgo", description: "Llegada y traslado al hotel. Primer paseo por la Royal Mile." },
      { day: 2, title: "Edimburgo Monumental", description: "Visita guiada del Castillo de Edimburgo, Holyroodhouse y la New Town georgiana." },
      { day: 3, title: "Edimburgo - St. Andrews - Aberdeen", description: "Parada en la cuna del golf de St. Andrews y el espectacular Castillo de Dunnottar sobre el acantilado." },
      { day: 4, title: "Aberdeen - Valle de Speyside - Inverness", description: "Ruta de las destilerías de whisky de malta con degustación y llegada a Inverness." },
      { day: 5, title: "Inverness - Lago Ness - Costa Oeste", description: "Paseo en barco por el Lago Ness, Castillo de Urquhart y cruce del espectacular valle de Glen Coe." },
      { day: 6, title: "Costa Oeste - Loch Lomond - Castillo de Stirling", description: "Parque Nacional de Loch Lomond y visita al emblemático Castillo de Stirling." },
      { day: 7, title: "Stirling - Edimburgo", description: "Regreso a Edimburgo con tarde libre para compras y pubs tradicionales." },
      { day: 8, title: "Edimburgo - España", description: "Traslado al aeropuerto para vuelo de vuelta." }
    ]
  },
  {
    id: "TR-108",
    title: "Joyas del Nilo - Chárter Provincias",
    destination: "Egipto",
    duration: 8,
    category: "Cultura",
    wholesalePrice: 1060,
    retailPrice: 1250,
    commission: 15,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?q=80&w=800&auto=format&fit=crop",
    summary: "Operativa chárter exclusiva sin escalas desde aeropuertos de provincias españoles (Asturias, Zaragoza, Sevilla, Bilbao, Valencia, Santiago). Incluye crucero de 4 noches en pensión completa, 3 noches en El Cairo y Abu Simbel en avión incluido.",
    highlights: [
      "Vuelos chárter directos sin escalas desde tu aeropuerto provincial",
      "Excursión en avión a los Templos de Abu Simbel incluida de serie",
      "Crucero de 4 noches por el Nilo 5★ Pensión Completa + 3 noches Cairo 5★",
      "Egiptólogo nativo exclusivo durante todo el recorrido",
      "Cupos aéreos 100% garantizados para agencias minoristas"
    ],
    hotelCategory: "Motonave 5★ Gran Lujo & Hotel Cairo 5★",
    inclusions: [
      "Vuelos chárter directos ida y vuelta desde provincia seleccionada",
      "Vuelos internos domésticos en Egipto",
      "Excursión a Abu Simbel en avión",
      "Pensión completa en crucero y AD en El Cairo",
      "Visitas arqueológicas completas y traslados privados",
      "Seguro multiasistencia de viaje"
    ],
    exclusions: [
      "Visado de entrada a Egipto (25 USD)",
      "Propinas generales y cuota de servicio (75 €)",
      "Bebidas y extras personales"
    ],
    itinerary: [
      { day: 1, title: "Provincia - Asuán", description: "Vuelo chárter directo desde el aeropuerto provincial hasta Asuán. Asistencia y embarque en la motonave." },
      { day: 2, title: "Asuán - Abu Simbel en Avión - Kom Ombo", description: "Vuelo a Abu Simbel para contemplar los templos de Ramsés II y Nefertari. Regreso y navegación a Kom Ombo." },
      { day: 3, title: "Kom Ombo - Edfu - Esna - Luxor", description: "Visitas a los templos de Kom Ombo y Horus en Edfu. Navegación hacia Luxor pasando la esclusa de Esna." },
      { day: 4, title: "Luxor - Valle de los Reyes y Karnak", description: "Necrópolis tebana, Colosos de Memnón y majestuosos Templos de Karnak y Luxor." },
      { day: 5, title: "Luxor - El Cairo", description: "Vuelo regular a El Cairo. Llegada, traslado al hotel y tiempo libre." },
      { day: 6, title: "El Cairo - Pirámides de Guiza y Esfinge", description: "Visita al conjunto monumental de las tres pirámides y la Gran Esfinge." },
      { day: 7, title: "El Cairo - Día Libre", description: "Día libre para visitas opcionales o compras en Jan el-Jalili." },
      { day: 8, title: "El Cairo - Provincia de Origen", description: "Traslado al aeropuerto para tomar vuelo directo chárter de regreso a su provincia." }
    ]
  }
];
