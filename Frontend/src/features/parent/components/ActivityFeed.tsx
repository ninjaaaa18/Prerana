import React from 'react';
import { AlertTriangle, BookOpen, ClipboardCheck, Milestone, PartyPopper } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { ACTIVITY_TYPE_LABELS } from '../utils';
import { cn } from '@/lib/utils';
import type { ParentActivity, ParentActivityType } from '../types';

const TYPE_STYLES: Record<ParentActivityType, { icon: LucideIcon; className: string }> = {
  milestone: {
    icon: Milestone,
    className: 'border-violet-500/20 bg-violet-600/10 text-violet-400',
  },
  assessment: { icon: ClipboardCheck, className: 'border-sky-500/20 bg-sky-600/10 text-sky-400' },
  learning: { icon: BookOpen, className: 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400' },
  concern: { icon: AlertTriangle, className: 'border-rose-500/20 bg-rose-600/10 text-rose-400' },
  achievement: {
    icon: PartyPopper,
    className: 'border-emerald-500/20 bg-emerald-600/10 text-emerald-400',
  },
};

const CHILD_COLORS: Record<string, string> = {
  Aadhya: '#8b5cf6',
  Reyansh: '#38bdf8',
  Kavya: '#ec4899',
};

export interface ActivityFeedProps {
  activities: ParentActivity[];
  className?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, className }) => {
  if (activities.length === 0) {
    return (
      <EmptyState
        title="No activity found"
        description="Try adjusting the filters to see more of your family's learning activity."
      />
    );
  }

  return (
    <ol
      aria-label="Family mission timeline"
      className={cn(
        'relative space-y-1 before:absolute before:bottom-7 before:left-[21px] before:top-7 before:w-px before:bg-gradient-to-b before:from-cyan-300/60 before:via-violet-500/30 before:to-slate-700 before:content-[""]',
        className
      )}
    >
      {activities.map((item) => {
        const { icon: Icon, className: iconClassName } = TYPE_STYLES[item.type];
        const childColor = CHILD_COLORS[item.childName] ?? '#8b5cf6';
        const isImportant = item.type === 'milestone' || item.type === 'concern';
        return (
          <li key={item.id} className={cn('group relative flex items-start gap-3 py-3', isImportant && 'my-1')}>
            <span
              className={cn(
                'relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-slate-950 shadow-[0_0_0_4px_rgba(2,6,23,0.85)] transition-transform duration-300 group-hover:scale-105',
                iconClassName
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className={cn('min-w-0 flex-1 space-y-2 rounded-2xl border border-slate-800/70 bg-slate-900/35 px-4 py-3 transition-colors group-hover:border-slate-700/90', isImportant && 'border-violet-400/20 bg-violet-950/10')}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={item.type === 'concern' ? 'destructive' : item.type === 'milestone' ? 'success' : 'secondary'} size="sm" dot>
                  {ACTIVITY_TYPE_LABELS[item.type]}
                </Badge>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: childColor, boxShadow: `0 0 8px ${childColor}` }} />
                  {item.childName}
                </span>
                <time className="ml-auto text-[10px] uppercase tracking-[0.12em] text-slate-600">{item.time}</time>
              </div>
              <p className="text-sm font-semibold text-slate-100">{item.title}</p>
              <p className="text-xs leading-relaxed text-slate-400">{item.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
