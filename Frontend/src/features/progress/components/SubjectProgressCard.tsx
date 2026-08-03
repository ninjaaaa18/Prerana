import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, Layers } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SubjectProgress } from '../types';

export interface SubjectProgressCardProps {
  subject: SubjectProgress;
  className?: string;
}

const scoreTone = (score: number): 'success' | 'warning' | 'destructive' => {
  if (score >= 85) return 'success';
  if (score >= 70) return 'warning';
  return 'destructive';
};

export const SubjectProgressCard: React.FC<SubjectProgressCardProps> = ({ subject, className }) => {
  const {
    id,
    name,
    icon: Icon,
    color,
    progress,
    lessonsCompleted,
    lessonsTotal,
    chaptersCompleted,
    chaptersTotal,
    averageScore,
    lastActivity,
  } = subject;

  return (
    <Card isHoverable className={cn('group space-y-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <ProgressRing value={progress} size={64} strokeWidth={7} color={color} />
      </div>

      <div className="space-y-1">
        <h3 className="font-display font-semibold text-slate-100">{name}</h3>
        <p className="text-xs text-slate-500">
          Last activity · <span className="font-medium text-slate-400">{lastActivity}</span>
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-sm">
        <div className="flex items-center gap-2">
          <BookOpenCheck className="h-3.5 w-3.5 text-slate-500" />
          <dt className="sr-only">Lessons completed</dt>
          <dd className="text-slate-200">
            <span className="font-semibold">{lessonsCompleted}</span>
            <span className="text-slate-500"> / {lessonsTotal}</span>
            <span className="ml-1 text-[11px] text-slate-500">lessons</span>
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-slate-500" />
          <dt className="sr-only">Chapters completed</dt>
          <dd className="text-slate-200">
            <span className="font-semibold">{chaptersCompleted}</span>
            <span className="text-slate-500"> / {chaptersTotal}</span>
            <span className="ml-1 text-[11px] text-slate-500">chapters</span>
          </dd>
        </div>
      </dl>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Avg. score</span>
          <Badge variant={scoreTone(averageScore)} size="sm">
            {averageScore}%
          </Badge>
        </div>
        <Link
          to={`/app/subjects/${id}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          aria-label={`View ${name} subject`}
        >
          View
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
};
