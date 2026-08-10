import React from 'react';
import { cn } from '@/lib/utils';
import { CollectionCard } from './CollectionCard';
import { getCollectionResources } from '../data';
import type { Collection } from '../types';

export interface CollectionGridProps {
  collections: Collection[];
  onSelect?: (collection: Collection) => void;
  className?: string;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  collections,
  onSelect,
  className,
}) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          resources={getCollectionResources(collection.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
