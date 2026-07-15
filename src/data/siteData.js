// Unified database for Maruti Hydraulics website copy and catalog details
import { 
  Wrench, Shield, Truck, Cpu, Layers, Disc, Settings, Activity,
  Hammer, BarChart2, FileText
} from 'lucide-react';

export const companyDetails = {
  name: "Maruti Hydraulics",
  tagline: "Engineering Power Through Precision",
  foundedYear: 2024,
  experienceYears: 2,
  headquarters: "Ahmedabad, Gujarat, India",
  phoneNumbers: ["+91 97371 13699", "+91 90165 26446"],
  emails: ["marutihydraulics09@gmail.com"],
  address: "5th Floor, Office no. B-524, Pushpak Corner, Opp. Navyug School, Naroda, Ahmedabad - 382345, Gujarat, India",
  factoryAddress: "GIDC Industrial Estate, Naroda, Ahmedabad, Gujarat, India",
  whatsappNumber: "+919737113699"
};

export const statistics = [
  { value: "2+", label: "Years Experience", description: "Active since company incorporation" },
  { value: "15+", label: "Projects Completed", description: "Heavy-duty custom builds successfully delivered" },
  { value: "10+", label: "Clients Served", description: "Trusted local industrial clients" },
  { value: "5+", label: "Industries Served", description: "Versatile hydraulic solutions" }
];

