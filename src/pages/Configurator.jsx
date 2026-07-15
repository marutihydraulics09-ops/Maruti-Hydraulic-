import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Activity, ShieldAlert, Sparkles, ArrowRight, ArrowLeft, Play, Pause,
  Info, MessageSquare, Wrench, ShieldCheck
} from 'lucide-react';
import CylinderSchematic from '../components/ui/CylinderSchematic';
import SEOHeader from '../components/common/SEOHeader';
import { toast } from 'react-toastify';

// Detailed descriptions for Cylinder Types
const typeDetails = {
  TR: {
    name: "Tie-rod type (ISO 6020/2)",
    desc: "Both caps connected with four high-tensile steel tie rods. Offers superior structural strength, even stress distribution, and easy field maintenance.",
    standards: "Conforms to ISO 6020/2 mounting specifications. Interchangeable globally.",
    pressureLimit: "200 Bar (345 Bar special case)",
    boreRange: "40 to 300 mm",
    rodRange: "25 to 200 mm"
  },
  WL: {
    name: "Welded type",
    desc: "Seamless tube and heavy steel end caps are joined permanently with certified welding. Eliminates tie rods, reducing overall footprint for tight machinery spaces.",
    standards: "Designed for heavy mobile equipment, earthmovers, and high vibration.",
    pressureLimit: "200 Bar (345 Bar special case)",
    boreRange: "40 to 300 mm",
    rodRange: "25 to 200 mm"
  },
  MT: {
    name: "Mill type",
    desc: "Features heavy-duty bolted flange caps instead of tie rods. Designed to survive extreme shock loading, primary steel rolling mills, and continuous 24/7 duty.",
    standards: "Standard heavy metal flange pattern with premium high-temp Viton sealing.",
    pressureLimit: "200 Bar (345 Bar request)",
    boreRange: "40 to 300 mm",
    rodRange: "25 to 200 mm"
  },
  TL: {
    name: "Telescopic type",
    desc: "Multi-stage linear actuator with a series of nested steel tubes (stages) that extend sequentially. Delivers ultra-long strokes from a tiny retracted envelope.",
    standards: "Custom staging layouts, commonly 2 to 5 stages, precision ground.",
    pressureLimit: "160 to 200 Bar working pressure",
    boreRange: "Staged nested sleeves",
    rodRange: "Staged nested sleeves"
  },
  CS: {
    name: "Custom design",
    desc: "Bespoke engineering solutions with specialized mounts, built-in linear transducers (LVDT sensors), custom manifolds, and integrated safety valve blocks.",
    standards: "Tailor-made layouts matching special client specifications.",
    pressureLimit: "Up to 345 Bar",
    boreRange: "Custom specified",
    rodRange: "Custom specified"
  }
};

// Detailed descriptions for Mounting Styles
const mountingDetails = {
  A: {
    name: "Front flange",
    desc: "Cylinder mounting on front flange with high-tensile bolting. Distributes load axially during push cycles.",
    restriction: "Only available for Tie-rod (TR) and Mill-type (MT) cylinders."
  },
  B: {
    name: "Rear flange",
    desc: "Cylinder mounting on rear flange with high-tensile bolting. Distributes load axially during pull cycles.",
    restriction: "Only available for Tie-rod (TR) and Mill-type (MT) cylinders."
  },
  X: {
    name: "Basic mounting",
    desc: "No special cap extensions or plates. Mounted using the standard cylinder body ends or direct threads.",
    restriction: "Available for all cylinder types."
  },
  C: {
    name: "Fixed clevis",
    desc: "Rear cap clevis bracket fork with a pivot pin. Permits pivoting rotation in a single plane to prevent bending stress.",
    restriction: "Available for all cylinder types."
  },
  D: {
    name: "Fixed eye",
    desc: "Rear cap rounded lug cylinder eye with a center pivot pin hole. Allows rotational freedom in a single alignment plane.",
    restriction: "Available for all cylinder types."
  },
  E: {
    name: "Fixed eye + spherical bearing / gunmetal bush",
    desc: "Rear cap eye fitted with a spherical bearing or bronze bush. Compensates for lateral misalignment or cylinder frame flexing.",
    restriction: "Available for all cylinder types."
  }
};

