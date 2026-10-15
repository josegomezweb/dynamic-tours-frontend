import React, { useState, useEffect } from "react";
import { Lock, Phone, ShieldCheck, Sparkles, Volume2, VolumeX } from "lucide-react";

interface ScrollyHeaderProps {
  onOpenB2B: () => void;
  activeChapter: string;
}

export default function ScrollyHeader({ onOpenB2B, activeChapter }: ScrollyHeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar at the very top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#1F82D2] via-[#D4AF37] to-[#52A72B] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Luxury Header */}
      <header className="fixed top-1 left-0 right-0 z-40 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between glass-panel rounded-2xl px-5 py-3 shadow-2xl">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#1F82D2] to-[#52A72B] flex items-center justify-center font-black text-white text-base shadow-lg tracking-tighter">
                DT
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm sm:text-base tracking-wider text-white font-sans flex items-center gap-1.5">
                  DYNAMIC TOURS
                  <span className="text-[9px] bg-white/10 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-white/15 uppercase">
                    Propuesta 3
                  </span>
                </span>
                <span className="text-[10px] text-[#D4AF37] font-serif tracking-widest uppercase">
                  Turoperador Mayorista • CICMA 1948
                </span>
              </div>
            </div>
          </div>

          {/* Center: Live Scrolly Indicator */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-semibold text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">Capítulo Activo:</span>
            <span className="text-white font-bold tracking-wide uppercase font-serif text-sm">
              {activeChapter}
            </span>
          </div>

          {/* Right: Sound Cue & B2B Console Access */}
          <div className="flex items-center gap-3">
            {/* 24/7 Hotline Badge */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <Phone className="w-3.5 h-3.5 text-[#1F82D2]" />
              <span>Guardia 24h: <strong className="text-white">+34 915 521 443</strong></span>
            </div>

            {/* B2B Agency Button */}
            <button
              onClick={onOpenB2B}
              className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 sm:px-5 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Consola B2B</span>
            </button>
          </div>

        </div>
      </header>
    </>
  );
}
