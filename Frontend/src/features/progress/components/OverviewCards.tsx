import React from 'react';
import { Card } from '@/components/ui/card';
import { useCountUp } from '@/hooks/use-count-up';
import { cn } from '@/lib/utils';
import type { OverviewStat } from '../types';

export interface OverviewCardsProps {
  stats: OverviewStat[];
  className?: string;
}

const formatValue = (value: number): string =>
  Number.isInteger(value) ? `${value}` : value.toFixed(1);

const OverviewCard: React.FC<OverviewStat> = ({
  label,
  value,
  unit,
  icon: Icon,
  accent,
  change,
  isPositive = true,
}) => {
  const { ref, value: count } = useCountUp(value);

  return (
    <Card ref={ref} className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <span
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
          style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}1a` }}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-extrabold tabular-nums text-slate-100">
          {formatValue(count)}
        </span>
        {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
      </div>

      {change && (
        <p className={cn('text-xs font-medium', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
          {isPositive ? '↑' : '↓'} {change}
        </p>
      )}
    </Card>
  );
};

export const OverviewCards: React.FC<OverviewCardsProps> = ({ stats, className }) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6', className)}>
      {stats.map((stat) => (
        <OverviewCard key={stat.id} {...stat} />
      ))}
    </div>
  );
};
