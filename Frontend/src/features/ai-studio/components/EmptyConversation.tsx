import React from 'react';
import { Sparkles } from 'lucide-react';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { cn } from '@/lib/utils';
import type { PromptSuggestion } from '../types';

export interface EmptyConversationProps {
  suggestions: PromptSuggestion[];
  onPickSuggestion: (prompt: string) => void;
  className?: string;
}

export const EmptyConversation: React.FC<EmptyConversationProps> = ({
  suggestions,
  onPickSuggestion,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 px-6 py-12 text-center',
        className
      )}
    >
      <GalaxyGlow color="indigo" x="50%" y="0%" size={300} opacity={0.15} />

      <div className="relative">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-600/15 text-indigo-300">
          <Sparkles className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-slate-100">Start a conversation</h3>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-400">
          Ask Prerana AI a question, pick a suggestion below, or describe the study tool you want.
        </p>
      </div>

      {suggestions.length > 0 && (
        <div className="relative flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => onPickSuggestion(suggestion.prompt)}
              className="rounded-full border border-slate-700 bg-slate-900/70 px-3.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-indigo-500/40 hover:text-slate-100"
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
