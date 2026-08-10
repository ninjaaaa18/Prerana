import React from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { Button } from '@/components/ui/button';
import { LibraryHero } from '../components/LibraryHero';
import { LibrarySection } from '../components/LibrarySection';
import { CategoryGrid } from '../components/CategoryGrid';
import { CollectionGrid } from '../components/CollectionGrid';
import { ContinueReadingCard } from '../components/ContinueReadingCard';
import { ResourceGrid } from '../components/ResourceGrid';
import { ResourceCard } from '../components/ResourceCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { DEFAULT_FILTERS, type LibraryFilters } from '../filters';
import {
  CATEGORIES,
  COLLECTIONS,
  POPULAR_SEARCHES,
  RECENT_SEARCHES,
  RESOURCES,
  getCollectionResources,
  getContinueReading,
  getPopular,
  getRecommended,
  getRecentlyOpened,
  getSuggestions,
  searchResources,
} from '../data';
import type { Collection, ResourceCategory, SearchSuggestion } from '../types';

const recentAddedIds = [...RESOURCES]
  .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
  .slice(0, 8)
  .map((resource) => resource.id);

const chapters = [...new Set(RESOURCES.map((resource) => resource.chapter))].sort();

const categoryCounts = RESOURCES.reduce<Record<string, number>>((counts, resource) => {
  counts[resource.category] = (counts[resource.category] ?? 0) + 1;
  return counts;
}, {});

const hasActiveFilters = (filters: LibraryFilters): boolean =>
  filters.subjects.length > 0 ||
  filters.categories.length > 0 ||
  filters.difficulties.length > 0 ||
  filters.chapter !== '' ||
  filters.onlyBookmarked ||
  filters.onlyDownloaded ||
  filters.onlyRecentlyAdded;

