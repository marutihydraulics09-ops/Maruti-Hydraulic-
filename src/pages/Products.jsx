import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, SlidersHorizontal, Settings2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHeader from '../components/common/SEOHeader';
import TiltCard from '../components/ui/TiltCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { products } from '../data/siteData';

const formatPressure = (press) => {
  if (!press) return 'N/A';
  if (press.toLowerCase().includes('to')) {
    const match = press.match(/(\d+\s*(?:Bar)?\s*to\s*\d+\s*Bar)/i);
    if (match) return match[1];
  }
  const match = press.match(/(?:Up to\s*)?\d+\s*Bar/i);
  return match ? match[0] : press;
};

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' ||
      (selectedType === 'cylinder' && prod.id !== 'hydraulic-power-packs') ||
      (selectedType === 'power-pack' && prod.id === 'hydraulic-power-packs');
    return matchesSearch && matchesType;
  });

  return (
    <>
      <SEOHeader
        title="Heavy Duty Hydraulic Cylinders & Power Packs Catalog"
        description="Explore the Maruti Hydraulics product line: ISO 6020/2 Tie-rod cylinders, welded cylinders, mill-type flanged cylinders, and custom power packs."
      />

      {/* Hero Banner */}
      <section className="relative py-12 md:py-20 bg-dark-bg border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none"></div>
        <ScrollReveal type="fade-up" duration={0.8} className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-4">
          <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
            Engineering Catalogue
          </span>
          <h1 className="font-poppins font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
            Our Products
          </h1>
          <p className="text-sm font-inter text-white/70 max-w-xl mx-auto leading-relaxed">
            Precision-manufactured linear actuators and fluid power systems engineered for industrial automation, mobile machinery, and steel mill lines.
          </p>
        </ScrollReveal>
      </section>

      {/* Catalog Grid Section */}
      <section className="py-12 md:py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Search and Filters */}
          <ScrollReveal type="fade-up" delay={0.1} className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-white/5 border border-white/5 p-4 sm:p-6 rounded-2xl w-full">
            {/* Search Box */}
            <div className="relative w-full md:max-w-sm">
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-11 pr-4 py-3 bg-dark-bg/60 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
              />
            </div>

            {/* Filter Buttons */}
            <div className="grid grid-cols-3 gap-1.5 w-full md:flex md:gap-2 md:w-auto">
              {[
                { type: 'all', label: 'All' },
                { type: 'cylinder', label: 'Cylinders' },
                { type: 'power-pack', label: 'Packs' }
              ].map((tab) => (
                <button
                  key={tab.type}
                  onClick={() => setSelectedType(tab.type)}
                  className={`py-2 px-1 sm:px-4 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-manrope font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center ${selectedType === tab.type
                    ? 'bg-accent text-dark-bg font-extrabold shadow-[0_0_15px_rgba(255,107,0,0.35)]'
                    : 'bg-white/5 border border-white/10 text-white hover:border-accent hover:text-accent'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid display with fluid layout transitions */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  key={prod.id}
                  className={prod.id === 'custom-cylinders' ? 'col-span-2 md:col-span-2 lg:col-span-3' : ''}
                >
                  {prod.id === 'custom-cylinders' ? (
                    /* ── CUSTOM CYLINDERS — full-width banner ── */
                    <TiltCard className="h-full">
                      <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden group hover:border-accent/40 transition-all duration-300 relative flex flex-row min-h-[120px] sm:min-h-[280px]">

                        {/* LEFT — animated visual panel */}
                        <div className="w-[90px] sm:w-2/5 lg:w-2/5 relative overflow-hidden flex-shrink-0 min-h-[120px] sm:min-h-[220px] lg:min-h-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-[#0d0d0d] to-[#001a1a]" />
                          <div className="absolute inset-0 opacity-50"
                            style={{ background: 'conic-gradient(from 0deg at 50% 50%, #FF6B00 0%, transparent 25%, #00C2FF 50%, transparent 75%, #FF6B00 100%)', animation: 'spin 10s linear infinite', filter: 'blur(30px)' }} />
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                          <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-8 z-10">
                            <Settings2 className="hidden sm:block w-10 h-10 text-accent/40 animate-spin" style={{ animationDuration: '14s' }} />
                            <div className="flex flex-col items-center gap-1">
                              <SlidersHorizontal className="w-8 h-8 sm:w-14 sm:h-14 text-orange-accent/80 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(255,107,0,0.5)]" />
                              <span className="text-[8px] sm:text-[9px] font-manrope font-extrabold text-accent/60 tracking-[0.2em] uppercase">Bespoke</span>
                            </div>
                            <Settings2 className="hidden sm:block w-10 h-10 text-accent/40" style={{ animation: 'spin 7s linear infinite reverse' }} />
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out" />
                        </div>

                        {/* RIGHT — content panel */}
                        <div className="flex-1 p-3 sm:p-7 lg:p-8 flex flex-col justify-between gap-3 sm:gap-5">
                          <div className="space-y-2 sm:space-y-4">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                              <h3 className="font-poppins font-bold text-sm sm:text-xl md:text-2xl text-white group-hover:text-accent transition-colors leading-tight">
                                {prod.name}
                              </h3>
                            </div>

                            <p className="text-[10px] sm:text-sm text-white/60 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
                              {prod.shortDescription}
                            </p>

                            <div className="hidden sm:flex flex-wrap gap-2">
                              {['LVDT Position Sensors', 'Double-Ended Rod', 'Marine Grade Coating', 'High-Temp Viton Seals', 'Bore up to 500mm', 'Up to 345 Bar'].map((tag) => (
                                <span key={tag} className="text-[11px] font-manrope font-semibold bg-accent/10 border border-accent/20 text-accent/80 px-3 py-1 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="hidden sm:block border-t border-white/5 pt-3 text-[11px] font-manrope text-white/35 italic">
                              ✦ Each cylinder engineered to your exact bore, stroke, pressure rating & environment
                            </div>
                          </div>

                          <Link
                            to={`/products/${prod.id}`}
                            className="bg-gradient-to-r from-orange-accent to-accent text-white font-manrope font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-3 sm:px-6 py-2 sm:py-3.5 rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 hover:shadow-[0_0_24px_rgba(0,194,255,0.35)] whitespace-nowrap w-full"
                          >
                            Enquire
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Link>
                        </div>

                      </div>
                    </TiltCard>
                  ) : (
                    /* ── STANDARD product card ── */
                    <TiltCard className="h-full">
                      <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden h-full flex flex-col justify-between group hover:border-accent/20 transition-all duration-300">
                        <div className="h-32 sm:h-52 overflow-hidden relative bg-black">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain scale-[1.12] group-hover:scale-[1.18] transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-80" />
                          <span className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-orange-accent text-white font-manrope font-extrabold text-[8px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded">
                            ISO
                          </span>
                        </div>

                        <div className="p-3 sm:p-6 flex-grow flex flex-col justify-between space-y-3 sm:space-y-6">
                          <div className="space-y-1.5 sm:space-y-3">
                            <h3 className="font-poppins font-bold text-[11px] sm:text-lg text-white group-hover:text-accent transition-colors leading-tight">
                              {prod.name}
                            </h3>
                            <p className="hidden sm:block text-xs text-white/60 leading-relaxed font-inter line-clamp-3">
                              {prod.shortDescription}
                            </p>

                            <div className="pt-2 sm:pt-4 border-t border-white/5 space-y-1">
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
                            <span className="hidden sm:inline">Specifications </span>View
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Link>
                        </div>
                      </div>
                    </TiltCard>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/50 font-manrope">No matching products found in the catalog.</p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
