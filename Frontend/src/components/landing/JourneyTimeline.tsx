import React from 'react';
import { Award, BookOpen, ClipboardCheck, PenLine, TrendingUp } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';

const STEPS = [
  {
    label: 'Learn',
    description: 'Explore fresh concepts with beautiful lessons and interactive mind maps.',
    icon: BookOpen,
  },
  {
    label: 'Practice',
    description: 'Reinforce what you know with hands-on, adaptive exercises.',
    icon: PenLine,
  },
  {
    label: 'Assess',
    description: 'Prove your understanding with smart, personalized assessments.',
    icon: ClipboardCheck,
  },
  {
    label: 'Improve',
    description: 'Get gentle AI feedback that fills the gaps in your knowledge.',
    icon: TrendingUp,
  },
  {
    label: 'Master',
    description: 'Reach mastery and celebrate every milestone on your journey.',
    icon: Award,
  },
];

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="journey" className="relative py-20 lg:py-28">
      <div className="space-y-14">
        <SectionTitle
          eyebrow="Learning Journey"
          title="Five steps to mastery"
          subtitle="From first spark to deep understanding — a journey designed around your growth."
        />

        <div className="relative mx-auto max-w-5xl">
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-6 top-2 w-px bg-gradient-to-b from-indigo-500/40 via-purple-500/30 to-slate-800 md:bottom-auto md:left-0 md:right-0 md:top-6 md:h-px md:w-auto md:bg-gradient-to-r"
          />

          <ol className="relative space-y-10 md:grid md:grid-cols-5 md:gap-6 md:space-y-0">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <li
                  key={step.label}
                  className="relative flex items-start gap-5 md:flex-col md:items-center md:text-center"
                >
                  <Reveal delay={index * 0.1} className="relative z-10 shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-500/30 bg-slate-900 text-indigo-400 shadow-glow">
                      <StepIcon className="h-5 w-5" />
                    </div>
                  </Reveal>
                  <div className="md:mt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/80">
                      Step {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-slate-100">{step.label}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
