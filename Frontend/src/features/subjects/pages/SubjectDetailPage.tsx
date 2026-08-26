import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SubjectHero } from '../components/SubjectHero';
import { SectionTitle } from '../components/SectionTitle';
import { FilterBar } from '../components/FilterBar';
import { ChapterGrid } from '../components/ChapterGrid';
import { useSubject, useSubjectChapters } from '../hooks/use-content';
import { adaptApiSubject, adaptApiChapter } from '../adapters';

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

export const SubjectDetailPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { data: apiSubject, isLoading: subjectLoading, error: subjectError } = useSubject(subjectId ?? '');
  const { data: apiChapters, isLoading: chaptersLoading } = useSubjectChapters(subjectId ?? '');

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({
    difficulty: 'all',
    progress: 'all',
  });

  const subject = useMemo(
    () => (apiSubject ? adaptApiSubject(apiSubject, apiChapters) : undefined),
    [apiSubject, apiChapters]
  );

  const chapters = useMemo(() => {
    if (!apiChapters) return [];
    const adapted = apiChapters.map(adaptApiChapter);
    const query = search.trim().toLowerCase();
    return adapted.filter((chapter) => {
      const matchesSearch =
        query.length === 0 || chapter.title.toLowerCase().includes(query);
      const matchesDifficulty =
        filters.difficulty === 'all' || chapter.difficulty === filters.difficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [apiChapters, search, filters]);

  const isLoading = subjectLoading || chaptersLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-48 rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (subjectError || !subject) {
    return (
      <EmptyState
        icon={<SearchX className="h-8 w-8" />}
        title="Subject not found"
        description="The subject you're looking for doesn't exist."
        actionText="Browse subjects"
      />
    );
  }

  return (
    <div className="space-y-8">
      <Reveal y={16}>
        <SubjectHero subject={subject} />
      </Reveal>

      <div className="space-y-4">
        <SectionTitle
          title="Chapters"
          subtitle={`${chapters.length} chapters to explore`}
          action={
            <Link
              to="/app/subjects"
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All subjects
            </Link>
          }
        />

        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search chapters..."
          selects={[
            { key: 'difficulty', label: 'Filter by difficulty', options: DIFFICULTY_OPTIONS, value: filters.difficulty },
            { key: 'progress', label: 'Filter by progress', options: PROGRESS_OPTIONS, value: filters.progress },
          ]}
          onSelectChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
        />

        {chapters.length === 0 ? (
          <EmptyState
            icon={<SearchX className="h-8 w-8" />}
            title="No chapters found"
            description="Try adjusting your search or filters to find a chapter."
          />
        ) : (
          <ChapterGrid subjectId={subject.id} chapters={chapters} />
        )}
      </div>
    </div>
  );
};
