import React from 'react';
import { BarChart3 } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { SubjectProgressCard } from './SubjectProgressCard';
import type { SubjectProgress } from '../types';

export interface SubjectProgressGridProps {
  subjects: SubjectProgress[];
  className?: string;
}

export const SubjectProgressGrid: React.FC<SubjectProgressGridProps> = ({
  subjects,
  className,
}) => {
  if (subjects.length === 0) {
    return (
      <EmptyState
        icon={<BarChart3 className="h-8 w-8" />}
        title="No subject progress yet"
        description="Start a lesson in any subject and your progress will appear here."
      />
    );
  }

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {subjects.map((subject) => (
        <SubjectProgressCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
};
