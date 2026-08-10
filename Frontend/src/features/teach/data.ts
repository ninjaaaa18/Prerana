import { BookOpen, FileEdit, GraduationCap, Users } from 'lucide-react';
import type { TeacherLesson } from './types';
import type {
  AttentionItem,
  ChapterPerformance,
  DraftContent,
  LessonBlock,
  LessonBlockType,
  StudentProgress,
  SubjectPerformance,
  TeacherActivity,
  TeacherAssessment,
  TeacherChapter,
  TeacherClass,
  TeacherProfile,
  TeacherQuestion,
  TeacherQuestionType,
  TeacherStat,
  TeacherSubject,
  TopicPerformance,
} from './types';

const b = (
  id: string,
  type: LessonBlockType,
  content: string,
  extra?: Partial<LessonBlock>
): LessonBlock => ({ id, type, content, ...extra });

export const SUBJECTS: TeacherSubject[] = [
  {
    id: 'mathematics',
    title: 'Mathematics',
    description: 'Algebra, geometry and numbers for Grade 10 learners.',
    color: '#6366f1',
    grade: 'Grade 10',
    lastUpdated: '2h ago',
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Chemistry, physics and biology fundamentals for Grade 9.',
    color: '#10b981',
    grade: 'Grade 9',
    lastUpdated: 'Yesterday',
  },
  {
    id: 'computer-science',
    title: 'Computer Science',
    description: 'Programming and web fundamentals for Grade 8.',
    color: '#0ea5e9',
    grade: 'Grade 8',
    lastUpdated: '3h ago',
  },
  {
    id: 'english',
    title: 'English',
    description: 'Prose, poetry and grammar for Grade 11.',
    color: '#f43f5e',
    grade: 'Grade 11',
    lastUpdated: '3 days ago',
  },
  {
    id: 'social-studies',
    title: 'Social Studies',
    description: 'History and geography explorations for Grade 10.',
    color: '#f59e0b',
    grade: 'Grade 10',
    lastUpdated: '4 days ago',
  },
];

