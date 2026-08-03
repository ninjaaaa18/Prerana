import React from 'react';
import { BookOpen, Bot, Target, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TimelineEvent, TimelineEventType } from '../types';

const EVENT_ICONS: Record<TimelineEventType, LucideIcon> = {
  lesson: BookOpen,
  ai: Bot,
  assessment: Target,
  achievement: Trophy,
};

const EVENT_STYLES: Record<TimelineEventType, string> = {
  lesson: 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400',
  ai: 'border-violet-500/20 bg-violet-600/10 text-violet-400',
  assessment: 'border-sky-500/20 bg-sky-600/10 text-sky-400',
  achievement: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
};

export interface TimelineItemProps {
  event: TimelineEvent;
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, className }) => {
  const { title, description, date, time } = event;
  const Icon = EVENT_ICONS[event.type];
  const styles = EVENT_STYLES[event.type];

  return (
    <li className={cn('relative flex items-start gap-4 py-1', className)}>
      <span
        className={cn(
          'relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border',
          styles
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 space-y-0.5 pt-1.5">
        <p className="text-sm font-semibold text-slate-100">{title}</p>
        <p className="text-xs text-slate-400">{description}</p>
        <p className="flex items-center gap-1.5 text-[11px] text-slate-600">
          <time>{date}</time>
          {time && (
            <>
              <span aria-hidden="true">·</span>
              <span>{time}</span>
            </>
          )}
        </p>
      </div>
    </li>
  );
};
