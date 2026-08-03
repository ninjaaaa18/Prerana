import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface LearnerCoreProps {
  size?: number;
  className?: string;
}

export const LearnerCore: React.FC<LearnerCoreProps> = ({ size = 104, className }) => {
  const reducedMotion = usePrefersReducedMotion();
  const gradientId = React.useId();

  return (
    <div
      role="img"
      aria-label="A learner at the centre of their learning universe"
      className={cn('absolute left-1/2 top-1/2 z-10', className)}
      style={{ width: size, height: size, transform: 'translate(-50%, -50%)' }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-indigo-400/30"
        animate={reducedMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.7, 0.15, 0.7] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute -inset-3 rounded-full bg-indigo-500/15 blur-2xl"
        animate={reducedMotion ? undefined : { opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-4 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 32% 30%, #a5b4fc 0%, #6366f1 42%, #3730a3 100%)',
          boxShadow: '0 0 48px rgba(99,102,241,0.6), inset 0 -12px 24px rgba(0,0,0,0.4)',
        }}
        animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c7d2fe" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="24" r="9" fill={`url(#${gradientId})`} />
          <path d="M16 58 a16 13 0 0 1 32 0 z" fill={`url(#${gradientId})`} />
        </svg>
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="absolute -right-2 -top-2 text-indigo-200"
        animate={reducedMotion ? undefined : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="h-5 w-5" />
      </motion.span>
    </div>
  );
};
