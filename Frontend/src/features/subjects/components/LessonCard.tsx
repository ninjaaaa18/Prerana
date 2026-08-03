import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Lock,
  MousePointerClick,
  Network,
  PlayCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Lesson, LessonType } from '../types';

const lessonTypeMeta: Record<LessonType, { icon: LucideIcon; label: string }> = {
  reading: { icon: BookOpen, label: 'Reading' },
  video: { icon: PlayCircle, label: 'Video' },
  quiz: { icon: ClipboardCheck, label: 'Quiz' },
  mindmap: { icon: Network, label: 'Mind map' },
  interactive: { icon: MousePointerClick, label: 'Interactive' },
};

export const LessonCard: React.FC<Lesson> = ({ title, readingMinutes, type, isLocked, isCompleted }) => {
  const meta = lessonTypeMeta[type];
  const TypeIcon = meta.icon;

  return (
    <Card isHoverable className={cn('flex items-center gap-4 p-4', isLocked && 'opacity-60')}>
      <span
        className={cn(
          'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
          isCompleted
            ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400'
            : 'border-slate-700 bg-slate-800/80 text-indigo-400'
        )}
      >
        {isCompleted ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : isLocked ? (
          <Lock className="h-4 w-4" />
        ) : (
          <TypeIcon className="h-4 w-4" />
        )}
      </span>

      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="truncate text-sm font-semibold text-slate-100">{title}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingMinutes} min
          </span>
          <span className="inline-flex items-center gap-1">
            <TypeIcon className="h-3.5 w-3.5" />
            {meta.label}
          </span>
        </div>
      </div>

      <Badge variant={isCompleted ? 'success' : isLocked ? 'secondary' : 'primary'} size="sm">
        {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Start'}
      </Badge>
    </Card>
  );
};
