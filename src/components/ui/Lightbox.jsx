import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ isOpen, onClose, image, title, description, onPrev, onNext }) {
  
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 md:p-8"
      >
        <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none"></div>

        {/* Top bar */}
        <div className="flex justify-between items-center text-white z-10">
          <div className="flex flex-col gap-0.5">
            <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
              Maruti Showcase
            </span>
            <h3 className="font-poppins font-bold text-sm text-white/90">
              {title || "Custom Engineering Project"}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-accent hover:text-dark-bg hover:border-accent hover:shadow-[0_0_15px_rgba(0,194,255,0.4)] transition-all cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image content */}
        <div className="relative flex-grow flex items-center justify-center max-w-6xl mx-auto w-full my-4">
          {onPrev && (
            <button 
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-2 md:left-4 p-3 bg-dark-bg/85 hover:bg-accent hover:text-dark-bg border border-white/10 hover:border-accent rounded-full text-white z-10 transition-all cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <motion.img 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            src={image} 
            alt={title} 
            className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/15"
          />

          {onNext && (
            <button 
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-2 md:right-4 p-3 bg-dark-bg/85 hover:bg-accent hover:text-dark-bg border border-white/10 hover:border-accent rounded-full text-white z-10 transition-all cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Details */}
        <div className="text-center text-white/80 max-w-2xl mx-auto pb-4 z-10 px-4">
          <p className="font-manrope text-xs md:text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
