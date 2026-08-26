import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validateRequest';
import {
  listSubjectsController,
  getSubjectController,
  getSubjectChaptersController,
  createSubjectController,
  updateSubjectController,
  createChapterController,
  updateChapterController,
  getChapterController,
  createLessonController,
  updateLessonController,
  getLessonController,
} from '../controllers/content.controller';

const router = Router();

const uuidParam = (name: string) =>
  param(name).isUUID().withMessage(`${name} must be a valid UUID`);

const subjectTitle = body('title')
  .trim()
  .isLength({ min: 1, max: 200 })
  .withMessage('Title is required (max 200 characters)');

const optionalString = (field: string, max: number) =>
  body(field).optional().trim().isLength({ max }).withMessage(`${field} must be at most ${max} characters`);

const optionalColor = body('color')
  .optional()
  .trim()
  .matches(/^#[0-9a-fA-F]{6}$/)
  .withMessage('Color must be a valid hex color');

const optionalOrder = body('order')
  .optional()
  .isInt({ min: 0 })
  .withMessage('Order must be a non-negative integer');

const optionalStatus = body('status')
  .optional()
  .isIn(['draft', 'review', 'published', 'archived'])
  .withMessage('Status must be draft, review, published, or archived');

const optionalMinutes = body('estimatedMinutes')
  .optional()
  .isInt({ min: 1, max: 999 })
  .withMessage('Estimated minutes must be between 1 and 999');

const optionalVersion = body('version')
  .optional()
  .isInt({ min: 1 })
  .withMessage('Version must be a positive integer');

// --- Public / role-aware subject routes ---
router.get(
  '/subjects',
  authenticateToken,
  listSubjectsController
);

router.get(
  '/subjects/:subjectId',
  authenticateToken,
  uuidParam('subjectId'),
  validateRequest,
  getSubjectController
);

router.get(
  '/subjects/:subjectId/chapters',
  authenticateToken,
  uuidParam('subjectId'),
  validateRequest,
  getSubjectChaptersController
);

// --- Teacher/Admin subject management ---
router.post(
  '/subjects',
  authenticateToken,
  subjectTitle,
  optionalString('description', 2000),
  optionalColor,
  optionalString('grade', 100),
  optionalOrder,
  validateRequest,
  createSubjectController
);

router.patch(
  '/subjects/:subjectId',
  authenticateToken,
  uuidParam('subjectId'),
  body('title').optional().trim().isLength({ min: 1, max: 200 }),
  optionalString('description', 2000),
  optionalColor,
  optionalString('grade', 100),
  optionalOrder,
  optionalStatus,
  validateRequest,
  updateSubjectController
);

// --- Teacher/Admin chapter management ---
router.post(
  '/subjects/:subjectId/chapters',
  authenticateToken,
  uuidParam('subjectId'),
  subjectTitle,
  optionalString('description', 2000),
  optionalOrder,
  validateRequest,
  createChapterController
);

router.get(
  '/chapters/:chapterId',
  authenticateToken,
  uuidParam('chapterId'),
  validateRequest,
  getChapterController
);

router.patch(
  '/chapters/:chapterId',
  authenticateToken,
  uuidParam('chapterId'),
  body('title').optional().trim().isLength({ min: 1, max: 200 }),
  optionalString('description', 2000),
  optionalOrder,
  optionalStatus,
  validateRequest,
  updateChapterController
);

// --- Teacher/Admin lesson management ---
router.post(
  '/chapters/:chapterId/lessons',
  authenticateToken,
  uuidParam('chapterId'),
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required'),
  optionalString('type', 50),
  optionalString('difficulty', 50),
  optionalMinutes,
  optionalString('learningObjective', 2000),
  body('blocks').optional().isArray(),
  optionalString('tags', 500),
  validateRequest,
  createLessonController
);

router.get(
  '/lessons/:lessonId',
  authenticateToken,
  uuidParam('lessonId'),
  validateRequest,
  getLessonController
);

router.patch(
  '/lessons/:lessonId',
  authenticateToken,
  uuidParam('lessonId'),
  body('title').optional().trim().isLength({ min: 1, max: 200 }),
  optionalString('type', 50),
  optionalString('difficulty', 50),
  optionalMinutes,
  optionalString('learningObjective', 2000),
  body('blocks').optional().isArray(),
  optionalString('tags', 500),
  optionalStatus,
  optionalVersion,
  validateRequest,
  updateLessonController
);

export default router;
