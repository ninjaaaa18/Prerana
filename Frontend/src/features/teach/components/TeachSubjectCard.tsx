import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, FileText, Layers, Settings2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';
import { getSubjectTotals as getDefaultSubjectTotals } from '../data';
import type { TeacherSubject } from '../types';

export interface TeachSubjectTotals {
  chapters: number;
  lessons: number;
  published: number;
  drafts: number;
}

export interface TeachSubjectCardProps {
  subject: TeacherSubject;
  totals?: TeachSubjectTotals;
  className?: string;
}

export const TeachSubjectCard: React.FC<TeachSubjectCardProps> = ({ subject, totals: totalsProp, className }) => {
  const totals = totalsProp ?? getDefaultSubjectTotals(subject.id);
  const { title, description, color, grade, lastUpdated } = subject;
  const publishRate = totals.lessons === 0 ? 0 : Math.round((totals.published / totals.lessons) * 100);
  const isFullyPublished = totals.lessons > 0 && publishRate === 100;
  const hasDrafts = totals.drafts > 0;

  return (
    <Card isHoverable className={cn('group relative flex h-full flex-col overflow-hidden p-0', className)}>
      <div
        className="relative flex items-center justify-between gap-3 px-6 py-4"
        style={{
          background: `linear-gradient(120deg, ${color}26, rgba(2,6,23,0.7) 60%, ${color}1a)`,
        }}
      >
        <div
          className="absolute -right-6 -top-8 h-24 w-24 rounded-full blur-2xl"
          style={{ backgroundColor: `${color}40` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          aria-hidden="true"
        />
        <div className="relative min-w-0">
          <h3 className="truncate font-display text-xl font-bold tracking-tight text-slate-50">{title}</h3>
          <p className="mt-0.5 text-xs font-medium" style={{ color: `${color}` }}>
            {grade}
          </p>
        </div>
        <Badge
          variant={isFullyPublished ? 'success' : hasDrafts ? 'warning' : 'secondary'}
          size="sm"
          className="relative shrink-0"
        >
          {isFullyPublished ? 'Fully published' : hasDrafts ? 'Has drafts' : 'All published'}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-sm leading-relaxed text-slate-400 line-clamp-2">{description}</p>

        <div className="flex items-center gap-5 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            <span className="font-semibold text-slate-200">{totals.chapters}</span> chapter{totals.chapters === 1 ? '' : 's'}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            <span className="font-semibold text-slate-200">{totals.lessons}</span> lesson{totals.lessons === 1 ? '' : 's'}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              {totals.published} published
            </span>
            <span className="text-[11px] font-medium text-slate-400">{publishRate}% published</span>
          </div>
          <ProgressBar value={publishRate} variant="primary" size="sm" />
          {hasDrafts && (
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-400">
              <FileText className="h-3 w-3" aria-hidden="true" />
              {totals.drafts} draft{totals.drafts === 1 ? '' : 's'} remaining
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-3">
          <span className="text-[11px] text-slate-500">Updated {lastUpdated}</span>
          <Link
            to={`/app/teach/subjects/${subject.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
          >
            <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
            Manage
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
