import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

export interface CTASectionProps {
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ className }) => {
  return (
    <section className={cn('relative py-20 lg:py-28', className)} aria-label="Get started">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15 px-6 py-16 text-center sm:px-12 sm:py-20">
          <GalaxyGlow color="indigo" x="30%" y="0%" size={360} opacity={0.22} />
          <GalaxyGlow color="violet" x="75%" y="100%" size={320} opacity={0.2} />

          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
              <Rocket className="h-3.5 w-3.5" />
              Ready for liftoff
            </span>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Begin your journey across the stars.
            </h2>
            <p className="mx-auto max-w-xl text-base text-slate-400 sm:text-lg">
              Create a free account and let your universe of knowledge unfold — one lesson, one
              mind map, one milestone at a time.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
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
                Explore Subjects
              </Link>
            </div>
            <p className="text-xs text-slate-500">
              Free to start · No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
