import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChoiceOption } from '../types';

export interface MCQQuestionProps {
  options: ChoiceOption[];
  value: string | null;
  onChange: (optionId: string) => void;
  className?: string;
}

export const MCQQuestion: React.FC<MCQQuestionProps> = ({ options, value, onChange, className }) => {
  return (
    <div role="radiogroup" aria-label="Choose one answer" className={cn('space-y-2.5', className)}>
      {options.map((option) => {
        const isSelected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
              isSelected
                ? 'border-indigo-500/60 bg-indigo-600/15 text-slate-50'
                : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70'
            )}
          >
            <span
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]',
                isSelected
                  ? 'border-indigo-400 bg-indigo-500 text-white'
                  : 'border-slate-600 text-transparent'
              )}
            >
              {isSelected && <Check className="h-3 w-3" />}
            </span>
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
