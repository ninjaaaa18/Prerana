import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ContinueLearningItem } from '../types';

export const ContinueLearningCard: React.FC<ContinueLearningItem> = ({
  subjectId,
  subjectName,
  chapter,
  progress,
  estimatedMinutes,
}) => {
  return (
    <Card className="h-full overflow-hidden p-6 sm:p-8">
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <Badge variant="secondary" size="sm">
              <BookOpen className="h-3 w-3" />
              {subjectName}
            </Badge>
            <h3 className="font-display text-lg font-bold tracking-tight text-slate-50 sm:text-xl">
              {chapter}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300">
            <Clock className="h-3.5 w-3.5 text-indigo-400" />
            {estimatedMinutes} min left
          </span>
        </div>

        <div className="flex-1 space-y-2">
          <ProgressBar value={progress} variant="primary" size="md" showValue />
          <p className="text-xs text-slate-500">{progress}% complete in this chapter</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link to={`/app/subjects/${subjectId}`} className={cn(buttonVariants({ size: 'lg' }))}>
            Resume lesson
            <ChevronRight className="h-4 w-4" />
          </Link>
          <p className="text-xs text-slate-500">Pick up right where you left off</p>
        </div>
      </div>
    </Card>
  );
};
