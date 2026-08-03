import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, MessageSquareText, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { cn } from '@/lib/utils';

export interface AITutorCardProps {
  className?: string;
}

const FEATURES = [
  'Explains tricky concepts in simple words',
  'Creates mind maps on demand',
  'Quizzes you and tracks weak areas',
];

export const AITutorCard: React.FC<AITutorCardProps> = ({ className }) => {
  return (
    <Card
      className={cn(
        'relative h-full overflow-hidden border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 via-slate-900/70 to-violet-600/10',
        className
      )}
    >
      <GalaxyGlow color="indigo" x="100%" y="0%" size={300} opacity={0.2} />

      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-600/10 text-indigo-300">
            <Bot className="h-5 w-5" />
          </span>
          <Badge variant="primary" size="sm">
            <Sparkles className="h-3 w-3" />
            AI Tutor
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold tracking-tight text-slate-50">
            Your personal AI study partner
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Stuck on a concept? Ask Prerana AI to explain it your way — with examples, analogies,
            and instant practice.
          </p>
        </div>

        <ul className="space-y-2">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
              <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          to="/app/ai-studio/chat/session-1"
          className={cn(buttonVariants({ size: 'lg' }), 'mt-auto w-full sm:w-auto')}
        >
          Start AI session
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
};
