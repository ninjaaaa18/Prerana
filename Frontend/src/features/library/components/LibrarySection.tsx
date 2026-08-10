import React from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/landing/Reveal';
import { cn } from '@/lib/utils';

export interface LibrarySectionProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  horizontal?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({
  title,
  subtitle,
  action,
  horizontal = false,
  className,
  children,
}) => {
  return (
    <section className={cn('space-y-5', className)} aria-label={title}>
      <Reveal y={18}>
        <SectionHeader title={title} subtitle={subtitle} action={action} />
      </Reveal>

      {horizontal ? (
        <Reveal>
          <div className="-mx-1 overflow-x-auto px-1 pb-2">
            <div className="flex min-w-max gap-4">{children}</div>
          </div>
        </Reveal>
      ) : (
        <Reveal>{children}</Reveal>
      )}
    </section>
  );
};
