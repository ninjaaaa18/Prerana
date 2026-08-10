import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { CATEGORY_LABELS, subjectMeta } from '../data';
import { cn } from '@/lib/utils';
import type { Resource } from '../types';
import type { ReadingProgress as ReadingProgressData } from '../types';

export type ContinueReadingItem = Resource & ReadingProgressData;

export interface ContinueReadingCardProps {
  item: ContinueReadingItem;
  className?: string;
}

export const ContinueReadingCard: React.FC<ContinueReadingCardProps> = ({ item, className }) => {
  const meta = subjectMeta(item.subjectId);

  return (
    <Card isHoverable className={cn('w-72 shrink-0 snap-start space-y-3 sm:w-80', className)}>
      <Link
        to={`/app/library/${item.id}`}
        className="block rounded-xl border border-slate-700/60"
        style={{
          backgroundImage: `linear-gradient(135deg, ${meta.color}35, ${meta.color}10)`,
        }}
        aria-label={`Continue reading ${item.title}`}
      >
        <div className="flex aspect-[16/8] items-center justify-between gap-3 p-4">
          <div className="min-w-0 space-y-1">
            <p className="truncate font-display text-sm font-bold text-slate-100">{item.title}</p>
            <p className="text-xs text-slate-400">
              {item.subject} · {CATEGORY_LABELS[item.category]}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-slate-500" />
        </div>
      </Link>

      <div className="space-y-2 px-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">{item.percentage}% complete</span>
          <span className="text-slate-500">{item.remainingMinutes} min left</span>
        </div>
        <ProgressBar value={item.percentage} variant="primary" size="sm" />
        <p className="text-[11px] text-slate-600">Last opened · {item.lastOpened}</p>
      </div>
    </Card>
  );
};
