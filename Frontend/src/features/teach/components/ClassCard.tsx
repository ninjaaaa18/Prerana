import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TeacherClass } from '../types';

export interface ClassCardProps {
  klass: TeacherClass;
  className?: string;
}

export const ClassCard: React.FC<ClassCardProps> = ({ klass, className }) => {
  const isPositive = klass.trend >= 0;

  return (
    <Card isHoverable className={cn('flex h-full flex-col gap-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-slate-100">{klass.name}</h3>
          <p className="text-xs text-slate-400">
            {klass.subject} · Section {klass.section}
          </p>
        </div>
        {klass.status === 'archived' ? (
          <Badge variant="secondary" size="sm">
            Archived
          </Badge>
        ) : (
          <Badge variant="success" size="sm" dot>
            Active
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          {klass.studentCount} students
        </span>
        <span className="inline-flex items-center gap-1.5">
          Avg score
          <span className="font-semibold text-slate-200">{klass.averageScore}%</span>
        </span>
        <span className={cn('font-medium', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
          {isPositive ? '↑' : '↓'} {Math.abs(klass.trend)} pts
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Completion</span>
          <span className="font-semibold text-slate-200">{klass.completion}%</span>
        </div>
        <ProgressBar value={klass.completion} variant="primary" size="sm" />
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-3">
        <span className="text-[11px] text-slate-500">{klass.activity}</span>
        <Link
          to={`/app/teach/classes/${klass.id}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          View Class
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
};
