import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { MASTERY_LEVEL_BADGE_VARIANT, MASTERY_LEVEL_LABELS } from '../utils';
import { cn } from '@/lib/utils';
import type { SubjectMastery } from '../types';

export interface SubjectMasteryListProps {
  subjects: SubjectMastery[];
  className?: string;
}

export const SubjectMasteryList: React.FC<SubjectMasteryListProps> = ({ subjects, className }) => {
  return (
    <Card className={cn('relative overflow-hidden border border-slate-800/80 bg-slate-950/45 p-4 sm:p-5', className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.08),transparent_35%)]" aria-hidden="true" />

      <div className="relative space-y-4">
        {subjects.map((subject, index) => (
          <div key={subject.id} className="relative">
            {index !== subjects.length - 1 && (
              <div
                className="pointer-events-none absolute left-[12px] top-[20px] hidden h-7 w-px bg-gradient-to-b from-violet-500/50 to-slate-700/80 sm:block"
                aria-hidden="true"
              />
            )}

            <div className="relative flex gap-3 rounded-[22px] border border-slate-800/80 bg-slate-900/40 p-3 sm:p-4">
              <span
                className="relative z-10 mt-1 inline-flex h-5 w-5 shrink-0 rounded-full border border-slate-900"
                style={{ backgroundColor: subject.color, boxShadow: `0 0 18px ${subject.color}55` }}
                aria-hidden="true"
              />

              <div className="min-w-0 flex-1 space-y-2.5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-100">{subject.subjectName}</p>
                  </div>
                  <Badge variant={MASTERY_LEVEL_BADGE_VARIANT[subject.level]} size="sm">
                    {MASTERY_LEVEL_LABELS[subject.level]}
                  </Badge>
                </div>

                <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                  <ProgressBar value={subject.mastery} variant="primary" size="sm" />
                  <span className="text-right text-sm font-semibold text-violet-300">
                    {subject.mastery}%
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <span>
                    Completion <span className="font-semibold text-slate-300">{subject.completion}%</span>
                  </span>
                  <span>
                    Avg score <span className="font-semibold text-slate-300">{subject.averageScore}%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
