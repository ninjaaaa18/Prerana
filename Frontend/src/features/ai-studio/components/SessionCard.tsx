import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareText, Pin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AI_MODES } from '../data';
import type { ChatSession } from '../types';

export interface SessionCardProps {
  session: ChatSession;
  isActive?: boolean;
  className?: string;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, isActive = false, className }) => {
  const mode = AI_MODES.find((item) => item.id === session.modeId);
  const ModeIcon = mode?.icon;

  return (
    <Link
      to={`/app/ai-studio/chat/${session.id}`}
      className={cn(
        'group flex flex-col gap-2.5 rounded-2xl border bg-slate-900/60 p-4 transition-colors',
        isActive
          ? 'border-indigo-500/50 bg-indigo-600/10'
          : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {ModeIcon && (
            <span
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
              style={{
                color: mode?.color,
                borderColor: `${mode?.color}40`,
                backgroundColor: `${mode?.color}1a`,
              }}
            >
              <ModeIcon className="h-4 w-4" />
            </span>
          )}
          <h3 className="truncate text-sm font-semibold text-slate-100">{session.title}</h3>
        </div>
        {session.isPinned && <Pin className="h-3.5 w-3.5 shrink-0 text-amber-400" />}
      </div>

      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{session.preview}</p>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" size="sm">
          {session.subject}
        </Badge>
        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
          <MessageSquareText className="h-3 w-3" />
          {session.messageCount}
        </span>
        <span className="ml-auto text-[11px] text-slate-500">{session.updatedAt}</span>
      </div>
    </Link>
  );
};
