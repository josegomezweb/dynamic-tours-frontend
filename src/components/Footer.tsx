import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-dynamic-blue flex items-center justify-center text-white font-black text-base">
                DT
              </div>
              <div className="flex items-baseline">
                <span className="text-lg font-black tracking-tight text-white">DYNAMIC</span>
                <span className="text-lg font-light tracking-wider text-dynamic-light ml-1">TOURS</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Touroperador mayorista fundado en Madrid. Especialistas en grandes viajes, cruceros por el Nilo, circuitos de media y larga distancia y operativas exclusivas para agencias de viajes minoristas de toda España.
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              <span>C.I.C.M.A. 1266 · IATA Accredited</span>
            </div>
          </div>

          {/* Col 2: Destinos Top */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Grandes Destinos</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#egipto" className="hover:text-white transition">Egipto y Cruceros Nilo</a></li>
              <li><a href="#turquia" className="hover:text-white transition">Turquía y Capadocia</a></li>
              <li><a href="#jordania" className="hover:text-white transition">Jordania y Petra</a></li>
              <li><a href="#kenia" className="hover:text-white transition">Kenia y Safaris</a></li>
              <li><a href="#japon" className="hover:text-white transition">Japón Imperial</a></li>
              <li><a href="#costarica" className="hover:text-white transition">Costa Rica Pura Vida</a></li>
            </ul>
          </div>

          {/* Col 3: Para Agencias */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Canal Minorista</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#intranet" className="hover:text-white transition">Acceso Intranet B2B</a></li>
              <li><a href="#alta" className="hover:text-white transition">Alta Nueva Agencia</a></li>
              <li><a href="#charters" className="hover:text-white transition">Cupos Charter Provincias</a></li>
              <li><a href="#grupos" className="hover:text-white transition">Departamento de Grupos</a></li>
              <li><a href="#comisiones" className="hover:text-white transition">Condiciones y Comisiones</a></li>
            </ul>
          </div>

          {/* Col 4: Contacto */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Sede Central</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-dynamic-light shrink-0 mt-0.5" />
                <span>Av. Menéndez Pelayo, 83 · 28007 Madrid</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-dynamic-light shrink-0" />
                <span>+34 915 521 443</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-dynamic-light shrink-0" />
                <span>reservas@dynamic-tours.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Dynamic Tours S.A. Todos los derechos reservados. Rediseño Frontend Fase 1 por <strong>De Nada</strong>.
          </div>
          <div className="flex gap-4">
            <a href="#aviso" className="hover:underline">Aviso Legal</a>
            <a href="#privacidad" className="hover:underline">Política de Privacidad</a>
            <a href="#cookies" className="hover:underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
