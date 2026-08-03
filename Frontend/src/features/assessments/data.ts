import {
  Calculator,
  ClipboardList,
  FlaskConical,
  Globe2,
  Languages,
  ListChecks,
  PenLine,
  Scale,
  Shuffle,
  SpellCheck,
  SquareCheck,
  ToggleRight,
} from 'lucide-react';
import type {
  AnswerValue,
  Assessment,
  AssessmentResult,
  AttemptQuestionResult,
  Question,
  QuestionType,
  TopicBreakdownItem,
} from './types';

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  mcq: 'Multiple choice',
  'true-false': 'True / False',
  'fill-blank': 'Fill in the blank',
  match: 'Match the following',
  ordering: 'Ordering / Sequence',
  'short-answer': 'Short answer',
};

export const QUESTION_TYPE_ICONS: Record<QuestionType, typeof SquareCheck> = {
  mcq: ListChecks,
  'true-false': ToggleRight,
  'fill-blank': PenLine,
  match: Shuffle,
  ordering: Scale,
  'short-answer': SpellCheck,
};

export function getAssessmentById(id: string): Assessment | undefined {
  return ASSESSMENTS.find((assessment) => assessment.id === id);
}

const normalize = (value: string): string =>
  value.trim().toLowerCase().replace(/\s+/g, ' ');

export function getCorrectAnswer(question: Question): AnswerValue {
  switch (question.type) {
    case 'mcq':
      return question.correctAnswer;
    case 'true-false':
      return question.correctAnswer;
    case 'fill-blank':
      return question.correctAnswer;
    case 'match':
      return Object.fromEntries(question.pairs.map((pair) => [pair.id, pair.right]));
    case 'ordering':
      return question.correctOrder;
    case 'short-answer':
      return question.correctAnswer;
    default:
      return null;
  }
}

export function getWrongAnswer(question: Question): AnswerValue {
  switch (question.type) {
    case 'mcq':
      return question.options.find((option) => option.id !== question.correctAnswer)?.id ?? null;
    case 'true-false':
      return !question.correctAnswer;
    case 'fill-blank':
      return 'a completely wrong guess';
    case 'match': {
      const rights = question.pairs.map((pair) => pair.right);
      return Object.fromEntries(
        question.pairs.map((pair, index) => [
          pair.id,
          rights[(index + 1) % rights.length],
        ])
      );
    }
    case 'ordering':
      return [...question.correctOrder].reverse();
    case 'short-answer':
      return 'a very wrong response';
    default:
      return null;
  }
}

export function gradeQuestion(question: Question, answer: AnswerValue): boolean {
  if (answer === null || answer === undefined) return false;

  switch (question.type) {
    case 'mcq':
      return answer === question.correctAnswer;
    case 'true-false':
      return answer === question.correctAnswer;
    case 'fill-blank': {
      const accepted = [question.correctAnswer, ...(question.acceptedAnswers ?? [])];
      return accepted.some((candidate) => normalize(candidate) === normalize(String(answer)));
    }
    case 'match': {
      if (typeof answer !== 'object' || Array.isArray(answer) || answer === null) return false;
      return question.pairs.every((pair) => (answer as Record<string, string>)[pair.id] === pair.right);
    }
    case 'ordering':
      return Array.isArray(answer) && answer.join('|') === question.correctOrder.join('|');
    case 'short-answer': {
      const text = normalize(String(answer));
      if (question.keywords && question.keywords.length > 0) {
        return question.keywords.every((keyword) => text.includes(normalize(keyword)));
      }
      return text === normalize(question.correctAnswer);
    }
    default:
      return false;
  }
}

export function correctAnswerDisplay(question: Question): string {
  switch (question.type) {
    case 'mcq':
      return question.options.find((option) => option.id === question.correctAnswer)?.label ?? '—';
    case 'true-false':
      return question.correctAnswer ? 'True' : 'False';
    case 'fill-blank':
      return question.correctAnswer;
    case 'match':
      return question.pairs.map((pair) => `${pair.left} → ${pair.right}`).join('  ·  ');
    case 'ordering':
      return question.correctOrder
        .map((id) => question.items.find((item) => item.id === id)?.label ?? id)
        .join(' → ');
    case 'short-answer':
      return question.correctAnswer;
    default:
      return '—';
  }
}