export const CHAPTERS: TeacherChapter[] = [
  {
    id: 'ch-math-1',
    subjectId: 'mathematics',
    title: 'Real Numbers',
    description: 'Number systems, Euclid’s division lemma and irrational numbers.',
    status: 'published',
    lessons: [
      {
        id: 'math-l1',
        title: 'Euclid’s Division Lemma',
        type: 'concept',
        difficulty: 'beginner',
        estimatedMinutes: 12,
        status: 'published',
        version: 4,
        lastUpdated: '2 days ago',
        learningObjective: 'Apply Euclid’s division lemma to express any positive integer.',
        blocks: [
          b('b-1', 'heading', 'Euclid’s Division Lemma'),
          b('b-2', 'paragraph', 'For any two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 ≤ r < b.'),
          b('b-3', 'key-point', 'The remainder is always smaller than the divisor and never negative.'),
        ],
        tags: ['number-system', 'euclid'],
      },
      {
        id: 'math-l2',
        title: 'Real Numbers — Problem Set',
        type: 'practice',
        difficulty: 'beginner',
        estimatedMinutes: 20,
        status: 'published',
        version: 2,
        lastUpdated: '5 days ago',
        learningObjective: 'Solve problems on HCF and LCM using the fundamental theorem of arithmetic.',
        blocks: [
          b('b-4', 'heading', 'Practice Problems'),
          b('b-5', 'paragraph', 'Work through problems that combine prime factorisation with HCF and LCM.'),
          b('b-6', 'example', 'Find the HCF of 96 and 404 using prime factorisation: 96 = 2⁵ × 3, 404 = 2² × 101, HCF = 2² = 4.'),
        ],
        tags: ['number-system', 'practice'],
      },
    ],
  },
  {
    id: 'ch-math-2',
    subjectId: 'mathematics',
    title: 'Quadratic Equations',
    description: 'Roots, factorisation and the quadratic formula.',
    status: 'published',
    lessons: [
      {
        id: 'math-l3',
        title: 'The Quadratic Formula',
        type: 'concept',
        difficulty: 'intermediate',
        estimatedMinutes: 18,
        status: 'published',
        version: 3,
        lastUpdated: '1 week ago',
        learningObjective: 'Derive and apply the quadratic formula to solve quadratic equations.',
        blocks: [
          b('b-7', 'heading', 'The Quadratic Formula'),
          b('b-8', 'paragraph', 'For a quadratic equation ax² + bx + c = 0, the roots are given by the quadratic formula.'),
          b('b-9', 'key-point', 'The discriminant b² − 4ac tells you how many real roots exist.'),
        ],
        tags: ['algebra', 'quadratics'],
      },
      {
        id: 'math-l4',
        title: 'Quadratic Formula — Worked Examples',
        type: 'practice',
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        status: 'draft',
        version: 3,
        lastUpdated: '2h ago',
        learningObjective: 'Solve word problems by modelling them as quadratic equations and applying the formula.',
        blocks: [
          b('b-10', 'heading', 'Word Problems with Quadratics'),
          b('b-11', 'paragraph', 'Translate each word problem into a quadratic equation, then solve using the quadratic formula.'),
          b('b-12', 'key-point', 'Reject roots that do not make sense in the real-world context, such as negative lengths.'),
          b('b-13', 'example', 'The product of two consecutive positive integers is 272. Let the integers be n and n + 1: n(n + 1) = 272 → n² + n − 272 = 0 → n = 16.'),
          b('b-14', 'question', 'A rectangle has a length 3 m longer than its width and an area of 40 m². Write and solve the quadratic equation for its width.'),
        ],
        tags: ['algebra', 'quadratics', 'word-problems'],
      },
    ],
  },
  {
    id: 'ch-math-3',
    subjectId: 'mathematics',
    title: 'Trigonometry',
    description: 'Sine, cosine and tangent ratios in right-angled triangles.',
    status: 'draft',
    lessons: [
      {
        id: 'math-l5',
        title: 'Sine, Cosine & Tangent',
        type: 'concept',
        difficulty: 'intermediate',
        estimatedMinutes: 15,
        status: 'draft',
        version: 1,
        lastUpdated: '2h ago',
        learningObjective: 'Define sine, cosine and tangent for an angle in a right-angled triangle.',
        blocks: [
          b('b-15', 'heading', 'Trigonometric Ratios'),
          b('b-16', 'paragraph', 'In a right-angled triangle, trigonometric ratios relate the sides to an acute angle.'),
        ],
        tags: ['trigonometry', 'ratios'],
      },
    ],
  },
  {
    id: 'ch-sci-1',
    subjectId: 'science',
    title: 'Matter in Our Surroundings',
    description: 'States of matter and the changes between them.',
    status: 'published',
    lessons: [
      {
        id: 'sci-l1',
        title: 'States of Matter',
        type: 'concept',
        difficulty: 'beginner',
        estimatedMinutes: 12,
        status: 'published',
        version: 5,
        lastUpdated: '1 week ago',
        learningObjective: 'Compare the properties of solids, liquids and gases using particle theory.',
        blocks: [
          b('b-17', 'heading', 'Three States of Matter'),
          b('b-18', 'paragraph', 'Matter exists in three common states: solid, liquid and gas, distinguished by the arrangement of particles.'),
        ],
        tags: ['matter', 'particles'],
      },
      {
        id: 'sci-l2',
        title: 'Changes of State — Practical',
        type: 'practice',
        difficulty: 'beginner',
        estimatedMinutes: 18,
        status: 'published',
        version: 3,
        lastUpdated: '3 days ago',
        learningObjective: 'Describe melting, freezing, evaporation and condensation with everyday examples.',
        blocks: [
          b('b-19', 'heading', 'Everyday Changes of State'),
          b('b-20', 'example', 'Ice melts to water when heated — this is melting, a change of state from solid to liquid.'),
        ],
        tags: ['matter', 'practical'],
      },
    ],
  },
  {
    id: 'ch-sci-2',
    subjectId: 'science',
    title: 'Chemical Reactions',
    description: 'Balancing equations and identifying reaction types.',
    status: 'draft',
    lessons: [
      {
        id: 'sci-l3',
        title: 'Balancing Chemical Equations',
        type: 'practice',
        difficulty: 'intermediate',
        estimatedMinutes: 22,
        status: 'review',
        version: 2,
        lastUpdated: 'Yesterday',
        learningObjective: 'Balance chemical equations by adjusting coefficients while conserving atoms.',
        blocks: [
          b('b-21', 'heading', 'Balancing Equations'),
          b('b-22', 'paragraph', 'A balanced equation has equal numbers of each atom on both sides of the reaction arrow.'),
          b('b-23', 'key-point', 'Balance the atoms that appear in only one reactant and one product first.'),
        ],
        tags: ['chemistry', 'equations'],
      },
    ],
  },
  {
    id: 'ch-sci-3',
    subjectId: 'science',
    title: 'Life Processes',
    description: 'Nutrition, respiration and transport in living organisms.',
    status: 'published',
    lessons: [
      {
        id: 'sci-l4',
        title: 'Nutrition in Living Beings',
        type: 'concept',
        difficulty: 'intermediate',
        estimatedMinutes: 16,
        status: 'published',
        version: 2,
        lastUpdated: '6 days ago',
        learningObjective: 'Distinguish between autotrophic and heterotrophic nutrition with examples.',
        blocks: [
          b('b-24', 'heading', 'Autotrophic and Heterotrophic Nutrition'),
          b('b-25', 'paragraph', 'Autotrophs make their own food, while heterotrophs depend on other organisms for nutrition.'),
        ],
        tags: ['biology', 'nutrition'],
      },
    ],
  },
  {
    id: 'ch-cs-1',
    subjectId: 'computer-science',
    title: 'Programming Basics',
    description: 'Variables, data types and loops in Python.',
    status: 'published',
    lessons: [
      {
        id: 'cs-l1',
        title: 'Variables & Data Types',
        type: 'concept',
        difficulty: 'beginner',
        estimatedMinutes: 14,
        status: 'published',
        version: 4,
        lastUpdated: '2 days ago',
        learningObjective: 'Create variables and identify common data types in Python.',
        blocks: [
          b('b-26', 'heading', 'Variables in Python'),
          b('b-27', 'code', 'name = "Aarav"\nage = 15\nprint(name, age)', { language: 'python' }),
          b('b-28', 'key-point', 'Python infers the data type automatically from the value you assign.'),
        ],
        tags: ['python', 'basics'],
      },
      {
        id: 'cs-l2',
        title: 'Loops in Python',
        type: 'practice',
        difficulty: 'intermediate',
        estimatedMinutes: 20,
        status: 'published',
        version: 2,
        lastUpdated: '4 days ago',
        learningObjective: 'Write for and while loops to repeat blocks of code.',
        blocks: [
          b('b-29', 'heading', 'Loops'),
          b('b-30', 'code', 'for i in range(5):\n    print(i)', { language: 'python' }),
          b('b-31', 'question', 'Write a loop that prints the squares of numbers from 1 to 10.'),
        ],
        tags: ['python', 'loops'],
      },
    ],
  },
  {
    id: 'ch-cs-2',
    subjectId: 'computer-science',
    title: 'Web Fundamentals',
    description: 'HTML and CSS foundations for building web pages.',
    status: 'draft',
    lessons: [
      {
        id: 'cs-l3',
        title: 'HTML & CSS Foundations',
        type: 'concept',
        difficulty: 'beginner',
        estimatedMinutes: 18,
        status: 'draft',
        version: 1,
        lastUpdated: '3h ago',
        learningObjective: 'Structure a web page with HTML and style it with CSS.',
        blocks: [
          b('b-32', 'heading', 'Building Web Pages'),
          b('b-33', 'paragraph', 'HTML defines the structure of a page, while CSS controls how it looks.'),
        ],
        tags: ['html', 'css'],
      },
    ],
  },
  {
    id: 'ch-eng-1',
    subjectId: 'english',
    title: 'Prose: First Flight',
    description: 'Reading, analysis and appreciation of prescribed prose.',
    status: 'published',
    lessons: [
      {
        id: 'eng-l1',
        title: 'The Letter — Analysis',
        type: 'concept',
        difficulty: 'beginner',
        estimatedMinutes: 15,
        status: 'published',
        version: 2,
        lastUpdated: '1 week ago',
        learningObjective: 'Analyse the central theme of The Letter and its narrative devices.',
        blocks: [
          b('b-34', 'heading', 'The Letter'),
          b('b-35', 'paragraph', 'The story explores waiting, memory and the bond between a father and daughter.'),
        ],
        tags: ['prose', 'analysis'],
      },
    ],
  },
  {
    id: 'ch-eng-2',
    subjectId: 'english',
    title: 'Grammar & Composition',
    description: 'Reported speech, tenses and structured writing.',
    status: 'draft',
    lessons: [
      {
        id: 'eng-l2',
        title: 'Reported Speech',
        type: 'concept',
        difficulty: 'intermediate',
        estimatedMinutes: 12,
        status: 'draft',
        version: 1,
        lastUpdated: '3 days ago',
        learningObjective: 'Convert direct speech into reported speech with correct tense shifts.',
        blocks: [
          b('b-36', 'heading', 'Direct and Reported Speech'),
          b('b-37', 'paragraph', 'Reported speech retells what someone said without using their exact words.'),
        ],
        tags: ['grammar', 'speech'],
      },
    ],
  },
  {
    id: 'ch-ss-1',
    subjectId: 'social-studies',
    title: 'History: Nationalism',
    description: 'The rise of nationalism in modern Europe and India.',
    status: 'published',
    lessons: [
      {
        id: 'ss-l1',
        title: 'The Rise of Nationalism',
        type: 'concept',
        difficulty: 'intermediate',
        estimatedMinutes: 16,
        status: 'published',
        version: 2,
        lastUpdated: '5 days ago',
        learningObjective: 'Trace the key events in the rise of nationalism in Europe.',
        blocks: [
          b('b-38', 'heading', 'Nationalism in Europe'),
          b('b-39', 'paragraph', 'Nationalism grew through shared language, culture and political revolutions.'),
        ],
        tags: ['history', 'nationalism'],
      },
    ],
  },
  {
    id: 'ch-ss-2',
    subjectId: 'social-studies',
    title: 'Geography: Resources',
    description: 'Types of resources and sustainable development.',
    status: 'review',
    lessons: [
      {
        id: 'ss-l2',
        title: 'Types of Resources',
        type: 'concept',
        difficulty: 'beginner',
        estimatedMinutes: 14,
        status: 'review',
        version: 1,
        lastUpdated: '4 days ago',
        learningObjective: 'Classify natural resources based on origin, exhaustibility and ownership.',
        blocks: [
          b('b-40', 'heading', 'Classifying Resources'),
          b('b-41', 'paragraph', 'Resources can be classified as renewable or non-renewable, and as biotic or abiotic.'),
        ],
        tags: ['geography', 'resources'],
      },
    ],
  },
];

