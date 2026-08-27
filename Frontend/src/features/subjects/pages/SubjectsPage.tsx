import React, { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { FilterBar } from '../components/FilterBar';
import { SubjectGrid } from '../components/SubjectGrid';
import { useSubjects } from '../hooks/use-content';
import { adaptApiSubject } from '../adapters';

const DIFFICULTY_OPTIONS = [
  { value: 'all', label: 'All levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const PROGRESS_OPTIONS = [
  { value: 'all', label: 'All progress' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'not-started', label: 'Not started' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All categories' },
  { value: 'stem', label: 'STEM' },
  { value: 'languages', label: 'Languages' },
  { value: 'humanities', label: 'Humanities' },
  { value: 'creative', label: 'Creative' },
];

export const SubjectsPage: React.FC = () => {
  const { data: apiSubjects, isLoading, error } = useSubjects();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({
    difficulty: 'all',
    progress: 'all',
    category: 'all',
  });

  const subjects = useMemo(
    () => (apiSubjects ?? []).map((s) => adaptApiSubject(s)),
    [apiSubjects]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return subjects.filter((subject) => {
      const matchesSearch =
        query.length === 0 || subject.name.toLowerCase().includes(query);
      const matchesDifficulty =
        filters.difficulty === 'all' || subject.difficulty === filters.difficulty;
      const matchesCategory =
        filters.category === 'all' || subject.category === filters.category;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [subjects, search, filters]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Reveal y={16}>
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<AlertCircle className="h-8 w-8" />}
        title="Failed to load subjects"
        description="Something went wrong while fetching subjects. Please try again."
      />
    );
  }

  return (
    <div className="space-y-8">
      <Reveal y={16}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
              Subjects
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
              Explore subjects like worlds — each one packed with chapters and lessons waiting for
              you.
            </p>
          </div>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-300">
            {subjects.length} subject{subjects.length === 1 ? '' : 's'}
          </p>
        </div>
      </Reveal>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search subjects..."
        selects={[
          { key: 'difficulty', label: 'Filter by difficulty', options: DIFFICULTY_OPTIONS, value: filters.difficulty },
          { key: 'progress', label: 'Filter by progress', options: PROGRESS_OPTIONS, value: filters.progress },
          { key: 'category', label: 'Filter by category', options: CATEGORY_OPTIONS, value: filters.category },
        ]}
        onSelectChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
      />

      {filtered.length === 0 ? (
        subjects.length === 0 ? (
          <EmptyState
            icon={<SearchX className="h-8 w-8" />}
            title="No subjects yet"
            description="New subjects will appear here when they become available to explore."
          />
        ) : (
          <EmptyState
            icon={<SearchX className="h-8 w-8" />}
            title="No subjects found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        )
      ) : (
        <SubjectGrid subjects={filtered} />
      )}
    </div>
  );
};