export const products = [
  {
    id: "plunger-cylinders",
    name: "Plunger Hydraulic Cylinders",
    tagline: "Single-acting, rod-only design for high-force push applications with minimal space.",
    image: "/Products/plunger.png",
    shortDescription: "A single chrome-plated plunger rod extending from a barrel without a conventional piston, delivering concentrated push force.",
    longDescription: "Plunger hydraulic cylinders use a single solid rod (the plunger) that moves directly within the barrel without a formal piston seal arrangement. The hydraulic fluid acts on the full cross-sectional area of the plunger at the base, making them ideal for applications requiring a powerful, precise push force in a compact envelope. They are single-acting by design and rely on external load for retraction.",
    features: [
      "Solid EN-8D hard chrome-plated plunger rod for maximum wear resistance",
      "Single-acting design — hydraulic pressure extends, gravity or spring retracts",
      "Compact, minimal-footprint build ideal for tight vertical installations",
      "Heavy-duty gland seals with PTFE or polyurethane wiper rings",
      "Available in stainless steel for corrosive or food-grade environments"
    ],
    applications: [
      "Hydraulic jacks and workshop press machines",
      "Stamping and blanking presses",
      "Die casting and forging presses",
      "Vertical lifting and clamping fixtures"
    ],
    specifications: {
      boreDia: "40 mm to 250 mm",
      rodDia: "20 mm to 200 mm (solid plunger)",
      stroke: "Up to 2000 mm",
      medium: "Mineral oil (ISO VG 46 / 68)",
      pressure: "Up to 250 Bar (25 MPa)",
      temperature: "-10 °C to 80 °C",
      seals: "PTFE, NBR, PU",
      construction: "Barrel: ST-52 Seamless Honed | Plunger: EN-8D hard chrome plated | Gland: Mild Steel / Cast Iron"
    }
  },
  {
    id: "tie-rod-cylinders",
    name: "Tie-Rod Hydraulic Cylinders",
    standard: "ISO 6020/2",
    tagline: "High strength, pressure sustainability and ease of maintenance.",
    image: "/Products/tie road.png",
    shortDescription: "Both caps connected with four high-tensile steel tie rods, offering superior strength and structural integrity.",
    longDescription: "Our Tie-Rod hydraulic cylinders are built according to ISO 6020/2 standards. By using four high-tensile steel tie rods to secure the cylinder caps to the barrel, this design distributes stress evenly, reduces fatigue, and facilitates extremely easy disassembly for seal replacement or maintenance in the field.",
    features: [
      "Built strictly according to ISO 6020/2 standards",
      "Available with standard M.S. end caps in round or square profiles",
      "PTFE seals and premium wear rings prevent leakage and metal-to-metal contact",
      "Robust double-acting configuration",
      "Easily adjustable cushion valves on both ends for deceleration"
    ],
    applications: [
      "Plastic injection molding machines",
      "Metal forming presses",
      "Factory automation assembly lines",
      "Automotive production jigs"
    ],
    specifications: {
      boreDia: "40 mm to 300 mm",
      rodDia: "25 mm to 200 mm",
      stroke: "Up to 2000 mm (Specials up to 3500 mm)",
      medium: "Mineral oil (ISO VG 68), water-glycol, fire-resistant fluids",
      pressure: "200 Bar (20 MPa) standard / Up to 345 Bar on request",
      temperature: "-10 °C to 60 °C (Up to 150 °C with Viton seals)",
      seals: "PTFE, NBR, PU, VITON",
      construction: "End caps: Mild Steel | Tube: ST-52 Seamless Honed | Piston Rod: EN-8D hard chrome plated (Stainless Steel optional) | Piston: Mild Steel"
    }
  },
  {
    id: "welded-cylinders",
    name: "Welded Hydraulic Cylinders",
    tagline: "Compact, robust, and engineered for heavy-duty structural load environments.",
    image: "/Products/welded.png",
    shortDescription: "End caps are welded directly to the heavy-wall steel barrel, eliminating tie rods and reducing overall footprint.",
    longDescription: "Welded hydraulic cylinders are the design of choice for mobile equipment and demanding industrial applications. The cross-sectional size is minimized by welding the end caps directly to the barrel, which maximizes physical clearance in tightly packaged environments. This rugged assembly technique handles intense pressures, side-loads, and extreme vibration without risk of stretching tie rods.",
    features: [
      "Heavy-duty welded steel construction for maximum lifespan",
      "Slimmer design allows fitting in tight mobile envelopes",
      "PTFE wear rings and dual-lip polyurethane rod seals",
      "High shock load resistance under structural strain",
      "Multiple mounting configurations including spherical bearing pivots"
    ],
    applications: [
      "Excavators, bulldozers, backhoes, and mobile cranes",
      "Mining scrapers and drilling rigs",
      "Waste handling trucks and compactors",
      "Agricultural tractors and harvesting equipment"
    ],
    specifications: {
      boreDia: "40 mm to 300 mm",
      rodDia: "25 mm to 200 mm",
      stroke: "Up to 2000 mm",
      medium: "Mineral oil (ISO VG 68), water-glycol, fire-resistant fluids",
      pressure: "200 Bar (20 MPa) / 345 Bar (34.5 MPa) *Special case",
      temperature: "-10 °C to 60 °C (Up to 150 °C with Viton seals)",
      seals: "PTFE, NBR, PU, VITON",
      construction: "End caps: Mild Steel | Tube: ST-52 Seamless Honed | Piston Rod: EN-8D hard chrome plated | Mountings: Mild Steel / Cast Iron"
    }
  },
  {
    id: "mill-type-cylinders",
    name: "Mill-Type Hydraulic Cylinders",
    tagline: "Extreme-duty bolted flange construction for harsh, continuous-operation steel mills.",
    image: "/Products/Mill type.png",
    shortDescription: "Features heavy-duty bolted flange end-caps, built to survive extreme shock loads and extreme temperatures.",
    longDescription: "Mill-type hydraulic cylinders represent the absolute pinnacle of ruggedness. Specifically designed for primary metal production, steel fabrication, and severe offshore environments, they use heavy bolted flanges instead of tie rods or simple welds. This permits thick wall designs that sustain massive shock pressures and allow easy rebuilds even in hostile operational areas.",
    features: [
      "Extra-thick walls and heavy bolted flange caps",
      "Unmatched resistance to pressure spikes and structural bending",
      "High-temperature seals (Viton) integrated as standard",
      "Heavy-duty spherical bearings on both rod eye and base flange",
      "Ideal for high-frequency, non-stop cycling applications"
    ],
    applications: [
      "Steel mill rolling stands and ladles",
      "Foundry machinery and heavy casting presses",
      "Offshore drilling rigs and marine winch systems",
      "Primary mining crushers"
    ],
    specifications: {
      boreDia: "40 mm to 300 mm (Specials above 300 mm)",
      rodDia: "25 mm to 200 mm",
      stroke: "Up to 2000 mm (Specials up to 3500 mm)",
      medium: "Mineral oil (ISO VG 68), fire-resistant synthetic esters",
      pressure: "200 Bar (20 MPa) / 345 Bar (34.5 MPa) on request",
      temperature: "-10 °C to 150 °C (Viton seals standard)",
      seals: "PTFE, NBR, VITON",
      construction: "Flanged Caps: Mild Steel | Tube: ST-52 Seamless Honed | Piston Rod: EN-8D hard chrome plated (stainless steel options) | Piston: Mild Steel"
    }
  },
  {
    id: "telescopic-cylinders",
    name: "Telescopic Hydraulic Cylinders",
    tagline: "Multi-stage design for ultra-long strokes within minimal collapsed lengths.",
    image: "/Products/telescopic.png",
    shortDescription: "A series of nested steel sleeves (stages) that extend sequentially to provide long travel limits.",
    longDescription: "When an application requires an extremely long stroke but has very limited space to store the cylinder when collapsed, a telescopic (or multi-stage) cylinder is essential. Maruti Hydraulics designs precision-ground multi-stage cylinders. The stages slide smoothly inside one another, extending sequentially under pressure to reach lengths up to 4x the retracted length.",
    features: [
      "Multi-stage configurations (2 to 5 stages standard)",
      "Precision-ground and hard chrome-plated sleeves",
      "Available in single-acting (gravity return) or double-acting versions",
      "Special guide rings prevent stage misalignment during lateral loading",
      "Optimized sealing system on each stage sleeve border"
    ],
    applications: [
      "Dump trucks, tipper trailers, and utility vehicles",
      "Industrial freight elevators and scissor lifts",
      "Retractable platform ramps and deck machinery",
      "Compact garbage trucks"
    ],
    specifications: {
      boreDia: "Custom per stage layout",
      rodDia: "Nested multi-sleeve stages",
      stroke: "Up to 3500 mm",
      medium: "Mineral oil (ISO VG 68)",
      pressure: "160 Bar to 200 Bar working pressure",
      temperature: "-10 °C to 60 °C",
      seals: "NBR, PU, Special low-friction cup seals",
      construction: "Sleeves: ST-52 high-tensile seamless honed | Caps: Mild steel | Finish: Ground & chrome plated sleeves"
    }
  },
  {
    id: "hydraulic-power-packs",
    name: "Hydraulic Power Packs",
    tagline: "Integrated pressure systems supplying hydraulic energy with efficiency.",
    image: "/Products/Power Pack.png",
    shortDescription: "Complete power solutions combining reservoirs, high-pressure pumps, manifolds, and control valves.",
    longDescription: "Our Hydraulic Power Packs are self-contained fluid energy sources engineered to drive single or multiple cylinder networks. Combining electric motors or diesel engines, gear or piston pumps, high-capacity oil reservoirs, control manifolds, and filtration units, they provide steady, high-efficiency oil flow. Available in standard layouts or customized for specific automation logic.",
    features: [
      "Custom reservoir sizing from 10 Liters to 1000+ Liters",
      "Available with gear pumps, vane pumps, or axial piston pumps",
      "Integrated electrical control panels, starters, and terminal boxes",
      "Advanced block manifolds with pressure relief and check valves",
      "Built-in level switches, thermometer indicators, and return line filters"
    ],
    applications: [
      "Industrial recycling balers and crushers",
      "Lifting platforms and warehouse dock levelers",
      "CNC machining center fixtures and clamping systems",
      "Hydraulic power sources for mobile machinery"
    ],
    specifications: {
      boreDia: "N/A (Reservoir 10L to 1000L)",
      rodDia: "N/A",
      stroke: "N/A",
      medium: "Mineral oil (ISO VG 32, 46, 68)",
      pressure: "Up to 350 Bar operating limits",
      temperature: "Built-in air/water oil coolers for thermal stability",
      seals: "Nitrile (NBR), Viton seals",
      construction: "Reservoir: M.S. epoxy coated inside and out | Valve manifolds: Steel blocks | Motors: Premium energy-efficient induction motors"
    }
  },
  {
    id: "custom-cylinders",
    name: "Custom Hydraulic Cylinders",
    tagline: "Bespoke engineering tailored to your precise operating parameters.",
    shortDescription: "Completely engineered solutions for unique applications, extreme pressures, and harsh chemical exposures.",
    longDescription: "At Maruti Hydraulics, we specialize in solving complex engineering challenges. If your project demands custom port configurations, integrated linear transducers (LVDT) for position sensing, double-ended rods, stroke limit adjustments, or specialized anti-corrosive coatings for marine environments, our in-house engineering team designs and manufactures a bespoke cylinder to fit.",
    features: [
      "Bore sizes above 300 mm and stroke lengths up to 3500 mm",
      "Integrated linear sensors (LVDT) for smart position control",
      "Double-ended rod configurations for synchronized bilateral movement",
      "Custom anti-corrosion paint specs and sea-water resistant rod overlays",
      "Custom mountings, locking valves, and manifold integration"
    ],
    applications: [
      "Hydroelectric dam gates and lock operations",
      "Large-scale mining excavators and draglines",
      "Subsea robotics and marine vessel stabilizers",
      "Heavy industrial hydraulic presses"
    ],
    specifications: {
      boreDia: "Up to 500 mm + custom designs",
      rodDia: "Custom sized for column strength",
      stroke: "Up to 3500 mm",
      medium: "Mineral oil, water-glycol, skydrol, fire-resistant fluids",
      pressure: "Up to 345 Bar (34.5 MPa) and higher",
      temperature: "-30 °C to 200 °C (special high-temp seals)",
      seals: "PTFE, NBR, PU, VITON, Kalrez",
      construction: "Designed to application requirements (High tensile, forged steel, stainless steel, alloy steels)"
    }
  }
];

