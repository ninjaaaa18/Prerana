import React from 'react';
import { Bookmark, Clock, FolderOpen, Lightbulb, SearchX } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export type EmptyLibraryVariant =
  | 'none'
  | 'search'
  | 'bookmarks'
  | 'recent'
  | 'recommendations';

export interface EmptyLibraryStateProps {
  variant?: EmptyLibraryVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

const DEFAULTS: Record<EmptyLibraryVariant, { icon: LucideIcon; title: string; description: string }> = {
  none: {
    icon: FolderOpen,
    title: 'No resources found',
    description: 'Try adjusting your filters or search for something else.',
  },
  search: {
    icon: SearchX,
    title: 'No results found',
    description: 'We couldn’t find anything matching your search. Try different keywords.',
  },
  bookmarks: {
    icon: Bookmark,
    title: 'No bookmarks yet',
    description: 'Tap the bookmark icon on any resource to save it here.',
  },
  recent: {
    icon: Clock,
    title: 'No recently viewed',
    description: 'Resources you open will show up here for quick access.',
  },
  recommendations: {
    icon: Lightbulb,
    title: 'No recommendations yet',
    description: 'Complete lessons and assessments to get personalized suggestions.',
  },
};

export const EmptyLibraryState: React.FC<EmptyLibraryStateProps> = ({
  variant = 'none',
  title,
  description,
  icon,
  actionText,
  onAction,
}) => {
  const defaults = DEFAULTS[variant];
  return (
    <EmptyState
      icon={icon ?? <defaults.icon className="h-8 w-8" />}
      title={title ?? defaults.title}
      description={description ?? defaults.description}
      actionText={actionText}
      onAction={onAction}
    />
  );
};
