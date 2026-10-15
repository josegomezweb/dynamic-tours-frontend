import React, { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Plane, 
  Sparkles, 
  Calendar, 
  Info,
  ChevronDown,
  ChevronUp,
  FileText,
  User,
  Heart,
  Share2,
  AlertTriangle
} from "lucide-react";

interface LeyendasDetailProps {
  onBack: () => void;
  onEnterB2B: () => void;
}

export default function LeyendasDetail({ onBack, onEnterB2B }: LeyendasDetailProps) {
  const [activeTab, setActiveTab] = useState<string>("itinerary");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [selectedExcursions, setSelectedExcursions] = useState<string[]>([]);
  const [calcAdults, setCalcAdults] = useState<number>(2);
  const [calcKids, setCalcKids] = useState<number>(0);
  const [viewingExcursionId, setViewingExcursionId] = useState<string | null>(null);

  const excursionsData = [
    {
      id: "abusimbel",
      category: "ABU SIMBEL",
      title: "Visita al Templo de Abu Simbel en Bus",
      adultPrice: 125,
      kidPrice: 125,
      desc: "Excursión en autobús para visitar los espectaculares templos tallados en la montaña dedicados al Faraón Ramsés II y a su amada Nefertari.",
      detailedDesc: "En las primeras horas del día, salida en autobús con guía hacia Abu Simbel, atravesando el desierto en un trayecto de aproximadamente 230 km (normalmente en convoy con otros vehículos). A la llegada, el guía ofrecerá una explicación previa y, después, dispondrás de tiempo libre para recorrer y fotografiar los dos templos. Visitarás uno de los conjuntos más impresionantes de Egipto: una obra colosal mandada construir por Ramsés II, el gran “faraón constructor”, famosa por sus gigantescas estatuas talladas en la roca. Además, conocerás la increíble historia de su reubicación por la UNESCO en la década de 1960, para evitar que quedaran sumergidos tras la construcción de la presa de Asuán. Finalizada la visita (aprox. 1 h 30 min), regreso en autobús a Asuán.",
      image: "/abu_simbel.jpg"
    },
    {
      id: "alexandria",
      category: "ALEXANDRIA",
      title: "Día completo en Alejandría con almuerzo",
      adultPrice: 115,
      kidPrice: 115,
      desc: "Excursión con traslados y guía para conocer la joya costera del Mediterráneo: el puerto de la ciudad, catacumbas, Columna de Pompeyo y la moderna Biblioteca. Almuerzo incluido.",
      detailedDesc: "A la hora prevista saldremos de El Cairo por carretera rumbo a Alejandría (aprox. 225 km, unas 3 horas), la gran ciudad mediterránea y la segunda más importante de Egipto. Comenzaremos recorriendo el puerto alejandrino y visitando la Ciudadela de Qaitibay, fortaleza del siglo XV construida en el mismo enclave donde se alzaba el legendario Faro de Alejandría. Continuaremos hacia el sur para descubrir las Catacumbas de Kom el Shoqafa, un fascinante yacimiento subterráneo cuyos relieves muestran la fusión de tradiciones egipcias y grecorromanas, recorriendo sus distintos niveles entre pasadizos y cámaras funerarias. Muy cerca, veremos la Columna de Pompeyo, levantada en el área donde se encontraba el antiguo templo de Serapis. Después, disfrutaremos de un almuerzo en el centro de Alejandría. Por la tarde, visitaremos la Nueva Biblioteca de Alejandría, un icono cultural contemporáneo inaugurado en 2002 como homenaje a la mítica biblioteca de la Antigüedad. A última hora, regreso al hotel. Alojamiento",
      image: "/alejandria.jpg"
    },
    {
      id: "sakkara",
      category: "EL CAIRO",
      title: "Día completo en El Cairo con Sakkara",
      adultPrice: 100,
      kidPrice: 100,
      desc: "Recorrido exhaustivo por la Ciudadela de Saladino, la Mezquita de Alabastro, el histórico Barrio Copto, el bazar de Jan el-Jalili y la Necrópolis de Saqqara con su pirámide escalonada de Zoser. Con almuerzo incluido.",
      detailedDesc: "A la hora prevista, recogida en el hotel para realizar una excursión de Día completo por El Cairo con Sakkara. Comenzaremos en el centro histórico con la Ciudadela de Saladino, gran fortaleza medieval que domina la ciudad, y la emblemática Mezquita de Alabastro, conocida por su elegante interior revestido en alabastro y sus vistas panorámicas; aquí el guía hará una breve introducción a los principios básicos del islam. Continuaremos hacia el Barrio Copto, uno de los rincones más singulares de la capital, donde visitaremos la Iglesia Colgante (Al-Muallaqa), construida sobre antiguas estructuras romanas, la Sinagoga Ben Ezra, vinculada a la tradición del hallazgo del bebé Moisés, y la Iglesia de San Sergio, asociada al paso de la Sagrada Familia por Egipto, además de un paseo por la zona medieval. Después, nos adentraremos en el animado bazar de Khan el Khalili, el mercado más famoso de la ciudad, con tiempo libre para recorrer sus callejuelas, artesanía y puestos tradicionales. Almuerzo en restaurante local (bebidas no incluidas). Por la tarde, visitaremos la Necrópolis de Sakkara, el gran conjunto funerario de Menfis donde destaca la Pirámide Escalonada, una de las más antiguas de Egipto, y al finalizar regreso al hotel. Alojamiento.",
      image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gem",
      category: "EL CAIRO",
      title: "Gran Museo Egipcio",
      adultPrice: 65,
      kidPrice: 65,
      desc: "Visita al nuevo y majestuoso centro arqueológico de clase mundial donde se conservan los mayores tesoros del antiguo Egipto.",
      detailedDesc: "Durante la tarde, tras el almuerzo visitarás el Gran Museo Egipcio (GEM), situado muy cerca de las pirámides de Guiza. Desde el exterior te sorprenderán sus proporciones y su arquitectura contemporánea; al entrar, comienza un recorrido fascinante por miles de años de historia a través de una cuidada selección de piezas, desde estatuas monumentales hasta ajuares y objetos procedentes de tumbas faraónicas. Uno de los grandes momentos de la visita es el Gran Vestíbulo, presidido por la colosal estatua de Ramsés II, una bienvenida espectacular que resume la grandeza del Antiguo Egipto. A medida que avanzas por las salas abiertas al público, cada detalle (la iluminación, los espacios y la narrativa del museo) refuerza esa conexión entre pasado y presente. Y si te acompaña la luz del atardecer, el ambiente se vuelve todavía más especial, convirtiendo la visita en un recuerdo imprescindible del viaje.",
      image: "/gem.jpeg"
    },
    {
      id: "nochecairota",
      category: "EL CAIRO",
      title: "Noche Cairota",
      adultPrice: 80,
      kidPrice: 80,
      desc: "Paseo nocturno por la mística zona islámica de El Cairo, disfrutando de las luces y el ambiente cairota tradicional con cena incluida en restaurante local.",
      detailedDesc: "A la hora prevista, nos dirigiremos al centro histórico de El Cairo para disfrutar de un paseo por algunos de sus rincones más emblemáticos. Recorreremos la calle Al-Muizz, uno de los grandes ejes del Cairo medieval, and nos adentraremos en el Gran Bazar de Khan el Khalili, el zoco más famoso de la ciudad, con sus angostas callejuelas y pasadizos repletos de vida y artesanía. Durante el recorrido haremos una pausa en el mítico Café El Fishawi, con más de 200 años de historia y conocido como el “café de los espejos”, donde podremos tomar un té o un café. Para finalizar, disfrutaremos de una cena en un restaurante tradicional para degustar la gastronomía egipcia (bebidas no incluidas) y, después, regreso al hotel.",
      image: "/noche_cairota.jpg"
    },
    {
      id: "globo",
      category: "LUXOR",
      title: "Paseo en Globo en Luxor",
      adultPrice: 110,
      kidPrice: 110,
      desc: "Inolvidable y mágico vuelo flotante al amanecer sobre los impresionantes valles, necrópolis y templos sagrados tebanos.",
      detailedDesc: "Antes del amanecer, recogida y traslado al punto de despegue para vivir una experiencia inolvidable: un paseo en globo aerostático sobre Luxor. A medida que ascendemos, contemplaremos cómo el sol va iluminando el Valle de los Reyes, el Valle de los Nobles y templos emblemáticos como el de la Reina Hatshepsut. La actividad tiene una duración aproximada de 50 minutos y, al finalizar, recibirás un certificado de vuelo como recuerdo de esta experiencia. Regreso al punto de partida. Nota: excursión sujeta a disponibilidad y condiciones meteorológicas; se recomienda reservar con antelación.",
      image: "/globo_luxor.jpg"
    }
  ];

  const itineraryDays = [
    {
      day: 1,
      title: "ESPAÑA - ASWAN",
      desc: "Presentación en el aeropuerto 3 horas antes de la salida. Embarque en vuelo (chárter o línea regular) con destino Aswan. Llegada, trámites de visado y traslado al crucero. (En caso de embarcar más tarde de las 21:00, será una cena fría en el camarote). Noche a bordo."
    },
    {
      day: 2,
      title: "ASWAN - KOM OMBO - EDFU",
      desc: "Pensión completa. Mañana libre a su disposición. De manera OPCIONAL, posibilidad de realizar la visita de los Templos de Abu Simbel en bus. A la hora indicada, visita al Templo de Philae y paseo por el Nilo en ‘falucas’, típicas embarcaciones pesqueras. De manera OPCIONAL, posibilidad de visitar el Poblado Nubio. Regreso al barco, almuerzo a bordo e inicio de la navegación hacia Kom Ombo. A la llegada, visita del templo dedicado a los dioses Haroeris y Sobek. Navegación hacia Edfu. Cena and noche a bordo."
    },
    {
      day: 3,
      title: "EDFU - ESNA - LUXOR",
      desc: "Pensión completa. Por la mañana, visita del Templo de Horus en Edfú. Regreso al barco y almuerzo a bordo mientras se navega hacia Esna (cruce de la esclusa) y continuación hacia Luxor. A la llegada, visita de los Templos de Karnak y Luxor. Cena y noche a bordo."
    },
    {
      day: 4,
      title: "LUXOR - EL CAIRO",
      desc: "Pensión completa. Al amanecer, de manera OPCIONAL, posibilidad de realizar un inolvidable Paseo en Globo y contemplar cómo el sol ilumina los valles y templos emblemáticos. Desayuno. A la hora indicada, visita del Valle de los Reyes, Templo de la Reina Hatshepsut y los Colosos de Memnon. A la hora indicada, traslado al aeropuerto para embarcar en vuelo con destino El Cairo. Traslado al hotel y alojamiento."
    },
    {
      day: 5,
      title: "EL CAIRO",
      desc: "Desayuno. A la hora indicada, salida hacia Guiza para visitar la Gran Esfinge y las emblemáticas pirámides de Keops, Kefrén y Micerinos. Regreso al hotel y tarde libre. De manera OPCIONAL, posibilidad de realizar la visita al Gran Museo Egipcio (GEM) con almuerzo en restaurante local. También de manera OPCIONAL, se podrá disfrutar de un paseo nocturno por la zona islámica de El Cairo, disfrutando de la Noche Cairota con cena en restaurante local. Alojamiento."
    },
    {
      day: 6,
      title: "EL CAIRO",
      desc: "Desayuno. Día libre a su disposición. De manera OPCIONAL, posibilidad de realizar la excursión de día completo a la ciudad de El Cairo con almuerzo en restaurante local que incluye la visita a la Ciudadela de Saladino, la Mezquita de Alabastro, el histórico Barrio Copto y el bazar de Khan el Khalili. Posteriormente, traslado hasta Saqqara para visitar su necrópolis. Alojamiento."
    },
    {
      day: 7,
      title: "EL CAIRO",
      desc: "Desayuno. Día libre a su disposición. De manera OPCIONAL, posibilidad de realizar la excursión de día completo a la ciudad de Alejandría con almuerzo en restaurante local que incluye la visita al puerto alejandrino, las catacumbas de Kom el Shoqafa, la Columna de Pompeyo y la moderna Biblioteca de Alejandría. Al finalizar, regreso a El Cairo. Alojamiento."
    },
    {
      day: 8,
      title: "EL CAIRO - ESPAÑA",
      desc: "Desayuno. A la hora indicada, traslado al aeropuerto para embarcar en vuelo (chárter o línea regular) de regreso a España. Llegada y fin de nuestros servicios."
    }
  ];

  const inclusionsList = [
    "Vuelo especial (Chárter) desde España más vuelos domésticos internos.",
    "3 noches de crucero por el río Nilo en régimen de Pensión Completa (bebidas no incluidas).",
    "4 noches en El Cairo en régimen de Alojamiento y Desayuno.",
    "Visitas completas según programa en El Cairo y durante el crucero.",
    "Todos los traslados y asistencias en aeropuertos con personal de habla hispana.",
    "Guías oficiales egiptólogos nativos de habla hispana durante todas las excursiones.",
    "Seguro de asistencia en viaje básico de cobertura estándar.",
    "Tasas aéreas oficiales y suplemento de carburante (280€ netos ya incluidos)."
  ];

  const exclusionsList = [
    "Cuota de servicios de gestión, propinas generales obligatorias y tasas de barco/chóferes: 75€ por persona (a pagar directamente en destino).",
    "Visado obligatorio de entrada a Egipto: 36 USD por persona (a tramitar online unos 7 días antes de la salida, o 25€ en destino).",
    "Excursión o visita a los legendarios Templos de Abu Simbel (este programa específico la excluye).",
    "Propinas recomendadas del guía: se aconseja un mínimo de 3€ por día (aprox. 20€ para la semana completa).",
    "Bebidas de cualquier tipo, comidas no especificadas y extras de índole personal (teléfono, lavandería, etc.).",
    "Seguro opcional de cancelación de viaje (muy recomendado contratar en la confirmación)."
  ];

  const flightDetails = [
    { title: "Vuelo de Ida", route: "España (MAD/BCN/MÁL/VLC/BIO) ✈ Asuán (ASW)", type: "Chárter Especial Directo", day: "Viernes" },
    { title: "Vuelo Doméstico", route: "Luxor (LXR) ✈ El Cairo (CAI)", type: "Vuelo Regular Interno", day: "Lunes" },
    { title: "Vuelo de Regreso", route: "El Cairo (CAI) ✈ España", type: "Chárter Especial Directo", day: "Viernes" }
  ];

  const hotelDetails = [
    {
      category: "Categoría Standard / Superior (A y B)",
      cairo: "Sheraton Cairo Hotel & Casino 5★ (o similar)",
      cruise: "Motonave Princess du Nile 5★ / Princess Sarah 5★ (o similar)",
      desc: "Excelente relación calidad-precio. Habitaciones y cabinas con aire acondicionado, vistas espectaculares, baño privado completo, televisión de pantalla plana y caja fuerte."
    },
    {
      category: "Categoría Premium / Lujo (C y D)",
      cairo: "Sheraton Cairo Hotel (Mejora a habitación superior o céntrica de Lujo)",
      cruise: "Motonaves seleccionadas de categoría Gran Lujo 5★ Premium",
      desc: "Opción ideal para quienes buscan comodidad superior y ubicaciones en el centro del Cairo. Cabinas con ventanales panorámicos y servicios exclusivos."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Premium Floating Bar */}
      <div className="sticky top-0 z-50 bg-slate-50/85 backdrop-blur-md border-b border-[#1F82D2]/15 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A0F1D] hover:text-[#1F82D2] transition-all bg-white border border-slate-200/80 rounded-full px-4.5 py-2 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-[#1F82D2]" />
          Volver a la Web
        </button>

        <div className="hidden sm:flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-[#1F82D2] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#0A0F1D]">Programas Exclusivos Dynamic Tours</span>
        </div>

        <button 
          onClick={onEnterB2B}
          className="bg-[#0A0F1D] text-white hover:bg-[#1F82D2] text-xs font-extrabold uppercase tracking-widest px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
        >
          Cotizar Agente B2B
        </button>
      </div>

      {/* Hero Header Section */}
      <div className="relative h-[480px] w-full overflow-hidden">
        <img 
          src="/dia_5_guiza.jpg" 
          alt="Pirámides de Guiza Egipto"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-950/40 to-transparent"></div>
        
        {/* Floating Tag */}
        <div className="absolute top-8 left-4 sm:left-12 bg-[#0A0F1D]/90 backdrop-blur-md text-[#1F82D2] border border-[#1F82D2]/30 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded shadow-lg">
          CUPOS 100% GARANTIZADOS
        </div>

        {/* Hero content positioning */}
        <div className="absolute bottom-6 left-4 sm:left-12 max-w-2xl text-left space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#1F82D2] text-[#0A0F1D] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded shadow-sm">
              ÚLTIMAS PLAZAS
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/95">
              <Clock className="w-4 h-4 text-[#1F82D2]" />
              <span>8 Días / 7 Noches</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/95">
              <Plane className="w-4 h-4 text-[#1F82D2]" />
              <span>Salida Especial Viernes</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight drop-shadow-sm">
            Leyendas de Egipto Sin Abu Simbel
          </h1>
          
          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl font-medium drop-shadow-sm">
            Un fascinante viaje que combina el misticismo del Nilo con la majestuosidad de El Cairo. Incluye un crucero fluvial de 3 noches con pensión completa y 4 noches en hoteles seleccionados en El Cairo.
          </p>
        </div>

        {/* Floating Price Box */}
        <div className="absolute bottom-6 right-4 sm:right-12 text-right bg-white border border-[#1F82D2]/20 shadow-2xl rounded-2xl p-5 w-48 hidden md:block">
          <span className="text-[9px] block uppercase leading-none pb-1.5 tracking-widest text-slate-400 font-extrabold">precio desde</span>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-4xl font-black text-[#0A0F1D] font-serif leading-none">749€</span>
            <span className="text-xs font-bold text-slate-500">/pers.</span>
          </div>
          <p className="text-[9px] text-[#1F82D2] font-bold uppercase tracking-wider mt-2.5 leading-tight">TASAS E IVA INCLUIDOS</p>
          <button 
            onClick={onEnterB2B}
            className="w-full bg-[#1F82D2] hover:bg-[#0A0F1D] text-white font-black text-[10px] uppercase tracking-widest py-2 px-3 rounded-lg mt-4 shadow-sm transition-all cursor-pointer"
          >
            Reservar Cupo
          </button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left column (Tabs & Content) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Custom Luxury Navigation Tabs */}
          <div className="flex border-b border-[#1F82D2]/20 flex-wrap gap-2 sm:gap-6">
            {[
              { id: "itinerary", label: "Itinerario", icon: Clock },
              { id: "inclusions", label: "Qué Incluye", icon: CheckCircle },
              { id: "visits", label: "Visitas y Excursiones", icon: Sparkles },
              { id: "hotels", label: "Hoteles Previstos", icon: MapPin },
              { id: "flights", label: "Vuelos", icon: Plane }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 pb-4 px-1 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    isActive 
                      ? "border-[#1F82D2] text-[#0A0F1D]" 
                      : "border-transparent text-slate-400 hover:text-[#0A0F1D]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#1F82D2]" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab contents */}
          <div className="bg-white rounded-2xl border border-[#1F82D2]/10 p-6 sm:p-8 shadow-sm">
            
            {/* ITINERARY TAB */}
            {activeTab === "itinerary" && (
              <div className="space-y-6 text-left">
                <div className="border-l-2 border-[#1F82D2]/25 ml-4.5 space-y-8">
                  {itineraryDays.map((day) => {
                    const isExpanded = expandedDay === day.day;
                    return (
                      <div key={day.day} className="relative pl-8">
                        {/* Bullet indicator */}
                        <div className={`absolute left-[-11px] top-0 h-5 w-5 rounded-full border-2 flex items-center justify-center text-[9px] font-black transition-all ${
                          isExpanded 
                            ? "bg-[#0A0F1D] border-[#1F82D2] text-[#1F82D2]" 
                            : "bg-white border-slate-300 text-slate-500"
                        }`}>
                          {day.day}
                        </div>

                        {/* Heading row */}
                        <div 
                          onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                          className="flex justify-between items-center cursor-pointer group"
                        >
                          <h4 className="text-sm sm:text-base font-extrabold text-[#0A0F1D] font-serif group-hover:text-[#1F82D2] transition-colors pr-4">
                            Día {day.day}: {day.title}
                          </h4>
                          <button className="text-slate-400 group-hover:text-[#1F82D2] shrink-0 p-1">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Collapsible content */}
                        {isExpanded && (
                          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium font-sans animate-fade-in bg-slate-50 border border-slate-100 rounded-xl p-4">
                            {day.desc}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* INCLUSIONS TAB */}
            {activeTab === "inclusions" && (
              <div className="space-y-8 text-left">
                {/* What is included */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-[#0A0F1D] font-serif flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    El viaje INCLUYE:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {inclusionsList.map((item, idx) => (
                      <div key={idx} className="bg-emerald-50/45 border border-emerald-500/10 rounded-xl p-3 flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-700 leading-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#1F82D2]/10 my-4"></div>

                {/* What is excluded (WARNING BOX) */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-red-600 font-serif flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    El viaje NO incluye:
                  </h4>
                  
                  {/* Specific Abu Simbel Alert Banner */}
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-extrabold text-red-900 uppercase tracking-wider leading-none">Aviso Importante: Sin Abu Simbel</h5>
                      <p className="text-xs text-red-700 mt-1.5 font-medium leading-relaxed">
                        Este programa en concreto **NO INCLUYE** la excursión ni las visitas a los Templos de Abu Simbel. Si desea contratarse de forma adicional en destino, consulte tarifas directamente con su guía egiptólogo asignado.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {exclusionsList.map((item, idx) => (
                      <div key={idx} className="bg-red-50/30 border border-red-500/5 rounded-xl p-3 flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-600 leading-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VISITS & EXCURSIONS TAB */}
            {activeTab === "visits" && (
              <div className="space-y-8 text-left animate-fade-in">
                
                {/* 1. VISITAS INCLUIDAS */}
                <div className="space-y-4">
                  <h4 className="text-base font-extrabold text-[#0A0F1D] font-serif border-b border-slate-100 pb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    Visitas Incluidas (Sin coste adicional)
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50/20 border border-emerald-500/10 rounded-2xl p-5 space-y-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                        EL CAIRO
                      </span>
                      <h5 className="font-extrabold text-sm text-[#0A0F1D] font-serif">Necrópolis de Guiza</h5>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Excursión incluida para maravillarte ante las imponentes Pirámides de **Keops, Kefrén y Micerinos**, junto con el avistamiento de la mística **Gran Esfinge** y el Templo del Valle.
                      </p>
                    </div>

                    <div className="bg-emerald-50/20 border border-emerald-500/10 rounded-2xl p-5 space-y-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                        CRUCERO: LUXOR
                      </span>
                      <h5 className="font-extrabold text-sm text-[#0A0F1D] font-serif">Tebas y templos de culto</h5>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Exploración del **Valle de los Reyes**, el colosal **Templo de Hatshepsut** (Deir el-Bahari), los **Colosos de Memnón** y los magníficos Templos de culto de **Karnak** y **Luxor**.
                      </p>
                    </div>

                    <div className="bg-emerald-50/20 border border-emerald-500/10 rounded-2xl p-5 space-y-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                        CRUCERO: NILO & ASWAN
                      </span>
                      <h5 className="font-extrabold text-sm text-[#0A0F1D] font-serif">Joyas del Nilo</h5>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Traslado en calesa al bellísimo **Templo de Horus** en Edfú, visita al Templo de **Philae** dedicado a la diosa Isis, Templo de **Kom Ombo** y un paseo fluvial en tradicionales **falucas** de vela.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. EXCURSIONES OPCIONALES (CON PRECIOS Y SELECTOR) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Excursion List with exact Screenshot styling */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                      <h4 className="text-base font-extrabold text-[#0A0F1D] font-serif flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#1F82D2] shrink-0" />
                        Excursiones Opcionales Disponibles
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Precios oficiales</span>
                    </div>

                    <div className="space-y-4">
                      {excursionsData.map((item) => {
                        const isSelected = selectedExcursions.includes(item.id);
                        return (
                          <div 
                            key={item.id}
                            className={`border transition-all rounded-xl overflow-hidden shadow-sm flex bg-white ${
                              isSelected ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {/* Checkbox Selector */}
                            <div className="flex items-center justify-center px-4 bg-slate-50/50 border-r border-slate-100">
                              <input 
                                type="checkbox"
                                id={`ex-check-${item.id}`}
                                checked={isSelected}
                                onChange={() => {
                                  if (isSelected) {
                                    setSelectedExcursions(selectedExcursions.filter(x => x !== item.id));
                                  } else {
                                    setSelectedExcursions([...selectedExcursions, item.id]);
                                  }
                                }}
                                className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                              />
                            </div>

                            {/* Info & Price */}
                            <div className="p-4 flex-1 space-y-3">
                              {/* Header */}
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">
                                    {item.category}
                                  </span>
                                  <label 
                                    htmlFor={`ex-check-${item.id}`}
                                    className="font-extrabold text-sm text-[#0A0F1D] font-serif hover:text-[#1F82D2] transition-colors cursor-pointer"
                                  >
                                    {item.title}
                                  </label>
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => setViewingExcursionId(item.id)}
                                  className="text-[11px] text-slate-400 hover:text-[#1F82D2] cursor-pointer font-bold underline shrink-0 ml-2 bg-transparent border-none p-0"
                                >
                                  Ver detalles
                                </button>
                              </div>

                              {/* Description */}
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                {item.desc}
                              </p>

                              {/* Price Row matching Screenshot exactly */}
                              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 bg-slate-50/30 -mx-4 -mb-4 px-4 py-2.5">
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-xs font-bold text-slate-400">Adulto:</span>
                                  <span className="text-lg font-black text-[#0A0F1D]">{item.adultPrice}€</span>
                                  <span className="text-[9px] text-slate-400 font-medium">Precio por persona</span>
                                </div>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-xs font-bold text-slate-400">Niño:</span>
                                  <span className="text-lg font-black text-[#0A0F1D]">{item.kidPrice}€</span>
                                  <span className="text-[9px] text-slate-400 font-medium">Precio por persona</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Calculator */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-2">
                      <h4 className="text-base font-extrabold text-[#0A0F1D] font-serif flex items-center gap-2">
                        <Info className="w-5 h-5 text-[#1F82D2] shrink-0" />
                        Cotizador de Opcionales
                      </h4>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-5 shadow-sm sticky top-24">
                      {/* Person selectors */}
                      <div className="space-y-4">
                        <h5 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">Número de Viajeros</h5>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {/* Adults */}
                          <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col items-center justify-center space-y-2">
                            <span className="text-xs font-bold text-slate-500">Adultos</span>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setCalcAdults(Math.max(1, calcAdults - 1))}
                                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-bold text-[#0A0F1D] hover:bg-slate-100 active:scale-95 transition-all"
                              >
                                -
                              </button>
                              <span className="font-extrabold text-[#0A0F1D]">{calcAdults}</span>
                              <button 
                                onClick={() => setCalcAdults(calcAdults + 1)}
                                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-bold text-[#0A0F1D] hover:bg-slate-100 active:scale-95 transition-all"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Kids */}
                          <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col items-center justify-center space-y-2">
                            <span className="text-xs font-bold text-slate-500">Niños</span>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setCalcKids(Math.max(0, calcKids - 1))}
                                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-bold text-[#0A0F1D] hover:bg-slate-100 active:scale-95 transition-all"
                              >
                                -
                              </button>
                              <span className="font-extrabold text-[#0A0F1D]">{calcKids}</span>
                              <button 
                                onClick={() => setCalcKids(calcKids + 1)}
                                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-bold text-[#0A0F1D] hover:bg-slate-100 active:scale-95 transition-all"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Selected breakdown list */}
                      <div className="space-y-3 pt-3 border-t border-slate-200/80">
                        <h5 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider flex justify-between items-center">
                          <span>Excursiones</span>
                          <span className="bg-[#0A0F1D] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                            {selectedExcursions.length} sel.
                          </span>
                        </h5>

                        {selectedExcursions.length === 0 ? (
                          <div className="text-xs text-slate-400 py-4 text-center font-medium bg-white border border-dashed border-slate-200 rounded-xl">
                            Selecciona alguna excursión de la lista de la izquierda para cotizar
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                            {selectedExcursions.map(id => {
                              const item = excursionsData.find(x => x.id === id);
                              if (!item) return null;
                              const itemTotal = (item.adultPrice * calcAdults) + (item.kidPrice * calcKids);
                              return (
                                <div key={id} className="text-xs bg-white p-2.5 rounded-lg border border-slate-200/60 flex justify-between items-center">
                                  <div className="truncate max-w-[130px]">
                                    <p className="font-bold text-[#0A0F1D] truncate">{item.title}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">
                                      {calcAdults} Ad x {item.adultPrice}€ {calcKids > 0 && `+ ${calcKids} Ni x ${item.kidPrice}€`}
                                    </p>
                                  </div>
                                  <span className="font-bold text-[#0A0F1D] shrink-0">{itemTotal}€</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Summary total */}
                      <div className="bg-[#0A0F1D] text-white p-4 rounded-xl space-y-2 shadow">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-[#1F82D2] uppercase tracking-wider">Total Opcionales</span>
                          <span className="text-xl font-black text-white">
                            {selectedExcursions.reduce((sum, id) => {
                              const item = excursionsData.find(x => x.id === id);
                              return sum + (item ? (item.adultPrice * calcAdults + item.kidPrice * calcKids) : 0);
                            }, 0)}€
                          </span>
                        </div>
                        <p className="text-[9px] text-slate-300 font-medium leading-relaxed">
                          *Precios netos recomendados por persona para las fechas del chárter. A confirmar al formalizar la reserva.
                        </p>
                      </div>

                      {/* Add Button */}
                      <button 
                        onClick={() => {
                          alert(`¡Selección guardada! Se han añadido las excursiones seleccionadas por un valor de ${selectedExcursions.reduce((sum, id) => {
                            const item = excursionsData.find(x => x.id === id);
                            return sum + (item ? (item.adultPrice * calcAdults + item.kidPrice * calcKids) : 0);
                          }, 0)}€ a la cotización.`);
                        }}
                        className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all text-center border-0 cursor-pointer"
                      >
                        Añadir a mi Presupuesto
                      </button>
                    </div>
                  </div>

                </div>

                {/* 3. EXTRAS & SUPLEMENTOS */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-base font-extrabold text-[#0A0F1D] font-serif border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#1F82D2] shrink-0" />
                    Suplementos y Extras del Programa
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex gap-3 text-left">
                      <MapPin className="w-5 h-5 text-[#1F82D2] shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">Suplemento Hoteles Centro El Cairo (Categoría C/D)</h5>
                        <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                          Ofrece la fantástica posibilidad de añadir un extra en la reserva para alojarse en hoteles seleccionados del centro histórico y comercial de El Cairo, garantizando traslados más directos y mejor ubicación para explorar por libre.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex gap-3 text-left">
                      <AlertTriangle className="w-5 h-5 text-[#1F82D2] shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">Propinas Generales y Guía</h5>
                        <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                          Además de la cuota de servicios obligatoria de 75€ en destino, se recomienda de manera habitual destinar unos **3€ por persona y día** como gratitud para el guía egiptólogo asignado (aprox. 20€ para la semana completa).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* HOTELES TAB */}
            {activeTab === "hotels" && (
              <div className="space-y-6 text-left">
                <div className="bg-[#1F82D2]/10 text-[#0A0F1D] p-4 rounded-xl flex items-center gap-3 border border-[#1F82D2]/20">
                  <MapPin className="w-5 h-5 text-[#1F82D2] shrink-0" />
                  <p className="text-[11px] font-black uppercase tracking-wider">
                    HOTELES Y MOTONAVES DE 5★ CONFIRMADOS O SIMILARES
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {hotelDetails.map((category, idx) => (
                    <div key={idx} className="border border-slate-150 rounded-2xl p-6 hover:border-[#1F82D2]/30 transition-all bg-slate-50/50 space-y-4">
                      <div className="border-b border-slate-200/60 pb-3">
                        <span className="bg-[#0A0F1D] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                          {category.category}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Estancia en El Cairo</p>
                          <p className="text-sm font-extrabold text-[#0A0F1D] font-serif">{category.cairo}</p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Crucero por el Nilo</p>
                          <p className="text-sm font-extrabold text-[#0A0F1D] font-serif">{category.cruise}</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-100">
                        {category.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50/55 border border-amber-500/10 rounded-xl p-4 flex gap-3 text-slate-700">
                  <Info className="w-5 h-5 text-[#1F82D2] shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                    Las motonaves del Nilo (como **Princess du Nile** o **Princess Sarah**) disponen de cabinas de aproximadamente 18m² totalmente climatizadas, equipadas con grandes ventanales con vistas panorámicas al río, caja de seguridad, televisión y baño completo. Los hoteles en El Cairo (como el emblemático **Sheraton Cairo Hotel & Casino**) ofrecen todas las comodidades modernas de lujo. Las asignaciones definitivas se confirman una semana antes de la salida.
                  </p>
                </div>
              </div>
            )}

            {/* FLIGHTS TAB */}
            {activeTab === "flights" && (
              <div className="space-y-6 text-left">
                <div className="bg-[#0A0F1D] text-[#1F82D2] p-4 rounded-xl flex items-center gap-3">
                  <Plane className="w-5 h-5 text-[#1F82D2] shrink-0" />
                  <p className="text-[11px] font-black uppercase tracking-wider">
                    OPERACIÓN DE VUELOS DIRECTOS CHÁRTER LOS VIERNES DESDE ESPAÑA
                  </p>
                </div>

                <div className="space-y-4">
                  {flightDetails.map((f, i) => (
                    <div key={i} className="border border-slate-150 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#1F82D2]/30 transition-all bg-slate-50/50">
                      <div className="space-y-1">
                        <span className="bg-[#1F82D2]/10 text-[#0A0F1D] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                          {f.title}
                        </span>
                        <h5 className="text-sm font-extrabold text-slate-800 font-serif pt-1.5">{f.route}</h5>
                      </div>
                      
                      <div className="flex gap-4 text-right self-stretch sm:self-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">TIPO VUELO</p>
                          <p className="text-xs font-extrabold text-[#0A0F1D] mt-1">{f.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">DÍA SALIDA</p>
                          <p className="text-xs font-extrabold text-[#1F82D2] mt-1">{f.day}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50/55 border border-amber-500/10 rounded-xl p-4 flex gap-3 text-slate-700">
                  <Info className="w-5 h-5 text-[#1F82D2] shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                    Las salidas directas se efectúan los **viernes** desde los aeropuertos autorizados españoles (Madrid Barajas, Barcelona El Prat, Bilbao, Málaga y Valencia). Equipaje de bodega facturado de hasta 20kg y bolso de mano incluidos en el billete oficial de operador.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right column (Reservation summary & B2B login info card) */}
        <div className="space-y-6">
          
          {/* Main Pricing details box on mobile and small layouts */}
          <div className="bg-[#0A0F1D] text-white rounded-2xl p-6 shadow-xl border border-[#1F82D2]/30 space-y-4 md:hidden text-left">
            <div>
              <p className="text-[9px] text-[#1F82D2] font-black uppercase tracking-widest">PRECIO MAYORISTA OFICIAL</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-black font-serif text-white">749€</span>
                <span className="text-xs text-slate-300">/persona</span>
              </div>
              <p className="text-[9px] text-slate-300 mt-1 font-bold">Impuestos de aduanas, carburante y tasas incluidos.</p>
            </div>
            
            <button 
              onClick={onEnterB2B}
              className="w-full bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-black text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg transition-all cursor-pointer text-center block border-0"
            >
              Acceder como Agencia Minorista
            </button>
          </div>

          {/* Travel Agent Exclusives Card */}
          <div className="bg-white rounded-2xl border border-[#1F82D2]/10 p-6 shadow-sm text-left space-y-4">
            <h4 className="text-sm font-extrabold text-[#0A0F1D] font-serif uppercase tracking-wider border-b border-slate-100 pb-3">
              ¿Eres Agente de Viajes?
            </h4>
            
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Accede a la consola de operador de **Dynamic Tours** para beneficiarte de comisiones garantizadas de hasta el 15%, consultar disponibilidad de cupos en tiempo real, descargar folletos en formato PDF marca blanca o usar el cotizador dinámico B2B de inteligencia artificial.
            </p>

            <div className="space-y-2 pt-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Comisión de hasta el 15%</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Confirmación de Cupos al instante</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Descarga de itinerarios B2B</span>
              </div>
            </div>

            <button 
              onClick={onEnterB2B}
              className="w-full bg-slate-100 hover:bg-[#0A0F1D] text-[#0A0F1D] hover:text-white border border-slate-200 hover:border-[#0A0F1D] font-black text-[10px] uppercase tracking-widest py-3 px-4 rounded-xl transition-all cursor-pointer text-center block"
            >
              Iniciar Sesión de Colaborador
            </button>
          </div>

          {/* Quick Help & Direct Phone block */}
          <div className="bg-[#1F82D2]/5 border border-[#1F82D2]/15 rounded-2xl p-6 text-left space-y-4">
            <h4 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">
              ¿Necesitas Asistencia?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Nuestro departamento de reservas y expertos de producto de Egipto están a tu entera disposición para resolver cualquier duda.
            </p>
            <div className="pt-1.5 space-y-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">TELÉFONO EXCLUSIVO AGENCIAS</p>
              <p className="text-sm font-black text-[#0A0F1D] font-serif leading-none">+34 91 542 2211</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">CORREO DE SOPORTE</p>
              <p className="text-xs font-extrabold text-[#1F82D2] leading-none">egipto@dynamic-tours.com</p>
            </div>
          </div>

        </div>

      </div>

      {/* EXCURSION DETAIL MODAL POPUP */}
      {viewingExcursionId && (() => {
        const item = excursionsData.find(x => x.id === viewingExcursionId);
        if (!item) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="bg-[#0A0F1D] text-white p-5 flex justify-between items-center relative">
                <div>
                  <span className="text-[10px] font-black text-[#1F82D2] tracking-widest uppercase block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-base font-extrabold font-serif text-white">
                    {item.title}
                  </h3>
                </div>
                <button 
                  type="button"
                  onClick={() => setViewingExcursionId(null)}
                  className="text-white/75 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-full"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-left">
                {/* Excursion Image */}
                {item.image && (
                  <div className="w-full h-48 sm:h-56 overflow-hidden rounded-xl shadow-md border border-slate-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">
                    Detalles de la Excursión
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
                    {item.detailedDesc || item.desc}
                  </p>
                </div>

                {/* Price break */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-black text-[#0A0F1D] uppercase tracking-wider">
                    Precios Oficiales de Operador
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0A0F1D]/5 border border-[#0A0F1D]/10 rounded-xl p-3 flex flex-col">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tarifa Adulto</span>
                      <span className="text-xl font-black text-[#0A0F1D]">{item.adultPrice}€</span>
                      <span className="text-[9px] text-slate-400 font-medium">Precio neto por persona</span>
                    </div>
                    <div className="bg-[#0A0F1D]/5 border border-[#0A0F1D]/10 rounded-xl p-3 flex flex-col">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tarifa Niño</span>
                      <span className="text-xl font-black text-[#0A0F1D]">{item.kidPrice}€</span>
                      <span className="text-[9px] text-slate-400 font-medium">Precio neto por persona</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => {
                    const isSelected = selectedExcursions.includes(item.id);
                    if (isSelected) {
                      setSelectedExcursions(selectedExcursions.filter(x => x !== item.id));
                    } else {
                      setSelectedExcursions([...selectedExcursions, item.id]);
                    }
                    setViewingExcursionId(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    selectedExcursions.includes(item.id)
                      ? "bg-rose-500 text-white hover:bg-rose-600"
                      : "bg-[#0A0F1D] text-white hover:bg-[#0B0F19]"
                  }`}
                >
                  {selectedExcursions.includes(item.id) ? "Quitar de mi Viaje" : "Seleccionar esta Excursión"}
                </button>
                <button 
                  type="button"
                  onClick={() => setViewingExcursionId(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
