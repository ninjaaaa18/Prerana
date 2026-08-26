import type { ApiSubject, ApiChapter, ApiLesson } from '../subjects/content-types';
import type { TeacherSubject, TeacherChapter, TeacherLesson } from './types';

const timeAgo = (dateStr: string): string => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
};

export const adaptApiSubjectToTeacher = (subject: ApiSubject): TeacherSubject => ({
  id: subject.id,
  title: subject.title,
  description: subject.description,
  color: subject.color,
  grade: subject.grade || 'General',
  lastUpdated: timeAgo(subject.updatedAt),
});

export const adaptApiChapterToTeacher = (chapter: ApiChapter): TeacherChapter => ({
  id: chapter.id,
  subjectId: chapter.subjectId,
  title: chapter.title,
  description: chapter.description,
  status: chapter.status,
  lessons: (chapter.lessons ?? []).map(adaptApiLessonToTeacher),
});

export const adaptApiLessonToTeacher = (lesson: ApiLesson): TeacherLesson => ({
  id: lesson.id,
  title: lesson.title,
  type: lesson.type as TeacherLesson['type'],
  difficulty: lesson.difficulty as TeacherLesson['difficulty'],
  estimatedMinutes: lesson.estimatedMinutes,
  status: lesson.status,
  version: lesson.version,
  lastUpdated: timeAgo(lesson.updatedAt),
  learningObjective: lesson.learningObjective,
  blocks: (lesson.blocks ?? []).map((b, i) => ({
    id: b.id || `b-${i}`,
    type: b.type as TeacherLesson['blocks'][number]['type'],
    content: b.content,
    ...(b.label ? { label: b.label } : {}),
    ...(b.language ? { language: b.language } : {}),
  })),
  tags: lesson.tags ? lesson.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
});

interface PartialChapter {
  lessons?: Array<{ status: string }>;
}

export const getSubjectTotalsFromChapters = (
  chapters: PartialChapter[]
): { chapters: number; lessons: number; published: number; drafts: number } => {
  const allLessons = chapters.flatMap((ch) => ch.lessons ?? []);
  return {
    chapters: chapters.length,
    lessons: allLessons.length,
    published: allLessons.filter((l) => l.status === 'published').length,
    drafts: allLessons.filter((l) => l.status !== 'published').length,
  };
};
