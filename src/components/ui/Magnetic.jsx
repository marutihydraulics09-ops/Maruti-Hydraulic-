import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Magnetic Component
 * Wraps buttons, icons, or links, pulling them slightly toward the mouse cursor 
 * on hover with smooth spring-damped physics.
 */
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Center coordinates of the wrapped element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate displacement based on mouse proximity and magnetic strength
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 180, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
