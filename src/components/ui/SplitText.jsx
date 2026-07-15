import React from 'react';
import { motion } from 'framer-motion';

/**
 * SplitText Component
 * Splits a text string into individual words and animates them sliding upward 
 * sequentially from an overflow-hidden wrapper, creating a cinematic editorial reveal.
 */
export default function SplitText({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  once = true
}) {
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  const words = children.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: { y: '110%' },
    visible: {
      y: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1] // Apple deceleration curve
      }
    }
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1, margin: "0px 0px -30px 0px" }}
      variants={containerVariants}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] pb-[0.05em] pt-[0.1em]">
          <motion.span
            variants={wordVariants}
            className="inline-block origin-bottom will-change-transform"
          >
            {word === '' ? '\u00A0' : word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
