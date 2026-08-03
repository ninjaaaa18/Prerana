import React from 'react';
import { cn } from '@/lib/utils';
import { LessonCard } from './LessonCard';
import type { Lesson } from '../types';

export interface LessonGridProps {
  lessons: Lesson[];
  className?: string;
}

export const LessonGrid: React.FC<LessonGridProps> = ({ lessons, className }) => {
  return (
    <div className={cn('space-y-3', className)}>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} {...lesson} />
      ))}
    </div>
  );
};
