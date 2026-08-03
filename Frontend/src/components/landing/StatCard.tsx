import React from 'react';
import { Card } from '@/components/ui/card';
import { useCountUp } from '@/hooks/use-count-up';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  suffix = '',
  decimals = 0,
  className,
}) => {
  const { ref, value: count } = useCountUp<HTMLSpanElement>(value, 1400);
  const formatted = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <Card
      variant="stats"
      isHoverable
      className={cn('items-center justify-center gap-2 space-y-3 py-8 text-center', className)}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
        {icon}
      </div>
      <p className="font-display text-3xl font-bold text-slate-50 sm:text-4xl">
        <span ref={ref}>{formatted}</span>
        {suffix && <span className="text-indigo-300">{suffix}</span>}
      </p>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
    </Card>
  );
};
