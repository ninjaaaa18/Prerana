import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ClipboardCheck, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ContentStatusBadge } from './ContentStatusBadge';
import type { DraftContent } from '../types';

const KIND_META: Record<DraftContent['kind'], { label: string; icon: LucideIcon; to: (id: string) => string }> = {
  lesson: { label: 'Lesson', icon: BookOpen, to: (id) => `/app/teach/lessons/${id}/edit` },
  assessment: { label: 'Assessment', icon: ClipboardCheck, to: (id) => `/app/teach/assessments/${id}` },
  chapter: { label: 'Chapter', icon: Layers, to: () => '/app/teach/subjects' },
};

export interface DraftCardProps {
  draft: DraftContent;
  className?: string;
}

export const DraftCard: React.FC<DraftCardProps> = ({ draft, className }) => {
  const { label, icon: Icon, to } = KIND_META[draft.kind];

  return (
    <Card isHoverable className={className}>
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-indigo-400">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <ContentStatusBadge status={draft.status} size="sm" />
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-display text-sm font-bold leading-snug text-slate-100">{draft.title}</h3>
        <p className="text-xs text-slate-400">
          {label} · {draft.subject}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
        <span className="text-[11px] text-slate-500">Edited {draft.lastEdited}</span>
        <Link
          to={to(draft.id)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
        >
          Continue Editing
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
};
