import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock,
  Gauge,
  History,
  ListChecks,
  SearchX,
  TimerReset,
  Trophy,
} from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { cn } from '@/lib/utils';
import { EmptyAssessmentState } from '../components/EmptyAssessmentState';
import {
  getAssessmentById,
  QUESTION_TYPE_ICONS,
  QUESTION_TYPE_LABELS,
} from '../data';
import type { QuestionType } from '../types';

const difficultyVariant = {
  easy: 'success',
  medium: 'warning',
  hard: 'destructive',
} as const;

const difficultyLabel = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
} as const;

interface MetaItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const MetaItem: React.FC<MetaItemProps> = ({ icon, label, value }) => {
  return (
    <div className="space-y-1">
      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
        {icon}
        {label}
      </span>
      <p className="text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
};

export const AssessmentDetailPage: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const assessment = assessmentId ? getAssessmentById(assessmentId) : undefined;

  if (!assessment) {
    return (
      <EmptyAssessmentState
        icon={<SearchX className="h-8 w-8" />}
        title="Assessment not found"
        description="The assessment you’re looking for doesn’t exist or has been removed."
        actionText="Back to assessments"
        onAction={() => navigate('/app/assessments')}
      />
    );
  }

  const { status, progress, bestScore, dueAt, attemptsUsed, attemptsAllowed } = assessment;
  const isUpcoming = status === 'upcoming';
  const isCompleted = status === 'completed';
  const inProgress = Boolean(progress && progress > 0 && progress < 100);

  const ctaLabel = isUpcoming
    ? 'Scheduled'
    : isCompleted
      ? 'Retake assessment'
      : inProgress
        ? 'Continue assessment'
        : 'Start assessment';

  const typeCounts = assessment.questions.reduce<Record<QuestionType, number>>(
    (acc, question) => {
      acc[question.type] = (acc[question.type] ?? 0) + 1;
      return acc;
    },
    {} as Record<QuestionType, number>
  );

  return (
    <div className="space-y-8">
      <Link
        to="/app/assessments"
        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2')}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to assessments
      </Link>

      <Reveal y={16}>
        <section
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15"
          aria-label={assessment.title}
        >
          <GalaxyGlow color="indigo" x="10%" y="-40%" size={340} opacity={0.2} />
          <GalaxyGlow color="violet" x="95%" y="120%" size={300} opacity={0.15} />

          <div className="relative flex flex-col gap-6 px-6 py-8 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{
                    color: assessment.color,
                    borderColor: `${assessment.color}40`,
                    backgroundColor: `${assessment.color}1a`,
                  }}
                >
                  <assessment.icon className="h-6 w-6" />
                </span>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {assessment.subject} · {assessment.chapter}
                  </p>
                  <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                    {assessment.title}
                  </h1>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-400">{assessment.description}</p>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={isUpcoming ? 'warning' : inProgress ? 'info' : isCompleted ? 'success' : 'primary'} size="sm">
                  {isUpcoming ? 'Scheduled' : inProgress ? 'In progress' : isCompleted ? 'Completed' : 'Ready'}
                </Badge>
                <Badge variant={difficultyVariant[assessment.difficulty]} size="sm">
                  <Gauge className="h-3 w-3" />
                  {difficultyLabel[assessment.difficulty]}
                </Badge>
                {isUpcoming && dueAt && (
                  <Badge variant="secondary" size="sm">
                    <CalendarClock className="h-3 w-3" />
                    Opens {dueAt}
                  </Badge>
                )}
              </div>
            </div>

            <div className="shrink-0 space-y-3">
              {isCompleted && bestScore !== undefined && (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                  <Trophy className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-xs text-slate-400">Best score</p>
                    <p className="font-display text-xl font-bold text-emerald-300">{bestScore}%</p>
                  </div>
                </div>
              )}

              {inProgress && (
                <div className="flex items-center gap-3 rounded-2xl border border-sky-500/20 bg-sky-500/5 px-4 py-3">
                  <TimerReset className="h-5 w-5 text-sky-400" />
                  <div>
                    <p className="text-xs text-slate-400">Current progress</p>
                    <p className="font-display text-xl font-bold text-sky-300">{progress}%</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Card className="space-y-5">
            <h2 className="font-display text-lg font-bold text-slate-100">Assessment details</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <MetaItem
                icon={<BookOpen className="h-3.5 w-3.5" />}
                label="Questions"
                value={`${assessment.questionCount}`}
              />
              <MetaItem
                icon={<Clock className="h-3.5 w-3.5" />}
                label="Duration"
                value={`${assessment.durationMinutes} min`}
              />
              <MetaItem
                icon={<History className="h-3.5 w-3.5" />}
                label="Attempts"
                value={`${attemptsUsed} of ${attemptsAllowed} used`}
              />
              <MetaItem
                icon={<ListChecks className="h-3.5 w-3.5" />}
                label="Question types"
                value={`${Object.keys(typeCounts).length} types`}
              />
              <MetaItem
                icon={<TimerReset className="h-3.5 w-3.5" />}
                label="Passing grade"
                value="60% (C)"
              />
              <MetaItem
                icon={<Trophy className="h-3.5 w-3.5" />}
                label="Best score"
                value={bestScore !== undefined ? `${bestScore}%` : '—'}
              />
            </div>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="flex h-full flex-col gap-5">
            <h2 className="font-display text-lg font-bold text-slate-100">Ready?</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              The timer starts as soon as you begin. You can move between questions freely using
              the navigator, and submit whenever you’re done.
            </p>

            {isUpcoming ? (
              <span
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full cursor-not-allowed opacity-60')}
                aria-disabled="true"
              >
                <CalendarClock className="h-4 w-4" />
                Opens {dueAt}
              </span>
            ) : (
              <Link
                to={`/app/assessments/${assessment.id}/take`}
                className={cn(buttonVariants({ size: 'lg' }), 'w-full')}
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            {isCompleted && (
              <Link
                to={`/app/assessments/${assessment.id}/results`}
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-full')}
              >
                <CheckCircle2 className="h-4 w-4" />
                View last results
              </Link>
            )}
          </Card>
        </Reveal>
      </div>

      <Reveal>
        <Card className="space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-100">What to expect</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeCounts).map(([type, count]) => {
              const Icon = QUESTION_TYPE_ICONS[type as QuestionType];
              return (
                <span
                  key={type}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-slate-300"
                >
                  <Icon className="h-3.5 w-3.5 text-indigo-400" />
                  {QUESTION_TYPE_LABELS[type as QuestionType]}
                  <span className="font-bold text-slate-500">× {count}</span>
                </span>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {assessment.topics.map((topic) => (
              <Badge key={topic} variant="secondary" size="sm">
                {topic}
              </Badge>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  );
};