export const TEACHER_PROFILE: TeacherProfile = {
  name: 'Priya Iyer',
  role: 'Mathematics · Grade 10',
  streak: 21,
  classCount: 6,
  motivation:
    'Your Grade 10 classes are ahead of schedule. Two drafts are waiting for your review.',
};

export const TEACHER_STATS: TeacherStat[] = [
  { id: 'ts-1', label: 'Active Classes', value: 6, icon: Users, change: '2 this term', isPositive: true },
  { id: 'ts-2', label: 'Total Students', value: 168, icon: GraduationCap, change: '12 new', isPositive: true },
  { id: 'ts-3', label: 'Published Lessons', value: 14, icon: BookOpen, change: '2 this week', isPositive: true },
  { id: 'ts-4', label: 'Draft Content', value: 9, icon: FileEdit, change: '3 need review', isPositive: false },
];

export const QUICK_ACTIONS: {
  id: string;
  title: string;
  description: string;
  to: string;
  color: string;
}[] = [
  { id: 'qa-1', title: 'Create Lesson', description: 'Author a new lesson with structured blocks.', to: '/app/teach/lessons/new', color: '#6366f1' },
  { id: 'qa-2', title: 'Create Assessment', description: 'Build a quiz with multiple question types.', to: '/app/teach/assessments', color: '#8b5cf6' },
  { id: 'qa-3', title: 'View Classes', description: 'Review rosters and class performance.', to: '/app/teach/classes', color: '#0ea5e9' },
  { id: 'qa-4', title: 'Review Drafts', description: 'Check content waiting for your approval.', to: '/app/teach/subjects', color: '#f59e0b' },
];

