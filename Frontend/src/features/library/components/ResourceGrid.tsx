import React from 'react';
import { cn } from '@/lib/utils';
import { ResourceCard } from './ResourceCard';
import { EmptyLibraryState, type EmptyLibraryVariant } from './EmptyLibraryState';
import type { Resource } from '../types';

export interface ResourceGridProps {
  resources: Resource[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  emptyVariant?: EmptyLibraryVariant;
  className?: string;
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({
  resources,
  bookmarkedIds,
  onToggleBookmark,
  emptyVariant = 'none',
  className,
}) => {
  if (resources.length === 0) {
    return <EmptyLibraryState variant={emptyVariant} />;
  }

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          isBookmarked={bookmarkedIds.has(resource.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};
