import React from 'react';
import { ShieldCheck, CheckCircle2, Activity } from 'lucide-react';
import SEOHeader from '../components/common/SEOHeader';

export default function Quality() {
  const qcSteps = [
    { title: "Incoming Materials Inspection", desc: "Chemical composition analysis and hardness testing on raw EN-8D steel rods and carbon-alloy honed tubes." },
    { title: "Dimensional Tolerances Audit", desc: "Micrometer gauge audits verify inner bore diameters match ISO clearances within ±0.02 mm bounds." },
    { title: "NDT Weld Scans", desc: "Ultrasonic scans analyze automatic MIG port and mount weld lines to verify deep penetration with zero internal cracks." },
    { title: "Static Pressure Endurance", desc: "Cylinders undergo high pressure checks on calibrated hydraulic benches up to 345 Bar, verifying seal integrity." },
    { title: "Low-Pressure Slip Test", desc: "Cylinders are cycled at low pressure limits to inspect for seal friction or erratic stick-slip movements." },
    { title: "Final Chrome Thickness", desc: "Electro-magnetic gauges log hard chromium coating depth, confirming a minimum of 25 microns for rod protection." }
  ];

  return (
    <>
      <SEOHeader
        title="Quality Control & Hydrostatic High Pressure Testing"
        description="Read about the Maruti Hydraulics quality checks: ultrasonic weld inspection, profilometer surface roughness checks, and static pressure testing up to 345 bar."
      />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-dark-bg border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-4">
          <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
            Quality Assurance
          </span>
          <h1 className="font-poppins font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
            ISO Testing & Quality Benchmarks
          </h1>
          <p className="text-sm font-inter text-white/70 max-w-xl mx-auto leading-relaxed">
            Zero compromises on safety. Maruti Hydraulics maintains 100% calibration, logging pressure performance indices for every built cylinder.
          </p>
        </div>
      </section>

      {/* QC Steps Grid */}
      <section className="py-12 md:py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* QC checklist left */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="font-poppins font-black text-2xl md:text-4xl text-white uppercase tracking-tight">
                  Our Inspection Milestones
                </h2>
                <p className="text-sm font-inter text-white/60">
                  Every product shipped is tracked. We generate unique test logs specifying dimensions, seals, and pressure limits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {qcSteps.map((step, idx) => (
                  <div key={idx} className="glass-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl space-y-2 sm:space-y-3 hover:border-accent/20 transition-all">
                    <span className="font-poppins font-black text-2xl text-accent/30 block">
                      0{idx + 1}
                    </span>
                    <h3 className="font-poppins font-bold text-sm text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-inter">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* QA highlights right */}
            <div className="lg:col-span-5 relative space-y-6">
              <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-2xl"></div>

              <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl relative z-10 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-10 h-10 text-accent" />
                  <div>
                    <h3 className="font-poppins font-bold text-base text-white">
                      Technical Assurance
                    </h3>
                    <span className="text-[10px] font-manrope font-semibold text-accent uppercase tracking-widest">
                      100% Certified Dispatch
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5 text-xs font-manrope text-white/70">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Raw steel chemistry certificates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Hardness test reports (BHN)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Hydraulic flow & stroke test files</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>2-Year operational warranty on seals</span>
                  </div>
                </div>

                <div className="p-4 bg-orange-accent/10 border border-orange-accent/20 rounded-xl flex items-start gap-3">
                  <Activity className="w-5 h-5 text-orange-accent flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] font-inter text-white/80 leading-relaxed">
                    <strong>Pressure Safety limits:</strong> We operate dynamic tests up to 200 bar and static tests up to 345 bar. Special designs are stress-tested beyond 350 bar to verify ultimate safety bounds.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