export const DRAFTS: DraftContent[] = [
  { id: 'draft-1', title: 'Trigonometry — Sine, Cosine & Tangent', subject: 'Mathematics', kind: 'lesson', lastEdited: '2h ago', status: 'draft' },
  { id: 'draft-2', title: 'Balancing Chemical Equations', subject: 'Science', kind: 'lesson', lastEdited: 'Yesterday', status: 'review' },
  { id: 'draft-3', title: 'Unit Test 2 — Quadratic Equations', subject: 'Mathematics', kind: 'assessment', lastEdited: '2 days ago', status: 'draft' },
  { id: 'draft-4', title: 'Chapter 4 — The Age of Industrialisation', subject: 'Social Studies', kind: 'chapter', lastEdited: '4 days ago', status: 'draft' },
];

export const CLASSES: TeacherClass[] = [
  { id: 'class-10a', name: 'Grade 10A', grade: 'Grade 10', section: 'A', subjectId: 'mathematics', subject: 'Mathematics', studentCount: 38, completion: 72, averageScore: 81, activity: 'Updated 2h ago', status: 'active', trend: 4 },
  { id: 'class-10b', name: 'Grade 10B', grade: 'Grade 10', section: 'B', subjectId: 'mathematics', subject: 'Mathematics', studentCount: 35, completion: 64, averageScore: 76, activity: 'Updated 5h ago', status: 'active', trend: 1 },
  { id: 'class-9a', name: 'Grade 9A', grade: 'Grade 9', section: 'A', subjectId: 'science', subject: 'Science', studentCount: 32, completion: 58, averageScore: 73, activity: 'Updated 1d ago', status: 'active', trend: -3 },
  { id: 'class-9b', name: 'Grade 9B', grade: 'Grade 9', section: 'B', subjectId: 'science', subject: 'Science', studentCount: 29, completion: 49, averageScore: 69, activity: 'Updated 2d ago', status: 'active', trend: -5 },
  { id: 'class-8a', name: 'Grade 8A', grade: 'Grade 8', section: 'A', subjectId: 'computer-science', subject: 'Computer Science', studentCount: 24, completion: 81, averageScore: 84, activity: 'Updated 3h ago', status: 'active', trend: 6 },
  { id: 'class-11a', name: 'Grade 11A', grade: 'Grade 11', section: 'A', subjectId: 'english', subject: 'English', studentCount: 22, completion: 88, averageScore: 82, activity: 'Archived last term', status: 'archived', trend: 2 },
];