export const industries = [
  {
    id: "steel",
    name: "Steel & Primary Metals",
    icon: Hammer,
    image: "/Industries/Steel & Primary Metals.png",
    description: "Cylinders for rolling mills, ladles, electric arc furnaces, and coil handlers that withstand intense ambient heat and continuous mechanical shock."
  },
  {
    id: "plastic",
    name: "Plastic Extrusion & Injection",
    icon: Cpu,
    image: "/Industries/Plastic Extrusion & Injection.png",
    description: "High-speed tie-rod cylinders providing precision clamping and ejector actions for plastics processing."
  },
  {
    id: "paper",
    name: "Paper & Pulp Processing",
    icon: FileText,
    image: "/Industries/Paper & Pulp Processing.png",
    description: "Stainless steel options and high-durability seals built to resist corrosion, moisture, and chemical washes in paper mills."
  },
  {
    id: "textile",
    name: "Textile Machinery",
    icon: Disc,
    image: "/Industries/Textile Machinery.png",
    description: "Reliable, clean-operating cylinders for fabric tensioning, carding, and dyeing machine systems."
  },
  {
    id: "construction",
    name: "Construction & Earthmoving",
    icon: Wrench,
    image: "/Industries/Construction & Earthmoving.png",
    description: "Welded cylinders designed for heavy loads, gravel, dust, and dynamic outdoor forces in excavators and loader linkages."
  },
  {
    id: "material-handling",
    name: "Material Handling & Logistics",
    icon: Truck,
    image: "/Industries/Material Handling & Logistics.png",
    description: "Telescopic and compact double-acting cylinders driving forklifts, lift tables, dock levelers, and automated storage crane lines."
  },
  {
    id: "mining",
    name: "Mining & Heavy Excavation",
    icon: Layers,
    image: "/Industries/Mining & Heavy Excavation.png",
    description: "Heavy-duty custom hydraulic cylinders engineered to function reliably deep underground or in abrasive surface strip-mines."
  },
  {
    id: "cement",
    name: "Cement & Bulk Material",
    icon: Settings,
    image: "/Industries/Cement & Bulk Material.png",
    description: "Dust-tight wiper seal cylinders operating clinker doors, dampers, silo gates, and conveyor tension devices."
  },
  {
    id: "oem-machinery",
    name: "OEM Industrial Machinery",
    icon: Activity,
    image: "/Industries/OEM Industrial Machinery.png",
    description: "Standard catalog and customized fluid power components tailored to machine tool manufacturers worldwide."
  }
];

