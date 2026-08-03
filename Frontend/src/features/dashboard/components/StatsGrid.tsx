import React from 'react';
import { cn } from '@/lib/utils';
import { StatCard } from './StatCard';
import type { Stat } from '../types';

export interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, className }) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}>
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
};
