import React from 'react';
import { Card } from '@/components/ui/card';
import { useCountUp } from '@/hooks/use-count-up';
import { cn } from '@/lib/utils';
import type { ParentStat } from '../types';

export interface ParentStatCardProps extends ParentStat {
  className?: string;
}

export const ParentStatCard: React.FC<ParentStatCardProps> = ({
  label,
  value,
  unit,
  icon: Icon,
  change,
  isPositive = true,
  color,
  className,
}) => {
  const { ref, value: count } = useCountUp(value);

  return (
    <Card
      ref={ref}
      className={cn(
        'relative overflow-hidden border border-slate-800/80 bg-slate-950/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
          <div className="flex items-end gap-1.5">
            <span className="font-display text-3xl font-extrabold tracking-tight text-slate-50">
              {Math.round(count)}
            </span>
            {unit && <span className="pb-1 text-xs font-medium text-slate-500">{unit}</span>}
          </div>
        </div>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      {change && (
        <p className={cn('mt-3 text-xs font-medium', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
          {isPositive ? '↑' : '↓'} {change}
        </p>
      )}
    </Card>
  );
};
