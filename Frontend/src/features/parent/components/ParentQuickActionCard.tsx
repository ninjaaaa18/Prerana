import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ParentQuickActionCardProps {
  title: string;
  description: string;
  to: string;
  color: string;
  icon: LucideIcon;
  className?: string;
}

export const ParentQuickActionCard: React.FC<ParentQuickActionCardProps> = ({
  title,
  description,
  to,
  color,
  icon: Icon,
  className,
}) => {
  return (
    <Link to={to} className={cn('h-full', className)}>
      <Card isHoverable className="group h-full space-y-4 border border-slate-800/80 bg-slate-950/55 p-4">
        <div
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="space-y-1.5">
          <h3 className="flex items-center gap-1.5 font-display text-base font-bold text-slate-100">
            {title}
            <ArrowUpRight
              className="h-4 w-4 text-slate-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-300"
              aria-hidden="true"
            />
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">{description}</p>
        </div>
      </Card>
    </Link>
  );
};
