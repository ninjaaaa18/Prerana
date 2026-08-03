import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MatchPair } from '../types';

export interface MatchQuestionProps {
  pairs: MatchPair[];
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  className?: string;
}

export const MatchQuestion: React.FC<MatchQuestionProps> = ({ pairs, value, onChange, className }) => {
  const rightOptions = pairs.map((pair) => pair.right);

  const handleChange = (pairId: string, right: string) => {
    onChange({ ...value, [pairId]: right });
  };

  return (
    <div className={cn('space-y-3', className)}>
      {pairs.map((pair) => {
        const selectId = `match-${pair.id}`;
        return (
          <div
            key={pair.id}
            className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-3 sm:flex-row sm:items-center sm:gap-3"
          >
            <label
              htmlFor={selectId}
              className="flex-1 text-sm font-medium text-slate-200"
            >
              {pair.left}
            </label>
            <ArrowRight className="hidden h-4 w-4 shrink-0 text-slate-600 sm:block" aria-hidden="true" />
            <div className="relative flex-1">
              <select
                id={selectId}
                value={value[pair.id] ?? ''}
                onChange={(event) => handleChange(pair.id, event.target.value)}
                className={cn(
                  'w-full appearance-none rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 pr-10 text-sm text-slate-100 transition-colors focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
                  !value[pair.id] && 'text-slate-500'
                )}
              >
                <option value="" disabled>
                  Select match…
                </option>
                {rightOptions.map((right) => (
                  <option key={right} value={right} className="text-slate-100">
                    {right}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                ▾
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
