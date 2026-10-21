import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ToursCatalog from "./components/ToursCatalog";
import BookingsDashboard from "./components/BookingsDashboard";
import AIAssistant from "./components/AIAssistant";
import Home from "./components/Home";
import PublicWeb from "./components/PublicWeb";
import Logo from "./components/Logo";
import AgencyPortal from "./components/AgencyPortal";
import LeyendasDetail from "./components/LeyendasDetail";
import MaravillasDetail from "./components/MaravillasDetail";
import ViajesMedidaGrupos from "./components/ViajesMedidaGrupos";
import EgiptoSeniorDetail from "./components/EgiptoSeniorDetail";
import DestinosPage from "./components/DestinosPage";
import { PassportReader } from "./components/PassportReader";
import TestBanner from "./components/TestBanner";
import { Booking } from "./types";
import { 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  HelpCircle, 
  CheckCircle, 
  User, 
  ArrowRight,
  TrendingUp,
  Globe,
  Building2,
  Users,
  ExternalLink
} from "lucide-react";

export default function App() {
  const [viewMode, setViewMode] = useState<"public" | "b2b" | "leyendas-detail" | "maravillas-detail" | "viajes-a-medida-grupos" | "egipto-senior-detail" | "destinos">("public");
  const [scrollToGruposForm, setScrollToGruposForm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Authorized Travel Agent credentials (simulated B2B profile)
  const [agencyName, setAgencyName] = useState<string>(() => {
    return localStorage.getItem("dt_agency_name") || "Agencia Colaboradora";
  });
  const [agentName, setAgentName] = useState<string>(() => {
    return localStorage.getItem("dt_agent_name") || "Agente Profesional";
  });

  const handleEnterB2B = (agent: string, agency: string) => {
    const finalAgent = agent.trim() || "Agente Profesional";
    const finalAgency = agency.trim() || "Agencia Colaboradora";
    setAgentName(finalAgent);
    setAgencyName(finalAgency);
    localStorage.setItem("dt_agent_name", finalAgent);
    localStorage.setItem("dt_agency_name", finalAgency);
    setViewMode("b2b");
  };

  const DEFAULT_BOOKINGS: Booking[] = [
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
      totalPriceRetail: 17050,
      commissionPercent: 15,
      status: "Confirmado",
      createdAt: "2026-09-05"
    }
  ];

  // Fetch initial bookings
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings");
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
          return;
        }
      } catch (err) {
        console.warn("Using offline bookings fallback:", err);
      }
      const local = localStorage.getItem("dt_bookings");
      if (local) {
        try {
          setBookings(JSON.parse(local));
          return;
        } catch {}
      }
      setBookings(DEFAULT_BOOKINGS);
      setIsLoading(false);
    }
    fetchBookings();
  }, []);

  // Sync to localStorage when state changes to preserve state across reloads
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem("dt_bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  // Handle adding a new booking
  const handleAddBooking = async (newBookingData: Omit<Booking, "id" | "createdAt">) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookingData)
      });
      if (res.ok) {
        const createdBooking = await res.json();
        setBookings((prev) => [createdBooking, ...prev]);
      } else {
        throw new Error("Server rejected booking creation");
      }
    } catch (err) {
      console.error(err);
      // Fallback local adding
      const offlineBooking: Booking = {
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        ...newBookingData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setBookings((prev) => [offlineBooking, ...prev]);
    }
  };

  // Handle updating status
  const handleUpdateBookingStatus = async (id: string, status: Booking["status"]) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updated = await res.json();
        setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
      } else {
        throw new Error("Server rejected booking status update");
      }
    } catch (err) {
      console.error(err);
      // Fallback local update
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    }
  };

  // Handle deleting a booking record
  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Handle direct url hash and hashchange navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#viajes-a-medida-grupos" || hash === "#grupos") {
        setViewMode("viajes-a-medida-grupos");
        setScrollToGruposForm(false);
      } else if (hash === "#formulario-grupos") {
        setViewMode("viajes-a-medida-grupos");
        setScrollToGruposForm(true);
      } else if (hash === "#leyendas-detail") {
        setViewMode("leyendas-detail");
      } else if (hash === "#maravillas-detail") {
        setViewMode("maravillas-detail");
      } else if (hash.startsWith("#egipto-senior") || hash.startsWith("#destino-egipto-selecto-senior")) {
        setViewMode("egipto-senior-detail");
      } else if (hash === "#destinos" || hash.startsWith("#destinos")) {
        setViewMode("destinos");
      } else if (hash === "#b2b") {
        setViewMode("b2b");
      } else if (hash === "" || hash === "#" || hash === "#inicio" || hash === "#ofertas" || hash === "#nosotros") {
        setViewMode((prev) => (prev === "b2b" ? "b2b" : "public"));
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Helper to render active view
  const renderViewContent = () => {
    if (viewMode === "viajes-a-medida-grupos") {
      return (
        <ViajesMedidaGrupos 
          onBackToHome={() => {
            window.location.hash = "";
            setViewMode("public");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          onEnterB2B={handleEnterB2B}
          initialScrollToForm={scrollToGruposForm}
        />
      );
    }

    if (viewMode === "leyendas-detail") {
      return (
        <LeyendasDetail 
          onBack={() => {
            window.location.hash = "";
            setViewMode("public");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          onEnterB2B={() => {
            setViewMode("b2b");
            setActiveTab("bookings");
          }} 
          agencyName={agencyName}
          agentName={agentName}
          onAddBooking={handleAddBooking}
        />
      );
    }

    if (viewMode === "egipto-senior-detail") {
      return (
        <EgiptoSeniorDetail 
          onBack={() => {
            window.location.hash = "";
            setViewMode("public");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          onEnterB2B={() => {
            setViewMode("b2b");
            setActiveTab("bookings");
          }} 
          agencyName={agencyName}
          agentName={agentName}
          onAddBooking={handleAddBooking}
        />
      );
    }

    if (viewMode === "maravillas-detail") {
      return (
        <MaravillasDetail 
          onBack={() => {
            window.location.hash = "";
            setViewMode("public");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          onEnterB2B={() => {
            setViewMode("b2b");
            setActiveTab("home");
          }} 
        />
      );
    }

    if (viewMode === "destinos") {
      return (
        <DestinosPage 
          onBackToHome={() => {
            window.location.hash = "";
            setViewMode("public");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          onEnterB2B={handleEnterB2B}
          onSelectSenior={() => {
            window.location.hash = "egipto-senior-detail";
            setViewMode("egipto-senior-detail");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSelectLeyendas={() => {
            window.location.hash = "leyendas-detail";
            setViewMode("leyendas-detail");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSelectGrupos={() => {
            window.location.hash = "viajes-a-medida-grupos";
            setViewMode("viajes-a-medida-grupos");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      );
    }

    if (viewMode === "public") {
      return (
        <PublicWeb 
          onEnterB2B={handleEnterB2B} 
          onSelectLeyendas={() => {
            window.location.hash = "leyendas-detail";
            setViewMode("leyendas-detail");
          }} 
          onSelectSenior={() => {
            window.location.hash = "egipto-senior-detail";
            setViewMode("egipto-senior-detail");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSelectMaravillas={() => {
            window.location.hash = "maravillas-detail";
            setViewMode("maravillas-detail");
          }}
          onSelectGrupos={() => {
            window.location.hash = "viajes-a-medida-grupos";
            setScrollToGruposForm(false);
            setViewMode("viajes-a-medida-grupos");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSelectGruposForm={() => {
            window.location.hash = "formulario-grupos";
            setScrollToGruposForm(true);
            setViewMode("viajes-a-medida-grupos");
          }}
          onSelectDestinos={() => {
            window.location.hash = "destinos";
            setViewMode("destinos");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      );
    }

    // Render Private B2B Agency Portal
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        {/* Navbar header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        agencyName={agencyName}
        agentName={agentName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Quick Back to Public Web controls for B2B Portal */}
        <div className="mb-6 flex justify-between items-center bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Estás en la consola de agencias minoristas autorizadas</span>
          </div>
          <button
            onClick={() => setViewMode("public")}
            className="text-xs font-bold text-[#0A0F1D] hover:text-[#1F82D2] flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 py-1.5 px-3.5 rounded-lg border border-slate-200 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Volver a la Web Principal
          </button>
        </div>

        {/* Welcome Section / Subheader only on primary tab */}
        {activeTab === "catalog" && (
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0A0F1D] to-[#1F82D2] flex items-center justify-center text-white shadow-md">
                <Building2 className="w-6 h-6 text-[#1F82D2]" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#0A0F1D] font-serif">
                  Bienvenido al Portal de Gestión Mayorista
                </h2>
                <p className="text-xs text-slate-500">
                  Agencia asociada activa: <strong className="text-slate-700">{agencyName}</strong> (ID: DT-94821)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-4 text-xs font-bold">
              <div className="bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#1F82D2]" />
                <span>Receptivos en 45+ Países</span>
              </div>
              <div className="bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Garantía de Comisión B2B</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab content rendering */}
        {isLoading ? (
          <div className="py-20 text-center space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A0F1D] mx-auto"></div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Cargando consola B2B de Dynamic Tours...</p>
          </div>
        ) : (
          <>
            {activeTab === "home" && (
              <Home 
                setActiveTab={setActiveTab}
                bookings={bookings}
                agencyName={agencyName}
                agentName={agentName}
              />
            )}

            {activeTab === "catalog" && (
              <ToursCatalog 
                onAddBooking={handleAddBooking} 
                agencyName={agencyName}
                agentName={agentName}
              />
            )}

            {activeTab === "ai-builder" && (
              <AIAssistant 
                onAddBooking={handleAddBooking} 
                agencyName={agencyName}
                agentName={agentName}
              />
            )}

            {activeTab === "bookings" && (
              <BookingsDashboard 
                bookings={bookings}
                onUpdateBookingStatus={handleUpdateBookingStatus}
                onDeleteBooking={handleDeleteBooking}
                agencyName={agencyName}
              />
            )}

            {activeTab === "agency-portal" && (
              <AgencyPortal 
                agencyName={agencyName}
                agentName={agentName}
              />
            )}

            {activeTab === "passports" && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <PassportReader />
              </div>
            )}
          </>
        )}

      </main>

      {/* Footer Area with elegant aesthetic details */}
      <footer className="bg-[#0A0F1D] text-white border-t border-[#1E293B] mt-12 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg flex items-center justify-center shadow-sm shrink-0">
                <Logo className="h-8 shrink-0" classNameImg="mix-blend-multiply" />
              </div>
              <div className="flex flex-col leading-none tracking-tight">
                <span className="text-[17px] font-extrabold text-white tracking-wider">DYNAMIC</span>
                <span className="text-[14px] font-bold text-[#1F82D2] tracking-widest mt-0.5">TOURS</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs">
              Mayorista de viajes con Licencia CICMA 1948. Especialistas en diseño exclusivo de experiencias a medida y de alta gama para agencias de viajes minoristas.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1F82D2] uppercase tracking-widest">Soporte Mayorista 24/7</h4>
            <ul className="text-[11px] text-slate-300 space-y-1.5">
              <li>Línea Directa Agentes: <strong>+34 910 888 222</strong></li>
              <li>Soporte de Emergencia en Destino: <strong>+34 600 999 999</strong></li>
              <li>Email de Booking: <strong>reservas@dynamic-tours.com</strong></li>
              <li>Atención Grupos: <strong>grupos@dynamic-tours.com</strong></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1F82D2] uppercase tracking-widest">Seguridad & Garantía</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Todos los depósitos de reserva y pagos recibidos en este portal B2B están protegidos mediante garantías financieras reguladas según directiva de viajes combinados de la Unión Europea y avalados por el Fondo de Garantías Mayoristas.
            </p>
            <div className="flex gap-2 items-center text-emerald-500 font-bold text-[10px] uppercase tracking-wider bg-white/5 py-1.5 px-3 rounded border border-white/5 w-max">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Conexión Encriptada SSL Segura
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1E293B] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-4">
          <p>© 2026 Dynamic Tours S.A. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Condiciones Generales B2B</a>
            <a href="#" className="hover:underline">Política de Privacidad Mayorista</a>
            <a href="#" className="hover:underline">Aviso de Cookies</a>
          </div>
        </div>
      </footer>

    </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <TestBanner />
      <div className="flex-1 flex flex-col">
        {renderViewContent()}
      </div>
    </div>
  );
}
