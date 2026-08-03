import React from 'react';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type RoleTone = 'indigo' | 'sky' | 'pink' | 'violet';

export interface RoleCardProps {
  icon: React.ReactNode;
  tone: RoleTone;
  title: string;
  tagline: string;
  benefits: string[];
  className?: string;
}

const toneStyles: Record<RoleTone, { ring: string; check: string }> = {
  indigo: { ring: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-400', check: 'text-indigo-400' },
  sky: { ring: 'border-sky-500/20 bg-sky-500/10 text-sky-400', check: 'text-sky-400' },
  pink: { ring: 'border-pink-500/20 bg-pink-500/10 text-pink-400', check: 'text-pink-400' },
  violet: { ring: 'border-violet-500/20 bg-violet-500/10 text-violet-400', check: 'text-violet-400' },
};

export const RoleCard: React.FC<RoleCardProps> = ({
  icon,
  tone,
  title,
  tagline,
  benefits,
  className,
}) => {
  const styles = toneStyles[tone];

  return (
    <Card variant="feature" isHoverable className={cn('flex h-full flex-col gap-5', className)}>
      <div className={cn('inline-flex h-12 w-12 items-center justify-center rounded-xl border', styles.ring)}>
        {icon}
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-xl font-bold text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400">{tagline}</p>
      </div>
      <ul className="mt-auto space-y-2.5 pt-1">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-300">
            <Check className={cn('mt-0.5 h-4 w-4 shrink-0', styles.check)} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
