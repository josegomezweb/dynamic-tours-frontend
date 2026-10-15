import { Tour } from "./types";

export const SAMPLE_TOURS: Tour[] = [
  {
    id: "TR-101",
    title: "Joyas del Nilo con El Cairo Especial",
    destination: "Egipto",
    duration: 8,
    category: "Cultura",
    wholesalePrice: 975,
    retailPrice: 1145,
    commission: 15,
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop",
    summary: "El circuito clásico y de mayor demanda en el mercado español. Incluye un crucero de 4 noches por el río Nilo en régimen de pensión completa con visitas arqueológicas completas, estancia de 3 noches en El Cairo con desayunos y visitas a las Pirámides de Guiza.",
    highlights: [
      "Crucero de 4 noches por el Nilo a bordo de motonave de categoría 5★ Superior",
      "Estancia de 3 noches en El Cairo en hotel de 5★ céntrico",
      "Visitas arqueológicas completas en Luxor, Edfu, Kom Ombo y Asuán",
      "Visita de día completo a las Pirámides de Guiza, la Esfinge y el Templo del Valle",
      "Guía egiptólogo de habla hispana exclusivo durante toda la navegación"
    ],
    hotelCategory: "Motonave 5★ Lujo & Hotel Cairo 5★",
    inclusions: [
      "Vuelos regulares España - El Cairo - Asuán / Luxor - El Cairo - España",
      "Vuelos domésticos internos en Egipto",
      "7 noches de alojamiento según programa",
      "Pensión completa durante el crucero y alojamiento y desayuno en El Cairo",
      "Traslados completos en vehículos modernos con aire acondicionado",
      "Seguro multiasistencia de viaje con coberturas sanitarias"
    ],
    exclusions: [
      "Visado de entrada a Egipto (25 USD a pagar en destino)",
      "Propinas del crucero y chóferes (aprox. 45 € por persona)",
      "Bebidas y gastos de carácter personal"
    ],
    itinerary: [
      {
        day: 1,
        title: "España - El Cairo - Asuán",
        description: "Salida en vuelo regular con destino El Cairo. Conexión con vuelo doméstico hacia Asuán. Llegada, asistencia de nuestro personal en el aeropuerto y traslado a la motonave de crucero seleccionada. Cena fría a bordo."
      },
      {
        day: 2,
        title: "Asuán - Templos de Filas & Paseo en Faluca",
        description: "Visita al bellísimo Templo de Filas consagrado a la diosa Isis. Paseo en faluca tradicional por el Nilo alrededor de la Isla Elefantina. Opcional: excursión a los majestuosos Templos de Abu Simbel por carretera o avión. Navegación hacia Kom Ombo."
      },
      {
        day: 3,
        title: "Kom Ombo - Templo de Sobek & Edfu",
        description: "Visita del Templo de Kom Ombo, dedicado a los dioses Sobek (con cabeza de cocodrilo) y Haroeris. Navegación hacia Edfu. Al llegar, traslado en calesas para visitar el Templo de Horus en Edfu, el mejor conservado del país. Navegación a Luxor cruzando la esclusa de Esna."
      },
      {
        day: 4,
        title: "Luxor - Valle de los Reyes & Templos de Karnak",
        description: "Cruzamos a la Orilla Occidental del Nilo para descubrir la Necrópolis de Tebas, incluyendo el asombroso Valle de los Reyes, el Templo de la Reina Hatshepsut en Deir el-Bahari y los Colosos de Memnón. Por la tarde, visita a los grandiosos Templos de Karnak y Luxor."
      },
      {
        day: 5,
        title: "Luxor - El Cairo",
        description: "Desayuno a bordo y desembarque. Traslado al aeropuerto de Luxor para tomar vuelo regular con destino El Cairo. Llegada, asistencia y traslado al hotel seleccionado. Tarde libre para comenzar a explorar la vibrante capital egipcia."
      },
      {
        day: 6,
        title: "El Cairo - Pirámides de Guiza & Esfinge",
        description: "Desayuno en el hotel. Salida para realizar la visita del conjunto arqueológico de las Pirámides de Guiza: Keops, Kefrén y Micerino, la icónica Esfinge esculpida en roca caliza, y el Templo del Valle de Kefrén. Tarde libre o visita opcional al Museo Egipcio."
      },
      {
        day: 7,
        title: "El Cairo - Día Libre",
        description: "Desayuno en el hotel. Día libre para actividades personales. Recomendamos la excursión opcional de día completo a la Ciudad de El Cairo, incluyendo la Ciudadela de Saladino, la Mezquita de Alabastro, el Barrio Copto y el gran zoco de Jan el-Jalili."
      },
      {
        day: 8,
        title: "El Cairo - España",
        description: "Desayuno en el hotel. A la hora indicada, traslado privado al aeropuerto internacional de El Cairo para tomar el vuelo regular de regreso a España. Fin de nuestros servicios."
      }
    ]
  },
  {
    id: "TR-102",
    title: "Egipto Azul con Hurghada (Mar Rojo)",
    destination: "Egipto",
    duration: 11,
    category: "Playa",
    wholesalePrice: 1265,
    retailPrice: 1490,
    commission: 15,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
    summary: "Un viaje de 11 días idóneo para combinar cultura y descanso. Consta de un crucero de 4 noches por el Nilo, estancia de 3 noches en El Cairo para visitas esenciales, y 3 noches de desconexión total con régimen de Todo Incluido en las playas cristalinas de Hurghada.",
    highlights: [
      "Crucero de 4 noches por el Nilo (Pensión Completa) + 3 noches en El Cairo (Alojamiento y Desayuno)",
      "Estancia de 3 noches en Hurghada (Mar Rojo) en régimen de Todo Incluido",
      "Visitas arqueológicas completas con guías egiptólogos nativos",
      "Traslados por carretera Luxor - Hurghada en autobús privado climatizado",
      "Ideal para snorkel, buceo o disfrute de resorts de playa superiores"
    ],
    hotelCategory: "Motonave 5★ & Resorts Mar Rojo 5★",
    inclusions: [
      "Vuelos internacionales de línea regular",
      "Vuelos domésticos internos",
      "Alojamiento de 10 noches en hoteles/motonaves de categoría seleccionada",
      "Régimen alimenticio según programa (Crucero: Pensión Completa, Hurghada: Todo Incluido, Cairo: Desayuno)",
      "Todos los traslados y visitas según itinerario",
      "Seguro básico de asistencia"
    ],
    exclusions: [
      "Visado de entrada (25 USD)",
      "Propinas generales obligatorias",
      "Actividades opcionales de buceo en el Mar Rojo"
    ],
    itinerary: [
      {
        day: 1,
        title: "España - El Cairo - Asuán",
        description: "Embarque en vuelo regular a El Cairo con conexión doméstica a Asuán. Llegada al aeropuerto de Asuán, recepción por nuestro representante local de habla hispana y traslado directo a la motonave. Noche a bordo."
      },
      {
        day: 2,
        title: "Asuán - Templo de Isis",
        description: "Desayuno. Visita al Templo de Filas consagrado a Isis, diosa del amor. Tarde de navegación hacia Kom Ombo. Visita del templo doble consagrado a los dioses Sobek y Haroeris. Continuación hacia Edfu."
      },
      {
        day: 3,
        title: "Edfu - Luxor",
        description: "Visita al Templo de Horus en Edfu por la mañana en calesas tradicionales. Navegación de tarde hacia Luxor pasando por la esclusa de Esna. Disfrute del atardecer sobre las cubiertas exteriores de la motonave."
      },
      {
        day: 4,
        title: "Luxor - Valle de los Reyes y Templos",
        description: "Cruzar a la Orilla Occidental del Nilo. Visita al Valle de los Reyes (3 tumbas incluidas), el Templo de Hatshepsut y los Colosos de Memnón. Visita posterior de la orilla Oriental: Templos de Karnak y Luxor."
      },
      {
        day: 5,
        title: "Luxor - Hurghada",
        description: "Desayuno. Desembarque y traslado por carretera en cómodo autocar privado de alta gama con aire acondicionado con dirección a Hurghada, en la costa del Mar Rojo (aprox 4 horas). Check-in en el resort seleccionado con régimen de Todo Incluido."
      },
      {
        day: 6,
        title: "Hurghada (Mar Rojo) - Día Libre de Relax",
        description: "Día libre en régimen de Todo Incluido. Disfrute de las espectaculares instalaciones del hotel, de su playa privada o realice actividades acuáticas opcionales como snorkel o excursión en barco a la isla de Giftun."
      },
      {
        day: 7,
        title: "Hurghada (Mar Rojo) - Opciones de Buceo",
        description: "Día libre. Puede optar por realizar una jornada de bautismo de buceo o contratar inmersiones en los ricos arrecifes del norte del Mar Rojo, mundialmente famosos por sus fondos de coral y fauna marina."
      },
      {
        day: 8,
        title: "Hurghada - El Cairo",
        description: "Desayuno. Traslado al aeropuerto de Hurghada para tomar vuelo interno de corta duración con destino El Cairo. Recepción, traslado al hotel seleccionado y tiempo libre para compras."
      },
      {
        day: 9,
        title: "El Cairo - Pirámides",
        description: "Desayuno. Excursión de medio día al complejo monumental de Guiza para admirar las tres famosas pirámides de Keops, Kefrén y Micerino, la Gran Esfinge y el Templo del Valle. Tarde libre en la capital."
      },
      {
        day: 10,
        title: "El Cairo - Día de Ocio",
        description: "Desayuno. Día libre. Recomendamos opcionalmente contratar la visita guiada de la ciudad para contemplar el Museo de las Civilizaciones, el Barrio Copto, la Mezquita de Alabastro y el bullicio de Jan el-Jalili."
      },
      {
        day: 11,
        title: "El Cairo - España",
        description: "Desayuno en el hotel. Traslado coordinado hacia el aeropuerto de El Cairo para tomar vuelo regular de regreso a su aeropuerto de origen en España. Fin de nuestros servicios."
      }
    ]
  },
  {
    id: "TR-103",
    title: "Ruta Turca Completa Confort",
    destination: "Turquía",
    duration: 8,
    category: "Cultura",
    wholesalePrice: 760,
    retailPrice: 895,
    commission: 15,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
    summary: "El recorrido idóneo para conocer Turquía en un circuito balanceado. Conecta los monumentos más icónicos de Estambul con el misterioso interior de Anatolia, incluyendo la región volcánica de Capadocia, las terrazas calcáreas de Pamukkale y Éfeso.",
    highlights: [
      "Estancia de 3 noches en Estambul en hotel céntrico de categoría 4★/5★",
      "Circuito terrestre de 4 noches por el interior de Anatolia en hoteles de categoría superior",
      "Visita completa a las chimeneas de hadas y valles subterráneos de Capadocia",
      "Entrada y visita guiada a las ruinas arqueológicas de Éfeso y Casa de la Virgen María",
      "Guía oficial de habla hispana exclusivo durante todo el recorrido por Anatolia"
    ],
    hotelCategory: "Hoteles Seleccionados 4★ / 5★",
    inclusions: [
      "Vuelos directos internacionales ida y vuelta",
      "Circuito terrestre según programa en autocar climatizado moderno",
      "Media pensión (desayuno y cenas) durante el recorrido de circuito",
      "Desayuno diario en Estambul",
      "Todas las visitas y entradas detalladas con guía oficial",
      "Seguro de asistencia médica básico"
    ],
    exclusions: [
      "Visado de entrada si es aplicable (según nacionalidad)",
      "Propinas generales para chófer y guía (aprox 25 USD)",
      "Excursión en globo aerostático opcional en Capadocia"
    ],
    itinerary: [
      {
        day: 1,
        title: "España - Estambul",
        description: "Salida en vuelo regular con destino Estambul. Llegada, asistencia en español por nuestro personal en el aeropuerto y traslado en vehículo climatizado privado al hotel. Alojamiento."
      },
      {
        day: 2,
        title: "Estambul - Paseo por el Bósforo",
        description: "Desayuno. Excursión opcional de medio día recorriendo el icónico Cuerno de Oro, Mezquita de Eyüp, Bazar de las Especias y un crucero privado en barco por el Estrecho del Bósforo contemplando palacios y fortalezas."
      },
      {
        day: 3,
        title: "Estambul - Día Libre",
        description: "Desayuno. Día libre para actividades personales. Recomendamos realizar la excursión opcional 'Joyas de Constantinopla' con visitas a Santa Sofía, la Mezquita Azul, el Hipódromo Romano y el inmenso Gran Bazar."
      },
      {
        day: 4,
        title: "Estambul - Ankara - Capadocia",
        description: "Desayuno. Salida por carretera con destino a Ankara, capital de la República de Turquía. Al llegar, visita del Mausoleo de Atatürk, fundador de la Turquía moderna. Continuación del viaje hacia Capadocia. Llegada, cena y alojamiento en hotel."
      },
      {
        day: 5,
        title: "Capadocia - Valles y Chimeneas de Hadas",
        description: "Opcional: Increíble paseo en globo sobrevolando los paisajes de Capadocia al amanecer. Desayuno en el hotel. Día completo de visitas: Museo al Aire Libre de Göreme (iglesias rupestres con frescos), valles de Avcilar, Pasabag y el pueblo de Uçhisar."
      },
      {
        day: 6,
        title: "Capadocia - Pamukkale (Castillo de Algodón)",
        description: "Desayuno. Salida temprana visitando en ruta un Caravanserai Selyúcida medieval (antiguo hospedaje de la Ruta de la Seda). Continuación hacia Pamukkale, famosa por sus cascadas calcáreas petrificadas de calcio blanco y las ruinas de Hierápolis. Cena y alojamiento."
      },
      {
        day: 7,
        title: "Pamukkale - Éfeso - Zona de Esmirna",
        description: "Desayuno. Salida hacia Éfeso, la ciudad grecorromana mejor conservada de Asia Menor. Visita de la Biblioteca de Celso, el Gran Teatro Romano y el Templo de Adriano. Visita posterior de la Casa de la Virgen María. Continuación al hotel, cena y alojamiento."
      },
      {
        day: 8,
        title: "Esmirna - Estambul - España",
        description: "Desayuno en el hotel. A la hora convenida, traslado al aeropuerto de Esmirna para tomar vuelo regular con destino Estambul, enlazando con su vuelo de regreso a España. Fin de nuestros servicios."
      }
    ]
  },
  {
    id: "TR-104",
    title: "Uzbekistán Esencial",
    destination: "Uzbekistán",
    duration: 8,
    category: "Cultura",
    wholesalePrice: 1310,
    retailPrice: 1540,
    commission: 15,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
    summary: "Un fascinante circuito por el corazón de la antigua Ruta de la Seda de Asia Central. Descubra los monumentos islámicos más espectaculares en Tashkent, Bujará, la legendaria Jiva y la joya del imperio de Tamerlán: Samarcanda.",
    highlights: [
      "Circuito completo visitando Tashkent, Jiva, Bujará y Samarcanda",
      "Vuelo doméstico interno Tashkent - Urgench incluido para optimizar ruta",
      "Viaje en tren rápido de alta velocidad Afrosiyob de Bujará a Samarcanda",
      "Espectaculares madrazas y mezquitas con azulejos esmaltados celestes y turquesas",
      "Guías oficiales locales en español dedicados en exclusiva para su grupo"
    ],
    hotelCategory: "Hoteles Boutique de Estilo Tradicional 4★",
    inclusions: [
      "Vuelos internacionales de línea regular",
      "Vuelo interno doméstico en Uzbekistán",
      "Billete de tren rápido Afrosiyob en clase económica/estándar",
      "Alojamiento de 6 noches en régimen de Media Pensión (desayunos y cenas incluidos)",
      "Traslados completos por carretera en autobús moderno con conductor",
      "Seguro multiasistencia de viaje estándar"
    ],
    exclusions: [
      "Bebidas en los almuerzos y cenas",
      "Propinas para guías y conductores locales",
      "Derechos de cámara de fotos o vídeo en los monumentos"
    ],
    itinerary: [
      {
        day: 1,
        title: "España - Tashkent",
        description: "Salida en vuelo regular con destino a Tashkent, capital de Uzbekistán. Llegada por la noche, recepción por nuestro guía de habla hispana y traslado directo al hotel seleccionado. Alojamiento."
      },
      {
        day: 2,
        title: "Tashkent - Urgench - Jiva",
        description: "Desayuno. Visita monumental de la zona histórica de Tashkent: Complejo de Jast Imam, Madraza de Barak Khan y el bullicioso Mercado de Chorsu. Por la tarde, traslado al aeropuerto para tomar vuelo de corta duración a Urgench, seguido de traslado por carretera a la amurallada Jiva."
      },
      {
        day: 3,
        title: "Jiva - La Ciudad Museo de Barro",
        description: "Desayuno. Día entero dedicado a descubrir la ciudad intramuros de Jiva (Ichan Kala): el icónico Minarete de Kalta Minor, la Fortaleza de Kunya Ark, la Mezquita Juma con sus columnas talladas de madera, y el majestuoso Palacio de Tosh Hovli. Cena en restaurante local."
      },
      {
        day: 4,
        title: "Jiva - Bujará (Cruce del Desierto de Kizil Kum)",
        description: "Desayuno. Jornada de traslado por carretera cruzando las arenas del Desierto de Kizil Kum (el Desierto Rojo) de Jiva a Bujará (aprox. 7-8 horas), discurriendo paralelo al histórico río Amu Darya. Almuerzo tipo pícnic o restaurante en ruta. Llegada a Bujará, cena y alojamiento."
      },
      {
        day: 5,
        title: "Bujará - El Alma Comercial del Oasis",
        description: "Desayuno. Visita completa del casco antiguo de Bujará, declarado Patrimonio de la Humanidad por la UNESCO: Mausoleo de Samánidas, la Plaza Lyabi-Khauz, las cúpulas comerciales de tejedores de alfombras, la icónica Mezquita de Kalyan y la imponente Fortaleza Ark. Cena tradicional."
      },
      {
        day: 6,
        title: "Bujará - Tren Rápido a Samarcanda",
        description: "Desayuno. Mañana libre para compras de artesanías o paseos por las callejuelas medievales. A la hora indicada, traslado a la estación para abordar el tren rápido Afrosiyob de alta velocidad con destino Samarcanda. Llegada y check-in en el hotel. Cena."
      },
      {
        day: 7,
        title: "Samarcanda - La Joya Monumental de Tamerlán",
        description: "Desayuno. Día entero dedicado a la mítica Samarcanda. Visita de la espectacular Plaza del Registán, rodeada por tres impresionantes madrazas con azulejos dorados y turquesas. Visita a la Mezquita de Bibi Khanum y el gran Mausoleo Gur-e-Amir (tumba de Tamerlán). Cena especial de despedida."
      },
      {
        day: 8,
        title: "Samarcanda - Tashkent - España",
        description: "Desayuno temprano. Traslado de retorno en tren rápido o carretera hacia Tashkent para enlazar a mediodía con el vuelo regular internacional de regreso a España. Llegada y fin de nuestra gran aventura por Asia Central."
      }
    ]
  }
];
