import React from 'react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useCountUp } from '@/hooks/use-count-up';
import { cn } from '@/lib/utils';
import type { DailyGoal } from '../types';

export interface GoalCardProps extends DailyGoal {
  className?: string;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  label,
  value,
  target,
  unit,
  icon: Icon,
  className,
}) => {
  const { ref, value: count } = useCountUp(value);
  const percentage = Math.min(100, Math.max(0, (value / target) * 100));

  return (
    <Card ref={ref} className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-600/10 text-indigo-400">
          <Icon className="h-4 w-4" />
        </span>
        <p className="text-right font-display text-lg font-bold leading-none text-slate-100">
          {Math.round(count)}
          <span className="text-xs font-medium text-slate-500">
            {' '}/ {target} {unit}
          </span>
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <ProgressBar value={percentage} variant="primary" size="sm" />
      </div>
    </Card>
  );
};
