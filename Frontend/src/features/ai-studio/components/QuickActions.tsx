import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, HelpCircle, MessageSquarePlus, SquareStack } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'new-chat',
    label: 'Start a new chat',
    description: 'Ask Prerana AI anything',
    icon: <MessageSquarePlus className="h-5 w-5" />,
    to: '/app/ai-studio/chat/new',
  },
  {
    id: 'generate-notes',
    label: 'Generate notes',
    description: 'Turn a topic into study notes',
    icon: <FileText className="h-5 w-5" />,
    to: '/app/ai-studio/chat/new?prompt=' + encodeURIComponent('Summarize the chapter into neat study notes.'),
  },
  {
    id: 'flashcards',
    label: 'Create flashcards',
    description: 'Build a quick-recall deck',
    icon: <SquareStack className="h-5 w-5" />,
    to: '/app/ai-studio/chat/new?prompt=' + encodeURIComponent('Create a set of flashcards for this chapter.'),
  },
  {
    id: 'ask-doubt',
    label: 'Ask a doubt',
    description: 'Get instant clarification',
    icon: <HelpCircle className="h-5 w-5" />,
    to: '/app/ai-studio/chat/new?prompt=' + encodeURIComponent('I have a doubt in a concept — can you help?'),
  },
];

export interface QuickActionsProps {
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ className }) => {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {QUICK_ACTIONS.map((action) => (
        <Link
          key={action.id}
          to={action.to}
          className="group flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition-colors hover:border-indigo-500/40 hover:bg-slate-900"
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-600/10 text-indigo-300 transition-colors group-hover:bg-indigo-600/20">
            {action.icon}
          </span>
          <span className="space-y-0.5">
            <span className="block text-sm font-semibold text-slate-100">{action.label}</span>
            <span className="block text-xs text-slate-500">{action.description}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};
