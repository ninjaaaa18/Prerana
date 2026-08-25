import React from 'react';
import { CalendarDays, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { ASSESSMENT_STATUS_BADGE_VARIANT, ASSESSMENT_STATUS_LABELS } from '../utils';
import { cn } from '@/lib/utils';
import type { AssessmentResult } from '../types';

export interface AssessmentHistoryListProps {
  results: AssessmentResult[];
  className?: string;
}

export const AssessmentHistoryList: React.FC<AssessmentHistoryListProps> = ({
  results,
  className,
}) => {
  if (results.length === 0) {
    return (
      <EmptyState
        title="No assessments yet"
        description="Assessment results will appear here as they are completed."
      />
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {results.map((result) => {
        const hasImproved = result.improvement >= 0;

        return (
          <div
            key={result.id}
            className="rounded-[20px] border border-slate-800/80 bg-slate-950/40 p-3.5 sm:p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-100">{result.title}</p>
                <p className="mt-1 text-xs text-slate-400">{result.subjectName}</p>
              </div>

              <Badge
                variant={ASSESSMENT_STATUS_BADGE_VARIANT[result.status]}
                size="sm"
                className="w-fit"
              >
                {ASSESSMENT_STATUS_LABELS[result.status]}
              </Badge>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[1.7rem] font-extrabold leading-none text-slate-100">
                  {result.score}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  %
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 sm:justify-center">
                <span className="rounded-full border border-slate-700 bg-slate-900/60 px-2 py-1">
                  Grade <span className="font-semibold text-violet-300">{result.grade}</span>
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2 py-1 font-semibold',
                    hasImproved
                      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                      : 'border-rose-500/20 bg-rose-500/10 text-rose-400'
                  )}
                >
                  {hasImproved ? (
                    <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {Math.abs(result.improvement)} pts
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 sm:justify-end">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {result.date}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
