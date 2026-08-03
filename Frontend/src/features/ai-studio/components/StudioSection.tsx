import React from 'react';
import { cn } from '@/lib/utils';

export interface StudioSectionProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const StudioSection: React.FC<StudioSectionProps> = ({
  title,
  subtitle,
  action,
  children,
  className,
}) => {
  return (
    <section className={cn('space-y-4', className)} aria-label={title}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
};
