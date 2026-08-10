import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Copy, Eye, FileQuestion, ListChecks, Pencil, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DIFFICULTY_LABELS } from '../utils';
import { ContentStatusBadge } from './ContentStatusBadge';
import type { TeacherAssessment } from '../types';

export interface AssessmentCardProps {
  assessment: TeacherAssessment;
  onPreview: (assessment: TeacherAssessment) => void;
  onDuplicate: (assessment: TeacherAssessment) => void;
  onViewResults: (assessment: TeacherAssessment) => void;
  className?: string;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  onPreview,
  onDuplicate,
  onViewResults,
  className,
}) => {
  return (
    <Card isHoverable className={cn('flex h-full flex-col gap-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-bold leading-snug text-slate-100">
          {assessment.title}
        </h3>
        <ContentStatusBadge status={assessment.status} size="sm" />
      </div>

      <p className="text-xs text-slate-400">
        {assessment.subject} · {assessment.chapter}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" size="sm">
          <FileQuestion className="h-3 w-3" aria-hidden="true" />
          {assessment.questionCount} questions
        </Badge>
        <Badge variant="outline" size="sm">
          {DIFFICULTY_LABELS[assessment.difficulty]}
        </Badge>
        <Badge variant="outline" size="sm">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {assessment.durationMinutes} min
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-xs">
        <div>
          <p className="flex items-center gap-1 text-slate-500">
            <ListChecks className="h-3 w-3" aria-hidden="true" />
            Attempts
          </p>
          <p className="mt-0.5 font-semibold text-slate-200">{assessment.attempts}</p>
        </div>
        <div>
          <p className="flex items-center gap-1 text-slate-500">
            <TrendingUp className="h-3 w-3" aria-hidden="true" />
            Avg score
          </p>
          <p className="mt-0.5 font-semibold text-slate-200">
            {assessment.attempts > 0 ? `${assessment.averageScore}%` : '—'}
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-2.5 border-t border-slate-800 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Updated {assessment.lastUpdated}</span>
          <Link
            to={`/app/teach/assessments/${assessment.id}`}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            Edit
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="ghost" size="sm" onClick={() => onPreview(assessment)}>
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Preview
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDuplicate(assessment)}>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            Duplicate
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onViewResults(assessment)}>
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            Results
          </Button>
        </div>
      </div>
    </Card>
  );
};
