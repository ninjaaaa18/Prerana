import React from 'react';
import { Card } from '@/components/ui/card';
import { useCountUp } from '@/hooks/use-count-up';
import { cn } from '@/lib/utils';
import type { TeacherStat } from '../types';

export interface TeacherStatCardProps extends TeacherStat {
  className?: string;
}

export const TeacherStatCard: React.FC<TeacherStatCardProps> = ({
  label,
  value,
  unit,
  icon: Icon,
  change,
  isPositive = true,
  className,
}) => {
  const { ref, value: count } = useCountUp(value);

  return (
    <Card ref={ref} className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-400">
          <Icon className="h-4 w-4" />
        </span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-extrabold text-slate-100">
          {Math.round(count)}
        </span>
        {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
      </div>

      {change && (
        <p className={cn('text-xs font-medium', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
          {isPositive ? '↑' : '↓'} {change}
        </p>
      )}
    </Card>
  );
};
