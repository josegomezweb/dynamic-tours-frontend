import React, { useState } from "react";
import { assetUrl } from "../utils/assets";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: "dark" | "light";
  classNameImg?: string;
}

export default function Logo({ className = "h-12", iconOnly = false, classNameImg = "" }: LogoProps) {
  const logoSources = [
    assetUrl("nuevo logo dynamic transparente.png"),
    assetUrl("logo_dynamic_3.png"),
    assetUrl("dynamic_logo_transparente.png"),
    assetUrl("DYNAMIC-logo-oscurecido.png"),
    assetUrl("dynamic_logo_1_ok.png")
  ];

  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  const handleImgError = () => {
    if (currentSrcIndex < logoSources.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoSources[currentSrcIndex]}
        alt="Dynamic Tours Logo"
        className={`h-full w-auto object-contain bg-transparent ${classNameImg}`}
        referrerPolicy="no-referrer"
        onError={handleImgError}
      />
    </div>
  );
}
