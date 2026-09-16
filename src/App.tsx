import { useState } from 'react'
import {
  PrototypeController,
  type Environment,
  type ViewMode,
  type Screen
} from './components/PrototypeController'
import { Navbar } from './components/Navbar'
import { HomeCatalog } from './components/HomeCatalog'
import { TripDetail } from './components/TripDetail'
import { AgencyIntranet } from './components/AgencyIntranet'
import { Footer } from './components/Footer'

export function App() {
  const [env, setEnv] = useState<Environment>('dtprueba')
  const [viewMode, setViewMode] = useState<ViewMode>('agent')
  const [screen, setScreen] = useState<Screen>('home')
  const [, setSelectedTripId] = useState<string>('egipto-joyas-nilo')

  const handleSelectTrip = (tripId: string) => {
    setSelectedTripId(tripId)
    setScreen('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigate = (newScreen: Screen) => {
    setScreen(newScreen)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-dynamic-blue selection:text-white">
      {/* 1. Interactive Prototype Toolbar */}
      <PrototypeController
        env={env}
        setEnv={(newEnv) => {
          setEnv(newEnv)
          if (newEnv === 'public') {
            setViewMode('client')
            if (screen === 'intranet') setScreen('home')
          }
        }}
        viewMode={viewMode}
        setViewMode={setViewMode}
        screen={screen}
        setScreen={handleNavigate}
      />

      {/* 2. Dynamic Navbar with Editorial Megamenu */}
      <Navbar
        env={env}
        onNavigate={handleNavigate}
      />

      {/* 3. Dynamic Screen View */}
      <main className="flex-1">
        {screen === 'home' && (
          <HomeCatalog
            env={env}
            viewMode={viewMode}
            onSelectTrip={handleSelectTrip}
            onNavigate={handleNavigate}
          />
        )}

        {screen === 'detail' && (
          <TripDetail
            env={env}
            viewMode={viewMode}
            onNavigate={handleNavigate}
          />
        )}

        {screen === 'intranet' && (
          <AgencyIntranet
            env={env}
            viewMode={viewMode}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  )
}

export default App
