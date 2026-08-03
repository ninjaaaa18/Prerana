import { Calculator, Code2, FlaskConical, Globe2, Languages, Palette } from 'lucide-react';
import type { Chapter, ChapterStatus, Subject, SubjectTotals } from './types';

export function getChapterProgress(chapter: Chapter): number {
  const total = chapter.lessons.length;
  if (total === 0) return 0;
  const done = chapter.lessons.filter((lesson) => lesson.isCompleted).length;
  return Math.round((done / total) * 100);
}

export function getChapterStatus(chapter: Chapter): ChapterStatus {
  if (chapter.lessons.length > 0 && chapter.lessons.every((lesson) => lesson.isCompleted)) {
    return 'completed';
  }
  if (chapter.lessons.some((lesson) => lesson.isCompleted)) return 'in-progress';
  return 'not-started';
}

export function getSubjectTotals(subject: Subject): SubjectTotals {
  const lessonsTotal = subject.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
  const lessonsCompleted = subject.chapters.reduce(
    (total, chapter) => total + chapter.lessons.filter((lesson) => lesson.isCompleted).length,
    0
  );
  const progress = lessonsTotal === 0 ? 0 : Math.round((lessonsCompleted / lessonsTotal) * 100);
  return {
    chaptersTotal: subject.chapters.length,
    lessonsTotal,
    lessonsCompleted,
    progress,
  };
}

