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
    <ol className={cn('relative space-y-2', className)}>
      <div className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-violet-500/30 via-slate-700 to-slate-700" aria-hidden="true" />
      {activities.map((item) => {
        const { icon: Icon, className: iconClassName } = TYPE_STYLES[item.type];
        return (
          <li key={item.id} className="relative flex items-start gap-3 py-2">
            <span
              className={cn(
                'relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border',
                iconClassName
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 space-y-1.5 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" size="sm">
                  {ACTIVITY_TYPE_LABELS[item.type]}
                </Badge>
                <span className="text-[11px] font-medium text-slate-500">{item.childName}</span>
              </div>
              <p className="text-sm font-semibold text-slate-100">{item.title}</p>
              <p className="text-xs text-slate-400">{item.description}</p>
              <time className="block text-[11px] uppercase tracking-[0.18em] text-slate-600">
                {item.time}
              </time>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
