import React from 'react';
import { Activity, BookOpen, Bot, Target, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import type { ActivityItem, ActivityType } from '../types';

const typeStyles: Record<ActivityType, { icon: LucideIcon; className: string }> = {
  chapter: { icon: BookOpen, className: 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400' },
  ai: { icon: Bot, className: 'border-violet-500/20 bg-violet-600/10 text-violet-400' },
  quiz: { icon: Target, className: 'border-sky-500/20 bg-sky-600/10 text-sky-400' },
  achievement: { icon: Trophy, className: 'border-amber-500/20 bg-amber-500/10 text-amber-400' },
};

export interface ActivityTimelineProps {
  activities: ActivityItem[];
  className?: string;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities, className }) => {
  if (activities.length === 0) {
    return (
      <EmptyState
        icon={<Activity className="h-8 w-8" />}
        title="No recent activity"
        description="Your recent learning activity will show up here."
      />
    );
  }

  return (
    <ol className={cn('relative', className)}>
      <div className="absolute bottom-2 left-[19px] top-2 w-px bg-slate-800" aria-hidden="true" />
      {activities.map((item) => {
        const { icon: Icon, className: iconClassName } = typeStyles[item.type];
        return (
          <li key={item.id} className="relative flex items-start gap-4 py-1">
            <span
              className={cn(
                'relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border',
                iconClassName
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1 space-y-0.5 pt-1.5">
              <p className="text-sm font-semibold text-slate-100">{item.title}</p>
              <p className="text-xs text-slate-400">{item.description}</p>
              <time className="block text-[11px] text-slate-600">{item.time}</time>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
