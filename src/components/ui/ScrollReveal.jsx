import React from 'react';
import { motion } from 'framer-motion';

const revealVariants = {
  'fade-up': {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0 }
  },
  'fade-down': {
    hidden: { opacity: 0, y: -35 },
    visible: { opacity: 1, y: 0 }
  },
  'fade-left': {
    hidden: { opacity: 0, x: 35 },
    visible: { opacity: 1, x: 0 }
  },
  'fade-right': {
    hidden: { opacity: 0, x: -35 },
    visible: { opacity: 1, x: 0 }
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }
};

/**
 * Standard scroll reveal element
 */
export const ScrollReveal = React.forwardRef(({
  children,
  type = 'fade-up',
  duration = 0.8,
  delay = 0,
  threshold = 0.05,
  once = true,
  className = ''
}, ref) => {
  const chosenVariant = revealVariants[type] || revealVariants['fade-up'];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: "0px 0px -40px 0px" }}
      variants={chosenVariant}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Apple ease-out-expo curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

export default ScrollReveal;

/**
 * Container to stagger multiple items automatically
 */
export const StaggerContainer = React.forwardRef(({
  children,
  staggerDelay = 0.06,
  delay = 0,
  once = true,
  threshold = 0.05,
  className = ''
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: "0px 0px -40px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

/**
 * Individual item inside a StaggerContainer
 */
export const StaggerItem = React.forwardRef(({
  children,
  type = 'fade-up',
  duration = 0.8,
  className = ''
}, ref) => {
  const chosenVariant = revealVariants[type] || revealVariants['fade-up'];

  return (
    <motion.div
      ref={ref}
      variants={chosenVariant}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});
