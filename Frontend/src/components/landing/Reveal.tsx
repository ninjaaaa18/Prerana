import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 26, className }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
};
