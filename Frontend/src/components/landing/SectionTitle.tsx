import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'max-w-3xl font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-[2.75rem]',
          align === 'center' && 'mx-auto'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('max-w-2xl text-base text-slate-400', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