export function studentAnswerDisplay(question: Question, answer: AnswerValue): string {
  if (answer === null || answer === undefined || answer === '') return 'Not answered';

  switch (question.type) {
    case 'mcq':
      return (
        question.options.find((option) => option.id === answer)?.label ??
        String(answer ?? 'Not answered')
      );
    case 'true-false':
      return answer === true ? 'True' : answer === false ? 'False' : 'Not answered';
    case 'fill-blank':
      return String(answer);
    case 'match': {
      if (typeof answer !== 'object' || Array.isArray(answer)) return String(answer);
      const mapping = answer as Record<string, string>;
      return question.pairs
        .map((pair) => `${pair.left} → ${mapping[pair.id] ?? '—'}`)
        .join('  ·  ');
    }
    case 'ordering':
      return Array.isArray(answer)
        ? answer
            .map((id) => question.items.find((item) => item.id === id)?.label ?? id)
            .join(' → ')
        : String(answer);
    case 'short-answer':
      return String(answer);
    default:
      return String(answer ?? 'Not answered');
  }
}

export function gradeFor(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}

export function buildResult(
  assessment: Assessment,
  answers: Record<string, AnswerValue>,
  timeTakenSeconds: number
): AssessmentResult {
  const attempts: AttemptQuestionResult[] = assessment.questions.map((question) => {
    const studentAnswer = answers[question.id] ?? null;
    return {
      questionId: question.id,
      question,
      studentAnswer,
      isCorrect: gradeQuestion(question, studentAnswer),
    };
  });

  const score = attempts.reduce(
    (total, attempt) => total + (attempt.isCorrect ? attempt.question.points : 0),
    0
  );
  const totalPoints = assessment.questions.reduce(
    (total, question) => total + question.points,
    0
  );
  const correctCount = attempts.filter((attempt) => attempt.isCorrect).length;
  const totalQuestions = assessment.questions.length;
  const percentage = totalPoints === 0 ? 0 : Math.round((score / totalPoints) * 100);
  const accuracy = totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);

  const topicMap = new Map<string, { total: number; correct: number }>();
  attempts.forEach((attempt) => {
    const current = topicMap.get(attempt.question.topic) ?? { total: 0, correct: 0 };
    current.total += 1;
    if (attempt.isCorrect) current.correct += 1;
    topicMap.set(attempt.question.topic, current);
  });
  const topicBreakdown: TopicBreakdownItem[] = Array.from(topicMap.entries()).map(
    ([topic, counts]) => ({ topic, ...counts })
  );

  return {
    assessmentId: assessment.id,
    title: assessment.title,
    subject: assessment.subject,
    color: assessment.color,
    score,
    totalPoints,
    percentage,
    grade: gradeFor(percentage),
    accuracy,
    timeTakenSeconds,
    correctCount,
    totalQuestions,
    topicBreakdown,
    answers: attempts,
    completedAt: new Date().toLocaleDateString([], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  };
}

export function buildSampleResult(assessment: Assessment): AssessmentResult {
  const wrongIds = new Set(['q2', 'q6']);
  const answers: Record<string, AnswerValue> = {};
  assessment.questions.forEach((question) => {
    answers[question.id] = wrongIds.has(question.id)
      ? getWrongAnswer(question)
      : getCorrectAnswer(question);
  });
  return buildResult(assessment, answers, Math.round((assessment.durationMinutes * 60) * 0.8));
}

