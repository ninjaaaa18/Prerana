import React from 'react';
import { GraduationCap, HeartHandshake, Presentation, Shield } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';
import { RoleCard } from './RoleCard';
import type { RoleCardProps } from './RoleCard';

const ROLES: RoleCardProps[] = [
  {
    title: 'Student',
    tone: 'indigo',
    icon: <GraduationCap className="h-6 w-6" />,
    tagline: 'Chart your own path through a universe of subjects, with an AI tutor by your side.',
    benefits: ['Personalized study plans', 'Interactive mind maps', 'Instant AI help anytime', 'Visual progress tracking'],
  },
  {
    title: 'Teacher',
    tone: 'sky',
    icon: <Presentation className="h-6 w-6" />,
    tagline: 'Turn your lessons into journeys your students will love exploring.',
    benefits: ['Design mind maps & lessons', 'Smart auto-assessments', 'Class progress insights', 'AI-assisted content'],
  },
  {
    title: 'Parent',
    tone: 'pink',
    icon: <HeartHandshake className="h-6 w-6" />,
    tagline: 'See growth, not just grades, with a clear view of your child’s universe.',
    benefits: ['Live progress updates', 'Milestone celebrations', 'Weekly summaries', 'Safe, focused learning'],
  },
  {
    title: 'Admin',
    tone: 'violet',
    icon: <Shield className="h-6 w-6" />,
    tagline: 'Run the whole constellation — learners, teachers, and content — from one place.',
    benefits: ['Learner management', 'Content oversight', 'Analytics dashboards', 'Role-based access'],
  },
];

export const RoleGrid: React.FC = () => {
  return (
    <section id="roles" className="relative py-20 lg:py-28">
      <div className="space-y-12">
        <SectionTitle
          eyebrow="For Everyone"
          title="Built for the whole learning universe"
          subtitle="Whether you’re a student, teacher, parent, or administrator — Prerana brings you together."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((role, index) => (
            <Reveal key={role.title} delay={(index % 4) * 0.08} className="h-full">
              <RoleCard
                icon={role.icon}
                tone={role.tone}
                title={role.title}
                tagline={role.tagline}
                benefits={role.benefits}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
