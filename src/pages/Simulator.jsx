import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Globe,
  CheckCircle,
  HelpCircle,
  Layers,
  Cpu,
  Compass,
  ArrowRight,
  Info,
  Maximize2,
  Activity,
  Clock,
  Zap
} from 'lucide-react';
import SEOHeader from '../components/common/SEOHeader';

// ── Web Audio Synth Engine for Sound Effects ──
let audioCtx = null;
let motorOsc = null;
let motorOsc2 = null;
let motorGain = null;
let oilNoise = null;
let oilFilter = null;
let oilGain = null;

const initAudio = () => {
  if (audioCtx) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    audioCtx = new AudioContextClass();

    // Motor sound: low rumble + higher harmonic sawtooth waves
    motorOsc = audioCtx.createOscillator();
    motorOsc.type = 'sawtooth';
    motorOsc.frequency.setValueAtTime(45, audioCtx.currentTime);

    motorOsc2 = audioCtx.createOscillator();
    motorOsc2.type = 'triangle';
    motorOsc2.frequency.setValueAtTime(90, audioCtx.currentTime);

    const motorLowpass = audioCtx.createBiquadFilter();
    motorLowpass.type = 'lowpass';
    motorLowpass.frequency.setValueAtTime(130, audioCtx.currentTime);

    motorGain = audioCtx.createGain();
    motorGain.gain.setValueAtTime(0.0, audioCtx.currentTime);

    motorOsc.connect(motorLowpass);
    motorOsc2.connect(motorLowpass);
    motorLowpass.connect(motorGain);
    motorGain.connect(audioCtx.destination);

    motorOsc.start();
    motorOsc2.start();

    // Oil Sound: filtered white noise that whistles slightly
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    oilNoise = audioCtx.createBufferSource();
    oilNoise.buffer = noiseBuffer;
    oilNoise.loop = true;

    oilFilter = audioCtx.createBiquadFilter();
    oilFilter.type = 'bandpass';
    oilFilter.frequency.setValueAtTime(320, audioCtx.currentTime);
    oilFilter.Q.setValueAtTime(1.5, audioCtx.currentTime);

    oilGain = audioCtx.createGain();
    oilGain.gain.setValueAtTime(0.0, audioCtx.currentTime);

    oilNoise.connect(oilFilter);
    oilFilter.connect(oilGain);
    oilGain.connect(audioCtx.destination);

    oilNoise.start();
  } catch (e) {
    console.error("Audio Context Init Failed:", e);
  }
};

const updateAudioParams = (rpm, oilSpeed, isMuted) => {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (isMuted) {
    if (motorGain) motorGain.gain.setTargetAtTime(0.0, audioCtx.currentTime, 0.05);
    if (oilGain) oilGain.gain.setTargetAtTime(0.0, audioCtx.currentTime, 0.05);
  } else {
    // Motor sound parameters
    const baseFreq = 30 + (rpm / 3000) * 55; // 30Hz - 85Hz
    if (motorOsc) motorOsc.frequency.setTargetAtTime(baseFreq, audioCtx.currentTime, 0.1);
    if (motorOsc2) motorOsc2.frequency.setTargetAtTime(baseFreq * 2, audioCtx.currentTime, 0.1);

    const motorVol = 0.01 + (rpm / 3000) * 0.08;
    if (motorGain) motorGain.gain.setTargetAtTime(motorVol, audioCtx.currentTime, 0.1);

    // Oil sound parameters
    if (oilFilter) {
      const centerFreq = 200 + oilSpeed * 200; // 200Hz - 800Hz
      oilFilter.frequency.setTargetAtTime(centerFreq, audioCtx.currentTime, 0.1);
    }
    const oilVol = oilSpeed > 0 ? (0.01 + (oilSpeed / 3) * 0.03) : 0;
    if (oilGain) oilGain.gain.setTargetAtTime(oilVol, audioCtx.currentTime, 0.1);
  }
};

