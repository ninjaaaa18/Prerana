import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Flag, SearchX, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { ProgressTracker } from '../components/ProgressTracker';
import { QuestionCard } from '../components/QuestionCard';
import { QuestionNavigator } from '../components/QuestionNavigator';
import { Timer } from '../components/Timer';
import { EmptyAssessmentState } from '../components/EmptyAssessmentState';
import { buildResult, getAssessmentById } from '../data';
import type { AnswerValue } from '../types';

const isAnswered = (value: AnswerValue | undefined): boolean => {
  if (value === null || value === undefined || value === '') return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
};

export const AssessmentPlayerPage: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();

  const assessment = assessmentId ? getAssessmentById(assessmentId) : undefined;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [confirming, setConfirming] = useState(false);

  const total = assessment?.questions.length ?? 0;
  const totalSeconds = (assessment?.durationMinutes ?? 0) * 60;

  React.useEffect(() => {
    setCurrent(0);
    setAnswers({});
    setElapsedSeconds(0);
    setConfirming(false);
  }, [assessmentId]);

  const answeredMap = useMemo(() => {
    if (!assessment) return {};
    const map: Record<string, boolean> = {};
    assessment.questions.forEach((question) => {
      map[question.id] = isAnswered(answers[question.id]);
    });
    return map;
  }, [assessment, answers]);

  const answeredCount = useMemo(
    () => assessment?.questions.filter((question) => answeredMap[question.id]).length ?? 0,
    [assessment, answeredMap]
  );

  if (!assessment) {
    return (
      <EmptyAssessmentState
        icon={<SearchX className="h-8 w-8" />}
        title="Assessment not found"
        description="The assessment you’re trying to take doesn’t exist."
        actionText="Back to assessments"
        onAction={() => navigate('/app/assessments')}
      />
    );
  }

  const question = assessment.questions[current];

  const handleChange = (value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleTick = (secondsLeft: number) => {
    setElapsedSeconds(totalSeconds - secondsLeft);
  };

  const handleSubmit = () => {
    const result = buildResult(assessment, answers, elapsedSeconds);
    navigate(`/app/assessments/${assessment.id}/results`, { state: { result } });
  };

  const handleExpire = () => {
    handleSubmit();
  };

  const unanswered = total - answeredCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to={`/app/assessments/${assessment.id}`}
            className={cn('inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100')}
            aria-label="Back to assessment details"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="truncate font-display text-lg font-bold tracking-tight text-slate-50 sm:text-xl">
              {assessment.title}
            </h1>
            <p className="truncate text-xs text-slate-500">
              {assessment.subject} · {assessment.chapter}
            </p>
          </div>
        </div>

        <Timer
          initialSeconds={totalSeconds}
          onTick={handleTick}
          onExpire={handleExpire}
          className="shrink-0"
        />
      </div>

      <ProgressTracker
        current={current}
        total={total}
        answeredCount={answeredCount}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-4">
          <QuestionCard
            key={question.id}
            question={question}
            index={current}
            total={total}
            value={answers[question.id] ?? null}
            onChange={handleChange}
          />

          {confirming && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5"
              role="alertdialog"
              aria-label="Confirm submission"
            >
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div className="space-y-1">
                  <h2 className="font-display text-base font-bold text-slate-100">
                    Submit your assessment?
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {answeredCount} of {total} questions answered.
                    {unanswered > 0 && (
                      <> <span className="font-semibold text-amber-300">{unanswered} unanswered</span> will be marked incorrect.</>
                    )}{' '}
                    You can’t change your answers after submitting.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm" onClick={handleSubmit}>
                  <Flag className="h-3.5 w-3.5" />
                  Submit now
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                  Keep working
                </Button>
              </div>
            </motion.div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
              disabled={current === 0}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous
            </Button>

            {current < total - 1 ? (
              <Button
                variant="primary"
                onClick={() => setCurrent((prev) => Math.min(total - 1, prev + 1))}
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setConfirming(true)}>
                <Flag className="h-3.5 w-3.5" />
                Submit assessment
              </Button>
            )}
          </div>
        </div>

        <aside className="space-y-4" aria-label="Assessment progress">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
                Questions
              </h2>
              <span className="text-xs tabular-nums text-slate-500">
                {answeredCount}/{total}
              </span>
            </div>

            <QuestionNavigator
              count={total}
              current={current}
              answered={answeredMap}
              onSelect={(index) => setCurrent(index)}
            />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-indigo-600" />
                Current
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-emerald-500/40" />
                Answered
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-slate-800 border border-slate-600" />
                Unanswered
              </span>
            </div>
          </Card>

          <Card className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Attempt</span>
              <span className="font-medium text-slate-200">
                {assessment.attemptsUsed + 1} of {assessment.attemptsAllowed}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Duration</span>
              <span className="font-medium text-slate-200">{assessment.durationMinutes} min</span>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};
