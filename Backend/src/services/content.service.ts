import { prisma } from '../database/prisma';
import type { ContentStatus } from '@prisma/client';

export class SubjectError extends Error {
  statusCode: number;
  code: string;
  details?: Record<string, string[]>;

  constructor(message: string, statusCode: number, code: string, details?: Record<string, string[]>) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export interface CreateSubjectInput {
  title: string;
  description?: string;
  color?: string;
  grade?: string;
  order?: number;
}

export interface UpdateSubjectInput {
  title?: string;
  description?: string;
  color?: string;
  grade?: string;
  order?: number;
  status?: ContentStatus;
}

const SELECT_SUBJECT = {
  id: true,
  title: true,
  description: true,
  color: true,
  grade: true,
  order: true,
  status: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
} as const;

const SELECT_CHAPTER = {
  id: true,
  subjectId: true,
  title: true,
  description: true,
  order: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} as const;

const SELECT_LESSON = {
  id: true,
  chapterId: true,
  title: true,
  order: true,
  type: true,
  difficulty: true,
  estimatedMinutes: true,
  learningObjective: true,
  blocks: true,
  tags: true,
  status: true,
  version: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const listPublishedSubjects = async () =>
  prisma.subject.findMany({
    where: { status: 'published' },
    select: { ...SELECT_SUBJECT, author: { select: { name: true } } },
    orderBy: { order: 'asc' },
  });

export const listAllSubjects = async (authorId?: string) =>
  prisma.subject.findMany({
    where: authorId ? { authorId } : {},
    select: { ...SELECT_SUBJECT, author: { select: { name: true } } },
    orderBy: { order: 'asc' },
  });

export const getSubjectById = async (id: string) =>
  prisma.subject.findUnique({
    where: { id },
    select: { ...SELECT_SUBJECT, author: { select: { name: true } } },
  });

export const getSubjectChapters = async (subjectId: string, includeUnpublished: boolean) => {
  const subject = await prisma.subject.findUnique({ where: { id: subjectId }, select: { id: true, status: true } });
  if (!subject) throw new SubjectError('Subject not found', 404, 'NOT_FOUND');

  return prisma.chapter.findMany({
    where: {
      subjectId,
      ...(includeUnpublished ? {} : { status: 'published' }),
    },
    select: {
      ...SELECT_CHAPTER,
      lessons: {
        where: includeUnpublished ? {} : { status: 'published' },
        select: SELECT_LESSON,
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { order: 'asc' },
  });
};

export const createSubject = async (authorId: string, input: CreateSubjectInput) => {
  const maxOrder = await prisma.subject.aggregate({ _max: { order: true } });
  return prisma.subject.create({
    data: {
      title: input.title,
      description: input.description ?? '',
      color: input.color ?? '#6366f1',
      grade: input.grade ?? '',
      order: input.order ?? (maxOrder._max.order ?? 0) + 1,
      authorId,
    },
    select: { ...SELECT_SUBJECT, author: { select: { name: true } } },
  });
};

export const updateSubject = async (id: string, authorId: string, input: UpdateSubjectInput) => {
  const existing = await prisma.subject.findUnique({ where: { id } });
  if (!existing) throw new SubjectError('Subject not found', 404, 'NOT_FOUND');
  if (existing.authorId !== authorId) {
    throw new SubjectError('You do not have permission to modify this subject', 403, 'FORBIDDEN');
  }
  return prisma.subject.update({
    where: { id },
    data: input,
    select: { ...SELECT_SUBJECT, author: { select: { name: true } } },
  });
};

export const createChapter = async (subjectId: string, authorId: string, data: {
  title: string;
  description?: string;
  order?: number;
}) => {
  const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
  if (!subject) throw new SubjectError('Subject not found', 404, 'NOT_FOUND');
  if (subject.authorId !== authorId) {
    throw new SubjectError('You do not have permission to modify this subject', 403, 'FORBIDDEN');
  }

  const maxOrder = await prisma.chapter.aggregate({ _max: { order: true }, where: { subjectId } });
  return prisma.chapter.create({
    data: {
      subjectId,
      title: data.title,
      description: data.description ?? '',
      order: data.order ?? (maxOrder._max.order ?? 0) + 1,
    },
    select: SELECT_CHAPTER,
  });
};

export const updateChapter = async (id: string, authorId: string, data: {
  title?: string;
  description?: string;
  order?: number;
  status?: ContentStatus;
}) => {
  const existing = await prisma.chapter.findUnique({
    where: { id },
    select: { id: true, subject: { select: { authorId: true } } },
  });
  if (!existing) throw new SubjectError('Chapter not found', 404, 'NOT_FOUND');
  if (existing.subject.authorId !== authorId) {
    throw new SubjectError('You do not have permission to modify this chapter', 403, 'FORBIDDEN');
  }
  return prisma.chapter.update({
    where: { id },
    data,
    select: SELECT_CHAPTER,
  });
};

export const getChapterById = async (id: string) =>
  prisma.chapter.findUnique({
    where: { id },
    select: {
      ...SELECT_CHAPTER,
      subject: { select: { id: true, title: true, color: true, authorId: true } },
      lessons: {
        select: SELECT_LESSON,
        orderBy: { order: 'asc' },
      },
    },
  });

export const getPublishedChapterById = async (id: string) =>
  prisma.chapter.findUnique({
    where: { id, status: 'published' },
    select: {
      ...SELECT_CHAPTER,
      subject: { select: { id: true, title: true, color: true } },
      lessons: {
        where: { status: 'published' },
        select: SELECT_LESSON,
        orderBy: { order: 'asc' },
      },
    },
  });

export const createLesson = async (chapterId: string, authorId: string, data: {
  title: string;
  type?: string;
  difficulty?: string;
  estimatedMinutes?: number;
  learningObjective?: string;
  blocks?: unknown;
  tags?: string;
}) => {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    select: { subject: { select: { authorId: true } } },
  });
  if (!chapter) throw new SubjectError('Chapter not found', 404, 'NOT_FOUND');
  if (chapter.subject.authorId !== authorId) {
    throw new SubjectError('You do not have permission to modify this chapter', 403, 'FORBIDDEN');
  }

  const maxOrder = await prisma.lesson.aggregate({ _max: { order: true } });
  return prisma.lesson.create({
    data: {
      chapterId,
      title: data.title,
      type: data.type ?? 'concept',
      difficulty: data.difficulty ?? 'beginner',
      estimatedMinutes: data.estimatedMinutes ?? 10,
      learningObjective: data.learningObjective ?? '',
      blocks: data.blocks ?? [],
      tags: data.tags ?? '',
      order: (maxOrder._max.order ?? 0) + 1,
    },
    select: SELECT_LESSON,
  });
};

export const updateLesson = async (id: string, authorId: string, data: {
  title?: string;
  type?: string;
  difficulty?: string;
  estimatedMinutes?: number;
  learningObjective?: string;
  blocks?: unknown;
  tags?: string;
  status?: ContentStatus;
}) => {
  const existing = await prisma.lesson.findUnique({
    where: { id },
    select: { chapter: { select: { subject: { select: { authorId: true } } } } },
  });
  if (!existing) throw new SubjectError('Lesson not found', 404, 'NOT_FOUND');
  if (existing.chapter.subject.authorId !== authorId) {
    throw new SubjectError('You do not have permission to modify this lesson', 403, 'FORBIDDEN');
  }

  const updateData: Record<string, unknown> = { ...data };
  if (data.status === 'published' || data.status === 'review') {
    const lesson = await prisma.lesson.findUnique({ where: { id }, select: { version: true } });
    if (lesson) updateData.version = lesson.version + 1;
  }

  return prisma.lesson.update({
    where: { id },
    data: updateData,
    select: SELECT_LESSON,
  });
};

export const getLessonById = async (id: string) =>
  prisma.lesson.findUnique({
    where: { id },
    select: {
      ...SELECT_LESSON,
      chapter: {
        select: {
          ...SELECT_CHAPTER,
          subject: { select: { id: true, title: true, color: true, authorId: true } },
        },
      },
    },
  });

export const getPublishedLessonById = async (id: string) =>
  prisma.lesson.findUnique({
    where: { id, status: 'published' },
    select: {
      ...SELECT_LESSON,
      chapter: {
        select: {
          ...SELECT_CHAPTER,
          subject: { select: { id: true, title: true, color: true } },
        },
      },
    },
  });
