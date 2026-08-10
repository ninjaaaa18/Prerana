import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { Button } from '@/components/ui/button';
import { ResourcePreview } from '../components/ResourcePreview';
import { ResourceDetailCard } from '../components/ResourceDetailCard';
import { LibrarySection } from '../components/LibrarySection';
import { ResourceGrid } from '../components/ResourceGrid';
import { EmptyLibraryState } from '../components/EmptyLibraryState';
import { getRelated, getResourceById, READINGS } from '../data';

export const ResourcePage: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const resource = resourceId ? getResourceById(resourceId) : undefined;

  const [bookmarked, setBookmarked] = React.useState<Set<string>>(
    () => new Set(resource?.isBookmarked ? [resource.id] : [])
  );
  const [downloaded, setDownloaded] = React.useState<Set<string>>(
    () => new Set(resource?.isDownloaded ? [resource.id] : [])
  );

  React.useEffect(() => {
    if (resource) {
      setBookmarked(new Set(resource.isBookmarked ? [resource.id] : []));
      setDownloaded(new Set(resource.isDownloaded ? [resource.id] : []));
    }
  }, [resource]);

  if (!resource) {
    return (
      <div className="space-y-6">
        <Link
          to="/app/library"
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to library
        </Link>
        <EmptyLibraryState
          variant="none"
          title="Resource not found"
          description="This resource may have been removed or the link is incorrect."
          actionText="Browse the library"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  const toggleBookmark = (id: string): void => {
    setBookmarked((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleDownload = (id: string): void => {
    setDownloaded((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = READINGS.find((reading) => reading.resourceId === resource.id);
  const related = getRelated(resource, 4);
  const isBookmarked = bookmarked.has(resource.id);
  const isDownloaded = downloaded.has(resource.id);

  return (
    <div className="space-y-10">
      <Link
        to="/app/library"
        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to library
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-24">
          <ResourcePreview resource={resource} />
          <div className="mt-4 hidden lg:block">
            <Button
              variant="outline"
              className="w-full"
              leftIcon={<Bookmark className={isBookmarked ? 'h-4 w-4 fill-current' : 'h-4 w-4'} />}
              onClick={() => toggleBookmark(resource.id)}
            >
              {isBookmarked ? 'Bookmarked — tap to remove' : 'Bookmark this resource'}
            </Button>
          </div>
        </Reveal>

        <ResourceDetailCard
          resource={resource}
          progress={progress}
          isBookmarked={isBookmarked}
          isDownloaded={isDownloaded}
          onToggleBookmark={() => toggleBookmark(resource.id)}
          onToggleDownload={() => toggleDownload(resource.id)}
        />
      </div>

      {related.length > 0 && (
        <LibrarySection title="Related Resources" subtitle={`More from ${resource.subject}`}>
          <Reveal>
            <ResourceGrid
              resources={related}
              bookmarkedIds={bookmarked}
              onToggleBookmark={toggleBookmark}
            />
          </Reveal>
        </LibrarySection>
      )}
    </div>
  );
};
