import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, SearchX } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SubjectBanner } from '../components/SubjectBanner';
import { LessonGrid } from '../components/LessonGrid';
import { SectionTitle } from '../components/SectionTitle';
import { useChapter } from '../hooks/use-content';
import { adaptApiLesson } from '../adapters';

const difficultyVariant = {
  easy: 'success',
  medium: 'warning',
  hard: 'destructive',
} as const;

export const ChapterDetailPage: React.FC = () => {
  const { subjectId, chapterId } = useParams<{ subjectId: string; chapterId: string }>();
  const { data: apiChapter, isLoading, error } = useChapter(chapterId ?? '');

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-48 rounded-3xl" />
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-40 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !apiChapter) {
    return (
      <EmptyState
        icon={<SearchX className="h-8 w-8" />}
        title="Chapter not found"
        description="The chapter you're looking for doesn't exist."
        actionText="Browse subjects"
      />
    );
  }

  const lessons = (apiChapter.lessons ?? []).map(adaptApiLesson);
  const progress = lessons.length > 0 ? 0 : 0;
  const durationMinutes = lessons.reduce((sum, l) => sum + l.readingMinutes, 0);

  return (
    <div className="space-y-8">
      <Reveal y={16}>
        <div className="space-y-5">
          <SubjectBanner
            color={apiChapter.subject?.color ?? '#6366f1'}
            name={apiChapter.title}
            icon={BookOpen}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="space-y-4 lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={difficultyVariant['medium']} size="sm" className="capitalize">
                  medium
                </Badge>
                <Badge variant="secondary" size="sm">
                  <BookOpen className="h-3 w-3" />
                  {apiChapter.subject?.title ?? 'Subject'}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{apiChapter.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {durationMinutes} min total
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  {lessons.length} lessons
                </span>
              </div>
            </Card>

            <Card className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Chapter progress
              </p>
              <p className="font-display text-3xl font-extrabold text-slate-100">{progress}%</p>
              <ProgressBar value={progress} variant="primary" size="sm" />
              <p className="text-xs text-slate-500">
                0 of {lessons.length} lessons completed
              </p>
            </Card>
          </div>
        </div>
      </Reveal>

      <div className="space-y-4">
        <SectionTitle
          title="Lessons"
          subtitle="Preview every lesson in this chapter"
          action={
            <Link
              to={`/app/subjects/${subjectId}`}
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to {apiChapter.subject?.title ?? 'Subject'}
            </Link>
          }
        />
        <LessonGrid lessons={lessons} />
      </div>
    </div>
  );
};
