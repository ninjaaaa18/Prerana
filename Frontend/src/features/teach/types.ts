import type { LucideIcon } from 'lucide-react';

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';

export type LessonType = 'concept' | 'practice' | 'project' | 'assessment-prep';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type Visibility = 'public' | 'students' | 'private';

export type LessonBlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'video'
  | 'code'
  | 'key-point'
  | 'example'
  | 'question';

export interface LessonBlock {
  id: string;
  type: LessonBlockType;
  content: string;
  label?: string;
  language?: string;
}

export interface TeacherSubject {
  id: string;
  title: string;
  description: string;
  color: string;
  grade: string;
  lastUpdated: string;
}

export interface TeacherChapter {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  status: ContentStatus;
  lessons: TeacherLesson[];
}

export interface TeacherLesson {
  id: string;
  title: string;
  type: LessonType;
  difficulty: Difficulty;
  estimatedMinutes: number;
  status: ContentStatus;
  version: number;
  lastUpdated: string;
  learningObjective: string;
  blocks: LessonBlock[];
  tags: string[];
}

export interface TeacherClass {
  id: string;
  name: string;
  grade: string;
  section: string;
  subjectId: string;
  subject: string;
  studentCount: number;
  completion: number;
  averageScore: number;
  activity: string;
  status: 'active' | 'archived';
  trend: number;
}

export type StudentStatus = 'on-track' | 'ahead' | 'at-risk' | 'inactive';

export interface StudentProgress {
  id: string;
  name: string;
  completion: number;
  averageScore: number;
  lastActive: string;
  status: StudentStatus;
  trend: number;
}

export interface TeacherAssessment {
  id: string;
  title: string;
  subject: string;
  subjectId: string;
  chapter: string;
  questionCount: number;
  difficulty: Difficulty;
  attempts: number;
  averageScore: number;
  status: ContentStatus;
  lastUpdated: string;
  durationMinutes: number;
  passingScore: number;
}

export type TeacherQuestionType =
  | 'mcq'
  | 'true-false'
  | 'fill-blank'
  | 'match'
  | 'ordering'
  | 'short-answer';

export interface MatchPair {
  left: string;
  right: string;
}

export type TeacherQuestion =
  | { id: string; type: 'mcq'; prompt: string; options: string[]; correctIndex: number }
  | { id: string; type: 'true-false'; prompt: string; answer: boolean }
  | { id: string; type: 'fill-blank'; prompt: string; answer: string }
  | { id: string; type: 'match'; prompt: string; pairs: MatchPair[] }
  | { id: string; type: 'ordering'; prompt: string; items: string[] }
  | { id: string; type: 'short-answer'; prompt: string; sampleAnswer: string };

export type TeacherActivityType =
  | 'lesson-created'
  | 'assessment-published'
  | 'student-completed'
  | 'draft-updated'
  | 'class-updated';

export interface TeacherActivity {
  id: string;
  type: TeacherActivityType;
  title: string;
  description: string;
  time: string;
}

export interface DraftContent {
  id: string;
  title: string;
  subject: string;
  kind: 'lesson' | 'assessment' | 'chapter';
  lastEdited: string;
  status: ContentStatus;
}

export interface TeacherStat {
  id: string;
  label: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
}

export interface AttentionItem {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface TopicPerformance {
  id: string;
  name: string;
  performance: number;
  trend: number;
}

export interface ChapterPerformance {
  id: string;
  name: string;
  completion: number;
  averageScore: number;
}

export interface SubjectPerformance {
  id: string;
  name: string;
  color: string;
  averageScore: number;
  completion: number;
}

export interface TeacherProfile {
  name: string;
  role: string;
  streak: number;
  classCount: number;
  motivation: string;
}
