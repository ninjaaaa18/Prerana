import type { LucideIcon } from 'lucide-react';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ChapterStatus = 'not-started' | 'in-progress' | 'completed';

export type LessonType = 'reading' | 'video' | 'quiz' | 'mindmap' | 'interactive';

export type Category = 'stem' | 'languages' | 'humanities' | 'creative';

export interface Lesson {
  id: string;
  title: string;
  readingMinutes: number;
  type: LessonType;
  isLocked: boolean;
  isCompleted: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  durationMinutes: number;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  difficulty: Difficulty;
  category: Category;
  teacher: string;
  estimatedHours: number;
  chapters: Chapter[];
}

export interface SubjectTotals {
  chaptersTotal: number;
  lessonsTotal: number;
  lessonsCompleted: number;
  progress: number;
}
