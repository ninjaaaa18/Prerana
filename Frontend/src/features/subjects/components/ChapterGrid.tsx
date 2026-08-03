import React from 'react';
import { cn } from '@/lib/utils';
import { ChapterCard } from './ChapterCard';
import type { Chapter } from '../types';

export interface ChapterGridProps {
  subjectId: string;
  chapters: Chapter[];
  className?: string;
}

export const ChapterGrid: React.FC<ChapterGridProps> = ({ subjectId, chapters, className }) => {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2', className)}>
      {chapters.map((chapter) => (
        <ChapterCard key={chapter.id} subjectId={subjectId} chapter={chapter} />
      ))}
    </div>
  );
};
