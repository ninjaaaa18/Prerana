import React from 'react';
import { ProgressRing } from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';

export interface ProgressSummaryProps {
  value: number;
  label?: string;
  detail?: string;
  color?: string;
  size?: number;
  className?: string;
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  value,
  label,
  detail,
  color = '#6366f1',
  size = 56,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <ProgressRing value={value} size={size} strokeWidth={8} color={color} showValue={false} />
      <div className="min-w-0 space-y-0.5">
        <p className="font-display text-xl font-bold leading-none text-slate-100">
          {Math.round(value)}%
        </p>
        {label && <p className="text-xs font-medium text-slate-400">{label}</p>}
        {detail && <p className="text-xs text-slate-500">{detail}</p>}
      </div>
    </div>
  );
};
