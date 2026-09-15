import { Compass, ShieldCheck, ChevronRight, Search, Calendar, MapPin, Building2 } from 'lucide-react'

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Bar B2B */}
      <header className="bg-dynamic-navy text-white text-xs py-2 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-dynamic-sky">
              <Building2 className="w-3.5 h-3.5 text-dynamic-light" />
              Plataforma Mayorista Exclusiva para Agencias de Viajes
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">Soporte Operativo B2B: +34 91 000 00 00</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-300">Horario de reservas: 09:00 - 19:30</span>
            <button className="bg-dynamic-blue hover:bg-dynamic-light px-2.5 py-1 rounded text-white font-semibold transition">
              Acceso Intranet Minorista
            </button>
          </div>
        </div>
      </header>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-dynamic-blue flex items-center justify-center text-white font-black text-xl tracking-wider shadow">
                DT
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-dynamic-navy">DYNAMIC</span>
                <span className="text-xl font-light tracking-widest text-dynamic-blue ml-1">TOURS</span>
                <span className="block text-[10px] tracking-widest uppercase text-slate-400 font-semibold -mt-1">Touroperador Mayorista</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
              <button className="flex items-center gap-1 text-dynamic-blue hover:text-dynamic-light py-1 border-b-2 border-dynamic-blue">
                Grandes Viajes
              </button>
              <button className="hover:text-dynamic-blue transition py-1">Egipto & Oriente</button>
              <button className="hover:text-dynamic-blue transition py-1">Asia & Índico</button>
              <button className="hover:text-dynamic-blue transition py-1">África & Safaris</button>
              <button className="hover:text-dynamic-blue transition py-1">América</button>
              <button className="hover:text-dynamic-blue transition py-1">Programaciones 2026</button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Buscar destino, circuito o código..." 
                className="pl-9 pr-3 py-1.5 text-xs rounded-full border border-slate-300 focus:outline-none focus:border-dynamic-blue w-64 bg-slate-50"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <button className="border border-dynamic-blue text-dynamic-blue hover:bg-dynamic-sky/30 px-3.5 py-1.5 rounded-md text-xs font-bold transition">
              Catálogos PDF
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dynamic-navy via-slate-900 to-dynamic-blue text-white py-14 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-dynamic-blue/30 border border-dynamic-light/30 px-3 py-1 rounded-full text-xs text-dynamic-sky mb-4 font-medium backdrop-blur">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Producto Mayorista B2B · Cupos Confirmados
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Grandes viajes con la solvencia que tu agencia necesita.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              Descubre nuestra programación exclusiva para agencias de viajes. Tarifas netas competitivas, cupos garantizados en vuelos regulares y charters, y asistencia 24/7 en destino.
            </p>
          </div>

          {/* Quick Filter Box B2B */}
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-5 text-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border border-slate-100">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Destino</label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                <MapPin className="w-4 h-4 text-dynamic-blue" />
                <select className="bg-transparent text-sm w-full focus:outline-none text-slate-700 font-medium">
                  <option>Todos los destinos</option>
                  <option>Egipto Legendario</option>
                  <option>Jordania Clásica</option>
                  <option>Tailandia al Completo</option>
                  <option>Uzbekistán Ruta de la Seda</option>
                  <option>Kenia & Tanzania</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Mes de Salida</label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                <Calendar className="w-4 h-4 text-dynamic-blue" />
                <select className="bg-transparent text-sm w-full focus:outline-none text-slate-700 font-medium">
                  <option>Cualquier fecha</option>
                  <option>Septiembre 2026</option>
                  <option>Octubre 2026</option>
                  <option>Noviembre 2026</option>
                  <option>Puente Diciembre</option>
                  <option>Temporada 2027</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Ciudad de Origen</label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
                <Compass className="w-4 h-4 text-dynamic-blue" />
                <select className="bg-transparent text-sm w-full focus:outline-none text-slate-700 font-medium">
                  <option>Madrid & Barcelona</option>
                  <option>Vigo / Santiago</option>
                  <option>Santander / Bilbao</option>
                  <option>Sevilla / Málaga</option>
                  <option>Valencia</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-dynamic-blue hover:bg-dynamic-navy text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md">
                <Search className="w-4 h-4" />
                Consultar Disponibilidad
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-12 flex-1">
        <div className="flex justify-between items-baseline mb-6 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-dynamic-navy">Programaciones Destacadas B2B</h2>
            <p className="text-slate-500 text-xs mt-1">Ofertas con plazas directas y confirmación inmediata para agencias de viajes</p>
          </div>
          <button className="text-dynamic-blue text-sm font-semibold hover:underline flex items-center gap-1">
            Ver todas las ofertas <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sample Travel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Egipto Legendario: Nilo & El Cairo",
              duration: "8 días / 7 noches",
              dep: "Salidas directas Madrid, BCN y Provincias",
              price: "599 €",
              tag: "Cupo Garantizado",
              includes: "Crucero PC + Hotel El Cairo AD + Visitas guiadas",
            },
            {
              title: "Jordania Fascinante: Petra y Desierto",
              duration: "8 días / 7 noches",
              dep: "Salidas semanales sábados",
              price: "1.190 €",
              tag: "Grupo Reducido",
              includes: "Media Pensión + 4x4 en Wadi Rum + Entradas",
            },
            {
              title: "Safari Kenia Clásico & Diani Beach",
              duration: "10 días / 8 noches",
              dep: "Vuelos regulares confirmados",
              price: "2.450 €",
              tag: "Temporada Migración",
              includes: "Pensión Completa en Lodges + Jeep 4x4 ventanilla garantizada",
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <div className="h-44 bg-slate-200 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute top-3 left-3 bg-dynamic-blue text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                  {item.tag}
                </span>
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-dynamic-navy text-xs font-bold px-2 py-1 rounded">
                  {item.duration}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-800 mb-1 leading-snug hover:text-dynamic-blue cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">{item.dep}</p>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 mb-4">
                    {item.includes}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Precio Neto desde</span>
                    <span className="text-xl font-extrabold text-dynamic-navy">{item.price}</span>
                  </div>
                  <button className="bg-slate-100 hover:bg-dynamic-blue hover:text-white text-dynamic-blue font-semibold px-3 py-1.5 rounded text-xs transition flex items-center gap-1">
                    Ver Itinerario <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dynamic-navy text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Dynamic Tours S.A. Todos los derechos reservados. Mayorista de viajes exclusivo para profesionales.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Aviso Legal</a>
            <a href="#" className="hover:text-white transition">Condiciones Generales</a>
            <a href="#" className="hover:text-white transition">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition">Contacto Agencias</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
