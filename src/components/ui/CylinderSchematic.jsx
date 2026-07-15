import React from 'react';
import { motion } from 'framer-motion';

/**
 * CylinderSchematic Component
 * Renders an enhanced dynamic, interactive industrial SVG blueprint of a hydraulic cylinder.
 * Responsive to: type, bore, rod, stroke, mounting, cushioning, pressure, isAnimating.
 * Supports: click callbacks to trigger form updates.
 */
export default function CylinderSchematic({
  type = 'TR',
  bore = 125,
  rod = 70,
  stroke = 500,
  mounting = 'C',
  cushioning = '3',
  pressure = 200,
  isAnimating = true,
  onRearMountClick,
  onFrontMountClick,
  onSizesClick,
  onCushionClick,
  onTypeClick
}) {
  // Enhanced wide scale ranges for highly obvious visual feedback
  // Bore maps 40-300 to height 45-130px (more than 2.8x scaling!)
  const H_barrel = 45 + ((bore - 40) / 260) * 85;
  
  // Rod maps 25-200 to height 16-80px. Kept strictly smaller than barrel height.
  const rawRodHeight = 16 + ((rod - 25) / 175) * 64;
  const H_rod = Math.min(rawRodHeight, H_barrel - 16);
  
  // Stroke maps up to 2000 to slide offset (max 100px)
  const strokeMultiplier = stroke / 2000;
  const maxSlideOffset = 10 + strokeMultiplier * 90;

  // Cylinder coordinates & base sizes
  const Y_center = 150;
  const X_barrel_start = 110;
  const W_barrel = 190;
  const X_barrel_end = X_barrel_start + W_barrel;

  // High pressure conditional wall thickness
  const isHighPressure = pressure === 345;
  const barrelStrokeWidth = isHighPressure ? 4.5 : 2;
  const barrelGlowColor = isHighPressure ? "rgba(255, 81, 0, 0.45)" : "rgba(255, 107, 0, 0.15)";

  // Needle Valve Cushioning visual renderer
  const renderCushionNeedle = (x, y) => {
    return (
      <g className="cursor-pointer" onClick={onCushionClick}>
        {/* Brass needle valve adjuster screw */}
        <rect x={x - 3} y={y - 8} width="6" height="5" fill="#D4AF37" stroke="#9A7B1C" strokeWidth="0.5" />
        <rect x={x - 1.5} y={y - 12} width="3" height="4" fill="#D4AF37" />
        <line x1={x - 4} y1={y - 12} x2={x + 4} y2={y - 12} stroke="#D4AF37" strokeWidth="1" />
      </g>
    );
  };

  // Mounting calculations and SVG path renderers
  const renderRearMount = () => {
    return (
      <g 
        className="cursor-pointer hover:opacity-85 transition-opacity" 
        onClick={onRearMountClick}
        title="Rear Mount options - Click to edit"
      >
        {(() => {
          switch (mounting) {
            case 'C': // Fixed Clevis
              return (
                <g>
                  {/* Clevis connector block */}
                  <rect x="70" y={Y_center - 18} width="40" height="36" fill="#0D1117" stroke="#FF6B00" strokeWidth="2" rx="2" />
                  {/* Pin eyes */}
                  <circle cx="70" cy={Y_center} r="18" fill="#0D1117" stroke="#FF6B00" strokeWidth="2" />
                  <circle cx="70" cy={Y_center} r="8" fill="#1C2333" stroke="#FF6B00" strokeWidth="1.5" />
                  <line x1="70" y1={Y_center - 8} x2="70" y2={Y_center + 8} stroke="#FF6B00" strokeWidth="0.5" opacity="0.5" />
                </g>
              );
            case 'D': // Fixed Eye
              return (
                <g>
                  <path d={`M 110 ${Y_center - 16} L 70 ${Y_center - 16} A 16 16 0 0 0 70 ${Y_center + 16} L 110 ${Y_center + 16} Z`} fill="#0D1117" stroke="#FF6B00" strokeWidth="2" />
                  <circle cx="70" cy={Y_center} r="7" fill="#1C2333" stroke="#FF6B00" strokeWidth="1.5" />
                </g>
              );
            case 'E': // Fixed Eye + Spherical bearing
              return (
                <g>
                  <path d={`M 110 ${Y_center - 18} L 70 ${Y_center - 18} A 18 18 0 0 0 70 ${Y_center + 18} L 110 ${Y_center + 18} Z`} fill="#0D1117" stroke="#FF6B00" strokeWidth="2" />
                  {/* Bearing outer ring */}
                  <circle cx="70" cy={Y_center} r="12" fill="none" stroke="#FF8C00" strokeWidth="1.5" />
                  {/* Spherical brass insert */}
                  <circle cx="70" cy={Y_center} r="7.5" fill="url(#bronzeGrad)" stroke="#FF6B00" strokeWidth="1" />
                  <circle cx="70" cy={Y_center} r="5" fill="#0D1117" />
                </g>
              );
            case 'B': // Rear Flange (only for TR, MT)
              const isRearFlangeAllowed = type === 'TR' || type === 'MT';
              if (!isRearFlangeAllowed) return null;
              const flangeHeightB = H_barrel + 40;
              return (
                <g>
                  {/* Flange plate */}
                  <rect x="110" y={Y_center - flangeHeightB/2} width="16" height={flangeHeightB} fill="#0D1117" stroke="#FF6B00" strokeWidth="2" rx="1" />
                  {/* Bolt holes */}
                  <circle cx="118" cy={Y_center - flangeHeightB/2 + 10} r="4.5" fill="none" stroke="#FF6B00" strokeWidth="1.5" />
                  <circle cx="118" cy={Y_center + flangeHeightB/2 - 10} r="4.5" fill="none" stroke="#FF6B00" strokeWidth="1.5" />
                </g>
              );
            case 'X': // Basic Mounting
            default:
              return (
                <rect x="100" y={Y_center - H_barrel/2} width="10" height={H_barrel} fill="#0D1117" stroke="#FF6B00" strokeWidth="2" rx="1" />
              );
          }
        })()}
      </g>
    );
  };

  const renderFrontMount = () => {
    // Front Flange (Mounting style 'A') is placed at the Gland end
    const isFrontFlangeAllowed = (type === 'TR' || type === 'MT') && mounting === 'A';
    if (!isFrontFlangeAllowed) return null;
    const flangeHeightA = H_barrel + 40;
    return (
      <g 
        className="cursor-pointer hover:opacity-85" 
        onClick={onFrontMountClick}
        title="Front Flange options - Click to edit"
      >
        {/* Flange Plate */}
        <rect x={X_barrel_end - 20} y={Y_center - flangeHeightA/2} width="16" height={flangeHeightA} fill="#0D1117" stroke="#FF6B00" strokeWidth="2" rx="1" />
        {/* Bolt holes */}
        <circle cx={X_barrel_end - 12} cy={Y_center - flangeHeightA/2 + 10} r="4.5" fill="none" stroke="#FF6B00" strokeWidth="1.5" />
        <circle cx={X_barrel_end - 12} cy={Y_center + flangeHeightA/2 - 10} r="4.5" fill="none" stroke="#FF6B00" strokeWidth="1.5" />
      </g>
    );
  };

  // Cylinder types specific overlays (Tie-rod, Welded, Mill-type, Telescopic)
  const renderCylinderTypeDetails = () => {
    switch (type) {
      case 'TR': // Tie-Rod
        const trYOffset = H_barrel/2 + 6;
        return (
          <g className="cursor-pointer" onClick={onTypeClick} title="Tie Rod Details - Click to edit type">
            {/* Top Tie Rod */}
            <line x1={X_barrel_start - 5} y1={Y_center - trYOffset} x2={X_barrel_end + 5} y2={Y_center - trYOffset} stroke="#FF6B00" strokeWidth="2" opacity="0.85" />
            <rect x={X_barrel_start - 9} y={Y_center - trYOffset - 3.5} width="8" height="7" fill="#0D1117" stroke="#FF6B00" strokeWidth="1.5" />
            <rect x={X_barrel_end + 1} y={Y_center - trYOffset - 3.5} width="8" height="7" fill="#0D1117" stroke="#FF6B00" strokeWidth="1.5" />

            {/* Bottom Tie Rod */}
            <line x1={X_barrel_start - 5} y1={Y_center + trYOffset} x2={X_barrel_end + 5} y2={Y_center + trYOffset} stroke="#FF6B00" strokeWidth="2" opacity="0.85" />
            <rect x={X_barrel_start - 9} y={Y_center + trYOffset - 3.5} width="8" height="7" fill="#0D1117" stroke="#FF6B00" strokeWidth="1.5" />
            <rect x={X_barrel_end + 1} y={Y_center + trYOffset - 3.5} width="8" height="7" fill="#0D1117" stroke="#FF6B00" strokeWidth="1.5" />
          </g>
        );
      case 'WL': // Welded Type
        return (
          <g className="cursor-pointer" onClick={onTypeClick} title="Welded seams - Click to edit type">
            {/* Welded cap fillets (rear and front cap welds) */}
            <path d={`M ${X_barrel_start} ${Y_center - H_barrel/2} A 6 6 0 0 1 ${X_barrel_start + 10} ${Y_center - H_barrel/2 - 6}`} fill="none" stroke="#FF6B00" strokeWidth="2.5" opacity="0.95" />
            <path d={`M ${X_barrel_start} ${Y_center + H_barrel/2} A 6 6 0 0 0 ${X_barrel_start + 10} ${Y_center + H_barrel/2 + 6}`} fill="none" stroke="#FF6B00" strokeWidth="2.5" opacity="0.95" />
            <path d={`M ${X_barrel_end} ${Y_center - H_barrel/2} A 6 6 0 0 0 ${X_barrel_end - 10} ${Y_center - H_barrel/2 - 6}`} fill="none" stroke="#FF6B00" strokeWidth="2.5" opacity="0.95" />
            <path d={`M ${X_barrel_end} ${Y_center + H_barrel/2} A 6 6 0 0 1 ${X_barrel_end - 10} ${Y_center + H_barrel/2 + 6}`} fill="none" stroke="#FF6B00" strokeWidth="2.5" opacity="0.95" />
            <text x={X_barrel_start + W_barrel/2} y={Y_center + H_barrel/2 + 16} fill="#FF8C00" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.6">PERMANENT HEAVY WELD FILLET</text>
          </g>
        );
      case 'MT': // Mill-Type (Bolted Flange caps)
        const mtFlangeY = H_barrel/2 + 10;
        return (
          <g className="cursor-pointer" onClick={onTypeClick} title="Mill bolted flange - Click to edit type">
            {/* Heavy bolted flanges */}
            <rect x={X_barrel_start} y={Y_center - mtFlangeY} width="16" height={mtFlangeY * 2} fill="#0D1117" stroke="#FF6B00" strokeWidth="2" rx="1" />
            <rect x={X_barrel_end - 16} y={Y_center - mtFlangeY} width="16" height={mtFlangeY * 2} fill="#0D1117" stroke="#FF6B00" strokeWidth="2" rx="1" />
            {/* Flange bolt heads */}
            <rect x={X_barrel_start - 4} y={Y_center - mtFlangeY + 4} width="4" height="6" fill="#FF8C00" />
            <rect x={X_barrel_start - 4} y={Y_center + mtFlangeY - 10} width="4" height="6" fill="#FF8C00" />
            <rect x={X_barrel_end} y={Y_center - mtFlangeY + 4} width="4" height="6" fill="#FF8C00" />
            <rect x={X_barrel_end} y={Y_center + mtFlangeY - 10} width="4" height="6" fill="#FF8C00" />
          </g>
        );
      case 'TL': // Telescopic (Multi-Stage)
        return (
          <g className="cursor-pointer" onClick={onTypeClick} title="Nested stages - Click to edit type">
            <line x1={X_barrel_start + 80} y1={Y_center - H_barrel/2} x2={X_barrel_start + 80} y2={Y_center + H_barrel/2} stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />
            <line x1={X_barrel_start + 160} y1={Y_center - H_barrel/2} x2={X_barrel_start + 160} y2={Y_center + H_barrel/2} stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />
            <text x={X_barrel_start + W_barrel/2} y={Y_center + H_barrel/2 + 16} fill="#FF8C00" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.6">MULTI-STAGE NESTED STRUCTURE</text>
          </g>
        );
      case 'CS': // Custom Design
      default:
        return (
          <g className="cursor-pointer" onClick={onTypeClick} title="Integrated accessories - Click to edit type">
            <rect x={X_barrel_start + 45} y={Y_center - H_barrel/2 - 25} width="22" height="15" fill="#0D1117" stroke="#FF5100" strokeWidth="1.5" />
            <line x1={X_barrel_start + 56} y1={Y_center - H_barrel/2 - 10} x2={X_barrel_start + 56} y2={Y_center - H_barrel/2} stroke="#FF5100" strokeWidth="1" />
            <text x={X_barrel_start + W_barrel/2} y={Y_center + H_barrel/2 + 16} fill="#FF8C00" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.6">INTEGRATED LVDT SENSOR</text>
          </g>
        );
    }
  };

  // Render Port Fittings with Cushioning highlights and needle valve detail
  const renderPorts = () => {
    const isRearCushioned = cushioning === '2' || cushioning === '3';
    const isFrontCushioned = cushioning === '1' || cushioning === '3';
    return (
      <g 
        className="cursor-pointer hover:opacity-85" 
        onClick={onCushionClick}
        title="Fluid Ports & Cushioning - Click to edit"
      >
        {/* Rear Port */}
        <rect x={X_barrel_start + 20} y={Y_center - H_barrel/2 - 12} width="16" height="12" fill="#0D1117" stroke="#FF6B00" strokeWidth="1.5" />
        <circle cx={X_barrel_start + 28} cy={Y_center - H_barrel/2 - 18} r="5.5" fill={isRearCushioned ? "#FF5100" : "#FF8C00"} className="glow-anim" />
        {isRearCushioned ? (
          <>
            <circle cx={X_barrel_start + 28} cy={Y_center - H_barrel/2 - 18} r="2.5" fill="#FFFFFF" />
            {renderCushionNeedle(X_barrel_start + 28, Y_center - H_barrel/2 - 18)}
          </>
        ) : (
          <circle cx={X_barrel_start + 28} cy={Y_center - H_barrel/2 - 18} r="2" fill="#0D1117" />
        )}

        {/* Front Port */}
        <rect x={X_barrel_end - 36} y={Y_center - H_barrel/2 - 12} width="16" height="12" fill="#0D1117" stroke="#FF6B00" strokeWidth="1.5" />
        <circle cx={X_barrel_end - 28} cy={Y_center - H_barrel/2 - 18} r="5.5" fill={isFrontCushioned ? "#FF5100" : "#FF8C00"} className="glow-anim" />
        {isFrontCushioned ? (
          <>
            <circle cx={X_barrel_end - 28} cy={Y_center - H_barrel/2 - 18} r="2.5" fill="#FFFFFF" />
            {renderCushionNeedle(X_barrel_end - 28, Y_center - H_barrel/2 - 18)}
          </>
        ) : (
          <circle cx={X_barrel_end - 28} cy={Y_center - H_barrel/2 - 18} r="2" fill="#0D1117" />
        )}
      </g>
    );
  };

  // Render Sliding Assembly (Piston and Rod/Stages)
  const renderSlidingAssembly = () => {
    const transformStyle = isAnimating ? {} : { transform: `translateX(${maxSlideOffset}px)` };
    const motionClass = isAnimating ? 'rod-anim' : '';

    if (type === 'TL') {
      const motionClass1 = isAnimating ? 'rod-anim-1' : '';
      const motionClass2 = isAnimating ? 'rod-anim-2' : '';
      const motionClass3 = isAnimating ? 'rod-anim-3' : '';
      
      const transformStyle1 = isAnimating ? {} : { transform: `translateX(${maxSlideOffset * 0.33}px)` };
      const transformStyle2 = isAnimating ? {} : { transform: `translateX(${maxSlideOffset * 0.33}px)` };
      const transformStyle3 = isAnimating ? {} : { transform: `translateX(${maxSlideOffset * 0.34}px)` };

      // Telescopic nested stages - scaled down slightly to fit viewBox
      return (
        <g 
          className={`${motionClass1} cursor-pointer`} 
          style={transformStyle1}
          onClick={onSizesClick}
          title="Nested stages - Click to edit sizes"
        >
          {/* Stage 1 */}
          <rect x={X_barrel_start + 96} y={Y_center - H_barrel/2 + 5} width="100" height={H_barrel - 10} fill="#0D1117" stroke="#FF6B00" strokeWidth="1.5" rx="1" />
          <rect x={X_barrel_start + 98} y={Y_center - H_barrel/2 + 8} width="96" height={H_barrel - 16} fill="url(#metalGrad)" stroke="none" opacity="0.1" />

          {/* Stage 2 */}
          <g className={motionClass2} style={transformStyle2}>
            <rect x={X_barrel_start + 160} y={Y_center - H_barrel/2 + 12} width="88" height={H_barrel - 24} fill="#0D1117" stroke="#FF8C00" strokeWidth="1.5" rx="1" />
            
            {/* Stage 3 / Final Rod */}
            <g className={motionClass3} style={transformStyle3}>
              <rect x={X_barrel_start + 208} y={Y_center - H_rod/2} width="88" height={H_rod} fill="#0D1117" stroke="#FF6B00" strokeWidth="2" rx="1" />
              <rect x={X_barrel_start + 210} y={Y_center - H_rod/2 + 2} width="84" height={H_rod - 4} fill="url(#rodGrad)" stroke="none" opacity="0.25" />
              
              {/* Rod Eye Mount */}
              <g transform="translate(16, 0)">
                <rect x={X_barrel_end + 8} y={Y_center - 12} width="12" height="24" rx="1" fill="#0D1117" stroke="#FF6B00" strokeWidth="2" />
                <circle cx={X_barrel_end + 30} cy={Y_center} r="11" fill="none" stroke="#FF6B00" strokeWidth="2" />
                <circle cx={X_barrel_end + 30} cy={Y_center} r="5" fill="#1C2333" stroke="#FF6B00" strokeWidth="1.5" />
                <path d={`M ${X_barrel_end + 20} -8 L ${X_barrel_end + 8} -8 L ${X_barrel_end + 8} 8 L ${X_barrel_end + 20} 8`} fill="none" stroke="#FF6B00" strokeWidth="1.5" transform={`translate(0, ${Y_center})`} />
              </g>
            </g>
          </g>
        </g>
      );
    }

    // Standard single-stage sliding assembly - scaled down slightly to fit viewBox
    const pistonHeight = H_barrel - 4;
    return (
      <g 
        className={`${motionClass} cursor-pointer hover:opacity-95`} 
        style={transformStyle}
        onClick={onSizesClick}
        title="Piston & Rod - Click to edit sizes"
      >
        {/* Piston inside barrel (ghosted dashed line) */}
        <rect x={X_barrel_start + 64} y={Y_center - pistonHeight/2} width="20" height={pistonHeight} fill="#0D1117" stroke="#FF5100" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.65" rx="2" />
        <line x1={X_barrel_start + 74} y1={Y_center - pistonHeight/2} x2={X_barrel_start + 74} y2={Y_center + pistonHeight/2} stroke="#FF5100" strokeWidth="1" strokeDasharray="2,2" opacity="0.4" />

        {/* Solid Piston Rod */}
        <rect x={X_barrel_start + 84} y={Y_center - H_rod/2} width="190" height={H_rod} fill="#0D1117" stroke="#FF6B00" strokeWidth="2" rx="1" />
        <rect x={X_barrel_start + 86} y={Y_center - H_rod/2 + 2} width="186" height={H_rod - 4} fill="url(#rodGrad)" stroke="none" opacity="0.25" />

        {/* Rod Eye Clevis */}
        <g transform="translate(10, 0)">
          <rect x={X_barrel_end + 12} y={Y_center - 14} width="14" height="28" rx="1" fill="#0D1117" stroke="#FF6B00" strokeWidth="2" />
          <circle cx={X_barrel_end + 34} cy={Y_center} r="12" fill="none" stroke="#FF6B00" strokeWidth="2" />
          <circle cx={X_barrel_end + 34} cy={Y_center} r="5.5" fill="#1C2333" stroke="#FF6B00" strokeWidth="1.5" />
          <path d={`M ${X_barrel_end + 23} -9 L ${X_barrel_end + 12} -9 L ${X_barrel_end + 12} 9 L ${X_barrel_end + 23} 9`} fill="none" stroke="#FF6B00" strokeWidth="1.5" transform={`translate(0, ${Y_center})`} />
        </g>
      </g>
    );
  };

  return (
    <div className="w-full max-w-[540px] aspect-[4/3] relative flex items-center justify-center">
      {/* Blueprint grid lines behind the SVG */}
      <div className="absolute inset-0 bg-[#0B0F19]/90 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 engineering-grid opacity-10"></div>
        {/* Dynamic high pressure background sweep glow */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none" 
          style={{ 
            background: `radial-gradient(circle at center, ${barrelGlowColor} 0%, transparent 65%)`,
            opacity: isHighPressure ? 0.9 : 0.4
          }}
        ></div>
      </div>
      
      <svg viewBox="0 0 540 300" className="w-full h-full relative z-10 drop-shadow-[0_0_25px_rgba(255,107,0,0.12)]">
        {/* Style definitions for animations */}
        <style>{`
          @keyframes rodSlideAnimation {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(${maxSlideOffset}px); }
          }
          @keyframes rodSlideAnimation1 {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(${maxSlideOffset * 0.33}px); }
          }
          @keyframes rodSlideAnimation2 {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(${maxSlideOffset * 0.33}px); }
          }
          @keyframes rodSlideAnimation3 {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(${maxSlideOffset * 0.34}px); }
          }
          @keyframes glowPulseAnimation {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.85; }
          }
          .rod-anim {
            animation: rodSlideAnimation 6s ease-in-out infinite;
          }
          .rod-anim-1 {
            animation: rodSlideAnimation1 6s ease-in-out infinite;
          }
          .rod-anim-2 {
            animation: rodSlideAnimation2 6s ease-in-out infinite;
          }
          .rod-anim-3 {
            animation: rodSlideAnimation3 6s ease-in-out infinite;
          }
          .glow-anim {
            animation: glowPulseAnimation 2s ease-in-out infinite;
          }
        `}</style>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="rodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#FF6B00" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#FF6B00" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CD7F32" />
            <stop offset="50%" stopColor="#E5A93C" />
            <stop offset="100%" stopColor="#8B5A2B" />
          </linearGradient>
        </defs>

        {/* Technical Axis markings */}
        <line x1="20" y1={Y_center} x2="520" y2={Y_center} stroke="#FF6B00" strokeWidth="0.5" strokeDasharray="6,4" opacity="0.2" />
        <line x1={X_barrel_start} y1="50" x2={X_barrel_start} y2="250" stroke="#FF6B00" strokeWidth="0.5" strokeDasharray="6,4" opacity="0.2" />
        <line x1={X_barrel_end} y1="50" x2={X_barrel_end} y2="250" stroke="#FF6B00" strokeWidth="0.5" strokeDasharray="6,4" opacity="0.2" />

        {/* Dimension markings - Stroke */}
        <motion.path 
          d={`M ${X_barrel_start} 45 L ${X_barrel_start} 35 M ${X_barrel_end} 45 L ${X_barrel_end} 35 M ${X_barrel_start} 40 L ${X_barrel_end} 40`} 
          stroke="#FF6B00" strokeWidth="1" opacity="0.55" fill="none"
          className="cursor-pointer"
          onClick={onSizesClick}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <text 
          x={(X_barrel_start + X_barrel_end) / 2} y="32" 
          fill="#FF8C00" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold" opacity="0.85"
          className="cursor-pointer"
          onClick={onSizesClick}
          title="Click to edit stroke"
        >
          STROKE: {stroke}mm
        </text>

        {/* Rear Mount caps and options */}
        {renderRearMount()}

        {/* Sliding Piston & Rod assembly */}
        {renderSlidingAssembly()}

        {/* Cylinder Barrel Main body (Double border for High Pressure) */}
        <g className="cursor-pointer" onClick={onTypeClick} title="Cylinder Barrel - Click to edit type">
          {/* Main barrel structure */}
          <motion.rect 
            x={X_barrel_start} 
            y={Y_center - H_barrel/2} 
            width={W_barrel} 
            height={H_barrel} 
            rx="2" 
            fill="#0D1117" 
            stroke={isHighPressure ? "#FF3B00" : "#FF6B00"} 
            strokeWidth={barrelStrokeWidth} 
            className="transition-all duration-300"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
          />
          {/* Double wall interior line rendering for high pressure indicator */}
          {isHighPressure && (
            <rect 
              x={X_barrel_start + 4} 
              y={Y_center - H_barrel/2 + 4} 
              width={W_barrel - 8} 
              height={H_barrel - 8} 
              rx="1" 
              fill="none" 
              stroke="#FF5100" 
              strokeWidth="1.5" 
              strokeDasharray="4,2" 
              opacity="0.7"
            />
          )}
          <rect x={X_barrel_start + 4} y={Y_center - H_barrel/2 + 4} width={W_barrel - 8} height={H_barrel - 8} rx="1" fill="url(#metalGrad)" stroke="none" opacity="0.18" />
        </g>

        {/* Front Mount / Gland structures */}
        {renderFrontMount()}

        {/* Front Gland End cap collar */}
        <motion.rect 
          x={X_barrel_end - 15} y={Y_center - H_barrel/2} width="15" height={H_barrel} rx="1" fill="#0D1117" stroke="#FF6B00" strokeWidth="2" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
        />

        {/* Cylinder Types additions */}
        {renderCylinderTypeDetails()}

        {/* Port Fittings */}
        {renderPorts()}

        {/* Technical text annotations overlays */}
        <g opacity="0.75" fontSize="8" fontFamily="monospace" fill="#FF8C00" fontWeight="bold">
          <text 
            x="30" y="270" textAnchor="start" 
            className="cursor-pointer" onClick={onSizesClick}
            fill={isHighPressure ? "#FF3B00" : "#FF8C00"}
          >
            SYS.OP: {pressure} BAR
          </text>
          <text x="160" y="270" textAnchor="middle" className="cursor-pointer" onClick={onSizesClick}>BORE ID: Ø{bore}mm</text>
          <text x="320" y="270" textAnchor="middle" className="cursor-pointer" onClick={onSizesClick}>ROD OD: Ø{rod}mm</text>
          <text x="510" y="270" textAnchor="end" fill={isHighPressure ? "#FF3B00" : "#FF5100"} className="glow-anim">
            {isAnimating ? 'STATUS: DYNAMIC SIMULATION' : 'STATUS: SPECIFICATION STATIC'}
          </text>
        </g>
      </svg>
    </div>
  );
}
