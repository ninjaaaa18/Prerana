import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { cn } from '@/lib/utils';

export interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const HIGHLIGHTS = [
  { icon: <BrainCircuit className="h-4 w-4" />, text: 'AI-generated mind maps for every topic' },
  { icon: <TrendingUp className="h-4 w-4" />, text: 'Personalized progress tracking' },
  { icon: <BookOpen className="h-4 w-4" />, text: 'A curated universe of lessons' },
];

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'relative mx-auto grid w-full max-w-6xl gap-10 py-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-12',
        className
      )}
    >
      <GalaxyGlow color="indigo" x="0%" y="0%" size={420} opacity={0.14} className="hidden lg:block" />
      <GalaxyGlow color="violet" x="100%" y="100%" size={460} opacity={0.14} className="hidden lg:block" />

      <div className="relative hidden lg:block">
        <div className="max-w-md space-y-10">
          <Logo />

          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Learn beyond limits
            </span>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-slate-50">
              Your universe of knowledge, one lesson at a time.
            </h2>
            <p className="text-base leading-relaxed text-slate-400">
              Explore subjects through beautiful mind maps, challenge yourself with smart
              assessments, and watch your progress take flight.
            </p>
          </div>

          <ul className="space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  {item.icon}
                </span>
                {item.text}
              </li>
            ))}
          </ul>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            Explore the platform
          </Link>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};
