import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx} 
            className="glass-panel rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-white/10"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <span className="font-poppins font-bold text-sm md:text-base text-white tracking-wide pr-4">
                {item.question}
              </span>
              <span className={`p-1.5 rounded-lg flex-shrink-0 ${isOpen ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/50'} transition-colors`}>
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-white/60 font-inter leading-relaxed border-t border-white/5">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
