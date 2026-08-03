import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PromptSuggestion } from '../types';

export interface PromptSuggestionsProps {
  suggestions: PromptSuggestion[];
  className?: string;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ suggestions, className }) => {
  if (suggestions.length === 0) {
    return (
      <p className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-500">
        <MessageCircle className="h-4 w-4" />
        No suggestions right now — type your own prompt below.
      </p>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-2.5', className)}>
      {suggestions.map((suggestion) => (
        <Link
          key={suggestion.id}
          to={`/app/ai-studio/chat/new?prompt=${encodeURIComponent(suggestion.prompt)}`}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-indigo-500/40 hover:bg-slate-800 hover:text-slate-100"
        >
          <MessageCircle className="h-3.5 w-3.5 text-indigo-400" />
          {suggestion.label}
        </Link>
      ))}
    </div>
  );
};
