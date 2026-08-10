import React from 'react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import type { ProgressBarProps } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';

export interface PerformanceRow {
  id: string;
  label: string;
  value: number;
  detail?: string;
  variant?: ProgressBarProps['variant'];
}

export interface PerformanceOverviewProps {
  rows: PerformanceRow[];
  title?: string;
  className?: string;
}

export const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({
  rows,
  title,
  className,
}) => {
  return (
    <Card className={cn('space-y-5', className)}>
      {title && (
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
          {title}
        </h3>
      )}
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.id} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate text-slate-200">{row.label}</span>
              <span className="shrink-0 text-xs text-slate-400">
                {row.value}%
                {row.detail && <span className="ml-2 text-slate-500">{row.detail}</span>}
              </span>
            </div>
            <ProgressBar value={row.value} variant={row.variant ?? 'primary'} size="sm" />
          </div>
        ))}
      </div>
    </Card>
  );
};
