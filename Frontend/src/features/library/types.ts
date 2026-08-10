import type { LucideIcon } from 'lucide-react';

export type ResourceCategory =
  | 'pdf'
  | 'notes'
  | 'video'
  | 'presentation'
  | 'image'
  | 'mind-map'
  | 'formula-sheet'
  | 'cheat-sheet'
  | 'practice-worksheet';

export type ResourceDifficulty = 'easy' | 'medium' | 'hard';

export type CollectionId =
  | 'exam-prep'
  | 'quick-revision'
  | 'ai-recommended'
  | 'teacher-picks'
  | 'most-popular'
  | 'recently-added'
  | 'saved';

export interface Resource {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectId: string;
  chapter: string;
  category: ResourceCategory;
  difficulty: ResourceDifficulty;
  author: string;
  readingMinutes: number;
  fileSize: string;
  downloads: number;
  views: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  isBookmarked: boolean;
  isDownloaded: boolean;
  addedAt: string;
  pages?: number;
  slides?: number;
  durationSeconds?: number;
}

export interface ReadingProgress {
  resourceId: string;
  percentage: number;
  lastOpened: string;
  remainingMinutes: number;
}

export interface Collection {
  id: CollectionId;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  resourceIds: string[];
}

export interface CategoryInfo {
  id: ResourceCategory;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface SearchSuggestion {
  id: string;
  label: string;
  type: 'resource' | 'subject' | 'category';
}
