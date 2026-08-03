import React from 'react';
import { Link } from 'react-router-dom';
import { History, MessageSquarePlus } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SessionCard } from './SessionCard';
import type { ChatSession } from '../types';

export interface SessionHistoryProps {
  sessions: ChatSession[];
  activeSessionId: string;
  className?: string;
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({
  sessions,
  activeSessionId,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-slate-400">
          <History className="h-4 w-4" />
          Sessions
        </h2>
        <Link
          to="/app/ai-studio/chat/new"
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-8 w-8')}
          aria-label="New chat"
        >
          <MessageSquarePlus className="h-4 w-4" />
        </Link>
      </div>

      {sessions.length === 0 ? (
        <EmptyState
          icon={<History className="h-8 w-8" />}
          title="No conversations yet"
          description="Start a chat and your sessions will appear here."
          className="my-0 max-w-none"
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              isActive={session.id === activeSessionId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
