import React from 'react';
import { PenLine } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface FillBlankQuestionProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const FillBlankQuestion: React.FC<FillBlankQuestionProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type your answer…"
        aria-label="Your answer"
        leftIcon={<PenLine className="h-4 w-4" />}
        className="max-w-md"
      />
      <p className="text-xs text-slate-500">
        Spelling matters — but the answer is not case-sensitive.
      </p>
    </div>
  );
};