export const processSteps = [
  {
    phase: "01",
    title: "Design & CAD Engineering",
    description: "Utilizing 3D CAD modeling and Finite Element Analysis (FEA) to draft custom geometries, calculate column strength, and optimize stress distribution based on specific load parameters."
  },
  {
    phase: "02",
    title: "Raw Material Selection",
    description: "We source certified ST-52 seamless honed tubes, EN-8D high-tensile carbon steel piston rods, and high-performance seal packages from globally recognized suppliers to establish a flawless base."
  },
  {
    phase: "03",
    title: "Precision Machining & CNC",
    description: "Cylinder bodies are bored and honed on advanced machinery to micron-level straightness, while piston rods are precision-turned, ground, and hard-chrome plated for superior wear and corrosion resistance."
  },
  {
    phase: "04",
    title: "Structural Welding",
    description: "Automatic and semi-automatic MIG/TIG welding processes attach end-caps, ports, and mounts. Standard ISO inspection protocols check all welds for penetration and structural continuity."
  },
  {
    phase: "05",
    title: "Controlled Assembly",
    description: "Cleanroom assembly practices ensure that pistons, seals, wipers, and bearings are mounted without microscopic contamination, protecting long-term seal reliability."
  },
  {
    phase: "06",
    title: "High-Pressure Testing",
    description: "Every single cylinder undergoes mandatory static and dynamic pressure testing up to 345 bar. We verify leak-free performance, cushioning smooth-stop limits, and cylinder efficiency."
  },
  {
    phase: "07",
    title: "Final QA & Painting",
    description: "Final quality checks measure alignment, surface finish, and dimension tolerances. Cylinders are coated with industrial anti-corrosive primer and top-coat painting according to customer specs."
  },
  {
    phase: "08",
    title: "Logistics & Dispatch",
    description: "Cylinders are packed in heavy-duty wooden crates, protecting the chrome rod surfaces and oil port plugs. Dispatched with full test reports and certificates."
  }
];

