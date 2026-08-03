import React, { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { EmptyState } from '@/components/ui/empty-state';
import { FilterBar } from '../components/FilterBar';
import { SubjectGrid } from '../components/SubjectGrid';
import { SUBJECTS, getSubjectTotals } from '../data';

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
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({
    difficulty: 'all',
    progress: 'all',
    category: 'all',
  });

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return SUBJECTS.filter((subject) => {
      const matchesSearch =
        query.length === 0 || subject.name.toLowerCase().includes(query);
      const matchesDifficulty =
        filters.difficulty === 'all' || subject.difficulty === filters.difficulty;
      const matchesCategory =
        filters.category === 'all' || subject.category === filters.category;

      const progress = getSubjectTotals(subject).progress;
      const progressState = progress >= 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';
      const matchesProgress = filters.progress === 'all' || progressState === filters.progress;

      return matchesSearch && matchesDifficulty && matchesCategory && matchesProgress;
    });
  }, [search, filters]);

  return (
    <div className="space-y-8">
      <Reveal y={16}>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
            Subjects
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
            Explore subjects like worlds — each one packed with chapters and lessons waiting for
            you.
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
        <EmptyState
          icon={<SearchX className="h-8 w-8" />}
          title="No subjects found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <SubjectGrid subjects={filtered} />
      )}
    </div>
  );
};