export const CLASS_STUDENTS: Record<string, StudentProgress[]> = {
  'class-10a': [
    { id: 'std-1', name: 'Aarav Sharma', completion: 85, averageScore: 88, lastActive: 'Today', status: 'on-track', trend: 3 },
    { id: 'std-2', name: 'Diya Patel', completion: 62, averageScore: 74, lastActive: 'Yesterday', status: 'on-track', trend: -1 },
    { id: 'std-3', name: 'Rohan Mehta', completion: 44, averageScore: 58, lastActive: '3 days ago', status: 'at-risk', trend: -6 },
    { id: 'std-4', name: 'Ananya Rao', completion: 92, averageScore: 90, lastActive: 'Today', status: 'ahead', trend: 5 },
    { id: 'std-5', name: 'Kabir Nair', completion: 71, averageScore: 79, lastActive: 'Yesterday', status: 'on-track', trend: 2 },
    { id: 'std-6', name: 'Sneha Kulkarni', completion: 33, averageScore: 52, lastActive: '1 week ago', status: 'at-risk', trend: -9 },
  ],
  'class-10b': [
    { id: 'std-7', name: 'Ishaan Verma', completion: 78, averageScore: 82, lastActive: 'Today', status: 'on-track', trend: 4 },
    { id: 'std-8', name: 'Meera Krishnan', completion: 55, averageScore: 71, lastActive: '2 days ago', status: 'on-track', trend: 0 },
    { id: 'std-9', name: 'Arjun Deshpande', completion: 40, averageScore: 60, lastActive: '4 days ago', status: 'at-risk', trend: -4 },
    { id: 'std-10', name: 'Tara Bose', completion: 88, averageScore: 86, lastActive: 'Today', status: 'ahead', trend: 7 },
  ],
  'class-9a': [
    { id: 'std-11', name: 'Vivaan Joshi', completion: 68, averageScore: 75, lastActive: 'Yesterday', status: 'on-track', trend: 2 },
    { id: 'std-12', name: 'Zoya Sheikh', completion: 50, averageScore: 66, lastActive: '3 days ago', status: 'at-risk', trend: -3 },
    { id: 'std-13', name: 'Advait Kumar', completion: 82, averageScore: 85, lastActive: 'Today', status: 'ahead', trend: 4 },
  ],
  'class-9b': [
    { id: 'std-14', name: 'Naina Reddy', completion: 60, averageScore: 72, lastActive: 'Today', status: 'on-track', trend: 1 },
    { id: 'std-15', name: 'Harsh Agarwal', completion: 38, averageScore: 55, lastActive: '5 days ago', status: 'at-risk', trend: -7 },
  ],
  'class-8a': [
    { id: 'std-16', name: 'Miraya Sen', completion: 90, averageScore: 92, lastActive: 'Today', status: 'ahead', trend: 6 },
    { id: 'std-17', name: 'Kian Malhotra', completion: 74, averageScore: 80, lastActive: 'Yesterday', status: 'on-track', trend: 3 },
    { id: 'std-18', name: 'Avni Chopra', completion: 66, averageScore: 75, lastActive: 'Today', status: 'on-track', trend: 2 },
  ],
  'class-11a': [
    { id: 'std-19', name: 'Riya Saxena', completion: 92, averageScore: 88, lastActive: 'Last week', status: 'ahead', trend: 3 },
    { id: 'std-20', name: 'Dev Khanna', completion: 85, averageScore: 83, lastActive: 'Last week', status: 'on-track', trend: 1 },
  ],
};

