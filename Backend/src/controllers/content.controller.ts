import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.middleware';
import {
  SubjectError,
  listPublishedSubjects,
  listAllSubjects,
  getSubjectById,
  getSubjectChapters,
  createSubject,
  updateSubject,
  createChapter,
  updateChapter,
  getChapterById,
  getPublishedChapterById,
  createLesson,
  updateLesson,
  getLessonById,
  getPublishedLessonById,
} from '../services/content.service';

const handleError = (res: Response, error: unknown): void => {
  if (error instanceof SubjectError) {
    res.status(error.statusCode).json({
      status: 'error',
      code: error.code,
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    });
    return;
  }
  res.status(500).json({
    status: 'error',
    code: 'INTERNAL_ERROR',
    message: 'Internal Server Error',
  });
};

const getStringParam = (value: string | string[]): string =>
  Array.isArray(value) ? value[0] : value;

export const listSubjectsController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role === 'teacher' || req.user?.role === 'admin') {
      const subjects = await listAllSubjects(req.user.role === 'teacher' ? req.user.id : undefined);
      res.json({ data: subjects });
      return;
    }
    const subjects = await listPublishedSubjects();
    res.json({ data: subjects });
  } catch (error) {
    handleError(res, error);
  }
};

export const getSubjectController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjectId = getStringParam(req.params.subjectId);
    const subject = await getSubjectById(subjectId);
    if (!subject) {
      res.status(404).json({ status: 'error', code: 'NOT_FOUND', message: 'Subject not found' });
      return;
    }
    if (subject.status !== 'published' && subject.authorId !== req.user?.id && req.user?.role !== 'admin') {
      res.status(404).json({ status: 'error', code: 'NOT_FOUND', message: 'Subject not found' });
      return;
    }
    res.json({ data: subject });
  } catch (error) {
    handleError(res, error);
  }
};

export const getSubjectChaptersController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjectId = getStringParam(req.params.subjectId);
    const includeUnpublished = req.user?.role === 'teacher' || req.user?.role === 'admin';
    const chapters = await getSubjectChapters(subjectId, includeUnpublished);
    res.json({ data: chapters });
  } catch (error) {
    handleError(res, error);
  }
};

export const createSubjectController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
      return;
    }
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      res.status(403).json({ status: 'error', code: 'FORBIDDEN', message: 'Only teachers and admins can create subjects' });
      return;
    }
    const subject = await createSubject(req.user.id, req.body);
    res.status(201).json({ data: subject });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateSubjectController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
      return;
    }
    const subjectId = getStringParam(req.params.subjectId);
    const subject = await updateSubject(subjectId, req.user.id, req.body);
    res.json({ data: subject });
  } catch (error) {
    handleError(res, error);
  }
};

export const createChapterController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
      return;
    }
    const subjectId = getStringParam(req.params.subjectId);
    const chapter = await createChapter(subjectId, req.user.id, req.body);
    res.status(201).json({ data: chapter });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateChapterController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
      return;
    }
    const chapterId = getStringParam(req.params.chapterId);
    const chapter = await updateChapter(chapterId, req.user.id, req.body);
    res.json({ data: chapter });
  } catch (error) {
    handleError(res, error);
  }
};

export const getChapterController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const chapterId = getStringParam(req.params.chapterId);
    const includeUnpublished = req.user?.role === 'teacher' || req.user?.role === 'admin';
    const chapter = includeUnpublished
      ? await getChapterById(chapterId)
      : await getPublishedChapterById(chapterId);
    if (!chapter) {
      res.status(404).json({ status: 'error', code: 'NOT_FOUND', message: 'Chapter not found' });
      return;
    }
    res.json({ data: chapter });
  } catch (error) {
    handleError(res, error);
  }
};

export const createLessonController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
      return;
    }
    const chapterId = getStringParam(req.params.chapterId);
    const lesson = await createLesson(chapterId, req.user.id, req.body);
    res.status(201).json({ data: lesson });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateLessonController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
      return;
    }
    const lessonId = getStringParam(req.params.lessonId);
    const lesson = await updateLesson(lessonId, req.user.id, req.body);
    res.json({ data: lesson });
  } catch (error) {
    handleError(res, error);
  }
};

export const getLessonController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lessonId = getStringParam(req.params.lessonId);
    const includeUnpublished = req.user?.role === 'teacher' || req.user?.role === 'admin';
    const lesson = includeUnpublished
      ? await getLessonById(lessonId)
      : await getPublishedLessonById(lessonId);
    if (!lesson) {
      res.status(404).json({ status: 'error', code: 'NOT_FOUND', message: 'Lesson not found' });
      return;
    }
    res.json({ data: lesson });
  } catch (error) {
    handleError(res, error);
  }
};