export const whyChooseUs = [
  {
    title: "In-House Custom Engineering",
    description: "We don't just sell standard shapes. Our engineers design custom-made cylinders to meet exact force, envelope, and environmental requirements.",
    icon: Cpu
  },
  {
    title: "Rigorous Testing Protocols",
    description: "100% of our products undergo high-pressure static and dynamic testing on calibrated test beds, verifying zero-leakage limits before shipping.",
    icon: Activity
  },
  {
    title: "Premium Material Integrity",
    description: "We utilize ST-52 seamless honed tubes, EN-8D hard chrome plated rods, and premium seal materials like NBR, polyurethane, and Viton for durability.",
    icon: Shield
  },
  {
    title: "On-Time Dispatch Commitments",
    description: "Our optimized production layout and domestic materials warehouse ensure we meet production timelines and dispatch dates without delay.",
    icon: Truck
  },
  {
    title: "Expert Technical Support",
    description: "Our hydraulic specialists assist you from initial system configuration and load calculations to commissioning and troubleshooting.",
    icon: Wrench
  },
  {
    title: "Highly Competitive Pricing",
    description: "By integrating CNC machining, welding, and testing under one roof, we optimize production overheads to offer exceptional industrial value.",
    icon: BarChart2
  }
];

export const caseStudies = [
  {
    id: "steel-mill-press-rebuild",
    title: "Custom Rebuild of 400-Ton Steel Mill Press Cylinder",
    client: "National Steel Corporation",
    challenge: "The client suffered frequent seal failures due to extreme heat (140°C) and heavy shock loads in a plate rolling stand, leading to costly downtime every 3 months.",
    solution: "Maruti Hydraulics designed a custom Mill-Type flanged cylinder featuring custom internally cooled housings, a hard-chrome plated rod with high-durability seal compounds, and high-temp Viton rings.",
    result: "The cylinder has been operating continuously for 24+ months without a single seal leak, increasing plate line efficiency by 15%.",
    specs: "Bore: 320mm | Rod: 220mm | Stroke: 850mm | Pressure: 315 Bar"
  },
  {
    id: "heavy-dump-tipper-upgrade",
    title: "Reliable Telescopic Cylinders for Mining Fleets",
    client: "Gujarat Mining Infrastructure",
    challenge: "Standard multi-stage cylinders suffered bending under lateral load when tipping on uneven terrains, causing cylinder deformation and fluid leakages.",
    solution: "We engineered a heavy-walled 4-stage Telescopic Cylinder utilizing precision-hardened guide bands and wider overlaps between stages to handle lateral torque safely.",
    result: "Bending failures reduced to zero across a fleet of 80 dump vehicles working in harsh desert conditions.",
    specs: "Stages: 4 | Retracted: 950mm | Extended: 3100mm | Working Pressure: 190 Bar"
  }
];

