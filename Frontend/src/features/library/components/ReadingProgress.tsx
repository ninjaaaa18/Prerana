import React from 'react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReadingProgress as ReadingProgressData } from '../types';

export interface ReadingProgressProps {
  progress: ReadingProgressData;
  className?: string;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({ progress, className }) => {
  return (
    <Card className={cn('space-y-3', className)}>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-600/10 text-indigo-400">
          <BookOpen className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Reading progress
          </p>
          <p className="text-sm font-bold text-slate-100">{progress.percentage}% complete</p>
        </div>
        <span className="text-xs text-slate-500">{progress.remainingMinutes} min left</span>
      </div>
      <ProgressBar value={progress.percentage} variant="primary" size="sm" />
      <p className="text-[11px] text-slate-600">Last opened · {progress.lastOpened}</p>
    </Card>
  );
};