export const TEACHER_ACTIVITIES: TeacherActivity[] = [
  { id: 'act-1', type: 'lesson-created', title: 'Lesson created — Sine, Cosine & Tangent', description: 'New lesson added to Chapter 3 · Trigonometry', time: 'Today, 9:41 AM' },
  { id: 'act-2', type: 'assessment-published', title: 'Assessment published — Unit Test 1', description: 'Quadratic Equations quiz is now live for Grade 10', time: 'Yesterday, 4:15 PM' },
  { id: 'act-3', type: 'student-completed', title: 'Tara Bose completed Unit Test 1', description: 'Scored 86% — top of Grade 10B', time: 'Yesterday, 2:08 PM' },
  { id: 'act-4', type: 'draft-updated', title: 'Draft updated — Balancing Equations', description: 'Section 2 · Balancing chemical equations edited', time: '2 days ago' },
  { id: 'act-5', type: 'class-updated', title: 'Roster updated — Grade 9B', description: '2 new students added to the class', time: '3 days ago' },
  { id: 'act-6', type: 'lesson-created', title: 'Lesson published — Euclid’s Division Lemma', description: 'Approved and published to Grade 10A', time: '5 days ago' },
];

export const ATTENTION_ITEMS: AttentionItem[] = [
  { id: 'att-1', title: '3 students falling behind', description: 'Harsh, Sneha and Kabir scored below 55% this week.', severity: 'high' },
  { id: 'att-2', title: '2 drafts awaiting review', description: 'Trigonometry lesson and Unit Test 2 are ready to submit.', severity: 'medium' },
  { id: 'att-3', title: 'Assessment ending soon', description: 'Unit Test 1 closes for Grade 10A in 24 hours.', severity: 'medium' },
  { id: 'att-4', title: 'Low-performing chapter', description: 'Chemical Reactions averages 58% across Grade 9.', severity: 'high' },
];

export const SUBJECT_PERFORMANCE: SubjectPerformance[] = [
  { id: 'mathematics', name: 'Mathematics', color: '#6366f1', averageScore: 79, completion: 68 },
  { id: 'science', name: 'Science', color: '#10b981', averageScore: 71, completion: 54 },
  { id: 'computer-science', name: 'Computer Science', color: '#0ea5e9', averageScore: 84, completion: 81 },
  { id: 'english', name: 'English', color: '#f43f5e', averageScore: 74, completion: 62 },
  { id: 'social-studies', name: 'Social Studies', color: '#f59e0b', averageScore: 72, completion: 57 },
];

export const CHAPTER_PERFORMANCE: ChapterPerformance[] = [
  { id: 'ch-math-1', name: 'Real Numbers', completion: 84, averageScore: 82 },
  { id: 'ch-math-2', name: 'Quadratic Equations', completion: 71, averageScore: 78 },
  { id: 'ch-sci-1', name: 'Matter in Our Surroundings', completion: 66, averageScore: 74 },
  { id: 'ch-sci-2', name: 'Chemical Reactions', completion: 38, averageScore: 58 },
  { id: 'ch-cs-1', name: 'Programming Basics', completion: 88, averageScore: 86 },
];

