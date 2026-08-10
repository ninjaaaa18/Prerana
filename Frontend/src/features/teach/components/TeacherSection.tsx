import React from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { cn } from '@/lib/utils';

export interface TeacherSectionProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const TeacherSection: React.FC<TeacherSectionProps> = ({
  title,
  subtitle,
  action,
  children,
  className,
}) => {
  return (
    <section className={cn('space-y-4', className)} aria-label={title}>
      <SectionHeader title={title} subtitle={subtitle} action={action} />
      {children}
    </section>
  );
};
