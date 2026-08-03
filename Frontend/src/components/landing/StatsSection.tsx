import React from 'react';
import { BookOpen, ClipboardList, Sparkles, Trophy, Users } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';
import { StatCard } from './StatCard';
import type { StatCardProps } from './StatCard';

const STATS: StatCardProps[] = [
  { label: 'Students exploring', value: 25000, suffix: '+', icon: <Users className="h-5 w-5" /> },
  { label: 'Subjects to discover', value: 60, suffix: '+', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'AI learning sessions', value: 1.5, suffix: 'M+', decimals: 1, icon: <Sparkles className="h-5 w-5" /> },
  { label: 'Assessments completed', value: 480, suffix: 'k+', icon: <ClipboardList className="h-5 w-5" /> },
  { label: 'Achievements unlocked', value: 12, suffix: 'k+', icon: <Trophy className="h-5 w-5" /> },
];

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="relative py-20 lg:py-28">
      <div className="space-y-12">
        <SectionTitle
          eyebrow="Milestones"
          title="A universe already in motion"
          subtitle="Learners everywhere are exploring, practicing, and mastering with Prerana."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={(index % 5) * 0.06} className="h-full">
              <StatCard
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
