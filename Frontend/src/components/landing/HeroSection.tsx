import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

const HeroIllustration = lazy(() =>
  import('./HeroIllustration').then((m) => ({ default: m.HeroIllustration }))
);

export interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section className={cn('relative py-12 lg:py-20', className)} aria-label="Hero">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-7 text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Prerana Universe
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Learning is exploring a{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-sky-300 bg-clip-text text-transparent">
                universe
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
              Prerana is an AI-powered learning universe where every student charts their own
              course — personalized, interactive, and beautifully simple.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/login"
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full sm:w-auto')}
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/app/subjects"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full sm:w-auto')}
              >
                <Compass className="h-4 w-4" />
                Explore Subjects
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                AI tutor included
              </span>
              <span>Personalized paths</span>
              <span>Free to start</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <Suspense
            fallback={
              <div className="mx-auto aspect-square w-full max-w-[540px] rounded-full bg-slate-900/40 blur-2xl" />
            }
          >
            <HeroIllustration />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
};
