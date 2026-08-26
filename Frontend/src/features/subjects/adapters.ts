import { BookOpen, Calculator, Code2, FlaskConical, Globe2, Languages, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ApiSubject, ApiChapter, ApiLesson } from './content-types';
import type { Subject, Chapter, Lesson, Category } from './types';

const ICON_MAP: Record<string, LucideIcon> = {
  mathematics: Calculator,
  math: Calculator,
  science: FlaskConical,
  'computer science': Code2,
  cs: Code2,
  programming: Code2,
  english: Languages,
  language: Languages,
  languages: Languages,
  'social studies': Globe2,
  history: Globe2,
  geography: Globe2,
  arts: Palette,
  art: Palette,
  creative: Palette,
};

const CATEGORY_MAP: Record<string, Category> = {
  mathematics: 'stem',
  math: 'stem',
  science: 'stem',
  'computer science': 'stem',
  cs: 'stem',
  programming: 'stem',
  english: 'languages',
  language: 'languages',
  languages: 'languages',
  'social studies': 'humanities',
  history: 'humanities',
  geography: 'humanities',
  arts: 'creative',
  art: 'creative',
};

export const getIconForSubject = (title: string): LucideIcon => {
  const lower = title.toLowerCase();
  for (const [key, icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(key)) return icon;
  }
  return BookOpen;
};

const getCategoryForSubject = (title: string): Category => {
  const lower = title.toLowerCase();
  for (const [key, category] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(key)) return category;
  }
  return 'stem';
};

export const adaptApiLesson = (lesson: ApiLesson): Lesson => ({
  id: lesson.id,
  title: lesson.title,
  readingMinutes: lesson.estimatedMinutes,
  type: lesson.type as Lesson['type'],
  isLocked: false,
  isCompleted: false,
});

export const adaptApiChapter = (chapter: ApiChapter): Chapter => ({
  id: chapter.id,
  title: chapter.title,
  description: chapter.description,
  difficulty: 'medium',
  durationMinutes: (chapter.lessons ?? []).reduce(
    (sum, lesson) => sum + lesson.estimatedMinutes,
    0
  ),
  lessons: (chapter.lessons ?? []).map(adaptApiLesson),
});

export const adaptApiSubject = (subject: ApiSubject, chapters?: ApiChapter[]): Subject => ({
  id: subject.id,
  name: subject.title,
  description: subject.description,
  icon: getIconForSubject(subject.title),
  color: subject.color,
  difficulty: 'medium',
  category: getCategoryForSubject(subject.title),
  teacher: subject.author?.name ?? 'Unknown Teacher',
  estimatedHours: 0,
  chapters: (chapters ?? []).map(adaptApiChapter),
});
