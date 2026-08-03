import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getChapterProgress, getChapterStatus } from '../data';
import type { Chapter, Difficulty } from '../types';

const difficultyVariant: Record<Difficulty, 'success' | 'warning' | 'destructive'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'destructive',
};

const statusVariant = {
  'not-started': 'secondary',
  'in-progress': 'info',
  completed: 'success',
} as const;

const statusLabel = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  completed: 'Completed',
} as const;

export interface ChapterCardProps {
  subjectId: string;
  chapter: Chapter;
  className?: string;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ subjectId, chapter, className }) => {
  const progress = getChapterProgress(chapter);
  const status = getChapterStatus(chapter);
  const { title, description, difficulty, durationMinutes, id } = chapter;

  return (
    <Card isHoverable className={cn('flex h-full flex-col gap-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={difficultyVariant[difficulty]} size="sm" className="capitalize">
            {difficulty}
          </Badge>
          <Badge variant={statusVariant[status]} size="sm">
            {statusLabel[status]}
          </Badge>
        </div>
        <span className="text-xs font-semibold text-slate-400">{progress}%</span>
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display text-lg font-bold tracking-tight text-slate-100">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400 line-clamp-2">{description}</p>
      </div>

      <ProgressBar value={progress} variant="primary" size="sm" />

      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          {durationMinutes} min
        </span>
        <Link
          to={`/app/subjects/${subjectId}/chapters/${id}`}
          className={cn(buttonVariants({ size: 'sm' }))}
        >
          {status === 'completed' ? 'Review' : status === 'in-progress' ? 'Continue' : 'Start'}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Card>
  );
};
