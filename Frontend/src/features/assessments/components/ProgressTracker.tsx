import React from 'react';
import { ProgressBar } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';

export interface ProgressTrackerProps {
  current: number;
  total: number;
  answeredCount: number;
  className?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  current,
  total,
  answeredCount,
  className,
}) => {
  const percent = total === 0 ? 0 : Math.round((answeredCount / total) * 100);

  return (
    <div className={cn('w-full space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <p className="font-medium text-slate-300">
          Question <span className="font-bold text-slate-100">{current + 1}</span>
          <span className="text-slate-500"> of {total}</span>
        </p>
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-emerald-400">{answeredCount}</span> answered ·{' '}
          {percent}%
        </p>
      </div>
      <ProgressBar value={percent} variant="primary" size="sm" />
    </div>
  );
};
