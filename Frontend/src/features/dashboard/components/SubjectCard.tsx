import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Subject } from '../types';

export const SubjectCard: React.FC<Subject> = ({
  id,
  name,
  icon: Icon,
  color,
  progress,
  chaptersCompleted,
  chaptersTotal,
}) => {
  return (
    <Card isHoverable className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <ProgressRing value={progress} size={56} strokeWidth={6} color={color} />
      </div>

      <div className="space-y-1">
        <h3 className="font-display font-semibold text-slate-100">{name}</h3>
        <p className="text-xs text-slate-500">
          {chaptersCompleted}/{chaptersTotal} chapters
        </p>
      </div>

      <Link
        to={`/app/subjects/${id}`}
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full')}
      >
        Continue
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Card>
  );
};
