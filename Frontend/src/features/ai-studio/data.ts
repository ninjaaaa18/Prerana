import {
  BarChart3,
  Bot,
  GraduationCap,
  Headphones,
  HelpCircle,
  Network,
  Presentation,
  SquareStack,
  Table2,
  Workflow,
} from 'lucide-react';
import type { AIMode, ChatSession, PromptSuggestion, ResourceItem } from './types';

export const AI_MODES: AIMode[] = [
  {
    id: 'assistant',
    name: 'Prerana Assistant',
    tagline: 'Your all-purpose study companion',
    description:
      'Ask anything — summaries, analogies, practice questions — and get clear, friendly answers tailored to your level.',
    icon: Bot,
    color: '#818cf8',
    suggestion: 'Explain photosynthesis in simple words',
  },
  {
    id: 'tutor',
    name: 'Tutor Me',
    tagline: 'Guided step-by-step lessons',
    description:
      'Learn a topic from scratch with a patient tutor that checks your understanding at every step.',
    icon: GraduationCap,
    color: '#34d399',
    suggestion: 'Teach me the quadratic formula step by step',
  },
  {
    id: 'doubts',
    name: 'Doubt Solver',
    tagline: 'Instant clarity on any question',
    description:
      'Stuck on a problem? Drop it here and get a crisp, easy-to-follow explanation right away.',
    icon: HelpCircle,
    color: '#fbbf24',
    suggestion: 'Why does the discriminant decide the number of roots?',
  },
];

