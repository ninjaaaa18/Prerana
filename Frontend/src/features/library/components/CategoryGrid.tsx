import React from 'react';
import { cn } from '@/lib/utils';
import { CategoryCard } from './CategoryCard';
import { CATEGORIES } from '../data';
import type { CategoryInfo } from '../types';

export interface CategoryGridProps {
  counts: Record<string, number>;
  onSelect?: (categoryId: string) => void;
  className?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ counts, onSelect, className }) => {
  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9', className)}>
      {CATEGORIES.map((category: CategoryInfo) => (
        <CategoryCard
          key={category.id}
          category={category}
          count={counts[category.id] ?? 0}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
