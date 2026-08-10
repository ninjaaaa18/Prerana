import React from 'react';
import { cn } from '@/lib/utils';
import { ClassCard } from './ClassCard';
import type { TeacherClass } from '../types';

export interface ClassGridProps {
  classes: TeacherClass[];
  className?: string;
}

export const ClassGrid: React.FC<ClassGridProps> = ({ classes, className }) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {classes.map((klass) => (
        <ClassCard key={klass.id} klass={klass} />
      ))}
    </div>
  );
};
