export interface Tour {
  id: string;
  title: string;
  destination: string;
  duration: number; // in days
  category: "Lujo" | "Aventura" | "Cultura" | "Bienestar" | "Playa";
  wholesalePrice: number; // net B2B price in EUR
  retailPrice: number; // suggested client price in EUR
  commission: number; // percentage
  image: string;
  summary: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  hotelCategory: string;
}

export interface Booking {
  id: string;
  clientName: string;
  agencyName: string;
  agentName: string;
  destination: string;
  startDate: string;
  endDate: string;
  paxCount: number;
  totalPriceNet: number;
  totalPriceRetail: number;
  commissionPercent: number;
  status: "Confirmado" | "Pendiente Pago" | "En Revisión" | "Cancelado";
  createdAt: string;
}

export interface AIItinerary {
  title: string;
  subtitle: string;
  summary: string;
  estimatedPriceWholesale: number;
  estimatedPriceRetail: number;
  days: {
    dayNumber: number;
    title: string;
    location: string;
    morning: string;
    afternoon: string;
    evening: string;
    accommodation: string;
    agentUpsellTips: string;
  }[];
  agentExecutiveSummary: string;
}
