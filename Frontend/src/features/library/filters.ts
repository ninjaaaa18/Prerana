import type { ResourceCategory, ResourceDifficulty } from './types';

export type SortOption = 'recent' | 'views' | 'rating' | 'minutes';

export interface LibraryFilters {
  subjects: string[];
  categories: ResourceCategory[];
  difficulties: ResourceDifficulty[];
  chapter: string;
  onlyBookmarked: boolean;
  onlyDownloaded: boolean;
  onlyRecentlyAdded: boolean;
  sort: SortOption;
}

export const DEFAULT_FILTERS: LibraryFilters = {
  subjects: [],
  categories: [],
  difficulties: [],
  chapter: '',
  onlyBookmarked: false,
  onlyDownloaded: false,
  onlyRecentlyAdded: false,
  sort: 'recent',
};
