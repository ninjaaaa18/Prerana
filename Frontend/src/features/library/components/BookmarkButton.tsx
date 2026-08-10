import React from 'react';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked,
  onToggle,
  label,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isBookmarked}
      aria-label={label ?? (isBookmarked ? 'Remove bookmark' : 'Bookmark this resource')}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
        isBookmarked
          ? 'border-indigo-500/40 bg-indigo-600/25 text-indigo-300 hover:bg-indigo-600/40'
          : 'border-slate-700 bg-slate-900/80 text-slate-400 hover:border-slate-600 hover:text-slate-200',
        className
      )}
    >
      <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
    </button>
  );
};
