import React from 'react';
import { CalendarDays } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { AssessmentCard } from './AssessmentCard';
import type { Assessment } from '../types';

export interface AssessmentListProps {
  assessments: Assessment[];
  className?: string;
}

export const AssessmentList: React.FC<AssessmentListProps> = ({ assessments, className }) => {
  if (assessments.length === 0) {
    return (
      <EmptyState
        icon={<CalendarDays className="h-8 w-8" />}
        title="No upcoming assessments"
        description="You're all caught up. New assessments will appear here."
      />
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {assessments.map((assessment) => (
        <AssessmentCard key={assessment.id} {...assessment} />
      ))}
    </div>
  );
};
