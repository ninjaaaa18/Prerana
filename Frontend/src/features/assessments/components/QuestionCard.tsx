import React from 'react';
import { Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { QUESTION_TYPE_LABELS } from '../data';
import type { AnswerValue, Question } from '../types';
import { MCQQuestion } from './MCQQuestion';
import { TrueFalseQuestion } from './TrueFalseQuestion';
import { FillBlankQuestion } from './FillBlankQuestion';
import { MatchQuestion } from './MatchQuestion';
import { OrderingQuestion } from './OrderingQuestion';
import { ShortAnswerQuestion } from './ShortAnswerQuestion';

export interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
  className?: string;
}

interface QuestionInputProps {
  question: Question;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ question, value, onChange }) => {
  switch (question.type) {
    case 'mcq':
      return (
        <MCQQuestion
          options={question.options}
          value={typeof value === 'string' ? value : null}
          onChange={onChange}
        />
      );
    case 'true-false':
      return (
        <TrueFalseQuestion
          value={typeof value === 'boolean' ? value : null}
          onChange={onChange}
        />
      );
    case 'fill-blank':
      return (
        <FillBlankQuestion
          value={typeof value === 'string' ? value : ''}
          onChange={onChange}
        />
      );
    case 'match':
      return (
        <MatchQuestion
          pairs={question.pairs}
          value={value && typeof value === 'object' && !Array.isArray(value) ? value : {}}
          onChange={onChange}
        />
      );
    case 'ordering':
      return (
        <OrderingQuestion
          items={question.items}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      );
    case 'short-answer':
      return (
        <ShortAnswerQuestion
          value={typeof value === 'string' ? value : ''}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  total,
  value,
  onChange,
  className,
}) => {
  const headingId = `question-${question.id}-heading`;

  return (
    <Card className={cn('flex flex-col gap-5', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant="secondary" size="sm">
          Question {index + 1} of {total}
        </Badge>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="info" size="sm">
            {QUESTION_TYPE_LABELS[question.type]}
          </Badge>
          <Badge variant="primary" size="sm">
            <Award className="h-3 w-3" />
            {question.points} pts
          </Badge>
        </div>
      </div>

      <h3
        id={headingId}
        className="font-display text-lg font-bold leading-snug text-slate-50 sm:text-xl"
      >
        {question.prompt}
      </h3>

      <div aria-labelledby={headingId}>
        <QuestionInput question={question} value={value} onChange={onChange} />
      </div>
    </Card>
  );
};
