import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers, Settings2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getSubjectTotals } from '../data';
import type { TeacherSubject } from '../types';

export interface TeachSubjectCardProps {
  subject: TeacherSubject;
  className?: string;
}

export const TeachSubjectCard: React.FC<TeachSubjectCardProps> = ({ subject, className }) => {
  const totals = getSubjectTotals(subject.id);
  const { title, description, color, grade, lastUpdated } = subject;

  return (
    <Card isHoverable className={cn('group flex h-full flex-col overflow-hidden p-0', className)}>
      <div
        className="relative flex h-24 items-center justify-between overflow-hidden px-6"
        style={{
          background: `linear-gradient(120deg, ${color}26, rgba(2,6,23,0.7) 60%, ${color}1a)`,
        }}
      >
        <div
          className="absolute -right-6 -top-8 h-24 w-24 rounded-full blur-2xl"
          style={{ backgroundColor: `${color}40` }}
          aria-hidden="true"
        />
        <div className="relative">
          <h3 className="font-display text-xl font-bold tracking-tight text-slate-50">{title}</h3>
          <p className="mt-0.5 text-xs text-slate-400">{grade}</p>
        </div>
        <Badge variant="secondary" size="sm" className="relative">
          Owned by you
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-sm leading-relaxed text-slate-400">{description}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            {totals.chapters} chapters
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {totals.lessons} lessons
          </span>
          <Badge variant="success" size="sm">
            {totals.published} published
          </Badge>
          <Badge variant="warning" size="sm">
            {totals.drafts} drafts
          </Badge>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-3">
          <span className="text-[11px] text-slate-500">Updated {lastUpdated}</span>
          <Link
            to={`/app/teach/subjects/${subject.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
          >
            <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
            Manage Subject
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
