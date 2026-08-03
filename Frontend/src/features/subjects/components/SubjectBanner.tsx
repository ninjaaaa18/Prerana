import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SubjectBannerProps {
  color: string;
  name: string;
  icon: LucideIcon;
  className?: string;
}

export const SubjectBanner: React.FC<SubjectBannerProps> = ({ color, name, icon: Icon, className }) => {
  return (
    <div
      className={cn('relative overflow-hidden rounded-3xl border border-slate-800 p-8 sm:p-10', className)}
      style={{
        background: `linear-gradient(135deg, ${color}26 0%, rgba(2,6,23,0.92) 55%, ${color}1f 100%)`,
      }}
      role="img"
      aria-label={`${name} subject banner`}
    >
      <div
        className="absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: `${color}33` }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 right-16 h-40 w-40 rounded-full blur-2xl"
        style={{ backgroundColor: `${color}2e` }}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-6">
        <div className="space-y-4">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ borderColor: `${color}55`, color }}
          >
            <Icon className="h-3.5 w-3.5" />
            {name}
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            {name}
          </h1>
        </div>
        <Icon className="hidden h-24 w-24 text-white/10 sm:block" aria-hidden="true" />
      </div>
    </div>
  );
};
