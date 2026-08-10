import {
  Bookmark,
  ClipboardList,
  Clock,
  FileCheck2,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Network,
  NotebookPen,
  Presentation,
  Sigma,
  Sparkles,
  Star,
  TrendingUp,
  Video,
  Zap,
  Calculator,
  Code2,
  FlaskConical,
  Globe2,
  Languages,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type {
  CategoryInfo,
  Collection,
  CollectionId,
  ReadingProgress,
  Resource,
  ResourceCategory,
  ResourceDifficulty,
  SearchSuggestion,
} from './types';

export interface SubjectMeta {
  id: string;
  name: string;
  color: string;
  icon: LucideIcon;
}

export const SUBJECTS: SubjectMeta[] = [
  { id: 'mathematics', name: 'Mathematics', color: '#6366f1', icon: Calculator },
  { id: 'science', name: 'Science', color: '#10b981', icon: FlaskConical },
  { id: 'computer-science', name: 'Computer Science', color: '#0ea5e9', icon: Code2 },
  { id: 'english', name: 'English', color: '#f43f5e', icon: Languages },
  { id: 'social-studies', name: 'Social Studies', color: '#f59e0b', icon: Globe2 },
];

export const subjectMeta = (subjectId: string): SubjectMeta =>
  SUBJECTS.find((subject) => subject.id === subjectId) ?? SUBJECTS[0];

export const CATEGORIES: CategoryInfo[] = [
  { id: 'pdf', label: 'PDFs', description: 'Full documents & chapters', icon: FileText, color: '#0ea5e9' },
  { id: 'notes', label: 'Notes', description: 'Detailed study notes', icon: NotebookPen, color: '#6366f1' },
  { id: 'video', label: 'Videos', description: 'Video lessons & explainers', icon: Video, color: '#f43f5e' },
  { id: 'presentation', label: 'Presentations', description: 'Slides & decks', icon: Presentation, color: '#f59e0b' },
  { id: 'image', label: 'Images', description: 'Diagrams & visual aids', icon: ImageIcon, color: '#8b5cf6' },
  { id: 'mind-map', label: 'Mind Maps', description: 'Concepts at a glance', icon: Network, color: '#10b981' },
  { id: 'formula-sheet', label: 'Formula Sheets', description: 'Key formulas together', icon: Sigma, color: '#06b6d4' },
  { id: 'cheat-sheet', label: 'Cheat Sheets', description: 'Quick-reference cards', icon: FileCheck2, color: '#14b8a6' },
  { id: 'practice-worksheet', label: 'Practice', description: 'Worksheets & drills', icon: ClipboardList, color: '#f97316' },
];

export const CATEGORY_LABELS: Record<ResourceCategory, string> = CATEGORIES.reduce(
  (acc, category) => ({ ...acc, [category.id]: category.label }),
  {} as Record<ResourceCategory, string>
);

export const CATEGORY_ICONS: Record<ResourceCategory, LucideIcon> = CATEGORIES.reduce(
  (acc, category) => ({ ...acc, [category.id]: category.icon }),
  {} as Record<ResourceCategory, LucideIcon>
);

const AUTHORS = [
  'Ms. Priya Iyer',
  'Mr. Arjun Rao',
  'Ms. Meera Nair',
  'Dr. Kavita Menon',
  'Mr. Rohan Gupta',
  'Ms. Ananya Singh',
  'Prof. Vikram Joshi',
  'Ms. Shreya Desai',
  'Dr. Neha Bhatt',
];

const DIFFICULTY_LABELS: Record<ResourceDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export interface ResourceSeed {
  id: string;
  title: string;
  subjectId: string;
  chapter: string;
  category: ResourceCategory;
  difficulty: ResourceDifficulty;
  readingMinutes: number;
  rating: number;
  tags: string[];
}

const RESOURCE_SEEDS: ResourceSeed[] = [
  // Mathematics
  { id: 'r-01', title: 'Quadratic Equations — Formula Sheet', subjectId: 'mathematics', chapter: 'Quadratic Equations', category: 'formula-sheet', difficulty: 'medium', readingMinutes: 12, rating: 4.8, tags: ['algebra', 'quadratics', 'formulas'] },
  { id: 'r-02', title: 'Real Numbers — Complete Notes', subjectId: 'mathematics', chapter: 'Real Numbers', category: 'notes', difficulty: 'easy', readingMinutes: 35, rating: 4.6, tags: ['number system', 'irrational', 'notes'] },
  { id: 'r-03', title: 'Introduction to Trigonometry', subjectId: 'mathematics', chapter: 'Trigonometry', category: 'presentation', difficulty: 'medium', readingMinutes: 18, rating: 4.5, tags: ['trigonometry', 'angles', 'slides'] },
  { id: 'r-04', title: 'Pair of Linear Equations — Cheat Sheet', subjectId: 'mathematics', chapter: 'Linear Equations', category: 'cheat-sheet', difficulty: 'easy', readingMinutes: 8, rating: 4.7, tags: ['algebra', 'linear', 'quick'] },
  { id: 'r-05', title: 'Triangles — Practice Worksheet', subjectId: 'mathematics', chapter: 'Triangles', category: 'practice-worksheet', difficulty: 'hard', readingMinutes: 40, rating: 4.2, tags: ['geometry', 'triangles', 'practice'] },
  { id: 'r-06', title: 'The Quadratic Formula — Video', subjectId: 'mathematics', chapter: 'Quadratic Equations', category: 'video', difficulty: 'medium', readingMinutes: 22, rating: 4.9, tags: ['video', 'quadratics', 'explainer'] },
  { id: 'r-07', title: 'Number System — Mind Map', subjectId: 'mathematics', chapter: 'Real Numbers', category: 'mind-map', difficulty: 'easy', readingMinutes: 10, rating: 4.4, tags: ['mind map', 'revision'] },
  { id: 'r-08', title: 'Statistics — Bar Graphs & Histograms', subjectId: 'mathematics', chapter: 'Statistics', category: 'image', difficulty: 'easy', readingMinutes: 6, rating: 4.0, tags: ['statistics', 'graphs', 'charts'] },
  { id: 'r-09', title: 'Euclid’s Geometry — Full PDF', subjectId: 'mathematics', chapter: 'Geometry Basics', category: 'pdf', difficulty: 'medium', readingMinutes: 45, rating: 4.3, tags: ['geometry', 'euclid', 'pdf'] },
  { id: 'r-10', title: 'Coordinate Geometry — Concept Map', subjectId: 'mathematics', chapter: 'Coordinate Geometry', category: 'mind-map', difficulty: 'medium', readingMinutes: 12, rating: 4.5, tags: ['coordinate', 'mind map'] },
  { id: 'r-11', title: 'Probability — Worked Examples', subjectId: 'mathematics', chapter: 'Probability', category: 'pdf', difficulty: 'hard', readingMinutes: 30, rating: 4.1, tags: ['probability', 'examples', 'pdf'] },
  { id: 'r-12', title: 'Surface Areas & Volumes — Formula Sheet', subjectId: 'mathematics', chapter: 'Mensuration', category: 'formula-sheet', difficulty: 'hard', readingMinutes: 10, rating: 4.8, tags: ['mensuration', 'formulas'] },

  // Science
  { id: 'r-13', title: 'Photosynthesis Explained — Video', subjectId: 'science', chapter: 'Photosynthesis', category: 'video', difficulty: 'easy', readingMinutes: 18, rating: 4.7, tags: ['biology', 'video', 'plants'] },
  { id: 'r-14', title: 'Cell Structure — Labelled Diagram', subjectId: 'science', chapter: 'Cell Structure', category: 'image', difficulty: 'easy', readingMinutes: 5, rating: 4.3, tags: ['biology', 'cell', 'diagram'] },
  { id: 'r-15', title: 'Force & Laws of Motion — Notes', subjectId: 'science', chapter: 'Force & Laws of Motion', category: 'notes', difficulty: 'medium', readingMinutes: 30, rating: 4.4, tags: ['physics', 'motion', 'notes'] },
  { id: 'r-16', title: 'Electricity — Complete Cheat Sheet', subjectId: 'science', chapter: 'Electricity', category: 'cheat-sheet', difficulty: 'hard', readingMinutes: 9, rating: 4.6, tags: ['physics', 'electricity', 'quick'] },
  { id: 'r-17', title: 'Acids, Bases & Salts — Mind Map', subjectId: 'science', chapter: 'Acids & Bases', category: 'mind-map', difficulty: 'medium', readingMinutes: 12, rating: 4.2, tags: ['chemistry', 'mind map'] },
  { id: 'r-18', title: "Newton's Laws — Practice Sheet", subjectId: 'science', chapter: 'Force & Laws of Motion', category: 'practice-worksheet', difficulty: 'hard', readingMinutes: 35, rating: 4.0, tags: ['physics', 'newton', 'practice'] },
  { id: 'r-19', title: 'Matter in Our Surroundings — Slides', subjectId: 'science', chapter: 'Matter', category: 'presentation', difficulty: 'easy', readingMinutes: 15, rating: 4.1, tags: ['chemistry', 'matter', 'slides'] },
  { id: 'r-20', title: 'The Human Eye — Diagram Pack', subjectId: 'science', chapter: 'The Human Eye', category: 'image', difficulty: 'medium', readingMinutes: 8, rating: 4.2, tags: ['biology', 'eye', 'diagrams'] },
  { id: 'r-21', title: 'Chemical Reactions — Formula Sheet', subjectId: 'science', chapter: 'Chemical Reactions', category: 'formula-sheet', difficulty: 'hard', readingMinutes: 12, rating: 4.5, tags: ['chemistry', 'reactions', 'formulas'] },
  { id: 'r-22', title: 'Photosynthesis — Lab Notes', subjectId: 'science', chapter: 'Photosynthesis', category: 'notes', difficulty: 'medium', readingMinutes: 20, rating: 4.4, tags: ['biology', 'lab', 'notes'] },
  { id: 'r-23', title: 'Sound — Properties & Waves', subjectId: 'science', chapter: 'Sound', category: 'pdf', difficulty: 'medium', readingMinutes: 28, rating: 4.0, tags: ['physics', 'sound', 'pdf'] },

  // Computer Science
  { id: 'r-24', title: 'Python Basics — Full Notes', subjectId: 'computer-science', chapter: 'Python Basics', category: 'notes', difficulty: 'easy', readingMinutes: 40, rating: 4.6, tags: ['python', 'programming', 'notes'] },
  { id: 'r-25', title: 'Python Loops — Cheat Sheet', subjectId: 'computer-science', chapter: 'Loops & Conditions', category: 'cheat-sheet', difficulty: 'easy', readingMinutes: 8, rating: 4.5, tags: ['python', 'loops', 'quick'] },
  { id: 'r-26', title: 'Functions in Python — Video', subjectId: 'computer-science', chapter: 'Functions', category: 'video', difficulty: 'medium', readingMinutes: 25, rating: 4.3, tags: ['python', 'video', 'functions'] },
  { id: 'r-27', title: 'Data Types — Quick Reference', subjectId: 'computer-science', chapter: 'Data Types', category: 'pdf', difficulty: 'easy', readingMinutes: 12, rating: 4.2, tags: ['python', 'data types', 'reference'] },
  { id: 'r-28', title: 'HTML & CSS Crash Course', subjectId: 'computer-science', chapter: 'HTML & CSS', category: 'presentation', difficulty: 'medium', readingMinutes: 20, rating: 4.4, tags: ['web', 'html', 'slides'] },
  { id: 'r-29', title: 'Python Project Ideas', subjectId: 'computer-science', chapter: 'Functions', category: 'notes', difficulty: 'medium', readingMinutes: 15, rating: 4.1, tags: ['python', 'projects', 'ideas'] },
  { id: 'r-30', title: 'Flowcharts & Pseudocode — Mind Map', subjectId: 'computer-science', chapter: 'Algorithms', category: 'mind-map', difficulty: 'medium', readingMinutes: 10, rating: 4.0, tags: ['algorithms', 'flowchart', 'mind map'] },
  { id: 'r-31', title: 'Variables — Practice Worksheet', subjectId: 'computer-science', chapter: 'Data Types', category: 'practice-worksheet', difficulty: 'easy', readingMinutes: 30, rating: 3.9, tags: ['python', 'variables', 'practice'] },
  { id: 'r-32', title: 'Recursion Visualized', subjectId: 'computer-science', chapter: 'Functions', category: 'image', difficulty: 'hard', readingMinutes: 7, rating: 4.3, tags: ['recursion', 'visual', 'image'] },
  { id: 'r-33', title: 'Debugging — Cheat Sheet', subjectId: 'computer-science', chapter: 'Loops & Conditions', category: 'cheat-sheet', difficulty: 'medium', readingMinutes: 9, rating: 4.4, tags: ['debugging', 'quick', 'python'] },

  // English
  { id: 'r-34', title: 'Parts of Speech — Grammar Notes', subjectId: 'english', chapter: 'Grammar', category: 'notes', difficulty: 'easy', readingMinutes: 25, rating: 4.5, tags: ['grammar', 'parts of speech', 'notes'] },
  { id: 'r-35', title: 'Essay Writing — Step by Step', subjectId: 'english', chapter: 'Essay Writing', category: 'presentation', difficulty: 'medium', readingMinutes: 18, rating: 4.4, tags: ['essay', 'writing', 'slides'] },
  { id: 'r-36', title: 'Reading Comprehension Practice', subjectId: 'english', chapter: 'Reading Comprehension', category: 'practice-worksheet', difficulty: 'medium', readingMinutes: 30, rating: 4.2, tags: ['reading', 'comprehension', 'practice'] },
  { id: 'r-37', title: 'Poetry Analysis — Poem Pack', subjectId: 'english', chapter: 'Poetry', category: 'pdf', difficulty: 'medium', readingMinutes: 20, rating: 4.1, tags: ['poetry', 'analysis', 'pdf'] },
  { id: 'r-38', title: 'Vocabulary Builder — Flashcards', subjectId: 'english', chapter: 'Vocabulary', category: 'image', difficulty: 'easy', readingMinutes: 10, rating: 4.3, tags: ['vocabulary', 'flashcards'] },
  { id: 'r-39', title: 'Tenses — Cheat Sheet', subjectId: 'english', chapter: 'Grammar', category: 'cheat-sheet', difficulty: 'easy', readingMinutes: 8, rating: 4.6, tags: ['tenses', 'grammar', 'quick'] },
  { id: 'r-40', title: 'Letter Writing — Formats', subjectId: 'english', chapter: 'Essay Writing', category: 'pdf', difficulty: 'easy', readingMinutes: 15, rating: 4.0, tags: ['letter', 'writing', 'formats'] },
  { id: 'r-41', title: 'Figures of Speech — Mind Map', subjectId: 'english', chapter: 'Poetry', category: 'mind-map', difficulty: 'medium', readingMinutes: 12, rating: 4.2, tags: ['poetry', 'figures of speech', 'mind map'] },
  { id: 'r-42', title: 'Listening Practice — Audio Worksheet', subjectId: 'english', chapter: 'Vocabulary', category: 'practice-worksheet', difficulty: 'easy', readingMinutes: 25, rating: 3.8, tags: ['listening', 'worksheet'] },
  { id: 'r-43', title: 'Story Writing — Best Examples', subjectId: 'english', chapter: 'Essay Writing', category: 'notes', difficulty: 'hard', readingMinutes: 35, rating: 4.4, tags: ['story', 'writing', 'examples'] },

  // Social Studies
  { id: 'r-44', title: 'The Indian Constitution — Overview', subjectId: 'social-studies', chapter: 'The Constitution', category: 'pdf', difficulty: 'medium', readingMinutes: 40, rating: 4.5, tags: ['civics', 'constitution', 'pdf'] },
  { id: 'r-45', title: 'Democracy — Civics Notes', subjectId: 'social-studies', chapter: 'Democracy & Elections', category: 'notes', difficulty: 'easy', readingMinutes: 25, rating: 4.2, tags: ['civics', 'democracy', 'notes'] },
  { id: 'r-46', title: 'The Industrial Revolution', subjectId: 'social-studies', chapter: 'Industrial Revolution', category: 'presentation', difficulty: 'medium', readingMinutes: 22, rating: 4.3, tags: ['history', 'revolution', 'slides'] },
  { id: 'r-47', title: 'Climate of India — Mind Map', subjectId: 'social-studies', chapter: 'Climate', category: 'mind-map', difficulty: 'easy', readingMinutes: 12, rating: 4.0, tags: ['geography', 'climate', 'mind map'] },
  { id: 'r-48', title: 'Ancient India — Timeline Poster', subjectId: 'social-studies', chapter: 'Ancient India', category: 'image', difficulty: 'easy', readingMinutes: 8, rating: 4.4, tags: ['history', 'timeline', 'poster'] },
  { id: 'r-49', title: 'Geography — Practice Worksheet', subjectId: 'social-studies', chapter: 'Physical Geography', category: 'practice-worksheet', difficulty: 'medium', readingMinutes: 28, rating: 3.9, tags: ['geography', 'worksheet'] },
  { id: 'r-50', title: 'Fundamental Rights — Cheat Sheet', subjectId: 'social-studies', chapter: 'The Constitution', category: 'cheat-sheet', difficulty: 'easy', readingMinutes: 8, rating: 4.6, tags: ['civics', 'rights', 'quick'] },
  { id: 'r-51', title: 'Map Skills — Video Lesson', subjectId: 'social-studies', chapter: 'Physical Geography', category: 'video', difficulty: 'medium', readingMinutes: 20, rating: 4.1, tags: ['geography', 'maps', 'video'] },
  { id: 'r-52', title: 'Understanding Secularism', subjectId: 'social-studies', chapter: 'Democracy & Elections', category: 'pdf', difficulty: 'hard', readingMinutes: 30, rating: 4.0, tags: ['civics', 'secularism', 'pdf'] },
  { id: 'r-53', title: 'World Wars — Quick Revision', subjectId: 'social-studies', chapter: 'World Wars', category: 'notes', difficulty: 'hard', readingMinutes: 35, rating: 4.2, tags: ['history', 'world wars', 'revision'] },
  { id: 'r-54', title: 'Natural Resources — Data Sheet', subjectId: 'social-studies', chapter: 'Natural Resources', category: 'image', difficulty: 'easy', readingMinutes: 6, rating: 4.0, tags: ['geography', 'resources', 'data'] },
];

const BOOKMARKED_IDS = new Set([
  'r-01',
  'r-06',
  'r-13',
  'r-24',
  'r-39',
  'r-44',
  'r-50',
  'r-16',
  'r-35',
]);

const DOWNLOADED_IDS = new Set([
  'r-04',
  'r-08',
  'r-14',
  'r-17',
  'r-20',
  'r-27',
  'r-33',
  'r-38',
  'r-46',
  'r-51',
  'r-53',
]);

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function addedDate(dayIndex: number): string {
  const date = new Date(2026, 6, 30);
  date.setDate(date.getDate() - dayIndex * 2 - Math.floor(dayIndex / 3));
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, 2026`;
}

const categorySize = (category: ResourceCategory): string => {
  const rand = mulberry32(category.length * 97);
  if (category === 'video') return `${40 + Math.floor(rand() * 310)} MB`;
  if (category === 'presentation') return `${2 + Math.floor(rand() * 16)} MB`;
  if (category === 'image') return `${0.8 + Math.floor(rand() * 4)} MB`;
  if (category === 'pdf') return `${0.6 + Math.floor(rand() * 8)} MB`;
  if (category === 'notes') return `${0.5 + Math.floor(rand() * 6)} MB`;
  return `${0.2 + Math.floor(rand() * 2)} MB`;
};

const categoryPages = (category: ResourceCategory): number | undefined => {
  if (category === 'pdf') return 8 + Math.floor(Math.random() * 40);
  if (category === 'notes') return 6 + Math.floor(Math.random() * 34);
  if (category === 'practice-worksheet') return 3 + Math.floor(Math.random() * 9);
  return undefined;
};

const categorySlides = (category: ResourceCategory): number | undefined =>
  category === 'presentation' ? 12 + Math.floor(Math.random() * 24) : undefined;

const categoryDuration = (category: ResourceCategory): number | undefined =>
  category === 'video' ? 300 + Math.floor(Math.random() * 1200) : undefined;

export const RESOURCES: Resource[] = RESOURCE_SEEDS.map((seed, index) => {
  const rand = mulberry32(index * 73 + 11);
  const downloads = 140 + Math.floor(rand() * 4800);
  const views = downloads * (3 + Math.floor(rand() * 5));
  const ratingCount = 15 + Math.floor(rand() * 380);
  const subject = subjectMeta(seed.subjectId).name;

  return {
    ...seed,
    subject,
    description: `${seed.chapter} study resource for ${subject}. Includes clear explanations, worked examples and practice material curated for quick learning.`,
    author: AUTHORS[index % AUTHORS.length],
    fileSize: categorySize(seed.category),
    downloads,
    views,
    rating: seed.rating,
    ratingCount,
    isBookmarked: BOOKMARKED_IDS.has(seed.id),
    isDownloaded: DOWNLOADED_IDS.has(seed.id),
    addedAt: addedDate(index),
    pages: categoryPages(seed.category),
    slides: categorySlides(seed.category),
    durationSeconds: categoryDuration(seed.category),
  };
});

export const READINGS: ReadingProgress[] = [
  { resourceId: 'r-02', percentage: 65, lastOpened: '2 hours ago', remainingMinutes: 12 },
  { resourceId: 'r-13', percentage: 30, lastOpened: 'Yesterday', remainingMinutes: 13 },
  { resourceId: 'r-24', percentage: 80, lastOpened: '2 days ago', remainingMinutes: 8 },
  { resourceId: 'r-44', percentage: 45, lastOpened: '3 days ago', remainingMinutes: 22 },
];

export const RECENTLY_OPENED_IDS: string[] = [
  'r-02',
  'r-06',
  'r-13',
  'r-24',
  'r-03',
  'r-44',
  'r-39',
  'r-16',
];

export const RECENT_SEARCHES: string[] = [
  'quadratic formula',
  'python loops',
  'photosynthesis',
  'tenses',
];

export const POPULAR_SEARCHES: string[] = [
  'cheat sheet',
  'mind map',
  'trigonometry',
  'constitution',
  'formula sheet',
];

export const getResourceById = (id: string): Resource | undefined =>
  RESOURCES.find((resource) => resource.id === id);

export const getResourcesByIds = (ids: string[]): Resource[] =>
  ids
    .map((id) => getResourceById(id))
    .filter((resource): resource is Resource => Boolean(resource));

export const getBookmarked = (): Resource[] => RESOURCES.filter((resource) => resource.isBookmarked);

export const getContinueReading = (): Array<Resource & ReadingProgress> =>
  READINGS.map((reading) => {
    const resource = getResourceById(reading.resourceId);
    if (!resource) return null;
    return { ...resource, ...reading };
  })
    .filter((item): item is Resource & ReadingProgress => Boolean(item))
    .sort((a, b) => a.percentage - b.percentage);

export const getRecentlyOpened = (): Resource[] => getResourcesByIds(RECENTLY_OPENED_IDS);

export const getByCategory = (category: ResourceCategory): Resource[] =>
  RESOURCES.filter((resource) => resource.category === category);

export const getTopRated = (limit = 8): Resource[] =>
  [...RESOURCES].sort((a, b) => b.rating - a.rating).slice(0, limit);

export const getRecommended = (): Resource[] =>
  getResourcesByIds([
    'r-06',
    'r-12',
    'r-13',
    'r-24',
    'r-35',
    'r-44',
    'r-50',
    'r-01',
  ]);

export const getPopular = (): Resource[] => [...RESOURCES].sort((a, b) => b.views - a.views).slice(0, 8);

export const searchResources = (query: string): Resource[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return RESOURCES.filter((resource) =>
    [resource.title, resource.subject, resource.chapter, resource.author, ...resource.tags]
      .join(' ')
      .toLowerCase()
      .includes(q)
  );
};

export const getSuggestions = (query: string): SearchSuggestion[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const resources = searchResources(q).slice(0, 5).map((resource) => ({
    id: resource.id,
    label: resource.title,
    type: 'resource' as const,
  }));
  const subjects = SUBJECTS.filter((subject) => subject.name.toLowerCase().includes(q))
    .slice(0, 2)
    .map((subject) => ({ id: subject.id, label: `Browse ${subject.name}`, type: 'subject' as const }));
  const categories = CATEGORIES.filter((category) => category.label.toLowerCase().includes(q))
    .slice(0, 2)
    .map((category) => ({ id: category.id, label: `${category.label}`, type: 'category' as const }));
  return [...resources, ...subjects, ...categories];
};

export const getRelated = (resource: Resource, limit = 3): Resource[] => {
  const sameSubject = RESOURCES.filter(
    (candidate) => candidate.subjectId === resource.subjectId && candidate.id !== resource.id
  );
  return sameSubject.slice(0, limit);
};

export const COLLECTIONS: Collection[] = [
  {
    id: 'exam-prep',
    title: 'Exam Preparation',
    description: 'Hard-hitting sheets to ace your exams',
    icon: GraduationCap,
    color: '#f43f5e',
    resourceIds: ['r-05', 'r-11', 'r-12', 'r-18', 'r-21', 'r-52'],
  },
  {
    id: 'quick-revision',
    title: 'Quick Revision',
    description: 'Formula, cheat sheets & mind maps',
    icon: Zap,
    color: '#f59e0b',
    resourceIds: ['r-01', 'r-04', 'r-07', 'r-16', 'r-17', 'r-25', 'r-39', 'r-50'],
  },
  {
    id: 'ai-recommended',
    title: 'AI Recommended',
    description: 'Chosen for you by AI Studio',
    icon: Sparkles,
    color: '#8b5cf6',
    resourceIds: ['r-06', 'r-13', 'r-24', 'r-35', 'r-44', 'r-47'],
  },
  {
    id: 'teacher-picks',
    title: 'Teacher Picks',
    description: 'Handpicked by your teachers',
    icon: Star,
    color: '#6366f1',
    resourceIds: ['r-02', 'r-09', 'r-15', 'r-22', 'r-34', 'r-53'],
  },
  {
    id: 'most-popular',
    title: 'Most Popular',
    description: 'Loved by thousands of learners',
    icon: TrendingUp,
    color: '#10b981',
    resourceIds: getPopular().map((resource) => resource.id),
  },
  {
    id: 'recently-added',
    title: 'Recently Added',
    description: 'Fresh resources just for you',
    icon: Clock,
    color: '#0ea5e9',
    resourceIds: [...RESOURCES]
      .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
      .slice(0, 8)
      .map((resource) => resource.id),
  },
  {
    id: 'saved',
    title: 'Saved Resources',
    description: 'Everything you’ve bookmarked',
    icon: Bookmark,
    color: '#06b6d4',
    resourceIds: [...BOOKMARKED_IDS],
  },
];

export const getCollectionById = (id: CollectionId): Collection | undefined =>
  COLLECTIONS.find((collection) => collection.id === id);

export const getCollectionResources = (collectionId: CollectionId): Resource[] => {
  const collection = getCollectionById(collectionId);
  return collection ? getResourcesByIds(collection.resourceIds) : [];
};

export const getBookmarkedCount = (): number => BOOKMARKED_IDS.size;

export { DIFFICULTY_LABELS };
