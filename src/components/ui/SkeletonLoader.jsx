import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col justify-center items-center py-20 relative">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none"></div>

      <div className="relative flex flex-col items-center gap-4 z-10">
        {/* Glowing concentric spinner */}
        <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-accent border-r-orange-accent animate-spin shadow-[0_0_20px_rgba(0,194,255,0.2)]"></div>
        
        {/* Animated Brand text loading */}
        <div className="flex flex-col items-center">
          <span className="font-poppins font-extrabold text-sm uppercase tracking-widest text-white animate-pulse">
            MARUTI HYDRAULICS
          </span>
          <span className="text-[10px] font-manrope font-semibold text-accent uppercase tracking-widest mt-1">
            Loading Engineering Environment...
          </span>
        </div>
      </div>
    </div>
  );
}
