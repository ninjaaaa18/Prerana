import React from 'react';
import { cn } from '@/lib/utils';

export interface QuestionNavigatorProps {
  count: number;
  current: number;
  answered: Record<string, boolean>;
  onSelect: (index: number) => void;
  className?: string;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  count,
  current,
  answered,
  onSelect,
  className,
}) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {Array.from({ length: count }, (_, index) => {
        const isCurrent = index === current;
        const isAnswered = answered[index];
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Go to question ${index + 1}`}
            aria-current={isCurrent ? 'step' : undefined}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
              isCurrent
                ? 'border-indigo-400 bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : isAnswered
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-slate-200'
            )}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};
