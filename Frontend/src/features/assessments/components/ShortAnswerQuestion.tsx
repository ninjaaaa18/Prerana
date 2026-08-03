import React from 'react';
import { SpellCheck } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export interface ShortAnswerQuestionProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write a short answer (1–2 sentences)…"
        aria-label="Your answer"
        className="max-w-xl min-h-[110px]"
      />
      <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
        <SpellCheck className="h-3.5 w-3.5" />
        A complete answer with the right keywords scores full marks.
      </p>
    </div>
  );
};