// Detailed descriptions for Cushioning options
const cushioningDetails = {
  0: {
    name: "None",
    desc: "No deceleration cushioning at stroke limits. External limit stops or throttling required."
  },
  1: {
    name: "Front only",
    desc: "Integrated throttling cushion at the front cap (exit end) to decelerate the piston rod before full extension."
  },
  2: {
    name: "Rear only",
    desc: "Integrated throttling cushion at the rear cap (base end) to decelerate the piston rod before full retraction."
  },
  3: {
    name: "Front and rear",
    desc: "Throttling cushions integrated at both ends of the cylinder for double-sided shock deceleration."
  }
};

// Standard size lists
const standardBoreSizes = [40, 50, 63, 80, 100, 125, 160, 200, 250, 300];
const standardRodSizes = [25, 30, 35, 40, 45, 50, 56, 63, 70, 80, 90, 100, 110, 125, 140, 160, 180, 200];

// Standard Bore-Rod Recommended pairings
const recommendedRodPairs = {
  40: [25],
  50: [28, 32, 36],
  63: [36, 40, 45],
  80: [45, 50, 56],
  100: [56, 63, 70],
  125: [70, 80, 90],
  160: [90, 100, 110],
  200: [110, 125, 140],
  250: [140, 160, 180],
  300: [180, 200]
};

