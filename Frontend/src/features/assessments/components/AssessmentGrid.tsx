import React from 'react';
import { cn } from '@/lib/utils';
import { AssessmentCard } from './AssessmentCard';
import { EmptyAssessmentState } from './EmptyAssessmentState';
import type { Assessment } from '../types';

export interface AssessmentGridProps {
  assessments: Assessment[];
  emptyVariant?: 'none' | 'completed' | 'upcoming';
  className?: string;
}

export const AssessmentGrid: React.FC<AssessmentGridProps> = ({
  assessments,
  emptyVariant = 'none',
  className,
}) => {
  if (assessments.length === 0) {
    return <EmptyAssessmentState variant={emptyVariant} />;
  }

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {assessments.map((assessment) => (
        <AssessmentCard key={assessment.id} assessment={assessment} />
      ))}
    </div>
  );
};
