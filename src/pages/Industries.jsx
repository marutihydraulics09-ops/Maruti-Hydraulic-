import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEOHeader from '../components/common/SEOHeader';
import { industries } from '../data/siteData';

export default function Industries() {
  const { hash } = useLocation();

  // Scroll to hash element if it exists in URL
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -80 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      <SEOHeader
        title="Industrial Sectors & Hydraulic Applications | Maruti"
        description="Discover how Maruti Hydraulics manufactures customized fluid power cylinders to serve steel, plastic molding, construction, mining and marine sectors."
      />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-dark-bg border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-4">
          <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
            Application Fields
          </span>
          <h1 className="font-poppins font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
            Industries We Serve
          </h1>
          <p className="text-sm font-inter text-white/70 max-w-xl mx-auto leading-relaxed">
            Our engineered cylinders and power packs provide precise force control in key primary materials and manufacturing processing sectors worldwide.
          </p>
        </div>
      </section>

      {/* Industries Bento Grid */}
      <section className="py-8 md:py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-5">
            {industries.map((ind, index) => {
              // Pattern: every 3rd item (index 2, 5, 8...) is the wide horizontal card
              const isBig = index % 3 === 2;

              if (isBig) {
                // ── WIDE HORIZONTAL CARD ──
                return (
                  <div
                    key={ind.id}
                    id={ind.id}
                    className="col-span-2 glass-panel rounded-xl sm:rounded-2xl overflow-hidden group hover:border-accent/20 transition-all duration-300 scroll-mt-24 cursor-default"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="relative w-full sm:w-2/5 h-40 sm:h-auto sm:min-h-[220px] overflow-hidden flex-shrink-0">
                        <img
                          src={ind.image}
                          alt={ind.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark-bg/80 hidden sm:block"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 to-transparent sm:hidden"></div>
                        {/* Icon badge */}
                        <div className="absolute bottom-3 left-3 p-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-xl text-accent group-hover:bg-accent group-hover:text-dark-bg transition-colors duration-300">
                          <ind.icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-center space-y-2 sm:space-y-4">
                        <div>
                          <p className="text-[9px] sm:text-[10px] font-manrope font-extrabold text-accent uppercase tracking-widest mb-1">
                            Application Zone
                          </p>
                          <h3 className="font-poppins font-bold text-sm sm:text-lg md:text-xl text-white group-hover:text-accent transition-colors leading-tight">
                            {ind.name}
                          </h3>
                        </div>
                        <p className="text-[10px] sm:text-xs md:text-sm text-white/60 leading-relaxed font-inter line-clamp-3">
                          {ind.description}
                        </p>

                        {/* Specs row — visible on sm+ */}
                        <div className="hidden sm:flex flex-wrap gap-2 pt-2 border-t border-white/5">
                          {['Vibration Resistant', 'Custom Seals', 'ISO Compatible', 'Anti-Corrosion'].map((tag) => (
                            <span key={tag} className="text-[9px] sm:text-[10px] font-manrope font-semibold bg-accent/8 text-accent/70 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // ── SMALL VERTICAL CARD ──
              return (
                <div
                  key={ind.id}
                  id={ind.id}
                  className="col-span-1 glass-panel rounded-xl sm:rounded-2xl overflow-hidden group hover:border-accent/20 transition-all duration-300 flex flex-col scroll-mt-24 cursor-default"
                >
                  {/* Image */}
                  <div className="relative h-28 sm:h-36 md:h-44 overflow-hidden flex-shrink-0">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-dark-bg/20 to-transparent"></div>
                    {/* Icon badge */}
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 p-1.5 sm:p-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-lg sm:rounded-xl text-accent group-hover:bg-accent group-hover:text-dark-bg transition-colors duration-300">
                      <ind.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col justify-between space-y-1.5 sm:space-y-3">
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="font-poppins font-bold text-[11px] sm:text-sm md:text-base text-white group-hover:text-accent transition-colors leading-tight">
                        {ind.name}
                      </h3>
                      <p className="text-[9px] sm:text-[11px] text-white/55 leading-relaxed font-inter line-clamp-2 sm:line-clamp-3">
                        {ind.description}
                      </p>
                    </div>

                    {/* Tags — visible on sm+ */}
                    <div className="hidden sm:flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {['ISO Ready', 'Heavy Duty'].map((tag) => (
                        <span key={tag} className="text-[8px] sm:text-[9px] font-manrope font-semibold bg-accent/8 text-accent/60 px-1.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
