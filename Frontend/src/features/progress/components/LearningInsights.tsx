import React from 'react';
import { Lightbulb } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { InsightCard } from './InsightCard';
import type { Insight } from '../types';

export interface LearningInsightsProps {
  insights: Insight[];
  className?: string;
}

export const LearningInsights: React.FC<LearningInsightsProps> = ({ insights, className }) => {
  if (insights.length === 0) {
    return (
      <EmptyState
        icon={<Lightbulb className="h-8 w-8" />}
        title="No insights yet"
        description="Complete a few lessons and assessments to unlock personalized learning insights."
      />
    );
  }

  return (
    <div className={cn('grid gap-3 sm:grid-cols-2', className)}>
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  );
};
