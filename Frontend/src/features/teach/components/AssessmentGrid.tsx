import React from 'react';
import { cn } from '@/lib/utils';
import { AssessmentCard } from './AssessmentCard';
import type { TeacherAssessment } from '../types';

export interface AssessmentGridProps {
  assessments: TeacherAssessment[];
  onPreview: (assessment: TeacherAssessment) => void;
  onDuplicate: (assessment: TeacherAssessment) => void;
  onViewResults: (assessment: TeacherAssessment) => void;
  className?: string;
}

export const AssessmentGrid: React.FC<AssessmentGridProps> = ({
  assessments,
  onPreview,
  onDuplicate,
  onViewResults,
  className,
}) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {assessments.map((assessment) => (
        <AssessmentCard
          key={assessment.id}
          assessment={assessment}
          onPreview={onPreview}
          onDuplicate={onDuplicate}
          onViewResults={onViewResults}
        />
      ))}
    </div>
  );
};
