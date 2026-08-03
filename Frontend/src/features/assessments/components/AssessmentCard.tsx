import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarClock, CheckCircle2, Clock, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Assessment, AssessmentStatus } from '../types';

export interface AssessmentCardProps {
  assessment: Assessment;
  className?: string;
}

const difficultyVariant = {
  easy: 'success',
  medium: 'warning',
  hard: 'destructive',
} as const;

const difficultyLabel = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
} as const;

function getStatusMeta(status: AssessmentStatus, progress?: number): {
  label: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'outline';
} {
  if (status === 'completed') return { label: 'Completed', variant: 'success' };
  if (status === 'upcoming') return { label: 'Scheduled', variant: 'warning' };
  if (progress && progress > 0 && progress < 100) return { label: 'In progress', variant: 'info' };
  return { label: 'Ready', variant: 'primary' };
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({ assessment, className }) => {
  const { title, description, icon: Icon, color, status, progress, bestScore, dueAt } = assessment;
  const statusMeta = getStatusMeta(status, progress);
  const isUpcoming = status === 'upcoming';
  const inProgress = Boolean(progress && progress > 0 && progress < 100);

  const ctaLabel = isUpcoming
    ? 'Scheduled'
    : status === 'completed'
      ? 'Review results'
      : inProgress
        ? 'Continue assessment'
        : 'Start assessment';

  return (
    <Card isHoverable className={cn('group flex h-full flex-col gap-4 overflow-hidden', className)}>
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <Badge variant={statusMeta.variant} size="sm" dot={inProgress}>
          {statusMeta.label}
        </Badge>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {assessment.subject}
        </p>
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-slate-100">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">{description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5" />
          {assessment.questionCount} questions
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {assessment.durationMinutes} min
        </span>
        <Badge variant={difficultyVariant[assessment.difficulty]} size="sm">
          <Gauge className="h-3 w-3" />
          {difficultyLabel[assessment.difficulty]}
        </Badge>
      </div>

      <div className="mt-auto space-y-3">
        {isUpcoming && dueAt && (
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300/90">
            <CalendarClock className="h-3.5 w-3.5" />
            Opens {dueAt}
          </p>
        )}

        {inProgress && (
          <ProgressBar
            value={progress ?? 0}
            variant="primary"
            size="sm"
            showValue
          />
        )}

        {status === 'completed' && bestScore !== undefined && (
          <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Best score
            </span>
            <span className="font-display text-sm font-bold text-emerald-300">{bestScore}%</span>
          </div>
        )}

        <div className="flex gap-2">
          {isUpcoming ? (
            <span
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'w-full cursor-not-allowed opacity-60'
              )}
              aria-disabled="true"
            >
              Not started yet
            </span>
          ) : (
            <Link
              to={`/app/assessments/${assessment.id}`}
              className={cn(buttonVariants({ variant: 'primary', size: 'sm' }), 'w-full')}
            >
              {ctaLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};
