import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, Target, TrendingUp } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { CHILD_STATUS_BADGE_VARIANT, CHILD_STATUS_LABELS } from '../utils';
import { cn } from '@/lib/utils';
import type { Child, ChildPerformance } from '../types';

export interface ChildCardProps {
  child: Child;
  performance: ChildPerformance;
  className?: string;
}

export const ChildCard: React.FC<ChildCardProps> = ({ child, performance, className }) => {
  const isPositive = performance.averageScore >= 70;

  return (
    <Link to={`/app/parent/children/${child.id}`} className={cn('h-full', className)}>
      <Card isHoverable className="group h-full space-y-4 overflow-hidden">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
          style={{ backgroundColor: child.color }}
          aria-hidden="true"
        />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar name={child.name} size="lg" />
            <div className="space-y-0.5">
              <h3 className="font-display text-base font-bold text-slate-100">{child.name}</h3>
              <p className="text-xs text-slate-400">
                {child.grade} · {child.school}
              </p>
            </div>
          </div>
          <Badge variant={CHILD_STATUS_BADGE_VARIANT[performance.status]} size="sm">
            {CHILD_STATUS_LABELS[performance.status]}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 text-center">
            <Flame className="mx-auto mb-1 h-4 w-4 text-amber-400" aria-hidden="true" />
            <p className="font-display text-lg font-bold text-slate-100">{performance.streak}</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">day streak</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 text-center">
            <Clock className="mx-auto mb-1 h-4 w-4 text-violet-400" aria-hidden="true" />
            <p className="font-display text-lg font-bold text-slate-100">
              {performance.studyHours}h
            </p>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">this week</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 text-center">
            <Target className="mx-auto mb-1 h-4 w-4 text-sky-400" aria-hidden="true" />
            <p className="font-display text-lg font-bold text-slate-100">
              {performance.averageScore}%
            </p>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">avg score</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 font-medium text-slate-400">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              Overall mastery
            </span>
            <span
              className={cn('font-semibold', isPositive ? 'text-emerald-400' : 'text-rose-400')}
            >
              {performance.mastery}%
            </span>
          </div>
          <ProgressBar value={performance.mastery} variant="primary" size="sm" />
        </div>

        <p className="text-[11px] text-slate-500">Last active: {child.lastActive}</p>
      </Card>
    </Link>
  );
};
