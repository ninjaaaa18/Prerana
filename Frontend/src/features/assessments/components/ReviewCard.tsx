import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { QUESTION_TYPE_LABELS, correctAnswerDisplay, studentAnswerDisplay } from '../data';
import type { AttemptQuestionResult } from '../types';

export interface ReviewCardProps {
  attempt: AttemptQuestionResult;
  index: number;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ attempt, index, className }) => {
  const { question, studentAnswer, isCorrect } = attempt;

  return (
    <Card className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant="secondary" size="sm">
          Question {index + 1}
        </Badge>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="info" size="sm">
            {QUESTION_TYPE_LABELS[question.type]}
          </Badge>
          <Badge variant={isCorrect ? 'success' : 'destructive'} size="sm">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Correct
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3" />
                Incorrect
              </>
            )}
          </Badge>
        </div>
      </div>

      <h3 className="font-display text-base font-bold leading-snug text-slate-100">
        {question.prompt}
      </h3>

      <div className={cn('space-y-3 text-sm')}>
        <div
          className={cn(
            'rounded-xl border px-4 py-3',
            isCorrect
              ? 'border-emerald-500/30 bg-emerald-500/5'
              : 'border-rose-500/30 bg-rose-500/5'
          )}
        >
          <p
            className={cn(
              'mb-1 text-xs font-semibold uppercase tracking-wider',
              isCorrect ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            Your answer
          </p>
          <p className="text-slate-200">{studentAnswerDisplay(question, studentAnswer)}</p>
        </div>

        {!isCorrect && (
          <div className="rounded-xl border border-slate-700/70 bg-slate-800/40 px-4 py-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Correct answer
            </p>
            <p className="text-slate-200">{correctAnswerDisplay(question)}</p>
          </div>
        )}

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Explanation
          </p>
          <p className="leading-relaxed text-slate-400">{question.explanation}</p>
        </div>
      </div>
    </Card>
  );
};
