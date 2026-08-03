import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { AIMode } from '../types';

export interface ModeCardProps {
  mode: AIMode;
  className?: string;
}

export const ModeCard: React.FC<ModeCardProps> = ({ mode, className }) => {
  const { name, tagline, description, icon: Icon, color } = mode;

  return (
    <Card isHoverable className={cn('group flex h-full flex-col gap-4 overflow-hidden', className)}>
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
        >
          <Icon className="h-6 w-6" />
        </span>
        <ArrowRight className="h-4 w-4 text-slate-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-slate-300" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display text-lg font-bold tracking-tight text-slate-100">{name}</h3>
        <p className="text-sm font-medium" style={{ color }}>
          {tagline}
        </p>
        <p className="text-sm leading-relaxed text-slate-400">{description}</p>
      </div>

      <Link
        to={`/app/ai-studio/chat/new?mode=${mode.id}&prompt=${encodeURIComponent(mode.suggestion)}`}
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-auto w-full')}
      >
        Try {name}
      </Link>
    </Card>
  );
};