export const faqs = [
  {
    question: "What are the standard bore and rod sizes you manufacture?",
    answer: "We manufacture standard cylinders with bore sizes ranging from 40 mm to 300 mm, and rod diameters from 25 mm to 200 mm. For special heavy-duty requirements, we can construct custom cylinders with bore sizes exceeding 300 mm and stroke lengths up to 3500 mm."
  },
  {
    question: "Are your cylinders built to international standards?",
    answer: "Yes, our Tie-Rod cylinders are built strictly according to ISO 6020/2 mounting configurations, which ensures they are fully interchangeable with cylinders from global brands like Parker, Rexroth, or Eaton."
  },
  {
    question: "Can you design a cylinder for high-temperature operations?",
    answer: "Absolutely. Our standard cylinders are rated for -10°C to 60°C. However, by integrating custom-specified Viton (FKM) seals, bronze-filled PTFE guide rings, and heavy steel end caps, we routinely supply cylinders designed to operate continuously at temperatures up to 150°C."
  },
  {
    question: "What testing checks do you run on finished cylinders?",
    answer: "Every single cylinder built at Maruti Hydraulics undergoes a 100% testing procedure. This includes static high-pressure testing (typically up to 1.5 times the operating limit, i.e., up to 300-345 bar) to verify weld and seal integrity, internal bypass test, and low-pressure stick-slip smooth movement inspection."
  },
  {
    question: "Do you supply the hydraulic power packs as well?",
    answer: "Yes, we design and assemble complete Hydraulic Power Packs. These units are configured with high-quality pumps, electric motors, oil reservoirs (ranging from 10L to 1000L), return filters, level indicators, and electrical control starters, offering a complete pressure loop system."
  },
  {
    question: "What is the typical manufacturing lead time?",
    answer: "For standard catalog items (such as tie-rod or welded cylinders), our lead time is 2 to 3 weeks. For complex, custom-designed cylinders or large power packs, manufacturing typically takes 4 to 6 weeks depending on material availability and design approvals."
  }
];

