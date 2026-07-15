import React from 'react';

export default function Logo({ className = "h-12", noBg = false }) {
  if (noBg) {
    return (
      <img 
        src="/LogoOG.png" 
        alt="Maruti Hydraulics Logo" 
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl px-3 py-1.5 flex items-center justify-center shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-primary/20">
      <img 
        src="/LogoOG.png" 
        alt="Maruti Hydraulics Logo" 
        className={`object-contain ${className}`}
      />
    </div>
  );
}
