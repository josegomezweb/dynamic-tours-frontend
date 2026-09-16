export interface Trip {
  id: string
  title: string
  destination: string
  country: string
  continent: string
  duration: string
  days: number
  nights: number
  image: string
  badges: Array<{ text: string; color: 'green' | 'blue' | 'amber' | 'red' | 'purple' }>
  itinerarySummary: string[]
  pvpPrice: number
  netPrice: number
  commissionPercent: number
  featured?: boolean
  departures: string[]
  flights: string
  mealPlan: string
}

export interface Reservation {
  localizador: string
  leadPassenger: string
  destination: string
  departureDate: string
  returnDate: string
  passengersCount: number
  status: 'Confirmada' | 'Pendiente Emisión' | 'En Viaje' | 'Presupuesto' | 'Cancelada'
  pvpTotal: number
  netTotal: number
  commissionTotal: number
  paymentStatus: 'Pagado 100%' | 'Anticipo 20%' | 'Pendiente'
}

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'egipto-joyas-nilo',
    title: 'Joyas del Nilo & El Cairo Mítico',
    destination: 'El Cairo + Crucero Nilo + Abu Simbel',
    country: 'Egipto',
    continent: 'Oriente Medio',
    duration: '8 Días / 7 Noches',
    days: 8,
    nights: 7,
    image: 'https://images.unsplash.com/photo-1503177112488-72045c432321?auto=format&fit=crop&w=800&q=80',
    badges: [
      { text: 'Salida Garantizada', color: 'green' },
      { text: 'Charter Provincias', color: 'amber' },
      { text: 'Vuelo Directo', color: 'blue' }
    ],
    itinerarySummary: ['El Cairo (3N)', 'Crucero Nilo 5* Sup (3N)', 'Luxor (1N)'],
    pvpPrice: 1250,
    netPrice: 1025,
    commissionPercent: 18,
    featured: true,
    departures: ['Lunes', 'Viernes', 'Salidas especiales Puente'],
    flights: 'Egyptair / Vuelos Charter directos desde MAD, BCN, VLC, BIO',
    mealPlan: 'Pensión Completa en crucero + AD en El Cairo'
  },
  {
    id: 'turquia-suenos-capadocia',
    title: 'Sueños de Estambul y la Mágica Capadocia',
    destination: 'Estambul + Ankara + Capadocia',
    country: 'Turquía',
    continent: 'Europa',
    duration: '8 Días / 7 Noches',
    days: 8,
    nights: 7,
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
    badges: [
      { text: 'Rebajas 2026 (-100€)', color: 'red' },
      { text: 'Cupos Confirmados', color: 'blue' },
      { text: 'Globo Opcional', color: 'purple' }
    ],
    itinerarySummary: ['Estambul histórico (4N)', 'Paisajes de Capadocia (3N)'],
    pvpPrice: 1069,
    netPrice: 876,
    commissionPercent: 18,
    featured: true,
    departures: ['Diarias con Turkish Airlines'],
    flights: 'Turkish Airlines con vuelo doméstico incluido',
    mealPlan: 'Media Pensión en circuito + AD en Estambul'
  },
  {
    id: 'jordania-reino-nabateo',
    title: 'Reino Hachemita & Tesoros de Petra',
    destination: 'Ammán + Jerash + Petra + Wadi Rum + Mar Muerto',
    country: 'Jordania',
    continent: 'Oriente Medio',
    duration: '8 Días / 7 Noches',
    days: 8,
    nights: 7,
    image: 'https://images.unsplash.com/photo-1579606032822-683a37e50523?auto=format&fit=crop&w=800&q=80',
    badges: [
      { text: 'Top Ventas Agencias', color: 'green' },
      { text: 'Noche en Desierto 4x4', color: 'amber' }
    ],
    itinerarySummary: ['Ammán (2N)', 'Petra (2N)', 'Campamento Wadi Rum (1N)', 'Mar Muerto (2N)'],
    pvpPrice: 1480,
    netPrice: 1213,
    commissionPercent: 18,
    departures: ['Miércoles y Sábados'],
    flights: 'Royal Jordanian regular directo',
    mealPlan: 'Media Pensión en hoteles 4* y 5*'
  },
  {
    id: 'kenia-safari-gran-migracion',
    title: 'Kenia: Memorias de África & Masai Mara',
    destination: 'Nairobi + Samburu + Lago Naivasha + Masai Mara',
    country: 'Kenia',
    continent: 'África',
    duration: '9 Días / 7 Noches',
    days: 9,
    nights: 7,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    badges: [
      { text: '4x4 Ventanilla Garantizada', color: 'blue' },
      { text: 'Salida Especial Grupos', color: 'purple' }
    ],
    itinerarySummary: ['Nairobi (1N)', 'Samburu (2N)', 'Naivasha (1N)', 'Masai Mara (3N)'],
    pvpPrice: 2890,
    netPrice: 2369,
    commissionPercent: 18,
    departures: ['Salidas quincenales todo el año'],
    flights: 'Qatar Airways / Ethiopian Airlines',
    mealPlan: 'Pensión Completa durante todo el safari'
  },
  {
    id: 'japon-clasico-contrastes',
    title: 'Japón Eterno: Tradición y Vanguardia',
    destination: 'Tokio + Takayama + Kioto + Osaka',
    country: 'Japón',
    continent: 'Asia',
    duration: '11 Días / 9 Noches',
    days: 11,
    nights: 9,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    badges: [
      { text: 'Shinkansen Tren Bala', color: 'blue' },
      { text: 'Guía Acompañante Español', color: 'green' }
    ],
    itinerarySummary: ['Tokio (3N)', 'Takayama & Shirakawago (2N)', 'Kioto (3N)', 'Osaka (1N)'],
    pvpPrice: 3450,
    netPrice: 2829,
    commissionPercent: 18,
    departures: ['Salidas garantizadas de abril a noviembre'],
    flights: 'Emirates / KLM vía Ámsterdam',
    mealPlan: 'Alojamiento y Desayuno + 5 almuerzos típicos'
  },
  {
    id: 'costa-rica-pura-vida',
    title: 'Costa Rica: Naturaleza & Pura Vida',
    destination: 'San José + Tortuguero + Arenal + Manuel Antonio',
    country: 'Costa Rica',
    continent: 'América',
    duration: '10 Días / 8 Noches',
    days: 10,
    nights: 8,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    badges: [
      { text: 'Eco-Lodge Seleccionados', color: 'green' },
      { text: 'Ideal Lunas de Miel', color: 'amber' }
    ],
    itinerarySummary: ['San José (1N)', 'Tortuguero (2N)', 'Volcán Arenal (2N)', 'Manuel Antonio (3N)'],
    pvpPrice: 2240,
    netPrice: 1836,
    commissionPercent: 18,
    departures: ['Martes y Domingos'],
    flights: 'Iberia directo Madrid - San José',
    mealPlan: 'Media Pensión + Actividades guiadas'
  }
]

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    localizador: 'DT-2026-9812',
    leadPassenger: 'GARCÍA LÓPEZ, CARLOS',
    destination: 'Joyas del Nilo & El Cairo Mítico',
    departureDate: '2026-10-12',
    returnDate: '2026-10-19',
    passengersCount: 2,
    status: 'Confirmada',
    pvpTotal: 2500,
    netTotal: 2050,
    commissionTotal: 450,
    paymentStatus: 'Pagado 100%'
  },
  {
    localizador: 'DT-2026-9844',
    leadPassenger: 'MARTÍNEZ RUIZ, ANA MARÍA',
    destination: 'Sueños de Estambul y Capadocia',
    departureDate: '2026-10-28',
    returnDate: '2026-11-04',
    passengersCount: 4,
    status: 'Pendiente Emisión',
    pvpTotal: 4276,
    netTotal: 3506,
    commissionTotal: 770,
    paymentStatus: 'Anticipo 20%'
  },
  {
    localizador: 'DT-2026-9901',
    leadPassenger: 'FERNÁNDEZ BLANCO, JAVIER',
    destination: 'Japón Eterno: Tradición y Vanguardia',
    departureDate: '2026-11-15',
    returnDate: '2026-11-26',
    passengersCount: 2,
    status: 'Presupuesto',
    pvpTotal: 6900,
    netTotal: 5658,
    commissionTotal: 1242,
    paymentStatus: 'Pendiente'
  },
  {
    localizador: 'DT-2026-9630',
    leadPassenger: 'RODRÍGUEZ SÁNCHEZ, LAURA',
    destination: 'Kenia: Memorias de África & Masai Mara',
    departureDate: '2026-09-18',
    returnDate: '2026-09-27',
    passengersCount: 2,
    status: 'En Viaje',
    pvpTotal: 5780,
    netTotal: 4739,
    commissionTotal: 1041,
    paymentStatus: 'Pagado 100%'
  }
]

