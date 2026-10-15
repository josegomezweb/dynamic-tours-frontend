import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini if available
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // In-memory simulated B2B database of bookings
  let bookings = [
    {
      id: "BK-9482",
      clientName: "Familia Gómez Rivas",
      agencyName: "Viajes El Corte Inglés - Goya",
      agentName: "Laura Martínez",
      destination: "Japón Imperial & Maldivas",
      startDate: "2026-10-15",
      endDate: "2026-10-27",
      paxCount: 4,
      totalPriceNet: 14450,
      totalPriceRetail: 16990,
      commissionPercent: 15,
      status: "Confirmado",
      createdAt: "2026-09-02"
    },
    {
      id: "BK-7381",
      clientName: "Pareja Mendoza Luna",
      agencyName: "Halcón Viajes - Valencia Centro",
      agentName: "Carlos Ruiz",
      destination: "Safari Kenia & Zanzíbar Lujo",
      startDate: "2026-11-05",
      endDate: "2026-11-17",
      paxCount: 2,
      totalPriceNet: 11200,
      totalPriceRetail: 13170,
      commissionPercent: 15,
      status: "Pendiente Pago",
      createdAt: "2026-09-04"
    },
    {
      id: "BK-4291",
      clientName: "Grupo Amigos Senderismo",
      agencyName: "Nautalia Viajes - Sevilla",
      agentName: "Sofía Navarro",
      destination: "Auroras Boreales en Islandia",
      startDate: "2026-12-10",
      endDate: "2026-12-16",
      paxCount: 6,
      totalPriceNet: 14500,
      totalPriceRetail: 16670,
      commissionPercent: 13,
      status: "En Revisión",
      createdAt: "2026-09-05"
    }
  ];

  // API Routes
  app.get("/api/bookings", (req, res) => {
    res.json(bookings);
  });

  app.post("/api/bookings", (req, res) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      ...req.body,
      createdAt: new Date().toISOString().split('T')[0]
    };
    bookings.unshift(newBooking);
    res.status(201).json(newBooking);
  });

  app.put("/api/bookings/:id", (req, res) => {
    const { id } = req.params;
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...req.body };
      res.json(bookings[index]);
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  });

  app.post("/api/gemini/generate-itinerary", async (req, res) => {
    const { destination, daysCount, budget, preferences, commission } = req.body;

    if (!ai) {
      console.log("No GEMINI_API_KEY environment variable set, returning fallback itinerary.");
      return res.json(getFallbackItinerary(destination, daysCount, budget, preferences, commission));
    }

    try {
      const prompt = `Actúa como un experto Diseñador de Itinerarios Premium de Viajes Mayoristas para Dynamic Tours.
Estamos cotizando un viaje a medida para una agencia minorista.
Destino: ${destination}
Duración: ${daysCount} días
Presupuesto aproximado total del cliente por persona: ${budget} EUR
Comisión para la agencia minorista: ${commission}%
Preferencias/Estilo del cliente (ej. Luna de miel, gastronómico, cultura, aventura): ${preferences}

Genera un itinerario de viaje premium, con un nivel de detalle sobresaliente, hoteles seleccionados (de lujo o boutique de alta gama), itinerarios diarios detallados para mañana, tarde y noche, y añade notas profesionales con estrategias de venta y upsell para que el agente minorista pueda convencer al cliente de manera eficaz.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: "Eres el consultor de IA de Dynamic Tours, una mayorista de viajes de lujo premium orientada al mercado B2B en España y América Latina. Genera contenidos que destaquen la eficiencia, exclusividad y el beneficio para la agencia minorista.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              summary: { type: Type.STRING },
              estimatedPriceWholesale: { type: Type.NUMBER, description: "Wholesale net price per passenger in EUR" },
              estimatedPriceRetail: { type: Type.NUMBER, description: "Suggested retail price per passenger in EUR" },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    dayNumber: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    location: { type: Type.STRING },
                    morning: { type: Type.STRING },
                    afternoon: { type: Type.STRING },
                    evening: { type: Type.STRING },
                    accommodation: { type: Type.STRING },
                    agentUpsellTips: { type: Type.STRING, description: "Tips for the retail agent on how to upsell or highlight features to make more commission" }
                  },
                  required: ["dayNumber", "title", "location", "morning", "afternoon", "evening", "accommodation", "agentUpsellTips"]
                }
              },
              agentExecutiveSummary: { type: Type.STRING, description: "A high-level B2B sales summary highlighting target audience and unique selling points (USP) for this customized trip" }
            },
            required: ["title", "subtitle", "summary", "estimatedPriceWholesale", "estimatedPriceRetail", "days", "agentExecutiveSummary"]
          }
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        res.json(parsed);
      } else {
        throw new Error("No text returned from Gemini API");
      }
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.json(getFallbackItinerary(destination, daysCount, budget, preferences, commission));
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

function getFallbackItinerary(dest: string, days: number, budget: number, pref: string, comm: number) {
  const d = days || 5;
  const b = budget || 3500;
  const c = comm || 15;
  const targetWholesale = Math.round(b * (1 - c / 100));

  const destTitle = dest ? dest.toUpperCase() : "ESCAPADA EXCLUSIVA";

  const sampleDays = [
    {
      dayNumber: 1,
      title: "Arribada Imperial y Experiencia de Bienvenida Privada",
      location: dest || "Destino de Ensueño",
      morning: "Asistencia VIP en aeropuerto a pie de pista con traslado en limusina ejecutiva privada hasta el hotel de gran lujo.",
      afternoon: "Check-in privado prioritario. Almuerzo bistró exclusivo y un breve tour a pie guiado por un historiador local privado.",
      evening: "Cena gastronómica de bienvenida en un restaurante exclusivo galardonado por la guía Michelin, con mesa preferencial reservada.",
      accommodation: "The Royal Sovereign Resort & Spa (5* Gran Lujo)",
      agentUpsellTips: "Ofrezca up-grade de habitación a Suite Presidencial con terraza panorámica y jacuzzi privado por un suplemento neto de 145€/noche."
    },
    {
      dayNumber: 2,
      title: "Exploración Exclusiva Sin Colas y Acceso Anticipado",
      location: dest || "Destino de Ensueño",
      morning: "Visita VIP privada antes de la apertura general a los templos o palacios principales de la ciudad.",
      afternoon: "Almuerzo tradicional maridado con vinos autóctonos, seguido de un taller privado con artesanos locales de renombre.",
      evening: "Crucero privado al atardecer con servicio de catering gourmet a bordo y sumiller de cava/champagne privado.",
      accommodation: "The Royal Sovereign Resort & Spa (5* Gran Lujo)",
      agentUpsellTips: "Consiga que contraten la excursión aérea en helicóptero privado de 30 minutos sobre la costa/ciudad con un 12% de comisión neta adicional."
    },
    {
      dayNumber: 3,
      title: "Senderos Secretos, Bienestar y Conexión Natural",
      location: dest || "Destino de Ensueño",
      morning: "Excursión privada en vehículo 4x4 todoterreno de gama alta a parajes naturales y miradores protegidos fuera de las rutas comerciales.",
      afternoon: "Picnic gourmet de autor diseñado por un chef de renombre en un prado alpino o cala privada paradisíaca.",
      evening: "Retorno al hotel. Sesión completa de circuito termal wellness privada y masaje corporal relajante de 90 minutos.",
      accommodation: "The Royal Sovereign Resort & Spa (5* Gran Lujo)",
      agentUpsellTips: "Recomiende añadir el paquete 'Cena Romántica de Velas Bajo las Estrellas' en los jardines privados del hotel."
    }
  ];

  const generatedDays = [];
  for (let i = 1; i <= d; i++) {
    const sample = sampleDays[(i - 1) % sampleDays.length];
    generatedDays.push({
      dayNumber: i,
      title: `Día ${i}: ${sample.title}`,
      location: dest || "Destino de Ensueño",
      morning: sample.morning,
      afternoon: sample.afternoon,
      evening: sample.evening,
      accommodation: sample.accommodation,
      agentUpsellTips: sample.agentUpsellTips
    });
  }

  return {
    title: `Esencias de ${dest || "Lujo"}: Itinerario Sublime`,
    subtitle: `Programa de Viaje de ${d} Días Curado en Exclusiva por Dynamic Tours`,
    summary: `Una magnífica expedición diseñada bajo los más rigurosos estándares de exclusividad, confort y eficiencia para sus clientes más exigentes interesados en ${pref || "Experiencia Premium"}. Todos los traslados y actividades se gestionan en régimen de servicio estrictamente privado.`,
    estimatedPriceWholesale: targetWholesale,
    estimatedPriceRetail: b,
    days: generatedDays,
    agentExecutiveSummary: `Excelente rentabilidad garantizada. Este viaje ofrece un margen directo del ${c}% (${b - targetWholesale}€ por pasajero). Las experiencias VIP están diseñadas de forma exclusiva por nuestros receptivos locales de confianza en ${dest || "destino"}, lo que asegura una fidelidad absoluta de su cliente final con su agencia minorista.`
  };
}

startServer();