export const SUBJECTS: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description:
      'Build a strong foundation in numbers, algebra, and geometry. Every formula becomes a tool to solve real-world problems.',
    icon: Calculator,
    color: '#6366f1',
    difficulty: 'medium',
    category: 'stem',
    teacher: 'Ms. Priya Iyer',
    estimatedHours: 60,
    chapters: [
      {
        id: 'math-real-numbers',
        title: 'Real Numbers',
        description: 'Explore the number line from natural numbers to irrationals and the rules that bind them.',
        difficulty: 'easy',
        durationMinutes: 45,
        lessons: [
          { id: 'rn-1', title: 'Understanding Rational Numbers', readingMinutes: 12, type: 'reading', isLocked: false, isCompleted: true },
          { id: 'rn-2', title: 'Irrational Numbers & the Number Line', readingMinutes: 14, type: 'video', isLocked: false, isCompleted: true },
          { id: 'rn-3', title: 'Operations with Real Numbers', readingMinutes: 12, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'rn-4', title: 'Real Numbers Quick Quiz', readingMinutes: 7, type: 'quiz', isLocked: false, isCompleted: false },
        ],
      },
      {
        id: 'math-linear-equations',
        title: 'Linear Equations in Two Variables',
        description: 'Learn to plot and solve pairs of linear equations graphically and algebraically.',
        difficulty: 'medium',
        durationMinutes: 60,
        lessons: [
          { id: 'le-1', title: 'Plotting Linear Graphs', readingMinutes: 12, type: 'interactive', isLocked: false, isCompleted: true },
          { id: 'le-2', title: 'Substitution Method', readingMinutes: 16, type: 'video', isLocked: false, isCompleted: false },
          { id: 'le-3', title: 'Elimination Method Practice', readingMinutes: 16, type: 'interactive', isLocked: false, isCompleted: false },
          { id: 'le-4', title: 'Linear Equations Quiz', readingMinutes: 8, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'math-quadratics',
        title: 'Quadratic Equations',
        description: 'Master the quadratic formula, roots, and the discriminant — the heart of algebra.',
        difficulty: 'hard',
        durationMinutes: 75,
        lessons: [
          { id: 'qe-1', title: 'Introduction to Quadratics', readingMinutes: 12, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'qe-2', title: 'The Quadratic Formula', readingMinutes: 18, type: 'video', isLocked: false, isCompleted: false },
          { id: 'qe-3', title: 'Roots & the Discriminant', readingMinutes: 15, type: 'mindmap', isLocked: true, isCompleted: false },
          { id: 'qe-4', title: 'Quadratic Equations Test', readingMinutes: 20, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'math-coordinate-geometry',
        title: 'Coordinate Geometry',
        description: 'Connect algebra with shapes using the Cartesian plane and the distance formula.',
        difficulty: 'medium',
        durationMinutes: 50,
        lessons: [
          { id: 'cg-1', title: 'The Cartesian Plane', readingMinutes: 10, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'cg-2', title: 'Distance Formula', readingMinutes: 14, type: 'video', isLocked: false, isCompleted: false },
          { id: 'cg-3', title: 'Coordinate Geometry Quiz', readingMinutes: 8, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    description:
      'Discover how the world works — from tiny cells to forces in motion. Curiosity is your starting point.',
    icon: FlaskConical,
    color: '#10b981',
    difficulty: 'medium',
    category: 'stem',
    teacher: 'Mr. Rahul Verma',
    estimatedHours: 55,
    chapters: [
      {
        id: 'sci-matter',
        title: 'Matter Around Us',
        description: 'What is everything made of? Study states of matter and how substances change.',
        difficulty: 'easy',
        durationMinutes: 50,
        lessons: [
          { id: 'ma-1', title: 'States of Matter', readingMinutes: 12, type: 'reading', isLocked: false, isCompleted: true },
          { id: 'ma-2', title: 'Changes of State', readingMinutes: 15, type: 'video', isLocked: false, isCompleted: true },
          { id: 'ma-3', title: 'Matter Lab Interactive', readingMinutes: 18, type: 'interactive', isLocked: false, isCompleted: false },
          { id: 'ma-4', title: 'Matter Quick Quiz', readingMinutes: 8, type: 'quiz', isLocked: false, isCompleted: false },
        ],
      },
      {
        id: 'sci-cell',
        title: 'Cell — The Unit of Life',
        description: 'Zoom into the building blocks of every living thing and learn what each part does.',
        difficulty: 'medium',
        durationMinutes: 55,
        lessons: [
          { id: 'ce-1', title: 'Animal & Plant Cells', readingMinutes: 13, type: 'reading', isLocked: false, isCompleted: true },
          { id: 'ce-2', title: 'Organelles Explained', readingMinutes: 16, type: 'video', isLocked: false, isCompleted: false },
          { id: 'ce-3', title: 'Cell Diagram Mind Map', readingMinutes: 14, type: 'mindmap', isLocked: false, isCompleted: false },
          { id: 'ce-4', title: 'Cells Quiz', readingMinutes: 8, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'sci-force-motion',
        title: 'Force & Motion',
        description: 'Understand pushes and pulls, inertia, and Newton\u2019s laws through fun experiments.',
        difficulty: 'medium',
        durationMinutes: 60,
        lessons: [
          { id: 'fm-1', title: 'Types of Forces', readingMinutes: 14, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'fm-2', title: "Newton's Laws", readingMinutes: 18, type: 'video', isLocked: false, isCompleted: false },
          { id: 'fm-3', title: 'Force Simulator', readingMinutes: 16, type: 'interactive', isLocked: true, isCompleted: false },
          { id: 'fm-4', title: 'Force & Motion Quiz', readingMinutes: 10, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'sci-photosynthesis',
        title: 'Photosynthesis & Respiration',
        description: 'Follow the flow of energy through plants and animals in life\u2019s oldest cycle.',
        difficulty: 'hard',
        durationMinutes: 65,
        lessons: [
          { id: 'ph-1', title: 'Photosynthesis Basics', readingMinutes: 15, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'ph-2', title: 'Respiration vs Photosynthesis', readingMinutes: 17, type: 'mindmap', isLocked: true, isCompleted: false },
          { id: 'ph-3', title: 'Energy Flow Quiz', readingMinutes: 10, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    description:
      'Think like a programmer. Write your first lines of Python and build a tiny corner of the web.',
    icon: Code2,
    color: '#0ea5e9',
    difficulty: 'medium',
    category: 'stem',
    teacher: 'Ms. Ananya Desai',
    estimatedHours: 50,
    chapters: [
      {
        id: 'cs-computers-code',
        title: 'Computers & Code',
        description: 'See what happens inside a computer and run your very first program.',
        difficulty: 'easy',
        durationMinutes: 45,
        lessons: [
          { id: 'cc-1', title: 'What is a Computer?', readingMinutes: 10, type: 'reading', isLocked: false, isCompleted: true },
          { id: 'cc-2', title: 'How Programs Run', readingMinutes: 14, type: 'video', isLocked: false, isCompleted: true },
          { id: 'cc-3', title: 'Python: First Program', readingMinutes: 15, type: 'interactive', isLocked: false, isCompleted: false },
          { id: 'cc-4', title: 'Basics Quiz', readingMinutes: 7, type: 'quiz', isLocked: false, isCompleted: false },
        ],
      },
      {
        id: 'cs-python-basics',
        title: 'Python Basics',
        description: 'Variables, conditionals, and loops — the building blocks of every Python program.',
        difficulty: 'easy',
        durationMinutes: 50,
        lessons: [
          { id: 'pb-1', title: 'Variables & Data Types', readingMinutes: 12, type: 'interactive', isLocked: false, isCompleted: true },
          { id: 'pb-2', title: 'Conditionals', readingMinutes: 14, type: 'video', isLocked: false, isCompleted: false },
          { id: 'pb-3', title: 'Loops in Python', readingMinutes: 16, type: 'interactive', isLocked: false, isCompleted: false },
          { id: 'pb-4', title: 'Python Basics Quiz', readingMinutes: 8, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'cs-functions',
        title: 'Functions & Logic',
        description: 'Package your code into reusable functions and sharpen your logical thinking.',
        difficulty: 'medium',
        durationMinutes: 55,
        lessons: [
          { id: 'fn-1', title: 'Defining Functions', readingMinutes: 14, type: 'interactive', isLocked: false, isCompleted: false },
          { id: 'fn-2', title: 'Logical Operators', readingMinutes: 12, type: 'video', isLocked: false, isCompleted: false },
          { id: 'fn-3', title: 'Functions Challenge', readingMinutes: 18, type: 'interactive', isLocked: true, isCompleted: false },
          { id: 'fn-4', title: 'Functions Quiz', readingMinutes: 8, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'cs-web',
        title: 'Introduction to the Web',
        description: 'Structure pages with HTML and bring them to life with a little CSS.',
        difficulty: 'medium',
        durationMinutes: 60,
        lessons: [
          { id: 'we-1', title: 'HTML Structure', readingMinutes: 12, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'we-2', title: 'Styling with CSS', readingMinutes: 16, type: 'interactive', isLocked: true, isCompleted: false },
          { id: 'we-3', title: 'Build a Tiny Web Page', readingMinutes: 20, type: 'interactive', isLocked: true, isCompleted: false },
          { id: 'we-4', title: 'Web Basics Quiz', readingMinutes: 9, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'english',
    name: 'English',
    description:
      'Read with insight and write with confidence — from grammar foundations to your first short story.',
    icon: Languages,
    color: '#f43f5e',
    difficulty: 'easy',
    category: 'languages',
    teacher: 'Mr. Arjun Nair',
    estimatedHours: 40,
    chapters: [
      {
        id: 'eng-grammar',
        title: 'Grammar Foundations',
        description: 'Master the parts of speech and tenses that hold every sentence together.',
        difficulty: 'easy',
        durationMinutes: 45,
        lessons: [
          { id: 'gr-1', title: 'Parts of Speech', readingMinutes: 11, type: 'reading', isLocked: false, isCompleted: true },
          { id: 'gr-2', title: 'Tenses Made Simple', readingMinutes: 14, type: 'video', isLocked: false, isCompleted: true },
          { id: 'gr-3', title: 'Grammar Practice', readingMinutes: 12, type: 'interactive', isLocked: false, isCompleted: false },
          { id: 'gr-4', title: 'Grammar Quiz', readingMinutes: 8, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'eng-reading',
        title: 'Reading Comprehension',
        description: 'Spot the main idea, read between the lines, and answer with evidence.',
        difficulty: 'medium',
        durationMinutes: 50,
        lessons: [
          { id: 'rc-1', title: 'Finding the Main Idea', readingMinutes: 13, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'rc-2', title: 'Inference Skills', readingMinutes: 15, type: 'video', isLocked: false, isCompleted: false },
          { id: 'rc-3', title: 'Comprehension Exercise', readingMinutes: 16, type: 'interactive', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'eng-creative-writing',
        title: 'Creative Writing',
        description: 'Structure stories, paint scenes with words, and write a tale that is yours.',
        difficulty: 'medium',
        durationMinutes: 55,
        lessons: [
          { id: 'cw-1', title: 'Story Structure', readingMinutes: 12, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'cw-2', title: "Show, Don't Tell", readingMinutes: 15, type: 'video', isLocked: true, isCompleted: false },
          { id: 'cw-3', title: 'Your First Short Story', readingMinutes: 20, type: 'interactive', isLocked: true, isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    description:
      'Travel through ancient civilizations, map the world, and understand the rights that shape a democracy.',
    icon: Globe2,
    color: '#f59e0b',
    difficulty: 'medium',
    category: 'humanities',
    teacher: 'Ms. Kavita Rao',
    estimatedHours: 45,
    chapters: [
      {
        id: 'ss-ancient',
        title: 'Ancient Civilizations',
        description: 'Walk the streets of the Indus Valley and the banks of the Nile.',
        difficulty: 'medium',
        durationMinutes: 55,
        lessons: [
          { id: 'an-1', title: 'The Indus Valley', readingMinutes: 14, type: 'reading', isLocked: false, isCompleted: true },
          { id: 'an-2', title: 'Egypt & the Nile', readingMinutes: 15, type: 'video', isLocked: false, isCompleted: false },
          { id: 'an-3', title: 'Civilizations Timeline', readingMinutes: 13, type: 'mindmap', isLocked: false, isCompleted: false },
          { id: 'an-4', title: 'Ancient World Quiz', readingMinutes: 8, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'ss-geography',
        title: 'Geography Essentials',
        description: 'Read maps, decode directions, and compare the climates of our planet.',
        difficulty: 'easy',
        durationMinutes: 50,
        lessons: [
          { id: 'ge-1', title: 'Maps & Directions', readingMinutes: 12, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'ge-2', title: 'Climate Zones', readingMinutes: 15, type: 'video', isLocked: false, isCompleted: false },
          { id: 'ge-3', title: 'Read a Topographic Map', readingMinutes: 14, type: 'interactive', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'ss-constitution',
        title: 'The Indian Constitution',
        description: 'Discover how a nation was built on paper and the rights that protect every citizen.',
        difficulty: 'medium',
        durationMinutes: 60,
        lessons: [
          { id: 'co-1', title: 'The Making of the Constitution', readingMinutes: 16, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'co-2', title: 'Fundamental Rights', readingMinutes: 18, type: 'video', isLocked: true, isCompleted: false },
          { id: 'co-3', title: 'Democracy Quiz', readingMinutes: 9, type: 'quiz', isLocked: true, isCompleted: false },
        ],
      },
    ],
  },
  {
    id: 'arts',
    name: 'Arts',
    description:
      'See the world in color. Learn the elements of art and take your first steps in sketching and digital design.',
    icon: Palette,
    color: '#8b5cf6',
    difficulty: 'easy',
    category: 'creative',
    teacher: 'Mr. Dev Patel',
    estimatedHours: 35,
    chapters: [
      {
        id: 'art-elements',
        title: 'Elements of Art',
        description: 'Line, shape, color, and space — the alphabet of every artwork.',
        difficulty: 'easy',
        durationMinutes: 45,
        lessons: [
          { id: 'el-1', title: 'Line & Shape', readingMinutes: 10, type: 'reading', isLocked: false, isCompleted: true },
          { id: 'el-2', title: 'Color Theory', readingMinutes: 14, type: 'video', isLocked: false, isCompleted: true },
          { id: 'el-3', title: 'Elements Studio', readingMinutes: 15, type: 'interactive', isLocked: false, isCompleted: false },
        ],
      },
      {
        id: 'art-sketching',
        title: 'Sketching Basics',
        description: 'Hatch, shade, and texture your way from blank paper to a still life.',
        difficulty: 'easy',
        durationMinutes: 50,
        lessons: [
          { id: 'sk-1', title: 'Pencil Techniques', readingMinutes: 13, type: 'video', isLocked: false, isCompleted: false },
          { id: 'sk-2', title: 'Shading & Texture', readingMinutes: 16, type: 'interactive', isLocked: false, isCompleted: false },
          { id: 'sk-3', title: 'Still Life Practice', readingMinutes: 18, type: 'interactive', isLocked: true, isCompleted: false },
        ],
      },
      {
        id: 'art-digital',
        title: 'Digital Art',
        description: 'Bring brushes into the digital world with layers, tools, and imagination.',
        difficulty: 'medium',
        durationMinutes: 55,
        lessons: [
          { id: 'di-1', title: 'Introduction to Digital Tools', readingMinutes: 12, type: 'reading', isLocked: false, isCompleted: false },
          { id: 'di-2', title: 'Layers & Brushes', readingMinutes: 17, type: 'video', isLocked: true, isCompleted: false },
          { id: 'di-3', title: 'Create Your First Artwork', readingMinutes: 20, type: 'interactive', isLocked: true, isCompleted: false },
        ],
      },
    ],
  },
];
