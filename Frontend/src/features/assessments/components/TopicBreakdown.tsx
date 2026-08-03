import React from 'react';
import { PieChart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';
import { EmptyAssessmentState } from './EmptyAssessmentState';
import type { TopicBreakdownItem } from '../types';

export interface TopicBreakdownProps {
  items: TopicBreakdownItem[];
  className?: string;
}

export const TopicBreakdown: React.FC<TopicBreakdownProps> = ({ items, className }) => {
  if (items.length === 0) {
    return (
      <EmptyAssessmentState
        variant="none"
        title="No topic data"
        description="There aren’t enough answers yet to break down by topic."
        className="my-0"
      />
    );
  }

  return (
    <Card className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <PieChart className="h-4 w-4 text-indigo-400" />
        <h3 className="font-display text-base font-bold tracking-tight text-slate-100">
          Topic breakdown
        </h3>
      </div>

      <ul className="space-y-4">
        {items.map((item) => {
          const percent = item.total === 0 ? 0 : Math.round((item.correct / item.total) * 100);
          return (
            <li key={item.topic} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200">{item.topic}</span>
                <span className="text-xs tabular-nums text-slate-500">
                  {item.correct}/{item.total} correct · {percent}%
                </span>
              </div>
              <ProgressBar
                value={percent}
                variant={percent >= 80 ? 'emerald' : percent >= 50 ? 'sky' : 'coral'}
                size="sm"
              />
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