export default function Configurator() {
  // Configurator states
  const [type, setType] = useState('TR');
  const [bore, setBore] = useState(125);
  const [rod, setRod] = useState(70);
  const [stroke, setStroke] = useState(500);
  const [strokeInput, setStrokeInput] = useState('500');
  const [pressure, setPressure] = useState(200);
  const [mounting, setMounting] = useState('C');
  const [cushioning, setCushioning] = useState('3');

  // Active Tab state ('type' | 'dimensions' | 'mounting')
  const [activeTab, setActiveTab] = useState('type');

  // Animation / simulation state
  const [isAnimating, setIsAnimating] = useState(true);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Ref to tabs scroll anchor
  const tabsAnchorRef = useRef(null);

  // Enforce rod constraint: rod size must be less than bore size
  useEffect(() => {
    if (rod >= bore) {
      const validRods = standardRodSizes.filter(r => r < bore);
      if (validRods.length > 0) {
        const defaultRod = validRods[validRods.length - 1];
        setRod(defaultRod);
      }
    }
  }, [bore, rod]);

  // Enforce mounting constraint: front/rear flange ('A'/'B') only allowed on 'TR' or 'MT'
  useEffect(() => {
    const isFlangeAllowed = type === 'TR' || type === 'MT';
    if (!isFlangeAllowed && (mounting === 'A' || mounting === 'B')) {
      setMounting('C'); // Fallback to clevis
      toast.warn("Flange Restricted: Switched to Clevis (C)");
    }
  }, [type, mounting]);

  // Handle stroke inputs
  const handleStrokeInputChange = (e) => {
    const val = e.target.value;
    setStrokeInput(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 25 && parsed <= 2000) {
      setStroke(parsed);
    }
  };

  const handleStrokeInputBlur = () => {
    const parsed = parseInt(strokeInput, 10);
    if (isNaN(parsed) || parsed < 25) {
      setStroke(25);
      setStrokeInput('25');
    } else if (parsed > 2000) {
      setStroke(2000);
      setStrokeInput('2000');
    } else {
      setStroke(parsed);
      setStrokeInput(parsed.toString());
    }
  };

  const handleStrokeSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setStroke(val);
    setStrokeInput(val.toString());
  };

  // Generated Ordering Code
  const orderingCode = `MH-${type}-${bore}/${rod}-${stroke}-${pressure}-${mounting}-${cushioning}`;

  // Pre-filled WhatsApp link
  const getWhatsAppLink = () => {
    const message = `Hello Maruti Hydraulics team, I would like to request a technical quote for a custom cylinder layout based on my configured parameters.

*Cylinder Configuration Code:*
${orderingCode}

*Technical Specs:*
- Cylinder Type: ${typeDetails[type].name}
- Bore Diameter: ${bore} mm
- Rod Diameter: ${rod} mm
- Stroke Length: ${stroke} mm
- Operating Pressure: ${pressure} Bar
- Mounting Style: ${mountingDetails[mounting].name}
- Cushioning Level: ${cushioningDetails[cushioning].name}

Please review the drawing design stages and provide availability details.`;

    return `https://wa.me/919737113699?text=${encodeURIComponent(message)}`;
  };

  // Decipher description for the hovered segment
  const getSegmentExplanation = () => {
    switch (hoveredSegment) {
      case 'company':
        return { title: "Company Code [MH]", desc: "MH designates Maruti Hydraulics as the primary manufacturer and designer." };
      case 'type':
        return { title: `Cylinder Type [${type}]`, desc: `${typeDetails[type].name}. ${typeDetails[type].desc}` };
      case 'sizes':
        return { title: `Bore / Rod Ratio [${bore}/${rod}]`, desc: `Specified with an internal bore diameter of Ø${bore}mm and a piston rod outer diameter of Ø${rod}mm.` };
      case 'stroke':
        return { title: `Stroke Travel [${stroke}]`, desc: `Nominal travel limits set to ${stroke}mm of stroke extension.` };
      case 'pressure':
        return { title: `Operating Pressure [${pressure}]`, desc: `Configured to safely hold hydraulic operating pressures up to ${pressure} Bar (High pressure layout renders heavier cylinder walls).` };
      case 'mounting':
        return { title: `Mounting Style [${mounting}]`, desc: `${mountingDetails[mounting].name}. ${mountingDetails[mounting].desc}` };
      case 'cushioning':
        return { title: `End Cushioning [${cushioning}]`, desc: `${cushioningDetails[cushioning].name}. ${cushioningDetails[cushioning].desc}` };
      default:
        return { title: "Ordering Code Decoder", desc: "Hover over different segments of the ordering code above to decode standard Maruti Hydraulics engineering specifications." };
    }
  };

  const currentExplanation = getSegmentExplanation();

  // Helper to scroll view to tabs section
  const scrollToTabs = () => {
    if (tabsAnchorRef.current) {
      tabsAnchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Hotspot Click Handlers to change tabs dynamically
  const handleTypeClick = () => {
    setActiveTab('type');
    scrollToTabs();
    toast.info("Tab: Cylinder Type");
  };

  const handleSizesClick = () => {
    setActiveTab('dimensions');
    scrollToTabs();
    toast.info("Tab: Sizing Envelope");
  };

  const handleMountClick = () => {
    setActiveTab('mounting');
    scrollToTabs();
    toast.info("Tab: Mount & Cushion");
  };

  const handleCushionClick = () => {
    setActiveTab('mounting');
    scrollToTabs();
    toast.info("Tab: Mount & Cushion");
  };

  return (
    <>
      <SEOHeader
        title="Interactive Hydraulic Cylinder Configurator & Code Builder"
        description="Design and build custom double-acting hydraulic cylinders. Adjust bore sizes, rod sizers, strokes, pressure ratings, mounting styles and cushioning."
      />

      {/* Blueprint Grid Header Section */}
      <section className="relative py-12 md:py-16 border-b border-white/5 bg-dark-bg overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-25"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/85 to-dark-bg"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 border border-accent/20 px-3 py-1 rounded-full bg-accent/5 backdrop-blur-md">
            <Settings className="w-3.5 h-3.5 text-accent animate-spin-slow" />
            <span className="font-manrope font-extrabold tracking-widest text-[9px] uppercase text-accent">
              Interactive CAD Generator
            </span>
          </div>

          <h1 className="font-poppins font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight leading-tight">
            Cylinder <span className="inline-block drop-shadow-[0_0_8px_rgba(255,107,0,0.35)]"><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Configurator</span></span>
          </h1>

          <p className="text-xs md:text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
            Click segments of the drawing or use the steps below to customize your cylinder. Visual parameters, seals, and wall thickness will dynamically scale.
          </p>
        </div>
      </section>

      {/* Main Configurator Workspace */}
      <section ref={tabsAnchorRef} className="bg-dark-bg pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start gap-4">

          {/* VISUALIZER (HUD Blueprint) — pure CSS sticky (lag-free, GPU composited) */}
          <div className="order-1 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 z-30 sticky top-[66px] bg-dark-bg/95 backdrop-blur-md pb-2 pt-1 lg:top-24 lg:self-start lg:bg-transparent lg:backdrop-blur-none lg:pb-0 lg:pt-0 lg:z-10 border-b border-white/5 lg:border-none">
              <div className="glass-panel p-2 sm:p-3 rounded-xl md:rounded-2xl lg:rounded-3xl border border-white/10 relative overflow-hidden flex flex-col items-center shadow-2xl">
                <div className="absolute top-2 left-2.5 flex items-center gap-1.5 z-10 bg-dark-bg/40 px-2 py-0.5 rounded backdrop-blur">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                  <span className="text-[8px] font-mono uppercase tracking-widest text-white/70">HUD Blueprint</span>
                </div>

                {/* Simulation Play/Pause */}
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="absolute top-2 right-2.5 bg-white/5 hover:bg-white/10 border border-white/10 p-1 rounded text-white/70 hover:text-white transition-all text-[9.5px] flex items-center gap-1 z-20 cursor-pointer"
                >
                  {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span className="font-mono text-[8px] uppercase tracking-wider">{isAnimating ? "Pause" : "Play"}</span>
                </button>

                <div className="w-full mt-5">
                  <CylinderSchematic
                    type={type}
                    bore={bore}
                    rod={rod}
                    stroke={stroke}
                    mounting={mounting}
                    cushioning={cushioning}
                    pressure={pressure}
                    isAnimating={isAnimating}
                    onRearMountClick={handleMountClick}
                    onFrontMountClick={handleMountClick}
                    onSizesClick={handleSizesClick}
                    onCushionClick={handleCushionClick}
                    onTypeClick={handleTypeClick}
                  />
                </div>

                {/* SVG Interaction instruction — hidden on mobile */}
                <div className="hidden sm:flex w-full text-center text-[9px] font-mono text-white/40 pb-1 mt-1 justify-center items-center gap-1">
                  <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                  <span>Interactive elements: Click the drawing hotspots to jump directly to options.</span>
                </div>
              </div>
            </div>

          {/* ORDERING CODE + CTA — order 3 on mobile (shows after tabs), left column on desktop */}
          <div className="order-3 lg:col-span-7 lg:col-start-1 lg:row-start-2">
            <div className="glass-panel p-4 rounded-2xl md:rounded-3xl border border-white/10 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-poppins font-black text-[10px] text-white uppercase tracking-widest border-l-2 border-accent pl-2">
                  Ordering Code Builder
                </h4>
                <span className="text-[9px] font-mono text-white/40 hidden sm:inline">Tap to decode</span>
              </div>

                {/* monospaced Ordering Code */}
                <div className="p-3 bg-black/55 border border-white/5 rounded-xl flex flex-wrap gap-y-1 justify-center items-center font-mono text-xs sm:text-sm md:text-base font-black tracking-wider text-center select-none">
                  <span
                    className={`px-1 rounded transition-colors cursor-pointer py-0.5 ${hoveredSegment === 'company' ? 'bg-accent text-dark-bg' : 'text-white/50 hover:bg-white/5'}`}
                    onMouseEnter={() => setHoveredSegment('company')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    MH
                  </span>
                  <span className="text-white/20">-</span>
                  <span
                    className={`px-1 rounded transition-colors cursor-pointer py-0.5 ${hoveredSegment === 'type' ? 'bg-accent text-dark-bg' : 'text-white hover:bg-white/5'}`}
                    onMouseEnter={() => setHoveredSegment('type')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {type}
                  </span>
                  <span className="text-white/20">-</span>
                  <span
                    className={`px-1 rounded transition-colors cursor-pointer py-0.5 ${hoveredSegment === 'sizes' ? 'bg-accent text-dark-bg' : 'text-accent hover:bg-white/5'}`}
                    onMouseEnter={() => setHoveredSegment('sizes')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {bore}/{rod}
                  </span>
                  <span className="text-white/20">-</span>
                  <span
                    className={`px-1 rounded transition-colors cursor-pointer py-0.5 ${hoveredSegment === 'stroke' ? 'bg-accent text-dark-bg' : 'text-white hover:bg-white/5'}`}
                    onMouseEnter={() => setHoveredSegment('stroke')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {stroke}
                  </span>
                  <span className="text-white/20">-</span>
                  <span
                    className={`px-1 rounded transition-colors cursor-pointer py-0.5 ${hoveredSegment === 'pressure' ? 'bg-accent text-dark-bg' : 'text-white hover:bg-white/5'}`}
                    onMouseEnter={() => setHoveredSegment('pressure')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {pressure}
                  </span>
                  <span className="text-white/20">-</span>
                  <span
                    className={`px-1 rounded transition-colors cursor-pointer py-0.5 ${hoveredSegment === 'mounting' ? 'bg-accent text-dark-bg' : 'text-white hover:bg-white/5'}`}
                    onMouseEnter={() => setHoveredSegment('mounting')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {mounting}
                  </span>
                  <span className="text-white/20">-</span>
                  <span
                    className={`px-1 rounded transition-colors cursor-pointer py-0.5 ${hoveredSegment === 'cushioning' ? 'bg-accent text-dark-bg' : 'text-white hover:bg-white/5'}`}
                    onMouseEnter={() => setHoveredSegment('cushioning')}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {cushioning}
                  </span>
              </div>

              {/* Explanatory breakdown text */}
              <div className="bg-white/5 border border-white/5 p-3 rounded-xl min-h-[75px] flex flex-col justify-center">
                  <h5 className="font-poppins font-extrabold text-[9px] uppercase tracking-wider text-accent mb-0.5 flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {currentExplanation.title}
                  </h5>
                  <p className="text-[10.5px] font-inter text-white/75 leading-relaxed">
                    {currentExplanation.desc}
                  </p>
              </div>

              {/* Instant WhatsApp CTA */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-manrope font-extrabold text-xs uppercase tracking-wider py-3 sm:py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.15)] hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:scale-[1.01]"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Request Quote on </span>WhatsApp
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* TABBED OPTIONS COLUMN — order 2 on mobile (after HUD, before code) */}
          <div className="order-2 lg:col-span-7 lg:col-start-1 lg:row-start-1 space-y-6">

            {/* Step-by-Step Tab Controls — 3 equal columns on mobile */}
            <div className="grid grid-cols-3 gap-1.5 sm:flex sm:gap-1 border-b border-white/10 bg-white/[0.01] p-1 rounded-xl">
              {[
                { id: 'type',       label: '1. Cylinder Type', short: 'Type',       icon: Wrench },
                { id: 'dimensions', label: '2. Sizing Envelope', short: 'Sizing',    icon: Activity },
                { id: 'mounting',   label: '3. Mount & Cushion', short: 'Mount',     icon: ShieldCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2.5 sm:py-3 px-1 sm:px-2 text-center rounded-lg text-[10px] sm:text-xs font-manrope font-extrabold uppercase tracking-wider transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${isActive
                        ? 'bg-accent text-dark-bg shadow shadow-accent/25'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden leading-tight text-center">{tab.short}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT CARDS WITH TRANSITIONS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* TAB 1: CYLINDER TYPE SELECTOR */}
                {activeTab === 'type' && (
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                    <div>
                      <h3 className="font-poppins font-black text-sm text-white uppercase tracking-wider">
                        Select Cylinder Structure
                      </h3>
                      <p className="text-[11px] font-inter text-white/50 leading-relaxed mt-0.5">
                        Each type offers different pressure boundaries, maintenance features, and industrial envelopes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(typeDetails).map(([key, details]) => (
                        <button
                          key={key}
                          onClick={() => setType(key)}
                          className={`text-left p-4 rounded-xl border transition-all duration-300 relative flex flex-col md:flex-row md:items-center justify-between gap-3 ${type === key
                              ? 'bg-accent/5 border-accent/60 shadow-[0_0_15px_rgba(255,107,0,0.1)]'
                              : 'bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                            }`}
                        >
                          <div className="space-y-1 flex-grow">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-accent bg-accent/15 px-2 py-0.5 rounded border border-accent/20 font-black">{key}</span>
                              <h4 className="font-poppins font-bold text-xs text-white/95">{details.name}</h4>
                            </div>
                            <p className="text-[11px] font-inter text-white/50 leading-relaxed max-w-xl">{details.desc}</p>
                          </div>
                          <div className="text-[10px] font-mono text-white/40 shrink-0 border-l border-white/5 pl-3 md:w-32">
                            <div>Pressures: {key === 'TL' ? '160 Bar' : '200+ Bar'}</div>
                            <div className="mt-0.5">Bores: {details.boreRange}</div>
                          </div>

                          {type === key && (
                            <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-accent glow-text-orange"></div>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button
                        onClick={() => setActiveTab('dimensions')}
                        className="bg-accent/10 hover:bg-accent/25 border border-accent/30 text-accent font-manrope font-extrabold text-[11px] uppercase tracking-widest px-6 py-3 rounded-lg flex items-center gap-1.5 transition-all"
                      >
                        Next: Dimensions
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: DIMENSIONS & PRESSURE SELECTOR */}
                {activeTab === 'dimensions' && (
                  <div className="space-y-6">
                    {/* BORE & ROD CARD */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                      <div>
                        <h3 className="font-poppins font-black text-sm text-white uppercase tracking-wider">
                          Bore & Piston Rod Diameters
                        </h3>
                        <p className="text-[11px] font-inter text-white/50 leading-relaxed mt-0.5">
                          Governs push/pull forces. Larger bore diameters provide higher actuation power.
                        </p>
                      </div>

                      {/* Bore selection */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-manrope">
                          <span className="text-white/60 font-semibold uppercase tracking-wider">Cylinder Bore ID</span>
                          <span className="text-accent font-extrabold">Ø {bore} mm</span>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {standardBoreSizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setBore(size)}
                              className={`py-2 rounded-lg border text-xs font-mono font-bold transition-all ${bore === size
                                  ? 'bg-accent text-dark-bg border-accent shadow shadow-accent/25 scale-[1.03]'
                                  : 'bg-white/5 border-white/5 hover:border-white/20 text-white/80'
                                }`}
                            >
                              Ø{size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Rod selection */}
                      <div className="space-y-3 pt-5 border-t border-white/5">
                        <div className="flex justify-between text-xs font-manrope">
                          <span className="text-white/60 font-semibold uppercase tracking-wider">Piston Rod OD</span>
                          <span className="text-accent font-extrabold">Ø {rod} mm</span>
                        </div>
                        <div className="grid grid-cols-6 gap-1.5">
                          {standardRodSizes.map((size) => {
                            const isInvalid = size >= bore;
                            const isRecommended = recommendedRodPairs[bore]?.includes(size);

                            return (
                              <button
                                key={size}
                                disabled={isInvalid}
                                onClick={() => !isInvalid && setRod(size)}
                                className={`py-2 rounded-lg border text-[10px] sm:text-xs font-mono font-bold transition-all relative flex items-center justify-center gap-1 ${isInvalid
                                    ? 'opacity-20 bg-white/1 cursor-not-allowed border-transparent text-white/20'
                                    : rod === size
                                      ? 'bg-accent text-dark-bg border-accent shadow shadow-accent/25 scale-[1.03]'
                                      : 'bg-white/5 border-white/5 hover:border-white/20 text-white/80'
                                  }`}
                              >
                                Ø{size}
                                {isRecommended && !isInvalid && (
                                  <span className={`w-1 h-1 rounded-full ${rod === size ? 'bg-dark-bg' : 'bg-green-500'}`} title="ISO Standard recommended fit"></span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-inter text-white/40 leading-relaxed pt-1.5">
                          <Info className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                          <span>Piston rod diameter must be smaller than the bore diameter. Green dots highlight standard pairing ratios.</span>
                        </div>
                      </div>
                    </div>

                    {/* STROKE CARD */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>

                      <div>
                        <h3 className="font-poppins font-black text-sm text-white uppercase tracking-wider">
                          Stroke Extension Length
                        </h3>
                        <p className="text-[11px] font-inter text-white/50 leading-relaxed mt-0.5">
                          Controls the linear travel. Double-acting stroke range spans 25 to 2000 mm.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs font-manrope">
                          <span className="text-white/60 font-semibold uppercase tracking-wider">Actuator Stroke</span>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={strokeInput}
                              onChange={handleStrokeInputChange}
                              onBlur={handleStrokeInputBlur}
                              min="25"
                              max="2000"
                              className="bg-white/5 border border-white/10 px-2 py-1 rounded text-white font-mono text-xs text-center w-16 focus:outline-none focus:border-accent"
                            />
                            <span className="text-white/40 font-mono">mm</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 py-1">
                          <span className="text-[9px] font-mono text-white/30">25mm</span>
                          <input
                            type="range"
                            min="25"
                            max="2000"
                            step="5"
                            value={stroke}
                            onChange={handleStrokeSliderChange}
                            className="flex-grow accent-accent h-1.5 bg-white/10 rounded-lg cursor-pointer"
                          />
                          <span className="text-[9px] font-mono text-white/30">2000mm</span>
                        </div>
                      </div>
                    </div>

                    {/* PRESSURE CARD */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>

                      <div>
                        <h3 className="font-poppins font-black text-sm text-white uppercase tracking-wider">
                          Maximum System Operating Pressure
                        </h3>
                        <p className="text-[11px] font-inter text-white/50 leading-relaxed mt-0.5">
                          Toggling high pressure dynamically adapts the barrel thickness boundaries on the blueprint.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[200, 345].map((val) => (
                          <button
                            key={val}
                            onClick={() => setPressure(val)}
                            className={`p-4 rounded-xl border text-left transition-all ${pressure === val
                                ? 'bg-accent/5 border-accent/60 shadow-md'
                                : 'bg-white/[0.01] border-white/5 hover:border-white/15'
                              }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-poppins font-extrabold text-sm text-white font-mono">{val} Bar</span>
                              <span className="text-[9px] font-mono text-white/40 uppercase">({(val / 10).toFixed(0)} MPa)</span>
                            </div>
                            <p className="text-[10px] font-inter text-white/50 leading-relaxed">
                              {val === 200
                                ? "Standard operating pressures. Optimal weight-to-force envelopes."
                                : "Extreme pressure cases. Heavier honed cylinder walls (Double Wall)."}
                            </p>
                          </button>
                        ))}
                      </div>

                      {pressure === 345 && (
                        <div className="flex gap-2 items-start bg-accent/5 border border-accent/20 p-3 rounded-lg text-[10px] text-accent font-inter leading-relaxed">
                          <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                          <span>Configured for 345 Bar. Renders with thicker walls to prevent cylinder barrel expansion under high pressure stress.</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-between">
                      <button
                        onClick={() => setActiveTab('type')}
                        className="text-white/60 hover:text-white hover:bg-white/5 font-manrope font-extrabold text-[11px] uppercase tracking-widest px-5 py-3 rounded-lg flex items-center gap-1.5 transition-all"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back: Type
                      </button>

                      <button
                        onClick={() => setActiveTab('mounting')}
                        className="bg-accent/10 hover:bg-accent/25 border border-accent/30 text-accent font-manrope font-extrabold text-[11px] uppercase tracking-widest px-6 py-3 rounded-lg flex items-center gap-1.5 transition-all"
                      >
                        Next: Mounting & Cushion
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                )}

                {/* TAB 3: MOUNTINGS & CUSHIONING SELECTOR */}
                {activeTab === 'mounting' && (
                  <div className="space-y-6">

                    {/* MOUNTING OPTIONS */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>

                      <div>
                        <h3 className="font-poppins font-black text-sm text-white uppercase tracking-wider">
                          Mounting Style Selection
                        </h3>
                        <p className="text-[11px] font-inter text-white/50 leading-relaxed mt-0.5">
                          Enforces rules: Flanged mounts (A & B) require TR/MT cylinders. Click Clevis or Eye configurations below.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(mountingDetails).map(([key, details]) => {
                          const isFlange = key === 'A' || key === 'B';
                          const isDisabled = isFlange && (type !== 'TR' && type !== 'MT');

                          return (
                            <button
                              key={key}
                              disabled={isDisabled}
                              onClick={() => !isDisabled && setMounting(key)}
                              className={`text-left p-3.5 rounded-xl border transition-all duration-300 relative group/btn ${isDisabled
                                  ? 'bg-white/[0.01] border-white/5 opacity-40 cursor-not-allowed'
                                  : mounting === key
                                    ? 'bg-accent/5 border-accent/60 shadow-[0_0_15px_rgba(255,107,0,0.1)]'
                                    : 'bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                                }`}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className={`font-poppins font-extrabold text-[11px] uppercase tracking-wider ${isDisabled ? 'text-white/40' : 'text-white'}`}>
                                  {key} - {key === 'A' ? 'Front flange' : key === 'B' ? 'Rear flange' : key === 'C' ? 'Clevis' : key === 'D' ? 'Eye' : key === 'E' ? 'Spherical eye' : 'Basic'}
                                </span>
                                {isFlange && (
                                  <span className={`text-[8px] font-mono uppercase font-bold px-1.5 py-0.25 rounded ${isDisabled ? 'bg-white/5 text-white/20' : 'bg-accent/10 text-accent'}`}>
                                    Flange
                                  </span>
                                )}
                              </div>

                              {isDisabled ? (
                                <p className="text-[10px] font-manrope font-semibold text-accent/80 leading-relaxed mt-1">
                                  Only available for TR & MT types
                                </p>
                              ) : (
                                <p className="text-[10px] font-inter text-white/50 leading-relaxed line-clamp-2">{details.desc}</p>
                              )}

                              {mounting === key && !isDisabled && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent glow-text-orange"></div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* CUSHIONING OPTIONS */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>

                      <div>
                        <h3 className="font-poppins font-black text-sm text-white uppercase tracking-wider">
                          Port Cushioning Options
                        </h3>
                        <p className="text-[11px] font-inter text-white/50 leading-relaxed mt-0.5">
                          Enabling cushioning renders detailed brass adjustment needle valves on the cylinder ports.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(cushioningDetails).map(([key, details]) => (
                          <button
                            key={key}
                            onClick={() => setCushioning(key)}
                            className={`text-left p-3.5 rounded-xl border transition-all duration-300 relative group/btn ${cushioning === key
                                ? 'bg-accent/5 border-accent/60 shadow-[0_0_15px_rgba(255,107,0,0.1)]'
                                : 'bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                              }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-poppins font-extrabold text-[11px] text-white uppercase tracking-wider">{key} - {details.name}</span>
                            </div>
                            <p className="text-[10px] font-inter text-white/50 leading-relaxed line-clamp-2">{details.desc}</p>

                            {cushioning === key && (
                              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent glow-text-orange"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-between">
                      <button
                        onClick={() => setActiveTab('dimensions')}
                        className="text-white/60 hover:text-white hover:bg-white/5 font-manrope font-extrabold text-[11px] uppercase tracking-widest px-5 py-3 rounded-lg flex items-center gap-1.5 transition-all"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back: Sizing
                      </button>

                      <div className="flex items-center gap-1 text-[10px] font-mono text-green-500 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/15">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Ready to Request Quote</span>
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Quote instructions can go here if needed, or simply let it flow */}

          </div>

        </div>
      </section>
    </>
  );
}
