import React from 'react';
import { cn } from '@/lib/utils';
import { ParentStatCard } from './ParentStatCard';
import type { ParentStat } from '../types';

export interface ParentStatGridProps {
  stats: ParentStat[];
  className?: string;
}

export const ParentStatGrid: React.FC<ParentStatGridProps> = ({ stats, className }) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}>
      {stats.map((stat) => (
        <ParentStatCard key={stat.id} {...stat} className="h-full" />
      ))}
    </div>
  );
};
