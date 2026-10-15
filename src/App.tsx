import { useState, useEffect } from 'react'
import { PassportReader } from './components/PassportReader'
import { Lock, ShieldCheck, KeyRound, LogOut } from 'lucide-react'

const VALID_PASSCODES = [
  'kip2026',
  'kip-demo-2026',
  'kip-pass-sec-884f1a0e9b627d31'
]

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('kip_passport_demo_auth')
    if (saved && VALID_PASSCODES.includes(saved.trim())) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = passcode.trim()
    if (VALID_PASSCODES.includes(clean)) {
      sessionStorage.setItem('kip_passport_demo_auth', clean)
      setIsAuthenticated(true)
      setAuthError(null)
    } else {
      setAuthError('Clave de acceso incorrecta. Contacta con el equipo técnico de KIP.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('kip_passport_demo_auth')
    setIsAuthenticated(false)
    setPasscode('')
    setAuthError(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Cabecera Minimalista Solo Logo de KIP */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-kip-viajes.png"
              alt="KIP Viajes"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Pruebas KIP · Acceso Restringido</span>
            </span>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-rose-200 transition-colors ml-2"
                title="Bloquear acceso"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar sesión</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main: Gate si no está autenticado, o lector si está autenticado */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center animate-fadeIn">
            <div className="w-14 h-14 mx-auto mb-4 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Demostración con Acceso Restringido
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 mb-6">
              Este módulo de lectura y validación con IA es de uso interno exclusivo. Introduce la clave de acceso de KIP para desbloquear la demo.
            </p>

            {authError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 text-left">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Clave de acceso de la demo"
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors focus:ring-2 focus:ring-teal-500/30 focus:outline-none"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Desbloquear Demostración</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
              Seguridad KIP Viajes · Acceso controlado por token de sesión
            </div>
          </div>
        ) : (
          <PassportReader />
        )}
      </main>

      {/* Footer minimalista */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} KIP Viajes · Entorno de Demostración
      </footer>
    </div>
  )
}

export default App
