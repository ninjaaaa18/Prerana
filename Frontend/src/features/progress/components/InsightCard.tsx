import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Insight, InsightTone } from '../types';

export interface InsightCardProps {
  insight: Insight;
  className?: string;
}

const toneStyles: Record<InsightTone, { border: string; background: string; icon: string }> = {
  positive: {
    border: 'border-emerald-500/20',
    background: 'bg-gradient-to-br from-emerald-500/10 to-transparent',
    icon: 'border-emerald-500/20 bg-emerald-600/10 text-emerald-400',
  },
  warning: {
    border: 'border-amber-500/20',
    background: 'bg-gradient-to-br from-amber-500/10 to-transparent',
    icon: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
  },
  info: {
    border: 'border-sky-500/20',
    background: 'bg-gradient-to-br from-sky-500/10 to-transparent',
    icon: 'border-sky-500/20 bg-sky-600/10 text-sky-400',
  },
  ai: {
    border: 'border-violet-500/20',
    background: 'bg-gradient-to-br from-violet-500/10 to-transparent',
    icon: 'border-violet-500/20 bg-violet-600/10 text-violet-400',
  },
};

export const InsightCard: React.FC<InsightCardProps> = ({ insight, className }) => {
  const { icon: Icon } = insight;
  const styles = toneStyles[insight.tone];

  return (
    <Card isHoverable className={cn('space-y-3', styles.background, styles.border, className)}>
      <div className="flex items-start gap-3">
        <span className={cn('inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border', styles.icon)}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 space-y-1 pt-0.5">
          <h3 className="text-sm font-bold leading-snug text-slate-100">{insight.title}</h3>
          <p className="text-xs leading-relaxed text-slate-400">{insight.description}</p>
        </div>
      </div>
    </Card>
  );
};
