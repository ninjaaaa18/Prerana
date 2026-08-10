import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Download, Eye, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CATEGORY_ICONS, CATEGORY_LABELS, subjectMeta } from '../data';
import { formatCompact } from '../utils';
import { BookmarkButton } from './BookmarkButton';
import { cn } from '@/lib/utils';
import type { Resource, ResourceDifficulty } from '../types';

export interface ResourceCardProps {
  resource: Resource;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  className?: string;
}

const difficultyVariant: Record<ResourceDifficulty, 'success' | 'warning' | 'destructive'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'destructive',
};

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isBookmarked,
  onToggleBookmark,
  className,
}) => {
  const meta = subjectMeta(resource.subjectId);
  const Icon = CATEGORY_ICONS[resource.category];

  return (
    <Card isHoverable className={cn('group flex flex-col gap-3 p-0', className)}>
      <Link
        to={`/app/library/${resource.id}`}
        className="relative block overflow-hidden"
        aria-label={resource.title}
      >
        <div
          className="flex aspect-video items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${meta.color}3d, ${meta.color}14 55%, ${meta.color}05)`,
          }}
        >
          <Icon className="h-12 w-12 text-slate-100/60" strokeWidth={1.4} />
          <span className="absolute left-3 top-3 rounded-full border border-slate-700/60 bg-slate-950/70 px-2.5 py-0.5 text-[11px] font-semibold text-slate-200 backdrop-blur-sm">
            {CATEGORY_LABELS[resource.category]}
          </span>
          <Badge
            variant={difficultyVariant[resource.difficulty]}
            size="sm"
            className="absolute bottom-3 left-3"
          >
            {resource.difficulty}
          </Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug text-slate-100">
              {resource.title}
            </h3>
            <BookmarkButton
              isBookmarked={isBookmarked}
              onToggle={() => onToggleBookmark(resource.id)}
              className="h-8 w-8 shrink-0"
            />
          </div>
          <p className="text-xs text-slate-500">
            {resource.subject} · {resource.chapter}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold text-slate-300">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {resource.rating.toFixed(1)}
            <span className="font-normal text-slate-500">({resource.ratingCount})</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {formatCompact(resource.views)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {resource.readingMinutes} min
          </span>
          <span className="ml-auto inline-flex items-center gap-1">
            {resource.isDownloaded && (
              <>
                <Download className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Downloaded</span>
              </>
            )}
          </span>
        </div>

        <Link
          to={`/app/library/${resource.id}`}
          className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Open resource
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
};
