import React from 'react';
import { CalendarDays, Clock, Target, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressRing } from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';
import type { AssessmentResult } from '../types';

export interface ResultSummaryProps {
  result: AssessmentResult;
  className?: string;
}

function gradeColor(percentage: number): string {
  if (percentage >= 80) return '#34d399';
  if (percentage >= 60) return '#38bdf8';
  if (percentage >= 40) return '#fbbf24';
  return '#fb7185';
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, accent = 'text-slate-100' }) => {
  return (
    <div className="space-y-1">
      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">{icon}{label}</span>
      <p className={cn('font-display text-lg font-bold', accent)}>{value}</p>
    </div>
  );
};

export const ResultSummary: React.FC<ResultSummaryProps> = ({ result, className }) => {
  const ringColor = gradeColor(result.percentage);

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: `${result.color}26` }}
        aria-hidden="true"
      />

      <div className="relative grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex flex-col items-center gap-3">
          <ProgressRing value={result.percentage} size={168} strokeWidth={12} color={ringColor} />
          <Badge
            variant={result.percentage >= 80 ? 'success' : result.percentage >= 60 ? 'info' : 'warning'}
            size="lg"
          >
            <Trophy className="h-3.5 w-3.5" />
            Grade {result.grade}
          </Badge>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {result.subject}
            </p>
            <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
              {result.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            <StatItem
              icon={<Target className="h-3.5 w-3.5 text-indigo-400" />}
              label="Score"
              value={`${result.score} / ${result.totalPoints}`}
              accent="text-indigo-300"
            />
            <StatItem
              icon={<Trophy className="h-3.5 w-3.5 text-emerald-400" />}
              label="Accuracy"
              value={`${result.accuracy}%`}
              accent="text-emerald-300"
            />
            <StatItem
              icon={<Clock className="h-3.5 w-3.5 text-sky-400" />}
              label="Time taken"
              value={formatDuration(result.timeTakenSeconds)}
              accent="text-sky-300"
            />
            <StatItem
              icon={<CalendarDays className="h-3.5 w-3.5 text-slate-400" />}
              label="Completed"
              value={result.completedAt}
              accent="text-slate-300"
            />
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            You answered <span className="font-semibold text-slate-200">{result.correctCount}</span> of{' '}
            <span className="font-semibold text-slate-200">{result.totalQuestions}</span> questions
            correctly. Review your answers below to turn mistakes into learning moments.
          </p>
        </div>
      </div>
    </Card>
  );
};
