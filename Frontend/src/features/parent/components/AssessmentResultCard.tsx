import React from 'react';
import { ArrowDownRight, ArrowUpRight, CalendarDays, Radio } from 'lucide-react';
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

export const AssessmentResultCard: React.FC<AssessmentResultCardProps> = ({
  result,
  showChild = true,
  className,
}) => {
  const hasImproved = result.improvement >= 0;

  const statusColor =
    result.status === 'failed'
      ? '#fb7185'
      : result.status === 'pending'
        ? '#fbbf24'
        : result.status === 'excellent'
          ? '#67e8f9'
          : '#34d399';

  return (
    <Card
      className={cn(
        'group relative flex flex-col gap-5 overflow-hidden border-slate-800/90 bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(10,8,29,0.88))] p-5 shadow-[0_14px_32px_rgba(2,6,23,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-[0_18px_38px_rgba(76,29,149,0.2)]',
        className
      )}
    >
      <span className="pointer-events-none absolute right-[-28px] top-[76px] h-px w-28 rotate-[-28deg] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent transition-opacity group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="mb-2 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <Radio className="h-3 w-3 text-violet-300" aria-hidden="true" />
            Learning mission
          </p>
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
          dot
          className="shrink-0"
        >
          {ASSESSMENT_STATUS_LABELS[result.status]}
        </Badge>
      </div>

      <div className="flex items-center gap-5 border-y border-slate-800/70 py-4">
        <ProgressRing
          value={result.score}
          size={104}
          strokeWidth={7}
          color={statusColor}
          aria-label={`Score ${result.score} percent`}
          className="shrink-0 drop-shadow-[0_0_12px_rgba(103,232,249,0.22)]"
        />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="sm">Grade {result.grade}</Badge>
            <span className={cn('inline-flex items-center gap-1 text-xs font-semibold', hasImproved ? 'text-emerald-400' : 'text-rose-400')}>
              {hasImproved ? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />}
              {Math.abs(result.improvement)} pts
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">Trajectory</p>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
              <span className={cn('block h-full rounded-full', hasImproved ? 'bg-gradient-to-r from-emerald-500/50 to-cyan-300' : 'bg-gradient-to-r from-rose-500/70 to-orange-300')} style={{ width: `${Math.min(100, Math.max(18, Math.abs(result.improvement) * 9))}%` }} />
            </div>
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