export const CONTINENTS_MENU = [
  {
    name: 'Oriente Medio',
    topDestinations: ['Egipto', 'Jordania', 'Turquía', 'Dubái & Emiratos', 'Israel', 'Omán'],
    highlightTrip: {
      title: 'Egipto Selecto Senior (+55)',
      description: 'Salidas especiales con todo incluido, visado, propinas y excursión a Abu Simbel.',
      price: '950€',
      tag: 'Cupos Especiales 2026',
      image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    name: 'África',
    topDestinations: ['Kenia', 'Tanzania & Zanzíbar', 'Marruecos', 'Túnez', 'Sudáfrica', 'Madagascar'],
    highlightTrip: {
      title: 'Safaris Masai Mara & Serengeti',
      description: 'Vehículos 4x4 con ventanilla garantizada y lodges de categoría superior.',
      price: '2.490€',
      tag: 'Salida Garantizada',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    name: 'Asia & Índico',
    topDestinations: ['Japón', 'Tailandia', 'India & Nepal', 'Vietnam & Camboya', 'Uzbekistán', 'Maldivas'],
    highlightTrip: {
      title: 'Ruta de la Seda en Uzbekistán',
      description: 'Samarcanda, Bujará y Jiva con hoteles boutique y trenes de alta velocidad.',
      price: '1.890€',
      tag: 'Exclusivo B2B',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    name: 'Europa',
    topDestinations: ['Grecia & Islas', 'Polonia', 'República Checa & Hungría', 'Escocia', 'Rumanía', 'Islandia'],
    highlightTrip: {
      title: 'Ciudades Imperiales Centroeuropa',
      description: 'Viena, Praga y Budapest con visitas a palacios y traslados privados.',
      price: '890€',
      tag: 'Vuelo Incluido',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    name: 'América',
    topDestinations: ['Costa Rica', 'México & Riviera', 'Argentina & Patagonia', 'Canadá', 'Perú', 'Colombia'],
    highlightTrip: {
      title: 'Argentina de Norte a Sur',
      description: 'Buenos Aires, Cataratas de Iguazú, Bariloche y Glaciar Perito Moreno.',
      price: '2.780€',
      tag: 'Programación 2026',
      image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=400&q=80'
    }
  }
]
