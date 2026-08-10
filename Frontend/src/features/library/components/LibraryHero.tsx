import React from 'react';
import { Bookmark, Library } from 'lucide-react';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { cn } from '@/lib/utils';
import { SearchBar } from './SearchBar';
import type { SearchSuggestion } from '../types';

export interface LibraryHeroProps {
  resourceCount: number;
  categoryCount: number;
  bookmarkedCount: number;
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (query: string) => void;
  suggestions: SearchSuggestion[];
  recentSearches: string[];
  popularSearches: string[];
  onSelectSuggestion: (suggestion: SearchSuggestion) => void;
  className?: string;
}

export const LibraryHero: React.FC<LibraryHeroProps> = ({
  resourceCount,
  categoryCount,
  bookmarkedCount,
  query,
  onQueryChange,
  onSubmit,
  suggestions,
  recentSearches,
  popularSearches,
  onSelectSuggestion,
  className,
}) => {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15',
        className
      )}
      aria-label="Learning library"
    >
      <GalaxyGlow color="indigo" x="6%" y="-40%" size={400} opacity={0.22} />
      <GalaxyGlow color="violet" x="94%" y="115%" size={340} opacity={0.15} />

      <div className="relative flex flex-col gap-8 px-6 py-10 sm:px-8 sm:py-12">
        <div className="max-w-2xl space-y-3">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
            <Library className="h-4 w-4" />
            Your library
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            Explore learning resources
          </h1>
          <p className="text-sm leading-relaxed text-slate-400">
            {resourceCount} resources across {categoryCount} categories — notes, videos, mind maps,
            formula sheets and more, curated for every subject.
          </p>
        </div>

        <SearchBar
          query={query}
          onQueryChange={onQueryChange}
          onSubmit={onSubmit}
          suggestions={suggestions}
          recentSearches={recentSearches}
          popularSearches={popularSearches}
          onSelectSuggestion={onSelectSuggestion}
        />

        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            {resourceCount} resources
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {categoryCount} categories
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bookmark className="h-3 w-3" />
            {bookmarkedCount} saved
          </span>
        </div>
      </div>
    </section>
  );
};
