import React from 'react';
import { cn } from '@/lib/utils';
import { TeacherStatCard } from './TeacherStatCard';
import type { TeacherStat } from '../types';

export interface TeacherStatGridProps {
  stats: TeacherStat[];
  className?: string;
}

export const TeacherStatGrid: React.FC<TeacherStatGridProps> = ({ stats, className }) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}>
      {stats.map((stat) => (
        <TeacherStatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
};
