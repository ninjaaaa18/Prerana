import React from 'react';
import { Boxes } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { ResourceCard } from './ResourceCard';
import type { ResourceItem } from '../types';

export interface ResourceGridProps {
  resources: ResourceItem[];
  onPreview: (resource: ResourceItem) => void;
  className?: string;
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({ resources, onPreview, className }) => {
  if (resources.length === 0) {
    return (
      <EmptyState
        icon={<Boxes className="h-8 w-8" />}
        title="No resources generated yet"
        description="Ask Prerana AI to turn a topic into study tools and they will appear here."
        className="my-0"
      />
    );
  }

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} onPreview={onPreview} />
      ))}
    </div>
  );
};
