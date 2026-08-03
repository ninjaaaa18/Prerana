import React from 'react';
import { cn } from '@/lib/utils';
import { GoalCard } from './GoalCard';
import type { DailyGoal } from '../types';

export interface DailyGoalsProps {
  goals: DailyGoal[];
  className?: string;
}

export const DailyGoals: React.FC<DailyGoalsProps> = ({ goals, className }) => {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2 xl:grid-cols-1', className)}>
      {goals.map((goal) => (
        <GoalCard key={goal.id} {...goal} />
      ))}
    </div>
  );
};