export const WEAK_TOPICS: TopicPerformance[] = [
  { id: 'wt-1', name: 'Balancing chemical equations', performance: 52, trend: -4 },
  { id: 'wt-2', name: 'Word problems with quadratics', performance: 61, trend: -2 },
  { id: 'wt-3', name: 'Reported speech — tense shifts', performance: 64, trend: 1 },
];

export const STRONG_TOPICS: TopicPerformance[] = [
  { id: 'st-1', name: 'Number systems', performance: 91, trend: 3 },
  { id: 'st-2', name: 'Python loops', performance: 88, trend: 5 },
  { id: 'st-3', name: 'States of matter', performance: 86, trend: 2 },
];

export const STUDENTS_NEEDING_ATTENTION: StudentProgress[] = [
  { id: 'std-15', name: 'Harsh Agarwal', completion: 38, averageScore: 55, lastActive: '5 days ago', status: 'at-risk', trend: -7 },
  { id: 'std-6', name: 'Sneha Kulkarni', completion: 33, averageScore: 52, lastActive: '1 week ago', status: 'at-risk', trend: -9 },
  { id: 'std-5', name: 'Kabir Nair', completion: 44, averageScore: 58, lastActive: '3 days ago', status: 'at-risk', trend: -6 },
  { id: 'std-12', name: 'Zoya Sheikh', completion: 50, averageScore: 66, lastActive: '3 days ago', status: 'at-risk', trend: -3 },
];

export const ASSESSMENTS: TeacherAssessment[] = [
  { id: 'asmt-1', title: 'Quadratic Equations — Unit Test 1', subject: 'Mathematics', subjectId: 'mathematics', chapter: 'Quadratic Equations', questionCount: 15, difficulty: 'intermediate', attempts: 73, averageScore: 78, status: 'published', lastUpdated: 'Yesterday', durationMinutes: 45, passingScore: 40 },
  { id: 'asmt-2', title: 'Real Numbers — Quick Check', subject: 'Mathematics', subjectId: 'mathematics', chapter: 'Real Numbers', questionCount: 8, difficulty: 'beginner', attempts: 52, averageScore: 84, status: 'published', lastUpdated: '3 days ago', durationMinutes: 15, passingScore: 50 },
  { id: 'asmt-3', title: 'Balancing Equations — Practice Quiz', subject: 'Science', subjectId: 'science', chapter: 'Chemical Reactions', questionCount: 4, difficulty: 'intermediate', attempts: 0, averageScore: 0, status: 'draft', lastUpdated: '2h ago', durationMinutes: 25, passingScore: 45 },
  { id: 'asmt-4', title: 'Programming Fundamentals — Mid Term', subject: 'Computer Science', subjectId: 'computer-science', chapter: 'Programming Basics', questionCount: 25, difficulty: 'advanced', attempts: 31, averageScore: 71, status: 'published', lastUpdated: '1 week ago', durationMinutes: 60, passingScore: 40 },
  { id: 'asmt-5', title: 'Nationalism in Europe — Chapter Quiz', subject: 'Social Studies', subjectId: 'social-studies', chapter: 'History: Nationalism', questionCount: 10, difficulty: 'beginner', attempts: 44, averageScore: 76, status: 'review', lastUpdated: '4 days ago', durationMinutes: 20, passingScore: 50 },
  { id: 'asmt-6', title: 'Grammar Diagnostic — Term 1', subject: 'English', subjectId: 'english', chapter: 'Grammar & Composition', questionCount: 20, difficulty: 'intermediate', attempts: 18, averageScore: 69, status: 'archived', lastUpdated: 'Last month', durationMinutes: 40, passingScore: 45 },
];