const playValveClickSynth = (isMuted) => {
  if (isMuted) return;
  initAudio();
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(750, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {
    console.error("Valve click sound error:", e);
  }
};

export default function Simulator() {
  // ── States for Simulation ──
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Controllers
  const [rpm, setRpm] = useState(1500);
  const [oilSpeedMultiplier, setOilSpeedMultiplier] = useState(1.5);
  const [pressureMode, setPressureMode] = useState(250); // 100, 250, 420 Bar
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // 1x, 2x, 4x
  const [autoReplay, setAutoReplay] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [blueprintMode, setBlueprintMode] = useState(false);

  // Live indicators
  const [cylinderPos, setCylinderPos] = useState(0); // 0 to 100
  const [strokeDir, setStrokeDir] = useState(1); // 1: Extending, -1: Retracting, 0: Idle/Hold
  const [temperature, setTemperature] = useState(48.5);
  const [factoryHours, setFactoryHours] = useState("08:42:19");
  const [sparklineData, setSparklineData] = useState(Array(30).fill(250));
  const [logoClicks, setLogoClicks] = useState(0);

  // ── Dynamic Hydraulic Physics Calculations ──
  const pumpDisplacement = 22; // cc/rev
  const flowRate = (pumpDisplacement * rpm) / 1000 * oilSpeedMultiplier; // LPM
  const pumpEfficiency = 97 - (pressureMode / 420) * 3 - (rpm / 3000) * 2;
  const powerKw = (pressureMode * flowRate) / (600 * (pumpEfficiency / 100)); // kW
  const hydraulicPowerHp = powerKw * 1.341; // HP

  const boreDia = 100; // mm
  const rodDia = 70; // mm
  const capArea = (Math.PI * Math.pow(boreDia / 10, 2)) / 4; // 78.54 cm^2
  const rodArea = capArea - ((Math.PI * Math.pow(rodDia / 10, 2)) / 4); // 40.06 cm^2

  const extForceKn = pressureMode * capArea * 0.1; // kN
  const extForceTons = extForceKn * 0.10197; // Tons
  const retForceKn = pressureMode * rodArea * 0.1; // kN
  const retForceTons = retForceKn * 0.10197; // Tons

  const oilLevel = 85 - (cylinderPos / 100) * 5;
  const filterHealth = 98.4 + Math.sin(cylinderPos * 0.05) * 0.15;

  // Interactive hovers
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [hoveredPipe, setHoveredPipe] = useState(null);
  const [activeInfoComponent, setActiveInfoComponent] = useState(null);

  // Popups & Rips
  const [activeProduct, setActiveProduct] = useState(null);
  const [ripples, setRipples] = useState([]);
  const [showSuccessTick, setShowSuccessTick] = useState(false);
  const [showOverloadAlert, setShowOverloadAlert] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isNearMachine, setIsNearMachine] = useState(false);

  // Refs
  const blueprintAreaRef = useRef(null);
  const circuitSvgRef = useRef(null);

  // ── Smart Tooltip Dictionary ──
  const componentDetails = {
    reservoir: {
      name: "Hydraulic Reservoir (Oil Tank)",
      desc: "Stores the hydraulic oil and allows heat to escape, keeping the system cool and clean.",
      pressure: "0 Bar (Low)",
      flow: "Suction Draw",
      role: "Fluid Storage",
      productId: "hydraulic-power-packs"
    },
    suction_filter: {
      name: "Suction Filter Strainer",
      desc: "Strains raw hydraulic oil to protect the gear pump from steel filings and debris.",
      pressure: "-0.1 Bar (Intake)",
      flow: "Clean Feed",
      role: "Pump Protection",
      productId: "hydraulic-power-packs"
    },
    motor: {
      name: "Electric Drive Motor",
      desc: "Converts electrical power to rotational speed and torque to run the hydraulic pump.",
      pressure: "Mechanical Only",
      flow: "1500 RPM",
      role: "Power Source",
      productId: "hydraulic-power-packs"
    },
    coupling: {
      name: "Flexible Coupling",
      desc: "Connects the motor shaft to the pump, smoothing out vibration and micro misalignment.",
      pressure: "Mechanical Only",
      flow: "Direct Drive",
      role: "Shaft Alignment",
      productId: "hydraulic-power-packs"
    },
    pump: {
      name: "External Gear Pump",
      desc: "Pushes hydraulic oil from the reservoir through the circuit to generate power.",
      pressure: "Up to 280 Bar",
      flow: "Dynamic Flow",
      role: "Flow Generator",
      productId: "hydraulic-power-packs"
    },
    prv: {
      name: "Pressure Relief Valve (PRV)",
      desc: "Bypasses oil back to the tank if the pressure goes too high, preventing damage.",
      pressure: "Max 450 Bar Limit",
      flow: "Bypass Loop",
      role: "Safety Relief",
      productId: "hydraulic-power-packs"
    },
    gauge: {
      name: "System Pressure Gauge",
      desc: "Displays the active system operating pressure in Bar and PSI so you can monitor load.",
      pressure: "Live System Load",
      flow: "Sensing Line",
      role: "Pressure Monitor",
      productId: "hydraulic-power-packs"
    },
    valve: {
      name: "Directional Control Valve",
      desc: "Redirects the oil to either extend or retract the cylinder rod, or holds it in place.",
      pressure: "Up to 315 Bar",
      flow: "Dual Directional",
      role: "Flow Control",
      productId: "hydraulic-power-packs"
    },
    cylinder: {
      name: "Double-Acting Cylinder",
      desc: "Uses pressurized oil to push or pull heavy industrial machinery and structural loads.",
      pressure: "Up to 350 Bar",
      flow: "Actuation Stroke",
      role: "Linear Force",
      productId: "tie-rod-cylinders"
    },
    return_filter: {
      name: "Return Line Filter",
      desc: "Cleans returning oil before it goes back to the tank to keep the fluid perfectly clean.",
      pressure: "1.5 Bar (Low)",
      flow: "Full System Return",
      role: "Fluid Cleansing",
      productId: "hydraulic-power-packs"
    },
    cooler: {
      name: "Forced-Air Oil Cooler",
      desc: "Cools down the returning hot oil using cooling fan airflow, preserving seal life.",
      pressure: "10 Bar Limit",
      flow: "Air Cooling",
      role: "Temperature Control",
      productId: "hydraulic-power-packs"
    }
  };

  const productDetails = {
    motor: {
      title: "MH-M Series Electric Drive Motors",
      tagline: "High-efficiency IEC induction motors engineered for continuous hydraulic power units.",
      image: "/Products/power pack.png",
      description: "Maruti electric drive motors are IP55-rated, high-torque industrial induction motors built for hydraulic pump integration. They provide IE3/IE4 efficiency levels, ensuring low power losses and high reliability under heavy load.",
      specs: {
        "Power Range": "2.2 kW to 45 kW",
        "Voltage": "415V, 3-Phase, 50Hz",
        "Frame Material": "Cast Iron / Aluminum",
        "Insulation Class": "Class F",
        "Mounting": "B35 Flange/Foot Mount"
      },
      applications: ["Industrial Power Units", "Heavy Press Systems", "Steel Plant Automations"],
      productId: "hydraulic-power-packs"
    },
    pump: {
      title: "MH-GP Series External Gear Pumps",
      tagline: "High-pressure, low-noise external gear pumps for industrial applications.",
      image: "/Products/power pack.png",
      description: "Our high-precision external gear pumps deliver positive displacement with volumetric efficiencies up to 97%. Built with high-tensile extruded aluminum bodies and hardened steel gears to withstand high pressures.",
      specs: {
        "Displacement": "1.2 cc/rev to 45 cc/rev",
        "Max Pressure": "250 Bar (Continuous) / 280 Bar (Intermittent)",
        "Speed Range": "600 RPM to 3500 RPM",
        "Fluid Viscosity": "10 to 400 cSt",
        "Operating Temp": "-15°C to 80°C"
      },
      applications: ["Power Packs", "Lifting Systems", "Agricultural Equipment", "Lubrication Loops"],
      productId: "hydraulic-power-packs"
    },
    prv: {
      title: "MH-PRV Series Direct-Operated Relief Valves",
      tagline: "High-response system safety relief valves for pressure overload protection.",
      image: "/Products/power pack.png",
      description: "Direct-acting spool relief valves designed to protect hydraulic systems from pressure peaks. Features a robust spring-loaded steel poppet with precise manual adjustment handle.",
      specs: {
        "Pressure Adjustment": "10 Bar to 420 Bar",
        "Max Flow Capacity": "80 LPM",
        "Response Time": "12 Milliseconds",
        "Fluid Medium": "Mineral oil (ISO VG 46/68)",
        "Leakage Rate": "Zero-leak poppet design"
      },
      applications: ["Hydraulic Overload Systems", "Clamp Pressure Regulators", "Accumulator Charging"],
      productId: "hydraulic-power-packs"
    },
    gauge: {
      title: "MH-PG Series Glycerin-Filled Pressure Gauges",
      tagline: "Vibration-proof stainless steel casing gauges for accurate pressure telemetry.",
      image: "/Products/power pack.png",
      description: "Our industrial-grade pressure gauges are filled with high-purity glycerin to damp needle vibrations, ensuring accurate readings on high-pulsation hydraulic pumps.",
      specs: {
        "Dial Diameter": "63 mm / 100 mm",
        "Pressure Range": "0 to 600 Bar (8700 PSI)",
        "Case Material": "SS 304 Stainless Steel",
        "Connection Thread": "1/4\" BSP / 1/2\" BSP",
        "Accuracy Class": "±1.6% of full scale"
      },
      applications: ["Power Packs", "Pressure Manifolds", "Cylinder Load Testing"],
      productId: "hydraulic-power-packs"
    },
    valve: {
      title: "MH-4WE Series Solenoid Directional Valves",
      tagline: "4/3-Way Solenoid Operated Spool Control Valves for high flow rates.",
      image: "/Products/power pack.png",
      description: "Standard industrial directional spool valves equipped with high-performance wet-pin solenoids. Handles up to 120 LPM with minimal pressure drops across spool ports.",
      specs: {
        "Spool Configurations": "4/3-way, 4/2-way, spring-centered",
        "Operating Voltage": "24V DC / 220V AC",
        "Max Flow Rate": "120 LPM",
        "Max Pressure": "315 Bar",
        "Shift Response": "25 ms (DC) / 15 ms (AC)"
      },
      applications: ["Multi-actuator Manifolds", "Industrial Tooling Presses", "Automotive Assembly Lines"],
      productId: "hydraulic-power-packs"
    },
    cylinder: {
      title: "MH-DA Series Double-Acting Cylinder",
      tagline: "Custom-engineered heavy-duty linear actuators for rugged industrial operations.",
      image: "/Products/tie road.png",
      description: "Maruti's flagship double-acting hydraulic cylinders are manufactured with ST-52 honed barrels and induction-hardened chrome plated EN-8D rods. Built to withstand rugged side loads and extreme conditions.",
      specs: {
        "Bore Sizes": "40 mm to 500 mm",
        "Rod Sizes": "20 mm to 300 mm",
        "Stroke Lengths": "Up to 3500 mm",
        "Operating Pressure": "Up to 350 Bar",
        "Fluid Seals": "Premium Viton / NBR double lip seals"
      },
      applications: ["Steel Rolling Mills", "Mobile Tipper Trucks", "Mining Excavators", "Garbage Compactors"],
      productId: "tie-rod-cylinders"
    },
    cooler: {
      title: "MH-OC Series Fan-Driven Oil Coolers",
      tagline: "Forced-air heat exchangers for efficient hydraulic fluid cooling.",
      image: "/Products/power pack.png",
      description: "Equipped with high-airflow cooling fans and aluminum radiator fins, Maruti air/oil coolers maintain optimum fluid temperatures, protecting seal life and oil viscosity.",
      specs: {
        "Cooling Capacity": "Up to 15 kW (at dT = 40°C)",
        "Fan Voltage": "24V DC / 220V AC / 415V AC",
        "Max Test Pressure": "25 Bar",
        "Radiator Core": "Vacuum-brazed aluminum",
        "Thermostat": "Optional 50°C/60°C thermal switch"
      },
      applications: ["Continuous Duty Power Packs", "Injection Molding Systems", "Steel Plant Power Packs"],
      productId: "hydraulic-power-packs"
    },
    tank: {
      title: "MH-R Series Heavy-Duty Reservoirs",
      tagline: "Steel hydraulic oil tanks with integrated inspection hatches and sight gauges.",
      image: "/Products/power pack.png",
      description: "Standard industrial steel reservoirs pre-treated against internal rust, equipped with baffle plates, filler-breathers, drain plug valves, and level indicators.",
      specs: {
        "Volumetric Capacities": "40L, 60L, 100L, 250L, 500L",
        "Tank Material": "Powder-coated Mild Steel",
        "Internal Baffles": "Anti-turbulence baffle plates",
        "Filler-Breather": "10 Micron air filtration",
        "Drain Access": "Bottom drain plug socket"
      },
      applications: ["Hydraulic Power Units", "Test Rigs", "Stationary Factory Equipment"],
      productId: "hydraulic-power-packs"
    },
    suction_filter: {
      title: "MH-SF Series Suction Strainers",
      tagline: "Wire-mesh suction line strainers for raw hydraulic oil filtration.",
      image: "/Products/power pack.png",
      description: "Strains raw hydraulic fluid before it reaches the gear pump inlet to prevent hard steel and wear-particle ingestion.",
      specs: {
        "Filtration Rating": "150 Micron nominal",
        "Mesh Material": "SS 304 Stainless Steel",
        "Connection Thread": "3/4\" NPT to 2\" NPT",
        "Bypass Valve": "Available 0.2 Bar crack",
        "Operating Medium": "Mineral oil, water glycol"
      },
      applications: ["Reservoir Suction Lines", "Submerged Tank Intake Protection"],
      productId: "hydraulic-power-packs"
    },
    return_filter: {
      title: "MH-RF Series Tank-Top Return Filters",
      tagline: "High-cleanliness return line filters protecting hydraulic oil systems.",
      image: "/Products/power pack.png",
      description: "Cleans return line discharge fluid before returning it to the reservoir, keeping the fluid oil ISO 4406 cleanliness class compliant.",
      specs: {
        "Filtration Rating": "10 Micron absolute",
        "Filter Element": "Fiberglass (Disposable)",
        "Max Flow Rate": "160 LPM",
        "Max Pressure": "10 Bar",
        "Bypass Valve": "Integrated 1.5 Bar crack"
      },
      applications: ["Power Packs Return Lines", "Industrial Control Loop Filters"],
      productId: "hydraulic-power-packs"
    }
  };

  // ── Clock update ──
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      setFactoryHours(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Trigger Click Ripple on Pressure Gauge ──
  const handleGaugeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  // ── Dynamic calculations (Temp, Sparklines, Audio) ──
  useEffect(() => {
    if (!isPlaying) {
      updateAudioParams(0, 0, true);
      return;
    }
    initAudio();
    // Temperature scales with RPM and Pressure, drops when cooling fan is active
    const targetTemp = 35 + (rpm / 3000) * 25 + (pressureMode / 420) * 35;
    const fanCoolingFactor = targetTemp > 65 ? 12 : 3;

    const tempInterval = setInterval(() => {
      setTemperature((curr) => {
        let diff = targetTemp - curr;
        // if cooling fan is spin speed, drop temp faster
        if (curr > 65) diff -= fanCoolingFactor * 0.1;
        const next = curr + diff * 0.05 + (Math.random() - 0.5) * 0.1;
        return parseFloat(next.toFixed(1));
      });

      // Update sparklines with slight noise around pressure value
      setSparklineData((prev) => {
        const nextVal = pressureMode + (Math.random() - 0.5) * (pressureMode * 0.05);
        const nextData = [...prev.slice(1), Math.round(nextVal)];
        return nextData;
      });
    }, 1000);

    // Update synthesizers
    const calculatedOilSpeed = (rpm / 1500) * oilSpeedMultiplier * (hoveredPipe ? 1.8 : 1.0) * playbackSpeed;
    updateAudioParams(rpm, calculatedOilSpeed, isMuted);

    return () => clearInterval(tempInterval);
  }, [rpm, oilSpeedMultiplier, pressureMode, playbackSpeed, isPlaying, isMuted, hoveredPipe]);

  // ── Pressure overload warnings ──
  useEffect(() => {
    if (pressureMode === 420 && rpm > 2200) {
      setShowOverloadAlert(true);
    } else {
      setShowOverloadAlert(false);
    }
  }, [pressureMode, rpm]);

  // ── Cylinder Extension / Retraction Cycle Loop ──
  useEffect(() => {
    if (!isPlaying) return;

    // Speed scales based on RPM, Slider, Playback, and Pressure Mode
    const speed = (0.2 + (rpm / 1500) * 0.6) * oilSpeedMultiplier * playbackSpeed * (1 + (pressureMode - 100) / 600);

    const cycleTimer = setInterval(() => {
      setCylinderPos((pos) => {
        if (strokeDir === 1) {
          const next = pos + speed;
          if (next >= 100) {
            setStrokeDir(-1); // Reverse dir
            playValveClickSynth(isMuted);
            return 100;
          }
          return next;
        } else if (strokeDir === -1) {
          const next = pos - speed;
          if (next <= 0) {
            playValveClickSynth(isMuted);
            if (autoReplay) {
              setStrokeDir(0); // Pause briefly before restart
              setShowSuccessTick(true);
              setTimeout(() => {
                setShowSuccessTick(false);
                setStrokeDir(1);
              }, 2200);
            } else {
              setStrokeDir(0);
            }
            return 0;
          }
          return next;
        } else {
          return 0;
        }
      });
    }, 30);

    return () => clearInterval(cycleTimer);
  }, [isPlaying, rpm, oilSpeedMultiplier, pressureMode, playbackSpeed, strokeDir, autoReplay, isMuted]);

  // ── Plain English Explanations for Normal Users ──
  const stepExplanations = {
    1: "Stage 1: Fluid is drawn from the Reservoir Tank to supply the system.",
    2: "Stage 2: The AC Motor spins the Gear Pump, generating fluid flow.",
    3: "Stage 3: Pressure builds up in the line, monitored by the Pressure Gauge.",
    4: "Stage 4: Directional Control Valve shifts to route flow to the cylinder.",
    5: "Stage 5: High-pressure oil enters the Cylinder, extending/retracting the piston.",
    6: "Stage 6: Exhaust oil returns through the Oil Cooler and Return Filter.",
    7: "Standby: Cycle is complete. System is ready to begin again."
  };

  const getComponentDisplayNameAndDesc = (key) => {
    const detailKey = key === 'tank' ? 'reservoir' : key;
    const detail = componentDetails[detailKey];
    if (detail) {
      return { name: detail.name, desc: detail.desc };
    }
    return null;
  };

  // ── Step Counter based on cylinder position & state ──
  const getActiveStep = () => {
    if (!isPlaying) return 7; // Complete / Standby
    if (strokeDir === 0 && cylinderPos === 0) return 7; // Complete / Standby
    if (strokeDir === 1) {
      if (cylinderPos > 0 && cylinderPos < 15) return 1; // Reservoir / Suction
      if (cylinderPos >= 15 && cylinderPos < 30) return 2; // Pump
      if (cylinderPos >= 30 && cylinderPos < 50) return 3; // Pressure
      if (cylinderPos >= 50 && cylinderPos < 70) return 4; // Valve
      if (cylinderPos >= 70 && cylinderPos < 90) return 5; // Cylinder
      return 6; // Return
    }
    if (strokeDir === -1) {
      if (cylinderPos > 40) return 5; // Cylinder action
      return 6; // Return
    }
    return 7;
  };
  const activeStep = getActiveStep();

  // ── 3-5s Pressure Pulse effect ──
  const [pulseActive, setPulseActive] = useState(false);
  useEffect(() => {
    let pulseTimer;
    const triggerPulse = () => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 900);

      const nextTime = 3000 + Math.random() * 2000;
      pulseTimer = setTimeout(triggerPulse, nextTime);
    };

    pulseTimer = setTimeout(triggerPulse, 3000);
    return () => clearTimeout(pulseTimer);
  }, []);

  // ── Mouse coordinates tracker for glow reflections & Parallax ──
  const handleMouseMove = (e) => {
    if (!blueprintAreaRef.current) return;
    const rect = blueprintAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Check if near the core schematic layout
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    setIsNearMachine(dist < 280);
  };

  // ── Blueprintmode easter egg ──
  const handleLogoClick = () => {
    setLogoClicks((c) => {
      const next = c + 1;
      if (next >= 5) {
        setBlueprintMode((b) => !b);
        return 0;
      }
      return next;
    });
  };

  // ── Export PDF / Circuit schematic ──
  const downloadCircuit = () => {
    const specs = `
==================================================
        MARUTI HYDRAULICS® SIMULATION REPORT
==================================================
System Configuration & Live Performance Telemetry
Generated on: ${new Date().toLocaleString()}
--------------------------------------------------
OPERATIONAL INPUTS:
- Operating Pressure: ${pressureMode} Bar
- Motor Drive Speed:  ${rpm} RPM
- Oil Flow Rate:      ${flowRate.toFixed(1)} LPM
- Flow Multiplier:    ${oilSpeedMultiplier.toFixed(1)}x

CYLINDER GEOMETRY:
- Bore Diameter:      ${boreDia} mm
- Rod Diameter:       ${rodDia} mm
- Active Cap Area:    ${capArea.toFixed(2)} cm²
- Active Rod Area:    ${rodArea.toFixed(2)} cm²

CALCULATED OUTPUTS:
- Hydraulic Power:    ${powerKw.toFixed(2)} kW (${hydraulicPowerHp.toFixed(1)} HP)
- Extension Force:    ${extForceKn.toFixed(1)} kN (${extForceTons.toFixed(1)} Metric Tons)
- Retraction Force:   ${retForceKn.toFixed(1)} kN (${retForceTons.toFixed(1)} Metric Tons)

SYSTEM HEALTH:
- Oil Temperature:    ${temperature}°C
- Mode status:        ${blueprintMode ? 'Blueprint Schematic' : 'Standard Industry'}
==================================================
`;
    const blob = new Blob([specs], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `MH_Simulator_Specs_${pressureMode}Bar.txt`;
    link.click();
  };

  // ── Screenshot capture of SVG ──
  const takeScreenshot = () => {
    if (!circuitSvgRef.current) return;
    try {
      const svgString = new XMLSerializer().serializeToString(circuitSvgRef.current);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 500;
        const context = canvas.getContext('2d');
        context.fillStyle = '#060a13';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, 800, 500);

        const png = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'maruti_hydraulic_schematic.png';
        link.href = png;
        link.click();
      };
      image.src = blobURL;
    } catch (e) {
      alert("Screenshot captured! Diagram file downloading...");
      downloadCircuit();
    }
  };

  return (
    <div
      className={`min-h-screen text-white font-manrope transition-colors duration-500 relative ${blueprintMode ? 'bg-[#001133]' : 'bg-[#0a0a0a]'
        }`}
    >
      <SEOHeader
        title="Live Hydraulic Simulator | Maruti Hydraulics"
        description="Interact with our dynamic industrial hydraulic simulation. Adjust RPM, switch pressure ratings, and observe live fluid dynamics, thermal parameters, and component breakdown."
      />

      {/* ── Background Rotating Gear [Feature 16] & Parallax [Feature 41] ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <svg
          className="absolute -right-32 -top-32 w-[600px] h-[600px] text-white/[0.02] animate-[spin_55s_linear_infinite]"
          fill="currentColor"
          viewBox="0 0 100 100"
        >
          <path d="M50,35c-8.3,0-15,6.7-15,15s6.7,15,15,15s15-6.7,15-15S58.3,35,50,35z M50,55c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S52.8,55,50,55z M85.2,46.1l-6.1-1.6c-0.4-1.5-1.1-3-2-4.3l3.9-5c0.5-0.7,0.4-1.7-0.3-2.3l-5.7-5.7c-0.6-0.6-1.6-0.7-2.3-0.3l-5,3.9c-1.3-0.9-2.8-1.6-4.3-2l-1.6-6.1C61.7,21.9,61,21,60,21h-8c-1,0-1.7,0.9-1.9,1.8l-1.6,6.1c-1.5,0.4-3,1.1-4.3,2l-5-3.9c-0.7-0.5-1.7-0.4-2.3,0.3l-5.7,5.7c-0.6,0.6-0.7,1.6-0.3,2.3l3.9,5c-0.9,1.3-1.6,2.8-2,4.3l-6.1,1.6c-0.9,0.2-1.8,1-1.8,1.9v8c0,1,0.9,1.7,1.8,1.9l6.1,1.6c0.4,1.5,1.1,3,2,4.3l-3.9,5c-0.5,0.7-0.4,1.7,0.3,2.3l5.7,5.7c0.6,0.6,1.6,0.7,2.3,0.3l5-3.9c1.3,0.9,2.8,1.6,4.3,2l1.6,6.1c0.2,0.9,1,1.8,1.9,1.8h8c1,0,1.7-0.9,1.9-1.8l1.6-6.1c1.5-0.4,3-1.1,4.3-2l5,3.9c0.7,0.5,1.7,0.4,2.3-0.3l5.7-5.7c0.6-0.6,0.7-1.6,0.3-2.3l-3.9-5c0.9-1.3,1.6-2.8,2-4.3l6.1-1.6c0.9-0.2,1.8-1,1.8-1.9v-8C87,47.1,86.1,46.3,85.2,46.1z" />
        </svg>
        <svg
          className="absolute -left-48 -bottom-48 w-[700px] h-[700px] text-white/[0.015] animate-[spin_90s_linear_infinite_reverse]"
          fill="currentColor"
          viewBox="0 0 100 100"
        >
          <path d="M50,35c-8.3,0-15,6.7-15,15s6.7,15,15,15s15-6.7,15-15S58.3,35,50,35z M50,55c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S52.8,55,50,55z M85.2,46.1l-6.1-1.6c-0.4-1.5-1.1-3-2-4.3l3.9-5c0.5-0.7,0.4-1.7-0.3-2.3l-5.7-5.7c-0.6-0.6-1.6-0.7-2.3-0.3l-5,3.9c-1.3-0.9-2.8-1.6-4.3-2l-1.6-6.1C61.7,21.9,61,21,60,21h-8c-1,0-1.7,0.9-1.9,1.8l-1.6,6.1c-1.5,0.4-3,1.1-4.3,2l-5-3.9c-0.7-0.5-1.7-0.4-2.3,0.3l-5.7,5.7c-0.6,0.6-0.7,1.6-0.3,2.3l3.9,5c-0.9,1.3-1.6,2.8-2,4.3l-6.1,1.6c-0.9,0.2-1.8,1-1.8,1.9v8c0,1,0.9,1.7,1.8,1.9l6.1,1.6c0.4,1.5,1.1,3,2,4.3l-3.9,5c-0.5,0.7-0.4,1.7,0.3,2.3l5.7,5.7c0.6,0.6,1.6,0.7,2.3,0.3l5-3.9c1.3,0.9,2.8,1.6,4.3,2l1.6,6.1c0.2,0.9,1,1.8,1.9,1.8h8c1,0,1.7-0.9,1.9-1.8l1.6-6.1c1.5-0.4,3-1.1,4.3-2l5,3.9c0.7,0.5,1.7,0.4,2.3-0.3l5.7-5.7c0.6-0.6,0.7-1.6,0.3-2.3l-3.9-5c0.9-1.3,1.6-2.8,2-4.3l6.1-1.6c0.9-0.2,1.8-1,1.8-1.9v-8C87,47.1,86.1,46.3,85.2,46.1z" />
        </svg>

        {/* ── Ambient Industrial Dust Particles [Feature 35] ── */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.1
              }}
              animate={{
                y: [null, Math.random() * -120],
                x: [null, (Math.random() - 0.5) * 60],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* ── Custom Mouse Glow Pointer near machine [Feature 15] ── */}
      <AnimatePresence>
        {isNearMachine && (
          <motion.div
            className="absolute pointer-events-none w-48 h-48 rounded-full filter blur-3xl z-40 bg-accent/15 hidden md:block"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              x: mousePos.x - 96,
              y: mousePos.y - 96,
              opacity: 1,
              scale: 1
            }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
          />
        )}
      </AnimatePresence>



      {/* ── Main Simulator HUD Workspace ── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col lg:grid lg:grid-cols-[220px_1fr_220px] gap-4 items-stretch">

        {/* LEFT COLUMN: Controls Dashboard */}
        <section className="flex flex-col gap-4 order-2 lg:order-1">
          {/* Guide */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 relative overflow-hidden flex-shrink-0">
            <h3 className="font-poppins font-black text-[10px] uppercase tracking-widest text-accent mb-2.5 border-l-2 border-accent pl-2">
              Guide
            </h3>
            <ul className="space-y-2 font-mono text-[9px] text-white/70 list-none pl-0">
              <li className="flex items-start gap-1.5">
                <span className="text-accent shrink-0 font-bold">1.</span>
                <span>Click <strong className="text-accent">START</strong> to run the hydraulic cycle.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-accent shrink-0 font-bold">2.</span>
                <span><strong>Hover or click</strong> components to view details below.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-accent shrink-0 font-bold">3.</span>
                <span>Adjust motor speed/flow using the sliders.</span>
              </li>
            </ul>
          </div>

          {/* System Control Module */}
          <div
            className="glass-panel p-4 rounded-xl border border-white/10 relative overflow-hidden flex-1 flex flex-col"
            style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            <h3 className="font-poppins font-black text-[10px] uppercase tracking-widest text-accent mb-3 border-l-2 border-accent pl-2">
              System Control
            </h3>

            <div className="flex flex-col gap-3 flex-1">
              {/* Play/Pause */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { initAudio(); setIsPlaying(!isPlaying); }}
                  className={`flex-grow flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold font-mono tracking-widest uppercase transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-red-600/20 border border-red-500/40 text-red-400 hover:bg-red-600/30'
                      : 'bg-accent text-dark-bg hover:opacity-90'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  {isPlaying ? 'PAUSE' : 'START'}
                </button>
                <button
                  onClick={() => { setIsMuted(!isMuted); initAudio(); }}
                  className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                    isMuted ? 'border-white/10 bg-white/5 text-white/60' : 'border-accent bg-accent/15 text-accent'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => { setCylinderPos(0); setStrokeDir(1); }}
                  className="p-2 border border-white/10 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-white/80" />
                </button>
              </div>

              {/* RPM */}
              <div>
                <div className="flex justify-between items-center text-[9px] font-mono mb-1.5">
                  <span className="text-white/60">MOTOR SPEED</span>
                  <span className="text-accent font-bold">{rpm} RPM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center cursor-pointer select-none shrink-0">
                    <div className="absolute w-1 h-2.5 bg-accent top-0.5 rounded-full origin-bottom" style={{ transform: `rotate(${((rpm - 600) / 2400) * 270 - 135}deg)` }} />
                    <span className="text-[6px] font-mono text-white/40 mt-1.5">RPM</span>
                  </div>
                  <input type="range" min="600" max="3000" step="100" value={rpm}
                    onChange={(e) => setRpm(Number(e.target.value))}
                    className="flex-1 accent-accent h-1 cursor-pointer"
                  />
                </div>
              </div>

              {/* Oil Flow */}
              <div>
                <div className="flex justify-between items-center text-[9px] font-mono mb-1.5">
                  <span className="text-white/60">OIL FLOW SPEED</span>
                  <span className="text-accent font-bold">{oilSpeedMultiplier.toFixed(1)}x</span>
                </div>
                <input type="range" min="0.5" max="3.0" step="0.1" value={oilSpeedMultiplier}
                  onChange={(e) => setOilSpeedMultiplier(Number(e.target.value))}
                  className="w-full accent-accent h-1 cursor-pointer"
                />
              </div>

              {/* Pressure */}
              <div>
                <span className="text-[9px] font-mono text-white/60 block mb-1.5">PRESSURE RATING</span>
                <div className="grid grid-cols-3 gap-1">
                  {[100, 250, 420].map((mode) => (
                    <button key={mode}
                      onClick={() => { setPressureMode(mode); playValveClickSynth(isMuted); }}
                      className={`py-1.5 border text-[8.5px] font-bold font-mono rounded-lg transition-all cursor-pointer ${
                        pressureMode === mode ? 'border-accent bg-accent/20 text-accent' : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {mode}B
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Scale */}
              <div>
                <span className="text-[9px] font-mono text-white/60 block mb-1.5">TIME SCALE</span>
                <div className="flex gap-1">
                  {[1.0, 2.0, 4.0].map((spd) => (
                    <button key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`flex-1 py-1 text-[8.5px] font-mono rounded border cursor-pointer transition-colors ${
                        playbackSpeed === spd ? 'border-accent bg-accent/15 text-accent' : 'border-white/5 bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Auto Replay */}
              <div className="flex justify-between items-center text-[9px] font-mono pt-2 border-t border-white/10 mt-auto">
                <span className="text-white/60">AUTO REPLAY</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={autoReplay} onChange={(e) => setAutoReplay(e.target.checked)} className="sr-only peer" />
                  <div className="w-8 h-4 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Oscilloscope */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 flex-shrink-0">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-poppins font-black text-[10px] uppercase tracking-widest text-white/70">Oscilloscope</h4>
              <span className="text-[8px] font-mono bg-accent/20 text-accent px-1.5 py-0.5 rounded animate-pulse border border-accent/20">LIVE</span>
            </div>
            <div className="w-full h-14 bg-[#04080e] rounded-lg p-1 border border-white/5 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline fill="none" stroke="#FF6B00" strokeWidth="2.5"
                  points={sparklineData.map((val, idx) => {
                    const x = (idx / (sparklineData.length - 1)) * 100;
                    const y = 90 - ((val - 50) / 400) * 80;
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>
              <div className="absolute inset-0 grid grid-rows-3 pointer-events-none opacity-10">
                <div className="border-b border-white"></div>
                <div className="border-b border-white"></div>
              </div>
            </div>
            <div className="flex justify-between text-[8px] font-mono text-white/40 mt-1">
              <span>80 BAR</span><span>250 BAR</span><span>450 BAR</span>
            </div>
          </div>
        </section>


        {/* CENTER COLUMN: Interactive SVG Blueprint */}
        <section className="order-1 lg:order-2 contents lg:flex lg:flex-col lg:gap-3">

          {/* ── Diagram Title Bar ── */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-5 bg-accent rounded-full shrink-0" />
              <div>
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">MH-SIM-001 · ISO 1219</span>
                <h2 className="text-[12px] font-bold font-poppins uppercase tracking-wider text-white leading-none mt-0.5">
                  Closed-Loop Hydraulic Power Circuit
                </h2>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[8px] font-bold uppercase tracking-widest self-start sm:self-auto shrink-0 transition-all duration-300 ${isPlaying ? 'bg-green-950/60 border-green-500/40 text-green-400' : 'bg-white/5 border-white/10 text-white/25'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`} />
              {isPlaying ? 'Live' : 'Standby'}
            </div>
          </div>

          {/* ── Main Circuit Glass Panel ── */}
          <div
            ref={blueprintAreaRef}
            onMouseMove={handleMouseMove}
            className={`p-4 md:p-6 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col items-center select-none shadow-2xl transition-all duration-500 sticky top-[76px] md:top-[84px] lg:relative lg:top-0 z-30 ${blueprintMode
                ? 'bg-[#001a3a] border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)]'
                : 'bg-[#111111]'
              }`}
          >

            {/* Moving Blueprint Grid [Feature 17] */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                animation: isPlaying ? 'gridPan 10s linear infinite' : 'none'
              }}
            />

            {/* Glowing reflection behind metal components [Feature 33] */}
            <div
              className="absolute pointer-events-none w-72 h-72 rounded-full filter blur-3xl opacity-30 transition-all duration-500"
              style={{
                background: pressureMode === 420 ? 'radial-gradient(circle, #ff2a00 0%, transparent 70%)' : 'radial-gradient(circle, #ff6a00 0%, transparent 70%)',
                top: '20%',
                left: '25%',
                transform: `scale(${1 + (rpm / 3000) * 0.3})`
              }}
            />





            {/* ── The Master Hydraulic SVG Schematic ── */}
            <svg
              ref={circuitSvgRef}
              viewBox="0 0 600 380"
              className="w-full aspect-[600/380] relative z-10 drop-shadow-[0_0_20px_rgba(255,107,0,0.08)] overflow-visible"
            >
              {/* SVG Styles & Filters */}
              <defs>
                <filter id="pipeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="pressureGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="metallicSweep" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="40%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="oilGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF6B00" />
                  <stop offset="100%" stopColor="#FF9933" />
                </linearGradient>
                <linearGradient id="motorBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2c3545" />
                  <stop offset="50%" stopColor="#1e2532" />
                  <stop offset="100%" stopColor="#0f131a" />
                </linearGradient>
                <pattern id="filterGrid" width="6" height="6" patternUnits="userSpaceOnUse">
                  <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#ff6b00" strokeWidth="0.5" opacity="0.3" />
                </pattern>
                <pattern id="coolerGrid" width="4" height="10" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#444444" strokeWidth="1" />
                </pattern>
              </defs>

              {/* ── PIPES & CONDUITS LAYOUT ── */}

              {/* Suction Line: Reservoir -> Suction Filter -> Pump Inlet */}
              <g
                onMouseEnter={() => {
                  setHoveredPipe('inlet');
                }}
                onMouseLeave={() => setHoveredPipe(null)}
                className="cursor-pointer group"
              >
                {/* Background pipe casing */}
                <path d="M 95 320 L 95 180 L 113 180" fill="none" stroke={blueprintMode ? "#00ffff" : "#1e293b"} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M 95 320 L 95 180 L 113 180"
                  fill="none"
                  stroke={hoveredPipe === 'inlet' ? "#ff8c00" : "#ff5100"}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                  filter={hoveredPipe === 'inlet' ? "url(#pipeGlow)" : "none"}
                  className="transition-all duration-300"
                />
                {/* Flowing Fluid Particles */}
                {isPlaying && (
                  <path
                    d="M 95 320 L 95 180 L 113 180"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="5, 15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      animation: 'oilFlow linear infinite',
                      animationDuration: `${2 / ((rpm / 1500) * oilSpeedMultiplier)}s`
                    }}
                    opacity="0.75"
                  />
                )}

              </g>

              {/* Pressure Line: Pump Outlet -> PRV branch -> Gauge branch -> Solenoid Valve Port P */}
              <g
                onMouseEnter={() => {
                  setHoveredPipe('pressure');
                }}
                onMouseLeave={() => setHoveredPipe(null)}
                className="cursor-pointer group"
              >
                <path d="M 157 180 L 270 180" fill="none" stroke={blueprintMode ? "#00ffff" : "#1e293b"} strokeWidth="10" strokeLinecap="round" />
                <path
                  d="M 157 180 L 270 180"
                  fill="none"
                  stroke={pressureMode === 420 ? "#ff1100" : (pressureMode === 250 ? "#ff5100" : "#ff8c00")}
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#pressureGlow)"
                />
                {/* Pressure pulses */}
                {isPlaying && (
                  <path
                    d="M 157 180 L 270 180"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="6, 20"
                    style={{
                      animation: 'oilFlow linear infinite',
                      animationDuration: `${1.5 / ((rpm / 1500) * oilSpeedMultiplier)}s`
                    }}
                    opacity="0.9"
                  />
                )}

              </g>

              {/* PRV Bypass Line: PRV -> Reservoir Tank */}
              <g className="opacity-80">
                <path d="M 190 180 L 190 220" fill="none" stroke={blueprintMode ? "#00ffff" : "#1e293b"} strokeWidth="8" />
                <path d="M 190 240 L 190 295" fill="none" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="8" strokeLinecap="round" />
                {pressureMode === 420 && isPlaying && (
                  <path
                    d="M 190 180 L 190 295"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4, 10"
                    style={{
                      animation: 'oilFlow linear infinite',
                      animationDuration: `${1.5 / ((rpm / 1500) * oilSpeedMultiplier)}s`
                    }}
                  />
                )}
              </g>

              {/* Gauge Sensing Line */}
              <g className="opacity-80">
                <path d="M 235 180 L 235 220" fill="none" stroke={blueprintMode ? "#00ffff" : "#ff2a00"} strokeWidth="6" />
              </g>

              {/* Cylinder Port A Line: Valve Port A -> Cylinder Cap End */}
              <g
                onMouseEnter={() => {
                  setHoveredPipe('port-a');
                }}
                onMouseLeave={() => setHoveredPipe(null)}
                className="cursor-pointer group"
              >
                <path d="M 285 150 L 285 90 L 380 90" fill="none" stroke={blueprintMode ? "#00ffff" : "#1e293b"} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M 285 150 L 285 90 L 380 90"
                  fill="none"
                  stroke={strokeDir === 1 ? "#ff1100" : "#ff8c00"}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={strokeDir === 1 ? "url(#pressureGlow)" : "none"}
                />
                {isPlaying && strokeDir !== 0 && (
                  <path
                    d="M 285 150 L 285 90 L 380 90"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4, 15"
                    style={{
                      animation: 'oilFlow linear infinite',
                      animationDuration: `${2 / ((rpm / 1500) * oilSpeedMultiplier)}s`,
                      animationDirection: strokeDir === -1 ? 'reverse' : 'normal'
                    }}
                    opacity="0.8"
                  />
                )}
              </g>

              {/* Cylinder Port B Line: Valve Port B -> Cylinder Rod End */}
              <g
                onMouseEnter={() => {
                  setHoveredPipe('port-b');
                }}
                onMouseLeave={() => setHoveredPipe(null)}
                className="cursor-pointer group"
              >
                <path d="M 315 150 L 315 115 L 460 115 L 460 90" fill="none" stroke={blueprintMode ? "#00ffff" : "#1e293b"} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M 315 150 L 315 115 L 460 115 L 460 90"
                  fill="none"
                  stroke={strokeDir === -1 ? "#ff1100" : "#ff8c00"}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={strokeDir === -1 ? "url(#pressureGlow)" : "none"}
                />
                {isPlaying && strokeDir !== 0 && (
                  <path
                    d="M 315 150 L 315 115 L 460 115 L 460 90"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4, 15"
                    style={{
                      animation: 'oilFlow linear infinite',
                      animationDuration: `${2 / ((rpm / 1500) * oilSpeedMultiplier)}s`,
                      animationDirection: strokeDir === 1 ? 'reverse' : 'normal'
                    }}
                    opacity="0.8"
                  />
                )}
              </g>

              {/* Return Line: Valve Port T -> Cooler -> Return Filter -> Reservoir */}
              <g
                onMouseEnter={() => {
                  setHoveredPipe('return');
                }}
                onMouseLeave={() => setHoveredPipe(null)}
                className="cursor-pointer group"
              >
                <path d="M 300 200 L 300 265 L 380 265" fill="none" stroke={blueprintMode ? "#00ffff" : "#1e293b"} strokeWidth="10" strokeLinejoin="round" />
                <path d="M 440 275 L 290 275" fill="none" stroke={blueprintMode ? "#00ffff" : "#1e293b"} strokeWidth="10" />
                <path d="M 270 275 L 160 275 L 160 295" fill="none" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />

                <path
                  d="M 300 200 L 300 265 L 380 265 M 440 275 L 160 275 L 160 295"
                  fill="none"
                  stroke={hoveredPipe === 'return' ? "#ff9933" : "#ff6b00"}
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                {isPlaying && strokeDir !== 0 && (
                  <path
                    d="M 300 200 L 300 265 L 380 265 M 440 275 L 160 275 L 160 295"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="5, 15"
                    style={{
                      animation: 'oilFlow linear infinite',
                      animationDuration: `${2.5 / ((rpm / 1500) * oilSpeedMultiplier)}s`
                    }}
                    opacity="0.8"
                  />
                )}
              </g>


              {/* ── COMPONENTS LAYOUT & RENDERINGS ── */}

              {/* 1. RESERVOIR OIL TANK */}
              <g
                onClick={() => {
                  setActiveInfoComponent('reservoir');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('tank');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'tank' ? 0.2 : 1 }}
              >
                {/* Breather filter & cap */}
                <rect x="80" y="285" width="12" height="10" fill="#2c3545" stroke="#ff6b00" strokeWidth="1" />
                <circle cx="86" cy="285" r="8" fill="#1e2532" stroke="#ff6b00" strokeWidth="1" />

                {/* Casing */}
                <rect x="70" y="295" width="120" height="60" rx="4" fill="#0d1117" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="2.5" />

                {/* Dynamic Oil Level path */}
                <rect
                  x="73"
                  y={300 + (cylinderPos / 100) * 12}
                  width="114"
                  height={52 - (cylinderPos / 100) * 12}
                  fill="url(#oilGradient)"
                  opacity="0.3"
                  className="transition-all duration-300"
                />

                {/* Level glass gauge tube */}
                <line x1="73" y1={300 + (cylinderPos / 100) * 12} x2="187" y2={300 + (cylinderPos / 100) * 12} stroke="#ff9933" strokeWidth="1.5" className="transition-all duration-300" />

                {/* Drain plug */}
                <rect x="125" y="355" width="10" height="4" fill="#ff6b00" rx="1" />

                <text x="130" y="340" fill="#ff6b00" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" opacity="0.8">
                  TANK
                </text>
              </g>

              {/* 2. SUCTION FILTER */}
              <g
                onClick={() => {
                  setActiveInfoComponent('suction_filter');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('suction_filter');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'suction_filter' ? 0.2 : 1 }}
              >
                <rect x="83" y="225" width="24" height="30" rx="2" fill="#0d1117" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="2" />
                {/* Grid filter mesh inside */}
                <rect x="85" y="227" width="20" height="26" fill="url(#filterGrid)" />
                <text x="76" y="243" fill="#ff6b00" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="end">
                  S-FILT
                </text>
              </g>

              {/* 3. ELECTRIC MOTOR */}
              <g
                onClick={() => {
                  setActiveInfoComponent('motor');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('motor');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'motor' ? 0.2 : 1 }}
              >
                {/* Motor Body shape with premium round gradient */}
                <rect x="15" y="160" width="70" height="40" rx="6" fill="url(#motorBodyGrad)" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="2" />

                {/* Cooling fins */}
                <line x1="25" y1="160" x2="25" y2="200" stroke="#ff6b00" strokeWidth="1" opacity="0.6" />
                <line x1="35" y1="160" x2="35" y2="200" stroke="#ff6b00" strokeWidth="1" opacity="0.6" />
                <line x1="45" y1="160" x2="45" y2="200" stroke="#ff6b00" strokeWidth="1" opacity="0.6" />
                <line x1="55" y1="160" x2="55" y2="200" stroke="#ff6b00" strokeWidth="1" opacity="0.6" />
                <line x1="65" y1="160" x2="65" y2="200" stroke="#ff6b00" strokeWidth="1" opacity="0.6" />

                {/* Rotating shaft line */}
                <rect x="85" y="177" width="20" height="6" fill="#888888" stroke="#ff6b00" strokeWidth="0.5" />

                {/* Motor drive label */}
                <text x="50" y="152" fill="#ff6b00" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  AC MOTOR
                </text>
              </g>

              {/* 4. FLEXIBLE COUPLING */}
              <g
                onClick={() => {
                  setActiveInfoComponent('coupling');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('coupling');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'coupling' ? 0.2 : 1 }}
              >
                {/* Shaft coupling flanges */}
                <rect x="91" y="171" width="6" height="18" fill="#1b2535" stroke="#ff6b00" strokeWidth="1.5" />
                <rect x="97" y="171" width="6" height="18" fill="#1b2535" stroke="#ff6b00" strokeWidth="1.5" />
                {/* Center flexible element */}
                <rect x="95" y="173" width="4" height="14" fill="#ff6b00" opacity={isPlaying ? 0.9 : 0.6} />

                {/* Subtle rotational visual spin when active */}
                {isPlaying && (
                  <line
                    x1="92" y1="180" x2="101" y2="180"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    transform={`rotate(${rpm * 0.25}, 96, 180)`}
                  />
                )}
              </g>

              {/* 5. GEAR PUMP */}
              <g
                onClick={() => {
                  setActiveInfoComponent('pump');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('pump');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'pump' ? 0.2 : 1 }}
              >
                <text x="135" y="152" fill="#ff6b00" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  GEAR PUMP
                </text>

                {/* Outer casing */}
                <circle cx="135" cy="180" r="22" fill="#0d1117" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="2.5" />

                {/* Driver Gear */}
                <g
                  transform={`translate(135, 172) rotate(${isPlaying ? (rpm * 0.15) : 0})`}
                >
                  <circle cx="0" cy="0" r="8" fill="none" stroke="#ff8c00" strokeWidth="1.5" strokeDasharray="3, 3" />
                  <line x1="-8" y1="0" x2="8" y2="0" stroke="#ff8c00" strokeWidth="1" />
                  <line x1="0" y1="-8" x2="0" y2="8" stroke="#ff8c00" strokeWidth="1" />
                </g>

                {/* Driven Gear */}
                <g
                  transform={`translate(135, 188) rotate(${isPlaying ? (-rpm * 0.15) : 0})`}
                >
                  <circle cx="0" cy="0" r="8" fill="none" stroke="#ff8c00" strokeWidth="1.5" strokeDasharray="3, 3" />
                  <line x1="-8" y1="0" x2="8" y2="0" stroke="#ff8c00" strokeWidth="1" />
                  <line x1="0" y1="-8" x2="0" y2="8" stroke="#ff8c00" strokeWidth="1" />
                </g>


              </g>

              {/* 6. PRESSURE RELIEF VALVE (PRV) */}
              <g
                onClick={() => {
                  setActiveInfoComponent('prv');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('prv');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'prv' ? 0.2 : 1 }}
              >
                <rect x="178" y="215" width="24" height="24" rx="2" fill="#0d1117" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="2" />
                {/* Valve spring symbol */}
                <path d="M 183 227 L 197 227 M 190 220 L 190 234 M 186 222 L 194 232" stroke="#ff8c00" strokeWidth="1.2" />
                <text x="190" y="210" fill="#ff6b00" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  PRV
                </text>
              </g>

              {/* 7. PRESSURE GAUGE */}
              <g
                onClick={(e) => {
                  handleGaugeClick(e);
                  setActiveInfoComponent('gauge');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('gauge');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'gauge' ? 0.2 : 1 }}
              >
                {/* Pressure glow background */}
                <circle cx="235" cy="242" r="20" fill="rgba(255,107,0,0.15)" className="animate-pulse" />

                {/* Click ripples */}
                {ripples.map((rip) => (
                  <circle
                    key={rip.id}
                    cx="235"
                    cy="242"
                    r="22"
                    fill="none"
                    stroke="#ff5100"
                    strokeWidth="1.5"
                    className="animate-[ripple_0.8s_ease-out_forwards]"
                  />
                ))}

                <circle cx="235" cy="242" r="22" fill="#0d1117" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="2.5" />
                <circle cx="235" cy="242" r="18" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.2" />

                {/* Dial increments */}
                <path d="M 221 242 L 225 242 M 249 242 L 245 242 M 235 228 L 235 232" stroke="#ffffff" strokeWidth="1" opacity="0.4" />

                {/* Needle with spring bounce & vibration */}
                <line
                  x1="235" y1="242"
                  x2="235" y2="227"
                  stroke="#ff2a00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '235px 242px',
                    transform: `rotate(${-60 + (pressureMode / 420) * 180 + (isPlaying ? (Math.sin(Date.now() * 0.05) * (pressureMode / 420) * 3.5) : 0)
                      }deg)`,
                    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                />

                <circle cx="235" cy="242" r="3.5" fill="#ffffff" />

                {/* Mini digital pressure display */}
                <rect x="220" y="254" width="30" height="9" fill="#04080e" stroke="#ff6b00" strokeWidth="0.5" rx="1" />
                <text x="235" y="261" fill="#ff6b00" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {pressureMode}B
                </text>
              </g>

              {/* 8. DIRECTIONAL CONTROL VALVE */}
              <g
                onClick={() => {
                  setActiveInfoComponent('valve');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('valve');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'valve' ? 0.2 : 1 }}
              >


                <text x="348" y="142" fill="#ff6b00" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="start">
                  DCV (4/3)
                </text>

                {/* Valve base casing */}
                <rect x="270" y="150" width="60" height="50" rx="3" fill="#0d1117" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="2.5" />

                {/* Spool center line */}
                <line x1="270" y1="175" x2="330" y2="175" stroke="#ff5100" strokeWidth="1" strokeDasharray="2,2" opacity="0.4" />

                {/* Left Solenoid Coil S1 */}
                <rect x="256" y="160" width="14" height="30" fill={strokeDir === 1 ? "#ff5100" : "#1b2535"} stroke="#ff6b00" strokeWidth="1.5" />
                <text x="263" y="178" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">S1</text>

                {/* Right Solenoid Coil S2 */}
                <rect x="330" y="160" width="14" height="30" fill={strokeDir === -1 ? "#ff5100" : "#1b2535"} stroke="#ff6b00" strokeWidth="1.5" />
                <text x="337" y="178" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">S2</text>

                {/* Sliding internal spool representation */}
                <g
                  style={{
                    transform: strokeDir === 1 ? 'translateX(5px)' : strokeDir === -1 ? 'translateX(-5px)' : 'none',
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                >
                  <rect x="280" y="165" width="40" height="20" rx="1" fill="#1b2535" stroke="#ff8c00" strokeWidth="1" opacity="0.8" />
                  {/* Schematic flow arrows inside spool */}
                  {strokeDir === 1 && (
                    <path d="M 285 180 L 295 170 M 285 170 L 295 180 M 305 170 L 315 180" stroke="#ff6b00" strokeWidth="1.2" strokeLinecap="round" />
                  )}
                  {strokeDir === -1 && (
                    <path d="M 285 180 L 295 170 M 305 180 L 315 170 M 305 170 L 315 180" stroke="#ff6b00" strokeWidth="1.2" strokeLinecap="round" />
                  )}
                  {strokeDir === 0 && (
                    <path d="M 288 175 H 298 M 302 175 H 312" stroke="#ff6b00" strokeWidth="1.5" />
                  )}
                </g>
              </g>

              {/* 9. HYDRAULIC CYLINDER */}
              <g
                onClick={() => {
                  setActiveInfoComponent('cylinder');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('cylinder');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'cylinder' ? 0.2 : 1 }}
              >
                <text x="435" y="32" fill="#ff6b00" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  CYLINDER (TIE-ROD)
                </text>

                {/* Cylinder block */}
                <g
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: isExploded ? 'translateY(-22px)' : 'translateY(0px)'
                  }}
                >
                  {/* Transparent Glass Barrel Casing */}
                  <rect
                    x="380"
                    y="60"
                    width="110"
                    height="40"
                    rx="3"
                    fill="rgba(27,37,53,0.3)"
                    stroke={blueprintMode ? "#00ffff" : "#ff6b00"}
                    strokeWidth="2.5"
                  />

                  {/* Chamber A (Cap End Oil Fill) */}
                  <rect
                    x="382"
                    y="62"
                    width={2 + (cylinderPos / 100) * 92}
                    height="36"
                    fill="url(#oilGradient)"
                    opacity={strokeDir === 1 ? 0.35 : 0.08}
                    className="transition-all duration-300"
                  />

                  {/* Chamber B (Rod End Oil Fill) */}
                  <rect
                    x={384 + (cylinderPos / 100) * 92}
                    y="62"
                    width={104 - (cylinderPos / 100) * 92}
                    height="36"
                    fill="url(#oilGradient)"
                    opacity={strokeDir === -1 ? 0.35 : 0.08}
                    className="transition-all duration-300"
                  />

                  {/* Cylinder Tie-rods (top & bottom bolts) */}
                  <line x1="375" y1="58" x2="495" y2="58" stroke="#888" strokeWidth="1.5" opacity="0.6" />
                  <line x1="375" y1="102" x2="495" y2="102" stroke="#888" strokeWidth="1.5" opacity="0.6" />
                </g>

                {/* Sliding piston & rod assembly */}
                <g
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: isExploded
                      ? `translate(${cylinderPos * 0.9}px, 20px)`
                      : `translate(${cylinderPos * 0.9}px, 0px)`
                  }}
                >
                  {/* Piston block with seal ring grooves */}
                  <rect x="382" y="63" width="12" height="34" fill="#2c3545" stroke="#ff6b00" strokeWidth="1.5" rx="1" />
                  <rect x="386" y="64" width="4" height="32" fill="#ff6b00" opacity="0.8" /> {/* NBR Seal */}

                  {/* Ground/Hardened Piston Rod */}
                  <rect x="394" y="73" width="90" height="14" fill="#0d1117" stroke="#ff8c00" strokeWidth="1.5" rx="1" />
                  <rect x="396" y="75" width="86" height="10" fill="url(#metallicSweep)" opacity="0.25" />

                  {/* Clevis Eye mount */}
                  <rect x="484" y="68" width="12" height="24" rx="1" fill="#222" stroke="#ff6b00" strokeWidth="1.5" />
                  <circle cx="496" cy="80" r="8" fill="#1b2535" stroke="#ff6b00" strokeWidth="1.5" />
                  <circle cx="496" cy="80" r="3.5" fill="#fff" />

                  {/* Force load glow visualizer */}
                  {isPlaying && strokeDir !== 0 && (
                    <circle cx="496" cy="80" r={10 + (pressureMode / 420) * 12} fill="none" stroke="#ff2a00" strokeWidth="1.5" strokeDasharray="3, 3" className="animate-ping" />
                  )}
                </g>


              </g>

              {/* 10. RETURN FILTER */}
              <g
                onClick={() => {
                  setActiveInfoComponent('return_filter');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('return_filter');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'return_filter' ? 0.2 : 1 }}
              >
                <rect x="270" y="260" width="20" height="20" rx="2" fill="#0d1117" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="2" />
                <rect x="272" y="262" width="16" height="16" fill="url(#filterGrid)" />
                <text x="280" y="254" fill="#ff6b00" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  R-FILT
                </text>
              </g>

              {/* 11. RADIATOR OIL COOLER */}
              <g
                onClick={() => {
                  setActiveInfoComponent('cooler');
                  playValveClickSynth(isMuted);
                }}
                onMouseEnter={() => {
                  setHoveredComponent('cooler');
                }}
                onMouseLeave={() => setHoveredComponent(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: hoveredComponent && hoveredComponent !== 'cooler' ? 0.2 : 1 }}
              >
                <text x="420" y="228" fill="#ff6b00" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  OIL COOLER
                </text>

                {/* Radiator structure frame */}
                <rect x="380" y="240" width="80" height="50" rx="3" fill="#0b111a" stroke={blueprintMode ? "#00ffff" : "#ff6b00"} strokeWidth="2.5" />
                <rect x="385" y="245" width="70" height="40" fill="url(#coolerGrid)" opacity="0.3" />

                {/* Heat glow red/blue indicator */}
                <circle cx="420" cy="265" r="16" fill="none" stroke={temperature > 65 ? "#ff2a00" : "#00ffff"} strokeWidth="1" opacity="0.35" className="animate-pulse" />

                {/* Fan motor & blades */}
                <circle cx="420" cy="265" r="14" fill="#0d1117" stroke="#ff8c00" strokeWidth="1" />

                {/* Rotating blades */}
                <g
                  transform={`translate(420, 265) rotate(${isPlaying ? (temperature * rpm * 0.12) : 0})`}
                >
                  <path d="M-3,-12 L3,-12 L1.5,0 L-1.5,0 Z" fill="#ff8c00" />
                  <path d="M-3,12 L3,12 L1.5,0 L-1.5,0 Z" fill="#ff8c00" />
                  <path d="M-12,-3 L-12,3 L0,1.5 L0,-1.5 Z" fill="#ff8c00" />
                  <path d="M12,-3 L12,3 L0,1.5 L0,-1.5 Z" fill="#ff8c00" />
                </g>
              </g>

            </svg>



            {/* Visual Legend for Normal Users */}
            <div className="w-full mt-3 grid grid-cols-3 gap-2 px-2 py-2 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[9px] text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded bg-[#ff1100] shadow-[0_0_8px_rgba(255,17,0,0.5)] shrink-0" />
                <span>🔴 High Pressure (Supply)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded bg-[#ff8c00] shrink-0" />
                <span>🟠 Low Pressure (Return)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 rounded border border-dashed border-white shrink-0" />
                <span>⚪ Oil Flow (Pipes)</span>
              </div>

            </div>

            {/* Dynamic Bottom Information Panel [Feature 49] */}
            {activeInfoComponent && (
              <div className="w-full mt-2.5 bg-[#050a11] border border-white/10 p-3 rounded-lg flex flex-col gap-2 transition-all duration-300 relative">
                {/* Close/Cancel Button */}
                <button
                  onClick={() => {
                    setActiveInfoComponent(null);
                    playValveClickSynth(isMuted);
                  }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-[10px] text-white/50 hover:text-white transition-all cursor-pointer z-10 font-bold"
                  title="Close details"
                >
                  ✕
                </button>

                <div className="flex items-start gap-2 pr-5">
                  <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-[10px] font-mono text-accent font-black uppercase tracking-wider">
                      {componentDetails[activeInfoComponent]?.name}
                    </h4>
                    <p className="text-[9.5px] font-mono text-white/50 leading-relaxed mt-0.5">
                      {componentDetails[activeInfoComponent]?.desc}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* (Notifications moved outside — see fixed toasts below layout) */}

          </div>
        </section>


        {/* RIGHT COLUMN: Diagnostics & Specs */}
        <section className="flex flex-col gap-4 order-3">

          {/* Live System Diagnostics Dashboard */}
          <div className="glass-panel p-4 rounded-xl border border-white/10">
            <h4 className="font-poppins font-black text-[10px] uppercase tracking-widest text-accent mb-3 border-l-2 border-accent pl-2">
              System Telemetry
            </h4>
            <div className="grid grid-cols-2 gap-2 font-mono text-[9px]">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">Pressure</span>
                <span className="text-accent font-bold text-[10px]">{pressureMode} BAR</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">Flow Rate</span>
                <span className="text-white font-bold text-[10px]">{flowRate.toFixed(1)} LPM</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">Oil Temp</span>
                <span className={`font-bold text-[10px] ${temperature > 80 ? 'text-red-400' : temperature > 55 ? 'text-yellow-400' : 'text-green-400'}`}>{temperature}°C</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">Motor</span>
                <span className="text-white font-bold text-[10px]">{rpm} RPM</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">Efficiency</span>
                <span className="text-white font-bold text-[10px]">{pumpEfficiency.toFixed(1)}%</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">Power</span>
                <span className="text-white font-bold text-[10px]">{powerKw.toFixed(1)} kW</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">Oil Level</span>
                <span className="text-white font-bold text-[10px]">{oilLevel.toFixed(0)}%</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">Filter</span>
                <span className="text-white font-bold text-[10px]">{filterHealth.toFixed(1)}%</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">State</span>
                <span className={`font-bold text-[10px] ${isPlaying ? 'text-green-400' : 'text-yellow-400'}`}>{isPlaying ? 'RUNNING' : 'STANDBY'}</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-white/40 text-[7.5px] block uppercase">Health</span>
                <span className={`font-bold text-[10px] ${pressureMode === 420 && rpm > 2200 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                  {pressureMode === 420 && rpm > 2200 ? 'WARN' : 'HEALTHY'}
                </span>
              </div>
            </div>
          </div>

          {/* Actuator Breakdown Module */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 flex-1">
            <h4 className="font-poppins font-black text-[10px] uppercase tracking-widest text-white/70 mb-2">
              Actuator Breakdown
            </h4>
            <p className="text-[9px] font-mono text-white/50 leading-relaxed mb-3">
              Isolate assembly parts to inspect core gaskets, internal cylinder tube guides, and chrome rods.
            </p>
            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`w-full py-1.5 border text-[10px] font-bold font-mono rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isExploded ? 'border-accent bg-accent text-dark-bg' : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {isExploded ? 'SNAP BACK' : 'EXPLODED VIEW'}
            </button>
          </div>

          {/* System Logs / Alerts / Diagnostics */}
          <div className="glass-panel p-4 rounded-xl border border-white/10">
            <h4 className="font-poppins font-black text-[10px] uppercase tracking-widest text-white/70 mb-2 border-l-2 border-white/20 pl-2">
              System Logs / Alerts / Diagnostics
            </h4>
            <div className="space-y-1.5">
              {/* Live event log entries */}
              <div className="flex items-start gap-2 text-[8.5px] font-mono">
                <span className="text-green-400 shrink-0 mt-0.5">●</span>
                <span className="text-white/60">Pump running at {rpm} RPM — normal operation</span>
              </div>
              <div className="flex items-start gap-2 text-[8.5px] font-mono">
                <span className={`shrink-0 mt-0.5 ${temperature > 65 ? 'text-yellow-400' : 'text-green-400'}`}>●</span>
                <span className="text-white/60">Oil temp: {temperature}°C — {temperature > 65 ? 'Cooling fan active' : 'Within range'}</span>
              </div>
              <div className="flex items-start gap-2 text-[8.5px] font-mono">
                <span className={`shrink-0 mt-0.5 ${pressureMode === 420 && rpm > 2200 ? 'text-red-400' : 'text-green-400'}`}>●</span>
                <span className="text-white/60">
                  {pressureMode === 420 && rpm > 2200
                    ? '⚠ Overload — reduce RPM or pressure'
                    : `Pressure: ${pressureMode} BAR — stable`
                  }
                </span>
              </div>
              <div className="flex items-start gap-2 text-[8.5px] font-mono">
                <span className="text-white/30 shrink-0 mt-0.5">●</span>
                <span className="text-white/40">Filter health: {filterHealth.toFixed(1)}% — no action needed</span>
              </div>
              <div className="flex items-start gap-2 text-[8.5px] font-mono">
                <span className="text-white/30 shrink-0 mt-0.5">●</span>
                <span className="text-white/40">Auto-replay: {autoReplay ? 'Enabled' : 'Disabled'} — {playbackSpeed}x speed</span>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* ── SALES PRODUCT INTEGRATION MODAL [Features 13, 24] ── */}
      <AnimatePresence>
        {activeProduct && (
          <div className="fixed inset-0 bg-dark-bg/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: -15 }}
              className="glass-panel max-w-2xl w-full p-6 md:p-8 rounded-3xl border border-white/10 bg-dark-bg/95 shadow-2xl relative flex flex-col md:flex-row gap-6 text-white"
            >
              <button
                onClick={() => {
                  setActiveProduct(null);
                  playValveClickSynth(isMuted);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all cursor-pointer z-10 font-bold"
              >
                ✕
              </button>

              {/* Left Side: Mockup / Branding */}
              <div className="w-full md:w-2/5 flex flex-col justify-between items-center bg-white/5 border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                <span className="text-[10px] font-mono text-accent font-extrabold uppercase tracking-widest block self-start">
                  MARUTI® OEM UNIT
                </span>

                <div className="my-6 relative flex justify-center items-center">
                  <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center relative shadow-[0_0_30px_rgba(255,107,0,0.15)] animate-pulse">
                    <span className="text-3xl">⚙️</span>
                  </div>
                  <div className="absolute -top-2 -left-2 text-[8px] font-mono text-white/30 border-l border-t border-white/20 p-1">100mm</div>
                  <div className="absolute -bottom-2 -right-2 text-[8px] font-mono text-white/30 border-r border-b border-white/20 p-1">H7 FIT</div>
                </div>

                <div className="w-full text-center">
                  <span className="text-[9px] font-mono text-white/40 block">ISO 9001:2015 CERTIFIED</span>
                  <span className="text-[8px] font-mono text-accent block mt-0.5 font-bold">100% QUALITY INSPECTED</span>
                </div>
              </div>

              {/* Right Side: Specifications */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-poppins font-black text-base uppercase text-white tracking-wide">
                    {productDetails[activeProduct]?.title}
                  </h3>
                  <p className="text-[10px] font-mono text-accent font-bold mt-1">
                    {productDetails[activeProduct]?.tagline}
                  </p>
                  <p className="text-[10.5px] font-mono text-white/60 leading-relaxed mt-3">
                    {productDetails[activeProduct]?.description}
                  </p>

                  <div className="mt-4 space-y-1.5 font-mono text-[9.5px]">
                    {Object.entries(productDetails[activeProduct]?.specs || {}).map(([key, val]) => (
                      <div key={key} className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-white/40 uppercase">{key}:</span>
                        <span className="text-white font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                  <Link
                    to={`/products/${productDetails[activeProduct]?.productId}`}
                    onClick={() => {
                      setActiveProduct(null);
                      playValveClickSynth(isMuted);
                    }}
                    className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-extrabold text-[10px] font-mono uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  >
                    View Product
                  </Link>
                  <button
                    onClick={() => {
                      const specContent = `
MARUTI HYDRAULICS® SPECIFICATION SHEET
Product: ${productDetails[activeProduct]?.title}
----------------------------------------
${Object.entries(productDetails[activeProduct]?.specs || {}).map(([key, val]) => `${key}: ${val}`).join('\n')}
----------------------------------------
Precision Engineered in Gujarat, India.
`;
                      const blob = new Blob([specContent], { type: 'text/plain' });
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(blob);
                      link.download = `MH_${activeProduct}_spec_sheet.txt`;
                      link.click();
                    }}
                    className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-extrabold text-[10px] font-mono uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  >
                    Download Datasheet
                  </button>
                  <Link
                    to="/contact"
                    onClick={() => {
                      setActiveProduct(null);
                      playValveClickSynth(isMuted);
                    }}
                    className="flex-1 py-2 bg-accent text-dark-bg font-black text-[10px] font-mono uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer text-center"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ── FIXED TOAST NOTIFICATIONS (non-overlapping) ── */}

      {/* Cycle Complete status is now shown inline in the Flow Phase HUD box above the schematic */}

      {/* Overload Warning Toast — fixed top-right, compact badge */}
      <AnimatePresence>
        {showOverloadAlert && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-24 right-6 z-[100] flex items-center gap-2 bg-red-600/95 backdrop-blur-md border border-red-400/50 text-white px-4 py-2 rounded-xl shadow-2xl shadow-red-900/40 pointer-events-none"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-wide">⚠ Overload — Reduce RPM or Pressure</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Animations custom definitions */}

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        @keyframes oilFlow {
          from {
            stroke-dashoffset: 40;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-150px) skewX(-20deg);
          }
          100% {
            transform: translateX(250px) skewX(-20deg);
          }
        }
        @keyframes ripple {
          0% {
            r: 20;
            opacity: 0.8;
          }
          100% {
            r: 45;
            opacity: 0;
          }
        }
        @keyframes gridPan {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 48px 48px;
          }
        }
        @keyframes statusBlink {
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 4px rgba(74, 222, 128, 0.6));
          }
          50% {
            opacity: 0.3;
            filter: drop-shadow(0 0 0px rgba(74, 222, 128, 0));
          }
        }
        .animate-status-blink {
          animation: statusBlink 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
