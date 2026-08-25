import React from 'react';
import { CalendarDays, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { ASSESSMENT_STATUS_BADGE_VARIANT, ASSESSMENT_STATUS_LABELS } from '../utils';
import { cn } from '@/lib/utils';
import type { AssessmentResult } from '../types';

export interface AssessmentResultCardProps {
  result: AssessmentResult;
  showChild?: boolean;
  className?: string;
}

const scoreColor = (score: number): string => {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#6366f1';
  if (score >= 40) return '#f59e0b';
  return '#f43f5e';
};

export const AssessmentResultCard: React.FC<AssessmentResultCardProps> = ({
  result,
  showChild = true,
  className,
}) => {
  const hasImproved = result.improvement >= 0;

  return (
    <Card className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-sm font-bold text-slate-100">{result.title}</h3>
          <p className="flex items-center gap-2 text-xs text-slate-400">
            <span className="truncate">{result.subjectName}</span>
            {showChild && <span className="text-slate-600">·</span>}
            {showChild && <span className="shrink-0">{result.childName}</span>}
          </p>
        </div>
        <Badge
          variant={ASSESSMENT_STATUS_BADGE_VARIANT[result.status]}
          size="sm"
          className="shrink-0"
        >
          {ASSESSMENT_STATUS_LABELS[result.status]}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <ProgressRing
          value={result.score}
          size={72}
          strokeWidth={8}
          color={scoreColor(result.score)}
          aria-label={`Score ${result.score} percent`}
        />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              Grade {result.grade}
            </Badge>
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs font-semibold',
                hasImproved ? 'text-emerald-400' : 'text-rose-400'
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
          <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <CalendarDays className="h-3 w-3" aria-hidden="true" />
            {result.date}
          </p>
        </div>
      </div>
    </Card>
  );
};
