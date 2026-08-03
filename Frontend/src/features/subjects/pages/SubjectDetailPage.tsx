import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { EmptyState } from '@/components/ui/empty-state';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SubjectHero } from '../components/SubjectHero';
import { SectionTitle } from '../components/SectionTitle';
import { FilterBar } from '../components/FilterBar';
import { ChapterGrid } from '../components/ChapterGrid';
import { SUBJECTS, getChapterProgress, getChapterStatus } from '../data';

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
  const subject = SUBJECTS.find((item) => item.id === subjectId);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({
    difficulty: 'all',
    progress: 'all',
  });

  const chapters = useMemo(() => {
    if (!subject) return [];
    const query = search.trim().toLowerCase();
    return subject.chapters.filter((chapter) => {
      const matchesSearch =
        query.length === 0 || chapter.title.toLowerCase().includes(query);
      const matchesDifficulty =
        filters.difficulty === 'all' || chapter.difficulty === filters.difficulty;

      const progress = getChapterProgress(chapter);
      const progressState = getChapterStatus(chapter);
      const matchesProgress =
        filters.progress === 'all' ||
        (filters.progress === 'in-progress' && progressState === 'in-progress') ||
        (filters.progress === 'completed' && progressState === 'completed') ||
        (filters.progress === 'not-started' && progress === 0);

      return matchesSearch && matchesDifficulty && matchesProgress;
    });
  }, [subject, search, filters]);

  if (!subject) {
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
          subtitle={`${subject.chapters.length} chapters to explore`}
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
