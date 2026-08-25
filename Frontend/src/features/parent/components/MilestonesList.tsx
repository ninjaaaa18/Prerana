import React from 'react';
import { Flame, TrendingUp, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import type { Milestone, MilestoneTone } from '../types';

const TONE_STYLES: Record<MilestoneTone, { icon: LucideIcon; className: string }> = {
  achievement: { icon: Trophy, className: 'border-amber-500/20 bg-amber-500/10 text-amber-400' },
  progress: { icon: TrendingUp, className: 'border-sky-500/20 bg-sky-600/10 text-sky-400' },
  habit: { icon: Flame, className: 'border-violet-500/20 bg-violet-600/10 text-violet-400' },
};

export interface MilestonesListProps {
  milestones: Milestone[];
  className?: string;
}

export const MilestonesList: React.FC<MilestonesListProps> = ({ milestones, className }) => {
  if (milestones.length === 0) {
    return (
      <EmptyState
        title="No milestones yet"
        description="When your children reach milestones, they will appear here."
      />
    );
  }

  return (
    <ol className={cn('relative space-y-3', className)}>
      <div className="absolute bottom-2 left-[19px] top-2 w-px bg-slate-800/80" aria-hidden="true" />
      {milestones.map((milestone) => {
        const { icon: Icon, className: iconClassName } = TONE_STYLES[milestone.tone];
        return (
          <li key={milestone.id} className="relative flex items-start gap-4 py-1">
            <span
              className={cn(
                'relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border',
                iconClassName
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-slate-800/80 bg-slate-950/40 px-3 py-2.5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-100">{milestone.title}</p>
                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  {milestone.date}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{milestone.description}</p>
              <p className="mt-2 text-[11px] font-medium text-slate-500">{milestone.childName}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
