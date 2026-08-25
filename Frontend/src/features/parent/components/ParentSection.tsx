import React from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { cn } from '@/lib/utils';

export interface ParentSectionProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ParentSection: React.FC<ParentSectionProps> = ({
  title,
  subtitle,
  action,
  children,
  className,
}) => {
  return (
    <section className={cn('space-y-4', className)} aria-label={title}>
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/35 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm">
        <SectionHeader title={title} subtitle={subtitle} action={action} className="border-0 pb-0" />
      </div>
      {children}
    </section>
  );
};
