import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';
import SEOHeader from '../components/common/SEOHeader';

export default function NotFound() {
  return (
    <>
      <SEOHeader title="404 - Cylinder Misaligned" />
      
      <section className="min-h-[80vh] flex flex-col justify-center items-center py-20 px-4 text-center relative overflow-hidden bg-dark-bg">
        <div className="absolute inset-0 engineering-grid opacity-[0.03] pointer-events-none"></div>

        <div className="relative z-10 max-w-lg space-y-8">
          
          {/* Animated Cylinder misalignment 404 vector */}
          <div className="flex justify-center">
            <motion.div 
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative p-6 bg-red-500/10 border border-red-500/20 rounded-full w-24 h-24 flex items-center justify-center text-red-500"
            >
              <AlertCircle className="w-12 h-12" />
            </motion.div>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-red-500 font-extrabold tracking-widest uppercase">
              System Error: Code 404
            </span>
            <h1 className="font-poppins font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
              Cylinder Misaligned
            </h1>
            <p className="text-sm font-inter text-white/60 max-w-sm mx-auto leading-relaxed">
              The page path you are requesting is either decommissioned, offline, or does not exist on our servers.
            </p>
          </div>

          <div className="pt-4">
            <Link 
              to="/" 
              className="bg-accent text-dark-bg font-manrope font-extrabold tracking-widest text-xs uppercase px-8 py-4 rounded-xl hover:bg-orange-600 transition-all glow-btn-orange inline-flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Reset System (Home)
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
