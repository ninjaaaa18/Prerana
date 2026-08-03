import React from 'react';
import { CalendarDays, ClipboardCheck, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Assessment, Difficulty } from '../types';

const difficultyVariant: Record<Difficulty, 'success' | 'warning' | 'destructive'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'destructive',
};

export const AssessmentCard: React.FC<Assessment> = ({
  subjectName,
  title,
  date,
  durationMinutes,
  difficulty,
}) => {
  return (
    <Card className="flex items-center gap-4 p-4">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 text-indigo-400">
        <ClipboardCheck className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="truncate text-sm font-semibold text-slate-100">{title}</p>
        <p className="text-xs text-slate-500">{subjectName}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {durationMinutes} min
          </span>
        </div>
      </div>

      <Badge variant={difficultyVariant[difficulty]} size="sm" className="capitalize">
        {difficulty}
      </Badge>
    </Card>
  );
};
