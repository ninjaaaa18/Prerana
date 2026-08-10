import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { ProgressBar } from '@/components/ui/progress-bar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StudentStatusBadge } from './StudentStatusBadge';
import type { StudentProgress } from '../types';

export interface StudentCardProps {
  student: StudentProgress;
  classId: string;
  className?: string;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, classId, className }) => {
  const isPositive = student.trend >= 0;

  return (
    <Card isHoverable className={cn('space-y-3', className)}>
      <div className="flex items-center gap-3">
        <Avatar name={student.name} size="md" />
        <div className="min-w-0 flex-1 space-y-0.5">
          <h3 className="truncate font-display text-sm font-bold text-slate-100">{student.name}</h3>
          <p className="text-xs text-slate-400">Last active {student.lastActive}</p>
        </div>
        <StudentStatusBadge status={student.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-1">
          <span className="text-slate-400">Completion</span>
          <span className="block font-semibold text-slate-200">{student.completion}%</span>
          <ProgressBar value={student.completion} variant="primary" size="sm" />
        </div>
        <div className="space-y-1">
          <span className="text-slate-400">Average score</span>
          <span className="block font-semibold text-slate-200">{student.averageScore}%</span>
          <span className={cn('font-medium', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
            {isPositive ? '↑' : '↓'} {Math.abs(student.trend)} pts
          </span>
        </div>
      </div>

      <Link
        to={`/app/teach/classes/${classId}`}
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full')}
      >
        View Profile
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </Card>
  );
};
