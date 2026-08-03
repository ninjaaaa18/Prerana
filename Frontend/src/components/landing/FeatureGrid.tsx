import React from 'react';
import {
  Bot,
  ClipboardCheck,
  Library,
  Network,
  SlidersHorizontal,
  TrendingUp,
} from 'lucide-react';
import { FeatureCard } from '@/components/ui/card';
import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';

const FEATURES = [
  {
    icon: <Bot className="h-6 w-6" />,
    title: 'AI Tutor',
    description:
      'A personal AI companion that explains any concept, answers every question, and adapts to how you learn best.',
  },
  {
    icon: <Network className="h-6 w-6" />,
    title: 'Mind Maps',
    description:
      'Turn any topic into a beautiful, explorable mind map that connects every idea visually.',
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: 'Smart Assessments',
    description:
      'Adaptive quizzes that pinpoint exactly what you know and gently guide you where you need practice.',
  },
  {
    icon: <Library className="h-6 w-6" />,
    title: 'Learning Library',
    description:
      'A curated universe of lessons, videos, and resources across every subject you explore.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Progress Tracking',
    description:
      'Watch your mastery grow with luminous charts that celebrate every single milestone.',
  },
  {
    icon: <SlidersHorizontal className="h-6 w-6" />,
    title: 'Adaptive Learning',
    description:
      'Lessons that reshape themselves around your pace, your strengths, and your goals.',
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <section id="features" className="relative py-20 lg:py-28">
      <div className="space-y-12">
        <SectionTitle
          eyebrow="Features"
          title="Everything you need to explore"
          subtitle="A complete toolkit for learning, built around you — powered by a thoughtful AI companion."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 0.08} className="h-full">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
