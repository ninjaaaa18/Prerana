import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquarePlus, Sparkles, Wand2 } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { cn } from '@/lib/utils';

export interface AIHeroProps {
  className?: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const AIHero: React.FC<AIHeroProps> = ({ className }) => {
  const handleExploreTools = () => {
    document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15',
        className
      )}
      aria-label="AI Studio"
    >
      <GalaxyGlow color="indigo" x="8%" y="-30%" size={380} opacity={0.24} />
      <GalaxyGlow color="violet" x="92%" y="115%" size={340} opacity={0.18} />

      <div className="relative flex flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-6">
          <div className="flex items-center gap-4">
            <Avatar name="Prerana AI" size="xl" status="online" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                {getGreeting()}
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                AI Studio
              </h1>
            </div>
          </div>

          <p className="inline-flex items-start gap-2 text-sm leading-relaxed text-slate-300">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-300" />
            Your personal AI study partner is here — ask questions, get step-by-step lessons, or
            turn any topic into study tools.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link to="/app/ai-studio/chat/new" className={cn(buttonVariants({ size: 'lg' }))}>
              <MessageSquarePlus className="h-5 w-5" />
              Start a new chat
            </Link>
            <button
              type="button"
              onClick={handleExploreTools}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              <Wand2 className="h-5 w-5" />
              Generate study tools
            </button>
          </div>
        </div>

        <div className="hidden shrink-0 lg:block" aria-hidden="true">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-indigo-400/20" />
            <div className="absolute inset-4 rounded-full border border-violet-400/20" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-600/10 text-indigo-300 shadow-soft">
              <Sparkles className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
