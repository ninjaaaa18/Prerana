import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import type { GlowColor } from '@/utils/theme';

export interface GalaxyGlowProps {
  color?: GlowColor;
  size?: number;
  x?: string;
  y?: string;
  opacity?: number;
  className?: string;
}

export const GalaxyGlow: React.FC<GalaxyGlowProps> = ({
  color = 'indigo',
  size = 480,
  x = '75%',
  y = '-10%',
  opacity = 0.18,
  className,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const baseGradient = {
    background: `radial-gradient(circle, rgba(${
      color === 'indigo'
        ? '99,102,241'
        : color === 'violet'
          ? '139,92,246'
          : color === 'sky'
            ? '56,189,248'
            : '236,72,153'
    },1) 0%, transparent 70%)`,
  };

  return (
    <motion.div
      aria-hidden="true"
      className={cn('pointer-events-none absolute rounded-full', className)}
      style={{
        ...baseGradient,
        width: size,
        height: size,
        left: x,
        top: y,
        opacity,
        transform: 'translate(-50%, -50%)',
        filter: 'blur(60px)',
      }}
      animate={reducedMotion ? undefined : { scale: [1, 1.15, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};
