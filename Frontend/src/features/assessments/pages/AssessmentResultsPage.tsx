import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCcw, SearchX, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ResultSummary } from '../components/ResultSummary';
import { TopicBreakdown } from '../components/TopicBreakdown';
import { ReviewCard } from '../components/ReviewCard';
import { EmptyAssessmentState } from '../components/EmptyAssessmentState';
import { buildSampleResult, getAssessmentById } from '../data';
import type { AssessmentResult } from '../types';

type Tab = 'summary' | 'review';

export const AssessmentResultsPage: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('summary');

  const assessment = assessmentId ? getAssessmentById(assessmentId) : undefined;

  const result = useMemo<AssessmentResult | null>(() => {
    const stateResult = (location.state as { result?: AssessmentResult } | null)?.result;
    if (stateResult) return stateResult;
    return assessment ? buildSampleResult(assessment) : null;
  }, [location.state, assessment]);

  if (!assessment || !result) {
    return (
      <EmptyAssessmentState
        icon={<SearchX className="h-8 w-8" />}
        title="Results not found"
        description="We couldn’t find results for this assessment."
        actionText="Back to assessments"
        onAction={() => navigate('/app/assessments')}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/app/assessments"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2')}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to assessments
        </Link>

        <div
          role="tablist"
          aria-label="Results view"
          className="inline-flex gap-1 rounded-xl border border-slate-800 bg-slate-900/70 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'summary'}
            onClick={() => setTab('summary')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
              tab === 'summary'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            )}
          >
            Summary
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'review'}
            onClick={() => setTab('review')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
              tab === 'review'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            )}
          >
            Review answers
          </button>
        </div>
      </div>

      {tab === 'summary' ? (
        <div className="space-y-6">
          <Reveal y={16}>
            <ResultSummary result={result} />
          </Reveal>

          <Reveal>
            <TopicBreakdown items={result.topicBreakdown} />
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/app/assessments/${assessment.id}/take`}
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
              >
                <RotateCcw className="h-4 w-4" />
                Retry assessment
              </Link>
              <Link
                to="/app/assessments"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                Back to dashboard
              </Link>
              <button
                type="button"
                onClick={() => setTab('review')}
                className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
              >
                Review answers
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <p className="inline-flex items-start gap-2 text-sm leading-relaxed text-slate-500">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            This is a simulated result for preview purposes. Retry the assessment to generate a
            fresh score from your own answers.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold tracking-tight text-slate-100">
              Review answers
            </h2>
            <button
              type="button"
              onClick={() => setTab('summary')}
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to summary
            </button>
          </div>

          {result.answers.map((attempt, index) => (
            <Reveal key={attempt.questionId} y={14}>
              <ReviewCard attempt={attempt} index={index} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};
