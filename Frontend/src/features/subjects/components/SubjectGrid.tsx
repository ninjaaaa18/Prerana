import React from 'react';
import { cn } from '@/lib/utils';
import { SubjectCard } from './SubjectCard';
import type { Subject } from '../types';

export interface SubjectGridProps {
  subjects: Subject[];
  className?: string;
}

export const SubjectGrid: React.FC<SubjectGridProps> = ({ subjects, className }) => {
  return (
    <div className={cn('grid gap-5 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
};
