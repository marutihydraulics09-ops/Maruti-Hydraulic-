import React from 'react';
import { CheckCircle2, Settings } from 'lucide-react';
import SEOHeader from '../components/common/SEOHeader';
import { caseStudies } from '../data/siteData';

export default function Projects() {
  return (
    <>
      <SEOHeader
        title="Hydraulic Engineering Case Studies | Maruti"
        description="Review actual project case studies where Maruti Hydraulics solved high-temperature seal failures and cylinder bending stress in heavy steel mills and mining tipper trucks."
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-dark-bg border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-4">
          <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
            Engineering Logs
          </span>
          <h1 className="font-poppins font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
            Case Studies & Projects
          </h1>
          <p className="text-sm font-inter text-white/70 max-w-xl mx-auto leading-relaxed">
            Real engineering challenges solved by Maruti Hydraulics through custom material science, stress audits, and cylinder builds.
          </p>
        </div>
      </section>

      {/* Case studies list */}
      <section className="py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          {caseStudies.map((project) => (
            <div
              key={project.id}
              className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Details side */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <span className="font-manrope font-extrabold text-xs text-accent uppercase tracking-widest block">
                      Client: {project.client}
                    </span>
                    <h3 className="font-poppins font-black text-xl md:text-3xl text-white uppercase tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs md:text-sm font-inter text-white/70 leading-relaxed">
                    <p>
                      <strong>Challenge:</strong> {project.challenge}
                    </p>
                    <p>
                      <strong>Solution:</strong> {project.solution}
                    </p>
                    <p>
                      <strong>Result:</strong> {project.result}
                    </p>
                  </div>
                </div>

                {/* Specs highlights side */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                  <div className="bg-[#0F172A] border border-white/5 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-accent" />
                      <h4 className="font-poppins font-bold text-xs text-white uppercase tracking-widest">
                        System specifications
                      </h4>
                    </div>

                    <div className="text-[11px] font-mono text-white/80 space-y-2 pt-2 border-t border-white/5">
                      {project.specs.split(" | ").map((spec, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{spec.split(":")[0]}</span>
                          <span className="text-accent font-bold">{spec.split(":")[1]}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center gap-1.5 text-[10px] font-manrope font-bold text-green-400 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" /> Passed all pressure checks
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
