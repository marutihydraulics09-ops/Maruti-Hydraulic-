import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUpModule from 'react-countup';
const CountUp = typeof CountUpModule === 'function' ? CountUpModule : (CountUpModule.default || CountUpModule);

import {
  ArrowRight, ShieldCheck, Award, CheckCircle2, PhoneCall, Star, Quote,
  ChevronLeft, ChevronRight, Sparkles, Drill, Compass, Settings, Download
} from 'lucide-react';

import SEOHeader from '../components/common/SEOHeader';
import CylinderSchematic from '../components/ui/CylinderSchematic';
import Accordion from '../components/ui/Accordion';
import TiltCard from '../components/ui/TiltCard';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ui/ScrollReveal';
import SplitText from '../components/ui/SplitText';
import Magnetic from '../components/ui/Magnetic';
import {
  statistics, products, industries, processSteps, whyChooseUs,
  faqs, testimonials
} from '../data/siteData';


// Custom Testimonial Slider using Framer Motion
function TestimonialSlider() {
  const [currIdx, setCurrIdx] = useState(0);
  const activeReview = testimonials ? testimonials[currIdx] : {
    name: "Rajesh Patel", role: "Purchase Manager", company: "Apex Plastics Ltd",
    review: "Excellent response times and premium cylinder build quality.", rating: 5
  };

  const slideLeft = () => {
    setCurrIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  const slideRight = () => {
    setCurrIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-white/10 mt-8">
      <div className="absolute top-6 left-6 text-accent opacity-15">
        <Quote className="w-16 h-16 transform -scale-y-100" />
      </div>

      <div className="min-h-[220px] flex flex-col justify-center text-center relative z-10">
        <div className="flex justify-center gap-1 mb-4 text-orange-accent">
          {[...Array(activeReview.rating || 5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>

        <p className="font-poppins text-lg md:text-xl text-white/90 leading-relaxed italic mb-8 px-4">
          "{activeReview.review}"
        </p>

        <div>
          <h4 className="font-manrope font-extrabold text-base text-white uppercase tracking-wider">
            {activeReview.name}
          </h4>
          <p className="text-xs text-accent font-semibold tracking-widest mt-1">
            {activeReview.role} - {activeReview.company}
          </p>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={slideLeft}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-dark-bg hover:border-accent hover:shadow-[0_0_15px_rgba(0,194,255,0.4)] transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currIdx ? 'w-8 bg-accent' : 'bg-white/20'}`}
            />
          ))}
        </div>

        <button
          onClick={slideRight}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-dark-bg hover:border-accent hover:shadow-[0_0_15px_rgba(0,194,255,0.4)] transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

const formatPressure = (press) => {
  if (!press) return 'N/A';
  if (press.toLowerCase().includes('to')) {
    const match = press.match(/(\d+\s*(?:Bar)?\s*to\s*\d+\s*Bar)/i);
    if (match) return match[1];
  }
  const match = press.match(/(?:Up to\s*)?\d+\s*Bar/i);
  return match ? match[0] : press;
};

export default function Home() {
  // Stats inView logic
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <SEOHeader
        title="Heavy Duty Hydraulic Cylinders & Power Packs Manufacturer"
        description="Maruti Hydraulics designs and manufactures high-pressure, premium-grade tie-rod, welded, and telescopic hydraulic cylinders up to 345 bar in Ahmedabad, India."
        keywords="hydraulic cylinders, power packs, double acting cylinders, telescopic cylinders, tie rod cylinders, mill type cylinders, India, Maruti Hydraulics"
      />

      {/* SECTION 1: Cinematic Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-28 md:pt-40 -mt-28 md:-mt-36 overflow-hidden bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 w-full py-12">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 border border-accent/20 px-3.5 py-1.5 rounded-full bg-accent/5 backdrop-blur-md mb-6 w-fit"
            >
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="font-manrope font-extrabold tracking-widest text-[10px] uppercase text-accent">
                Engineering Power Through Precision
              </span>
            </motion.div>

            <h1 className="font-poppins font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tight leading-[1.08] mb-8">

              {/* Line 1: HEAVY DUTY */}
              <span className="block overflow-hidden py-[0.05em]">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Heavy Duty
                </motion.span>
              </span>

              {/* Line 2: HYDRAULIC CYLINDER — gradient + glow, forced single line */}
              <span className="block overflow-hidden py-[0.05em] drop-shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-primary whitespace-nowrap"
                >
                  Hydraulic Cylinder
                </motion.span>
              </span>

              {/* Line 3: MANUFACTURER */}
              <span className="block overflow-hidden py-[0.05em]">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Manufacturer
                </motion.span>
              </span>

            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-sm md:text-base font-inter text-white/70 max-w-lg leading-relaxed mb-8"
            >
              Precision-engineered hydraulic cylinders and power packs designed to survive severe pressures, extreme heat, and continuous shock load applications. Engineered to match global standard layouts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Magnetic>
                <Link
                  to="/products"
                  className="bg-accent text-dark-bg font-manrope font-extrabold tracking-widest text-xs uppercase px-7 py-4 rounded-xl hover:bg-orange-600 transition-all glow-btn-orange flex items-center gap-2 group"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>

              <Magnetic>
                <a
                  href="/Maruti Hydraulic Brochure.pdf"
                  download="Maruti_Hydraulic_Brochure.pdf"
                  className="bg-white/5 border border-white/10 hover:border-accent text-white hover:text-accent font-manrope font-extrabold tracking-widest text-xs uppercase px-7 py-4 rounded-xl transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Download className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  Download Brochure
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Interactive Cylinder Schematic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative min-h-[350px] lg:min-h-[450px]"
          >
            <div className="absolute w-[95%] h-[95%] bg-accent/5 rounded-full filter blur-2xl opacity-40 animate-pulse"></div>
            <CylinderSchematic />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Introduction & Statistics */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Intro Text */}
            <ScrollReveal type="fade-right" className="lg:col-span-6 space-y-6">
              <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
                ISO Ready Engineering
              </span>
              <h2 className="font-poppins font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
                Two Decades of Robust Fluid Actuation Design
              </h2>
              <p className="text-sm font-inter text-white/70 leading-relaxed">
                Maruti Hydraulics has earned trust across India and globally by manufacturing high-performance, precision-machined cylinders. In our advanced facilities, we boring and honing cylinders up to micron straightness and hard-chrome plate piston rods, yielding rugged structures that outlive standard components under relentless operations.
              </p>
              <div className="pt-4">
                <Link to="/about" className="text-accent hover:text-orange-400 font-manrope font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 group w-fit">
                  Explore Company Profile
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Stats Card list */}
            <StaggerContainer ref={statsRef} className="lg:col-span-6 grid grid-cols-2 gap-6">
              {statistics.map((stat, idx) => (
                <StaggerItem
                  key={idx}
                  type="scale-in"
                  className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-accent/30 transition-all duration-300"
                >
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500 blur-xl"></div>
                  <div className="font-poppins font-black text-3xl md:text-4xl text-accent">
                    {statsInView ? <CountUp end={parseInt(stat.value)} duration={2.5} suffix={stat.value.includes('+') ? '+' : ''} /> : "0"}
                  </div>
                  <h4 className="font-manrope font-extrabold text-xs text-white uppercase tracking-wider mt-2">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-white/50 mt-1 font-inter">
                    {stat.description}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </section>

      {/* SECTION 3: Products Grid */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <ScrollReveal type="fade-up" className="text-center max-w-xl mx-auto mb-8 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
              Product Portfolio
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
              Heavy-Duty Range
            </h2>
            <p className="text-xs sm:text-sm font-inter text-white/60">
              Select standard designs or customize physical sizing to match your specific force and space targets.
            </p>
          </ScrollReveal>

          {/* Products Grid — 2 columns on mobile, 2 on tablet, 3 on desktop */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {products.map((prod) => (
              prod.id === 'custom-cylinders' ? (
                /* ── CUSTOM CYLINDERS — full-width horizontal banner ── */
                <StaggerItem key={prod.id} type="fade-up" className="col-span-2 md:col-span-2 lg:col-span-3">
                  <TiltCard className="h-full">
                    <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden group hover:border-accent/40 transition-all duration-300 relative flex flex-row min-h-[120px] sm:min-h-[280px]">

                      {/* LEFT — animated visual panel — compact on mobile */}
                      <div className="w-[90px] sm:w-2/5 lg:w-2/5 relative overflow-hidden flex-shrink-0 min-h-[120px] sm:min-h-[220px] lg:min-h-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-[#0d0d0d] to-[#001a1a]" />
                        {/* Rotating conic glow */}
                        <div className="absolute inset-0 opacity-50"
                          style={{ background: 'conic-gradient(from 0deg at 50% 50%, #FF6B00 0%, transparent 25%, #00C2FF 50%, transparent 75%, #FF6B00 100%)', animation: 'spin 10s linear infinite', filter: 'blur(30px)' }} />
                        {/* Engineering grid */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                        {/* Central icon cluster */}
                        <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-8 z-10">
                          <Settings className="hidden sm:block w-8 h-8 sm:w-10 sm:h-10 text-accent/40 animate-spin" style={{ animationDuration: '14s' }} />
                          <div className="flex flex-col items-center gap-1">
                            <Compass className="w-8 h-8 sm:w-14 sm:h-14 text-orange-accent/80 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(255,107,0,0.5)]" />
                            <span className="text-[8px] sm:text-[9px] font-manrope font-extrabold text-accent/60 tracking-[0.2em] uppercase">Bespoke</span>
                          </div>
                          <Drill className="hidden sm:block w-8 h-8 sm:w-10 sm:h-10 text-accent/40" style={{ animation: 'spin 7s linear infinite reverse' }} />
                        </div>

                        {/* Shimmer sweep */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out" />
                      </div>

                      {/* RIGHT — content panel */}
                      <div className="flex-1 p-3 sm:p-7 lg:p-8 flex flex-col justify-between gap-3 sm:gap-5">
                        <div className="space-y-2 sm:space-y-4">
                          {/* Title row */}
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                            <h3 className="font-poppins font-bold text-sm sm:text-xl md:text-2xl text-white group-hover:text-accent transition-colors leading-tight">
                              {prod.name}
                            </h3>
                          </div>

                          <p className="text-[10px] sm:text-sm text-white/60 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                            {prod.shortDescription}
                          </p>

                          {/* Feature pills — hidden on mobile */}
                          <div className="hidden sm:flex flex-wrap gap-1 sm:gap-2">
                            {['LVDT Position Sensors', 'Double-Ended Rod', 'Marine Grade Coating', 'High-Temp Viton Seals', 'Bore up to 500mm', 'Up to 345 Bar'].map((tag) => (
                              <span key={tag} className="text-[9px] sm:text-[11px] font-manrope font-semibold bg-accent/10 border border-accent/20 text-accent/80 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="hidden sm:block border-t border-white/5 pt-3 text-[10px] sm:text-[11px] font-manrope text-white/35 italic">
                            ✦ Each cylinder engineered to your exact bore, stroke, pressure rating & environment — no two builds are the same
                          </div>
                        </div>

                        {/* CTA row */}
                        <Link
                          to={`/products/${prod.id}`}
                          className="bg-gradient-to-r from-orange-accent to-accent text-white font-manrope font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-3 sm:px-6 py-2 sm:py-3.5 rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 hover:shadow-[0_0_24px_rgba(0,194,255,0.35)] whitespace-nowrap w-full"
                        >
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Enquire Custom Build</span>
                          <span className="sm:hidden">Enquire</span>
                        </Link>
                      </div>

                    </div>
                  </TiltCard>
                </StaggerItem>
              ) : (
                /* ── STANDARD product card ── */
                <StaggerItem key={prod.id} type="fade-up">
                  <TiltCard className="h-full">
                    <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden h-full flex flex-col justify-between group hover:border-accent/20 transition-all duration-300">

                      {/* Image container */}
                      <div className="h-32 sm:h-48 overflow-hidden relative bg-black">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-contain scale-[1.12] group-hover:scale-[1.18] transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-80"></div>
                        <span className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-orange-accent text-white font-manrope font-extrabold text-[8px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded">
                          ISO
                        </span>
                      </div>

                      {/* Body text details */}
                      <div className="p-3 sm:p-6 flex-grow flex flex-col justify-between space-y-3 sm:space-y-6">
                        <div className="space-y-1.5 sm:space-y-3">
                          <h3 className="font-poppins font-bold text-[11px] sm:text-lg text-white group-hover:text-accent transition-colors leading-tight">
                            {prod.name}
                          </h3>
                          <p className="hidden sm:block text-xs text-white/60 line-clamp-3 leading-relaxed">
                            {prod.shortDescription}
                          </p>

                          {/* Short specs bullet */}
                          <div className="pt-2 border-t border-white/5 space-y-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-[9px] sm:text-[11px] font-manrope text-white/50">
                              <p>Bore: {prod.specifications.boreDia.replace(" to ", "-")}</p>
                              <p>P: {formatPressure(prod.specifications.pressure)}</p>
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`/products/${prod.id}`}
                          className="bg-accent/10 border border-accent/20 text-accent w-full text-center font-manrope font-extrabold text-[9px] sm:text-xs uppercase tracking-wider py-2 sm:py-3.5 rounded-lg sm:rounded-xl hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all flex items-center justify-center gap-1"
                        >
                          <span className="hidden sm:inline">Technical </span>Specs
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                      </div>

                    </div>
                  </TiltCard>
                </StaggerItem>
              )
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* SECTION 4: Industries Served */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5">
        <div className="absolute inset-0 engineering-grid opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-8 sm:mb-16 gap-4">
            <div className="space-y-3 sm:space-y-4 max-w-xl">
              <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
                Versatile Adaptation
              </span>
              <h2 className="font-poppins font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
                Industries We Serve
              </h2>
              <p className="text-xs sm:text-sm font-inter text-white/60">
                Our heavy-duty cylinders drive essential movement lines in key processing fields across the globe.
              </p>
            </div>
            <div>
              <Link to="/industries" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-manrope font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all inline-flex items-center gap-2">
                All Application Zones
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {industries.slice(0, 3).map((ind, index) => {
              const isBig = index === 2;
              return (
                <Link
                  key={ind.id}
                  to={`/industries#${ind.id}`}
                  className={`glass-panel rounded-xl sm:rounded-2xl hover:border-accent/20 transition-all duration-300 relative group overflow-hidden flex flex-col cursor-pointer ${isBig ? 'col-span-2 md:flex-row md:min-h-[240px]' : 'col-span-1'
                    }`}
                >
                  {/* Image Header */}
                  <div className={`overflow-hidden relative shrink-0 ${isBig ? 'h-40 sm:h-48 md:h-auto w-full md:w-1/2 md:self-stretch' : 'h-28 sm:h-36 w-full'
                    }`}>
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/30 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 p-1.5 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-xl text-accent group-hover:bg-accent group-hover:text-dark-bg transition-colors duration-300">
                      <ind.icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-4 md:p-6 space-y-1.5 flex-grow flex flex-col justify-center ${isBig ? 'pt-4 md:p-8' : 'pt-3'
                    }`}>
                    <div className="space-y-1 md:space-y-2">
                      <h3 className={`font-poppins font-bold text-white group-hover:text-accent transition-colors ${isBig ? 'text-sm sm:text-lg md:text-xl' : 'text-xs sm:text-sm'
                        }`}>
                        {ind.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-white/60 leading-relaxed font-inter line-clamp-2 sm:line-clamp-3">
                        {ind.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 5: Why Choose Us Timeline */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
              Core Competencies
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
              Why Maruti Hydraulics
            </h2>
            <p className="text-xs sm:text-sm font-inter text-white/60">
              Decades of refined engineering workflow ensure we deliver flawless pressure seals and heavy metal builds.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl flex flex-col justify-between group hover:border-orange-accent/20 transition-all duration-300"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-2 sm:p-3 bg-orange-accent/15 border border-orange-accent/25 rounded-lg text-orange-accent w-fit group-hover:bg-orange-accent group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-poppins font-bold text-xs sm:text-base text-white group-hover:text-orange-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/60 leading-relaxed font-inter line-clamp-4 sm:line-clamp-none">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 sm:mt-6 flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-manrope font-semibold text-orange-accent uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden xs:inline">100% </span>Guarantee
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: Manufacturing Process Timeline */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-20 space-y-3 sm:space-y-4">
            <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
              Production Sequence
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
              Precision Build Walkthrough
            </h2>
            <p className="text-xs sm:text-sm font-inter text-white/60">
              Each step is documented under strict engineering checks from CAD drawings to load calibrations.
            </p>
          </div>

          {/* Vertical Timeline Stack */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical timeline connecting line */}
            <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-0.5 md:-ml-0.5 bg-gradient-to-b from-accent/20 via-accent to-accent/20 rounded-full" />

            <div className="space-y-12">
              {processSteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">

                    {/* Centered Node / Pulse Circle */}
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5 }}
                      className="absolute left-[20px] md:left-1/2 -translate-x-[9px] md:-translate-x-5 w-[18px] h-[18px] md:w-10 md:h-10 rounded-full bg-dark-bg border-2 border-accent/60 group-hover:border-accent flex items-center justify-center z-10 transition-all duration-300 shadow-[0_0_12px_rgba(255,107,0,0.15)] group-hover:shadow-[0_0_20px_rgba(255,107,0,0.5)]"
                    >
                      <span className="hidden md:inline font-poppins font-black text-xs text-accent group-hover:text-white transition-colors">
                        {step.phase}
                      </span>
                      <span className="md:hidden w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    </motion.div>

                    {/* Left Column (shown on desktop only for even steps) */}
                    <div className="hidden md:block w-[45%] text-right">
                      {isEven && (
                        <motion.div
                          initial={{ opacity: 0, x: -40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-accent/25 hover:shadow-[0_0_24px_rgba(255,107,0,0.06)] transition-all duration-300 relative group/card"
                        >
                          <div className="absolute top-0 right-0 w-16 h-1 bg-accent/20 group-hover/card:bg-accent transition-colors duration-300"></div>
                          <div className="space-y-2.5">
                            <h3 className="font-poppins font-bold text-base text-white group-hover/card:text-accent transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-xs text-white/60 leading-relaxed font-inter">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Right Column (shown on desktop for odd steps, and always shown on mobile) */}
                    <div className="w-full md:w-[45%] pl-12 md:pl-0">
                      <div className={isEven ? "md:hidden" : ""}>
                        <motion.div
                          initial={{ opacity: 0, x: 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-accent/25 hover:shadow-[0_0_24px_rgba(255,107,0,0.06)] transition-all duration-300 relative group/card"
                        >
                          <div className="absolute top-0 left-0 w-16 h-1 bg-accent/20 group-hover/card:bg-accent transition-colors duration-300"></div>
                          <div className="space-y-2.5 font-inter text-left">
                            <span className="md:hidden font-poppins font-black text-2xl text-accent/35 block mb-1">
                              {step.phase}
                            </span>
                            <h3 className="font-poppins font-bold text-base text-white group-hover/card:text-accent transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-xs text-white/60 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Quality Assurance & Testing */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Visual certificate and tester bench mockup */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-2xl"></div>

              <div className="glass-panel p-8 rounded-3xl border border-white/10 relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/15 border border-accent/20 rounded-xl text-accent">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-base text-white">
                      ISO Certificate Ready
                    </h4>
                    <p className="text-xs text-white/50 font-manrope">
                      Calibrated testing and quality logs
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-white/5 text-xs font-manrope text-white/70">
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <span>Static Test pressure</span>
                    <span className="font-bold text-accent">345 Bar (5000 PSI)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <span>Seal Slip-Stick Check</span>
                    <span className="font-bold text-accent">100% Passed</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <span>Dimensional Tolerance Limit</span>
                    <span className="font-bold text-accent">±0.02 mm</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <span>Rod Surface Roughness (Ra)</span>
                    <span className="font-bold text-accent">0.2 Microns max</span>
                  </div>
                </div>

                <div className="p-4 bg-orange-accent/10 border border-orange-accent/20 rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-orange-accent flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] font-inter text-white/80 leading-relaxed">
                    <strong>Zero-Bypass Leakage:</strong> Test records are generated for every customized cylinder, confirming pressure sustainability and lock valve integrity.
                  </p>
                </div>
              </div>
            </div>

            {/* QA Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
                Quality Assurance
              </span>
              <h2 className="font-poppins font-black text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight">
                Calibrated Test Bed Calibrations
              </h2>
              <p className="text-sm font-inter text-white/70 leading-relaxed">
                Our ISO quality assurance process is meticulous. We test cylinders both statically and dynamically at pressures up to 345 bar. In-house ultrasonic inspection scans structural weld zones, and electronic gauges confirm dimensional alignment tolerances.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-manrope">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Ultrasonic NDT Weld Scans</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Ultrasonic Chrome Thickness Logs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Calibrated Piston Pressure Testers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Surface Finish Profilometer Analysis</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* SECTION 9: Testimonials */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
            <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
              Reviews & Feedback
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
              Client Testimonials
            </h2>
            <p className="text-xs sm:text-sm font-inter text-white/60">
              Here is what heavy equipment builders and plant purchasing heads say about Maruti build quality.
            </p>
          </div>

          <TestimonialSlider />

        </div>
      </section>

      {/* SECTION 10: FAQ Accordion */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
              Faqs
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
              Frequently Answered Questions
            </h2>
            <p className="text-xs sm:text-sm font-inter text-white/60">
              Quick answers to typical manufacturing sizes, standards, testing protocols, and delivery lead times.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion items={faqs} />
          </div>

        </div>
      </section>

      {/* SECTION 11: Call To Action */}
      <section className="py-12 md:py-24 bg-dark-bg relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.05] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="glass-panel p-12 md:p-16 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

            <span className="font-manrope font-extrabold tracking-widest text-xs uppercase text-accent">
              Let's Discuss Specifications
            </span>
            <h2 className="font-poppins font-black text-3xl md:text-5xl text-white uppercase tracking-tight mt-4 mb-6 leading-tight">
              Need Custom Hydraulic Cylinders?
            </h2>
            <p className="text-sm md:text-base font-inter text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
              Discuss target forces, pressure ranges, stroke lengths, and environments with our engineering specialists.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/contact"
                className="bg-orange-accent text-white font-manrope font-extrabold tracking-wider text-xs uppercase px-8 py-4 rounded-xl hover:bg-orange-600 transition-all glow-btn-orange flex items-center gap-2 group"
              >
                Inquire With Engineering
                <PhoneCall className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
