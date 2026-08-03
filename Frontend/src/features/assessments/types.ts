import type { LucideIcon } from 'lucide-react';

export type QuestionType =
  | 'mcq'
  | 'true-false'
  | 'fill-blank'
  | 'match'
  | 'ordering'
  | 'short-answer';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type AssessmentStatus = 'available' | 'upcoming' | 'completed';

export interface ChoiceOption {
  id: string;
  label: string;
}

export type AnswerValue = string | boolean | string[] | Record<string, string> | null;

interface BaseQuestion {
  id: string;
  type: QuestionType;
  topic: string;
  prompt: string;
  explanation: string;
  points: number;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: ChoiceOption[];
  correctAnswer: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  correctAnswer: string;
  acceptedAnswers?: string[];
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchQuestion extends BaseQuestion {
  type: 'match';
  pairs: MatchPair[];
}

export interface OrderingItem {
  id: string;
  label: string;
}

export interface OrderingQuestion extends BaseQuestion {
  type: 'ordering';
  items: OrderingItem[];
  correctOrder: string[];
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  correctAnswer: string;
  keywords?: string[];
}

export type Question =
  | MCQQuestion
  | TrueFalseQuestion
  | FillBlankQuestion
  | MatchQuestion
  | OrderingQuestion
  | ShortAnswerQuestion;

export interface TopicBreakdownItem {
  topic: string;
  total: number;
  correct: number;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectId: string;
  chapter: string;
  icon: LucideIcon;
  color: string;
  difficulty: Difficulty;
  durationMinutes: number;
  questionCount: number;
  attemptsAllowed: number;
  attemptsUsed: number;
  status: AssessmentStatus;
  bestScore?: number;
  progress?: number;
  dueAt?: string;
  takenAt?: string;
  topics: string[];
  questions: Question[];
}

export interface AttemptQuestionResult {
  questionId: string;
  question: Question;
  studentAnswer: AnswerValue;
  isCorrect: boolean;
}

export interface AssessmentResult {
  assessmentId: string;
  title: string;
  subject: string;
  color: string;
  score: number;
  totalPoints: number;
  percentage: number;
  grade: string;
  accuracy: number;
  timeTakenSeconds: number;
  correctCount: number;
  totalQuestions: number;
  topicBreakdown: TopicBreakdownItem[];
  answers: AttemptQuestionResult[];
  completedAt: string;
}
