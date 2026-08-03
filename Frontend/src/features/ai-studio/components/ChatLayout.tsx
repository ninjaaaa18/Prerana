import React from 'react';
import { History, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SessionHistory } from './SessionHistory';
import type { ChatSession } from '../types';

export interface ChatLayoutProps {
  sessions: ChatSession[];
  activeSessionId: string;
  children: React.ReactNode;
  className?: string;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  sessions,
  activeSessionId,
  children,
  className,
}) => {
  const [historyOpen, setHistoryOpen] = React.useState(false);

  return (
    <div className={cn('grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]', className)}>
      <aside className="hidden lg:block">
        <SessionHistory sessions={sessions} activeSessionId={activeSessionId} />
      </aside>

      <div className="min-w-0">
        <div className="mb-3 lg:hidden">
          <Button variant="outline" size="sm" onClick={() => setHistoryOpen(true)}>
            <History className="h-4 w-4" />
            Sessions
          </Button>
        </div>
        {children}
      </div>

      {historyOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setHistoryOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[300px] max-w-[85vw] overflow-y-auto border-r border-slate-800 bg-slate-950 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-sm font-bold text-slate-100">Sessions</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setHistoryOpen(false)}
                aria-label="Close sessions"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <SessionHistory sessions={sessions} activeSessionId={activeSessionId} />
          </div>
        </div>
      )}
    </div>
  );
};
