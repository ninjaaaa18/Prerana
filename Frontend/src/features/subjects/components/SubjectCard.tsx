import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getSubjectTotals } from '../data';
import type { Subject } from '../types';

export interface SubjectCardProps {
  subject: Subject;
  className?: string;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, className }) => {
  const { chaptersTotal, lessonsTotal, progress } = getSubjectTotals(subject);
  const { name, icon: Icon, color, id } = subject;

  return (
    <Card isHoverable className={cn('group flex h-full flex-col overflow-hidden p-0', className)}>
      <div
        className="relative flex h-28 items-center justify-between overflow-hidden px-6"
        style={{
          background: `linear-gradient(120deg, ${color}26, rgba(2,6,23,0.7) 60%, ${color}1a)`,
        }}
      >
        <div
          className="absolute -right-6 -top-8 h-24 w-24 rounded-full blur-2xl"
          style={{ backgroundColor: `${color}40` }}
          aria-hidden="true"
        />
        <h3 className="relative font-display text-xl font-bold tracking-tight text-slate-50">
          {name}
        </h3>
        <Icon className="relative h-12 w-12 text-white/15" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-display text-2xl font-bold text-slate-100">{progress}%</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            {chaptersTotal} chapters
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            {lessonsTotal} lessons
          </span>
        </div>

        <Link
          to={`/app/subjects/${id}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-auto w-full')}
        >
          Continue
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Card>
  );
};
