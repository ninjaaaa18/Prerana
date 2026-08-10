import React from 'react';
import {
  Bookmark,
  Check,
  Download,
  Eye,
  Layers,
  Share2,
  Star,
  Timer,
  User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { DIFFICULTY_LABELS, CATEGORY_LABELS, subjectMeta } from '../data';
import type { ReadingProgress, Resource } from '../types';

export interface ResourceDetailCardProps {
  resource: Resource;
  progress?: ReadingProgress;
  isBookmarked: boolean;
  isDownloaded: boolean;
  onToggleBookmark: () => void;
  onToggleDownload: () => void;
  onContinueReading?: () => void;
  className?: string;
}

const MetaItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center gap-2 text-sm text-slate-300">
    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</span>
    <span>{value}</span>
  </div>
);

export const ResourceDetailCard: React.FC<ResourceDetailCardProps> = ({
  resource,
  progress,
  isBookmarked,
  isDownloaded,
  onToggleBookmark,
  onToggleDownload,
  onContinueReading,
  className,
}) => {
  const subject = subjectMeta(resource.subjectId);
  const CategoryIcon = subject.icon;

  const formatViews = (views: number): string =>
    views >= 1000 ? `${(views / 1000).toFixed(1)}k` : String(views);

  return (
    <Card className={className}>
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1.5"
              style={{ backgroundColor: `${subject.color}1f`, color: subject.color, borderColor: `${subject.color}40` }}
            >
              <CategoryIcon className="h-3 w-3" />
              {resource.subject}
            </Badge>
            <Badge variant="outline">{CATEGORY_LABELS[resource.category]}</Badge>
            <Badge variant="secondary">{DIFFICULTY_LABELS[resource.difficulty]}</Badge>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
            {resource.title}
          </h1>
          <p className="text-sm leading-relaxed text-slate-400">{resource.description}</p>
        </div>

        {progress && (
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-indigo-200">Continue reading</span>
              <span className="text-indigo-300">{Math.round(progress.percentage)}% complete</span>
            </div>
            <ProgressBar value={progress.percentage} />
            <p className="mt-2 text-xs text-indigo-300/80">
              {Math.ceil(progress.remainingMinutes)} min left · last opened {progress.lastOpened}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          <MetaItem label="Chapter" value={resource.chapter} />
          <MetaItem label="Category" value={CATEGORY_LABELS[resource.category]} />
          <MetaItem label="Added" value={resource.addedAt} />
          <MetaItem label="File size" value={resource.fileSize} />
          {typeof resource.pages === 'number' && <MetaItem label="Pages" value={String(resource.pages)} />}
          {typeof resource.slides === 'number' && <MetaItem label="Slides" value={String(resource.slides)} />}
          {typeof resource.durationSeconds === 'number' && (
            <MetaItem
              label="Duration"
              value={`${Math.round(resource.durationSeconds / 60)} min`}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-5 sm:grid-cols-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-300">{formatViews(resource.views)} views</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-300">{formatViews(resource.downloads)} downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm text-slate-300">
              {resource.rating.toFixed(1)}
              <span className="text-slate-500"> ({resource.ratingCount})</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-300">{resource.readingMinutes} min</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
              style={{ backgroundColor: `${subject.color}26`, color: subject.color }}
            >
              {resource.author.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-200">{resource.author}</p>
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <User className="h-3 w-3" />
                Resource author
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={isBookmarked ? 'primary' : 'outline'}
              size="sm"
              leftIcon={isBookmarked ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              onClick={onToggleBookmark}
            >
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </Button>
            <Button
              variant={isDownloaded ? 'secondary' : 'outline'}
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={onToggleDownload}
            >
              {isDownloaded ? 'Downloaded' : 'Download'}
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Share2 className="h-4 w-4" />}>
              Share
            </Button>
            {progress && (
              <Button size="sm" leftIcon={<Layers className="h-4 w-4" />} onClick={onContinueReading}>
                Resume
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
