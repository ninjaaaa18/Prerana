import React from 'react';
import { BookOpen, ClipboardCheck, FileEdit, Target, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import type { TeacherActivity as TeacherActivityItem, TeacherActivityType } from '../types';

const TYPE_STYLES: Record<TeacherActivityType, { icon: LucideIcon; className: string }> = {
  'lesson-created': { icon: BookOpen, className: 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400' },
  'assessment-published': { icon: ClipboardCheck, className: 'border-sky-500/20 bg-sky-600/10 text-sky-400' },
  'student-completed': { icon: Target, className: 'border-emerald-500/20 bg-emerald-600/10 text-emerald-400' },
  'draft-updated': { icon: FileEdit, className: 'border-amber-500/20 bg-amber-500/10 text-amber-400' },
  'class-updated': { icon: Users, className: 'border-violet-500/20 bg-violet-600/10 text-violet-400' },
};

export interface TeacherActivityProps {
  activities: TeacherActivityItem[];
  className?: string;
}

export const TeacherActivity: React.FC<TeacherActivityProps> = ({ activities, className }) => {
  if (activities.length === 0) {
    return (
      <EmptyState
        title="No recent activity"
        description="Teacher workspace activity will appear here."
      />
    );
  }

  return (
    <ol className={cn('relative', className)}>
      <div className="absolute bottom-2 left-[19px] top-2 w-px bg-slate-800" aria-hidden="true" />
      {activities.map((item) => {
        const { icon: Icon, className: iconClassName } = TYPE_STYLES[item.type];
        return (
          <li key={item.id} className="relative flex items-start gap-4 py-1">
            <span
              className={cn(
                'relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border',
                iconClassName
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
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
