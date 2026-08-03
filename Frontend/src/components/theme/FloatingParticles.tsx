import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const PARTICLE_COLORS = ['rgba(99,102,241,0.5)', 'rgba(139,92,246,0.5)', 'rgba(56,189,248,0.4)'];

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 24, className }) => {
  const reducedMotion = usePrefersReducedMotion();

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        duration: Math.random() * 10 + 14,
        delay: Math.random() * 8,
      })),
    [count]
  );

  if (reducedMotion) {
    return (
      <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            filter: 'blur(0.5px)',
          }}
          animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
