import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/icon';
import type { IconName } from '@/components/ui/icon';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { createFloatAnimation } from '@/constants/animations';

export interface PlanetNodeProps {
  name: string;
  icon: IconName;
  from: string;
  to: string;
  glow: string;
  size?: number;
  floatDistance?: number;
  floatDuration?: number;
  floatDelay?: number;
  className?: string;
}

export const PlanetNode: React.FC<PlanetNodeProps> = ({
  name,
  icon,
  from,
  to,
  glow,
  size = 56,
  floatDistance = 8,
  floatDuration = 6,
  floatDelay = 0,
  className,
}) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      role="img"
      aria-label={name}
      className={cn('group relative', className)}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={reducedMotion ? undefined : createFloatAnimation(floatDistance, floatDuration, floatDelay)}
      >
        <motion.div
          className="relative h-full w-full rounded-full"
          style={{
            background: `radial-gradient(circle at 32% 30%, ${from} 0%, ${to} 78%)`,
            boxShadow: `0 0 ${Math.round(size / 2.4)}px ${glow}, inset -${Math.round(size / 8)}px -${Math.round(size / 8)}px ${Math.round(size / 2)}px rgba(0,0,0,0.45)`,
          }}
          whileHover={reducedMotion ? undefined : { scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          <span aria-hidden="true" className="absolute inset-1 rounded-full border border-white/20" />
          <span
            aria-hidden="true"
            className="absolute left-[14%] top-[10%] h-[28%] w-[28%] rounded-full bg-white/50 blur-[2px]"
          />
          <Icon
            name={icon}
            size={Math.round(size * 0.4)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/90"
          />
        </motion.div>

        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-700 bg-slate-900/90 px-2.5 py-1 text-[11px] font-medium text-slate-200 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          {name}
        </span>
      </motion.div>
    </div>
  );
};
