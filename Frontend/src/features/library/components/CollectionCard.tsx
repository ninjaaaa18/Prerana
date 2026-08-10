import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { subjectMeta } from '../data';
import type { Collection, Resource } from '../types';

export interface CollectionCardProps {
  collection: Collection;
  resources: Resource[];
  onSelect?: (collection: Collection) => void;
  className?: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  resources,
  onSelect,
  className,
}) => {
  const { icon: Icon, color } = collection;
  const previews = resources.slice(0, 4);

  const body = (
    <Card isHoverable className={cn('group space-y-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold tabular-nums text-slate-500">
          {resources.length} items
        </span>
      </div>

      <div className="space-y-0.5">
        <h3 className="font-display font-semibold text-slate-100">{collection.title}</h3>
        <p className="text-xs text-slate-500">{collection.description}</p>
      </div>

      {previews.length > 0 && (
        <div className="flex gap-2">
          {previews.map((resource) => {
            const meta = subjectMeta(resource.subjectId);
            return (
              <span
                key={resource.id}
                className="h-12 flex-1 rounded-lg border border-slate-700/60 bg-gradient-to-br to-slate-900"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${meta.color}30, ${meta.color}0d)`,
                }}
                title={resource.title}
              />
            );
          })}
        </div>
      )}

      {onSelect && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 transition-colors group-hover:text-indigo-300">
          Open collection
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </Card>
  );

  if (!onSelect) return body;

  return (
    <button
      type="button"
      onClick={() => onSelect(collection)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(collection);
        }
      }}
      className="block w-full rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {body}
    </button>
  );
};
