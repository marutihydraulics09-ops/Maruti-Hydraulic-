import React from 'react';
import SEOHeader from '../components/common/SEOHeader';
import { processSteps } from '../data/siteData';

export default function Manufacturing() {
  return (
    <>
      <SEOHeader 
        title="Hydraulic Cylinders Manufacturing Process | Maruti"
        description="Explore the Maruti Hydraulics manufacturing floor in Naroda GIDC. Learn about CNC machining, cylinder barrel honing, and structural welding."
      />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-dark-bg border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-4">
          <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
            Factory Floor
          </span>
          <h1 className="font-poppins font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
            Our Manufacturing Process
          </h1>
          <p className="text-sm font-inter text-white/70 max-w-xl mx-auto leading-relaxed">
            Inside Maruti Hydraulics, we combine CNC machining center automation, precise honing, and strict material standards to build high-durability fluid actuators.
          </p>
        </div>
      </section>

      {/* Process list */}
      <section className="py-12 md:py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-poppins font-black text-2xl md:text-4xl text-white uppercase tracking-tight">
                Calibrated Engineering Floor
              </h2>
              <p className="text-sm font-inter text-white/60 leading-relaxed">
                By maintaining CNC machining, structural TIG/MIG welding, cleanroom assembly, and hydrostatic testing stations under one roof, we eliminate intermediate transport delays and maintain high-fidelity quality logs.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-accent/20 transition-all flex flex-col md:flex-row gap-6 items-start justify-between"
              >
                <div className="flex gap-4 items-start">
                  <span className="font-poppins font-black text-4xl text-accent/30 mt-1">
                    {step.phase}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-poppins font-bold text-lg text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/60 leading-relaxed font-inter max-w-3xl">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-accent/5 border border-accent/15 rounded-xl text-accent font-mono text-[10px] uppercase tracking-widest self-end md:self-start whitespace-nowrap">
                  Step Approved
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
