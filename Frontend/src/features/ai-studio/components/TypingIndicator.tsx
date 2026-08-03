import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface TypingIndicatorProps {
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className }) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={cn('inline-flex items-center gap-1.5 px-4 py-3', className)}
      role="status"
      aria-label="Prerana AI is typing"
    >
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-2 w-2 rounded-full bg-indigo-400"
          animate={reducedMotion ? undefined : { y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: dot * 0.15,
          }}
        />
      ))}
    </div>
  );
};