export const LibraryPage: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [submittedQuery, setSubmittedQuery] = React.useState('');
  const [filters, setFilters] = React.useState<LibraryFilters>(DEFAULT_FILTERS);
  const [bookmarked, setBookmarked] = React.useState<Set<string>>(
    () => new Set(RESOURCES.filter((resource) => resource.isBookmarked).map((resource) => resource.id))
  );
  const [selectedCollection, setSelectedCollection] = React.useState<Collection | null>(null);

  const toggleBookmark = (id: string): void => {
    setBookmarked((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = (value: string): void => {
    setSubmittedQuery(value.trim());
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion): void => {
    if (suggestion.type === 'subject') {
      setFilters((previous) => ({ ...previous, subjects: [suggestion.id] }));
      setSubmittedQuery(suggestion.label);
      return;
    }
    if (suggestion.type === 'category') {
      setFilters((previous) => ({ ...previous, categories: [suggestion.id as ResourceCategory] }));
      setSubmittedQuery(suggestion.label);
      return;
    }
    setQuery(suggestion.label);
    setSubmittedQuery(suggestion.label);
  };

  const updateFilters = (patch: Partial<LibraryFilters>): void => {
    setFilters((previous) => ({ ...previous, ...patch }));
  };

  const clearFilters = (): void => {
    setFilters(DEFAULT_FILTERS);
    setSubmittedQuery('');
    setQuery('');
  };

  const results = React.useMemo(() => {
    let list = submittedQuery ? searchResources(submittedQuery) : [...RESOURCES];

    if (filters.subjects.length > 0) {
      list = list.filter((resource) => filters.subjects.includes(resource.subjectId));
    }
    if (filters.categories.length > 0) {
      list = list.filter((resource) => filters.categories.includes(resource.category));
    }
    if (filters.difficulties.length > 0) {
      list = list.filter((resource) => filters.difficulties.includes(resource.difficulty));
    }
    if (filters.chapter) {
      list = list.filter((resource) => resource.chapter === filters.chapter);
    }
    if (filters.onlyBookmarked) {
      list = list.filter((resource) => bookmarked.has(resource.id));
    }
    if (filters.onlyDownloaded) {
      list = list.filter((resource) => resource.isDownloaded);
    }
    if (filters.onlyRecentlyAdded) {
      list = list.filter((resource) => recentAddedIds.includes(resource.id));
    }

    switch (filters.sort) {
      case 'views':
        list = [...list].sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'minutes':
        list = [...list].sort((a, b) => a.readingMinutes - b.readingMinutes);
        break;
      default:
        list = [...list].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    }

    return list;
  }, [submittedQuery, filters, bookmarked]);

  const inResults = submittedQuery.trim() !== '' || hasActiveFilters(filters);
  const continueReading = getContinueReading();
  const recentlyOpened = getRecentlyOpened();
  const bookmarkedResources = RESOURCES.filter((resource) => bookmarked.has(resource.id));
  const suggestions = React.useMemo(() => getSuggestions(query), [query]);

  const collectionResources =
    selectedCollection && selectedCollection.id === 'saved'
      ? bookmarkedResources
      : selectedCollection
        ? getCollectionResources(selectedCollection.id)
        : [];

  return (
    <div className="space-y-10">
      <LibraryHero
        resourceCount={RESOURCES.length}
        categoryCount={CATEGORIES.length}
        bookmarkedCount={bookmarked.size}
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        suggestions={suggestions}
        recentSearches={RECENT_SEARCHES}
        popularSearches={POPULAR_SEARCHES}
        onSelectSuggestion={handleSelectSuggestion}
      />

      {selectedCollection ? (
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => setSelectedCollection(null)}
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to library
          </button>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${selectedCollection.color}1f`, color: selectedCollection.color }}
              >
                <selectedCollection.icon className="h-7 w-7" />
              </span>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
                  {selectedCollection.title}
                </h1>
                <p className="text-sm text-slate-400">{selectedCollection.description}</p>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              {collectionResources.length} resource{collectionResources.length === 1 ? '' : 's'}
            </p>
          </div>
          <ResourceGrid
            resources={collectionResources}
            bookmarkedIds={bookmarked}
            onToggleBookmark={toggleBookmark}
            emptyVariant="bookmarks"
          />
        </div>
      ) : inResults ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-100">
                {submittedQuery ? `Results for “${submittedQuery}”` : 'Filtered resources'}
              </h1>
              <p className="text-sm text-slate-400">
                {results.length} resource{results.length === 1 ? '' : 's'} found
              </p>
            </div>
            <Button variant="outline" size="sm" rightIcon={<X className="h-4 w-4" />} onClick={clearFilters}>
              Clear all
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <FilterSidebar
              filters={filters}
              chapters={chapters}
              onChange={updateFilters}
              onReset={clearFilters}
              className="h-fit lg:sticky lg:top-24"
            />
            <ResourceGrid
              resources={results}
              bookmarkedIds={bookmarked}
              onToggleBookmark={toggleBookmark}
              emptyVariant={submittedQuery ? 'search' : 'none'}
            />
          </div>
        </div>
      ) : (
        <>
          <LibrarySection
            title="Collections"
            subtitle="Curated bundles for every goal"
          >
            <Reveal>
              <CollectionGrid
                collections={COLLECTIONS}
                onSelect={(collection) => setSelectedCollection(collection)}
              />
            </Reveal>
          </LibrarySection>

          {continueReading.length > 0 && (
            <LibrarySection
              title="Continue Reading"
              subtitle="Pick up right where you left off"
              horizontal
            >
              {continueReading.map((item) => (
                <ContinueReadingCard key={item.id} item={item} />
              ))}
            </LibrarySection>
          )}

          {recentlyOpened.length > 0 && (
            <LibrarySection
              title="Recently Opened"
              subtitle="Jump back into your latest sessions"
              horizontal
            >
              {recentlyOpened.map((resource) => (
                <div key={resource.id} className="w-64 shrink-0 snap-start sm:w-72">
                  <ResourceCard
                    resource={resource}
                    isBookmarked={bookmarked.has(resource.id)}
                    onToggleBookmark={toggleBookmark}
                    className="h-full"
                  />
                </div>
              ))}
            </LibrarySection>
          )}

          <LibrarySection title="Browse by Category" subtitle="Nine ways to study, all in one place">
            <Reveal>
              <CategoryGrid counts={categoryCounts} />
            </Reveal>
          </LibrarySection>

          <LibrarySection
            title="Recommended for You"
            subtitle="Personalised picks based on your learning"
          >
            <Reveal>
              <ResourceGrid
                resources={getRecommended()}
                bookmarkedIds={bookmarked}
                onToggleBookmark={toggleBookmark}
              />
            </Reveal>
          </LibrarySection>

          <LibrarySection title="Popular Right Now" subtitle="The most-loved resources this week">
            <Reveal>
              <ResourceGrid
                resources={getPopular()}
                bookmarkedIds={bookmarked}
                onToggleBookmark={toggleBookmark}
              />
            </Reveal>
          </LibrarySection>

          <LibrarySection
            title="Your Bookmarks"
            subtitle="Everything you’ve saved for later"
          >
            <Reveal>
              <ResourceGrid
                resources={bookmarkedResources}
                bookmarkedIds={bookmarked}
                onToggleBookmark={toggleBookmark}
                emptyVariant="bookmarks"
              />
            </Reveal>
          </LibrarySection>

          <LibrarySection
            title="AI Recommended"
            subtitle="Chosen for you by AI Studio"
          >
            <Reveal>
              <ResourceGrid
                resources={getCollectionResources('ai-recommended')}
                bookmarkedIds={bookmarked}
                onToggleBookmark={toggleBookmark}
              />
            </Reveal>
          </LibrarySection>

          <LibrarySection title="Teacher Picks" subtitle="Handpicked by your teachers">
            <Reveal>
              <ResourceGrid
                resources={getCollectionResources('teacher-picks')}
                bookmarkedIds={bookmarked}
                onToggleBookmark={toggleBookmark}
              />
            </Reveal>
          </LibrarySection>

          <LibrarySection title="Recently Added" subtitle="Fresh resources just for you">
            <Reveal>
              <ResourceGrid
                resources={getCollectionResources('recently-added')}
                bookmarkedIds={bookmarked}
                onToggleBookmark={toggleBookmark}
              />
            </Reveal>
          </LibrarySection>
        </>
      )}
    </div>
  );
};
