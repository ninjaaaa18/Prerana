export type ContentStatusApi = 'draft' | 'review' | 'published' | 'archived';

export interface ApiSubject {
  id: string;
  title: string;
  description: string;
  color: string;
  grade: string;
  order: number;
  status: ContentStatusApi;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: { name: string };
}

export interface ApiChapter {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  order: number;
  status: ContentStatusApi;
  createdAt: string;
  updatedAt: string;
  lessons?: ApiLesson[];
}

export interface ApiLesson {
  id: string;
  chapterId: string;
  title: string;
  type: string;
  difficulty: string;
  estimatedMinutes: number;
  learningObjective: string;
  blocks: ApiLessonBlock[];
  tags: string;
  status: ContentStatusApi;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiLessonBlock {
  id: string;
  type: string;
  content: string;
  label?: string;
  language?: string;
}

export interface ApiChapterWithSubject extends ApiChapter {
  subject: { id: string; title: string; color: string; authorId?: string };
}

export interface ApiLessonWithChapter extends ApiLesson {
  chapter: ApiChapterWithSubject;
}
