import { assetUrl } from "../utils/assets";
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

interface MaravillasDetailProps {
  onBack: () => void;
  onEnterB2B: () => void;
}

export default function MaravillasDetail({ onBack, onEnterB2B }: MaravillasDetailProps) {
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
      image: assetUrl("/abu_simbel.jpg")
    },
    {
      id: "alexandria",
      category: "ALEXANDRIA",
      title: "Día completo en Alejandría con almuerzo",
      adultPrice: 115,
      kidPrice: 115,
      desc: "Excursión con traslados y guía para conocer la joya costera del Mediterráneo: el puerto de la ciudad, catacumbas, Columna de Pompeyo y la moderna Biblioteca. Almuerzo incluido.",
      detailedDesc: "A la hora prevista saldremos de El Cairo por carretera rumbo a Alejandría (aprox. 225 km, unas 3 horas), la gran ciudad mediterránea y la segunda más importante de Egipto. Comenzaremos recorriendo el puerto alejandrino y visitando la Ciudadela de Qaitibay, fortaleza del siglo XV construida en el mismo enclave donde se alzaba el legendario Faro de Alejandría. Continuaremos hacia el sur para descubrir las Catacumbas de Kom el Shoqafa, un fascinante yacimiento subterráneo cuyos relieves muestran la fusión de tradiciones egipcias y grecorromanas, recorriendo sus distintos niveles entre pasadizos y cámaras funerarias. Muy cerca, veremos la Columna de Pompeyo, levantada en el área donde se encontraba el antiguo templo de Serapis. Después, disfrutaremos de un almuerzo en el centro de Alejandría. Por la tarde, visitaremos la Nueva Biblioteca de Alejandría, un icono cultural contemporáneo inaugurado en 2002 como homenaje a la mítica biblioteca de la Antigüedad. A última hora, regreso al hotel. Alojamiento",
      image: assetUrl("/alejandria.jpg")
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
      image: assetUrl("/gem.jpeg")
    },
    {
      id: "nochecairota",
      category: "EL CAIRO",
      title: "Noche Cairota",
      adultPrice: 80,
      kidPrice: 80,
      desc: "Paseo nocturno por la mística zona islámica de El Cairo, disfrutando de las luces y el ambiente cairota tradicional con cena incluida en restaurante local.",
      detailedDesc: "A la hora prevista, nos dirigiremos al centro histórico de El Cairo para disfrutar de un paseo por algunos de sus rincones más emblemáticos. Recorreremos la calle Al-Muizz, uno de los grandes ejes del Cairo medieval, and nos adentraremos en el Gran Bazar de Khan el Khalili, el zoco más famoso de la ciudad, con sus angostas callejuelas y pasadizos repletos de vida y artesanía. Durante el recorrido haremos una pausa en el mítico Café El Fishawi, con más de 200 años de historia y conocido como el “café de los espejos”, donde podremos tomar un té o un café. Para finalizar, disfrutaremos de una cena en un restaurante tradicional para degustar la gastronomía egipcia (bebidas no incluidas) y, después, regreso al hotel.",
      image: assetUrl("/noche_cairota.jpg")
    },
    {
      id: "globo",
      category: "LUXOR",
      title: "Paseo en Globo en Luxor",
      adultPrice: 110,
      kidPrice: 110,
      desc: "Inolvidable y mágico vuelo flotante al amanecer sobre los impresionantes valles, necrópolis y templos sagrados tebanos.",
      detailedDesc: "Antes del amanecer, recogida y traslado al punto de despegue para vivir una experiencia inolvidable: un paseo en globo aerostático sobre Luxor. A medida que ascendemos, contemplaremos cómo el sol va iluminando el Valle de los Reyes, el Valle de los Nobles y templos emblemáticos como el de la Reina Hatshepsut. La actividad tiene una duración aproximada de 50 minutos y, al finalizar, recibirás un certificado de vuelo como recuerdo de esta experiencia. Regreso al punto de partida. Nota: excursión sujeta a disponibilidad y condiciones meteorológicas; se recomienda reservar con antelación.",
      image: assetUrl("/globo_luxor.jpg")
    }
  ];

  const itineraryDays = [
    {
      day: 1,
      title: "ESPAÑA - LUXOR",
      desc: "Presentación en el aeropuerto para tomar el vuelo especial (chárter o línea regular) con destino a Luxor. A la llegada, asistencia de nuestro personal en destino, trámites de visado y traslado al crucero fluvial de 5 estrellas. (Si el embarque se produce más tarde de las 21:00, se facilitará una cena fría en el camarote). Noche a bordo."
    },
    {
      day: 2,
      title: "LUXOR - ESNA - EDFÚ",
      desc: "Pensión completa. Comenzaremos el día cruzando a la Orilla Occidental del Nilo para explorar la legendaria Necrópolis de Tebas, donde conoceremos el asombroso Valle de los Reyes, el majestuoso Templo de la Reina Hatshepsut en Deir el-Bahari y los imponentes Colosos de Memnón. Después, visitaremos la Orilla Oriental con los grandiosos templos de Karnak y Luxor. Al finalizar las visitas, regreso a la motonave, almuerzo a bordo e inicio de la navegación hacia Esna para cruzar la famosa esclusa y continuar navegando hacia Edfú. Cena y noche a bordo."
    },
    {
      day: 3,
      title: "EDFÚ - KOM OMBO - ASUÁN",
      desc: "Pensión completa. Por la mañana, disfrutaremos de un paseo en calesa tradicional para visitar el extraordinario Templo de Horus en Edfú, el mejor conservado de todo Egipto. Regreso a la motonave y almuerzo a bordo mientras navegamos hacia Kom Ombo. Al llegar, visitaremos el templo doble consagrado a los dioses Sobek (cabeza de cocodrilo) y Haroeris. Posteriormente, continuación de la navegación hacia Asuán. Cena y noche a bordo."
    },
    {
      day: 4,
      title: "ASUÁN - ABU SIMBEL (OPCIONAL) - ASUÁN",
      desc: "Pensión completa. Día libre a su entera disposición en Asuán. Se incluye de manera opcional para quienes lo deseen la posibilidad de realizar la espectacular excursión por carretera a los grandiosos Templos de Abu Simbel, esculpidos en la roca por orden de Ramsés II. Por la tarde, visitaremos el Templo de Philae consagrado a la diosa Isis y disfrutaremos de un precioso paseo en faluca por las tranquilas aguas del Nilo alrededor de la Isla Elefantina. Cena y noche a bordo."
    },
    {
      day: 5,
      title: "ASUÁN - EL CAIRO",
      desc: "Desayuno a bordo y desembarque. Tiempo libre por la mañana para seguir disfrutando de Asuán o realizar excursiones opcionales (como la visita al Poblado Nubio o la Presa de Asuán) según el horario previsto para el vuelo doméstico con destino a El Cairo. A la llegada a la capital, asistencia de nuestro personal y traslado al hotel seleccionado de 5 estrellas. Alojamiento."
    },
    {
      day: 6,
      title: "EL CAIRO (PIRÁMIDES DE GUIZA)",
      desc: "Desayuno en el hotel. Salida por la mañana hacia la meseta de Guiza para realizar la inolvidable visita a las Pirámides de Keops, Kefrén y Micerinos (entradas a los interiores no incluidas), la enigmática Esfinge y el Templo del Valle de Kefrén. Tarde libre en la capital para pasear por cuenta propia. De manera opcional, se puede contratar la visita al Gran Museo Egipcio (GEM) o un paseo nocturno para cenar y contemplar la mística Noche Cairota. Alojamiento."
    },
    {
      day: 7,
      title: "EL CAIRO",
      desc: "Desayuno en el hotel. Día libre para seguir descubriendo El Cairo. Sugerimos contratar la excursión opcional de día completo en El Cairo con almuerzo, visitando la imponente Ciudadela de Saladino, la Mezquita de Alabastro, las históricas iglesias del Barrio Copto, la Necrópolis de Saqqara con su pirámide escalonada de Zoser y el animado bazar tradicional de Jan el-Jalili. Alojamiento."
    },
    {
      day: 8,
      title: "EL CAIRO - ESPAÑA",
      desc: "Desayuno en el hotel (según hora del vuelo). A la hora indicada, traslado privado al aeropuerto internacional de El Cairo para embarcar en el vuelo de regreso a España. Llegada y fin de nuestra gran aventura."
    }
  ];

  const inclusionsList = [
    "Vuelo especial (Chárter) desde España más vuelos domésticos internos.",
    "4 noches de crucero por el río Nilo en régimen de Pensión Completa (bebidas no incluidas).",
    "3 noches en El Cairo en régimen de Alojamiento y Desayuno.",
    "Visitas completas según programa en El Cairo (Pirámides de Guiza y Esfinge) y durante el crucero.",
    "Todos los traslados y asistencias en aeropuertos con personal de habla hispana.",
    "Guías oficiales egiptólogos nativos de habla hispana durante todas las excursiones.",
    "Seguro de asistencia en viaje básico de cobertura estándar.",
    "Tasas aéreas oficiales y suplemento de carburante (280€ netos ya incluidos)."
  ];

  const exclusionsList = [
    "Cuota de servicios de gestión, propinas generales obligatorias y tasas de barco/chóferes: 75€ por persona (a pagar directamente en destino).",
    "Visado obligatorio de entrada a Egipto: 36 USD por persona (a tramitar online unos 7 días antes de la salida, o 25€ en destino).",
    "Excursiones o visitas marcadas como opcionales en el programa (como Abu Simbel, Poblado Nubio o Sakkara).",
    "Propinas recomendadas del guía: se aconseja un mínimo de 3€ por día (aprox. 20€ para la semana completa).",
    "Bebidas de cualquier tipo, comidas no especificadas y extras de índole personal.",
    "Seguro opcional de cancelación de viaje (muy recomendado contratar en la confirmación)."
  ];

  const flightDetails = [
    { title: "Vuelo de Ida", route: "España (MAD/BCN/MÁL/VLC/BIO) ✈ Luxor (LXR)", type: "Chárter Especial Directo", day: "Sábado / Lunes (según temporada)" },
    { title: "Vuelo Doméstico", route: "Asuán (ASW) ✈ El Cairo (CAI)", type: "Vuelo Regular Interno", day: "Miércoles / Viernes" },
    { title: "Vuelo de Regreso", route: "El Cairo (CAI) ✈ España", type: "Chárter Especial Directo", day: "Sábado / Lunes" }
  ];

  const hotelDetails = [
    {
      category: "Categoría Standard / Superior (A y B)",
      cairo: "Barceló Cairo Pyramids / AZAL Pyramids 5★ (o similar)",
      cruise: "Motonave Princess du Nile 5★ / King of Thebes 5★ (o similar)",
      desc: "Excelente relación calidad-precio. Habitaciones y cabinas cómodas con aire acondicionado, baño privado completo, televisión de pantalla plana y desayuno/pensión completa excelente."
    },
    {
      category: "Categoría Premium / Lujo (C y D)",
      cairo: "Sheraton Cairo Hotel & Casino 5★ (o similar)",
      cruise: "Motonaves seleccionadas de categoría Gran Lujo 5★ Premium (Sarah o similar)",
      desc: "Opción ideal para quienes buscan comodidad superior y ubicaciones premium o en el centro del Cairo con vistas excepcionales."
    }
  ];

  const toggleExcursion = (id: string) => {
    if (selectedExcursions.includes(id)) {
      setSelectedExcursions(selectedExcursions.filter((x) => x !== id));
    } else {
      setSelectedExcursions([...selectedExcursions, id]);
    }
  };

  const calculateTotal = () => {
    const baseAdultPrice = 909; 
    const baseKidPrice = 799; 

    let excTotal = 0;
    selectedExcursions.forEach((excId) => {
      const exc = excursionsData.find((e) => e.id === excId);
      if (exc) {
        excTotal += (exc.adultPrice * calcAdults) + (exc.kidPrice * calcKids);
      }
    });

    const baseTotal = (baseAdultPrice * calcAdults) + (baseKidPrice * calcKids);
    return baseTotal + excTotal;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 pb-16">
      {/* Top Premium Floating Bar */}
      <div className="sticky top-0 z-50 bg-[#FDFBF7]/85 backdrop-blur-md border-b border-[#C5A059]/15 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#002B49] hover:text-[#C5A059] transition-all bg-white border border-slate-200/80 rounded-full px-4.5 py-2 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-[#C5A059]" />
          Volver a la Web
        </button>

        <div className="hidden sm:flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-[#C5A059] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#002B49]">Programas Exclusivos Dynamic Tours</span>
        </div>

        <button 
          onClick={onEnterB2B}
          className="bg-[#002B49] text-white hover:bg-[#C5A059] hover:text-[#002B49] text-xs font-extrabold uppercase tracking-widest px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
        >
          Cotizar Agente B2B
        </button>
      </div>

      {/* Hero Header Section */}
      <div className="relative h-[480px] w-full overflow-hidden">
        <img 
          src={assetUrl("/joyas nilo 2.png")} 
          alt="Maravillas del Nilo Egipto"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-slate-950/40 to-transparent"></div>
        
        {/* Floating Tag */}
        <div className="absolute top-8 left-4 sm:left-12 bg-[#002B49]/90 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/30 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded shadow-lg">
          CUPOS 100% GARANTIZADOS
        </div>

        {/* Hero content positioning */}
        <div className="absolute bottom-6 left-4 sm:left-12 max-w-2xl text-left space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#C5A059] text-[#002B49] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded shadow-sm">
              REBAJAS ACTIVAS
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/95">
              <Clock className="w-4 h-4 text-[#C5A059]" />
              <span>8 Días / 7 Noches</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/95">
              <Plane className="w-4 h-4 text-[#C5A059]" />
              <span>Vuelos Especiales Incluidos</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight drop-shadow-sm">
            Maravillas del Nilo
          </h1>
          
          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl font-medium drop-shadow-sm">
            El circuito estrella por Egipto de 8 días. Disfruta de un crucero inolvidable de 4 noches en régimen de Pensión Completa navegando por el río Nilo y 3 noches mágicas en El Cairo.
          </p>
        </div>

        {/* Floating Price Box */}
        <div className="absolute bottom-6 right-4 sm:right-12 text-right bg-white border border-[#C5A059]/20 shadow-2xl rounded-2xl p-5 w-48 hidden md:block">
          <span className="text-[9px] block uppercase leading-none pb-1.5 tracking-widest text-slate-400 font-extrabold">precio desde</span>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-4xl font-black text-[#002B49] font-serif leading-none">909€</span>
            <span className="text-xs font-bold text-slate-500">/pers.</span>
          </div>
          <p className="text-[9px] text-[#C5A059] font-bold uppercase tracking-wider mt-2.5 leading-tight">TASAS E IVA INCLUIDOS</p>
          <button 
            onClick={onEnterB2B}
            className="w-full bg-[#C5A059] hover:bg-[#002B49] text-white font-black text-[10px] uppercase tracking-widest py-2 px-3 rounded-lg mt-4 shadow-sm transition-all cursor-pointer"
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
          <div className="flex border-b border-[#C5A059]/20 flex-wrap gap-2 sm:gap-6">
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
                      ? "border-[#C5A059] text-[#002B49]" 
                      : "border-transparent text-slate-400 hover:text-[#002B49]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#C5A059]" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab contents */}
          <div className="bg-white rounded-2xl border border-[#C5A059]/10 p-6 sm:p-8 shadow-sm">
            
            {/* ITINERARY TAB */}
            {activeTab === "itinerary" && (
              <div className="space-y-6 text-left">
                <div className="border-l-2 border-[#C5A059]/25 ml-4.5 space-y-8">
                  {itineraryDays.map((day) => {
                    const isExpanded = expandedDay === day.day;
                    return (
                      <div key={day.day} className="relative pl-8">
                        {/* Bullet indicator */}
                        <div className={`absolute left-[-11px] top-0 h-5 w-5 rounded-full border-2 flex items-center justify-center text-[9px] font-black transition-all ${
                          isExpanded 
                            ? "bg-[#002B49] border-[#C5A059] text-[#C5A059]" 
                            : "bg-white border-slate-300 text-slate-500"
                        }`}>
                          {day.day}
                        </div>

                        {/* Heading row */}
                        <div 
                          onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                          className="flex justify-between items-center cursor-pointer group"
                        >
                          <h4 className="text-sm sm:text-base font-extrabold text-[#002B49] font-serif group-hover:text-[#C5A059] transition-colors pr-4">
                            Día {day.day}: {day.title}
                          </h4>
                          <button className="text-slate-400 group-hover:text-[#C5A059] shrink-0 p-1">
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
                  <h4 className="text-base font-bold text-[#002B49] font-serif flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    El viaje INCLUYE:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pl-1">
                    {inclusionsList.map((inc, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-600 font-medium flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-100 my-4"></div>

                {/* What is excluded */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-[#002B49] font-serif flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-500" />
                    No Incluido / Suplementos en destino:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pl-1">
                    {exclusionsList.map((exc, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-500 font-medium flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* VISITS TAB */}
            {activeTab === "visits" && (
              <div className="space-y-6 text-left">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    En este programa, las visitas principales a monumentos (Pirámides, Esfinge, Templos de Karnak, Luxor, Hatshepsut, Filas, Edfú, Kom Ombo) **están totalmente incluidas**. Puedes complementar el circuito seleccionando y cotizando en tiempo real excursiones opcionales adicionales en la calculadora de la derecha.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {excursionsData.map((exc) => (
                    <div key={exc.id} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between bg-white">
                      <div>
                        <div className="h-40 relative">
                          <img src={assetUrl(exc.image)} alt={exc.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <span className="absolute top-3 left-3 bg-[#002B49]/90 text-[#C5A059] text-[9px] font-black tracking-widest px-2.5 py-1 rounded">
                            {exc.category}
                          </span>
                        </div>
                        <div className="p-4 space-y-2">
                          <h5 className="font-extrabold text-[#002B49] text-sm leading-snug">{exc.title}</h5>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{exc.desc}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs font-black text-[#002B49]">{exc.adultPrice} € <span className="text-[10px] text-slate-400 font-medium">/ pax</span></span>
                        <button 
                          onClick={() => setViewingExcursionId(exc.id)}
                          className="text-[11px] font-bold text-[#C5A059] hover:underline"
                        >
                          Ver Detalle completo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HOTELS TAB */}
            {activeTab === "hotels" && (
              <div className="space-y-6 text-left">
                <div className="space-y-6">
                  {hotelDetails.map((category, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl p-5 sm:p-6 bg-slate-50 space-y-4">
                      <span className="bg-[#002B49] text-[#C5A059] border border-[#C5A059]/30 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md">
                        {category.category}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1 bg-white border border-slate-200/50 p-4 rounded-xl">
                          <span className="text-[9px] font-black uppercase text-[#C5A059] tracking-wider">Estancia en El Cairo</span>
                          <h5 className="font-bold text-[#002B49] text-xs sm:text-sm">{category.cairo}</h5>
                        </div>
                        <div className="space-y-1 bg-white border border-slate-200/50 p-4 rounded-xl">
                          <span className="text-[9px] font-black uppercase text-[#C5A059] tracking-wider">Motonave en el Nilo</span>
                          <h5 className="font-bold text-[#002B49] text-xs sm:text-sm">{category.cruise}</h5>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium pl-1">{category.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FLIGHTS TAB */}
            {activeTab === "flights" && (
              <div className="space-y-6 text-left">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6 space-y-4">
                  <h4 className="text-sm font-bold text-[#002B49] uppercase tracking-wider border-b border-slate-200 pb-2">Plan de Vuelos Especiales Chárter</h4>
                  <div className="space-y-4">
                    {flightDetails.map((f, i) => (
                      <div key={i} className="flex gap-4 items-start bg-white border border-slate-200/50 p-4 rounded-xl">
                        <div className="bg-[#C5A059]/10 p-2.5 rounded-lg text-[#C5A059] shrink-0">
                          <Plane className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-extrabold text-[#002B49]">{f.title}:</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider">{f.type}</span>
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-slate-700 font-serif">{f.route}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{f.day}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right column (Dynamic Quotation & Booking tool) */}
        <div className="space-y-8">
          <div className="bg-[#002B49] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#C5A059]/20 space-y-6 text-left sticky top-24">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest block">COTIZADOR AL INSTANTE</span>
              <h3 className="text-xl font-extrabold font-serif">Simular Presupuesto</h3>
              <p className="text-slate-300 text-xs">Calcula el precio final sugerido de venta (PVP) para tus clientes de manera fácil e integrada.</p>
            </div>

            {/* Travel Companions Selector */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <h4 className="text-xs font-black uppercase text-[#C5A059] tracking-wider">1. Pasajeros del viaje</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wide block">Adultos (+12)</label>
                  <select 
                    value={calcAdults}
                    onChange={(e) => setCalcAdults(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs font-bold text-white focus:outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num} className="bg-[#002B49] text-white font-bold">{num}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wide block">Niños (2-11)</label>
                  <select 
                    value={calcKids}
                    onChange={(e) => setCalcKids(parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs font-bold text-white focus:outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-[#002B49] text-white font-bold">{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* In-view Excursion selections */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="text-xs font-black uppercase text-[#C5A059] tracking-wider">2. Añadir Excursiones Opcionales</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                {excursionsData.map((exc) => {
                  const isChecked = selectedExcursions.includes(exc.id);
                  return (
                    <div 
                      key={exc.id}
                      onClick={() => toggleExcursion(exc.id)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked 
                          ? "bg-white/10 border-[#C5A059] text-white" 
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold truncate">{exc.title}</p>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{exc.adultPrice} € / pax</p>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isChecked ? "bg-[#C5A059] border-[#C5A059] text-[#002B49]" : "border-white/30"}`}>
                        {isChecked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing total result display */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-300">TOTAL ESTIMADO P.V.P:</span>
                <span className="text-3xl font-black text-[#C5A059] font-serif">{calculateTotal().toLocaleString()} €</span>
              </div>
              <p className="text-[9px] text-slate-400 leading-normal pl-1">
                *Nota: Este presupuesto tiene carácter estimativo de venta al público en base a la simulación. Consúltanos por el canal B2B para obtener las tarifas netas comisionables aplicadas para tu agencia.
              </p>
            </div>

            {/* Direct Agency Request Call Action */}
            <button 
              onClick={onEnterB2B}
              className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#002B49] font-black text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg transition-all cursor-pointer text-center"
            >
              Consultar Tarifas Netas B2B
            </button>
          </div>
        </div>

      </div>

      {/* Excursion detailed description modal popup */}
      {viewingExcursionId && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-scale-up text-left">
            {(() => {
              const exc = excursionsData.find((e) => e.id === viewingExcursionId);
              if (!exc) return null;
              return (
                <>
                  <div className="h-56 relative">
                    <img src={assetUrl(exc.image)} alt={exc.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <button 
                      onClick={() => setViewingExcursionId(null)}
                      className="absolute top-4 right-4 bg-white/25 hover:bg-white/45 text-white rounded-full p-1.5 transition-all cursor-pointer border border-white/20"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="bg-[#C5A059] text-[#002B49] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                        {exc.category}
                      </span>
                      <h4 className="text-lg font-bold font-serif mt-1">{exc.title}</h4>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{exc.detailedDesc}</p>
                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center bg-slate-50 -mx-6 -mb-6 p-6">
                      <div className="flex gap-4">
                        <p className="text-xs font-bold text-slate-500">Precio Adulto: <span className="text-[#002B49] font-black">{exc.adultPrice} €</span></p>
                        <p className="text-xs font-bold text-slate-500">Precio Niño: <span className="text-[#002B49] font-black">{exc.kidPrice} €</span></p>
                      </div>
                      <button 
                        onClick={() => {
                          if (!selectedExcursions.includes(exc.id)) {
                            setSelectedExcursions([...selectedExcursions, exc.id]);
                          }
                          setViewingExcursionId(null);
                        }}
                        className="bg-[#002B49] hover:bg-[#C5A059] text-white hover:text-[#002B49] text-[11px] font-black uppercase tracking-widest py-2 px-4 rounded-lg transition-all cursor-pointer"
                      >
                        Añadir a la simulación
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
}
