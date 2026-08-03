import React from 'react';
import { History } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { TimelineItem } from './TimelineItem';
import type { TimelineEvent } from '../types';

export interface LearningTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const LearningTimeline: React.FC<LearningTimelineProps> = ({ events, className }) => {
  if (events.length === 0) {
    return (
      <EmptyState
        icon={<History className="h-8 w-8" />}
        title="No learning history yet"
        description="Your completed lessons, assessments and AI sessions will appear here over time."
      />
    );
  }

  return (
    <ol className={cn('relative', className)}>
      <div
        className="absolute bottom-4 left-[19px] top-4 w-px bg-slate-800"
        aria-hidden="true"
      />
      {events.map((event) => (
        <TimelineItem key={event.id} event={event} />
      ))}
    </ol>
  );
};
