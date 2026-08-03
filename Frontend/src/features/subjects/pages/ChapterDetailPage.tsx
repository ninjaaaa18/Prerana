import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, SearchX } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyState } from '@/components/ui/empty-state';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SubjectBanner } from '../components/SubjectBanner';
import { LessonGrid } from '../components/LessonGrid';
import { SectionTitle } from '../components/SectionTitle';
import { SUBJECTS, getChapterProgress, getChapterStatus } from '../data';

const difficultyVariant = {
  easy: 'success',
  medium: 'warning',
  hard: 'destructive',
} as const;

const statusVariant = {
  'not-started': 'secondary',
  'in-progress': 'info',
  completed: 'success',
} as const;

const statusLabel = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  completed: 'Completed',
} as const;

export const ChapterDetailPage: React.FC = () => {
  const { subjectId, chapterId } = useParams<{ subjectId: string; chapterId: string }>();
  const subject = SUBJECTS.find((item) => item.id === subjectId);
  const chapter = subject?.chapters.find((item) => item.id === chapterId);

  if (!subject || !chapter) {
    return (
      <EmptyState
        icon={<SearchX className="h-8 w-8" />}
        title="Chapter not found"
        description="The chapter you're looking for doesn't exist."
        actionText="Browse subjects"
      />
    );
  }

  const progress = getChapterProgress(chapter);
  const status = getChapterStatus(chapter);
  const lessonsDone = chapter.lessons.filter((lesson) => lesson.isCompleted).length;

  return (
    <div className="space-y-8">
      <Reveal y={16}>
        <div className="space-y-5">
          <SubjectBanner color={subject.color} name={chapter.title} icon={subject.icon} />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="space-y-4 lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={difficultyVariant[chapter.difficulty]} size="sm" className="capitalize">
                  {chapter.difficulty}
                </Badge>
                <Badge variant={statusVariant[status]} size="sm">
                  {statusLabel[status]}
                </Badge>
                <Badge variant="secondary" size="sm">
                  <BookOpen className="h-3 w-3" />
                  {subject.name}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{chapter.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {chapter.durationMinutes} min total
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  {chapter.lessons.length} lessons
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
                {lessonsDone} of {chapter.lessons.length} lessons completed
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
              to={`/app/subjects/${subject.id}`}
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to {subject.name}
            </Link>
          }
        />
        <LessonGrid lessons={chapter.lessons} />
      </div>
    </div>
  );
};
