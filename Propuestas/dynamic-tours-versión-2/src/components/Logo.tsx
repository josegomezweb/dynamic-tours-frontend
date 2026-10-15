import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: "dark" | "light";
}

export default function Logo({ className = "h-12", iconOnly = false }: LogoProps) {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={`${cleanBase}DYNAMIC-logo-oscurecido.png`}
        alt="Dynamic Tours Logo"
        className="h-full w-auto object-contain bg-transparent"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if image isn't loaded correctly (for local testing resilience)
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}