export const CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'session-1',
    title: 'Quadratic Equations — Roots & Solutions',
    subject: 'Mathematics',
    modeId: 'tutor',
    isPinned: true,
    preview: 'Discriminant, roots and the quadratic formula explained step by step.',
    updatedAt: '2h ago',
    messageCount: 8,
    messages: [
      {
        id: 's1-m1',
        role: 'user',
        content: 'Tutor me on quadratic equations. I keep getting confused between the roots and the formula.',
        timestamp: '10:02 AM',
        status: 'complete',
      },
      {
        id: 's1-m2',
        role: 'assistant',
        content:
          "Let's start simple. A quadratic equation looks like ax² + bx + c = 0.\n\nThe quadratic formula finds its roots (the values of x that make the equation true):\n\nx = (−b ± √(b² − 4ac)) / 2a\n\nThe part under the square root — b² − 4ac — is called the discriminant. It tells you what kind of roots to expect without solving at all.",
        timestamp: '10:02 AM',
        status: 'complete',
      },
      {
        id: 's1-m3',
        role: 'user',
        content: "So the discriminant just tells me how many roots?",
        timestamp: '10:05 AM',
        status: 'complete',
      },
      {
        id: 's1-m4',
        role: 'assistant',
        content:
          "Exactly! Here's the rule:\n\n• Discriminant > 0 → two distinct real roots\n• Discriminant = 0 → one repeated real root\n• Discriminant < 0 → no real roots (two complex ones)\n\nLet's try x² − 5x + 6 = 0. Here a=1, b=−5, c=6. Discriminant = 25 − 24 = 1, so there are two real roots.",
        timestamp: '10:05 AM',
        status: 'complete',
      },
      {
        id: 's1-m5',
        role: 'user',
        content: 'Got it. Quick quiz to lock this in?',
        timestamp: '10:07 AM',
        status: 'complete',
      },
      {
        id: 's1-m6',
        role: 'assistant',
        content:
          "Great idea. Question 1:\n\nWhat is the discriminant of x² + 4x + 4 = 0, and what does it tell you about the roots?\n\nThink it through, then tell me your answer!",
        timestamp: '10:07 AM',
        status: 'complete',
      },
      {
        id: 's1-m7',
        role: 'user',
        content: 'b² − 4ac = 16 − 16 = 0, so one repeated root. I think that means x = −2.',
        timestamp: '10:09 AM',
        status: 'complete',
      },
      {
        id: 's1-m8',
        role: 'assistant',
        content:
          "Perfect! b² − 4ac = 0 means one repeated root, and since the equation is (x + 2)² = 0, the root is x = −2. You nailed it.\n\nWant me to generate a quick mind map or flashcards for this topic?",
        timestamp: '10:09 AM',
        status: 'complete',
      },
    ],
  },
  {
    id: 'session-2',
    title: 'Photosynthesis — Light & Dark Reactions',
    subject: 'Science',
    modeId: 'assistant',
    isPinned: true,
    preview: 'How plants turn sunlight into food — summarized into five bullet points.',
    updatedAt: 'Yesterday',
    messageCount: 12,
    messages: [
      {
        id: 's2-m1',
        role: 'user',
        content: 'Can you summarize photosynthesis in five bullets? I need it for revision.',
        timestamp: '4:12 PM',
        status: 'complete',
      },
      {
        id: 's2-m2',
        role: 'assistant',
        content:
          "Here's a five-point summary of photosynthesis:\n\n1. Photosynthesis is how plants convert sunlight, water and CO₂ into glucose and oxygen.\n2. It happens mainly in the chloroplasts, inside the green pigment chlorophyll.\n3. Light-dependent reactions split water, releasing oxygen and producing energy carriers (ATP & NADPH).\n4. The Calvin cycle (light-independent) uses that energy to turn CO₂ into glucose.\n5. The overall equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂.",
        timestamp: '4:12 PM',
        status: 'complete',
      },
      {
        id: 's2-m3',
        role: 'user',
        content: 'Where does the oxygen come from — the CO₂ or the water?',
        timestamp: '4:15 PM',
        status: 'complete',
      },
      {
        id: 's2-m4',
        role: 'assistant',
        content:
          'Tricky question! The oxygen comes from the water (H₂O), not from CO₂.\n\nDuring the light-dependent reactions, water molecules are split apart — this releases oxygen as a by-product. The CO₂ is used later in the Calvin cycle to build glucose. This is a classic exam trap, so good that you asked!',
        timestamp: '4:15 PM',
        status: 'complete',
      },
    ],
  },
  {
    id: 'session-3',
    title: 'French Basics — Everyday Phrases',
    subject: 'French',
    modeId: 'assistant',
    isPinned: false,
    preview: 'Greetings, introductions and polite phrases for daily conversations.',
    updatedAt: '2 days ago',
    messageCount: 5,
    messages: [
      {
        id: 's3-m1',
        role: 'user',
        content: 'Give me five everyday French phrases I should know.',
        timestamp: '8:30 AM',
        status: 'complete',
      },
      {
        id: 's3-m2',
        role: 'assistant',
        content:
          "Here are five handy phrases:\n\n1. Bonjour — Good morning / hello\n2. Comment ça va ? — How's it going?\n3. Je ne comprends pas — I don't understand\n4. Pouvez-vous répéter ? — Can you repeat that?\n5. Merci beaucoup — Thank you very much\n\nWant me to add pronunciation tips?",
        timestamp: '8:30 AM',
        status: 'complete',
      },
    ],
  },
  {
    id: 'session-4',
    title: "Newton's Laws of Motion",
    subject: 'Physics',
    modeId: 'doubts',
    isPinned: false,
    preview: 'Why do objects keep moving? Doubts cleared with real-life examples.',
    updatedAt: '4 days ago',
    messageCount: 6,
    messages: [
      {
        id: 's4-m1',
        role: 'user',
        content: 'I never understood Newton\'s first law. If no force acts, why does an object keep moving?',
        timestamp: '7:45 PM',
        status: 'complete',
      },
      {
        id: 's4-m2',
        role: 'assistant',
        content:
          "Think of a hockey puck sliding on ice. In real life it slows down — but that's because friction and air resistance are acting on it. If you remove all forces, there is nothing to change its motion, so it keeps moving in a straight line at constant speed forever.\n\nThat's the first law: an object stays at rest or moves at constant velocity unless a net force acts on it. Friction is the villain that hides this from you in daily life!",
        timestamp: '7:45 PM',
        status: 'complete',
      },
      {
        id: 's4-m3',
        role: 'user',
        content: 'So the first law is basically about the idea of inertia?',
        timestamp: '7:48 PM',
        status: 'complete',
      },
      {
        id: 's4-m4',
        role: 'assistant',
        content:
          'Yes, exactly. Inertia is the tendency of an object to resist changes to its state of motion — that is precisely what the first law describes.\n\nHere\'s a neat connection: the second law, F = ma, tells you how much force you need to overcome that inertia. More mass → more inertia → more force needed for the same acceleration.',
        timestamp: '7:48 PM',
        status: 'complete',
      },
    ],
  },
];

export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    id: 'prompt-1',
    label: 'Summarize the quadratic formula',
    prompt: 'Summarize the quadratic formula in simple words with an example.',
  },
  {
    id: 'prompt-2',
    label: 'Quiz me on photosynthesis',
    prompt: 'Quiz me on photosynthesis with 5 short questions.',
  },
  {
    id: 'prompt-3',
    label: 'Mind map for Newton’s Laws',
    prompt: 'Create a mind map outline for Newton\'s Laws of Motion.',
  },
  {
    id: 'prompt-4',
    label: 'Explain “imparfait”',
    prompt: 'Explain how the French imparfait tense works with three examples.',
  },
  {
    id: 'prompt-5',
    label: 'Break down the discriminant',
    prompt: 'Break down the discriminant concept step by step for beginners.',
  },
  {
    id: 'prompt-6',
    label: 'Make me a study plan',
    prompt: 'Make me a 7-day study plan for my upcoming Mathematics exam.',
  },
];

