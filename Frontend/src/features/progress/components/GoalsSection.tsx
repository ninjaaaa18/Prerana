import React from 'react';
import { Target } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { GoalCard } from './GoalCard';
import type { Goal } from '../types';

export interface GoalsSectionProps {
  goals: Goal[];
  className?: string;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ goals, className }) => {
  if (goals.length === 0) {
    return (
      <EmptyState
        icon={<Target className="h-8 w-8" />}
        title="No goals set yet"
        description="Set a daily, weekly and monthly goal to keep yourself on track."
      />
    );
  }

  return (
    <div className={cn('grid gap-4', className)}>
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};
