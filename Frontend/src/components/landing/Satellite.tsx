import React from 'react';
import { motion } from 'framer-motion';
import { Satellite as SatelliteIcon } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface SatelliteProps {
  duration?: number;
  orbitInset?: number;
  className?: string;
}

export const Satellite: React.FC<SatelliteProps> = ({ duration = 44, orbitInset = 5, className }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: '50% 50%' }}
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: '50% 50%' }}
          animate={reducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${orbitInset}%` }}
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/40 bg-slate-900/80 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
              <SatelliteIcon className="h-5 w-5" />
              <span
                aria-hidden="true"
                className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