export const ASSESSMENTS: Assessment[] = [
  {
    id: 'assessment-quadratics',
    title: 'Quadratic Equations — Chapter Test',
    description:
      'Test your grasp of the quadratic formula, the discriminant and the nature of roots with a mix of quick questions.',
    subject: 'Mathematics',
    subjectId: 'mathematics',
    chapter: 'Quadratic Equations',
    icon: Calculator,
    color: '#6366f1',
    difficulty: 'medium',
    durationMinutes: 12,
    questionCount: 8,
    attemptsAllowed: 3,
    attemptsUsed: 1,
    status: 'completed',
    bestScore: 82,
    takenAt: '2 days ago',
    topics: ['Quadratic formula', 'Discriminant', 'Roots'],
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        topic: 'Quadratic formula',
        points: 2,
        prompt: 'Which of the following is the quadratic formula for ax² + bx + c = 0?',
        explanation:
          'The quadratic formula solves any equation of the form ax² + bx + c = 0 by substituting the coefficients a, b and c.',
        options: [
          { id: 'a', label: 'x = (−b ± √(b² − 4ac)) / 2a' },
          { id: 'b', label: 'x = (−b ± √(b² + 4ac)) / 2a' },
          { id: 'c', label: 'x = (b ± √(b² − 4ac)) / 2a' },
          { id: 'd', label: 'x = −b ± √(b² − 4ac) / 2' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q2',
        type: 'mcq',
        topic: 'Discriminant',
        points: 2,
        prompt: 'If the discriminant of a quadratic equation is −7, how many real roots does it have?',
        explanation:
          'A negative discriminant means there are no real roots — only two complex ones. The graph never touches the x-axis.',
        options: [
          { id: 'a', label: 'Two' },
          { id: 'b', label: 'One' },
          { id: 'c', label: 'Zero' },
          { id: 'd', label: 'Cannot be determined' },
        ],
        correctAnswer: 'c',
      },
      {
        id: 'q3',
        type: 'true-false',
        topic: 'Discriminant',
        points: 1,
        prompt: 'A quadratic equation always has two real roots.',
        explanation:
          'False. The discriminant decides this — it can be negative (no real roots) or zero (one repeated root).',
        correctAnswer: false,
      },
      {
        id: 'q4',
        type: 'fill-blank',
        topic: 'Quadratic formula',
        points: 1,
        prompt: 'The standard form of a quadratic equation is ax² + bx + ______ = 0.',
        explanation: 'The constant term c completes the standard form ax² + bx + c = 0.',
        correctAnswer: 'c',
        acceptedAnswers: ['c', 'constant'],
      },
      {
        id: 'q5',
        type: 'match',
        topic: 'Discriminant',
        points: 3,
        prompt: 'Match each discriminant value with the number of real roots it produces.',
        explanation:
          'Discriminant > 0 gives two distinct real roots, = 0 gives one repeated root, and < 0 gives none.',
        pairs: [
          { id: 'm1', left: 'Discriminant > 0', right: 'Two real roots' },
          { id: 'm2', left: 'Discriminant = 0', right: 'One repeated root' },
          { id: 'm3', left: 'Discriminant < 0', right: 'No real roots' },
        ],
      },
      {
        id: 'q6',
        type: 'ordering',
        topic: 'Roots',
        points: 3,
        prompt: 'Arrange these steps in the correct order to solve x² − 5x + 6 = 0 by factoring.',
        explanation:
          'First find factor pairs of 6 that add up to −5, then rewrite as a product, set each factor to zero and finally read off the solutions.',
        items: [
          { id: 'o1', label: 'Find two numbers that multiply to 6 and add to −5' },
          { id: 'o2', label: 'Rewrite as (x − 2)(x − 3) = 0' },
          { id: 'o3', label: 'Set each factor equal to zero' },
          { id: 'o4', label: 'Write the solutions x = 2 and x = 3' },
        ],
        correctOrder: ['o1', 'o2', 'o3', 'o4'],
      },
      {
        id: 'q7',
        type: 'short-answer',
        topic: 'Discriminant',
        points: 2,
        prompt: 'What is the value of the discriminant for x² + 4x + 4 = 0?',
        explanation: 'b² − 4ac = 4² − 4(1)(4) = 16 − 16 = 0, so there is exactly one repeated root.',
        correctAnswer: '0',
        keywords: ['0', 'zero'],
      },
      {
        id: 'q8',
        type: 'mcq',
        topic: 'Roots',
        points: 2,
        prompt: 'The graph of a quadratic equation with a positive coefficient of x² opens…',
        explanation:
          'A positive leading coefficient makes the parabola open upward, like a smiley face. Negative makes it open downward.',
        options: [
          { id: 'a', label: 'Upward' },
          { id: 'b', label: 'Downward' },
          { id: 'c', label: 'Sideways' },
          { id: 'd', label: 'It has no graph' },
        ],
        correctAnswer: 'a',
      },
    ],
  },
  {
    id: 'assessment-civics',
    title: 'Democracy & the Constitution',
    description:
      'A quick check on the Preamble, the organs of government and how a bill becomes a law.',
    subject: 'Social Studies',
    subjectId: 'social-studies',
    chapter: 'Constitution & Governance',
    icon: Globe2,
    color: '#38bdf8',
    difficulty: 'easy',
    durationMinutes: 10,
    questionCount: 6,
    attemptsAllowed: 2,
    attemptsUsed: 1,
    status: 'completed',
    bestScore: 91,
    takenAt: '1 week ago',
    topics: ['Preamble', 'Organs of government', 'Law making'],
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        topic: 'Preamble',
        points: 2,
        prompt: 'The Preamble of the Indian Constitution begins with the words…',
        explanation: 'It begins with "We, the People of India", declaring the source of the Constitution’s authority.',
        options: [
          { id: 'a', label: '“We, the People of India”' },
          { id: 'b', label: '“All men are created equal”' },
          { id: 'c', label: '“Long live the republic”' },
          { id: 'd', label: '“India first”' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q2',
        type: 'true-false',
        topic: 'Organs of government',
        points: 1,
        prompt: 'India has a federal system of government.',
        explanation: 'True — power is divided between the central government and the states.',
        correctAnswer: true,
      },
      {
        id: 'q3',
        type: 'fill-blank',
        topic: 'Organs of government',
        points: 1,
        prompt: 'The head of the Indian state is the ______.',
        explanation: 'The President is the constitutional head of the Indian state.',
        correctAnswer: 'President',
        acceptedAnswers: ['president'],
      },
      {
        id: 'q4',
        type: 'match',
        topic: 'Organs of government',
        points: 3,
        prompt: 'Match each organ of government with its main function.',
        explanation:
          'The legislature makes laws, the executive implements them and the judiciary interprets them.',
        pairs: [
          { id: 'm1', left: 'Legislature', right: 'Makes laws' },
          { id: 'm2', left: 'Executive', right: 'Implements laws' },
          { id: 'm3', left: 'Judiciary', right: 'Interprets laws' },
        ],
      },
      {
        id: 'q5',
        type: 'ordering',
        topic: 'Law making',
        points: 3,
        prompt: 'Arrange the stages a bill passes through to become a law.',
        explanation:
          'A bill is introduced, debated and voted on in Parliament, then sent for the President’s approval to become an Act.',
        items: [
          { id: 'o1', label: 'Introduction of the bill' },
          { id: 'o2', label: 'Discussion and voting in Parliament' },
          { id: 'o3', label: 'Approval by the President' },
          { id: 'o4', label: 'The bill becomes an Act' },
        ],
        correctOrder: ['o1', 'o2', 'o3', 'o4'],
      },
      {
        id: 'q6',
        type: 'short-answer',
        topic: 'Preamble',
        points: 2,
        prompt: 'Name the fundamental right that protects equality before the law.',
        explanation: 'The Right to Equality guarantees equal treatment before the law for every citizen.',
        correctAnswer: 'Right to Equality',
        keywords: ['equality'],
      },
    ],
  },
  {
    id: 'assessment-linear-equations',
    title: 'Linear Equations in Two Variables',
    description:
      'Practice graphing, substitution and elimination — with a mix of quick questions and short answers.',
    subject: 'Mathematics',
    subjectId: 'mathematics',
    chapter: 'Linear Equations in Two Variables',
    icon: Calculator,
    color: '#6366f1',
    difficulty: 'medium',
    durationMinutes: 10,
    questionCount: 6,
    attemptsAllowed: 3,
    attemptsUsed: 1,
    status: 'available',
    progress: 45,
    topics: ['Graphing', 'Substitution', 'Elimination'],
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        topic: 'Graphing',
        points: 2,
        prompt: 'The graph of a linear equation in two variables is always a…',
        explanation: 'Every linear equation of the form ax + by = c produces a straight line on a graph.',
        options: [
          { id: 'a', label: 'Straight line' },
          { id: 'b', label: 'Parabola' },
          { id: 'c', label: 'Circle' },
          { id: 'd', label: 'Curve' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q2',
        type: 'true-false',
        topic: 'Graphing',
        points: 1,
        prompt: 'A pair of linear equations can intersect at exactly two points.',
        explanation:
          'False — two straight lines meet at zero, one or infinitely many points, never exactly two.',
        correctAnswer: false,
      },
      {
        id: 'q3',
        type: 'fill-blank',
        topic: 'Substitution',
        points: 1,
        prompt: 'In the substitution method, you substitute the expression of one variable into the ______ equation.',
        explanation: 'You isolate one variable and substitute its value into the other equation to solve the system.',
        correctAnswer: 'other',
        acceptedAnswers: ['other equation', 'second', 'remaining'],
      },
      {
        id: 'q4',
        type: 'match',
        topic: 'Graphing',
        points: 3,
        prompt: 'Match each equation with its graph property.',
        explanation:
          'y = 2x passes through the origin, x = 3 is a vertical line, and x + y = 5 has intercepts at (0,5) and (5,0).',
        pairs: [
          { id: 'm1', left: 'y = 2x', right: 'Passes through the origin' },
          { id: 'm2', left: 'x = 3', right: 'Vertical line' },
          { id: 'm3', left: 'x + y = 5', right: 'Intercepts at (0, 5) and (5, 0)' },
        ],
      },
      {
        id: 'q5',
        type: 'ordering',
        topic: 'Elimination',
        points: 3,
        prompt: 'Arrange these steps to solve a system by elimination.',
        explanation:
          'Make the coefficient of one variable the same, subtract the equations, solve for the remaining variable and back-substitute.',
        items: [
          { id: 'o1', label: 'Make the coefficients of one variable equal' },
          { id: 'o2', label: 'Add or subtract the equations to eliminate it' },
          { id: 'o3', label: 'Solve for the remaining variable' },
          { id: 'o4', label: 'Substitute back to find the other variable' },
        ],
        correctOrder: ['o1', 'o2', 'o3', 'o4'],
      },
      {
        id: 'q6',
        type: 'short-answer',
        topic: 'Elimination',
        points: 2,
        prompt: 'Name the method that eliminates a variable by adding or subtracting the equations.',
        explanation: 'The elimination method cancels one variable by combining the two equations.',
        correctAnswer: 'Elimination',
        keywords: ['elimination'],
      },
    ],
  },
  {
    id: 'assessment-photosynthesis',
    title: 'Photosynthesis — Light & Dark Reactions',
    description:
      'From chlorophyll to the Calvin cycle — check how well you understand how plants make food.',
    subject: 'Science',
    subjectId: 'science',
    chapter: 'Photosynthesis',
    icon: FlaskConical,
    color: '#10b981',
    difficulty: 'easy',
    durationMinutes: 10,
    questionCount: 6,
    attemptsAllowed: 3,
    attemptsUsed: 0,
    status: 'available',
    topics: ['Light reactions', 'Calvin cycle', 'Leaf structure'],
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        topic: 'Leaf structure',
        points: 2,
        prompt: 'Where does photosynthesis primarily occur in a plant cell?',
        explanation:
          'Chloroplasts contain chlorophyll and are the site where sunlight is converted into chemical energy.',
        options: [
          { id: 'a', label: 'Chloroplasts' },
          { id: 'b', label: 'Mitochondria' },
          { id: 'c', label: 'Nucleus' },
          { id: 'd', label: 'Ribosomes' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q2',
        type: 'true-false',
        topic: 'Light reactions',
        points: 1,
        prompt: 'The oxygen released during photosynthesis comes from CO₂.',
        explanation:
          'False — it comes from splitting water (H₂O) during the light-dependent reactions. A classic exam trap!',
        correctAnswer: false,
      },
      {
        id: 'q3',
        type: 'fill-blank',
        topic: 'Leaf structure',
        points: 1,
        prompt: 'The pigment that gives leaves their green colour is ______.',
        explanation: 'Chlorophyll absorbs red and blue light and reflects green, giving leaves their colour.',
        correctAnswer: 'chlorophyll',
        acceptedAnswers: ['chlorophyll'],
      },
      {
        id: 'q4',
        type: 'match',
        topic: 'Light reactions',
        points: 3,
        prompt: 'Match each term with its role in photosynthesis.',
        explanation:
          'Sunlight provides energy, chlorophyll is the pigment, stomata exchange gases and glucose is the food produced.',
        pairs: [
          { id: 'm1', left: 'Sunlight', right: 'Energy source' },
          { id: 'm2', left: 'Chlorophyll', right: 'Green pigment' },
          { id: 'm3', left: 'Stomata', right: 'Gas exchange' },
          { id: 'm4', left: 'Glucose', right: 'Food produced' },
        ],
      },
      {
        id: 'q5',
        type: 'ordering',
        topic: 'Calvin cycle',
        points: 3,
        prompt: 'Arrange the main events of photosynthesis in order.',
        explanation:
          'Light is absorbed first, then water splits, energy carriers form, and finally CO₂ is fixed into glucose.',
        items: [
          { id: 'o1', label: 'Light is absorbed by chlorophyll' },
          { id: 'o2', label: 'Water molecules are split' },
          { id: 'o3', label: 'ATP and NADPH are produced' },
          { id: 'o4', label: 'CO₂ is fixed into glucose' },
        ],
        correctOrder: ['o1', 'o2', 'o3', 'o4'],
      },
      {
        id: 'q6',
        type: 'short-answer',
        topic: 'Light reactions',
        points: 2,
        prompt: 'Name the energy carrier molecules produced in the light reactions.',
        explanation: 'The light reactions produce ATP and NADPH, which power the Calvin cycle.',
        correctAnswer: 'ATP and NADPH',
        keywords: ['atp', 'nadph'],
      },
    ],
  },
  {
    id: 'assessment-newtons-laws',
    title: "Newton's Laws of Motion",
    description:
      'A forces-focused quiz covering inertia, F = ma and action–reaction pairs with real-life examples.',
    subject: 'Physics',
    subjectId: 'physics',
    chapter: 'Forces & Laws of Motion',
    icon: ClipboardList,
    color: '#f59e0b',
    difficulty: 'hard',
    durationMinutes: 12,
    questionCount: 8,
    attemptsAllowed: 3,
    attemptsUsed: 0,
    status: 'available',
    topics: ['Inertia', 'Second law', 'Action–reaction'],
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        topic: 'Inertia',
        points: 2,
        prompt: 'Which law explains why you lurch forward when a bus suddenly stops?',
        explanation:
          'The first law — your body keeps moving forward because no force stops it immediately. That is inertia.',
        options: [
          { id: 'a', label: 'First law' },
          { id: 'b', label: 'Second law' },
          { id: 'c', label: 'Third law' },
          { id: 'd', label: 'Law of gravitation' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q2',
        type: 'mcq',
        topic: 'Second law',
        points: 2,
        prompt: 'The second law of motion is expressed mathematically as…',
        explanation: 'F = ma — force equals mass times acceleration.',
        options: [
          { id: 'a', label: 'F = ma' },
          { id: 'b', label: 'F = m / a' },
          { id: 'c', label: 'F = a / m' },
          { id: 'd', label: 'F = m + a' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q3',
        type: 'mcq',
        topic: 'Action–reaction',
        points: 2,
        prompt: '“For every action there is an equal and opposite reaction” is the…',
        explanation: 'That statement is Newton’s third law of motion.',
        options: [
          { id: 'a', label: 'Third law' },
          { id: 'b', label: 'First law' },
          { id: 'c', label: 'Second law' },
          { id: 'd', label: 'Law of inertia' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q4',
        type: 'true-false',
        topic: 'Second law',
        points: 1,
        prompt: 'More massive objects always accelerate faster under the same force.',
        explanation:
          'False — under the same force, a more massive object accelerates more slowly (a = F / m).',
        correctAnswer: false,
      },
      {
        id: 'q5',
        type: 'fill-blank',
        topic: 'Inertia',
        points: 1,
        prompt: 'Mass is a measure of an object’s ______.',
        explanation: 'Mass measures how much inertia an object has — its resistance to change in motion.',
        correctAnswer: 'inertia',
        acceptedAnswers: ['resistance to motion', 'matter'],
      },
      {
        id: 'q6',
        type: 'match',
        topic: 'Action–reaction',
        points: 3,
        prompt: 'Match each law with its core idea.',
        explanation:
          'The first law is about inertia, the second is the force equation, and the third is action–reaction pairs.',
        pairs: [
          { id: 'm1', left: 'First law', right: 'Inertia' },
          { id: 'm2', left: 'Second law', right: 'F = ma' },
          { id: 'm3', left: 'Third law', right: 'Action–reaction pairs' },
        ],
      },
      {
        id: 'q7',
        type: 'ordering',
        topic: 'Second law',
        points: 3,
        prompt: 'Arrange these steps to calculate force from mass and acceleration.',
        explanation: 'Write the formula, identify mass, identify acceleration, then multiply.',
        items: [
          { id: 'o1', label: 'Write down F = ma' },
          { id: 'o2', label: 'Identify the mass m in kilograms' },
          { id: 'o3', label: 'Identify the acceleration a in m/s²' },
          { id: 'o4', label: 'Multiply m × a' },
        ],
        correctOrder: ['o1', 'o2', 'o3', 'o4'],
      },
      {
        id: 'q8',
        type: 'short-answer',
        topic: 'Inertia',
        points: 2,
        prompt: 'Which quantity measures an object’s resistance to a change in motion?',
        explanation: 'Mass is the measure of inertia — how strongly an object resists changes to its motion.',
        correctAnswer: 'Mass',
        keywords: ['mass', 'inertia'],
      },
    ],
  },
  {
    id: 'assessment-french-basics',
    title: 'Everyday French — Module Quiz',
    description:
      'Greetings, politeness and simple phrases — a friendly warm-up before your oral practice session.',
    subject: 'French',
    subjectId: 'french',
    chapter: 'Greetings & Basics',
    icon: Languages,
    color: '#f472b6',
    difficulty: 'easy',
    durationMinutes: 8,
    questionCount: 6,
    attemptsAllowed: 2,
    attemptsUsed: 0,
    status: 'upcoming',
    dueAt: 'Fri, Aug 14 · 9:00 AM',
    topics: ['Greetings', 'Politeness', 'Phrases'],
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        topic: 'Greetings',
        points: 2,
        prompt: 'What does “Bonjour” mean?',
        explanation: 'Bonjour is a friendly greeting used during the day, meaning “good morning” or “hello”.',
        options: [
          { id: 'a', label: 'Good morning / hello' },
          { id: 'b', label: 'Goodbye' },
          { id: 'c', label: 'Thank you' },
          { id: 'd', label: 'Please' },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q2',
        type: 'true-false',
        topic: 'Politeness',
        points: 1,
        prompt: '“Merci beaucoup” means “thank you very much”.',
        explanation: 'True — merci is “thank you” and beaucoup means “very much”.',
        correctAnswer: true,
      },
      {
        id: 'q3',
        type: 'fill-blank',
        topic: 'Greetings',
        points: 1,
        prompt: 'The French word for “goodbye” is ______.',
        explanation: 'Au revoir literally means “until we see again” — the standard way to say goodbye.',
        correctAnswer: 'au revoir',
        acceptedAnswers: ['au revoir', 'aurevoir'],
      },
      {
        id: 'q4',
        type: 'match',
        topic: 'Politeness',
        points: 3,
        prompt: 'Match each French phrase with its English meaning.',
        explanation:
          'Bonjour = hello, merci = thank you, s’il vous plaît = please, and au revoir = goodbye.',
        pairs: [
          { id: 'm1', left: 'Bonjour', right: 'Hello' },
          { id: 'm2', left: 'Merci', right: 'Thank you' },
          { id: 'm3', left: 'S’il vous plaît', right: 'Please' },
          { id: 'm4', left: 'Au revoir', right: 'Goodbye' },
        ],
      },
      {
        id: 'q5',
        type: 'ordering',
        topic: 'Phrases',
        points: 3,
        prompt: 'Order these French phrases from morning to night.',
        explanation: 'Bonjour (good morning), then bonsoir (good evening), then bonne nuit (good night).',
        items: [
          { id: 'o1', label: 'Bonjour' },
          { id: 'o2', label: 'Bonsoir' },
          { id: 'o3', label: 'Bonne nuit' },
        ],
        correctOrder: ['o1', 'o2', 'o3'],
      },
      {
        id: 'q6',
        type: 'short-answer',
        topic: 'Phrases',
        points: 2,
        prompt: 'Give the French phrase for “I don’t understand”.',
        explanation: '“Je ne comprends pas” is how you politely say you don’t understand.',
        correctAnswer: 'Je ne comprends pas',
        keywords: ['comprends'],
      },
    ],
  },
];
