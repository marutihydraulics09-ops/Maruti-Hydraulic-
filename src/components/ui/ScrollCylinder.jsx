import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollCylinder() {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Listen to scroll progress changes
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setPercent(Math.round(v * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Map scroll progress (0 to 1) to piston rod extension (0 to 25px translation)
  const rodY = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <div className="fixed right-3 bottom-3 md:right-6 md:bottom-6 z-50 flex flex-col items-center gap-1.5 md:gap-2 select-none pointer-events-none">
      {/* Label / Readout */}
      <div className="bg-[#080A0E]/90 backdrop-blur border border-white/10 rounded-md py-1 shadow-lg flex items-center justify-center text-center w-20 md:w-24">
        <span className="font-mono text-[8px] md:text-[9px] text-[#FF6B00] font-bold uppercase tracking-wider">
          Stroke: {percent}%
        </span>
      </div>

      {/* SVG Cylinder container */}
      <div className="relative p-1.5 md:p-2.5 bg-[#10141D]/90 backdrop-blur border border-white/10 rounded-full shadow-2xl flex items-center justify-center h-20 w-7 md:h-28 md:w-9">
        <svg viewBox="0 0 18 90" className="w-full h-full overflow-visible">
          {/* Gradients */}
          <defs>
            <linearGradient id="rod-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="barrel-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7600" />
              <stop offset="100%" stopColor="#FF6B00" />
            </linearGradient>
          </defs>

          {/* Piston Rod (Animate Y extension downwards - rendered behind the barrel to prevent gaps) */}
          <motion.g style={{ y: rodY }}>
            {/* The Rod (extends up inside the barrel) */}
            <rect x="7" y="15" width="4" height="38" fill="url(#rod-grad)" />

            {/* Rod End / Eye Mount */}
            <rect x="5" y="53" width="8" height="3" rx="0.5" fill="url(#barrel-grad)" />
            <circle cx="9" cy="56" r="2.5" fill="url(#barrel-grad)" />
            <circle cx="9" cy="56" r="1" fill="#FF7600" />
          </motion.g>

          {/* Top Mount */}
          <rect x="7" y="2" width="4" height="8" rx="1" fill="url(#barrel-grad)" />
          <circle cx="9" cy="6" r="1.5" fill="#080A0E" stroke="#FF7600" strokeWidth="0.5" />

          {/* Cylinder Barrel (Covers the retracted rod) */}
          <rect x="4" y="10" width="10" height="42" rx="1" fill="url(#barrel-grad)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

          {/* Ports */}
          <rect x="2" y="12" width="2" height="2" fill="url(#accent-grad)" />
          <rect x="2" y="46" width="2" height="2" fill="url(#accent-grad)" />

          {/* Gland Cap (Covers the rod exit point) */}
          <rect x="3" y="50" width="12" height="3" fill="url(#accent-grad)" rx="0.5" />
        </svg>
      </div>
    </div>
  );
}
