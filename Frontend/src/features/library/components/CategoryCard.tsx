import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { CategoryInfo } from '../types';

export interface CategoryCardProps {
  category: CategoryInfo;
  count: number;
  onSelect?: (categoryId: string) => void;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  count,
  onSelect,
  className,
}) => {
  const { icon: Icon, color } = category;

  const body = (
    <Card isHoverable className={cn('space-y-3 p-5', className)}>
      <div className="flex items-center justify-between">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-300">
          {count}
        </span>
      </div>
      <div className="space-y-0.5">
        <h3 className="font-display font-semibold text-slate-100">{category.label}</h3>
        <p className="text-xs text-slate-500">{category.description}</p>
      </div>
    </Card>
  );

  if (!onSelect) return body;

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(category.id);
        }
      }}
      className="block w-full rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {body}
    </button>
  );
};
