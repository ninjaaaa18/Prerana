import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Badge } from '@/components/ui/badge';
import { useCountUp } from '@/hooks/use-count-up';
import { cn } from '@/lib/utils';
import type { Goal } from '../types';

export interface GoalCardProps {
  goal: Goal;
  className?: string;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, className }) => {
  const { ref, value: count } = useCountUp(goal.value);
  const percentage = Math.min(100, Math.max(0, (goal.value / goal.target) * 100));
  const completed = goal.value >= goal.target;
  const remaining = Math.max(0, goal.target - goal.value);

  return (
    <Card ref={ref} className={cn('space-y-3', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
              completed
                ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400'
                : 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400'
            )}
          >
            <goal.icon className="h-5 w-5" />
          </span>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-100">{goal.label}</h3>
            <p className="text-xs text-slate-500">{goal.description}</p>
          </div>
        </div>
        <Badge variant={completed ? 'success' : 'secondary'} size="sm">
          {completed ? (
            <>
              <CheckCircle2 className="h-3 w-3" />
              Done
            </>
          ) : (
            `${remaining} ${goal.unit} left`
          )}
        </Badge>
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-2xl font-extrabold tabular-nums text-slate-100">
          {Math.round(count)}
          <span className="ml-1 text-sm font-medium text-slate-500">/ {goal.target} {goal.unit}</span>
        </p>
        <span className="text-sm font-semibold tabular-nums text-slate-400">
          {Math.round(percentage)}%
        </span>
      </div>

      <ProgressBar
        value={percentage}
        variant={completed ? 'emerald' : 'primary'}
        size="md"
      />
    </Card>
  );
};
