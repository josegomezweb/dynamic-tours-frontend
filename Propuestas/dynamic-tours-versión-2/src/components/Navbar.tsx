import React from "react";
import Logo from "./Logo";
import { Briefcase, User, Globe, Percent, Bell, ShieldCheck, Home as HomeIcon, Building2 } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  agencyName: string;
  agentName: string;
}

export default function Navbar({ activeTab, setActiveTab, agencyName, agentName }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo & Positioning */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
            <Logo className="h-11" />
            <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-slate-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Acceso Mayorista Autorizado
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === "home"
                  ? "bg-[#002B49] text-white shadow-md shadow-[#002B49]/10"
                  : "text-slate-600 hover:text-[#002B49] hover:bg-slate-50"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === "catalog"
                  ? "bg-[#002B49] text-white shadow-md shadow-[#002B49]/10"
                  : "text-slate-600 hover:text-[#002B49] hover:bg-slate-50"
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => setActiveTab("ai-builder")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                activeTab === "ai-builder"
                  ? "bg-[#002B49] text-white shadow-md shadow-[#002B49]/10"
                  : "text-slate-600 hover:text-[#002B49] hover:bg-slate-50"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
              </span>
              Cotizador
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === "bookings"
                  ? "bg-[#002B49] text-white shadow-md shadow-[#002B49]/10"
                  : "text-slate-600 hover:text-[#002B49] hover:bg-slate-50"
              }`}
            >
              Reservas B2B
            </button>
            <button
              onClick={() => setActiveTab("agency-portal")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "agency-portal"
                  ? "bg-[#002B49] text-white shadow-md shadow-[#002B49]/10"
                  : "text-slate-600 hover:text-[#002B49] hover:bg-slate-50"
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              Portal B2B
            </button>
          </nav>

          {/* Agency & Agent Information */}
          <div className="flex items-center gap-4">
            
            {/* Quick stats / alerts indicator */}
            <div className="relative p-2 text-slate-400 hover:text-slate-600 cursor-pointer hidden sm:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>

            <div className="flex items-center gap-3 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 px-4 py-2 rounded-xl">
              <div className="h-8 w-8 rounded-full bg-[#002B49] flex items-center justify-center text-[#C5A059] font-bold text-xs shadow-inner">
                {agentName.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[#002B49] truncate max-w-[150px]">
                  {agentName}
                </p>
                <p className="text-[10px] font-medium text-slate-400 tracking-wide truncate max-w-[150px]">
                  {agencyName}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile navigation tab-bar */}
      <div className="md:hidden flex justify-around items-center bg-white border-t border-slate-100 py-2.5 px-2">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            activeTab === "home" ? "text-[#002B49] font-bold" : "text-slate-400"
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span>Inicio</span>
        </button>
        <button
          onClick={() => setActiveTab("catalog")}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            activeTab === "catalog" ? "text-[#002B49] font-bold" : "text-slate-400"
          }`}
        >
          <Globe className="w-5 h-5" />
          <span>Catálogo</span>
        </button>
        <button
          onClick={() => setActiveTab("ai-builder")}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            activeTab === "ai-builder" ? "text-[#002B49] font-bold" : "text-slate-400"
          }`}
        >
          <div className="relative">
            <Percent className="w-5 h-5 text-[#C5A059]" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#002B49] animate-pulse"></span>
          </div>
          <span>Diseñador Exprés</span>
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            activeTab === "bookings" ? "text-[#002B49] font-bold" : "text-slate-400"
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Reservas</span>
        </button>
        <button
          onClick={() => setActiveTab("agency-portal")}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            activeTab === "agency-portal" ? "text-[#002B49] font-bold" : "text-slate-400"
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span>Portal B2B</span>
        </button>
      </div>
    </header>
  );
}
