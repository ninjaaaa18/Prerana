import React from 'react';
import { BookOpen, Clock, FileText, Search, SearchX, Tag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SearchSuggestion } from '../types';

export interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (query: string) => void;
  suggestions: SearchSuggestion[];
  recentSearches: string[];
  popularSearches: string[];
  onSelectSuggestion: (suggestion: SearchSuggestion) => void;
  className?: string;
}

const suggestionIcon = (type: SearchSuggestion['type']) => {
  if (type === 'subject') return <BookOpen className="h-3.5 w-3.5 text-indigo-400" />;
  if (type === 'category') return <Tag className="h-3.5 w-3.5 text-sky-400" />;
  return <FileText className="h-3.5 w-3.5 text-slate-500" />;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSubmit,
  suggestions,
  recentSearches,
  popularSearches,
  onSelectSuggestion,
  className,
}) => {
  const [focused, setFocused] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const blurTimer = React.useRef<number | null>(null);
  const trimmed = query.trim();

  const panelOpen = focused;
  const listItems = trimmed
    ? suggestions
    : recentSearches.map((label, index) => ({ id: `recent-${index}`, label, type: 'recent' as const }));

  React.useEffect(() => {
    setActiveIndex(-1);
  }, [query, panelOpen]);

  React.useEffect(() => {
    return () => {
      if (blurTimer.current) window.clearTimeout(blurTimer.current);
    };
  }, []);

  const openPanel = () => {
    if (blurTimer.current) window.clearTimeout(blurTimer.current);
    setFocused(true);
  };

  const closePanel = () => {
    blurTimer.current = window.setTimeout(() => setFocused(false), 120);
  };

  const runSearch = (value: string) => {
    onSubmit(value);
    setFocused(false);
    inputRef.current?.blur();
  };

  const selectItem = (index: number) => {
    if (trimmed) {
      const suggestion = suggestions[index];
      if (suggestion) onSelectSuggestion(suggestion);
    } else {
      const recent = recentSearches[index];
      if (recent) runSearch(recent);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setFocused(false);
      inputRef.current?.blur();
      return;
    }
    if (!panelOpen || listItems.length === 0) {
      if (event.key === 'Enter') runSearch(query);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % listItems.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + listItems.length) % listItems.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeIndex >= 0) {
        selectItem(activeIndex);
      } else {
        runSearch(query);
      }
    }
  };

  const clearQuery = () => onQueryChange('');

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      <div
        className={cn(
          'flex items-center gap-2 rounded-2xl border bg-slate-900/80 px-4 transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20',
          panelOpen ? 'border-indigo-500/60' : 'border-slate-800'
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-slate-500" />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={panelOpen}
          aria-controls="library-search-listbox"
          aria-autocomplete="list"
          aria-label="Search the library"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onFocus={openPanel}
          onBlur={closePanel}
          onKeyDown={handleKeyDown}
          placeholder="Search resources, subjects, chapters…"
          className="h-12 w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Clear search"
            className="rounded-md p-1 text-slate-500 transition-colors hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {panelOpen && (
        <div
          id="library-search-listbox"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          {trimmed ? (
            suggestions.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto py-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion.id}
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onSelectSuggestion(suggestion)}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-slate-300 transition-colors',
                      index === activeIndex && 'bg-slate-800/80 text-slate-100'
                    )}
                  >
                    {suggestionIcon(suggestion.type)}
                    <span className="truncate">{suggestion.label}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-3 px-4 py-5 text-sm text-slate-500">
                <SearchX className="h-4 w-4" />
                No matches for “{query}”. Press Enter to search anyway.
              </div>
            )
          ) : (
            <div className="space-y-4 px-4 py-4">
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Recent searches
                  </p>
                  <ul className="space-y-1">
                    {recentSearches.map((recent, index) => (
                      <li key={`recent-${index}`}>
                        <button
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => runSearch(recent)}
                          className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm text-slate-300 transition-colors hover:bg-slate-800/70 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                          <Clock className="h-3.5 w-3.5 text-slate-500" />
                          <span className="truncate">{recent}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {popularSearches.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Popular searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((popular) => (
                      <button
                        key={popular}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runSearch(popular)}
                        className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-indigo-500/40 hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        {popular}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
