import React from 'react';
import { Trophy } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { AchievementBadge } from './AchievementBadge';
import type { Achievement } from '../types';

export interface AchievementGalleryProps {
  achievements: Achievement[];
  className?: string;
}

export const AchievementGallery: React.FC<AchievementGalleryProps> = ({
  achievements,
  className,
}) => {
  if (achievements.length === 0) {
    return (
      <EmptyState
        icon={<Trophy className="h-8 w-8" />}
        title="No achievements yet"
        description="Complete lessons, keep your streak and ace assessments to earn your first badge."
      />
    );
  }

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {achievements.map((achievement) => (
        <AchievementBadge key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};
