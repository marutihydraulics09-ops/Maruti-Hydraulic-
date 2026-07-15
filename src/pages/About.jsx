import React from 'react';
import { ShieldCheck, Compass, Target, Factory, Shield, Cpu, Users, Award } from 'lucide-react';
import SEOHeader from '../components/common/SEOHeader';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ui/ScrollReveal';
import SplitText from '../components/ui/SplitText';

export default function About() {
  const values = [
    {
      title: "Quality First",
      desc: "We are committed to delivering durable and high-performing hydraulic solutions that satisfy international standard tolerances.",
      icon: ShieldCheck
    },
    {
      title: "Innovation",
      desc: "We continuously improve and adopt new machining technologies, tooling configurations, and seal geometries to stay ahead in the industry.",
      icon: Cpu
    },
    {
      title: "Customer Commitment",
      desc: "We listen, understand, and provide custom engineering designs that add real value and fit exact envelope limitations.",
      icon: Target
    },
    {
      title: "Integrity & Trust",
      desc: "We believe in honest, transparent, and ethical business practices. Our technical specifications sheets represent proven laboratory performance parameters.",
      icon: Shield
    },
    {
      title: "Sustainability",
      desc: "We strive to design energy-efficient cylinders and power packs that prevent fluid leaks and minimize environmental carbon impact.",
      icon: Compass
    },
    {
      title: "Excellence in Service",
      desc: "We ensure timely customer support, design consulting, quick modifications, and long-term reliability for every client.",
      icon: Award
    },
    {
      title: "Teamwork",
      desc: "We grow stronger together by encouraging collaboration, respect, and shared success across engineering and machining divisions.",
      icon: Users
    }
  ];

  const testingProtocols = [
    {
      step: "01",
      title: "Micro-Tolerance Boring & Honing",
      desc: "All cylinder tubes undergo high-precision internal honing to achieve an inner surface roughness of Ra < 0.4 microns, ensuring minimum seal friction and zero drag."
    },
    {
      step: "02",
      title: "Chrome Plating & Rod Hardness Testing",
      desc: "EN-8D steel piston rods are hard-chrome plated to a depth of 25–30 microns and surface hardened to 50–55 HRC, yielding exceptional scratch and corrosion resistance."
    },
    {
      step: "03",
      title: "Hydrostatic Pressure Validation Bench",
      desc: "100% of manufactured cylinders are subjected to rigorous hydrostatic test loads up to 345 bar to verify gland sealing structure stability and structural fatigue limits."
    }
  ];

  return (
    <>
      <SEOHeader
        title="About Maruti Hydraulics | Profile, Vision, Mission & Values"
        description="Learn about Maruti Hydraulics history, our core manufacturing values, mission statements, and our ISO-calibrated cylinder production facilities in Ahmedabad."
      />

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 bg-dark-bg overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none"></div>
        <ScrollReveal type="fade-up" duration={0.8} className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-6">
          <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
            Corporate Profile
          </span>
          <h1 className="font-poppins font-black text-4xl md:text-6xl text-white uppercase tracking-tight leading-none">
            <SplitText>About Maruti Hydraulics</SplitText>
          </h1>
          <p className="text-sm md:text-base font-inter text-white/70 max-w-2xl mx-auto leading-relaxed">
            Manufacturer and supplier of premium heavy-duty hydraulic cylinders and power packs, serving global infrastructure, steel, plastic, and earthmoving fields.
          </p>
        </ScrollReveal>
      </section>

      {/* Company Story & Facility */}
      <section className="py-12 md:py-24 bg-dark-bg relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Story text */}
          <ScrollReveal type="fade-right" duration={0.8} className="lg:col-span-7 space-y-6">
            <h2 className="font-poppins font-black text-2xl md:text-4xl text-white uppercase tracking-tight">
              Our Journey of Precision
            </h2>
            <p className="text-sm font-inter text-white/70 leading-relaxed">
              Maruti Hydraulics was founded with a singular focus: to design and build heavy-duty hydraulic actuators that do not fail under pressure. We understand that in industries like steel production, plastics processing, or excavation, a single cylinder failure can freeze entire factory pipelines, causing massive overhead losses.
            </p>
            <p className="text-sm font-inter text-white/70 leading-relaxed">
              That is why we control every single phase of our production floor in Naroda, Gujarat. From selecting certified ST-52 honed tubes and EN-8D hard chrome plated rods to integrating Viton and polyurethane seals, our cylinders conform to rigorous ISO mounting layouts (such as ISO 6020/2 for tie-rod designs).
            </p>
            <div className="flex gap-8 pt-4 border-t border-white/5">
              <div>
                <span className="font-poppins font-black text-3xl text-accent">2+</span>
                <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Years Active</p>
              </div>
              <div>
                <span className="font-poppins font-black text-3xl text-accent">100%</span>
                <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Pressure Tested</p>
              </div>
              <div>
                <span className="font-poppins font-black text-3xl text-accent">5+</span>
                <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Industries Fed</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Facility Mock Box */}
          <ScrollReveal type="fade-left" duration={0.8} delay={0.15} className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-2xl"></div>
            <div className="glass-panel p-8 rounded-3xl border border-white/10 relative z-10 space-y-6">
              <Factory className="w-12 h-12 text-accent" />
              <h3 className="font-poppins font-bold text-lg text-white uppercase tracking-wider">
                Our Factory
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-inter">
                Equipped with CNC turning centers, vertical boring mills, cylinder honers capable of finishing bores up to 300mm, and automatic gas-shielded welding rigs.
              </p>
              <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-manrope">
                <p className="text-white/80"><strong>Boring/Honing Limits:</strong> Bore sizes up to 500mm</p>
                <p className="text-white/80"><strong>Stroke Travel Limits:</strong> Stroke travel up to 3500mm</p>
                <p className="text-white/80"><strong>Testing limit:</strong> Hydrostatic test limit up to 345 bar</p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Vision & Mission — 2 columns on mobile for clean dashboard/app feel */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5">
        <StaggerContainer className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-8">
          {/* Vision */}
          <StaggerItem type="fade-up" className="glass-panel p-4 sm:p-10 rounded-xl sm:rounded-3xl border border-white/5 relative overflow-hidden group hover:border-accent/30 transition-all">
            <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-accent/5 rounded-full blur-3xl"></div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
              <div className="p-2 sm:p-3 bg-accent/15 border border-accent/20 rounded-lg sm:rounded-xl text-accent flex-shrink-0">
                <Compass className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-1 sm:space-y-4">
                <h3 className="font-poppins font-black text-xs sm:text-xl text-white uppercase tracking-wide">
                  Our Vision
                </h3>
                <p className="text-[10px] sm:text-sm text-white/70 leading-relaxed font-inter italic">
                  “To be the most trusted and innovative provider of hydraulic solutions, driving industrial progress.”
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* Mission */}
          <StaggerItem type="fade-up" className="glass-panel p-4 sm:p-10 rounded-xl sm:rounded-3xl border border-white/5 relative overflow-hidden group hover:border-orange-accent/30 transition-all">
            <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-orange-accent/5 rounded-full blur-3xl"></div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
              <div className="p-2 sm:p-3 bg-orange-accent/15 border border-orange-accent/20 rounded-lg sm:rounded-xl text-orange-accent flex-shrink-0">
                <Target className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-1 sm:space-y-4">
                <h3 className="font-poppins font-black text-xs sm:text-xl text-white uppercase tracking-wide">
                  Our Mission
                </h3>
                <p className="text-[10px] sm:text-sm text-white/70 leading-relaxed font-inter italic">
                  “To deliver world-class systems that empower industries with efficiency, durability, and innovation.”
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Core Values (from brochure) — 2 columns on mobile */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <ScrollReveal type="fade-up" className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
              Ethos & Pillars
            </span>
            <h2 className="font-poppins font-black text-3xl md:text-4xl text-white uppercase tracking-tight">
              Our Core Values
            </h2>
            <p className="text-sm font-inter text-white/60">
              The fundamental guidelines that drive our quality metrics, machine floor safety, and customer support.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {values.map((val, idx) => (
              <StaggerItem
                key={idx}
                type="scale-in"
                className="glass-panel p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/5 hover:border-accent/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-2 sm:p-3 bg-accent/10 border border-accent/20 rounded-lg text-accent w-fit">
                    <val.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-poppins font-bold text-xs sm:text-base text-white">
                    {val.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/60 leading-relaxed font-inter line-clamp-4 sm:line-clamp-none">
                    {val.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* Quality Verification Section — 2 columns on mobile with spanning balancing card */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <ScrollReveal type="fade-up" className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
              Quality Assurance
            </span>
            <h2 className="font-poppins font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              Precision Testing Protocols
            </h2>
            <p className="text-sm font-inter text-white/60">
              Before leaving our assembly floor, every cylinder undergoes rigorous calibration and validation testing.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {testingProtocols.map((protocol, idx) => (
              <StaggerItem
                key={idx}
                type="fade-up"
                className={`glass-panel p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/5 relative group hover:border-accent/20 transition-all duration-300 ${
                  idx === 2 ? 'col-span-2 md:col-span-1' : 'col-span-1'
                }`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-accent/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="font-poppins font-black text-2xl sm:text-4xl text-accent/30 group-hover:text-accent transition-colors duration-300 mb-3 sm:mb-6">
                  {protocol.step}
                </div>
                <h3 className="font-poppins font-bold text-xs sm:text-base text-white mb-2 sm:mb-3">
                  {protocol.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/60 leading-relaxed font-inter line-clamp-5 sm:line-clamp-none">
                  {protocol.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>
    </>
  );
}
