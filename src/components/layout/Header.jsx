import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import Logo from '../common/Logo';

const NAV_LINKS = [
  { label: "Home", path: "/", num: "01" },
  { label: "About", path: "/about", num: "02" },
  { label: "Products", path: "/products", num: "03" },
  { label: "Configurator", path: "/configurator", num: "04" },
  { label: "Simulator", path: "/simulator", num: "05" },
  { label: "Industries", path: "/industries", num: "06" },
  { label: "Quality", path: "/quality", num: "07" },
  { label: "Contact", path: "/contact", num: "08" },
];

// Stagger container
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

// Backdrop variants for smooth fade
const backdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } }
};

// Drawer panel variants with premium ultra-smooth curve
const drawerVariants = {
  hidden: { x: '100%' },
  show: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.32, 0.72, 0, 1], // Apple's native smooth curve
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      staggerChildren: 0.02,
      staggerDirection: -1
    }
  }
};

// Each nav item slides in smoothly from the right
const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: {
      duration: 0.25,
      ease: [0.32, 0.72, 0, 1]
    }
  }
};

export default function Header({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : localIsOpen;
  const setIsOpen = propSetIsOpen !== undefined ? propSetIsOpen : setLocalIsOpen;

  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ── Top Bar ── */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 pointer-events-none bg-transparent ${scrolled ? 'py-2.5 px-4 md:px-8' : 'py-5 px-6 md:px-10'
          }`}
      >
        <div
          className={`max-w-7xl mx-auto relative overflow-hidden pointer-events-auto transition-all duration-500 ease-in-out ${scrolled
            ? 'bg-white/95 backdrop-blur-md py-2.5 px-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/80'
            : 'bg-white py-4.5 px-8 rounded-[24px] shadow-[0_10px_35px_-15px_rgba(0,0,0,0.04)] border border-slate-100/90'
            } flex justify-between items-center z-10`}
        >
          {/* Logo */}
          <Link to="/" className="z-50 flex items-center hover:scale-105 active:scale-95 transition-transform duration-300">
            <Logo
              noBg={true}
              className={`transition-all duration-500 ease-in-out ${scrolled ? 'h-10 md:h-12' : 'h-14 md:h-18'}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link, idx) => {
              const isSimulator = link.label === "Simulator";
              const isActive = pathname === link.path;

              if (isSimulator) {
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.04, ease: 'easeOut' }}
                    className="flex items-center"
                  >
                    <style>{`
                      @keyframes gaugeNeedle {
                        0%, 100% { transform: rotate(0deg); }
                        50% { transform: rotate(15deg); }
                      }
                      .animate-gauge-needle {
                        animation: gaugeNeedle 1.8s ease-in-out infinite;
                        transform-origin: 12px 14px;
                      }
                      .animate-gauge-needle-fast {
                        animation: gaugeNeedle 0.8s ease-in-out infinite;
                        transform-origin: 12px 14px;
                      }
                    `}</style>
                    <Link
                      to={link.path}
                      title="Live Simulator Console"
                      className={`relative w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center border ${
                        isActive
                          ? 'bg-slate-950 border-primary text-primary shadow-[0_0_12px_rgba(255,107,0,0.35),inset_0_1px_0_rgba(255,107,0,0.15)]'
                          : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-[0_2px_8px_rgba(255,107,0,0.1)]'
                      }`}
                    >
                      <svg
                        className="w-4.5 h-4.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Dial scale */}
                        <path d="M3.34 19a10 10 0 1 1 17.32 0" opacity={isActive ? "1" : "0.7"} />
                        {/* Needle pin */}
                        <circle cx="12" cy="14" r="1.5" fill="currentColor" />
                        {/* Oscillating needle */}
                        <path
                          className={isActive ? "animate-gauge-needle-fast" : "animate-gauge-needle"}
                          d="m12 14 4-4"
                          stroke={isActive ? "#ff8c00" : "currentColor"}
                        />
                      </svg>
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.04, ease: 'easeOut' }}
                >
                  <Link
                    to={link.path}
                    className="relative font-manrope font-semibold text-[13.5px] uppercase tracking-wider py-2 transition-colors duration-300 text-slate-700 hover:text-primary group block"
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${pathname === link.path ? 'text-primary font-bold' : ''}`}>
                      {link.label}
                    </span>
                    {pathname === link.path ? (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-primary"
                        style={{ boxShadow: '0 0 4px rgba(255,107,0,0.6)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-primary/20 transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="relative overflow-hidden bg-primary text-white font-manrope font-bold tracking-wider text-xs uppercase px-6 py-3 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-sweep duration-1000" />
              <span className="relative z-10 flex items-center gap-2">
                Get Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Right side controls: Mobile Simulator + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden z-50">
            {/* Mobile Simulator Icon Button */}
            <Link
              to="/simulator"
              title="Live Simulator Console"
              className={`relative w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center border ${
                pathname === '/simulator'
                  ? 'bg-slate-950 border-primary text-primary shadow-[0_0_12px_rgba(255,107,0,0.35),inset_0_1px_0_rgba(255,107,0,0.15)]'
                  : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-[0_2px_8px_rgba(255,107,0,0.1)]'
              }`}
            >
              <svg
                className="w-4.5 h-4.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Dial scale */}
                <path d="M3.34 19a10 10 0 1 1 17.32 0" opacity={pathname === '/simulator' ? "1" : "0.7"} />
                {/* Needle pin */}
                <circle cx="12" cy="14" r="1.5" fill="currentColor" />
                {/* Oscillating needle */}
                <path
                  className={pathname === '/simulator' ? "animate-gauge-needle-fast" : "animate-gauge-needle"}
                  d="m12 14 4-4"
                  stroke={pathname === '/simulator' ? "#ff8c00" : "currentColor"}
                />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none flex items-center justify-center"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {/* Morphing icon */}
              <svg className="w-6 h-6 fill-current text-slate-800" viewBox="0 0 24 24">
                <motion.rect x="3" y="5" width="18" height="2" rx="1"
                  animate={isOpen ? { rotate: 45, y: 6, x: 2 } : { rotate: 0, y: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: '12px', originY: '6px' }}
                />
                <motion.rect x="3" y="11" width="18" height="2" rx="1"
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.rect x="3" y="17" width="18" height="2" rx="1"
                  animate={isOpen ? { rotate: -45, y: -6, x: 2 } : { rotate: 0, y: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: '12px', originY: '18px' }}
                />
              </svg>
            </button>
          </div>

          {/* Accent line */}
          <div className={`absolute bottom-0 left-0 w-full h-[3.5px] bg-gradient-to-r from-primary via-accent to-primary overflow-hidden ${scrolled ? 'rounded-b-2xl' : 'rounded-b-[24px]'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-sweep" />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-0 z-40 bg-black/80 pointer-events-auto"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
              style={{ willChange: 'opacity' }}
            />

            <motion.div
              id="mobile-nav"
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm flex pointer-events-auto"
            >
              <div className="relative w-14 flex-shrink-0 bg-[#FF6B00] flex flex-col items-center justify-between py-8 overflow-hidden">
                <span
                  className="font-poppins font-black text-[10px] tracking-[0.35em] text-white/80 uppercase"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  Maruti Hydraulics
                </span>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10 animate-pulse pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-14 h-14 bg-[#CC5500] clip-corner" />
              </div>

              <div className="flex-1 bg-[#070A0F] flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.06]">
                  <span className="font-manrope font-extrabold text-[10px] tracking-[0.25em] uppercase text-white/30">
                    Navigation
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                    aria-label="Close menu"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <motion.nav
                  variants={containerVariants}
                  className="flex-1 px-6 py-6 flex flex-col gap-1"
                >
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <motion.div key={link.label} variants={itemVariants}>
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 ${isActive
                            ? 'bg-[#FF6B00]/10 border border-[#FF6B00]/25'
                            : 'border border-transparent hover:bg-white/[0.03] hover:border-white/[0.07]'
                            }`}
                        >
                          <span className={`font-manrope font-black text-[10px] tracking-widest transition-colors duration-200 ${isActive ? 'text-[#FF6B00]' : 'text-white/20 group-hover:text-white/40'
                            }`}>
                            {link.num}
                          </span>
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200 ${isActive ? 'bg-[#FF6B00]' : 'bg-white/15 group-hover:bg-white/30'
                            }`} />
                          <span className={`font-poppins font-extrabold text-lg uppercase tracking-wide flex-1 transition-colors duration-200 ${isActive ? 'text-[#FF6B00]' : 'text-white group-hover:text-white'
                            }`}>
                            {link.label}
                          </span>
                          <motion.div
                            animate={isActive ? { x: 0, opacity: 1 } : { x: -6, opacity: 0 }}
                            className="group-hover:!opacity-100 group-hover:!translate-x-0 transition-all"
                          >
                            <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[#FF6B00]' : 'text-white/40'}`} />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <motion.div
                  variants={itemVariants}
                  className="px-6 py-5 flex flex-col gap-2.5"
                >
                  <p className="font-manrope font-extrabold text-[9px] uppercase tracking-[0.3em] text-white/25 mb-1">
                    Reach Us
                  </p>
                  <a href="tel:+919737113699" className="flex items-center gap-3 group">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B00]/10 group-hover:border-[#FF6B00]/20 transition-all">
                      <Phone className="w-3 h-3 text-white/40 group-hover:text-[#FF6B00] transition-colors" />
                    </span>
                    <span className="font-manrope text-xs text-white/50 group-hover:text-white/80 transition-colors">
                      +91 97371 13699
                    </span>
                  </a>
                  <a href="mailto:marutihydraulics09@gmail.com" className="flex items-center gap-3 group">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B00]/10 group-hover:border-[#FF6B00]/20 transition-all">
                      <Mail className="w-3 h-3 text-white/40 group-hover:text-[#FF6B00] transition-colors" />
                    </span>
                    <span className="font-manrope text-xs text-white/50 group-hover:text-white/80 transition-colors truncate">
                      marutihydraulics09@gmail.com
                    </span>
                  </a>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-3 h-3 text-white/30" />
                    </span>
                    <span className="font-manrope text-xs text-white/35">
                      Naroda, Ahmedabad, Gujarat
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="px-6 pb-8 flex flex-col gap-3"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="relative overflow-hidden flex items-center justify-between w-full bg-[#FF6B00] text-white font-manrope font-extrabold tracking-wider text-xs uppercase py-4 px-5 rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all group"
                  >
                    <span>Get a Free Quote</span>
                    <span className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-sweep" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
