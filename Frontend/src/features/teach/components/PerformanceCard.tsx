import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';

export interface PerformanceCardProps {
  title: string;
  value: number;
  unit?: string;
  icon?: LucideIcon;
  color?: string;
  change?: string;
  isPositive?: boolean;
  className?: string;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  value,
  unit = '%',
  icon: Icon,
  color = '#6366f1',
  change,
  isPositive = true,
  className,
}) => {
  return (
    <Card className={cn('flex items-center gap-4', className)}>
      {Icon && (
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-indigo-400">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
        <p className="mt-0.5 font-display text-2xl font-extrabold text-slate-100">
          {value}
          {unit}
        </p>
        {change && (
          <p className={cn('text-xs font-medium', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
            {isPositive ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
      <ProgressRing value={value} size={56} strokeWidth={6} color={color} />
    </Card>
  );
};
