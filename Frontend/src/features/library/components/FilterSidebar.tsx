import React from 'react';
import { Check, RotateCcw, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CATEGORIES, SUBJECTS } from '../data';
import { cn } from '@/lib/utils';
import type { LibraryFilters, SortOption } from '../filters';
import type { ResourceDifficulty } from '../types';

export interface FilterSidebarProps {
  filters: LibraryFilters;
  chapters: string[];
  onChange: (patch: Partial<LibraryFilters>) => void;
  onReset: () => void;
  className?: string;
}

interface CheckRowProps {
  id: string;
  label: string;
  checked: boolean;
  accent?: string;
  onToggle: () => void;
}

const CheckRow: React.FC<CheckRowProps> = ({ id, label, checked, accent, onToggle }) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-slate-800/60',
        checked && 'bg-slate-800/80'
      )}
    >
      <span
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded border transition-colors',
          checked ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-slate-600 bg-slate-900'
        )}
      >
        {checked && <Check className="h-3 w-3" />}
      </span>
      <span className="flex items-center gap-2 text-slate-300">
        {accent && (
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
        )}
        {label}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="sr-only"
      />
    </label>
  );
};

const DIFFICULTIES: ResourceDifficulty[] = ['easy', 'medium', 'hard'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  chapters,
  onChange,
  onReset,
  className,
}) => {
  const activeCount =
    filters.subjects.length +
    filters.categories.length +
    filters.difficulties.length +
    (filters.chapter ? 1 : 0) +
    (filters.onlyBookmarked ? 1 : 0) +
    (filters.onlyDownloaded ? 1 : 0) +
    (filters.onlyRecentlyAdded ? 1 : 0);

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  return (
    <Card className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-slate-300">
          <SlidersHorizontal className="h-4 w-4 text-indigo-400" />
          Filters
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
        >
          <RotateCcw className="h-3 w-3" />
          Reset{activeCount > 0 && <span className="text-indigo-400">({activeCount})</span>}
        </button>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="library-sort"
          className="text-xs font-semibold uppercase tracking-wider text-slate-400"
        >
          Sort by
        </label>
        <select
          id="library-sort"
          value={filters.sort}
          onChange={(event) => onChange({ sort: event.target.value as SortOption })}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="recent">Recently added</option>
          <option value="views">Most viewed</option>
          <option value="rating">Highest rated</option>
          <option value="minutes">Shortest reading time</option>
        </select>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Subject
        </legend>
        <div className="space-y-0.5">
          {SUBJECTS.map((subject) => (
            <CheckRow
              key={subject.id}
              id={`subject-${subject.id}`}
              label={subject.name}
              accent={subject.color}
              checked={filters.subjects.includes(subject.id)}
              onToggle={() =>
                onChange({ subjects: toggle(filters.subjects, subject.id) })
              }
            />
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label
          htmlFor="library-chapter"
          className="text-xs font-semibold uppercase tracking-wider text-slate-400"
        >
          Chapter
        </label>
        <select
          id="library-chapter"
          value={filters.chapter}
          onChange={(event) => onChange({ chapter: event.target.value })}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="">All chapters</option>
          {chapters.map((chapter) => (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Category
        </legend>
        <div className="grid grid-cols-2 gap-0.5">
          {CATEGORIES.map((category) => (
            <CheckRow
              key={category.id}
              id={`category-${category.id}`}
              label={category.label}
              accent={category.color}
              checked={filters.categories.includes(category.id)}
              onToggle={() =>
                onChange({ categories: toggle(filters.categories, category.id) })
              }
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Difficulty
        </legend>
        <div className="flex gap-2">
          {DIFFICULTIES.map((difficulty) => {
            const active = filters.difficulties.includes(difficulty);
            return (
              <button
                key={difficulty}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ difficulties: toggle(filters.difficulties, difficulty) })}
                className={cn(
                  'flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                  active
                    ? 'border-indigo-500/40 bg-indigo-600/20 text-indigo-300'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                )}
              >
                {difficulty}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Quick filters
        </legend>
        <div className="space-y-0.5">
          <CheckRow
            id="filter-bookmarked"
            label="Bookmarked"
            accent="#6366f1"
            checked={filters.onlyBookmarked}
            onToggle={() => onChange({ onlyBookmarked: !filters.onlyBookmarked })}
          />
          <CheckRow
            id="filter-downloaded"
            label="Downloaded"
            accent="#10b981"
            checked={filters.onlyDownloaded}
            onToggle={() => onChange({ onlyDownloaded: !filters.onlyDownloaded })}
          />
          <CheckRow
            id="filter-recent"
            label="Recently added"
            accent="#f59e0b"
            checked={filters.onlyRecentlyAdded}
            onToggle={() => onChange({ onlyRecentlyAdded: !filters.onlyRecentlyAdded })}
          />
        </div>
      </fieldset>

      <p className="flex items-start gap-2 border-t border-slate-800 pt-4 text-xs leading-relaxed text-slate-500">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
        Filters apply instantly. Tip: bookmark resources to build your saved collection.
      </p>
    </Card>
  );
};