export const RESOURCES: ResourceItem[] = [
  {
    id: 'resource-mind-map',
    title: 'Concept Mind Map',
    description: 'Visually connect related ideas around a central topic.',
    type: 'mind-map',
    icon: Network,
    color: '#818cf8',
    fileType: 'Mind Map',
    size: '1.2 MB',
  },
  {
    id: 'resource-flashcards',
    title: 'Flashcards Deck',
    description: 'Quick-recall cards to drill key facts and definitions.',
    type: 'flashcards',
    icon: SquareStack,
    color: '#fbbf24',
    fileType: 'APKG',
    size: '840 KB',
  },
  {
    id: 'resource-slides',
    title: 'Presentation Slides',
    description: 'A ready-to-present summary deck of the whole topic.',
    type: 'slides',
    icon: Presentation,
    color: '#34d399',
    fileType: 'PPTX',
    size: '3.1 MB',
  },
  {
    id: 'resource-infographic',
    title: 'Visual Infographic',
    description: 'A colorful one-page visual digest made for revision.',
    type: 'infographic',
    icon: BarChart3,
    color: '#f472b6',
    fileType: 'PDF',
    size: '2.4 MB',
  },
  {
    id: 'resource-audio',
    title: 'Audio Overview',
    description: 'A narrated summary you can listen to on the go.',
    type: 'audio-overview',
    icon: Headphones,
    color: '#22d3ee',
    fileType: 'MP3',
    size: '6.7 MB',
  },
  {
    id: 'resource-data-table',
    title: 'Data Tables',
    description: 'Structured tables of formulas, facts and comparisons.',
    type: 'data-table',
    icon: Table2,
    color: '#a78bfa',
    fileType: 'CSV',
    size: '410 KB',
  },
  {
    id: 'resource-flow-diagram',
    title: 'Flow Diagram',
    description: 'Step-by-step process maps for procedures and logic.',
    type: 'flow-diagram',
    icon: Workflow,
    color: '#fb923c',
    fileType: 'SVG',
    size: '980 KB',
  },
];

export function getSimulatedReply(prompt: string): string {
  const q = prompt.toLowerCase();

  if (q.includes('quadratic') || q.includes('discriminant')) {
    return "Sure! The quadratic formula x = (−b ± √(b² − 4ac)) / 2a solves any equation of the form ax² + bx + c = 0.\n\nThe discriminant b² − 4ac tells you what to expect:\n\n• Greater than 0 → two distinct real roots\n• Equal to 0 → one repeated real root\n• Less than 0 → no real roots\n\nWant me to work through an example together?";
  }

  if (q.includes('photosynthesis')) {
    return "Here's a quick recap of photosynthesis:\n\n1. Plants use sunlight, water and CO₂ to make glucose.\n2. It happens in the chloroplasts, powered by chlorophyll.\n3. Light reactions split water and release oxygen.\n4. The Calvin cycle converts CO₂ into glucose.\n\nFun fact: the oxygen you breathe comes from the water, not the CO₂!";
  }

  if (q.includes('newton') || q.includes('law') || q.includes('force')) {
    return "Let's break it down:\n\n• First law — an object keeps moving (or stays still) unless a net force acts on it. That resistance to change is called inertia.\n• Second law — force = mass × acceleration (F = ma). More force, more acceleration.\n• Third law — for every action there's an equal and opposite reaction.\n\nTell me which part feels tricky and I'll go deeper!";
  }

  if (q.includes('french') || q.includes('imparfait') || q.includes('phrase')) {
    return "Of course! Let's keep it practical:\n\n1. Bonjour — hello\n2. Comment ça va ? — how are you?\n3. Merci beaucoup — thank you very much\n4. Je ne comprends pas — I don't understand\n5. Pouvez-vous répéter ? — can you repeat that?\n\nWant pronunciation tips or a mini dialogue to practice?";
  }

  if (q.includes('study plan') || q.includes('schedule')) {
    return "Here's a balanced 7-day plan:\n\n• Days 1–2: revise core formulas and definitions\n• Day 3: solve one mixed problem set\n• Days 4–5: focus on your weakest topics\n• Day 6: timed mock test\n• Day 7: review mistakes and light revision\n\nShall I break today's session into smaller chunks?";
  }

  if (q.includes('quiz') || q.includes('test') || q.includes('question')) {
    return "Love it — let's quiz!\n\nQ1: What does the discriminant of a quadratic equation tell you?\n\nAnswer, and I'll mark it and give you the next question.";
  }

  return "Great question! Let me walk you through it step by step:\n\n• First, identify what the question is really asking.\n• Then break it into smaller parts you already know.\n• Apply the relevant rule or formula to each part.\n• Finally, check your answer against the question.\n\nWant me to dig into any specific part of this?";
}
