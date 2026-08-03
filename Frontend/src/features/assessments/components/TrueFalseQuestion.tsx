import React from 'react';
import { cn } from '@/lib/utils';

export interface TrueFalseQuestionProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
  className?: string;
}

export const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  value,
  onChange,
  className,
}) => {
  const options: { id: boolean; label: string }[] = [
    { id: true, label: 'True' },
    { id: false, label: 'False' },
  ];

  return (
    <div role="radiogroup" aria-label="Choose True or False" className={cn('grid gap-3 sm:grid-cols-2', className)}>
      {options.map((option) => {
        const isSelected = value === option.id;
        return (
          <button
            key={String(option.id)}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.id)}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
              isSelected
                ? option.id
                  ? 'border-emerald-500/60 bg-emerald-600/15 text-emerald-200'
                  : 'border-rose-500/60 bg-rose-600/15 text-rose-200'
                : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70'
            )}
          >
            <span
              className={cn(
                'h-2.5 w-2.5 rounded-full',
                isSelected
                  ? option.id
                    ? 'bg-emerald-400'
                    : 'bg-rose-400'
                  : 'bg-slate-600'
              )}
            />
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