export const ASSESSMENT_QUESTIONS: Record<string, TeacherQuestion[]> = {
  'asmt-3': [
    { id: 'q-1', type: 'mcq', prompt: 'Which of the following is a balanced chemical equation?', options: ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O', 'H₂ + 2O₂ → 2H₂O', '2H₂ + 2O → 2H₂O'], correctIndex: 1 },
    { id: 'q-2', type: 'true-false', prompt: 'In a balanced equation, the number of atoms of each element is equal on both sides.', answer: true },
    { id: 'q-3', type: 'fill-blank', prompt: 'A reaction that releases heat energy is called an ________ reaction.', answer: 'exothermic' },
    { id: 'q-4', type: 'short-answer', prompt: 'Why must chemical equations be balanced?', sampleAnswer: 'To satisfy the law of conservation of mass — atoms are neither created nor destroyed.' },
  ],
  'asmt-1': [
    { id: 'q-5', type: 'mcq', prompt: 'The roots of x² − 5x + 6 = 0 are:', options: ['2 and 3', '−2 and −3', '1 and 6', '−1 and −6'], correctIndex: 0 },
    { id: 'q-6', type: 'true-false', prompt: 'A quadratic equation always has two distinct real roots.', answer: false },
    { id: 'q-7', type: 'match', prompt: 'Match each equation with its discriminant value.', pairs: [{ left: 'x² − 4x + 4 = 0', right: '0' }, { left: 'x² + x + 1 = 0', right: '−3' }, { left: 'x² − 4x + 3 = 0', right: '4' }] },
    { id: 'q-8', type: 'ordering', prompt: 'Arrange the steps to solve a quadratic by the formula.', items: ['Write the equation in standard form', 'Identify a, b and c', 'Compute the discriminant', 'Apply the quadratic formula'] },
  ],
};

export const STUDENTS_TRACKED = 168;
export const AVERAGE_CLASS_COMPLETION = 68;
export const AVERAGE_CLASS_SCORE = 77;
export const CLASSES_NEEDING_ATTENTION = 4;

export const getSubject = (id: string): TeacherSubject | undefined => SUBJECTS.find((s) => s.id === id);

export const getChapter = (id: string): TeacherChapter | undefined => CHAPTERS.find((c) => c.id === id);

export const getChapterForLesson = (lessonId: string): TeacherChapter | undefined =>
  CHAPTERS.find((chapter) => chapter.lessons.some((lesson) => lesson.id === lessonId));

export const getChaptersForSubject = (subjectId: string): TeacherChapter[] =>
  CHAPTERS.filter((chapter) => chapter.subjectId === subjectId);

export const getAllLessons = (): TeacherLesson[] => CHAPTERS.flatMap((chapter) => chapter.lessons);

export const getLesson = (id: string): TeacherLesson | undefined => getAllLessons().find((l) => l.id === id);

export const getClass = (id: string): TeacherClass | undefined => CLASSES.find((c) => c.id === id);

export const getStudentsForClass = (classId: string): StudentProgress[] =>
  CLASS_STUDENTS[classId] ?? [];

export const getAssessment = (id: string): TeacherAssessment | undefined =>
  ASSESSMENTS.find((a) => a.id === id);

export const getQuestionsForAssessment = (assessmentId: string): TeacherQuestion[] =>
  ASSESSMENT_QUESTIONS[assessmentId] ?? [];

export const getSubjectTotals = (subjectId: string): {
  chapters: number;
  lessons: number;
  published: number;
  drafts: number;
} => {
  const chapters = getChaptersForSubject(subjectId);
  const lessons = chapters.flatMap((chapter) => chapter.lessons);
  return {
    chapters: chapters.length,
    lessons: lessons.length,
    published: lessons.filter((lesson) => lesson.status === 'published').length,
    drafts: lessons.filter((lesson) => lesson.status !== 'published').length,
  };
};

export const ACTIVE_CLASSES = CLASSES.filter((klass) => klass.status === 'active');
export const TOTAL_STUDENTS = CLASSES.reduce((sum, klass) => sum + klass.studentCount, 0);

export const createQuestion = (type: TeacherQuestionType, index: number): TeacherQuestion => {
  const id = `q-${Date.now().toString(36)}-${index}`;
  switch (type) {
    case 'mcq':
      return { id, type, prompt: 'New multiple choice question', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctIndex: 0 };
    case 'true-false':
      return { id, type, prompt: 'New true or false statement', answer: true };
    case 'fill-blank':
      return { id, type, prompt: 'Complete the sentence with ______', answer: 'Answer' };
    case 'match':
      return {
        id,
        type,
        prompt: 'Match the items on the left with the right side',
        pairs: [
          { left: 'Term A', right: 'Definition A' },
          { left: 'Term B', right: 'Definition B' },
        ],
      };
    case 'ordering':
      return { id, type, prompt: 'Arrange the steps in the correct order', items: ['Step 1', 'Step 2', 'Step 3'] };
    case 'short-answer':
      return { id, type, prompt: 'New short answer question', sampleAnswer: 'Expected answer' };
  }
};
