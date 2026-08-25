import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface ConstellationLayerProps {
  starCount?: number;
  segmentCount?: number;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  key: string;
}

export const ConstellationLayer: React.FC<ConstellationLayerProps> = ({
  starCount = 18,
  segmentCount = 18,
  className,
}) => {
  const reducedMotion = usePrefersReducedMotion();

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.3 + 0.5,
        key: `s-${i}`,
      })),
    [starCount]
  );

  const segments = useMemo(() => {
    const out: React.ReactNode[] = [];
    for (let i = 0; i < segmentCount; i++) {
      const a = stars[Math.floor(Math.random() * stars.length)];
      const b = stars[Math.floor(Math.random() * stars.length)];
      if (!a || !b || a === b) continue;
      out.push(
        <line
          key={`l-${i}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="rgba(148,163,184,0.14)"
          strokeWidth="0.35"
        />
      );
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segmentCount]);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      {segments}
      {stars.map((s) => (
        <motion.circle
          key={s.key}
          cx={s.x}
          cy={s.y}
          r={s.size}
          fill="rgba(226,232,240,0.7)"
          animate={reducedMotion ? undefined : { opacity: [0.2, 0.7, 0.2] }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
};
