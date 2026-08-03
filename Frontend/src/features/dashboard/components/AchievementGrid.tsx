import React from 'react';
import { Trophy } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { AchievementCard } from './AchievementCard';
import type { Achievement } from '../types';

export interface AchievementGridProps {
  achievements: Achievement[];
  className?: string;
}

export const AchievementGrid: React.FC<AchievementGridProps> = ({ achievements, className }) => {
  if (achievements.length === 0) {
    return (
      <EmptyState
        icon={<Trophy className="h-8 w-8" />}
        title="No achievements yet"
        description="Complete lessons and keep your streak to earn your first badge."
      />
    );
  }

  return (
    <div className={cn('grid gap-3 sm:grid-cols-2', className)}>
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} {...achievement} />
      ))}
    </div>
  );
};