export const blogPosts = [
  {
    id: "extending-hydraulic-cylinder-lifespan",
    title: "5 Critical Maintenance Steps to Extend Hydraulic Cylinder Lifespan",
    date: "July 2, 2026",
    author: "Technical Team, Maruti Hydraulics",
    summary: "Preventive maintenance is key to keeping industrial machines running. Learn how to prevent rod corrosion, clean seal contaminants, and prevent side loads.",
    content: "Hydraulic cylinders are the workhorses of industrial machinery. While they are built to withstand immense forces, minor maintenance oversights can lead to premature seal failures, rod scoring, and barrel damage. 1. Maintain Oil Cleanliness: Microscopic particles in the fluid scrape seals and scratch chrome plating. Ensure regular filter replacement. 2. Protect the Rod: Scratches on the rod act like files, cutting seals as the rod retracts. Wipe down rods operating in abrasive environments. 3. Monitor Alignment: Bending stresses speed up seal wear. Check alignment pins and spherical bearings regularly. 4. Seal Care: When storing cylinders, keep them charged with clean oil or protect exposed rod surfaces with grease."
  },
  {
    id: "tie-rod-vs-welded-cylinders",
    title: "Tie-Rod vs. Welded Hydraulic Cylinders: Which Is Best for Your Application?",
    date: "June 18, 2026",
    author: "Design Department",
    summary: "Understand the structural differences, space limitations, and rebuild options of tie-rod vs. welded body designs to select the correct fluid actuator.",
    content: "When selecting a cylinder, engineers are faced with a fundamental design choice: Tie-Rod or Welded. 1. Structural Footprint: Welded cylinders do not have bulky end flanges or rods, making them ideal for heavy mobile equipment where space is at a premium. 2. Maintenance and Rebuild: Tie-Rod cylinders (built to ISO 6020/2) can be easily disassembled using standard hand tools. This makes them highly popular in industrial plant factory floors. 3. Heavy-Duty Cycles: Welded designs can handle higher pressures and side shock loading without stretching, while tie-rods are easier to adapt for variable mountings."
  }
];

export const jobPostings = [
  {
    id: "hydraulic-design-engineer",
    title: "Senior Hydraulic Design Engineer",
    department: "R&D / Engineering",
    location: "Ahmedabad (On-site)",
    type: "Full-Time",
    experience: "5+ Years",
    description: "We are seeking an experienced Design Engineer skilled in 3D CAD modeling, FEA structural validation, and hydraulic circuit design. You will be responsible for translating client specifications into manufacturing blueprints for custom cylinders and power packs.",
    requirements: [
      "B.E. / B.Tech in Mechanical / Production Engineering",
      "Proficient in SolidWorks, Autodesk Inventor, or AutoCAD 3D",
      "Strong understanding of hydraulic cylinder mechanics, column buckling, and seal selection",
      "Experience with ISO standards (ISO 6020/2, ISO 1219)"
    ]
  },
  {
    id: "cnc-machine-operator",
    title: "CNC Honing & Lathe Machinist",
    department: "Manufacturing Operations",
    location: "Naroda GIDC, Ahmedabad",
    type: "Full-Time",
    experience: "3+ Years",
    description: "Looking for skilled machine operators to set up and control CNC turning centers, boring bars, and cylinder honing machines. Must be able to read engineering drawings and use precise measuring tools (micrometers, dial gauges).",
    requirements: [
      "ITI Machinist / Diploma in Mechanical Engineering",
      "Hands-on experience with Fanuc or Siemens CNC controls",
      "Knowledge of cutting speeds, feed rates, and honing grit sizes for ST-52 steel barrel finishes",
      "Ability to work in shifts"
    ]
  }
];

export const testimonials = [
  {
    name: "Amit Sanghavi",
    role: "Director",
    company: "Sanghavi Heavy Engineers",
    review: "Maruti Hydraulics has supplied custom 345 bar cylinders for our high-impact steel press plants. The build thickness and chrome rod quality match global premium standards.",
    rating: 5
  },
  {
    name: "Meera Nair",
    role: "Procurement Lead",
    company: "Apex Polymer Machineries",
    review: "We have integrated their double-acting tie rod cylinders for 6+ years in our plastic molding machine lines. Zero manufacturing delays and exceptional cylinder lifetimes.",
    rating: 5
  },
  {
    name: "Vikram Rathore",
    role: "Project Head",
    company: "Gujarat Hydropower Projects",
    review: "Their custom custom-designed cylinders with integrated position sensors (LVDT) worked flawlessly. Outstanding hydraulic technical support.",
    rating: 5
  }
];
