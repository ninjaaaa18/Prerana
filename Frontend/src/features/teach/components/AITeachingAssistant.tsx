import React from 'react';
import { BookOpenCheck, Lightbulb, ListChecks, ScanText, Sparkles, Wand2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export interface AITeachingAssistantProps {
  className?: string;
}

const ACTIONS = [
  { id: 'explain', label: 'Generate explanation', icon: ScanText },
  { id: 'simplify', label: 'Simplify content', icon: Wand2 },
  { id: 'examples', label: 'Generate examples', icon: Lightbulb },
  { id: 'quiz', label: 'Generate quiz questions', icon: ListChecks },
];

export const AITeachingAssistant: React.FC<AITeachingAssistantProps> = ({ className }) => {
  const { showToast } = useToast();

  const handleAction = (label: string) => {
    showToast({
      title: 'AI Teaching Assistant',
      description: `“${label}” is a preview — AI generation is not connected yet.`,
      variant: 'info',
    });
  };

  return (
    <Card className={cn(className)}>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h3 className="flex items-center gap-1.5 font-display text-sm font-bold text-slate-100">
            <BookOpenCheck className="h-4 w-4 text-violet-400" aria-hidden="true" />
            AI Teaching Assistant
          </h3>
          <p className="text-xs text-slate-400">
            Let Prerana draft content, then refine it your way.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {ACTIONS.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            className="justify-start"
            onClick={() => handleAction(action.label)}
          >
            <action.icon className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
            {action.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};
